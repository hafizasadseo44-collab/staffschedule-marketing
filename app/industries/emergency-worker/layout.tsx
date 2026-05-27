import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/emergency-worker`;

export const metadata: Metadata = {
  title: "Emergency Worker Schedule Software — 24/7 Shift Management | StaffSchedule.io",
  description:
    "Purpose-built emergency worker schedule software for EMS, fire departments, police, and first responders. Manage rotating shifts, 24/7 on-call rosters, and rapid shift coverage from one platform.",
  keywords: [
    "emergency worker schedule",
    "EMS scheduling software",
    "fire department scheduling app",
    "emergency response workforce management",
    "24/7 shift scheduling software",
    "first responder scheduling",
    "rotating shift management",
    "emergency staff scheduling",
    "police scheduling software",
    "on-call workforce management",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Emergency Worker Schedule Software — 24/7 Shift Management | StaffSchedule.io",
    description: "Manage EMS crews, fire shifts, and emergency response teams with real-time scheduling, rotating rosters, and instant coverage alerts. Built for 24/7 operations.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Emergency Worker Schedule Software Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Worker Schedule Software | StaffSchedule.io",
    description: "Built for first responders. Handle rotating shifts, 24/7 on-call rosters, and coverage gaps — automatically.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

export default function EmergencyWorkerLayout({ children }: { children: React.ReactNode }) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StaffSchedule.io — Emergency Worker Schedule Software",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Emergency worker schedule software that helps EMS agencies, fire departments, and emergency response organizations manage rotating shifts, 24/7 rosters, on-call coverage, and real-time communication.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do emergency services schedule staff for 24/7 coverage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Emergency services typically use rotating shift patterns like 12-hour rotations, Panama schedules, or 24-48 rotations. StaffSchedule.io supports all of these patterns, automatically populates rotating rosters, and alerts supervisors to any coverage gaps before the shift starts.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best scheduling software for EMS teams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "StaffSchedule.io is built for the 24/7 demands of emergency services. It handles rotating schedules, on-call rosters, mandatory overtime tracking, real-time coverage alerts, and mobile updates for all first responders — making it ideal for EMS agencies, fire departments, and emergency response organizations.",
        },
      },
      {
        "@type": "Question",
        name: "How does emergency shift scheduling handle last-minute callouts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When a first responder calls out, StaffSchedule.io immediately identifies qualified available replacements and sends them a shift request with a single click. Responders can accept or decline directly from the mobile app, and the system automatically updates the roster in real time.",
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
