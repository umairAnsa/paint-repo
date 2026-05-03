import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../components/landing-page-sections";

export const metadata: Metadata = {
  title: "About Us | Norm Painting",
  description:
    "Learn about Norm Painting, our painting expertise, and why homeowners in Geelong and Melbourne trust our team.",
};

const servicePoints = [
  {
    title: "Quality & Excellence",
    text: "Premium materials and clean finish standards on every project.",
  },
  {
    title: "Trust & Transparency",
    text: "Clear communication, itemized pricing, and practical advice.",
  },
  {
    title: "Reliability & Professionalism",
    text: "On-time teams, tidy workflow, and respectful site care.",
  },
];

const areas = [
  "Geelong",
  "Melbourne",
  "Braybrook",
  "Kingsville",
  "Williamstown",
  "West Footscray",
  "Seddon",
  "Yarraville",
  "Docklands",
  "Newport",
  "Rippleside",
  "South Geelong",
  "Queenscliff",
  "Lara",
  "Corio",
  "Bell Post Hill",
  "Geelong West",
  "Newtown",
  "Armstrong Creek",
  "Grovedale",
  "North Geelong",
  "Norlane",
  "Ocean Grove",
  "Highton",
  "Torquay",
  "Belmont",
  "Manifold Heights",
  "Drysdale",
];

export default function AboutPage() {
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
              About Norm Painting
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Trusted House Painters in
              <br />
              <span className="text-[#F97316]">Geelong &amp; Melbourne</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Interior, exterior and full repaint projects delivered with
              premium paints, tidy workmanship, and practical guidance from one
              local team.
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

        {/* Trust Stats */}
        <section className="bg-white px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { value: "10+", label: "Years of Painting Experience" },
                { value: "7yr", label: "Workmanship Warranty" },
                { value: "100%", label: "Fully Insured" },
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

        {/* About Content */}
        <section className="px-5 py-16 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1E3A8A]">
                — About Us
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
                Bringing Homes to Life with Expert Painting Services
              </h2>
              <p className="mt-5 text-base leading-7 text-gray-600">
                We are a local painting company focused on finish quality,
                preparation, and a stress-free experience. From first
                walkthrough to final handover, we keep every step clear and
                dependable.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Premium Dulux & Taubmans paints",
                  "Full surface preparation",
                  "Free colour consultation",
                  "Punctual & tidy crew",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-semibold text-gray-700"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A]">
                      <svg
                        fill="none"
                        height="10"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        width="10"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_1.1fr]">
              <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1E3A8A]">
                  Vision
                </p>
                <h3 className="mt-3 text-xl font-black text-[#111827]">
                  2028 Vision for Norm Painting
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Build a trusted, high-standard painting brand that clients
                  confidently recommend across local suburbs.
                </p>
              </article>
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85"
                alt="House exterior painting"
                className="h-64 w-full rounded-2xl object-cover shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* Foundation Cards */}
        <section className="bg-white px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
              The Foundation of Our Painting Services
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {servicePoints.map((point) => (
                <article
                  className="group rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#1E3A8A]/20 hover:shadow-md"
                  key={point.title}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A]">
                    <svg
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="16"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[#111827]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {point.text}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 shadow-sm">
                Licence Number: 35000709070
              </div>
              <div className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 shadow-sm">
                ABN: 52704401415
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-linear-to-br from-[#1E3A8A] to-[#1d4ed8] px-5 py-16 text-white sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-300">
                Why Choose Us
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                Why Choose Norm Painting?
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "10+ years combined painting experience in homes of all sizes.",
                "7-year workmanship warranty and clear preparation standards.",
                "Premium products, tidy process, and predictable scheduling.",
                "Friendly communication from quote stage to project completion.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-white/10 p-4 text-sm leading-6"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-orange-300"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
              What Our Clients Say
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <article
                  key={item.name}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-base text-[#F97316]">★★★★★</p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      &ldquo;{item.text}&rdquo;
                    </p>
                    <p className="mt-3 text-sm font-black text-[#111827]">
                      {item.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="bg-white px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1E3A8A]">
              Areas We Serve
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
              Where We Operate
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600">
              We provide residential{" "}
              <span className="font-bold text-[#F97316]">
                painting services
              </span>{" "}
              across Geelong, Melbourne and surrounding suburbs within a 45km
              radius.
            </p>
            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {areas.map((area) => (
                <span
                  key={area}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-gray-200 bg-[#F8FAFC] px-5 text-sm font-semibold text-gray-700 transition hover:border-[#F97316]/40 hover:text-[#F97316]"
                >
                  {area}
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#F97316]"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z"
                      fill="currentColor"
                    />
                    <circle cx="12" cy="10" fill="white" r="2.6" />
                  </svg>
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const testimonials = [
  {
    name: "Angelique Rita",
    text: "Patient and professional team with neat finish quality.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Victoria Davy",
    text: "Great communication and quality delivery on schedule.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Jamie Sweeney",
    text: "Excellent exterior repaint and preparation detail.",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=85",
  },
];
