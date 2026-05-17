import Image from "next/image";
import Link from "next/link";

const PILLARS = [
  {
    title: "Quality First",
    text: "We use only premium Dulux & Taubmans paints with full surface preparation on every project.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3l14 9-14 9V3z"
        />
      </svg>
    ),
  },
  {
    title: "Transparent Pricing",
    text: "Detailed quotes with no hidden costs, so you always know exactly what you're paying for.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <line x1="12" x2="12" y1="1" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "On-Time Delivery",
    text: "We respect your schedule and consistently deliver projects on the agreed timeline.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function AboutPreview() {
  return (
    <section className="overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: Text */}
        <div>
          <span className="section-kicker">About Norm Painting</span>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
            Melbourne&apos;s Trusted Painting Specialists Since 2014
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-500 sm:text-lg">
            We are a locally owned and operated painting company built on honest
            workmanship and genuine client care. From a single room refresh to a
            full exterior transformation, every job receives the same careful
            preparation and premium finish.
          </p>
          <p className="mt-4 text-base leading-7 text-gray-500">
            Our experienced team serves residential and commercial clients
            across Geelong, Melbourne, and surrounding suburbs — always
            delivering lasting results you can be proud of.
          </p>

          {/* Pillars */}
          <ul className="mt-8 flex flex-col gap-5">
            {PILLARS.map((p) => (
              <li key={p.title} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1e3a8a]/8 text-[#1e3a8a]">
                  {p.icon}
                </span>
                <div>
                  <p className="text-sm font-black text-[#111827]">{p.title}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {p.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1e3a8a] px-7 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
            >
              Learn More About Us
            </Link>
            <Link
              href="/estimate"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#f97316] px-7 text-sm font-bold text-[#f97316] transition hover:bg-[#f97316] hover:text-white"
            >
              Get Free Quote
            </Link>
          </div>
        </div>

        {/* Right: Image grid */}
        <div className="relative grid grid-cols-[1fr_1.15fr] grid-rows-[auto_auto] gap-4">
          {/* Top-left card */}
          <div className="overflow-hidden rounded-2xl bg-[#0c1f3d] p-6 text-white">
            <p className="text-3xl font-black text-[#f97316]">10+</p>
            <p className="mt-1 text-sm font-semibold">
              Years serving Geelong &amp; Melbourne
            </p>
            <div className="mt-4 flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#f97316]">
                  ★
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-white/55">Google Reviews</p>
          </div>

          {/* Top-right image */}
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/projects/project-34.jpg"
              alt="Beautiful house exterior after painting"
              width={400}
              height={300}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bottom image (full width) */}
          <div className="relative col-span-2 overflow-hidden rounded-2xl">
            <Image
              src="/projects/project-47.jpg"
              alt="Premium interior painting result"
              width={800}
              height={380}
              loading="lazy"
              className="h-60 w-full object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f97316]">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                  />
                </svg>
              </span>
              <div>
                <p className="text-xs font-black text-[#111827]">
                  7-Year Warranty
                </p>
                <p className="text-xs text-gray-500">On all workmanship</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
