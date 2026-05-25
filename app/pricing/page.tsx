import type { Metadata } from "next";
import PricingPageClient from "@/components/pricing/PricingPageClient";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Pricing Plans | StaffSchedule.io — Simple, Transparent Pricing",
  description: "Simple, transparent pricing for teams of all sizes. Start free for 14 days — no credit card required. Monthly and yearly plans available with significant savings.",
  keywords: [
    "staff scheduling pricing",
    "employee scheduling software cost",
    "workforce management plans",
    "shift scheduling app pricing",
    "free staff scheduling trial",
  ],
  alternates: { canonical: `${BASE_URL}/pricing` },
  openGraph: {
    title: "Pricing | StaffSchedule.io",
    description: "Simple pricing for every team size. Start free — no credit card needed.",
    url: `${BASE_URL}/pricing`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "StaffSchedule.io Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StaffSchedule.io Pricing — Free 14-Day Trial",
    description: "Simple, transparent pricing. Start free, no credit card required.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
