'use client';

import { useState, useEffect, useCallback } from 'react';
import * as api from '../lib/adminApi';
import { type Quote, type Invoice, type Lead } from './types';
import QuotesTab from './QuotesTab';
import InvoicesTab from './InvoicesTab';
import KpiPanel from './KpiPanel';
import CreateQuoteModal from './modals/CreateQuoteModal';
import SendQuoteModal from './modals/SendQuoteModal';
import GenerateInvoiceModal from './modals/GenerateInvoiceModal';

export default function Dashboard({ adminKey, onLogout }: { adminKey: string; onLogout: () => void }) {
  const [tab,      setTab]      = useState<'quotes' | 'invoices' | 'kpi'>('quotes');
  const [quotes,   setQuotes]   = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [qLeads,   setQLeads]   = useState<Lead[]>([]);
  const [iLeads,   setILeads]   = useState<Lead[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState('');
  const [invBusy,  setInvBusy]  = useState<Record<string, boolean>>({});

  // modals
  const [createModal,  setCreateModal]  = useState<Lead | null | undefined>(undefined);
  const [sendModal,    setSendModal]    = useState<Quote | null>(null);
  const [invoiceModal, setInvoiceModal] = useState<Lead | null>(null);

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

  async function handleDeleteQuote(q: Quote) {
    if (!confirm(`Delete ${q.quoteNumber}?`)) return;
    await api.deleteQuote(adminKey, q._id);
    loadData();
  }

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

      {createModal !== undefined && (
        <CreateQuoteModal lead={createModal} adminKey={adminKey}
          onClose={() => setCreateModal(undefined)}
          onCreated={() => { setCreateModal(undefined); setTab('quotes'); loadData(); showToast('Quote created!'); }} />
      )}
      {sendModal && (
        <SendQuoteModal quote={sendModal} adminKey={adminKey}
          onClose={() => setSendModal(null)}
          onSent={() => { setSendModal(null); loadData(); showToast('Quote sent!'); }} />
      )}
      {invoiceModal && (
        <GenerateInvoiceModal lead={invoiceModal} adminKey={adminKey}
          onClose={() => setInvoiceModal(null)}
          onCreated={() => { setInvoiceModal(null); setTab('invoices'); loadData(); showToast('Invoice created!'); }} />
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
          <button onClick={onLogout} className="text-xs font-semibold text-gray-400 hover:text-gray-600">Logout</button>
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
          <div className="flex w-fit gap-1 rounded-xl border border-gray-200 bg-white p-1">
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
          <QuotesTab
            quotes={quotes} qLeads={qLeads} adminKey={adminKey}
            onSetCreateModal={setCreateModal}
            onSetSendModal={setSendModal}
            onDeleteQuote={handleDeleteQuote}
            onStatusChange={loadData}
          />
        ) : tab === 'invoices' ? (
          <InvoicesTab
            invoices={invoices} iLeads={iLeads} adminKey={adminKey} invBusy={invBusy}
            onSetInvoiceModal={setInvoiceModal}
            onSendInvoice={handleSendInvoice}
            onDeleteInvoice={handleDeleteInvoice}
            onStatusChange={loadData}
          />
        ) : (
          <KpiPanel quotes={quotes} invoices={invoices} />
        )}
      </div>
    </div>
  );
}
