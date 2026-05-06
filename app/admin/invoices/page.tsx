import type { Metadata } from 'next';
import InvoicesClient from './invoices-client';

export const metadata: Metadata = { title: 'Admin — Invoices' };

export default function AdminInvoicesPage() {
  return <InvoicesClient />;
}
