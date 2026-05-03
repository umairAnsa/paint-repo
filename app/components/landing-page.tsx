"use client";

import { FormEvent, useState } from "react";
import { submitLead } from "../lib/submitLead";
import { motion } from "framer-motion";
import {
  Areas,
  Contact,
  Footer,
  Gallery,
  Header,
  Hero,
  Intro,
  Newsletter,
  Process,
  Services,
  Stats,
  Testimonials,
} from "./landing-page-sections";
import type { ContactFormErrors, HeroLeadPayload } from "./landing-page-types";

export function LandingPage() {
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [contactSent, setContactSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [contactPrefill, setContactPrefill] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);
  const [contactFormVersion, setContactFormVersion] = useState(0);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const description = String(data.get("message") || "").trim();
    const nextErrors: ContactFormErrors = {};

    if (!name) nextErrors.name = "Name required.";
    if (!email) {
      nextErrors.email = "Email required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (!description) nextErrors.message = "Message required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      await submitLead({ name, email, phone, description });
      setContactSent(true);
      event.currentTarget.reset();
    } catch (err) {
      setErrors({
        name:
          err instanceof Error
            ? err.message
            : "Network error. Please try again.",
      });
    }
  }

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterMessage("Please enter a valid email.");
      return;
    }

    setNewsletterEmail("");
    setNewsletterMessage("Thanks, you are on the list.");
  }

  function handleHeroLeadSubmit(payload: HeroLeadPayload) {
    // Post lead to API in background (fire-and-forget)
    submitLead({
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? "",
      description: payload.message,
    }).catch(() => {
      /* silent — hero form already shows its own success */
    });

    setContactPrefill({
      name: payload.name,
      email: payload.email,
      message: payload.message,
    });
    setErrors({});
    setContactSent(false);
    setContactFormVersion((current) => current + 1);
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen bg-[#F8FAFC] text-[#111827]"
    >
      <Header />
      <Hero onLeadSubmit={handleHeroLeadSubmit} />
      <Testimonials />
      <Gallery />
      <Stats />
      <Intro />
      <Services />
      <Process />
      <Areas />
      <Newsletter
        email={newsletterEmail}
        message={newsletterMessage}
        onEmailChange={setNewsletterEmail}
        onSubmit={handleNewsletterSubmit}
      />
      <Contact
        errors={errors}
        formVersion={contactFormVersion}
        prefill={contactPrefill ?? undefined}
        sent={contactSent}
        onSubmit={handleContactSubmit}
      />
      <Footer />
    </motion.main>
  );
}
