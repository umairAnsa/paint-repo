import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { LocationData } from '../lib/locationsData';
import CTASection from './sections/CTASection';

export function generateLocationMetadata(location: LocationData): Metadata {
  return {
    title: `Painters in ${location.name} | Norm Painting`,
    description: location.metaDescription,
  };
}

const SERVICES = [
  { title: 'Interior Painting', href: '/domestic-painting' },
  { title: 'Exterior Painting', href: '/exterior-painting' },
  { title: 'Roof Painting', href: '/roof-painting' },
  { title: 'Commercial Painting', href: '/commercial-painting' },
  { title: 'Heritage Work', href: '/heritage-work' },
  { title: 'Colour Consultation', href: '/colour-consultation' },
];

export default function LocationPageTemplate({ location }: { location: LocationData }) {
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
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#f97316]/8 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            {location.region}
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            Painters in {location.name}
            <br />
            <span className="text-[#f97316]">You Can Trust</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Norm Painting delivers premium interior and exterior painting in {location.name} and surrounding areas. Licensed, insured, and backed by a 7-year workmanship warranty.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
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
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2"><span className="text-[#f97316]">✓</span> 7-Year Warranty</span>
            <span className="flex items-center gap-2"><span className="text-[#f97316]">✓</span> Free Written Quotes</span>
            <span className="flex items-center gap-2"><span className="text-[#f97316]">✓</span> Fully Licensed & Insured</span>
            <span className="flex items-center gap-2"><span className="text-[#f97316]">✓</span> 10+ Years Experience</span>
          </div>
        </div>
      </section>

      {/* About This Area */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={location.image}
                alt={`Painters in ${location.name} — Norm Painting`}
                width={700}
                height={500}
                className="h-80 w-full object-cover lg:h-[480px]"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#f97316]" />
            </div>
            <div>
              <span className="section-kicker">Painting in {location.name}</span>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl">
                Your Local {location.name} Painting Experts
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-500">{location.description}</p>
              <ul className="mt-8 grid gap-4">
                {[
                  { title: '7-Year Workmanship Warranty', text: 'Written warranty on every job. If it fails due to our work, we fix it free.' },
                  { title: 'Free Quote Within 24 Hours', text: 'Detailed, itemised written quotes. No hidden costs, no surprises.' },
                  { title: 'Premium Paints Only', text: 'Dulux and Taubmans products for results that look better and last longer.' },
                  { title: 'Clean & Respectful', text: 'We protect your home and leave it cleaner than we found it.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f97316]/15 text-[#f97316]">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#111827]">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact-us"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
              >
                Get a Free Quote in {location.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">What We Offer</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              Painting Services in {location.name}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              From single-room refreshes to full exterior repaints, we handle every painting project in {location.name} with care and precision.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link key={s.title} href={s.href}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#f97316]/30 hover:shadow-lg">
                <h3 className="text-lg font-black text-[#111827] group-hover:text-[#f97316] transition">{s.title}</h3>
                <p className="mt-4 text-xs font-bold text-[#f97316]">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">Surrounding Suburbs</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              Areas Near {location.name} We Also Service
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              We service {location.name} and all surrounding suburbs. Not sure if we cover your street? Call us — we almost certainly do.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {location.nearbyAreas.map((area) => (
              <span key={area}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
