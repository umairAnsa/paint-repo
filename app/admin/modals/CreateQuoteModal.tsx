'use client';

import { useState, type FormEvent } from 'react';
import * as api from '../../lib/adminApi';
import type { Lead } from '../types';

const INP = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30';

interface Props {
  lead: Lead | null;
  adminKey: string;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateQuoteModal({ lead, adminKey, onClose, onCreated }: Props) {
  const [name,         setName]         = useState(lead?.name || '');
  const [email,        setEmail]        = useState(lead?.email || '');
  const [phone,        setPhone]        = useState(lead?.phone || '');
  const [service,      setService]      = useState(lead?.description || '');
  const [price,        setPrice]        = useState('');
  const [description,  setDescription]  = useState('');
  const [validityDays, setValidityDays] = useState('7');
  const [busy, setBusy] = useState(false);
  const [err,  setErr]  = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const res = await api.createQuote(adminKey, {
        leadId: lead?._id,
        name: name.trim(), email: email.trim(), phone: phone.trim() || undefined,
        service: service.trim(), price: parseFloat(price),
        description: description.trim() || undefined,
        validityDays: parseInt(validityDays),
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
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#111827]">{lead ? 'Create Quote from Lead' : 'New Quote'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">NAME</label>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Client name" className={INP} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">PHONE (optional)</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="04xx xxx xxx" className={INP} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">EMAIL</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="client@email.com" className={INP} />
          </div>
          <div className="my-1 border-t border-gray-100" />
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">SERVICE</label>
            <input required value={service} onChange={e => setService(e.target.value)}
              placeholder="e.g. Interior Painting — 3 bedroom house" className={INP} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">PRICE (AUD)</label>
              <input required type="number" min="1" step="0.01" value={price}
                onChange={e => setPrice(e.target.value)} placeholder="2500.00" className={INP} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">VALID FOR (DAYS)</label>
              <select value={validityDays} onChange={e => setValidityDays(e.target.value)} className={INP}>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">NOTES (optional)</label>
            <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Includes prep work, 2 coats..." className={`${INP} resize-none`} />
          </div>
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button type="submit" disabled={busy}
            className="rounded-xl bg-[#f97316] py-3 text-sm font-bold text-white transition hover:bg-[#ea6c07] disabled:opacity-60">
            {busy ? 'Creating...' : 'Create Quote'}
          </button>
        </form>
      </div>
    </div>
  );
}
