import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/seasonal-staff-scheduling`;

export const metadata: Metadata = {
  title: "Seasonal Staff Scheduling Software | StaffSchedule.io",
  description:
    "Scale your workforce during peak seasons. The best seasonal staff scheduling software for retail, hospitality, agriculture, and events. Onboard fast and manage fluctuating hours.",
  keywords: [
    "seasonal staff scheduling",
    "seasonal employee scheduling software",
    "seasonal workforce management",
    "temporary staff scheduling",
    "holiday staffing software",
    "peak season workforce planning",
    "how to manage seasonal employees",
    "scheduling software for seasonal workers",
    "retail seasonal hiring app",
    "summer camp scheduling software"
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Seasonal Staff Scheduling Software | StaffSchedule.io",
    description: "Scale your team up for peak seasons instantly. Onboard temporary workers, manage fluctuating availability, and build schedules in minutes.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Seasonal Staff Scheduling Software" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seasonal Staff Scheduling Software | StaffSchedule.io",
    description: "Built for businesses that scale up and down. Manage seasonal peaks without the scheduling headache.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

export default function SeasonalStaffLayout({ children }: { children: React.ReactNode }) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StaffSchedule.io — Seasonal Staff Scheduling Software",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Seasonal staff scheduling software designed to handle peak-season scaling. Quickly onboard temporary workers, manage fluctuating availability, and automatically schedule based on demand.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "892", bestRating: "5", worstRating: "1" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best scheduling app for seasonal workers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "StaffSchedule.io is ideal for seasonal staff scheduling because it allows you to rapidly onboard large groups of temporary employees, easily capture their temporary availability, and scale your user count up and down as your season dictates.",
        },
      },
      {
        "@type": "Question",
        name: "How do you manage seasonal employee availability?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Seasonal workers often have fluctuating schedules (like students during summer break). StaffSchedule.io lets them enter their availability directly into the mobile app, and the auto-scheduler ensures you never schedule someone when they are in class or unavailable.",
        },
      },
      {
        "@type": "Question",
        name: "Do I have to pay for inactive seasonal employees?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. You can archive seasonal employees when the season ends. You retain their historical data for compliance and easy re-hiring next year, but you don't pay for them while they are inactive.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  );
}
