"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { submitLead } from "../lib/submitLead";

type RangeKey =
  | "smallBedrooms"
  | "largeBedrooms"
  | "kitchens"
  | "livingRooms"
  | "bathrooms"
  | "doors"
  | "windows";

const rangeFields: Array<{
  key: RangeKey;
  label: string;
  unit: string;
  min: number;
  max: number;
  price: number;
  help: string;
}> = [
  {
    key: "smallBedrooms",
    label: "Number of Small Bedrooms",
    unit: "rooms",
    min: 0,
    max: 10,
    price: 620,
    help: "Select the number of small bedrooms to be painted.",
  },
  {
    key: "largeBedrooms",
    label: "Number of Large Bedrooms",
    unit: "rooms",
    min: 0,
    max: 5,
    price: 850,
    help: "Select the number of large bedrooms to be painted.",
  },
  {
    key: "kitchens",
    label: "Number of Kitchens",
    unit: "areas",
    min: 0,
    max: 5,
    price: 760,
    help: "Select the number of kitchens to be painted.",
  },
  {
    key: "livingRooms",
    label: "Number of Living and Dining Rooms",
    unit: "areas",
    min: 0,
    max: 10,
    price: 940,
    help: "Select the number of living and dining rooms to be painted.",
  },
  {
    key: "bathrooms",
    label: "Number of Bathrooms, Laundries or Toilets",
    unit: "areas",
    min: 0,
    max: 10,
    price: 520,
    help: "Select the number of wet areas to be painted.",
  },
  {
    key: "doors",
    label: "Number of Doors",
    unit: "doors",
    min: 0,
    max: 50,
    price: 95,
    help: "Select the number of doors to be painted on both sides.",
  },
  {
    key: "windows",
    label: "Window Frames and Door Frames",
    unit: "total",
    min: 0,
    max: 50,
    price: 85,
    help: "Select the number of windows and frames to be painted.",
  },
];

const initialRanges: Record<RangeKey, number> = {
  smallBedrooms: 2,
  largeBedrooms: 1,
  kitchens: 1,
  livingRooms: 2,
  bathrooms: 2,
  doors: 10,
  windows: 20,
};

export function CostCalculator() {
  const [activeTab, setActiveTab] = useState<"estimate" | "contact">(
    "estimate",
  );
  const [ranges, setRanges] = useState(initialRanges);
  const [garage, setGarage] = useState<"none" | "single" | "double">("none");
  const [multiStorey, setMultiStorey] = useState(false);
  const [paintType, setPaintType] = useState<"repaint" | "new">("repaint");
  const [photos, setPhotos] = useState<File[]>([]);
  const [sent, setSent] = useState(false);

  const estimate = useMemo(() => {
    const roomTotal = rangeFields.reduce(
      (total, field) => total + ranges[field.key] * field.price,
      0,
    );
    const garageTotal =
      garage === "single" ? 700 : garage === "double" ? 1200 : 0;
    const subtotal = roomTotal + garageTotal + 850;
    const withStorey = multiStorey ? subtotal * 1.18 : subtotal;
    const adjusted = paintType === "new" ? withStorey * 1.15 : withStorey;

    return {
      low: Math.round((adjusted * 0.9) / 50) * 50,
      high: Math.round((adjusted * 1.14) / 50) * 50,
    };
  }, [garage, multiStorey, paintType, ranges]);

  function updateRange(key: RangeKey, value: number) {
    setRanges((current) => ({ ...current, [key]: value }));
  }

  async function handleContactSubmit(event: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    event.preventDefault();
    const form  = event.currentTarget;
    const data  = new FormData(form);
    const name  = String(data.get("name")  || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const notes = String(data.get("description") || "").trim();
    const description = notes
      ? `Estimate: $${estimate.low.toLocaleString()} - $${estimate.high.toLocaleString()}. Notes: ${notes}`
      : `Estimate: $${estimate.low.toLocaleString()} - $${estimate.high.toLocaleString()}`;

    try {
      if (photos.length > 0) {
        const base64Images = await Promise.all(
          photos.map(
            (file) =>
              new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target!.result as string);
                reader.readAsDataURL(file);
              }),
          ),
        );
        const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        await fetch(`${BACKEND_URL}/api/lead/with-photos`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ name, email, phone, description, images: base64Images }),
        });
      } else {
        await submitLead({ name, email, phone, description });
      }
      setSent(true);
      setPhotos([]);
      form.reset();
    } catch {
      setSent(true);
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="min-h-screen bg-[#f7f4ee] text-[#171512]"
    >
      <EstimateHeader />
      <section className="theme-glow relative isolate overflow-hidden px-5 py-20 text-white sm:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,21,18,0.96),rgba(181,82,40,0.65),rgba(28,68,62,0.88)),repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_86px)]" />
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
            Cost Calculator
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/80">
            Get an instant painting estimate in under 60 seconds. Final quote is
            confirmed after inspection.
          </p>
          <a className="button-hero mt-8" href="tel:0406342731">
            Quick Call Now
          </a>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex border-b border-black/10">
            <button
              className={`px-6 py-4 text-sm font-black ${
                activeTab === "estimate"
                  ? "bg-[#b55228] text-white"
                  : "text-[#5f554c]"
              }`}
              onClick={() => setActiveTab("estimate")}
              type="button"
            >
              Quick Estimate
            </button>
            <button
              className={`px-6 py-4 text-sm font-black ${
                activeTab === "contact"
                  ? "bg-[#b55228] text-white"
                  : "text-[#5f554c]"
              }`}
              onClick={() => setActiveTab("contact")}
              type="button"
            >
              Contact details
            </button>
          </div>

          {activeTab === "estimate" ? (
            <div className="grid gap-10 py-12 lg:grid-cols-[1fr_390px]">
              <div className="mx-auto w-full max-w-2xl">
                <p className="text-center text-sm leading-7 text-[#665d54]">
                  Receive an instant, value-based estimate. You can adjust every
                  input and the estimate will update live.
                </p>
                <h2 className="mt-8 text-4xl font-black">
                  House Painting Cost Calculator
                </h2>
                <div className="mt-10 grid gap-9">
                  {rangeFields.map((field) => (
                    <RangeControl
                      field={field}
                      key={field.key}
                      onChange={(value) => updateRange(field.key, value)}
                      value={ranges[field.key]}
                    />
                  ))}

                  <RadioGroup
                    label="Number of Garage"
                    name="garage"
                    options={[
                      { label: "Single", value: "single" },
                      { label: "Double", value: "double" },
                      { label: "None", value: "none" },
                    ]}
                    value={garage}
                    onChange={(value) =>
                      setGarage(value as "none" | "single" | "double")
                    }
                  />

                  <RadioGroup
                    label="Type of Property"
                    name="paint-type"
                    options={[
                      { label: "Re-paint", value: "repaint" },
                      { label: "New Paint", value: "new" },
                    ]}
                    value={paintType}
                    onChange={(value) => setPaintType(value as "repaint" | "new")}
                  />

                  <RadioGroup
                    label="Multi-storey House"
                    name="multi-storey"
                    options={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                    value={multiStorey ? "yes" : "no"}
                    onChange={(value) => setMultiStorey(value === "yes")}
                  />
                </div>
              </div>

              <aside className="theme-surface h-fit rounded-4xl bg-white p-6 lg:sticky lg:top-28">
                <p className="section-kicker">Live estimate</p>
                <p className="mt-5 text-4xl font-black">
                  ${estimate.low.toLocaleString()} - $
                  {estimate.high.toLocaleString()}
                </p>
                <p className="mt-4 text-sm leading-7 text-[#665d54]">
                  This is an indicative range based on selected rooms, surfaces,
                  garage size, and access. Inspection confirms final pricing.
                </p>
                <button
                  className="button-primary mt-7 w-full"
                  onClick={() => setActiveTab("contact")}
                  type="button"
                >
                  Continue to Contact
                </button>
              </aside>
            </div>
          ) : (
            <div className="mx-auto grid max-w-5xl gap-10 py-12 lg:grid-cols-[0.85fr_1fr]">
              <div>
                <p className="section-kicker">Your estimate</p>
                <h2 className="mt-4 text-4xl font-black">
                  ${estimate.low.toLocaleString()} - $
                  {estimate.high.toLocaleString()}
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#665d54]">
                  Send your details and we will follow up with a proper quote
                  after reviewing the project scope.
                </p>
              </div>
              <form
                className="theme-surface grid gap-4 rounded-4xl bg-white p-6 sm:p-8"
                onSubmit={handleContactSubmit}
              >
                <input
                  className="estimate-input"
                  name="name"
                  placeholder="Full name"
                  required
                />
                <input
                  className="estimate-input"
                  name="email"
                  placeholder="Email"
                  required
                  type="email"
                />
                <input
                  className="estimate-input"
                  name="phone"
                  placeholder="Phone"
                />
                <textarea
                  className="estimate-input min-h-32 py-4"
                  name="description"
                  placeholder="Project notes"
                />

                {/* Photo upload */}
                <div>
                  <label
                    htmlFor="photo-upload"
                    className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-black/20 bg-black/[0.03] px-4 py-5 text-center transition hover:border-[#b55228]/50 hover:bg-[#b55228]/5"
                  >
                    <svg className="h-7 w-7 text-[#b55228]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="text-sm font-bold text-[#171512]">Upload Property Photos</span>
                    <span className="text-xs text-[#665d54]">JPG, PNG — up to 10 photos · included in your quote PDF</span>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []).slice(0, 10);
                      setPhotos(files);
                    }}
                  />
                  {photos.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {photos.map((file, i) => (
                        <div key={i} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="h-16 w-16 rounded-xl object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#171512] text-white text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button className="button-dark" type="submit">
                  Submit Estimate Request
                </button>
                {sent ? (
                  <p className="text-sm font-bold text-[#1c443e]">
                    Thanks. Your estimate request has been received.
                  </p>
                ) : null}
              </form>
            </div>
          )}
        </div>
      </section>
      <ReviewsShowcase onEstimateClick={() => setActiveTab("estimate")} />
      <GalleryTeaser onEstimateClick={() => setActiveTab("estimate")} />
    </motion.main>
  );
}

function EstimateHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f4ee]/90 px-5 py-4 text-[#171512] backdrop-blur-xl sm:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link className="text-xl font-black tracking-tight" href="/">
          Norm Painting
        </Link>
        <div className="hidden items-center gap-7 text-sm font-semibold text-[#5f554c] md:flex">
          <Link className="transition hover:text-[#b55228]" href="/">
            Home
          </Link>
          <Link className="transition hover:text-[#b55228]" href="/services">
            Services
          </Link>
          <Link className="transition hover:text-[#b55228]" href="/about">
            About
          </Link>
          <Link className="transition hover:text-[#b55228]" href="/#gallery">
            Gallery
          </Link>
          <Link className="transition hover:text-[#b55228]" href="/#contact">
            Contact Us
          </Link>
          <Link className="transition hover:text-[#b55228]" href="/#areas">
            More v
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="hidden rounded-full border border-black/10 px-5 py-2.5 text-sm font-bold transition hover:border-[#b55228] hover:text-[#b55228] sm:inline-flex"
            href="/estimate"
          >
            Calculate Estimate
          </a>
          <a
            className="rounded-full bg-[#171512] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#b55228]"
            href="tel:0406342731"
          >
            0406 342 731
          </a>
        </div>
      </nav>
    </header>
  );
}

function RangeControl({
  field,
  value,
  onChange,
}: {
  field: (typeof rangeFields)[number];
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-black">{field.label}</span>
        <span className="rounded-md border border-black/10 bg-white px-4 py-2 text-sm text-[#665d54]">
          {value} {field.unit}
        </span>
      </div>
      <input
        className="estimate-range"
        max={field.max}
        min={field.min}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={value}
      />
      <div className="flex justify-between text-xs text-[#8b8178]">
        <span>
          {field.min} {field.unit}
        </span>
        <span>
          {field.max} {field.unit}
        </span>
      </div>
      <p className="text-xs leading-5 text-[#8b8178]">{field.help}</p>
    </label>
  );
}

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-black">{label}</legend>
      {options.map((option) => (
        <label className="flex items-center gap-3 text-sm" key={option.value}>
          <input
            checked={value === option.value}
            className="accent-[#b55228]"
            name={name}
            onChange={() => onChange(option.value)}
            type="radio"
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}

interface GoogleReview {
  id: number;
  name: string;
  photo: string | null;
  rating: number;
  time: string;
  text: string;
}

function ReviewsShowcase({ onEstimateClick }: { onEstimateClick: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data) => { if (data.reviews?.length) setReviews(data.reviews); })
      .catch(() => {});
  }, []);

  const cardsPerView = 3;

  const visibleReviews = reviews.length > 0
    ? Array.from({ length: cardsPerView }, (_, offset) => {
        const reviewIndex = (activeIndex + offset) % reviews.length;
        return reviews[reviewIndex];
      })
    : [];

  function goNext() {
    setActiveIndex((current) => (current + 1) % reviews.length);
  }

  function goPrevious() {
    setActiveIndex(
      (current) => (current - 1 + reviews.length) % reviews.length,
    );
  }

  return (
    <section className="px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-[36px] border border-black/10 bg-[#efece7] px-5 py-14 sm:px-10">
        <h2 className="text-center text-4xl font-black tracking-tight sm:text-6xl">
          Reviews from local clients
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-[#665d54]">
          Real feedback from homeowners across Geelong.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <button
            aria-label="Previous review"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171512] text-white transition hover:bg-[#b55228]"
            onClick={goPrevious}
            type="button"
          >
            ‹
          </button>

          <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleReviews.length === 0 && Array.from({ length: cardsPerView }).map((_, i) => (
              <div key={i} className="theme-surface animate-pulse rounded-[28px] p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-black/10" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 rounded bg-black/10" />
                    <div className="h-2 w-16 rounded bg-black/10" />
                  </div>
                </div>
                <div className="h-3 w-20 rounded bg-black/10" />
                <div className="space-y-1.5">
                  <div className="h-2.5 w-full rounded bg-black/10" />
                  <div className="h-2.5 w-5/6 rounded bg-black/10" />
                  <div className="h-2.5 w-4/6 rounded bg-black/10" />
                </div>
              </div>
            ))}
            {visibleReviews.map((review) => (
              <article
                className="theme-surface group rounded-[28px] p-4 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#b55228]/15"
                key={`${review.name}-${activeIndex}`}
              >
                <div className="flex items-center gap-3">
                  {review.photo ? (
                    <Image
                      src={review.photo}
                      alt={review.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b55228] text-sm font-black text-white">
                      {review.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-black">{review.name}</p>
                    <p className="text-xs text-[#665d54]">{review.time}</p>
                  </div>
                </div>
                <p className="mt-4 text-lg text-[#ff7a2b]">{'★'.repeat(review.rating)}</p>
                <p className="mt-3 text-sm leading-7 text-[#4f473f]">
                  {review.text}
                </p>
              </article>
            ))}
          </div>

          <button
            aria-label="Next review"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171512] text-white transition hover:bg-[#b55228]"
            onClick={goNext}
            type="button"
          >
            ›
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {reviews.map((review, index) => (
            <button
              aria-label={`Go to review ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex
                  ? "bg-[#171512]"
                  : "bg-black/25 hover:bg-black/45"
              }`}
              key={review.name}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="button-primary"
            onClick={onEstimateClick}
            type="button"
          >
            Get A Cost Estimation
          </button>
        </div>
      </div>
    </section>
  );
}

function GalleryTeaser({ onEstimateClick }: { onEstimateClick: () => void }) {
  const galleryImages = [
    "/projects/project-55.jpg",
    "/projects/project-58.jpg",
    "/projects/project-59.jpg",
  ];

  return (
    <section className="px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-[36px] border border-black/10 bg-[#f3f1ee] px-6 py-20 text-center sm:px-10">
        <h2 className="text-5xl font-black tracking-tight">Gallery</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#5f554c]">
          Explore our work to see the standard of quality and attention to
          detail we bring to every job.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              className="theme-surface group relative h-48 overflow-hidden rounded-3xl"
              key={image}
            >
              <Image
                fill
                alt={`Gallery preview ${index + 1}`}
                className="object-cover transition duration-300 group-hover:scale-105"
                src={image}
              />
            </div>
          ))}
        </div>
        <button
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(90deg,#ff7a2b,#2b2019)] px-9 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#b55228]/35"
          onClick={onEstimateClick}
          type="button"
        >
          Calculate Estimate In 60s
        </button>
      </div>
    </section>
  );
}
