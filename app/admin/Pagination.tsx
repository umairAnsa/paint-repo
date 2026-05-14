'use client';

import { PAGE_SIZE } from './types';

interface Props { page: number; total: number; onChange: (p: number) => void; }

export default function Pagination({ page, total, onChange }: Props) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (totalPages <= 1) return null;
  const start = (page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
      <span className="text-xs text-gray-400">{start}–{end} of {total}</span>
      <div className="flex gap-1">
        <button disabled={page === 1} onClick={() => onChange(page - 1)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-40">
          ← Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onChange(p)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
              p === page
                ? 'border-[#0c1f3d] bg-[#0c1f3d] text-white'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}>
            {p}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => onChange(page + 1)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-40">
          Next →
        </button>
      </div>
    </div>
  );
}
