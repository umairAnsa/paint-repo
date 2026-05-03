import type { Metadata } from "next";
import { ServicesPageClient } from "./services-page-client";

export const metadata: Metadata = {
  title: "Services | Norm Painting",
  description:
    "Explore Norm Painting's interior painting, exterior painting, house repainting and custom painting services in Geelong.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
