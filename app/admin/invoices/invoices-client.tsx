'use client';

import { useState, useEffect, useCallback, type FormEvent } from 'react';
import * as api from '../../lib/adminApi';

// ── Types ────────────────────────────────────────────────────────────────────

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
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

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Sent:    'bg-blue-100 text-blue-800',
  Paid:    'bg-green-100 text-green-800',
};

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}

function fmtPrice(p: number) {
  return `$${p.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`;
}

// ── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (key: string) => void }) {
  const [key, setKey]   = useState('');
  const [err, setErr]   = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(false);
    try {
      await api.getInvoices(key);
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
        <p className="mb-6 text-center text-sm text-gray-400">Norm Painting · Invoice System</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Enter admin key"
            value={key}
            onChange={e => setKey(e.target.value)}
            required
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30"
          />
          {err && <p className="text-xs text-red-500">Wrong key. Try again.</p>}
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-[#0c1f3d] py-3 text-sm font-bold text-white transition hover:bg-[#1e3a8a] disabled:opacity-60"
          >
            {busy ? 'Checking...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Generate Invoice Modal ────────────────────────────────────────────────────

function GenerateModal({
  lead, adminKey, onClose, onCreated,
}: { lead: Lead; adminKey: string; onClose: () => void; onCreated: () => void }) {
  const [service, setService] = useState(lead.description || '');
  const [price, setPrice]     = useState('');
  const [busy, setBusy]       = useState(false);
  const [err, setErr]         = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const res = await api.createInvoice(adminKey, {
        leadId: lead._id,
        name:    lead.name,
        email:   lead.email,
        phone:   lead.phone,
        service: service.trim(),
        price:   parseFloat(price),
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
            <input
              required
              value={service}
              onChange={e => setService(e.target.value)}
              placeholder="e.g. Interior Painting — 3 bedroom house"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-500">PRICE (AUD)</label>
            <input
              required
              type="number"
              min="1"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="2500.00"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30"
            />
          </div>
          {err && <p className="text-xs text-red-500">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-[#f97316] py-3 text-sm font-bold text-white transition hover:bg-[#ea6c07] disabled:opacity-60"
          >
            {busy ? 'Creating...' : 'Create Invoice'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const [tab, setTab]         = useState<'leads' | 'invoices'>('invoices');
  const [leads, setLeads]     = useState<Lead[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal]     = useState<Lead | null>(null);
  const [busy, setBusy]       = useState<Record<string, boolean>>({});
  const [toast, setToast]     = useState('');

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [l, i] = await Promise.all([api.getLeads(adminKey), api.getInvoices(adminKey)]);
      setLeads(l.leads);
      setInvoices(i.invoices);
    } catch {
      onLogout();
    } finally {
      setLoading(false);
    }
  }, [adminKey, onLogout]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleSend(inv: Invoice) {
    setBusy(b => ({ ...b, [inv._id]: true }));
    const res = await api.sendInvoice(adminKey, inv._id);
    setBusy(b => ({ ...b, [inv._id]: false }));
    if (res.success) { showToast('Invoice sent!'); loadData(); }
    else showToast('Send failed.');
  }

  async function handleStatus(inv: Invoice, status: string) {
    await api.updateStatus(adminKey, inv._id, status);
    loadData();
  }

  async function handleDelete(inv: Invoice) {
    if (!confirm(`Delete ${inv.invoiceNumber}?`)) return;
    await api.deleteInvoice(adminKey, inv._id);
    loadData();
  }

  async function handleDownload(inv: Invoice) {
    try { await api.downloadPdf(adminKey, inv._id, inv.invoiceNumber); }
    catch { showToast('PDF download failed.'); }
  }

  async function handlePreview(inv: Invoice) {
    try { await api.previewPdf(adminKey, inv._id); }
    catch { showToast('Preview failed.'); }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Toast */}
      {toast && (
        <div className="fixed right-5 top-5 z-50 rounded-xl bg-[#0c1f3d] px-5 py-3 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <GenerateModal
          lead={modal}
          adminKey={adminKey}
          onClose={() => setModal(null)}
          onCreated={() => { setModal(null); setTab('invoices'); loadData(); }}
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
              <p className="text-xs text-gray-400">Invoice Admin</p>
            </div>
          </div>
          <button onClick={onLogout} className="text-xs font-semibold text-gray-400 hover:text-gray-600">
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Total Invoices', value: invoices.length },
            { label: 'Pending',        value: invoices.filter(i => i.status === 'Pending').length },
            { label: 'Paid',           value: invoices.filter(i => i.status === 'Paid').length },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{s.label}</p>
              <p className="mt-1 text-3xl font-black text-[#0c1f3d]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-xl border border-gray-200 bg-white p-1 w-fit">
          {(['invoices', 'leads'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-5 py-2 text-sm font-bold transition ${
                tab === t ? 'bg-[#0c1f3d] text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {t === 'invoices' ? `Invoices (${invoices.length})` : `Leads (${leads.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-gray-400">Loading...</div>
        ) : tab === 'invoices' ? (
          /* ── Invoices Table ── */
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {invoices.length === 0 ? (
              <p className="py-16 text-center text-sm text-gray-400">No invoices yet. Go to Leads to create one.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#f8fafc]">
                    {['Invoice', 'Client', 'Service', 'Price', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {invoices.map(inv => (
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
                        <select
                          value={inv.status}
                          onChange={e => handleStatus(inv, e.target.value)}
                          className={`rounded-full px-3 py-1 text-xs font-bold cursor-pointer border-0 outline-none ${STATUS_COLORS[inv.status]}`}
                        >
                          <option>Pending</option>
                          <option>Sent</option>
                          <option>Paid</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePreview(inv)}
                            title="Preview PDF"
                            className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDownload(inv)}
                            title="Download PDF"
                            className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-[#0c1f3d] hover:text-[#0c1f3d]"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleSend(inv)}
                            disabled={busy[inv._id]}
                            title="Send to client"
                            className="rounded-lg bg-[#f97316] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#ea6c07] disabled:opacity-50"
                          >
                            {busy[inv._id] ? '...' : 'Send'}
                          </button>
                          <button
                            onClick={() => handleDelete(inv)}
                            title="Delete"
                            className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:border-red-300 hover:text-red-500"
                          >
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
        ) : (
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
                        <button
                          onClick={() => setModal(lead)}
                          className="rounded-lg bg-[#0c1f3d] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1e3a8a]"
                        >
                          + Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function InvoicesClient() {
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
