import type { Metadata } from "next";
import AboutPageClient from "@/components/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us | StaffSchedule.io — Our Story & Mission",
  description:
    "Learn the story behind StaffSchedule.io — who we are, what we stand for, and why 10,000+ managers trust us to schedule their teams every single day.",
  keywords: ["about staffschedule", "workforce management company", "scheduling software team"],
  alternates: { canonical: "https://staffschedule.io/about" },
  openGraph: {
    title: "About StaffSchedule.io — The Team Behind the Platform",
    description:
      "We build workforce management tools that give every business — from a single café to a 500-location enterprise — scheduling superpowers.",
    url: "https://staffschedule.io/about",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "About StaffSchedule.io" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About StaffSchedule.io",
    description: "The team building the world's best workforce management platform.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
