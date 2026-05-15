'use client';

import { useState, useEffect, useCallback } from 'react';
import * as api from '../lib/adminApi';
import type { AdminBlogPost } from './types';
import BlogModal from './modals/BlogModal';
import ConfirmModal from './modals/ConfirmModal';

export default function BlogTab({ onRefresh }: { onRefresh: () => void }) {
  const [blogKey,       setBlogKey]       = useState('');
  const [keyInput,      setKeyInput]      = useState('');
  const [posts,         setPosts]         = useState<AdminBlogPost[]>([]);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState('');
  const [modal,         setModal]         = useState<AdminBlogPost | null | undefined>(undefined);
  const [confirmTarget, setConfirmTarget] = useState<AdminBlogPost | null>(null);

  // Load blog key from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('blog_key');
    if (stored) setBlogKey(stored);
  }, []);

  const loadPosts = useCallback(async (key: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getBlogPosts(key);
      setPosts(data.posts ?? []);
    } catch {
      setError('Invalid blog key.');
      sessionStorage.removeItem('blog_key');
      setBlogKey('');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (blogKey) loadPosts(blogKey);
  }, [blogKey, loadPosts]);

  function handleKeySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!keyInput.trim()) return;
    sessionStorage.setItem('blog_key', keyInput.trim());
    setBlogKey(keyInput.trim());
    setKeyInput('');
  }

  async function handleDelete(p: AdminBlogPost) {
    setConfirmTarget(p);
  }

  async function confirmDelete() {
    if (!confirmTarget) return;
    await api.deleteBlogPost(blogKey, confirmTarget._id);
    setConfirmTarget(null);
    loadPosts(blogKey);
    onRefresh();
  }

  // Key prompt screen
  if (!blogKey) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <form onSubmit={handleKeySubmit} className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="mb-1 text-base font-black text-[#111827]">Blog Access</p>
          <p className="mb-5 text-xs text-gray-400">Enter the blog secret key to manage posts.</p>
          {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">{error}</p>}
          <input
            type="password"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            placeholder="Blog secret key"
            className="mb-3 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#0c1f3d]"
            autoFocus
          />
          <button type="submit"
            className="w-full rounded-xl bg-[#0c1f3d] py-2.5 text-sm font-bold text-white hover:bg-[#1a3560]">
            Unlock Blog
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {confirmTarget && (
        <ConfirmModal
          message={`Delete "${confirmTarget.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
      {modal !== undefined && (
        <BlogModal
          post={modal}
          blogKey={blogKey}
          onClose={() => setModal(undefined)}
          onSaved={() => { setModal(undefined); loadPosts(blogKey); onRefresh(); }}
        />
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <p className="text-sm font-black text-[#111827]">Blog Posts ({posts.length})</p>
          <div className="flex gap-2">
            <button onClick={() => { sessionStorage.removeItem('blog_key'); setBlogKey(''); setPosts([]); }}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-400 hover:text-gray-600">
              Lock
            </button>
            <button onClick={() => setModal(null)}
              className="rounded-xl bg-[#f97316] px-4 py-2 text-sm font-bold text-white hover:bg-[#ea6c07]">
              + New Post
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">No blog posts yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((p) => (
              <div key={p._id} className="flex items-center gap-4 px-5 py-4">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="h-14 w-20 shrink-0 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <svg className="h-6 w-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#111827]">{p.title}</p>
                  <p className="mt-0.5 truncate text-xs text-gray-400">{p.date} · {p.slug}</p>
                </div>

                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                  p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {p.published ? 'Published' : 'Draft'}
                </span>

                <div className="flex shrink-0 gap-2">
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer"
                    className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:text-[#1e3a8a]" title="View">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                  <button onClick={() => setModal(p)}
                    className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:text-[#1e3a8a]" title="Edit">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(p)}
                    className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:text-red-500" title="Delete">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
