import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CTASection from '../components/sections/CTASection';

export const metadata: Metadata = {
  title: 'House Painters in Melbourne | Norm Painting',
  description:
    'Looking for professional house painters in Melbourne? Norm Painting delivers premium interior and exterior painting with a 7-year warranty. Free quotes within 24 hours.',
};

const AREAS = [
  'CBD & Inner City', 'South Yarra', 'Richmond', 'Fitzroy', 'Collingwood',
  'St Kilda', 'Brighton', 'Hawthorn', 'Camberwell', 'Balwyn',
  'Doncaster', 'Box Hill', 'Glen Waverley', 'Frankston', 'Dandenong',
  'Footscray', 'Sunshine', 'Werribee', 'Cranbourne', 'Pakenham',
];

const SERVICES = [
  {
    title: 'Interior House Painting',
    description: 'Walls, ceilings, trims, and doors — flawless finishes for every room in your Melbourne home.',
    icon: '🏠',
    href: '/domestic-painting',
  },
  {
    title: 'Exterior House Painting',
    description: 'Weather-resistant coatings built for Melbourne\'s climate. Weatherboard, brick, render and more.',
    icon: '🏡',
    href: '/exterior-painting',
  },
  {
    title: 'Roof Painting',
    description: 'Tile and metal roof restoration. Full clean, treatment, and two-coat application.',
    icon: '🔧',
    href: '/roof-painting',
  },
  {
    title: 'Commercial Painting',
    description: 'Offices, retail, strata, and warehouses across Melbourne. After-hours scheduling available.',
    icon: '🏢',
    href: '/commercial-painting',
  },
  {
    title: 'Colour Consultation',
    description: 'Expert colour advice tailored to your Melbourne property — included free with every job.',
    icon: '🎨',
    href: '/colour-consultation',
  },
  {
    title: 'Heritage Work',
    description: 'Specialists in Melbourne\'s Victorian, Edwardian, and Californian Bungalow homes.',
    icon: '🏛️',
    href: '/heritage-work',
  },
];

const FAQS = [
  {
    q: 'How much does house painting cost in Melbourne?',
    a: 'Painting costs in Melbourne vary depending on the size of your property, surface condition, and the number of coats required. A standard 3-bedroom interior typically ranges from $3,000 to $8,000. We provide free, detailed written quotes within 24 hours so you know exactly what to expect.',
  },
  {
    q: 'How long does it take to paint a house in Melbourne?',
    a: 'A full interior repaint of a 3–4 bedroom home typically takes 3–5 days. Exterior painting can take 2–4 days depending on the size and surface condition. We provide a clear timeline in your quote.',
  },
  {
    q: 'Do you work in all Melbourne suburbs?',
    a: 'Yes — we service all Melbourne suburbs from the CBD to the outer east, west, south-east, and the Mornington Peninsula. We also cover Geelong and surrounding areas.',
  },
  {
    q: 'Are you licensed and insured painters in Melbourne?',
    a: 'Yes. All our painters are fully licensed and we carry comprehensive public liability insurance. Every job is backed by our written 7-year workmanship warranty.',
  },
  {
    q: 'What paint brands do you use?',
    a: 'We use premium Australian paint brands including Dulux and Taubmans. We can also work with any brand you prefer. Our colour consultant can help you select the perfect shades for your home.',
  },
];

export default function HousePaintersMelbournePage() {
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
            Melbourne & Surrounding Suburbs
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            House Painters in Melbourne
            <br />
            <span className="text-[#f97316]">You Can Rely On</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Norm Painting delivers premium interior and exterior house painting across Melbourne and Geelong. Licensed, insured, and backed by a 7-year workmanship warranty.
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
          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2"><span className="text-[#f97316]">✓</span> 7-Year Warranty</span>
            <span className="flex items-center gap-2"><span className="text-[#f97316]">✓</span> Free Written Quotes</span>
            <span className="flex items-center gap-2"><span className="text-[#f97316]">✓</span> Fully Licensed & Insured</span>
            <span className="flex items-center gap-2"><span className="text-[#f97316]">✓</span> 10+ Years Experience</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">What We Offer</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              Painting Services Across Melbourne
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              From single-room refreshes to full exterior repaints, we handle every painting project with care and precision.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link key={s.title} href={s.href}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#f97316]/30 hover:shadow-lg">
                <div className="mb-4 text-3xl">{s.icon}</div>
                <h3 className="text-lg font-black text-[#111827] group-hover:text-[#f97316] transition">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{s.description}</p>
                <p className="mt-4 text-xs font-bold text-[#f97316]">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Image + Why Us */}
      <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/projects/project-47.jpg"
                alt="House painters in Melbourne — Norm Painting"
                width={700}
                height={500}
                className="h-80 w-full object-cover lg:h-[480px]"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#f97316]" />
            </div>
            <div>
              <span className="section-kicker">Why Choose Norm Painting</span>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-4xl">
                Melbourne's Trusted House Painters
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-500">
                With over 10 years serving Melbourne homeowners, we've built our reputation on quality workmanship, honest pricing, and a finish that lasts. Every job — no matter the size — gets the same level of care and attention to detail.
              </p>
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
              <Link href="/contact-us"
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]">
                Get a Free Quote Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Areas We Service */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">Our Service Area</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              Melbourne Suburbs We Service
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              We service all Melbourne suburbs and surrounds. Not sure if we cover your area? Call us — we most likely do.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {AREAS.map((area) => (
              <span key={area}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
                {area}
              </span>
            ))}
            <span className="rounded-full border border-[#f97316]/30 bg-[#f97316]/10 px-4 py-2 text-sm font-bold text-[#f97316]">
              + Many More
            </span>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">FAQs</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              Common Questions
            </h2>
          </div>
          <div className="mt-12 flex flex-col gap-5">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                <h3 className="text-base font-black text-[#111827]">{faq.q}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
