"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { Header, Footer } from "../components/landing-page-sections";

const serviceCards = [
  {
    title: "Interior painting",
    image: "/services/interior.png",
    alt: "Freshly painted interior room",
    intro:
      "Our interior house painting services are designed to refresh and revitalise your living space. Whether you need a single room painting or a full house repaint, we deliver flawless finishes with the perfect choice of colours and textures.",
    bullets: [
      "Interior wall painting - Smooth, vibrant finishes that enhance your space",
      "Ceiling painting specialists - Flawless white ceilings or feature ceiling designs",
      "Trim and moulding painting - Clean, sharp lines for a polished look",
      "Door painting professionals - Expert coating for a sleek, modern touch",
      "Window frame painting - Long-lasting protection and aesthetic appeal",
      "Kitchen painting services - Refresh cabinets, walls, and trims with durable paints",
      "Bathroom painting solutions - Mould-resistant paints for a fresh, clean look",
      "Feature wall painting - Add a unique accent with bold or textured finishes",
    ],
    outro:
      "We use eco-friendly house painting solutions with low-VOC paints, ensuring a safe and odour-free environment for your family.",
  },
  {
    title: "Exterior painting",
    image: "/services/exterior.png",
    alt: "Blue and cream house exterior paintwork",
    intro:
      "Our exterior house painting services protect your home from the elements while giving it a fresh, new look. We specialise in weather-resistant painting solutions that stand up to Geelong's climate.",
    bullets: [
      "Exterior home painting - Full house repainting services for a stunning facelift",
      "Restore your weatherboards - Expert preparation and repainting for long-lasting results",
      "Fence painting services - Protect and enhance your boundary with durable coatings",
      "Deck painting and staining - Preserve your timber with high-quality timber painting",
      "Door and window painting - A fresh, sleek finish to match your home's exterior",
      "Eaves and gutter painting - Improve curb appeal with a clean, uniform look",
      "Brick painting and render painting - Modernise your home with contemporary colours",
    ],
    outro:
      "We follow thorough surface preparation, including cleaning, sanding, priming, and sealing, to ensure a smooth and long-lasting finish.",
  },
  {
    title: "House Repainting",
    image: "/services/door.png",
    alt: "Gloss painted front door",
    intro:
      "Whether you are preparing your home for sale, upgrading its look, or maintaining its condition, our house repainting services are the perfect solution.",
    bullets: [
      "Pre-sale house painting to boost property value",
      "House painting for property investors - Quick, professional repaints for rentals",
      "Rental property painting - Keep your investment looking its best",
      "Touch-up painting services for minor damage and wear",
    ],
    outro:
      "A house repaint not only improves aesthetics but also protects surfaces from damage, ensuring long-term savings on maintenance.",
  },
  {
    title: "Custom Painting",
    image: "/services/fence.png",
    alt: "Freshly painted grey fence",
    intro:
      "In addition to interior and exterior painting, we offer tailored solutions to meet your specific needs.",
    bullets: [
      "New home painting services - Fresh paint for newly built homes",
      "Custom home painting Geelong - Personalised colour schemes for unique designs",
      "Residential painting contractors for large-scale projects",
      "Painting services for home renovation projects",
      "Home exterior upgrades with modern colour schemes",
    ],
    outro:
      "We work closely with homeowners, real estate investors, and renovators to deliver high-quality painting solutions that exceed expectations.",
  },
];

const whyItems = [
  "Reliable painting contractors with years of experience",
  "Affordable house painting in Geelong & Melbourne without compromising quality",
  "Expert guidance in colour selection and paint finishes",
  "Use of premium, weather-resistant paints for durability",
  "On-time completion with minimal disruption to your home",
  "Backed by a 7-year workmanship warranty",
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
  "ArmStrong Creek",
  "Grovedale",
  "North Geelong",
  "Norlane",
  "Ocean Grove",
  "Highton",
  "Torquay",
  "Belmont",
  "Geelong West",
  "Manifold Heights",
  "Drysdale",
];

const reviews = [
  {
    name: "Angelique Rita",
    text: "Kesh & The Team were absolutely sensational! They were patient and transformed our home after it was in terrible condition.",
  },
  {
    name: "Victoria Davy (Vix)",
    text: "Avine were excellent. We had a large lounge room painted and the work was finished on time and looks great.",
  },
];

export function ServicesPageClient() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1E3A8A]">
          Our services
        </p>
        <h1 className="mx-auto mt-5 max-w-225 text-[42px] font-black leading-[1.06] tracking-tight text-[#111827] sm:text-6xl lg:text-[76px]">
          Our House Painting
          <br />
          Services in Geelong
        </h1>
        <p className="mx-auto mt-6 max-w-180 text-base leading-7 text-gray-600 sm:leading-8">
          Professional painting services that bring your home to life with
          precision, quality, and unmatched attention to detail.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-6 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
            href="#quote"
          >
            Get A Quote
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#1E3A8A] px-6 text-sm font-bold text-[#1E3A8A] transition hover:bg-[#1E3A8A] hover:text-white hover:-translate-y-0.5"
            href="/contact"
          >
            Contact Us
          </a>
        </div>
      </section>

      <section className="px-5 py-16 text-center sm:px-8 lg:py-24">
        <div className="mx-auto max-w-280">
          <h2 className="text-[30px] font-black leading-[1.15] tracking-tight sm:text-[44px] lg:text-[52px]">
            We specialise in professional house painting services across Geelong
            and surrounding areas. Whether you need interior house painting,
            exterior house painting, or a full house repaint, we deliver
            top-tier results with attention to detail, premium materials, and
            exceptional craftsmanship.
          </h2>
          <p className="mx-auto mt-7 max-w-260 text-base leading-7 sm:leading-8">
            We understand that a well-painted home not only enhances its
            appearance but also protects it from weather damage and wear.
            That&apos;s why we use high-quality, durable paints and follow
            meticulous preparation techniques to ensure long-lasting finishes.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-x-9 gap-y-14 text-left lg:grid-cols-2">
          {serviceCards.map((service) => (
            <article className="flex flex-col" key={service.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={service.alt}
                className="w-full h-auto rounded-[22px] shrink-0"
                src={service.image}
              />
              <h3 className="mt-7 text-[32px] font-black leading-tight tracking-tight sm:text-[42px]">
                {service.title}
              </h3>
              <p className="mt-5 text-[15px] leading-7">
                {highlightServiceText(service.intro)}
              </p>
              <p className="mt-5 text-[15px] leading-7">
                Our {service.title} Services Include:
              </p>
              <ul className="mt-4 list-disc space-y-2.5 pl-6 text-sm leading-6">
                {service.bullets.map((item) => (
                  <li key={item}>{formatBullet(item)}</li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-7">{service.outro}</p>
              <a
                className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#1E3A8A] px-6 text-sm font-bold text-white transition hover:bg-[#1d4ed8] hover:-translate-y-0.5"
                href="/contact"
              >
                Learn More
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 text-center sm:px-8 lg:py-24">
        <p className="text-sm font-black">Why Us</p>
        <h2 className="mx-auto mt-5 max-w-205 text-[36px] font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-[58px]">
          Why Choose Our House Painting Services in Geelong?
        </h2>
        <p className="mx-auto mt-6 max-w-190 text-base leading-7 sm:leading-8">
          Our commitment to quality and customer satisfaction sets us apart in
          Geelong&apos;s painting industry. We deliver exceptional results every
          time.
        </p>
        <div className="mx-auto mt-14 grid max-w-7xl gap-x-10 gap-y-12 md:grid-cols-3">
          {whyItems.map((item, index) => (
            <article key={item}>
              <p className="text-[42px] font-black leading-none text-[#1E3A8A]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mx-auto mt-5 max-w-85 text-sm leading-6 sm:text-base sm:leading-7">
                {item}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-5">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-6 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
            href="#quote"
          >
            Get A Free Quote
          </a>
          <a
            className="inline-flex min-h-12 items-center gap-3 px-2 text-base font-medium text-[#1E3A8A]"
            href="tel:0406342731"
          >
            Call Now <span aria-hidden="true">&gt;</span>
          </a>
        </div>
      </section>

      <section
        id="quote"
        className="bg-linear-to-br from-[#0f172a] to-[#1e3a8a] px-5 py-16 text-center text-white sm:px-8 lg:py-24"
      >
        <h2 className="mx-auto max-w-225 text-[36px] font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-[58px]">
          Get a Free Quote from the
          <br className="hidden sm:block" /> Best Painters in Geelong
        </h2>
        <p className="mx-auto mt-5 max-w-190 text-base leading-7 sm:leading-8">
          Get a free, no-obligation quote from Geelong&apos;s most trusted
          painting professionals today.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-6 text-sm font-bold text-white shadow-lg shadow-orange-300/30 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
            href="/estimate"
          >
            Get A Free Quote
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/30 px-6 text-sm font-bold text-white transition hover:border-white/60 hover:-translate-y-0.5"
            href="/contact"
          >
            Contact Us
          </a>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <Image
            alt="White fence and house exterior"
            className="aspect-[1.08] w-full rounded-3xl object-cover lg:aspect-square"
            height={1134}
            src="/services/quote.png"
            width={1134}
          />
          <form className="mx-auto w-full max-w-140 rounded-3xl border border-white/60 bg-[#2c2c2c] p-5 sm:p-7">
            <div className="grid gap-4">
              <input
                className="contact-field min-h-14"
                placeholder="Full Name"
                type="text"
              />
              <input
                className="contact-field min-h-14"
                placeholder="Email"
                type="email"
              />
              <input
                className="contact-field min-h-14"
                placeholder="Phone Number"
                type="tel"
              />
              <textarea
                className="contact-field min-h-40 resize-none py-4"
                placeholder="Message"
              />
              <button
                className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-black"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Image
            alt="Red painted fence project"
            className="aspect-[1.08] w-full rounded-3xl object-cover lg:aspect-square"
            height={1068}
            src="/services/review.png"
            width={1068}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {reviews.map((review) => (
              <article
                className="rounded-[22px] border border-black/15 bg-white px-6 py-8 text-center"
                key={review.name}
              >
                <p className="text-xl tracking-[0.12em] text-[#ff5c0b]">
                  ★★★★★
                </p>
                <p className="mt-4 text-sm leading-7">{review.text}</p>
                <a
                  className="mt-3 inline-block text-base text-[#F97316]"
                  href="#"
                >
                  Read more
                </a>
                <div className="mx-auto mt-7 h-12 w-12 rounded-full bg-[#e8c6bb]" />
                <p className="mt-5 text-sm font-black">{review.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f1f1f1] px-5 py-16 text-center sm:px-8 lg:py-24">
        <p className="text-sm font-black">Areas We Serve</p>
        <h2 className="mt-5 text-[36px] font-black leading-none tracking-tight sm:text-5xl lg:text-[58px]">
          Where We Available
        </h2>
        <p className="mx-auto mt-6 max-w-212.5 text-base leading-7 sm:leading-8">
          We provide residential{" "}
          <span className="text-[#F97316]">painting services</span> across
          Geelong, Melbourne and surrounding suburbs within a 45km radius,
          including:
        </p>
        <div className="mx-auto mt-8 flex max-w-245 flex-wrap justify-center gap-2.5">
          {areas.map((area, index) => (
            <span
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-black/15 bg-[#f8f8f8] px-5 text-sm font-semibold leading-none text-[#222]"
              key={`${area}-${index}`}
            >
              {area}
              <MapPin />
            </span>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function highlightServiceText(text: string) {
  const phrases = [
    "interior house painting",
    "exterior house painting",
    "house repainting services",
  ];
  let content: Array<string | ReactElement> = [text];

  phrases.forEach((phrase) => {
    content = content.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const pieces = part.split(phrase);
      if (pieces.length === 1) return [part];
      return pieces.flatMap((piece, index) =>
        index === pieces.length - 1
          ? [piece]
          : [
              piece,
              <span className="text-[#ff5c0b]" key={`${phrase}-${index}`}>
                {phrase}
              </span>,
            ],
      );
    });
  });

  return content;
}

function formatBullet(text: string) {
  const [strong, rest] = text.split(" - ");
  if (!rest) return text;
  return (
    <>
      <strong>{strong}</strong> - {rest}
    </>
  );
}

function MapPin() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-[#ff5c0b]"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z"
        fill="currentColor"
      />
      <circle cx="12" cy="10" fill="white" r="2.6" />
    </svg>
  );
}
