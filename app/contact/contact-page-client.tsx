"use client";

import { FormEvent, useState } from "react";
import { submitLead } from "../lib/submitLead";
import { Header, Footer } from "../components/landing-page-sections";

const values = [
  {
    title: "7-Year Workmanship Warranty",
    text: "Our high-quality paint finishes ensure long-lasting beauty.",
  },
  {
    title: "Expert Interior & Exterior Painting",
    text: "From interior wall painting to weatherboard restoration, we cover it all.",
  },
  {
    title: "Reliable & Timely Service",
    text: "We respect your time and complete projects as promised.",
  },
  {
    title: "Affordable & Transparent Pricing",
    text: "Get a house painting quote in Geelong with no hidden fees.",
  },
  {
    title: "Premium Paints & Eco-Friendly Options",
    text: "We use non-toxic interior paints and durable exterior paints from trusted brands.",
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

export function ContactPageClient() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const description = String(data.get("description") || "").trim();

    if (!name || !email || !description) {
      setErrorMsg("Please fill in name, email and message.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await submitLead({ name, email, phone, description });
      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#050505]">
      <Header />

      <section className="px-5 pb-20 pt-20 text-center sm:px-8 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1E3A8A] sm:text-sm">
          Connect the Best House Painters in Geelong
        </p>
        <h1 className="mx-auto mt-6 max-w-180 text-[42px] font-black leading-[1.05] tracking-tight text-[#111827] sm:text-7xl lg:text-[88px]">
          Norm Painting
          <br />
          Painting &<br />
          Decorating
        </h1>
        <p className="mx-auto mt-8 max-w-230 text-[15px] leading-7 text-gray-600 sm:text-lg sm:leading-8">
          Looking for professional house painters in Geelong? Whether you need{" "}
          <span className="font-semibold text-[#1E3A8A]">
            interior house painting, exterior home painting
          </span>
          , or a{" "}
          <span className="font-semibold text-[#1E3A8A]">
            full house repaint
          </span>
          , we are here to help. Contact{" "}
          <span className="font-semibold text-[#F97316]">Norm Painting</span>{" "}
          today for a free quote and let our{" "}
          <span className="font-semibold text-[#F97316]">expert painters</span>{" "}
          bring your vision to life.
        </p>
        <div className="mt-9 flex justify-center gap-4">
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-7 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-[#EA6C07] hover:-translate-y-0.5"
            href="tel:0406342731"
          >
            Call
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#1E3A8A] px-7 text-base font-semibold text-[#1E3A8A] transition hover:bg-[#1E3A8A] hover:text-white"
            href="mailto:info@normpainting.com"
          >
            Email
          </a>
        </div>
      </section>

      <section className="bg-linear-to-br from-[#0f172a] to-[#1e3a8a] px-5 py-16 text-white sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-black">Reach Out Now</p>
            <h2 className="mt-4 max-w-155 text-[36px] font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Get a Free Quote from the Best Painters in Geelong
            </h2>
            <p className="mt-6 max-w-155 text-base leading-8 text-white/85">
              We offer affordable house painting services with high-quality
              finishes and a 5-year workmanship warranty. Fill out the form
              below or call us directly to discuss your painting project.
            </p>

            <div className="mt-9 grid gap-7">
              <ContactInfo
                href="mailto:info@normpainting.com"
                icon="mail"
                label="Email"
                value="info@normpainting.com"
              />
              <ContactInfo
                href="tel:0406342731"
                icon="phone"
                label="Phone"
                value="0406 342 731"
              />
              <ContactInfo
                href="https://maps.google.com/?q=Suite+3,+Ground+Floor,+200+Malop+St+Geelong+Vic+3220"
                icon="pin"
                label="Address"
                value="Suite 3, Ground Floor, 200 Malop St Geelong Vic 3220"
              />
            </div>
          </div>

          <form
            className="mx-auto w-full max-w-140 rounded-3xl border border-white/45 bg-[#2c2c2c] p-5 sm:p-7"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <input
                className="contact-field min-h-14"
                name="name"
                placeholder="Full Name"
                required
                type="text"
              />
              <input
                className="contact-field min-h-14"
                name="email"
                placeholder="Email"
                required
                type="email"
              />
              <input
                className="contact-field min-h-14"
                name="phone"
                placeholder="Phone Number"
                type="tel"
              />
              <textarea
                className="contact-field min-h-40 resize-none py-4"
                name="description"
                placeholder="Message"
                required
              />
              <button
                className="mt-1 inline-flex min-h-12 items-center justify-center rounded-full bg-[#F97316] px-6 text-base font-semibold text-white disabled:opacity-60 transition hover:bg-[#EA6C07]"
                disabled={status === "loading"}
                type="submit"
              >
                {status === "loading" ? "Sending…" : "Submit"}
              </button>
              {status === "success" && (
                <p className="text-center text-sm font-semibold text-green-400">
                  Thank you! We&rsquo;ll be in touch within one business day.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm font-semibold text-red-400">
                  {errorMsg}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-28">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1E3A8A]">
          Our Core Values
        </p>
        <h2 className="mt-4 text-[38px] font-black leading-none tracking-tight sm:text-5xl lg:text-6xl">
          What we Deliver
        </h2>
        <p className="mx-auto mt-6 max-w-185 text-base leading-8 text-[#1c1c1c]">
          Our work is guided by key values that set us apart from other painting
          contractors in Geelong:
        </p>
        <div className="mx-auto mt-16 grid max-w-6xl gap-x-10 gap-y-16 md:grid-cols-6">
          {values.map((value, index) => (
            <article
              className={`md:col-span-2 ${index === 3 ? "md:col-start-2" : ""}`}
              key={value.title}
            >
              <Pinwheel />
              <h3 className="mx-auto mt-6 max-w-85 text-[28px] font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                {value.title}
              </h3>
              <p className="mx-auto mt-5 max-w-90 text-sm leading-7 text-[#1c1c1c]">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f1f1f1] px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-28">
        <p className="text-sm font-black">Areas We Serve</p>
        <h2 className="mt-4 text-[38px] font-black leading-none tracking-tight sm:text-5xl lg:text-6xl">
          Where We Available
        </h2>
        <p className="mx-auto mt-6 max-w-212.5 text-base leading-8 text-[#1c1c1c]">
          We provide residential{" "}
          <span className="font-semibold text-[#F97316]">
            painting services
          </span>{" "}
          across Geelong, Melbourne and surrounding suburbs within a 45km
          radius, including:
        </p>
        <div className="mx-auto mt-8 flex max-w-245 flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <span
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-black/15 bg-[#f8f8f8] px-5 text-sm font-semibold leading-none text-[#222]"
              key={area}
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

function ContactInfo({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: "mail" | "phone" | "pin";
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-x-4">
      <ContactIcon type={icon} />
      <div>
        <h3 className="text-xl font-black leading-none tracking-tight">
          {label}
        </h3>
        <a
          className="mt-3 block text-sm leading-6 underline underline-offset-2"
          href={href}
        >
          {value}
        </a>
      </div>
    </div>
  );
}

function Pinwheel() {
  return (
    <svg
      aria-hidden="true"
      className="mx-auto h-7 w-7 text-[#F97316]"
      viewBox="0 0 36 36"
    >
      <path
        d="M18 2c4.2 0 7.6 3.4 7.6 7.6S22.2 18 18 18V2Z"
        fill="currentColor"
      />
      <path
        d="M34 18c0 4.2-3.4 7.6-7.6 7.6S18 22.2 18 18h16Z"
        fill="currentColor"
      />
      <path
        d="M18 34c-4.2 0-7.6-3.4-7.6-7.6S13.8 18 18 18v16Z"
        fill="currentColor"
      />
      <path
        d="M2 18c0-4.2 3.4-7.6 7.6-7.6S18 13.8 18 18H2Z"
        fill="currentColor"
      />
    </svg>
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

function ContactIcon({ type }: { type: "mail" | "phone" | "pin" }) {
  if (type === "mail") {
    return (
      <svg
        className="h-7 w-7 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        viewBox="0 0 24 24"
      >
        <path d="M3 6.5h18v12H3z" />
        <path d="m3 7 9 7 9-7" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg
        className="h-7 w-7 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        viewBox="0 0 24 24"
      >
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }

  return (
    <svg
      className="h-7 w-7 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
    >
      <path d="M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
