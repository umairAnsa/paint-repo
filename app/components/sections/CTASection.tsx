import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0c1f3d] px-5 py-20 sm:px-8 sm:py-28">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#f97316]/8 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#1e3a8a]/30 blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#f97316]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
          Limited Availability — Book Now
        </span>

        <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Ready to Transform Your Property?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
          Get a free, detailed written quote within one business day. No obligation, no pressure — just honest advice from your local painting experts.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact-us"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-2xl shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07] hover:shadow-orange-500/40 sm:w-auto"
          >
            Get Free Quote
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="tel:0406342731"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/8 sm:w-auto"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call 0406 342 731
          </a>
          <Link
            href="/contact-us"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/8 sm:w-auto"
          >
            Send a Message
          </Link>
        </div>

        {/* Trust signals */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {[
            'Free Written Quote',
            'No Obligation',
            '7-Year Warranty',
            'Fully Insured',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-white/50">
              <svg className="h-4 w-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
