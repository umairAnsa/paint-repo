'use client';

import { useState } from 'react';
import * as api from '../lib/adminApi';
import { type Quote, type Lead, QUOTE_STATUS_COLORS, PAGE_SIZE, fmt, fmtPrice } from './types';
import Pagination from './Pagination';

interface Props {
  quotes: Quote[];
  qLeads: Lead[];
  adminKey: string;
  onSetCreateModal: (lead: Lead | null) => void;
  onSetSendModal: (q: Quote) => void;
  onDeleteQuote: (q: Quote) => void;
  onStatusChange: () => void;
}

export default function QuotesTab({
  quotes, qLeads, adminKey,
  onSetCreateModal, onSetSendModal, onDeleteQuote, onStatusChange,
}: Props) {
  const [qPage,     setQPage]     = useState(1);
  const [qLeadPage, setQLeadPage] = useState(1);

  const quotesPage = quotes.slice((qPage - 1) * PAGE_SIZE, qPage * PAGE_SIZE);
  const qLeadsPage = qLeads.slice((qLeadPage - 1) * PAGE_SIZE, qLeadPage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      {/* Quotes table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 bg-[#f8fafc] px-5 py-3">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">All Quotes</p>
        </div>
        {quotes.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">
            No quotes yet. Click <strong>+ New Quote</strong> to create one.
          </p>
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
                      onChange={e => api.updateQuoteStatus(adminKey, q._id, e.target.value).then(onStatusChange)}
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
                      <button onClick={() => onSetSendModal(q)} title="Send to client"
                        className="rounded-lg bg-[#f97316] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#ea6c07]">
                        Send
                      </button>
                      <button onClick={() => onDeleteQuote(q)} title="Delete"
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
        <Pagination page={qPage} total={quotes.length} onChange={setQPage} />
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
                    <button onClick={() => onSetCreateModal(lead)}
                      className="rounded-lg bg-[#0c1f3d] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1e3a8a]">
                      + Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination page={qLeadPage} total={qLeads.length} onChange={setQLeadPage} />
      </div>
    </div>
  );
}
