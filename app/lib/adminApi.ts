const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function headers(key: string) {
  return { 'Content-Type': 'application/json', 'x-admin-key': key };
}

export async function getLeads(key: string) {
  const r = await fetch(`${BASE}/api/invoice/leads`, { headers: headers(key) });
  if (!r.ok) throw new Error('Unauthorized');
  return r.json();
}

export async function getInvoices(key: string) {
  const r = await fetch(`${BASE}/api/invoice`, { headers: headers(key) });
  if (!r.ok) throw new Error('Unauthorized');
  return r.json();
}

export async function createInvoice(key: string, body: object) {
  const r = await fetch(`${BASE}/api/invoice`, {
    method: 'POST', headers: headers(key), body: JSON.stringify(body),
  });
  return r.json();
}

export async function sendInvoice(key: string, id: string) {
  const r = await fetch(`${BASE}/api/invoice/${id}/send`, {
    method: 'POST', headers: headers(key),
  });
  return r.json();
}

export async function updateStatus(key: string, id: string, status: string) {
  const r = await fetch(`${BASE}/api/invoice/${id}/status`, {
    method: 'PATCH', headers: headers(key), body: JSON.stringify({ status }),
  });
  return r.json();
}

export async function deleteInvoice(key: string, id: string) {
  const r = await fetch(`${BASE}/api/invoice/${id}`, {
    method: 'DELETE', headers: headers(key),
  });
  return r.json();
}

export async function downloadPdf(key: string, id: string, invoiceNumber: string) {
  const r    = await fetch(`${BASE}/api/invoice/${id}/pdf`, { headers: headers(key) });
  const blob = await r.blob();
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `${invoiceNumber}.pdf`; a.click();
  URL.revokeObjectURL(url);
}

export async function previewPdf(key: string, id: string) {
  const r    = await fetch(`${BASE}/api/invoice/${id}/pdf`, { headers: headers(key) });
  const blob = await r.blob();
  const url  = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

// ── Quote API ─────────────────────────────────────────────────────────────────

export async function getQuotes(key: string) {
  const r = await fetch(`${BASE}/api/quote`, { headers: headers(key) });
  if (!r.ok) throw new Error('Unauthorized');
  return r.json();
}

export async function getQuoteLeads(key: string) {
  const r = await fetch(`${BASE}/api/quote/leads`, { headers: headers(key) });
  if (!r.ok) throw new Error('Unauthorized');
  return r.json();
}

export async function createQuote(key: string, body: object) {
  const r = await fetch(`${BASE}/api/quote`, {
    method: 'POST', headers: headers(key), body: JSON.stringify(body),
  });
  return r.json();
}

export async function sendQuote(key: string, id: string, overrideEmail?: string) {
  const r = await fetch(`${BASE}/api/quote/${id}/send`, {
    method: 'POST',
    headers: headers(key),
    body: JSON.stringify({ overrideEmail: overrideEmail || undefined }),
  });
  return r.json();
}

export async function updateQuoteStatus(key: string, id: string, status: string) {
  const r = await fetch(`${BASE}/api/quote/${id}/status`, {
    method: 'PATCH', headers: headers(key), body: JSON.stringify({ status }),
  });
  return r.json();
}

export async function deleteQuote(key: string, id: string) {
  const r = await fetch(`${BASE}/api/quote/${id}`, {
    method: 'DELETE', headers: headers(key),
  });
  return r.json();
}

export async function downloadQuotePdf(key: string, id: string, quoteNumber: string) {
  const r    = await fetch(`${BASE}/api/quote/${id}/pdf`, { headers: headers(key) });
  const blob = await r.blob();
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `${quoteNumber}.pdf`; a.click();
  URL.revokeObjectURL(url);
}

// ── Blog API (uses separate x-blog-key header) ────────────────────────────────

function blogHeaders(key: string) {
  return { 'Content-Type': 'application/json', 'x-blog-key': key };
}

export async function getBlogPosts(key: string) {
  const r = await fetch(`${BASE}/api/blog/admin/all`, { headers: blogHeaders(key) });
  if (!r.ok) throw new Error('Unauthorized');
  return r.json();
}

export async function createBlogPost(key: string, body: object) {
  const r = await fetch(`${BASE}/api/blog`, {
    method: 'POST', headers: blogHeaders(key), body: JSON.stringify(body),
  });
  return r.json();
}

export async function updateBlogPost(key: string, id: string, body: object) {
  const r = await fetch(`${BASE}/api/blog/${id}`, {
    method: 'PUT', headers: blogHeaders(key), body: JSON.stringify(body),
  });
  return r.json();
}

export async function deleteBlogPost(key: string, id: string) {
  const r = await fetch(`${BASE}/api/blog/${id}`, {
    method: 'DELETE', headers: blogHeaders(key),
  });
  return r.json();
}

export async function uploadBlogImage(key: string, image: string, filename: string) {
  const r = await fetch(`${BASE}/api/blog/upload-image`, {
    method: 'POST', headers: blogHeaders(key), body: JSON.stringify({ image, filename }),
  });
  return r.json();
}

export async function previewQuotePdf(key: string, id: string) {
  const r    = await fetch(`${BASE}/api/quote/${id}/pdf`, { headers: headers(key) });
  const blob = await r.blob();
  const url  = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
