import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Norm Painting — our story, values, and why homeowners and businesses across Geelong and Melbourne trust our team.',
};

const VALUES = [
  {
    title: 'Quality First',
    text: 'We never cut corners. Every surface is properly prepared, primed, and finished with premium-grade Dulux and Taubmans products.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Honest Communication',
    text: 'No jargon, no surprises. We explain everything clearly — from the quote stage through to final handover — and always do what we say.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Reliability',
    text: 'We show up on time, work cleanly, and complete projects on schedule. Your home and your time are respected throughout the entire job.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Lasting Results',
    text: 'We back every project with a 7-year workmanship warranty because we stand behind the quality of every brushstroke we apply.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Transparent Pricing',
    text: 'Detailed written quotes with itemised costs. No hidden extras, no vague estimates — just clear, fair pricing from the start.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <line x1="12" x2="12" y1="1" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Local Expertise',
    text: 'As a Geelong-based business, we understand local conditions, climate, and architectural styles — ensuring finishes that perform and look great year-round.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const MILESTONES = [
  { year: '2014', title: 'Founded in Geelong', text: 'Norm Painting launched with a commitment to quality residential painting in the Geelong region.' },
  { year: '2017', title: 'Expanded to Melbourne', text: 'Growing demand led us to extend our services to Melbourne\'s inner west suburbs.' },
  { year: '2019', title: 'Commercial Division', text: 'We launched a dedicated commercial painting team serving offices, retail and industrial clients.' },
  { year: '2021', title: '500 Projects Milestone', text: 'We completed our 500th project — a full exterior repaint in Highton, Geelong.' },
  { year: '2024', title: 'Award Recognition', text: 'Recognised as one of Geelong\'s top-rated painting contractors on Google with 120+ five-star reviews.' },
];

const STATS = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '10+', label: 'Years in Business' },
  { value: '7yr', label: 'Workmanship Warranty' },
  { value: '120+', label: 'Five-Star Reviews' },
];

export default function AboutPage() {
  return (
    <main>
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-[#0c1f3d] px-5 pb-20 pt-36 sm:px-8 sm:pt-44 sm:pb-28">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#f97316]/8 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            About Norm Painting
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            Built on Workmanship,
            <br />
            <span className="text-[#f97316]">Driven by Integrity</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Norm Painting is a locally owned painting company serving Geelong and Melbourne since 2014. We believe every project deserves genuine care, thorough preparation, and a finish that lasts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/estimate"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
            >
              Get Free Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-8 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/8"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center bg-white px-6 py-8 text-center ${i < STATS.length - 1 ? '' : ''}`}
              >
                <p className="text-4xl font-black text-[#1e3a8a]">{stat.value}</p>
                <p className="mt-1.5 text-sm font-semibold text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          {/* Text */}
          <div>
            <span className="section-kicker">Our Story</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              A Decade of Painting Excellence
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-500">
              Norm Painting started in 2014 with a simple belief: that every client deserves the same meticulous care, whether it&apos;s a single feature wall or a full commercial fit-out. We built our reputation one project at a time by showing up, doing the work properly, and treating every home like our own.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-500">
              Today, our experienced team operates across Geelong, Melbourne, and surrounding regions — bringing the same dedication and premium-quality finishes that have earned us 120+ five-star reviews and thousands of satisfied clients.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Premium Dulux & Taubmans paints',
                'Full surface preparation every time',
                'Free colour consultation included',
                'Tidy, professional crew on every job',
                'Licensed and fully insured',
                '7-year workmanship warranty',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-gray-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a]">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 rounded-xl border border-gray-100 bg-[#f8fafc] p-4 text-sm text-gray-600">
              <span className="font-bold text-[#111827]">Licence:</span> 35000709070
              <span className="text-gray-300">|</span>
              <span className="font-bold text-[#111827]">ABN:</span> 84 673 345 054
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/projects/project-49.jpg"
                alt="Beautifully painted home exterior"
                width={400}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl bg-[#0c1f3d] p-6 text-white">
                <p className="text-3xl font-black text-[#f97316]">500+</p>
                <p className="mt-1 text-sm font-semibold text-white/80">Projects completed across VIC</p>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-2xl">
                <Image
                  src="/projects/project-50.jpg"
                  alt="Professional painter at work"
                  width={400}
                  height={320}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">Our Values</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              The Principles Behind Every Project
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              Everything we do is guided by six core values that ensure you receive a premium experience from first call to final coat.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <article
                key={v.title}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#1e3a8a]/20 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a8a]/8 text-[#1e3a8a]">
                  {v.icon}
                </span>
                <h3 className="mt-5 text-lg font-black text-[#111827]">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="section-kicker mx-auto">Our Journey</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              How We Got Here
            </h2>
          </div>

          <div className="relative mt-14">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-gray-200 sm:left-1/2" />

            <div className="flex flex-col gap-10">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 sm:gap-10 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <span className="inline-flex items-center rounded-full bg-[#f97316]/10 px-3 py-1 text-xs font-black text-[#f97316]">
                      {m.year}
                    </span>
                    <h3 className="mt-3 text-lg font-black text-[#111827]">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-500">{m.text}</p>
                  </div>

                  {/* Dot */}
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#1e3a8a] shadow-md sm:order-none">
                    <span className="text-xs font-black text-white">{m.year.slice(2)}</span>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-[#0c1f3d] px-5 py-20 sm:px-8 sm:py-28">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#f97316]/8 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="section-kicker" style={{ color: '#f97316' }}>Why Choose Us</span>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              The Norm Painting Difference
            </h2>
            <p className="mt-5 text-base leading-7 text-white/60">
              There are plenty of painters out there. Here&apos;s what makes our clients choose us — and come back again.
            </p>
            <Link
              href="/estimate"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#f97316] px-7 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
            >
              Get Free Quote
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: '10+ Years Experience', text: 'A decade of painting homes and businesses across Geelong and Melbourne to the highest standard.' },
              { title: '7-Year Warranty', text: 'We stand behind our work. If anything fails due to workmanship, we fix it — no charge.' },
              { title: 'Premium Materials', text: 'We only use top-grade Dulux and Taubmans paints, primers, and fillers on every project.' },
              { title: 'Tidy Site Policy', text: 'We respect your property. Furniture is protected, dust is contained, and clean-up is included.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white/8 p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316]">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/55">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-gray-500">
            Get in touch for a free, no-obligation quote and let our team bring your vision to life.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/estimate"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1e3a8a] px-8 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
            >
              Get Free Quote
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-gray-200 px-8 text-sm font-bold text-gray-700 transition hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
