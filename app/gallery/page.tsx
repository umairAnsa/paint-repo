import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse our before & after gallery of interior, exterior, and feature wall painting projects across Geelong and Melbourne.',
};

const galleryItems = [
  { label: 'Interior Repaint', subtitle: 'Living Room · Geelong', tall: true, index: 0 },
  { label: 'Exterior Weatherboard', subtitle: 'Full House · Melbourne', tall: false, index: 1 },
  { label: 'Feature Accent Wall', subtitle: 'Master Bedroom · Newport', tall: false, index: 2 },
  { label: 'Timber Deck Stain', subtitle: 'Outdoor Area · Williamstown', tall: false, index: 3 },
  { label: 'Fence & Gate', subtitle: 'Full Fence · Yarraville', tall: false, index: 4 },
  { label: 'Pre-Sale Repaint', subtitle: 'Full Home · Highton', tall: false, index: 5 },
  { label: 'Ceiling & Cornices', subtitle: 'Lounge Room · Geelong West', tall: false, index: 6 },
  { label: 'Kitchen Cabinet Paint', subtitle: 'Kitchen · Newtown', tall: false, index: 7 },
  { label: 'Garage Door Refresh', subtitle: 'Double Garage · Belmont', tall: false, index: 8 },
];

export default function GalleryPage() {
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
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            Our Portfolio
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            Before &amp; After
            <br />
            <span className="text-[#f97316]">Gallery</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Browse our completed projects across Geelong and Melbourne — from full exterior repaints to feature walls and timber staining.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/estimate"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
            >
              Get Free Quote
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-8 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/8"
            >
              View Full Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-2xl border border-gray-100 shadow-sm">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '5★', label: 'Average Client Rating' },
              { value: '7yr', label: 'Workmanship Warranty' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-8 text-center">
                <p className="text-3xl font-black text-[#1e3a8a] sm:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="section-kicker mx-auto">Project Portfolio</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">Our Recent Work</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
              Every project is completed with premium paints, thorough preparation, and a clean finish standard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-[#1e3a8a]/20 to-[#0c1f3d]/40 transition hover:-translate-y-1 hover:shadow-xl"
                style={{ minHeight: item.tall ? '380px' : '260px' }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#f97316]/8 to-[#1e3a8a]/15 transition-opacity duration-300 group-hover:opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[80px] font-black text-white/10">
                    {String(item.index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-5">
                  <p className="text-sm font-black text-white">{item.label}</p>
                  <p className="mt-0.5 text-xs text-white/65">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c1f3d] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to Transform Your Home?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/60">
            Get a free quote for your painting project — interior, exterior, or anything in between.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/estimate"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-xl shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]"
            >
              Calculate Your Estimate
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/8"
            >
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
