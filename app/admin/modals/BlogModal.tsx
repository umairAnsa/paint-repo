'use client';

import { useState, useRef } from 'react';
import * as api from '../../lib/adminApi';
import type { AdminBlogPost } from '../types';
import RichEditor from '../RichEditor';

function contentToHtml(content: unknown): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
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

  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadImage(file: File): Promise<string> {
    const base64 = await readFileAsBase64(file);
    const res = await api.uploadBlogImage(blogKey, base64, file.name);
    return res.url ?? '';
  }

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgBusy(true);
    const url = await uploadImage(file);
    if (url) setImage(url);
    else setError('Image upload failed.');
    setImgBusy(false);
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
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f8fafc]">

      {/* Sticky top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-sm font-black text-[#111827]">
            {isEdit ? 'Edit Blog Post' : 'New Blog Post'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Published toggle */}
          <label className="flex cursor-pointer items-center gap-2">
            <div
              className={`relative h-5 w-9 rounded-full transition ${published ? 'bg-[#1e3a8a]' : 'bg-gray-300'}`}
              onClick={() => setPublished(v => !v)}
            >
              <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${published ? 'left-[18px]' : 'left-0.5'}`} />
            </div>
            <span className="text-xs font-semibold text-gray-600">
              {published ? 'Published' : 'Draft'}
            </span>
          </label>

          <button
            onClick={handleSave}
            disabled={busy}
            className="rounded-lg bg-[#0c1f3d] px-5 py-2 text-xs font-bold text-white hover:bg-[#1e3a8a] disabled:opacity-50"
          >
            {busy ? 'Saving…' : isEdit ? 'Save Changes' : 'Publish Post'}
          </button>
        </div>
      </div>

      {/* Error bar */}
      {error && (
        <div className="shrink-0 bg-red-50 px-6 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Main content — two columns on desktop */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left panel — metadata */}
        <div className="flex w-72 shrink-0 flex-col gap-5 overflow-y-auto border-r border-gray-200 bg-white p-6">

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-[#1e3a8a] focus:outline-none"
              placeholder="Blog post title"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Excerpt *</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-[#1e3a8a] focus:outline-none"
              placeholder="Short description shown on blog listing"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Date *</label>
            <input
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-[#1e3a8a] focus:outline-none"
              placeholder="e.g. June 2026"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Featured Image</label>
            <input
              value={image}
              onChange={e => setImage(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-[#1e3a8a] focus:outline-none"
              placeholder="Paste image URL"
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={imgBusy}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-[#f8fafc] py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              {imgBusy ? 'Uploading…' : 'Upload Image'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
            {image && (
              <img src={image} alt="preview" className="mt-3 h-36 w-full rounded-xl object-cover" />
            )}
          </div>
        </div>

        {/* Right panel — editor */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">Content</label>
          <div className="flex-1">
            <RichEditor value={html} onChange={setHtml} fullHeight onUploadImage={uploadImage} />
          </div>
        </div>

      </div>
    </div>
  );
}
