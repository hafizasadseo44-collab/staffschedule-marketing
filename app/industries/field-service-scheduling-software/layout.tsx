import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/field-service-scheduling-software`;

export const metadata: Metadata = {
  title: "Field Service Scheduling Software & Dispatch App | StaffSchedule.io",
  description:
    "Route optimization, real-time dispatching, and mobile scheduling software for field service companies. Reduce drive time and manage technicians effortlessly.",
  keywords: [
    "field service scheduling software",
    "mobile workforce management",
    "field technician scheduling app",
    "job dispatching software",
    "route scheduling software",
    "best scheduling software for field service companies",
    "how to manage field technicians",
    "field service dispatch app",
    "route optimization software",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Field Service Scheduling Software & Dispatch App | StaffSchedule.io",
    description: "Manage your mobile workforce with intelligent route optimization, drag-and-drop dispatching, and a mobile app for field technicians.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Field Service Scheduling Software Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Service Scheduling Software | StaffSchedule.io",
    description: "Dispatch faster. Drive less. Intelligent route scheduling and dispatching for field service businesses.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

export default function FieldServiceLayout({ children }: { children: React.ReactNode }) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StaffSchedule.io — Field Service Scheduling Software",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Field service scheduling software featuring route optimization, drag-and-drop dispatching, offline mobile access for technicians, and real-time job tracking.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "1250", bestRating: "5", worstRating: "1" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is field service scheduling software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Field service scheduling software helps businesses dispatch technicians, optimize driving routes, and manage jobs in the field. It replaces whiteboards and phone calls with a centralized digital dispatch board and a mobile app for technicians.",
        },
      },
      {
        "@type": "Question",
        name: "Does the software include route optimization?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, StaffSchedule.io includes intelligent route optimization. When you schedule multiple jobs for a technician, the system automatically sequences them to minimize drive time and fuel costs.",
        },
      },
      {
        "@type": "Question",
        name: "How do field technicians access their schedule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Technicians use the StaffSchedule.io mobile app (available on iOS and Android) to view their daily schedule, get turn-by-turn directions, read job notes, and capture customer signatures. The app even works offline.",
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
