import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore Norm Painting\'s full range of services — interior, exterior, roof, commercial, fence, and colour consultation across Geelong and Melbourne.',
};

const SERVICES = [
  {
    id: 'interior',
    title: 'Interior Painting',
    tagline: 'Flawless walls. Every room.',
    description:
      'We transform interiors with meticulous preparation and premium finishes. Whether it\'s a single accent wall or a full home interior, our team sands, fills, primes, and paints every surface to perfection. We use low-VOC and washable paints safe for families and pets.',
    features: [
      'Full wall, ceiling, and trim coverage',
      'Feature wall and colour-blocking options',
      'Low-VOC, family-safe paint options',
      'Furniture protection and full clean-up included',
    ],
    image: '/projects/project-05.jpg',
    accent: '#1e3a8a',
  },
  {
    id: 'exterior',
    title: 'Exterior Painting',
    tagline: 'Built to outlast the elements.',
    description:
      'Your home\'s exterior takes the brunt of the Australian climate every day. We use weather-resistant coatings and thorough preparation — including pressure washing, crack-filling, and spot-priming — to ensure a finish that protects and beautifies for years.',
    features: [
      'Weatherboard, brick, render and hardie plank',
      'Pressure washing and full surface prep',
      'UV and moisture-resistant top coats',
      'Fascias, soffits, and eave painting',
    ],
    image: '/projects/project-06.jpg',
    accent: '#0f766e',
  },
  {
    id: 'fence',
    title: 'Fence & Deck Painting',
    tagline: 'Restore. Protect. Enjoy.',
    description:
      'Outdoor timber is constantly exposed to sun, rain, and wear. We strip old coatings, treat timber, and apply durable stains or paints specifically formulated for outdoor conditions — bringing your fences and decks back to life.',
    features: [
      'Timber stripping and sanding',
      'Anti-mould and anti-rust treatment',
      'UV-stabilised deck stains and paints',
      'Pool surrounds and pergolas',
    ],
    image: '/projects/project-03.jpg',
    accent: '#b45309',
  },
  {
    id: 'door',
    title: 'Door & Trim Painting',
    tagline: 'First impressions count.',
    description:
      'Doors, trims, and architraves are often the most noticeable details in a space. We sand back to a smooth surface, fill all imperfections, apply primer, and finish with a factory-smooth topcoat that makes your doors and trims look brand new.',
    features: [
      'Front doors, interior and bi-fold doors',
      'Architraves, skirting boards, and window trims',
      'Full sand-back and fill preparation',
      'Semi-gloss and high-gloss finish options',
    ],
    image: '/projects/project-02.jpg',
    accent: '#7c3aed',
  },
  {
    id: 'quote',
    title: 'Free Written Quotes',
    tagline: 'Transparent pricing. No surprises.',
    description:
      'Every quote is a detailed written document itemising all labour, materials, and preparatory work. We visit your property, assess the full scope, and deliver your quote within one business day — no obligation, no pressure.',
    features: [
      'On-site property inspection included',
      'Itemised labour and materials breakdown',
      'Delivered within one business day',
      'No obligation to proceed',
    ],
    image: '/projects/project-24.jpg',
    accent: '#f97316',
  },
  {
    id: 'review',
    title: 'Satisfaction Guarantee',
    tagline: 'We don\'t stop until you\'re happy.',
    description:
      'Every project we complete is backed by a 7-year workmanship warranty. If any aspect of our painting fails due to our workmanship within the warranty period, we return and rectify it at no cost. Your satisfaction is our benchmark.',
    features: [
      '7-year workmanship warranty',
      'Post-job inspection walkthrough',
      'Touch-up service included',
      'Ongoing client support',
    ],
    image: '/projects/project-25.jpg',
    accent: '#059669',
  },
];

const PROCESS = [
  { step: '01', title: 'Free Quote', text: 'We visit your property, assess the scope of work, and deliver a detailed written quote within 24 hours.' },
  { step: '02', title: 'Plan & Schedule', text: 'We agree on start dates, colour selections, and any special requirements to fit your schedule.' },
  { step: '03', title: 'Preparation', text: 'All surfaces are cleaned, sanded, filled, and primed before a single drop of paint is applied.' },
  { step: '04', title: 'Painting', text: 'Our team works cleanly and efficiently, applying premium coatings to achieve a flawless, lasting finish.' },
  { step: '05', title: 'Inspection', text: 'We walk through the finished project with you, addressing any touch-ups before we consider the job done.' },
  { step: '06', title: 'Warranty', text: 'You receive written confirmation of your 7-year workmanship warranty and our contact details for any future questions.' },
];

export default function ServicesPage() {
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
            What We Offer
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            Painting Services Tailored
            <br />
            <span className="text-[#f97316]">to Your Property</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            From a single room refresh to a full commercial fit-out, we have the expertise, equipment, and premium products to handle any painting project with care and precision.
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
        </div>
      </section>

      {/* Services List */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-20">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={700}
                    height={480}
                    className="h-80 w-full object-cover lg:h-[420px]"
                  />
                  {/* Overlay accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ background: service.accent }} />
                </div>

                {/* Content */}
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: `${service.accent}15`, color: service.accent }}>
                    {service.title}
                  </span>
                  <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl">
                    {service.tagline}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-gray-500">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${service.accent}15`, color: service.accent }}>
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
                      href="/contact-us"
                      className="inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"
                      style={{ background: service.accent, boxShadow: `0 8px 24px ${service.accent}30` }}
                    >
                      Get a Quote for This Service
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">How It Works</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              Our 6-Step Process
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              A clear, proven process that ensures consistent quality and a stress-free experience on every project.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((step) => (
              <div key={step.step} className="relative rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                <span className="text-5xl font-black text-[#1e3a8a]/10">{step.step}</span>
                <h3 className="mt-2 text-lg font-black text-[#111827]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{step.text}</p>
                {/* Accent bar */}
                <div className="absolute bottom-0 left-0 h-1 w-12 rounded-full bg-[#f97316]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c1f3d] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/60">
            Request a free written quote today and let our team show you what premium painting looks like.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
            >
              Get Free Quote
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/8"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
