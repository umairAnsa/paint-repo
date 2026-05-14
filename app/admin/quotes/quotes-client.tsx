'use client';

import { useState, useEffect, useCallback, type FormEvent } from 'react';
import * as api from '../../lib/adminApi';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
  createdAt: string;
}

interface Quote {
  _id: string;
  quoteNumber: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  price: number;
  description?: string;
  validUntil: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  createdAt: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  Draft:    'bg-gray-100 text-gray-600',
  Sent:     'bg-blue-100 text-blue-700',
  Accepted: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtPrice(p: number) {
  return `$${p.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`;
}

// ── Login ─────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey]   = useState('');
  const [err, setErr]   = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(false);
    try {
      await api.getQuotes(key);
      sessionStorage.setItem('admin_key', key);
      onLogin(key);
    } catch {
      setErr(true);
    } finally {
      setBusy(false);
    }
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
        <p className="mb-6 text-center text-sm text-gray-400">Norm Painting · Quote System</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password" placeholder="Enter admin key"
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

// ── Create Quote Modal ────────────────────────────────────────────────────────

function CreateModal({ lead, adminKey, onClose, onCreated }: {
  lead: Lead | null; adminKey: string; onClose: () => void; onCreated: () => void;
}) {
  const [name,         setName]         = useState(lead?.name  || '');
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
        service: service.trim(),
        price: parseFloat(price),
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

  const inputClass = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30';

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
          {/* Client fields — editable in both modes */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">NAME</label>
              <input required value={name} onChange={e => setName(e.target.value)}
                placeholder="Client name" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">PHONE (optional)</label>
              <input value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="04xx xxx xxx" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">EMAIL</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="client@email.com" className={inputClass} />
          </div>

          <div className="my-1 border-t border-gray-100" />

          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">SERVICE</label>
            <input required value={service} onChange={e => setService(e.target.value)}
              placeholder="e.g. Interior Painting — 3 bedroom house"
              className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">PRICE (AUD)</label>
              <input required type="number" min="1" step="0.01"
                value={price} onChange={e => setPrice(e.target.value)}
                placeholder="2500.00" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">VALID FOR (DAYS)</label>
              <select value={validityDays} onChange={e => setValidityDays(e.target.value)} className={inputClass}>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">NOTES (optional)</label>
            <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Includes prep work, 2 coats, colour consultation..."
              className={`${inputClass} resize-none`} />
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

// ── Send Modal ─────────────────────────────────────────────────────────────────

function SendModal({ quote, adminKey, onClose, onSent }: {
  quote: Quote; adminKey: string; onClose: () => void; onSent: () => void;
}) {
  const [email, setEmail] = useState(quote.email);
  const [busy,  setBusy]  = useState(false);
  const [err,   setErr]   = useState('');

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const res = await api.sendQuote(adminKey, quote._id, email.trim() !== quote.email ? email.trim() : undefined);
      if (!res.success) throw new Error(res.error || 'Send failed.');
      onSent();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Failed.');
    } finally {
      setBusy(false);
    }
  }

  const inputClass = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30';

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
          <p className="text-gray-500">{quote.service} · ${quote.price.toLocaleString('en-AU')}</p>
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">SEND TO EMAIL</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
              className={inputClass} />
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

// ── KPI Dashboard ─────────────────────────────────────────────────────────────

function KpiDashboard({ quotes, leads }: { quotes: Quote[]; leads: Lead[] }) {
  const total     = quotes.length;
  const accepted  = quotes.filter(q => q.status === 'Accepted');
  const sent      = quotes.filter(q => q.status === 'Sent').length;
  const rejected  = quotes.filter(q => q.status === 'Rejected').length;
  const draft     = quotes.filter(q => q.status === 'Draft').length;
  const revenue   = accepted.reduce((s, q) => s + q.price, 0);
  const avgValue  = total > 0 ? quotes.reduce((s, q) => s + q.price, 0) / total : 0;
  const convRate  = total > 0 ? Math.round((accepted.length / total) * 100) : 0;

  // Last 6 months bar chart data
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      label: d.toLocaleDateString('en-AU', { month: 'short' }),
      year:  d.getFullYear(),
      month: d.getMonth(),
      count: 0,
    };
  });
  quotes.forEach(q => {
    const d = new Date(q.createdAt);
    const m = months.find(x => x.year === d.getFullYear() && x.month === d.getMonth());
    if (m) m.count++;
  });
  const maxCount = Math.max(...months.map(m => m.count), 1);

  // Status breakdown bar widths
  const statusRows = [
    { label: 'Draft',    count: draft,            color: 'bg-gray-400' },
    { label: 'Sent',     count: sent,             color: 'bg-blue-500' },
    { label: 'Accepted', count: accepted.length,  color: 'bg-green-500' },
    { label: 'Rejected', count: rejected,         color: 'bg-red-400' },
  ];

  const kpiCards = [
    { label: 'Total Revenue',     value: `$${revenue.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`, sub: 'from accepted quotes' },
    { label: 'Conversion Rate',   value: `${convRate}%`,                                                       sub: `${accepted.length} of ${total} quotes accepted` },
    { label: 'Avg Quote Value',   value: `$${avgValue.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`, sub: 'across all quotes' },
    { label: 'Total Leads',       value: String(leads.length),                                                  sub: `${total} quotes created` },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map(k => (
          <div key={k.label} className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{k.label}</p>
            <p className="mt-1 text-2xl font-black text-[#0c1f3d]">{k.value}</p>
            <p className="mt-1 text-xs text-gray-400">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Monthly quotes bar chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-4 text-sm font-black text-[#111827]">Quotes — Last 6 Months</p>
          <div className="flex items-end gap-3 h-36">
            {months.map(m => (
              <div key={`${m.year}-${m.month}`} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-bold text-[#0c1f3d]">{m.count || ''}</span>
                <div
                  className="w-full rounded-t-lg bg-[#0c1f3d] transition-all"
                  style={{ height: `${(m.count / maxCount) * 100}%`, minHeight: m.count ? 6 : 0 }}
                />
                <span className="text-[10px] text-gray-400">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-4 text-sm font-black text-[#111827]">Quotes by Status</p>
          <div className="flex flex-col gap-3">
            {statusRows.map(s => (
              <div key={s.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-gray-600">{s.label}</span>
                  <span className="font-bold text-[#0c1f3d]">{s.count}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100">
                  <div
                    className={`h-2.5 rounded-full ${s.color} transition-all`}
                    style={{ width: total > 0 ? `${(s.count / total) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const [tab,     setTab]     = useState<'quotes' | 'leads' | 'dashboard'>('quotes');
  const [leads,   setLeads]   = useState<Lead[]>([]);
  const [quotes,  setQuotes]  = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal,     setModal]     = useState<Lead | null | undefined>(undefined);
  const [sendModal, setSendModal] = useState<Quote | null>(null);
  const [toast,   setToast]   = useState('');

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [l, q] = await Promise.all([api.getQuoteLeads(adminKey), api.getQuotes(adminKey)]);
      setLeads(l.leads);
      setQuotes(q.quotes);
    } catch { onLogout(); }
    finally { setLoading(false); }
  }, [adminKey, onLogout]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadData(); }, [loadData]);

  function handleSend(q: Quote) {
    setSendModal(q);
  }

  async function handleDelete(q: Quote) {
    if (!confirm(`Delete ${q.quoteNumber}?`)) return;
    await api.deleteQuote(adminKey, q._id);
    loadData();
  }

  const stats = [
    { label: 'Total Quotes', value: quotes.length },
    { label: 'Sent',         value: quotes.filter(q => q.status === 'Sent').length },
    { label: 'Accepted',     value: quotes.filter(q => q.status === 'Accepted').length },
    { label: 'Rejected',     value: quotes.filter(q => q.status === 'Rejected').length },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {toast && (
        <div className="fixed right-5 top-5 z-50 rounded-xl bg-[#0c1f3d] px-5 py-3 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}

      {modal !== undefined && (
        <CreateModal
          lead={modal} adminKey={adminKey}
          onClose={() => setModal(undefined)}
          onCreated={() => { setModal(undefined); setTab('quotes'); loadData(); showToast('Quote created!'); }}
        />
      )}

      {sendModal && (
        <SendModal
          quote={sendModal} adminKey={adminKey}
          onClose={() => setSendModal(null)}
          onSent={() => { setSendModal(null); loadData(); showToast('Quote sent!'); }}
        />
      )}

      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0c1f3d]">
              <svg className="h-4 w-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-black text-[#111827]">Norm Painting</p>
              <p className="text-xs text-gray-400">Quote Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin/invoices" className="text-xs font-semibold text-gray-400 hover:text-gray-700">
              → Invoices
            </a>
            <button onClick={onLogout} className="text-xs font-semibold text-gray-400 hover:text-gray-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{s.label}</p>
              <p className="mt-1 text-3xl font-black text-[#0c1f3d]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs + New Quote button */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-1 w-fit">
            {(['quotes', 'leads', 'dashboard'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-lg px-5 py-2 text-sm font-bold transition ${
                  tab === t ? 'bg-[#0c1f3d] text-white' : 'text-gray-500 hover:text-gray-800'
                }`}>
                {t === 'quotes' ? `Quotes (${quotes.length})` : t === 'leads' ? `Leads (${leads.length})` : 'Dashboard'}
              </button>
            ))}
          </div>
          <button onClick={() => setModal(null)}
            className="rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ea6c07]">
            + New Quote
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-gray-400">Loading...</div>
        ) : tab === 'quotes' ? (
          /* ── Quotes Table ── */
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {quotes.length === 0 ? (
              <p className="py-16 text-center text-sm text-gray-400">No quotes yet. Click <strong>+ New Quote</strong> to create one.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#f8fafc]">
                    {['Quote', 'Client', 'Service', 'Price', 'Valid Until', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {quotes.map(q => (
                    <tr key={q._id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-bold text-[#0c1f3d]">{q.quoteNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#111827]">{q.name}</p>
                        <p className="text-xs text-gray-400">{q.email}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 max-w-[160px]">
                        <p className="truncate">{q.service}</p>
                      </td>
                      <td className="px-4 py-3 font-bold text-[#111827]">{fmtPrice(q.price)}</td>
                      <td className="px-4 py-3 text-gray-500">{fmt(q.validUntil)}</td>
                      <td className="px-4 py-3">
                        <select value={q.status}
                          onChange={e => api.updateQuoteStatus(adminKey, q._id, e.target.value).then(loadData)}
                          className={`rounded-full px-3 py-1 text-xs font-bold cursor-pointer border-0 outline-none ${STATUS_COLORS[q.status]}`}>
                          <option>Draft</option>
                          <option>Sent</option>
                          <option>Accepted</option>
                          <option>Rejected</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {/* Preview */}
                          <button onClick={() => api.previewQuotePdf(adminKey, q._id)}
                            title="Preview PDF"
                            className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-[#1e3a8a] hover:text-[#1e3a8a]">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          {/* Download */}
                          <button onClick={() => api.downloadQuotePdf(adminKey, q._id, q.quoteNumber)}
                            title="Download PDF"
                            className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-[#0c1f3d] hover:text-[#0c1f3d]">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                          {/* Send */}
                          <button onClick={() => handleSend(q)}
                            title="Send to client"
                            className="rounded-lg bg-[#f97316] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#ea6c07]">
                            Send
                          </button>
                          {/* Delete */}
                          <button onClick={() => handleDelete(q)}
                            title="Delete"
                            className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:border-red-300 hover:text-red-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : tab === 'leads' ? (
          /* ── Leads Table ── */
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {leads.length === 0 ? (
              <p className="py-16 text-center text-sm text-gray-400">No leads yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#f8fafc]">
                    {['Name', 'Email', 'Phone', 'Message', 'Date', 'Action'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leads.map(lead => (
                    <tr key={lead._id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-semibold text-[#111827]">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-500">{lead.email}</td>
                      <td className="px-4 py-3 text-gray-500">{lead.phone || '—'}</td>
                      <td className="max-w-xs px-4 py-3 text-gray-500">
                        <p className="truncate">{lead.description || '—'}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{fmt(lead.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setModal(lead)}
                          className="rounded-lg bg-[#0c1f3d] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1e3a8a]">
                          + Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : tab === 'dashboard' ? (
          <KpiDashboard quotes={quotes} leads={leads} />
        ) : null}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function QuotesClient() {
  const [adminKey, setAdminKey] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_key');
    if (saved) setAdminKey(saved);
  }, []);

  function handleLogout() {
    sessionStorage.removeItem('admin_key');
    setAdminKey(null);
  }

  if (!adminKey) return <LoginScreen onLogin={setAdminKey} />;
  return <Dashboard adminKey={adminKey} onLogout={handleLogout} />;
}
