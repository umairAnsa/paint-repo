import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";
import FloatingContactButton from "./components/floating-contact-button";
import FloatingGoogleReviews from "./components/floating-google-reviews";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Norm Painting",
  description:
    "Professional house painters in Geelong and Melbourne specialising in interior, exterior, and full repainting services.",
  keywords: [
    "Norm Painting",
    "house painters Geelong",
    "house painters Melbourne",
    "interior painting",
    "exterior painting",
    "residential painting",
  ],
  openGraph: {
    title: "Norm Painting",
    description:
      "Professional house painting services in Geelong and Melbourne.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        {children}
        <FloatingContactButton />
        <FloatingGoogleReviews />
      </body>
    </html>
  );
}
