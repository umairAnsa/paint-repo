'use client';

import { useState, useRef } from 'react';
import * as api from '../../lib/adminApi';
import type { AdminBlogPost } from '../types';
import RichEditor from '../RichEditor';

function contentToHtml(content: unknown): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  // Convert old block format to HTML for backward compatibility
  return (content as Record<string, unknown>[]).map((b) => {
    if (b.type === 'h2') return `<h2>${b.text}</h2>`;
    if (b.type === 'h3') return `<h3>${b.text}</h3>`;
    if (b.type === 'p')  return `<p>${b.text}</p>`;
    if (b.type === 'ul') return `<ul>${(b.items as string[]).map(i => `<li>${i}</li>`).join('')}</ul>`;
    if (b.type === 'ol') return `<ol>${(b.items as string[]).map(i => `<li>${i}</li>`).join('')}</ol>`;
    if (b.type === 'faq') return `<h3>${b.question}</h3><p>${b.answer}</p>`;
    return '';
  }).join('');
}

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
  const [html,      setHtml]      = useState(() => contentToHtml(post?.content));
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

  async function handleSave() {
    if (!title.trim() || !excerpt.trim() || !date.trim()) {
      setError('Title, excerpt, and date are required.');
      return;
    }
    setBusy(true);
    setError('');
    const body = { title, excerpt, date, image, content: html, published };
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

          {/* Rich Text Editor */}
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Content</label>
            <RichEditor value={html} onChange={setHtml} />
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
