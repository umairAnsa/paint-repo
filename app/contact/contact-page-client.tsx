'use client';

import React, { useState } from 'react';
import { submitLead } from '../lib/submitLead';
import Link from 'next/link';

const CONTACT_INFO = [
  {
    label: 'Phone',
    value: '0406 342 731',
    href: 'tel:0406342731',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@normpainting.com.au',
    href: 'mailto:info@normpainting.com.au',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Address',
    value: 'Suite 3, 200 Malop St, Geelong VIC 3220',
    href: 'https://maps.google.com/?q=200+Malop+St+Geelong+VIC+3220',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Business Hours',
    value: 'Mon–Fri 7am–5pm · Sat 8am–2pm',
    href: null,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export function ContactPageClient() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(event: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const description = String(data.get('description') || '').trim();

    if (!name || !email || !description) {
      setErrorMsg('Please fill in your name, email, and message.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      await submitLead({ name, email, phone, description });
      form.reset();
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error. Please try again.');
      setStatus('error');
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0c1f3d] px-5 pb-20 pt-36 sm:px-8 sm:pt-44 sm:pb-28">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#f97316]/8 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            Get In Touch
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            Let&apos;s Talk About
            <br />
            <span className="text-[#f97316]">Your Project</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Whether you need a quick quote, some colour advice, or want to discuss a commercial project — we&apos;re here and happy to help.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr]">

          {/* Left: Info */}
          <div>
            <span className="section-kicker">Contact Details</span>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl">
              We&apos;d Love to Hear From You
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-500">
              Reach out any way you prefer. We aim to respond to all enquiries within one business day.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-[#f8fafc] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1e3a8a]/8 text-[#1e3a8a]">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-gray-400">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="mt-1 block text-sm font-semibold text-[#111827] transition hover:text-[#1e3a8a]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-[#111827]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:0406342731"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1e3a8a] px-7 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Us Now
              </a>
              <Link
                href="/estimate"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#f97316] px-7 text-sm font-bold text-[#f97316] transition hover:bg-[#f97316] hover:text-white"
              >
                Get a Written Quote
              </Link>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-black/5 sm:p-10">
            <h3 className="text-xl font-black text-[#111827]">Send Us a Message</h3>
            <p className="mt-1.5 text-sm text-gray-500">We&apos;ll get back to you within one business day.</p>

            {status === 'success' ? (
              <div className="mt-8 flex flex-col items-center rounded-2xl bg-green-50 px-6 py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                </span>
                <h4 className="mt-4 text-lg font-black text-green-800">Message Sent!</h4>
                <p className="mt-2 text-sm text-green-700">
                  Thanks for reaching out. We&apos;ll be in touch within one business day.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 inline-flex min-h-10 items-center rounded-full bg-green-600 px-6 text-sm font-bold text-white transition hover:bg-green-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="name">
                      Full Name <span className="text-[#f97316]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Smith"
                      className="h-12 rounded-xl border border-gray-200 bg-[#f8fafc] px-4 text-sm text-[#111827] outline-none placeholder:text-gray-400 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/15"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="email">
                      Email Address <span className="text-[#f97316]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="h-12 rounded-xl border border-gray-200 bg-[#f8fafc] px-4 text-sm text-[#111827] outline-none placeholder:text-gray-400 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/15"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0400 000 000"
                    className="h-12 rounded-xl border border-gray-200 bg-[#f8fafc] px-4 text-sm text-[#111827] outline-none placeholder:text-gray-400 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/15"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="description">
                    Your Message <span className="text-[#f97316]">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    placeholder="Tell us about your project — type of work, location, and any other details..."
                    className="resize-none rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-gray-400 focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/15"
                  />
                </div>

                {status === 'error' && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-1 inline-flex min-h-12 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">Find Us</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
              Our Location
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base text-gray-500">
              Suite 3, 200 Malop Street, Geelong VIC 3220
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.4382093!2d144.3547!3d-38.1470!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad41c2c00000001%3A0x0!2s200+Malop+St+Geelong+VIC+3220!5e0!3m2!1sen!2sau!4v1700000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Norm Painting office location"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
