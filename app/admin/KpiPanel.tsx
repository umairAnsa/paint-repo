import type { Quote, Invoice } from './types';

export default function KpiPanel({ quotes, invoices }: { quotes: Quote[]; invoices: Invoice[] }) {
  const qTotal     = quotes.length;
  const qAccepted  = quotes.filter(q => q.status === 'Accepted');
  const qRevenue   = qAccepted.reduce((s, q) => s + q.price, 0);
  const qConv      = qTotal > 0 ? Math.round((qAccepted.length / qTotal) * 100) : 0;
  const qAvg       = qTotal > 0 ? quotes.reduce((s, q) => s + q.price, 0) / qTotal : 0;

  const invPaid    = invoices.filter(i => i.status === 'Paid');
  const invRevenue = invPaid.reduce((s, i) => s + i.price, 0);
  const invPending = invoices.filter(i => i.status === 'Pending').length;

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
    { label: 'Pending', count: invPending,                                          color: 'bg-yellow-400' },
    { label: 'Sent',    count: invoices.filter(i => i.status === 'Sent').length,    color: 'bg-blue-500' },
    { label: 'Paid',    count: invPaid.length,                                      color: 'bg-green-500' },
  ];

  const kpis = [
    { label: 'Quote Revenue',    value: `$${qRevenue.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`,   sub: 'from accepted quotes' },
    { label: 'Invoice Revenue',  value: `$${invRevenue.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`, sub: 'from paid invoices' },
    { label: 'Quote Conversion', value: `${qConv}%`,                                                            sub: `${qAccepted.length} of ${qTotal} accepted` },
    { label: 'Avg Quote Value',  value: `$${qAvg.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`,       sub: 'across all quotes' },
    { label: 'Invoices Pending', value: String(invPending),                                                      sub: 'awaiting payment' },
    { label: 'Total Documents',  value: String(qTotal + invoices.length),                                        sub: `${qTotal} quotes · ${invoices.length} invoices` },
  ];

  return (
    <div className="flex flex-col gap-6">
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
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-1 text-sm font-black text-[#111827]">Activity — Last 6 Months</p>
          <div className="mb-4 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded-sm bg-[#0c1f3d]" />Quotes</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2 w-3 rounded-sm bg-[#f97316]" />Invoices</span>
          </div>
          <div className="flex h-36 items-end gap-3">
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
