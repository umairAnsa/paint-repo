'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { useEffect, useRef } from 'react';

function ToolbarBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`rounded px-2 py-1 text-sm transition ${
        active
          ? 'bg-[#1e3a8a] text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
}

export default function RichEditor({
  value,
  onChange,
  fullHeight = false,
  onUploadImage,
}: {
  value: string;
  onChange: (html: string) => void;
  fullHeight?: boolean;
  onUploadImage?: (file: File) => Promise<string>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ allowBase64: true }),
    ],
    content: value || '',
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: fullHeight
          ? 'h-full min-h-[500px] px-4 py-3 text-sm text-gray-800 leading-7 focus:outline-none'
          : 'min-h-[220px] px-4 py-3 text-sm text-gray-800 leading-7 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || '');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor || !onUploadImage) return;
    e.target.value = '';
    const url = await onUploadImage(file);
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-[#f8fafc] px-2 py-1.5">
        {/* Headings */}
        {([1, 2, 3, 4, 5, 6] as const).map((level) => (
          <ToolbarBtn
            key={level}
            title={`Heading ${level}`}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            active={editor.isActive('heading', { level })}
          >
            <span className={level <= 2 ? 'font-bold' : level <= 4 ? 'font-semibold' : 'font-normal'}>
              H{level}
            </span>
          </ToolbarBtn>
        ))}

        <span className="mx-1 h-5 w-px bg-gray-300" />

        {/* Inline formatting */}
        <ToolbarBtn
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <strong>B</strong>
        </ToolbarBtn>
        <ToolbarBtn
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <em>I</em>
        </ToolbarBtn>
        <ToolbarBtn
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        >
          <span className="underline">U</span>
        </ToolbarBtn>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        {/* Lists */}
        <ToolbarBtn
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          • List
        </ToolbarBtn>
        <ToolbarBtn
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          1. List
        </ToolbarBtn>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        {/* Align */}
        <ToolbarBtn
          title="Align Left"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
        >
          ←
        </ToolbarBtn>
        <ToolbarBtn
          title="Align Center"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
        >
          ↔
        </ToolbarBtn>
        <ToolbarBtn
          title="Align Right"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
        >
          →
        </ToolbarBtn>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        {/* Block quote */}
        <ToolbarBtn
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          &ldquo;&rdquo;
        </ToolbarBtn>

        {/* Image upload */}
        {onUploadImage && (
          <>
            <span className="mx-1 h-5 w-px bg-gray-300" />
            <ToolbarBtn
              title="Insert Image"
              onClick={() => fileInputRef.current?.click()}
            >
              🖼
            </ToolbarBtn>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageFile}
            />
          </>
        )}

        <span className="mx-1 h-5 w-px bg-gray-300" />

        {/* Undo / Redo */}
        <ToolbarBtn
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          ↩
        </ToolbarBtn>
        <ToolbarBtn
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          ↪
        </ToolbarBtn>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  );
}
