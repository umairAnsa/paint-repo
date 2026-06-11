'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SERVICES = [
  {
    id: 'interior',
    title: 'Interior Painting',
    description:
      'Fresh, flawless interiors with premium finishes. We prepare and paint walls, ceilings, trims, and feature walls using low-VOC paints safe for your family.',
    href: '/services#interior',
    image: '/projects/project-29.jpg',
  },
  {
    id: 'exterior',
    title: 'Exterior Painting',
    description:
      'Protect and beautify your home\'s exterior. We treat, prime, and paint weatherboards, brick, render, and eaves — built to last against the Australian climate.',
    href: '/services#exterior',
    image: '/projects/project-06.jpg',
  },
  {
    id: 'fence',
    title: 'Fence & Deck Painting',
    description:
      'Restore timber fences, decks, and outdoor structures with weather-resistant stains and paints that withstand UV, moisture, and everyday wear.',
    href: '/services#fence',
    image: '/projects/project-03.jpg',
  },
  {
    id: 'door',
    title: 'Door & Trim Painting',
    description:
      'Make an impression with perfectly painted doors, trims, and architraves. We sand, fill, prime, and apply a smooth, durable topcoat on every surface.',
    href: '/services#door',
    image: '/projects/project-02.jpg',
  },
  {
    id: 'quote',
    title: 'Free Written Quotes',
    description:
      'Detailed, transparent pricing with no hidden fees. We visit your property, assess the work, and deliver a clear itemised quote within one business day.',
    href: '/contact-us',
    image: '/projects/project-24.jpg',
  },
  {
    id: 'review',
    title: 'Satisfaction Guaranteed',
    description:
      'We back every project with a 7-year workmanship warranty. If you\'re not completely happy, we return and make it right — no questions asked.',
    href: '/about-us',
    image: '/projects/project-25.jpg',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="section-kicker">What We Do</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              Full-Service Painting Solutions
            </h2>
          </div>
          <Link
            href="/services"
            className="shrink-0 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-[#1e3a8a] px-6 text-sm font-bold text-[#1e3a8a] transition hover:bg-[#1e3a8a] hover:text-white"
          >
            All Services
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <AnimatedCard key={service.id} index={index}>
            <Link
              href={service.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#1e3a8a]/25 hover:shadow-xl hover:shadow-blue-900/8"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-[#0c1f3d]/0 transition duration-300 group-hover:bg-[#0c1f3d]/15" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-black text-[#111827]">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">{service.description}</p>
              </div>
            </Link>
            </AnimatedCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-[#0c1f3d] px-8 py-10 sm:px-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#f97316]">Ready to Start?</p>
              <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Get a Free, No-Obligation Quote Today
              </h3>
              <p className="mt-2 text-sm text-white/55">
                We respond within one business day and provide detailed written quotes.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f97316] px-7 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
              >
                Get Free Quote
              </Link>
              <a
                href="tel:0406342731"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/8"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
