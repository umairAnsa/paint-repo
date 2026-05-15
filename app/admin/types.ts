export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
  createdAt: string;
}

export interface Quote {
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

export interface Invoice {
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

export interface AdminBlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: object[];
  published: boolean;
  createdAt: string;
}

export const PAGE_SIZE = 10;

export const QUOTE_STATUS_COLORS: Record<string, string> = {
  Draft:    'bg-gray-100 text-gray-600',
  Sent:     'bg-blue-100 text-blue-700',
  Accepted: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
};

export const INV_STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Sent:    'bg-blue-100 text-blue-800',
  Paid:    'bg-green-100 text-green-800',
};

export function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function fmtPrice(p: number) {
  return `$${p.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`;
}
