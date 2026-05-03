"use client";

import { areas, process, services, stats } from "./landing-page-data";
import type {
  ContactProps,
  HeroProps,
  NewsletterProps,
} from "./landing-page-types";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* 
   HEADER
 */
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace("/#", "/"));
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Norm Painting"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-6 text-sm font-semibold text-gray-600 md:flex">
          {navLinks.map((link) =>
            link.href.includes("#") ? (
              <a
                key={link.label}
                href={link.href}
                className={`transition-colors hover:text-[#1E3A8A] ${
                  isActive(link.href)
                    ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-0.5"
                    : ""
                }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors hover:text-[#1E3A8A] ${
                  isActive(link.href)
                    ? "text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-0.5"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 transition-colors hover:text-[#1E3A8A]">
              More
              <svg
                className="h-3 w-3 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 12 12"
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </summary>
            <div className="absolute right-0 top-8 min-w-40 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/10">
              <a
                className="flex rounded-xl px-4 py-2.5 text-gray-600 transition hover:bg-blue-50 hover:text-[#1E3A8A]"
                href="/#process"
              >
                Process
              </a>
              <a
                className="flex rounded-xl px-4 py-2.5 text-gray-600 transition hover:bg-blue-50 hover:text-[#1E3A8A]"
                href="/#areas"
              >
                Areas
              </a>
            </div>
          </details>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            className="hidden rounded-full border-2 border-[#1E3A8A] px-5 py-2.5 text-sm font-bold text-[#1E3A8A] transition hover:bg-[#1E3A8A] hover:text-white sm:inline-flex"
            href="/estimate"
          >
            Get Estimate
          </Link>
          <a
            className="rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
            href="tel:0406342731"
          >
            0406 342 731
          </a>
          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:border-[#1E3A8A] hover:text-[#1E3A8A] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            {menuOpen ? (
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 pb-5 pt-3 md:hidden">
          <div className="grid gap-1">
            {navLinks.map((link) =>
              link.href.includes("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-blue-50 hover:text-[#1E3A8A] ${
                    isActive(link.href)
                      ? "bg-blue-50 text-[#1E3A8A]"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition hover:bg-blue-50 hover:text-[#1E3A8A] ${
                    isActive(link.href)
                      ? "bg-blue-50 text-[#1E3A8A]"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
            <div className="mt-3 grid gap-2">
              <Link
                href="/estimate"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#1E3A8A] text-sm font-bold text-[#1E3A8A] transition hover:bg-[#1E3A8A] hover:text-white"
              >
                Get Estimate
              </Link>
              <a
                href="tel:0406342731"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#F97316] text-sm font-bold text-white transition hover:bg-[#EA6C07]"
              >
                Call 0406 342 731
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/*
   HERO
 */
export function Hero({ onLeadSubmit }: HeroProps) {
  const [heroMessage, setHeroMessage] = useState("");

  function handleHeroSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setHeroMessage("Please complete name, email and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setHeroMessage("Please enter a valid email address.");
      return;
    }
    onLeadSubmit({ name, email, phone, message });
    setHeroMessage(
      "Great! We moved your details to the contact section below.",
    );
  }

  return (
    <section className="relative isolate overflow-hidden px-5 py-20 text-white sm:px-8 lg:py-32">
      {/* Background — deep navy with blue gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 10% 55%, rgba(29,78,216,0.45) 0%, transparent 55%)," +
            "radial-gradient(ellipse 55% 45% at 90% 78%, rgba(249,115,22,0.18) 0%, transparent 52%)," +
            "#0f172a",
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.82fr]">
        {/* Left — headline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
            <svg fill="currentColor" height="10" viewBox="0 0 12 12" width="10">
              <path d="M6 0l1.5 4.5H12L8.25 7.3l1.5 4.5L6 9l-3.75 2.8 1.5-4.5L0 4.5h4.5z" />
            </svg>
            Geelong &amp; Melbourne's Trusted Painters
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-[-0.03em] sm:text-[3.75rem] lg:text-[4.5rem]">
            Transform Your Home with
            <br />
            <span className="text-[#F97316]">Professional Painting</span>
            <br />
            Services
          </h1>

          <p className="mt-8 max-w-md text-lg leading-[1.75] text-white/70">
            High quality interior &amp; exterior painting at affordable prices.
            Premium paints, tidy workmanship, 7-year warranty.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
              href="#contact"
            >
              Get Free Quote
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/30 px-8 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/10"
              href="#services"
            >
              Our Services
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "7yr", label: "Workmanship Warranty" },
              { value: "100%", label: "Fully Insured" },
            ].map((badge) => (
              <div className="flex items-center gap-2.5" key={badge.label}>
                <span className="text-2xl font-black leading-none text-[#F97316]">
                  {badge.value}
                </span>
                <span className="text-xs font-semibold leading-tight text-white/55">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — quote form */}
        <motion.div
          className="rounded-[28px] border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
        >
          <h3 className="text-xl font-bold text-white">Get a Free Quote</h3>
          <p className="mt-1 text-sm text-white/55">
            Same-day callback · Clear itemised pricing
          </p>

          <form className="mt-6 grid gap-3" onSubmit={handleHeroSubmit}>
            <input
              className="min-h-12 rounded-2xl border border-white/18 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-[#F97316]"
              name="name"
              placeholder="Full Name"
              required
              type="text"
            />
            <input
              className="min-h-12 rounded-2xl border border-white/18 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-[#F97316]"
              name="email"
              placeholder="Email Address"
              required
              type="email"
            />
            <input
              className="min-h-12 rounded-2xl border border-white/18 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-[#F97316]"
              name="phone"
              placeholder="Phone Number (optional)"
              type="tel"
            />
            <textarea
              className="min-h-28 resize-none rounded-2xl border border-white/18 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-[#F97316]"
              name="message"
              placeholder="Describe your painting project"
              required
            />
            <button
              className="mt-1 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#F97316] text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
              type="submit"
            >
              Get A Cost Estimate
            </button>
            {heroMessage ? (
              <p className="text-center text-xs font-semibold text-orange-300">
                {heroMessage}
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* 
   STATS
 */
export function Stats() {
  return (
    <section className="bg-white px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid divide-y divide-black/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <motion.div
              className="flex items-center gap-5 py-10 sm:px-8"
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: i * 0.1 }}
            >
              <p className="text-5xl font-black leading-none text-[#1E3A8A]">
                {stat.value}
              </p>
              <p className="text-sm leading-snug text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
   INTRO / ABOUT
 */
export function Intro() {
  return (
    <section id="about" className="bg-[#F9F6F1] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20 lg:items-start">
          <div className="pt-2">
            <p className="section-kicker">About Norm Painting</p>
            <div className="mt-6 h-1 w-12 rounded-full bg-linear-to-r from-[#C99A3A] to-[#E5AD48]" />
          </div>
          <div>
            <h2 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              Built on <span className="text-[#B64A2A]">trust,</span>{" "}
              preparation, and a finish that lasts.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-[1.9] text-[#68604F]">
              We don't rush the parts clients never see. Every project starts
              with a clear inspection, practical colour advice, careful surface
              preparation, and a tidy working rhythm that respects your home and
              your schedule.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {["Premium Paints", "Tidy Workmanship", "Free Colour Advice"].map(
                (label) => (
                  <div
                    className="flex items-center gap-2.5 text-sm font-semibold text-[#3E7268]"
                    key={label}
                  >
                    <svg
                      className="shrink-0 text-[#F97316]"
                      fill="none"
                      height="14"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                      viewBox="0 0 24 24"
                      width="14"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {label}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 
   SERVICES
 */
export function Services() {
  return (
    <section id="services" className="bg-[#0f172a] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker" style={{ color: "#F97316" }}>
              What We Do
            </p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
              Our core services
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/45">
            Flexible packages for single rooms, complete homes, rentals, and
            exterior upgrades.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-[#1e2d4a] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F97316]/40"
              key={service.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, delay: index * 0.09 }}
            >
              {/* Number */}
              <p className="text-[0.625rem] font-black uppercase tracking-[0.2em] text-[#F97316]">
                {String(index + 1).padStart(2, "0")} / Service
              </p>
              {/* Title */}
              <h3 className="mt-6 text-2xl font-black leading-tight text-white sm:text-3xl">
                {service.title}
              </h3>
              {/* Divider */}
              <div className="mt-5 h-px w-full bg-white/8 transition-colors duration-300 group-hover:bg-[#F97316]/40" />
              {/* Description */}
              <p className="mt-5 text-sm leading-[1.9] text-white/55">
                {service.text}
              </p>
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 85% 15%, rgba(249,115,22,0.1) 0%, transparent 55%)",
                }}
              />
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a className="button-primary" href="/services">
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}

/* 
   PROCESS
 */
export function Process() {
  return (
    <section id="process" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="section-kicker justify-center">How It Works</p>
          <h2 className="section-title mt-4">Simple from day one</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-[1.85] text-[#68604F]">
            We keep every project clear, tidy, and stress-free from your first
            call through to the final walk-around.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item, index) => (
            <motion.div
              className="relative"
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              {/* Connector line */}
              {index < process.length - 1 ? (
                <div className="absolute left-[calc(50%+2.25rem)] -right-3 top-7 hidden h-px bg-linear-to-r from-[#C99A3A]/35 to-transparent lg:block" />
              ) : null}

              <div className="rounded-3xl border border-black/[0.07] bg-[#F9F6F1] p-7 shadow-sm shadow-black/4 transition duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-black/8">
                {/* Step circle */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#F97316] to-[#EA6C07] text-xl font-black text-white shadow-lg shadow-orange-400/30">
                  {index + 1}
                </div>
                <h3 className="mt-7 text-xl font-black leading-tight text-[#0D0B09]">
                  {item}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-[#68604F]">
                  Clear communication and careful standards keep your project
                  moving without confusion.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
   TESTIMONIALS
 */
export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reviewCards = [
    {
      name: "Angelique Rita",
      text: "Kesh and the team were absolutely sensational. They were patient, professional and transformed our home beautifully.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=92",
    },
    {
      name: "Victoria Davy (Vix)",
      text: "Avine were excellent. High ceilings and tricky beams were finished on time and looked great. Highly recommend.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=92",
    },
    {
      name: "Jamie Sweeney",
      text: "Fantastic exterior weatherboard finish and very professional communication throughout the project timeline.",
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=92",
    },
    {
      name: "Anne Morrison",
      text: "We recently had a repaint job completed and the final result was outstanding. Very tidy and reliable team.",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=92",
    },
  ];
  const cardsPerView = 4;
  const visibleCards = Array.from({ length: cardsPerView }, (_, offset) => {
    return reviewCards[(activeIndex + offset) % reviewCards.length];
  });

  function goNext() {
    setActiveIndex((c) => (c + 1) % reviewCards.length);
  }
  function goPrevious() {
    setActiveIndex((c) => (c - 1 + reviewCards.length) % reviewCards.length);
  }

  return (
    <section className="bg-[#F9F6F1] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Client Reviews</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.02em] text-[#0D0B09] sm:text-5xl">
              What our clients say
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[#68604F]">
              Real feedback from homeowners across Geelong and Melbourne.
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              aria-label="Previous review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 text-lg transition hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
              onClick={goPrevious}
              type="button"
            ></button>
            <button
              aria-label="Next review"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F97316] text-white text-lg shadow-md shadow-orange-300 transition hover:bg-[#EA6C07]"
              onClick={goNext}
              type="button"
            ></button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {visibleCards.map((review, index) => (
            <article
              className="flex flex-col overflow-hidden rounded-3xl border border-black/8 bg-white shadow-sm shadow-black/4 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/8"
              key={`${review.name}-${index}-${activeIndex}`}
            >
              <img
                alt={`${review.name} project`}
                className="h-48 w-full object-cover"
                src={review.image}
              />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-base tracking-wide text-[#F97316]"></p>
                <p className="mt-3 flex-1 text-sm leading-[1.8] text-[#4B4540]">
                  "{review.text}"
                </p>
                <p className="mt-4 text-sm font-black text-[#0D0B09]">
                  {review.name}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {reviewCards.map((r, i) => (
            <button
              aria-label={`Show review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === activeIndex
                  ? "w-6 bg-[#F97316]"
                  : "w-2 bg-black/20 hover:bg-black/40"
              }`}
              key={r.name}
              onClick={() => setActiveIndex(i)}
              type="button"
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-linear-to-r from-[#F97316] to-[#EA6C07] px-9 text-sm font-bold text-white shadow-lg shadow-orange-300/40 transition hover:-translate-y-0.5 hover:shadow-orange-400/50"
            href="/estimate"
          >
            Get A Cost Estimation
          </a>
        </div>
      </div>
    </section>
  );
}

/* 
   GALLERY
 */
export function Gallery() {
  const placeholders = [
    {
      label: "Interior Repaint",
      subtitle: "Living Room . Geelong",
      tall: true,
    },
    {
      label: "Exterior Weatherboard",
      subtitle: "Full House . Melbourne",
      tall: false,
    },
    {
      label: "Feature Accent Wall",
      subtitle: "Master Bedroom . Newport",
      tall: false,
    },
    {
      label: "Timber Deck Stain",
      subtitle: "Outdoor Area . Williamstown",
      tall: false,
    },
    { label: "Fence & Gate", subtitle: "Full Fence . Yarraville", tall: false },
    { label: "Pre-Sale Repaint", subtitle: "Full Home . Highton", tall: false },
  ];

  return (
    <section id="gallery" className="bg-[#F2EAE0] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Portfolio</p>
            <h2 className="section-title mt-4">Before &amp; After Gallery</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#68604F]">
              Explore our work and see the quality and attention to detail we
              bring to every project.
            </p>
          </div>
          <a
            className="button-primary self-start md:self-auto"
            href="/estimate"
          >
            Calculate Estimate
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((item, i) => (
            <motion.div
              className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-[#D4C4B0] to-[#BFA98C]"
              key={item.label}
              style={{ minHeight: i === 0 ? "380px" : "240px" }}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.42, delay: i * 0.06 }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#B64A2A]/12 to-[#C99A3A]/18 transition-opacity duration-300 group-hover:opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[80px] font-black text-white/12">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-5">
                <p className="text-sm font-black text-white">{item.label}</p>
                <p className="mt-0.5 text-xs text-white/65">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
   AREAS
 */
export function Areas() {
  return (
    <section id="areas" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="section-kicker justify-center">Coverage</p>
          <h2 className="section-title mt-4">We paint locally</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-[1.85] text-[#68604F]">
            Proudly serving homeowners across greater Geelong, Melbourne's inner
            west, and surrounding suburbs.
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {areas.map((area, i) => (
            <motion.span
              className="rounded-full border border-black/10 bg-[#F8FAFC] px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#F97316]/50 hover:text-[#F97316]"
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
            >
              {area}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 
   NEWSLETTER
 */
export function Newsletter({
  email,
  message,
  onEmailChange,
  onSubmit,
}: NewsletterProps) {
  return (
    <section
      className="relative isolate overflow-hidden px-5 py-20 sm:px-8"
      style={{
        background:
          "linear-gradient(135deg, #1E3A8A 0%, #1d4ed8 55%, #1e40af 100%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 8% 50%, rgba(201,154,58,0.20) 0%, transparent 55%)",
        }}
      />

      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <p className="text-[0.6875rem] font-black uppercase tracking-[0.2em] text-white/55">
            Stay Connected
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
            Updates, tips &{" "}
            <span className="text-orange-300">seasonal offers</span>
          </h2>
          <p className="mt-4 text-sm leading-[1.85] text-white/65">
            Join our list for painting tips, colour inspiration, and exclusive
            discounts for returning clients.
          </p>
        </div>

        <div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
            <input
              className="min-h-12 flex-1 rounded-full border border-white/18 bg-white/12 px-5 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-sm transition focus:border-white/45"
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Your email address"
              required
              type="email"
              value={email}
            />
            <button
              className="min-h-12 rounded-full bg-[#F97316] px-7 text-sm font-black text-white transition hover:bg-[#EA6C07]"
              type="submit"
            >
              Subscribe
            </button>
          </form>
          {message ? (
            <p className="mt-4 text-sm font-semibold text-white/90">
              {message}
            </p>
          ) : null}
          <p className="mt-3 text-xs text-white/40">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 
   CONTACT
 */
export function Contact({
  errors,
  formVersion = 0,
  prefill,
  sent,
  onSubmit,
}: ContactProps) {
  return (
    <section
      id="contact"
      className="bg-[#0D0B09] px-5 py-24 text-white sm:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start">
        {/* Left  info */}
        <div>
          <p className="section-kicker">Contact Us</p>
          <h2 className="mt-5 max-w-xs text-4xl font-black leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            Tell us about your project
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-[1.9] text-white/50">
            Submit your details and we'll help you plan a practical quote,
            timeline, and finish that works for your home.
          </p>

          {/* Contact cards */}
          <div className="mt-10 grid gap-3">
            {(
              [
                {
                  type: "phone",
                  label: "Phone",
                  value: "0406 342 731",
                  href: "tel:0406342731",
                },
                {
                  type: "email",
                  label: "Email",
                  value: "info@normpainting.com",
                  href: "mailto:info@normpainting.com",
                },
                {
                  type: "pin",
                  label: "Service Area",
                  value: "Geelong & Melbourne, AU",
                  href: undefined,
                },
              ] as {
                type: string;
                label: string;
                value: string;
                href?: string;
              }[]
            ).map((item) => (
              <div
                className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/4 p-4"
                key={item.label}
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/20 text-[#F97316]">
                  {item.type === "phone" && (
                    <svg
                      fill="none"
                      height="15"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                      width="15"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 012 2.18a2 2 0 012-2h3.09a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006.29 6.29l.77-.77a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  )}
                  {item.type === "email" && (
                    <svg
                      fill="none"
                      height="15"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                      width="15"
                    >
                      <rect height="16" rx="2" ry="2" width="20" x="2" y="4" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  )}
                  {item.type === "pin" && (
                    <svg
                      fill="none"
                      height="15"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                      width="15"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  )}
                </span>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white/35">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      className="mt-0.5 block text-sm font-semibold text-white transition hover:text-[#F97316]"
                      href={item.href}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right  form */}
        <form
          className="rounded-4xl border border-white/8 bg-[#181411] p-7 sm:p-9"
          key={formVersion}
          noValidate
          onSubmit={onSubmit}
        >
          <ContactField
            defaultValue={prefill?.name}
            error={errors.name}
            name="name"
            placeholder="Your Name"
          />
          <div className="mt-4">
            <ContactField
              defaultValue={prefill?.email}
              error={errors.email}
              name="email"
              placeholder="Email Address"
              type="email"
            />
          </div>
          <label className="mt-4 block">
            <textarea
              className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-white/6 px-4 py-3.5 text-sm text-white placeholder:text-white/38 outline-none transition-colors focus:border-[#F97316]/55"
              defaultValue={prefill?.message}
              name="message"
              placeholder="Describe your project (rooms, surfaces, timeline)"
            />
            {errors.message ? (
              <span className="mt-1.5 block text-xs font-bold text-[#E5AD48]">
                {errors.message}
              </span>
            ) : null}
          </label>
          <button
            className="button-primary mt-5 w-full justify-center"
            type="submit"
          >
            Send My Enquiry
          </button>
          {sent ? (
            <p className="mt-5 text-center text-sm font-semibold text-orange-300">
              Thank you! We'll be in touch within one business day.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

/*  internal form field (dark version) */
function ContactField({
  name,
  placeholder,
  type = "text",
  error,
  defaultValue,
}: {
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <input
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white placeholder:text-white/38 outline-none transition-colors focus:border-[#F97316]/55"
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      {error ? (
        <span className="mt-1.5 block text-xs font-bold text-orange-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}

/* 
   FOOTER
 */
export function Footer() {
  return (
    <footer className="bg-black px-5 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Norm Painting"
                className="h-9 w-auto object-contain brightness-200"
              />
            </div>
            <p className="mt-5 max-w-50 text-sm leading-7 text-white/40">
              Professional painting services across Geelong and Melbourne.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61575177341430"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[10px] font-bold text-white/40 transition hover:border-[#F97316] hover:text-[#F97316]"
              >
                Fb
              </a>
              <a
                href="https://www.instagram.com/paintersmelbourne/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[10px] font-bold text-white/40 transition hover:border-[#F97316] hover:text-[#F97316]"
              >
                In
              </a>
              <a
                href="https://www.tiktok.com/@norm.painting"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[10px] font-bold text-white/40 transition hover:border-[#F97316] hover:text-[#F97316]"
              >
                Tk
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.6875rem] font-black uppercase tracking-[0.18em] text-white/30">
              Navigation
            </p>
            <div className="mt-5 grid gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
                { label: "Get an Estimate", href: "/estimate" },
              ].map((link) => (
                <Link
                  className="w-fit text-sm text-white/45 transition hover:text-white"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.6875rem] font-black uppercase tracking-[0.18em] text-white/30">
              Get In Touch
            </p>
            <div className="mt-5 grid gap-3">
              <a
                className="text-sm text-white/45 transition hover:text-white"
                href="tel:0406342731"
              >
                0406 342 731
              </a>
              <a
                className="text-sm text-white/45 transition hover:text-white"
                href="mailto:info@normpainting.com"
              >
                info@normpainting.com
              </a>
              <p className="text-sm text-white/45">
                Geelong &amp; Melbourne, AU
              </p>
            </div>
            <a
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-300 transition hover:bg-[#EA6C07]"
              href="tel:0406342731"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-2 border-t border-white/8 pt-8 text-xs text-white/28 sm:flex-row sm:justify-between">
          <p>&copy; 2026 Norm Painting. All rights reserved.</p>
          <p>Professional Painting &mdash; Geelong &amp; Melbourne</p>
        </div>
      </div>
    </footer>
  );
}
