'use client';

import { useState } from 'react';
import * as api from '../lib/adminApi';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [key,  setKey]  = useState('');
  const [err,  setErr]  = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setErr(false);

    // Try admin key
    try {
      await api.getQuotes(key);
      sessionStorage.setItem('admin_key', key);
      sessionStorage.removeItem('blog_key');
      onLogin();
      return;
    } catch { /* not admin */ }

    // Try blog key
    try {
      await api.getBlogPosts(key);
      sessionStorage.setItem('blog_key', key);
      sessionStorage.removeItem('admin_key');
      onLogin();
      return;
    } catch { /* not blog either */ }

    setErr(true);
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c1f3d]">
            <svg className="h-7 w-7 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h1 className="mb-1 text-center text-xl font-black text-[#111827]">Admin Access</h1>
        <p className="mb-6 text-center text-sm text-gray-400">Norm Painting · Dashboard</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password" placeholder="Enter key"
            value={key} onChange={e => setKey(e.target.value)} required
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30"
          />
          {err && <p className="text-xs text-red-500">Wrong key. Try again.</p>}
          <button type="submit" disabled={busy}
            className="rounded-xl bg-[#0c1f3d] py-3 text-sm font-bold text-white transition hover:bg-[#1e3a8a] disabled:opacity-60">
            {busy ? 'Checking...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
