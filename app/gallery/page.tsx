import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../components/landing-page-sections";

export const metadata: Metadata = {
  title: "Gallery | Norm Painting",
  description:
    "Browse our before & after gallery of interior, exterior, and feature wall painting projects across Geelong and Melbourne.",
};

const galleryItems = [
  {
    label: "Interior Repaint",
    subtitle: "Living Room · Geelong",
    tall: true,
    index: 0,
  },
  {
    label: "Exterior Weatherboard",
    subtitle: "Full House · Melbourne",
    tall: false,
    index: 1,
  },
  {
    label: "Feature Accent Wall",
    subtitle: "Master Bedroom · Newport",
    tall: false,
    index: 2,
  },
  {
    label: "Timber Deck Stain",
    subtitle: "Outdoor Area · Williamstown",
    tall: false,
    index: 3,
  },
  {
    label: "Fence & Gate",
    subtitle: "Full Fence · Yarraville",
    tall: false,
    index: 4,
  },
  {
    label: "Pre-Sale Repaint",
    subtitle: "Full Home · Highton",
    tall: false,
    index: 5,
  },
  {
    label: "Ceiling & Cornices",
    subtitle: "Lounge Room · Geelong West",
    tall: false,
    index: 6,
  },
  {
    label: "Kitchen Cabinet Paint",
    subtitle: "Kitchen · Newtown",
    tall: false,
    index: 7,
  },
  {
    label: "Garage Door Refresh",
    subtitle: "Double Garage · Belmont",
    tall: false,
    index: 8,
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-to-br from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8] px-5 py-20 text-white sm:px-8 sm:py-28">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-300">
              Our Portfolio
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Before &amp; After
              <br />
              <span className="text-[#F97316]">Gallery</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Browse our completed projects across Geelong and Melbourne — from
              full exterior repaints to feature walls and timber staining.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/estimate"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
              >
                Get Free Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/30 px-8 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { value: "200+", label: "Projects Completed" },
                { value: "5★", label: "Average Client Rating" },
                { value: "7yr", label: "Workmanship Warranty" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-5 py-8 sm:px-8"
                >
                  <p className="text-5xl font-black text-[#1E3A8A]">
                    {stat.value}
                  </p>
                  <p className="text-sm leading-snug text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1E3A8A]">
                Project Portfolio
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
                Our Recent Work
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
                Every project is completed with premium paints, thorough
                preparation, and a clean finish standard — no shortcuts.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-[#D4C4B0] to-[#BFA98C] transition hover:-translate-y-1 hover:shadow-xl"
                  style={{ minHeight: item.tall ? "380px" : "260px" }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-[#B64A2A]/12 to-[#C99A3A]/18 transition-opacity duration-300 group-hover:opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[80px] font-black text-white/12">
                      {String(item.index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-5">
                    <p className="text-sm font-black text-white">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-white/65">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-linear-to-br from-[#1E3A8A] to-[#1d4ed8] px-5 py-16 text-white sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Ready to Transform Your Home?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/75">
              Get a free quote for your painting project — interior, exterior,
              or anything in between.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/estimate"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
              >
                Calculate Your Estimate
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/30 px-8 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                Talk to Us First
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
