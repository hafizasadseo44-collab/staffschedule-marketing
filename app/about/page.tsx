import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind StaffSchedule.io — who we are, what we stand for, and why 10,000+ managers trust us to schedule their teams every single day.",
  openGraph: {
    title: "About StaffSchedule.io — The Team Behind the Platform",
    description:
      "We build workforce management tools that give every business — from a single café to a 500-location enterprise — scheduling superpowers.",
    url: "https://staffschedule.io/about",
  },
  alternates: {
    canonical: "https://staffschedule.io/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
