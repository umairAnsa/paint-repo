import type { Metadata } from "next";
import { ContactPageClient } from "./contact-page-client";

export const metadata: Metadata = {
  title: "Contact Us | Norm Painting",
  description:
    "Contact Norm Painting for house painting quotes in Geelong, Melbourne and surrounding suburbs.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
