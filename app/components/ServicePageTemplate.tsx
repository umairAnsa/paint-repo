import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ServiceData } from '../lib/servicesData';
import CTASection from './sections/CTASection';

export function generateServiceMetadata(service: ServiceData): Metadata {
  return {
    title: `${service.title} | Norm Painting`,
    description: service.metaDescription,
  };
}

export default function ServicePageTemplate({ service }: { service: ServiceData }) {
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
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full blur-3xl" style={{ background: `${service.accent}20` }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <span
            className="inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: `${service.accent}50`, background: `${service.accent}20`, color: service.accent }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.accent }} />
            Our Services
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            {service.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold" style={{ color: service.accent }}>
            {service.tagline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/estimate"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-8 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
              style={{ background: service.accent }}
            >
              Get Free Quote
            </Link>
            <a
              href="tel:0406342731"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-8 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/8"
            >
              Call 0406 342 731
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={service.image}
                alt={service.title}
                width={700}
                height={500}
                className="h-80 w-full object-cover lg:h-[480px]"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: service.accent }} />
            </div>

            {/* Content */}
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{ background: `${service.accent}15`, color: service.accent }}
              >
                {service.title}
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl">
                {service.tagline}
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-500">{service.description}</p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: `${service.accent}15`, color: service.accent }}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/estimate"
                  className="inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                  style={{ background: service.accent, boxShadow: `0 8px 24px ${service.accent}30` }}
                >
                  Get a Quote for This Service
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-gray-200 px-6 text-sm font-bold text-gray-600 transition hover:border-gray-400"
                >
                  All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">Why Norm Painting</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              The Norm Painting Difference
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: '7-Year Warranty', text: 'Every job is backed by a written 7-year workmanship warranty. If it fails due to our work, we fix it free.' },
              { title: 'Free Written Quotes', text: 'Detailed, itemised quotes delivered within one business day. No hidden costs, no surprises.' },
              { title: 'Fully Insured', text: 'Public liability insurance and licensed painters on every job for your complete peace of mind.' },
              { title: 'Premium Products', text: 'We use only top-tier paints from Dulux and Taubmans for results that look better and last longer.' },
              { title: 'Clean & Tidy', text: 'We protect your furniture and floors, and leave your home cleaner than we found it.' },
              { title: 'Local Experts', text: 'Based in Geelong, servicing Melbourne. We understand the local climate and building styles.' },
            ].map((item) => (
              <div key={item.title} className="relative rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                <div className="mb-3 h-1 w-10 rounded-full" style={{ background: service.accent }} />
                <h3 className="text-lg font-black text-[#111827]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
