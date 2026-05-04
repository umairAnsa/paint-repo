'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    id: 1,
    image: '/projects/project-21.jpg',
    badge: 'Residential Painting',
    title: 'Premium Painting for Every Home',
    highlight: 'Every Home',
    subtitle:
      'Transform your living spaces with expert interior and exterior painting by Geelong\'s most trusted team — on time, every time.',
    cta1: { label: 'Get Free Quote', href: '/estimate' },
    cta2: { label: 'View Our Work', href: '/projects' },
  },
  {
    id: 2,
    image: '/projects/project-04.jpg',
    badge: 'Commercial Solutions',
    title: 'Professional Commercial Painting Services',
    highlight: 'Commercial',
    subtitle:
      'We handle offices, retail spaces, warehouses, and industrial facilities across Melbourne and Geelong with minimal disruption.',
    cta1: { label: 'Our Services', href: '/services' },
    cta2: { label: 'Contact Us', href: '/contact' },
  },
  {
    id: 3,
    image: '/projects/project-43.jpg',
    badge: 'Expert Colour Consultation',
    title: 'Transform Your Space Inside & Out',
    highlight: 'Inside & Out',
    subtitle:
      'Not sure what colours suit your property? Our expert consultants guide you to the perfect palette for any interior or exterior project.',
    cta1: { label: 'Book Consultation', href: '/contact' },
    cta2: { label: 'View Gallery', href: '/projects' },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [next, paused]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative h-screen min-h-[620px] max-h-[960px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero image slider"
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#061524]/90 via-[#0c1f3d]/65 to-transparent" />
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

      {/* Slide Content */}
      <div className="relative flex h-full items-center px-5 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
              className="max-w-2xl"
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                {slide.badge}
              </span>

              {/* Heading */}
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg">
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={slide.cta1.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f97316] px-7 text-sm font-bold text-white shadow-xl shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-[#ea6c07] hover:shadow-orange-500/45"
                >
                  {slide.cta1.label}
                </Link>
                <Link
                  href={slide.cta2.href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-7 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/10"
                >
                  {slide.cta2.label}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
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
