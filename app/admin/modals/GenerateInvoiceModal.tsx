'use client';

import { useState, type FormEvent } from 'react';
import * as api from '../../lib/adminApi';
import type { Lead } from '../types';

const INP = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30';

interface Props {
  lead: Lead;
  adminKey: string;
  onClose: () => void;
  onCreated: () => void;
}

export default function GenerateInvoiceModal({ lead, adminKey, onClose, onCreated }: Props) {
  const [service, setService] = useState(lead.description || '');
  const [price,   setPrice]   = useState('');
  const [busy,    setBusy]    = useState(false);
  const [err,     setErr]     = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const res = await api.createInvoice(adminKey, {
        leadId: lead._id, name: lead.name, email: lead.email,
        phone: lead.phone, service: service.trim(), price: parseFloat(price),
      });
      if (!res.success) throw new Error(res.error);
      onCreated();
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
          <h2 className="text-lg font-black text-[#111827]">Generate Invoice</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4 rounded-xl bg-[#f8fafc] p-3 text-sm">
          <p className="font-semibold text-[#111827]">{lead.name}</p>
          <p className="text-gray-500">{lead.email}</p>
          {lead.phone && <p className="text-gray-500">{lead.phone}</p>}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">SERVICE / DESCRIPTION</label>
            <input required value={service} onChange={e => setService(e.target.value)}
              placeholder="e.g. Interior Painting — 3 bedroom house" className={INP} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">PRICE (AUD)</label>
            <input required type="number" min="1" step="0.01" value={price}
              onChange={e => setPrice(e.target.value)} placeholder="2500.00" className={INP} />
          </div>
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button type="submit" disabled={busy}
            className="rounded-xl bg-[#f97316] py-3 text-sm font-bold text-white transition hover:bg-[#ea6c07] disabled:opacity-60">
            {busy ? 'Creating...' : 'Create Invoice'}
          </button>
        </form>
      </div>
    </div>
  );
}
