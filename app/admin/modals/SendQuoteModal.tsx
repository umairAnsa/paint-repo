'use client';

import { useState, type FormEvent } from 'react';
import * as api from '../../lib/adminApi';
import { fmtPrice, type Quote } from '../types';

const INP = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30';

interface Props {
  quote: Quote;
  adminKey: string;
  onClose: () => void;
  onSent: () => void;
}

export default function SendQuoteModal({ quote, adminKey, onClose, onSent }: Props) {
  const [email, setEmail] = useState(quote.email);
  const [busy,  setBusy]  = useState(false);
  const [err,   setErr]   = useState('');

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const override = email.trim() !== quote.email ? email.trim() : undefined;
      const res = await api.sendQuote(adminKey, quote._id, override);
      if (!res.success) throw new Error(res.error || 'Send failed.');
      onSent();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#111827]">Send Quote</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4 rounded-xl bg-[#f8fafc] p-3 text-sm">
          <p className="font-bold text-[#0c1f3d]">{quote.quoteNumber}</p>
          <p className="text-gray-500">{quote.service} · {fmtPrice(quote.price)}</p>
        </div>
        <form onSubmit={handleSend} className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">SEND TO EMAIL</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={INP} />
            {email !== quote.email && (
              <p className="mt-1 text-xs text-[#f97316]">⚠ Different from quote email ({quote.email})</p>
            )}
          </div>
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button type="submit" disabled={busy}
            className="rounded-xl bg-[#f97316] py-3 text-sm font-bold text-white transition hover:bg-[#ea6c07] disabled:opacity-60">
            {busy ? 'Sending...' : 'Send Quote →'}
          </button>
        </form>
      </div>
    </div>
  );
}
