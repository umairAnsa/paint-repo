'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { submitLead } from '../../lib/submitLead';

const SLIDES = [
  {
    id: 1,
    image: '/projects/project-50.jpg',
    badge: 'Residential Painting',
    title: 'Premium Painting for Every Home',
    highlight: 'Every Home',
    subtitle:
      'Transform your living spaces with expert interior and exterior painting by Geelong\'s most trusted team — on time, every time.',
  },
  {
    id: 2,
    image: '/projects/project-11.jpg',
    badge: 'Commercial Solutions',
    title: 'Professional Commercial Painting Services',
    highlight: 'Commercial',
    subtitle:
      'We handle offices, retail spaces, warehouses, and industrial facilities across Melbourne and Geelong with minimal disruption.',
  },
  {
    id: 3,
    image: '/projects/project-49.jpg',
    badge: 'Expert Colour Consultation',
    title: 'Transform Your Space Inside & Out',
    highlight: 'Inside & Out',
    subtitle:
      'Not sure what colours suit your property? Our expert consultants guide you to the perfect palette for any interior or exterior project.',
  },
];

const SERVICES = [
  'Interior Painting',
  'Exterior Painting',
  'Commercial Painting',
  'Fence & Deck Painting',
  'Roof Painting',
  'Colour Consultation',
  'Other',
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function QuoteForm() {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [service, setService] = useState('');
  const [status, setStatus]   = useState<FormStatus>('idle');
  const [submittedPhone, setSubmittedPhone] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      setSubmittedPhone(phone.trim());
      await submitLead({ name, phone, email, description: `Service: ${service || 'Not specified'}`, source: 'hero' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="animate-fade-up flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f97316]">
          <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-black text-white">Request Received!</p>
        <p className="text-sm text-white/70">
          We&apos;ll call you back within 2 hours at{' '}
          <span className="font-bold text-white">{submittedPhone}</span>.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#f97316]/60 focus:bg-white/15 focus:ring-1 focus:ring-[#f97316]/40';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          required
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className={inputClass}
        />
        <input
          required
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className={inputClass}
        />
      </div>
      <input
        required
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={inputClass}
      />
      <select
        value={service}
        onChange={e => setService(e.target.value)}
        className={`${inputClass} appearance-none`}
      >
        <option value="" disabled className="bg-[#0c1f3d] text-white">Select Service</option>
        {SERVICES.map(s => (
          <option key={s} value={s} className="bg-[#0c1f3d] text-white">{s}</option>
        ))}
      </select>

      {status === 'error' && (
        <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-1 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#f97316] text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#ea6c07] active:scale-[0.98] disabled:opacity-70"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Get Free Quote →'
        )}
      </button>

      <p className="text-center text-[11px] text-white/35">No obligation · Free written quote · Reply within 2 hrs</p>
    </form>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      className="relative h-screen min-h-[620px] max-h-[960px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero image slider"
    >
      {/* Background Images — CSS crossfade, all in DOM */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-[#061524]/92 via-[#0c1f3d]/70 to-[#0c1f3d]/40" />
      <div className="absolute inset-0 bg-linear-to-t from-[#061524]/50 via-transparent to-transparent" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative flex h-full items-center px-5 sm:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">

          {/* Left — Slide text — key change restarts CSS animation */}
          <div key={current} className="animate-fade-up">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
              {SLIDES[current].badge}
            </span>

            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-5xl xl:text-6xl">
              {SLIDES[current].title}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg">
              {SLIDES[current].subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact-us"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f97316] px-7 text-sm font-bold text-white shadow-xl shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
              >
                Get Free Quote
              </Link>
              <Link
                href="/projects"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-7 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/10"
              >
                View Our Work
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right — Quote Form */}
          <div className="hidden lg:block">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-md">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f97316]">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-black text-white">Get a Free Quote</p>
                  <p className="text-xs text-white/50">We reply within 2 hours</p>
                </div>
              </div>
              <QuoteForm />
            </div>
          </div>

        </div>
      </div>

      {/* Prev Arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 sm:left-8"
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 sm:right-8"
        aria-label="Next slide"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-400 ${
              i === current ? 'w-8 bg-[#f97316]' : 'w-2 bg-white/35 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 hidden text-sm font-bold text-white/40 sm:block">
        {String(current + 1).padStart(2, '0')}
        <span className="mx-1.5 text-white/20">/</span>
        {String(SLIDES.length).padStart(2, '0')}
      </div>
    </section>
  );
}
