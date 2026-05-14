'use client';

import { useState, useEffect, useCallback, type FormEvent } from 'react';

const PAGE_SIZE = 10;
import * as api from '../lib/adminApi';

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

interface Invoice {
  _id: string;
  invoiceNumber: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  price: number;
  date: string;
  dueDate: string;
  status: 'Pending' | 'Sent' | 'Paid';
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const QUOTE_STATUS_COLORS: Record<string, string> = {
  Draft:    'bg-gray-100 text-gray-600',
  Sent:     'bg-blue-100 text-blue-700',
  Accepted: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
};

const INV_STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Sent:    'bg-blue-100 text-blue-800',
  Paid:    'bg-green-100 text-green-800',
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fmtPrice(p: number) {
  return `$${p.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`;
}

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
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
              p === page ? 'border-[#0c1f3d] bg-[#0c1f3d] text-white' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
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
        <p className="mb-6 text-center text-sm text-gray-400">Norm Painting · Dashboard</p>
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

// ── Create Quote Modal ─────────────────────────────────────────────────────────

function CreateQuoteModal({ lead, adminKey, onClose, onCreated }: {
  lead: Lead | null; adminKey: string; onClose: () => void; onCreated: () => void;
}) {
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

  const inp = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30';

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
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Client name" className={inp} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">PHONE (optional)</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="04xx xxx xxx" className={inp} />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">EMAIL</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="client@email.com" className={inp} />
          </div>
          <div className="my-1 border-t border-gray-100" />
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">SERVICE</label>
            <input required value={service} onChange={e => setService(e.target.value)}
              placeholder="e.g. Interior Painting — 3 bedroom house" className={inp} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">PRICE (AUD)</label>
              <input required type="number" min="1" step="0.01" value={price}
                onChange={e => setPrice(e.target.value)} placeholder="2500.00" className={inp} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-500">VALID FOR (DAYS)</label>
              <select value={validityDays} onChange={e => setValidityDays(e.target.value)} className={inp}>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">NOTES (optional)</label>
            <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Includes prep work, 2 coats..." className={`${inp} resize-none`} />
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

// ── Send Quote Modal ───────────────────────────────────────────────────────────

function SendQuoteModal({ quote, adminKey, onClose, onSent }: {
  quote: Quote; adminKey: string; onClose: () => void; onSent: () => void;
}) {
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

  const inp = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30';

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
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={inp} />
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

// ── Generate Invoice Modal ─────────────────────────────────────────────────────

function GenerateInvoiceModal({ lead, adminKey, onClose, onCreated }: {
  lead: Lead; adminKey: string; onClose: () => void; onCreated: () => void;
}) {
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

  const inp = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30';

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
              placeholder="e.g. Interior Painting — 3 bedroom house" className={inp} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">PRICE (AUD)</label>
            <input required type="number" min="1" step="0.01" value={price}
              onChange={e => setPrice(e.target.value)} placeholder="2500.00" className={inp} />
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

// ── Main Dashboard ─────────────────────────────────────────────────────────────

function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const [tab,      setTab]      = useState<'quotes' | 'invoices' | 'kpi'>('quotes');
  const [quotes,   setQuotes]   = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [qLeads,   setQLeads]   = useState<Lead[]>([]);
  const [iLeads,   setILeads]   = useState<Lead[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState('');

  // pagination
  const [qPage,     setQPage]     = useState(1);
  const [qLeadPage, setQLeadPage] = useState(1);
  const [iPage,     setIPage]     = useState(1);
  const [iLeadPage, setILeadPage] = useState(1);

  // quote modals
  const [createModal, setCreateModal] = useState<Lead | null | undefined>(undefined);
  const [sendModal,   setSendModal]   = useState<Quote | null>(null);

  // invoice modals
  const [invoiceModal, setInvoiceModal] = useState<Lead | null>(null);

  // invoice busy map (for send button)
  const [invBusy, setInvBusy] = useState<Record<string, boolean>>({});

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [ql, q, il, i] = await Promise.all([
        api.getQuoteLeads(adminKey),
        api.getQuotes(adminKey),
        api.getLeads(adminKey),
        api.getInvoices(adminKey),
      ]);
      setQLeads(ql.leads);
      setQuotes(q.quotes);
      setILeads(il.leads);
      setInvoices(i.invoices);
    } catch { onLogout(); }
    finally { setLoading(false); }
  }, [adminKey, onLogout]);

  useEffect(() => { loadData(); }, [loadData]);

  // ── Invoice actions ────────────────────────────────────────────────────────
  async function handleSendInvoice(inv: Invoice) {
    setInvBusy(b => ({ ...b, [inv._id]: true }));
    const res = await api.sendInvoice(adminKey, inv._id);
    setInvBusy(b => ({ ...b, [inv._id]: false }));
    showToast(res.success ? 'Invoice sent!' : 'Send failed.');
    if (res.success) loadData();
  }

  async function handleDeleteInvoice(inv: Invoice) {
    if (!confirm(`Delete ${inv.invoiceNumber}?`)) return;
    await api.deleteInvoice(adminKey, inv._id);
    loadData();
  }

  // ── Quote actions ──────────────────────────────────────────────────────────
  async function handleDeleteQuote(q: Quote) {
    if (!confirm(`Delete ${q.quoteNumber}?`)) return;
    await api.deleteQuote(adminKey, q._id);
    loadData();
  }

  // ── Paginated slices ───────────────────────────────────────────────────────
  const quotesPage  = quotes.slice((qPage - 1) * PAGE_SIZE, qPage * PAGE_SIZE);
  const qLeadsPage  = qLeads.slice((qLeadPage - 1) * PAGE_SIZE, qLeadPage * PAGE_SIZE);
  const invPage     = invoices.slice((iPage - 1) * PAGE_SIZE, iPage * PAGE_SIZE);
  const iLeadsPage  = iLeads.slice((iLeadPage - 1) * PAGE_SIZE, iLeadPage * PAGE_SIZE);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = [
    { label: 'Quotes',          value: quotes.length },
    { label: 'Quotes Accepted', value: quotes.filter(q => q.status === 'Accepted').length },
    { label: 'Invoices',        value: invoices.length },
    { label: 'Invoices Paid',   value: invoices.filter(i => i.status === 'Paid').length },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {toast && (
        <div className="fixed right-5 top-5 z-50 rounded-xl bg-[#0c1f3d] px-5 py-3 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}

      {/* Quote modals */}
      {createModal !== undefined && (
        <CreateQuoteModal
          lead={createModal} adminKey={adminKey}
          onClose={() => setCreateModal(undefined)}
          onCreated={() => { setCreateModal(undefined); setTab('quotes'); loadData(); showToast('Quote created!'); }}
        />
      )}
      {sendModal && (
        <SendQuoteModal
          quote={sendModal} adminKey={adminKey}
          onClose={() => setSendModal(null)}
          onSent={() => { setSendModal(null); loadData(); showToast('Quote sent!'); }}
        />
      )}

      {/* Invoice modal */}
      {invoiceModal && (
        <GenerateInvoiceModal
          lead={invoiceModal} adminKey={adminKey}
          onClose={() => setInvoiceModal(null)}
          onCreated={() => { setInvoiceModal(null); setTab('invoices'); loadData(); showToast('Invoice created!'); }}
        />
      )}

      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0c1f3d]">
              <svg className="h-4 w-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-black text-[#111827]">Norm Painting</p>
              <p className="text-xs text-gray-400">Admin Dashboard</p>
            </div>
          </div>
          <button onClick={onLogout} className="text-xs font-semibold text-gray-400 hover:text-gray-600">
            Logout
          </button>
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

        {/* Tabs */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-1 w-fit">
            {(['quotes', 'invoices', 'kpi'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-lg px-5 py-2 text-sm font-bold transition ${
                  tab === t ? 'bg-[#0c1f3d] text-white' : 'text-gray-500 hover:text-gray-800'
                }`}>
                {t === 'quotes' ? `Quotes (${quotes.length})` : t === 'invoices' ? `Invoices (${invoices.length})` : 'KPI'}
              </button>
            ))}
          </div>
          {tab === 'quotes' && (
            <button onClick={() => setCreateModal(null)}
              className="rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ea6c07]">
              + New Quote
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-gray-400">Loading...</div>
        ) : tab === 'quotes' ? (
          /* ── Quotes ── */
          <div className="flex flex-col gap-4">
            {/* Quotes table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 bg-[#f8fafc] px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">All Quotes</p>
              </div>
              {quotes.length === 0 ? (
                <p className="py-16 text-center text-sm text-gray-400">No quotes yet. Click <strong>+ New Quote</strong> to create one.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Quote', 'Client', 'Service', 'Price', 'Valid Until', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {quotesPage.map(q => (
                      <tr key={q._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-bold text-[#0c1f3d]">{q.quoteNumber}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-[#111827]">{q.name}</p>
                          <p className="text-xs text-gray-400">{q.email}</p>
                        </td>
                        <td className="max-w-[160px] px-4 py-3 text-gray-600"><p className="truncate">{q.service}</p></td>
                        <td className="px-4 py-3 font-bold text-[#111827]">{fmtPrice(q.price)}</td>
                        <td className="px-4 py-3 text-gray-500">{fmt(q.validUntil)}</td>
                        <td className="px-4 py-3">
                          <select value={q.status}
                            onChange={e => api.updateQuoteStatus(adminKey, q._id, e.target.value).then(loadData)}
                            className={`cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-bold outline-none ${QUOTE_STATUS_COLORS[q.status]}`}>
                            <option>Draft</option><option>Sent</option><option>Accepted</option><option>Rejected</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => api.previewQuotePdf(adminKey, q._id)} title="Preview PDF"
                              className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-[#1e3a8a] hover:text-[#1e3a8a]">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button onClick={() => api.downloadQuotePdf(adminKey, q._id, q.quoteNumber)} title="Download PDF"
                              className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-[#0c1f3d] hover:text-[#0c1f3d]">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                            <button onClick={() => setSendModal(q)} title="Send to client"
                              className="rounded-lg bg-[#f97316] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#ea6c07]">
                              Send
                            </button>
                            <button onClick={() => handleDeleteQuote(q)} title="Delete"
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
              <Pagination page={qPage} total={quotes.length} onChange={p => setQPage(p)} />
            </div>

            {/* Quote Leads table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 bg-[#f8fafc] px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Leads — Create Quote</p>
              </div>
              {qLeads.length === 0 ? (
                <p className="py-10 text-center text-sm text-gray-400">No leads yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Name', 'Email', 'Phone', 'Message', 'Date', 'Action'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {qLeadsPage.map(lead => (
                      <tr key={lead._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-semibold text-[#111827]">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-500">{lead.email}</td>
                        <td className="px-4 py-3 text-gray-500">{lead.phone || '—'}</td>
                        <td className="max-w-xs px-4 py-3 text-gray-500"><p className="truncate">{lead.description || '—'}</p></td>
                        <td className="px-4 py-3 text-gray-400">{fmt(lead.createdAt)}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => setCreateModal(lead)}
                            className="rounded-lg bg-[#0c1f3d] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1e3a8a]">
                            + Quote
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <Pagination page={qLeadPage} total={qLeads.length} onChange={p => setQLeadPage(p)} />
            </div>
          </div>
        ) : tab === 'invoices' ? (
          /* ── Invoices ── */
          <div className="flex flex-col gap-4">
            {/* Invoices table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 bg-[#f8fafc] px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">All Invoices</p>
              </div>
              {invoices.length === 0 ? (
                <p className="py-16 text-center text-sm text-gray-400">No invoices yet. Create one from a lead below.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Invoice', 'Client', 'Service', 'Price', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {invPage.map(inv => (
                      <tr key={inv._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-bold text-[#0c1f3d]">{inv.invoiceNumber}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-[#111827]">{inv.name}</p>
                          <p className="text-xs text-gray-400">{inv.email}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{inv.service}</td>
                        <td className="px-4 py-3 font-bold text-[#111827]">{fmtPrice(inv.price)}</td>
                        <td className="px-4 py-3 text-gray-500">{fmt(inv.date)}</td>
                        <td className="px-4 py-3">
                          <select value={inv.status}
                            onChange={e => api.updateStatus(adminKey, inv._id, e.target.value).then(loadData)}
                            className={`cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-bold outline-none ${INV_STATUS_COLORS[inv.status]}`}>
                            <option>Pending</option><option>Sent</option><option>Paid</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => api.previewPdf(adminKey, inv._id)} title="Preview PDF"
                              className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-[#1e3a8a] hover:text-[#1e3a8a]">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button onClick={() => api.downloadPdf(adminKey, inv._id, inv.invoiceNumber)} title="Download PDF"
                              className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-[#0c1f3d] hover:text-[#0c1f3d]">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                            <button onClick={() => handleSendInvoice(inv)} disabled={invBusy[inv._id]} title="Send to client"
                              className="rounded-lg bg-[#f97316] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#ea6c07] disabled:opacity-50">
                              {invBusy[inv._id] ? '...' : 'Send'}
                            </button>
                            <button onClick={() => handleDeleteInvoice(inv)} title="Delete"
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
              <Pagination page={iPage} total={invoices.length} onChange={p => setIPage(p)} />
            </div>

            {/* Invoice Leads table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-100 bg-[#f8fafc] px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Leads — Create Invoice</p>
              </div>
              {iLeads.length === 0 ? (
                <p className="py-10 text-center text-sm text-gray-400">No leads yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Name', 'Email', 'Phone', 'Message', 'Date', 'Action'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {iLeadsPage.map(lead => (
                      <tr key={lead._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-semibold text-[#111827]">{lead.name}</td>
                        <td className="px-4 py-3 text-gray-500">{lead.email}</td>
                        <td className="px-4 py-3 text-gray-500">{lead.phone || '—'}</td>
                        <td className="max-w-xs px-4 py-3 text-gray-500"><p className="truncate">{lead.description || '—'}</p></td>
                        <td className="px-4 py-3 text-gray-400">{fmt(lead.createdAt)}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => setInvoiceModal(lead)}
                            className="rounded-lg bg-[#0c1f3d] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1e3a8a]">
                            + Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <Pagination page={iLeadPage} total={iLeads.length} onChange={p => setILeadPage(p)} />
            </div>
          </div>
        ) : (
          /* ── KPI ── */
          <KpiPanel quotes={quotes} invoices={invoices} />
        )}
      </div>
    </div>
  );
}

// ── KPI Panel ─────────────────────────────────────────────────────────────────

function KpiPanel({ quotes, invoices }: { quotes: Quote[]; invoices: Invoice[] }) {
  const qTotal     = quotes.length;
  const qAccepted  = quotes.filter(q => q.status === 'Accepted');
  const qRevenue   = qAccepted.reduce((s, q) => s + q.price, 0);
  const qConv      = qTotal > 0 ? Math.round((qAccepted.length / qTotal) * 100) : 0;
  const qAvg       = qTotal > 0 ? quotes.reduce((s, q) => s + q.price, 0) / qTotal : 0;

  const invPaid    = invoices.filter(i => i.status === 'Paid');
  const invRevenue = invPaid.reduce((s, i) => s + i.price, 0);
  const invPending = invoices.filter(i => i.status === 'Pending').length;

  // Last 6 months — quotes + invoices
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { label: d.toLocaleDateString('en-AU', { month: 'short' }), year: d.getFullYear(), month: d.getMonth(), quotes: 0, invoices: 0 };
  });
  quotes.forEach(q => {
    const d = new Date(q.createdAt);
    const m = months.find(x => x.year === d.getFullYear() && x.month === d.getMonth());
    if (m) m.quotes++;
  });
  invoices.forEach(inv => {
    const d = new Date(inv.date);
    const m = months.find(x => x.year === d.getFullYear() && x.month === d.getMonth());
    if (m) m.invoices++;
  });
  const maxBar = Math.max(...months.map(m => m.quotes + m.invoices), 1);

  const quoteStatuses = [
    { label: 'Draft',    count: quotes.filter(q => q.status === 'Draft').length,    color: 'bg-gray-400' },
    { label: 'Sent',     count: quotes.filter(q => q.status === 'Sent').length,     color: 'bg-blue-500' },
    { label: 'Accepted', count: qAccepted.length,                                   color: 'bg-green-500' },
    { label: 'Rejected', count: quotes.filter(q => q.status === 'Rejected').length, color: 'bg-red-400' },
  ];
  const invoiceStatuses = [
    { label: 'Pending', count: invPending,                                            color: 'bg-yellow-400' },
    { label: 'Sent',    count: invoices.filter(i => i.status === 'Sent').length,      color: 'bg-blue-500' },
    { label: 'Paid',    count: invPaid.length,                                        color: 'bg-green-500' },
  ];

  const kpis = [
    { label: 'Quote Revenue',    value: `$${qRevenue.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`,      sub: 'from accepted quotes' },
    { label: 'Invoice Revenue',  value: `$${invRevenue.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`,    sub: 'from paid invoices' },
    { label: 'Quote Conversion', value: `${qConv}%`,                                                               sub: `${qAccepted.length} of ${qTotal} accepted` },
    { label: 'Avg Quote Value',  value: `$${qAvg.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`,          sub: 'across all quotes' },
    { label: 'Invoices Pending', value: String(invPending),                                                         sub: 'awaiting payment' },
    { label: 'Total Documents',  value: String(qTotal + invoices.length),                                           sub: `${qTotal} quotes · ${invoices.length} invoices` },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{k.label}</p>
            <p className="mt-1 text-2xl font-black text-[#0c1f3d]">{k.value}</p>
            <p className="mt-1 text-xs text-gray-400">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Monthly bar chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-1 text-sm font-black text-[#111827]">Activity — Last 6 Months</p>
          <div className="mb-4 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded-sm bg-[#0c1f3d]" />Quotes</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded-sm bg-[#f97316]" />Invoices</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {months.map(m => (
              <div key={`${m.year}-${m.month}`} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-col justify-end" style={{ height: '100%' }}>
                  <div className="w-full rounded-t-sm bg-[#f97316]" style={{ height: `${(m.invoices / maxBar) * 100}%`, minHeight: m.invoices ? 4 : 0 }} />
                  <div className="w-full bg-[#0c1f3d]" style={{ height: `${(m.quotes / maxBar) * 100}%`, minHeight: m.quotes ? 4 : 0 }} />
                </div>
                <span className="text-[10px] text-gray-400">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status breakdowns */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-3 text-sm font-black text-[#111827]">Quotes by Status</p>
          <div className="mb-5 flex flex-col gap-2">
            {quoteStatuses.map(s => (
              <div key={s.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-gray-600">{s.label}</span>
                  <span className="font-bold text-[#0c1f3d]">{s.count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className={`h-2 rounded-full ${s.color} transition-all`}
                    style={{ width: qTotal > 0 ? `${(s.count / qTotal) * 100}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mb-3 text-sm font-black text-[#111827]">Invoices by Status</p>
          <div className="flex flex-col gap-2">
            {invoiceStatuses.map(s => (
              <div key={s.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-gray-600">{s.label}</span>
                  <span className="font-bold text-[#0c1f3d]">{s.count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className={`h-2 rounded-full ${s.color} transition-all`}
                    style={{ width: invoices.length > 0 ? `${(s.count / invoices.length) * 100}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function AdminClient() {
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
