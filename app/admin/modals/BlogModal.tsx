'use client';

import { useState, useRef } from 'react';
import * as api from '../../lib/adminApi';
import type { AdminBlogPost } from '../types';

type BlockType = 'h2' | 'p' | 'ul' | 'ol' | 'faq';

interface Block {
  id: number;
  type: BlockType;
  text: string;
  items: string;
  question: string;
  answer: string;
}

let _id = 0;
function newBlock(type: BlockType = 'p'): Block {
  return { id: ++_id, type, text: '', items: '', question: '', answer: '' };
}

function blocksToContent(blocks: Block[]): object[] {
  return blocks.map((b) => {
    if (b.type === 'h2')  return { type: 'h2', text: b.text };
    if (b.type === 'p')   return { type: 'p',  text: b.text };
    if (b.type === 'ul')  return { type: 'ul', items: b.items.split('\n').map(s => s.trim()).filter(Boolean) };
    if (b.type === 'ol')  return { type: 'ol', items: b.items.split('\n').map(s => s.trim()).filter(Boolean) };
    if (b.type === 'faq') return { type: 'faq', question: b.question, answer: b.answer };
    return {};
  });
}

function contentToBlocks(content: object[]): Block[] {
  return (content ?? []).map((c: object) => {
    const b = c as Record<string, unknown>;
    const base = newBlock((b.type as BlockType) ?? 'p');
    if (b.type === 'h2' || b.type === 'p') base.text = (b.text as string) ?? '';
    if (b.type === 'ul' || b.type === 'ol') base.items = ((b.items as string[]) ?? []).join('\n');
    if (b.type === 'faq') { base.question = (b.question as string) ?? ''; base.answer = (b.answer as string) ?? ''; }
    return base;
  });
}

const BLOCK_LABELS: Record<BlockType, string> = {
  h2: 'Heading',
  p:  'Paragraph',
  ul: 'Bullet List',
  ol: 'Numbered List',
  faq: 'FAQ',
};

export default function BlogModal({
  post,
  blogKey,
  onClose,
  onSaved,
}: {
  post: AdminBlogPost | null;
  blogKey: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!post;

  const [title,     setTitle]     = useState(post?.title ?? '');
  const [excerpt,   setExcerpt]   = useState(post?.excerpt ?? '');
  const [date,      setDate]      = useState(post?.date ?? '');
  const [image,     setImage]     = useState(post?.image ?? '');
  const [published, setPublished] = useState(post?.published ?? true);
  const [blocks,    setBlocks]    = useState<Block[]>(() =>
    post?.content ? contentToBlocks(post.content) : [newBlock('p')]
  );
  const [busy,      setBusy]      = useState(false);
  const [imgBusy,   setImgBusy]   = useState(false);
  const [error,     setError]     = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgBusy(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await api.uploadBlogImage(blogKey, base64, file.name);
      if (res.url) setImage(res.url);
      else setError('Image upload failed.');
      setImgBusy(false);
    };
    reader.readAsDataURL(file);
  }

  function addBlock(type: BlockType) {
    setBlocks(bs => [...bs, newBlock(type)]);
  }

  function updateBlock(id: number, patch: Partial<Block>) {
    setBlocks(bs => bs.map(b => b.id === id ? { ...b, ...patch } : b));
  }

  function removeBlock(id: number) {
    setBlocks(bs => bs.filter(b => b.id !== id));
  }

  function moveBlock(id: number, dir: -1 | 1) {
    setBlocks(bs => {
      const idx = bs.findIndex(b => b.id === id);
      if (idx < 0) return bs;
      const next = idx + dir;
      if (next < 0 || next >= bs.length) return bs;
      const arr = [...bs];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  }

  async function handleSave() {
    if (!title.trim() || !excerpt.trim() || !date.trim()) {
      setError('Title, excerpt, and date are required.');
      return;
    }
    setBusy(true);
    setError('');
    const body = { title, excerpt, date, image, content: blocksToContent(blocks), published };
    const res = isEdit
      ? await api.updateBlogPost(blogKey, post!._id, body)
      : await api.createBlogPost(blogKey, body);
    setBusy(false);
    if (res.post) onSaved();
    else setError(res.error ?? 'Save failed.');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-black text-[#111827]">{isEdit ? 'Edit Post' : 'New Blog Post'}</h2>
          <button onClick={onClose} className="rounded-xl p-2 text-gray-400 hover:bg-gray-100">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1e3a8a] focus:outline-none"
              placeholder="Blog post title" />
          </div>

          {/* Excerpt */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Excerpt *</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1e3a8a] focus:outline-none"
              placeholder="Short description (shown on blog listing)" />
          </div>

          {/* Date */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Date *</label>
            <input value={date} onChange={e => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1e3a8a] focus:outline-none"
              placeholder="e.g. May 2026" />
          </div>

          {/* Image */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Featured Image</label>
            <div className="flex gap-3">
              <input value={image} onChange={e => setImage(e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1e3a8a] focus:outline-none"
                placeholder="Image URL or upload below" />
              <button onClick={() => fileRef.current?.click()} disabled={imgBusy}
                className="rounded-xl bg-[#f8fafc] border border-gray-200 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                {imgBusy ? 'Uploading…' : 'Upload'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
            </div>
            {image && (
              <img src={image} alt="preview" className="mt-3 h-32 w-full rounded-xl object-cover" />
            )}
          </div>

          {/* Published */}
          <label className="flex cursor-pointer items-center gap-3">
            <div className={`relative h-6 w-11 rounded-full transition ${published ? 'bg-[#1e3a8a]' : 'bg-gray-300'}`}
              onClick={() => setPublished(v => !v)}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${published ? 'left-[22px]' : 'left-0.5'}`} />
            </div>
            <span className="text-sm font-semibold text-gray-700">Published</span>
          </label>

          {/* Content Blocks */}
          <div>
            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-gray-500">Content</label>
            <div className="space-y-3">
              {blocks.map((block, idx) => (
                <div key={block.id} className="rounded-xl border border-gray-200 bg-[#f8fafc] p-4">
                  {/* Block header */}
                  <div className="mb-3 flex items-center gap-2">
                    <select value={block.type}
                      onChange={e => updateBlock(block.id, { type: e.target.value as BlockType })}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 focus:outline-none">
                      {(Object.keys(BLOCK_LABELS) as BlockType[]).map(t => (
                        <option key={t} value={t}>{BLOCK_LABELS[t]}</option>
                      ))}
                    </select>
                    <div className="ml-auto flex gap-1">
                      <button onClick={() => moveBlock(block.id, -1)} disabled={idx === 0}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 disabled:opacity-30">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button onClick={() => moveBlock(block.id, 1)} disabled={idx === blocks.length - 1}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 disabled:opacity-30">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button onClick={() => removeBlock(block.id)}
                        className="rounded-lg p-1.5 text-red-400 hover:bg-red-50">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Block content */}
                  {(block.type === 'h2') && (
                    <input value={block.text} onChange={e => updateBlock(block.id, { text: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold focus:outline-none"
                      placeholder="Heading text" />
                  )}
                  {block.type === 'p' && (
                    <textarea value={block.text} onChange={e => updateBlock(block.id, { text: e.target.value })} rows={3}
                      className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none"
                      placeholder="Paragraph text" />
                  )}
                  {(block.type === 'ul' || block.type === 'ol') && (
                    <div>
                      <p className="mb-1 text-xs text-gray-400">One item per line</p>
                      <textarea value={block.items} onChange={e => updateBlock(block.id, { items: e.target.value })} rows={4}
                        className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none"
                        placeholder={"Item 1\nItem 2\nItem 3"} />
                    </div>
                  )}
                  {block.type === 'faq' && (
                    <div className="space-y-2">
                      <input value={block.question} onChange={e => updateBlock(block.id, { question: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold focus:outline-none"
                        placeholder="Question?" />
                      <textarea value={block.answer} onChange={e => updateBlock(block.id, { answer: e.target.value })} rows={2}
                        className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none"
                        placeholder="Answer..." />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add block buttons */}
            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(BLOCK_LABELS) as BlockType[]).map(t => (
                <button key={t} onClick={() => addBlock(t)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a]">
                  + {BLOCK_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button onClick={onClose} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSave} disabled={busy}
            className="rounded-xl bg-[#0c1f3d] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1e3a8a] disabled:opacity-50">
            {busy ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
