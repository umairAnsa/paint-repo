import type { Metadata } from 'next';
import QuotesClient from './quotes-client';

export const metadata: Metadata = { title: 'Admin — Quotes' };

export default function AdminQuotesPage() {
  return <QuotesClient />;
}
