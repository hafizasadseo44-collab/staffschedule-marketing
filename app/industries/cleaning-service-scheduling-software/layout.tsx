import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning Service Scheduling Software | StaffSchedule.io",
  description: "Organize cleaning crews, dispatch maids, and track field performance with our premium cleaning service scheduling software. Try it free.",
  keywords: [
    "cleaning service scheduling software",
    "maid service scheduling app",
    "cleaning crew workforce management",
    "field service scheduling software",
    "employee scheduling app for cleaners",
    "cleaning staff dispatch software"
  ],
  openGraph: {
    title: "Cleaning Service Scheduling Software | StaffSchedule.io",
    description: "Organize cleaning crews, dispatch maids, and track field performance with our premium cleaning service scheduling software.",
    type: "website",
    url: "https://staffschedule.io/industries/cleaning-service-scheduling-software",
  },
};

export default function CleaningServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StaffSchedule.io Cleaning Service Scheduling Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Premium workforce management and scheduling platform built specifically for cleaning services, maid companies, and janitorial crews.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1280"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does cleaning service scheduling software help my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It eliminates manual coordination by giving you a unified dashboard to assign jobs, track cleaning crew locations, manage recurring client visits, and seamlessly handle shift changes without text-message chaos."
        }
      },
      {
        "@type": "Question",
        "name": "Can my cleaning crews access their schedules on mobile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our dedicated iOS and Android apps allow your field teams to instantly view their schedules, clock in with GPS verification, and communicate job updates directly from their phones."
        }
      },
      {
        "@type": "Question",
        "name": "Is it possible to schedule recurring cleaning jobs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You can easily set up recurring daily, weekly, or monthly cleaning assignments, ensuring your clients receive consistent service without needing to recreate schedules from scratch."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
