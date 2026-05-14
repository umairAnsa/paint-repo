import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import ClientOverlays from './components/ui/ClientOverlays';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Norm Painting | Professional Painters Geelong & Melbourne',
    template: '%s | Norm Painting',
  },
  description:
    'Norm Painting delivers premium interior, exterior, and commercial painting services across Geelong and Melbourne. Free quotes, 7-year warranty, fully insured.',
  keywords: [
    'painters Geelong',
    'painters Melbourne',
    'house painting Geelong',
    'interior painting',
    'exterior painting',
    'commercial painting',
    'Norm Painting',
    'painting services Victoria',
  ],
  openGraph: {
    title: 'Norm Painting | Professional Painters Geelong & Melbourne',
    description:
      'Premium painting services across Geelong and Melbourne. Interior, exterior, commercial and colour consultation. Free quotes.',
    type: 'website',
    locale: 'en_AU',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#f8fafc] text-[#111827]" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
        <ClientOverlays />
      </body>
    </html>
  );
}
