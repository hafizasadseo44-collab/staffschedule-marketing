import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pest Control Scheduling Software | StaffSchedule.io",
  description: "Schedule exterminators, track recurring pest control treatments, and dispatch emergency calls with our premium pest control scheduling software.",
  keywords: [
    "pest control scheduling software",
    "exterminator scheduling app",
    "pest control technician management",
    "field service software for pest control",
    "recurring service scheduling",
    "pest control dispatch app"
  ],
  openGraph: {
    title: "Pest Control Scheduling Software | StaffSchedule.io",
    description: "Schedule exterminators, track recurring pest control treatments, and dispatch emergency calls with our premium pest control scheduling software.",
    type: "website",
    url: "https://staffschedule.io/industries/pest-control-scheduling-software",
  },
};

export default function PestControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StaffSchedule.io Pest Control Scheduling Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Comprehensive workforce management and scheduling platform built for pest control companies. Manage recurring treatments, chemical logs, and emergency dispatching from one dashboard.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "890"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does this software handle recurring pest control treatments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our system allows you to set up recurring schedules (e.g., quarterly exterior sprays, monthly commercial kitchen inspections) effortlessly. The software automatically populates future schedules, ensuring no client falls through the cracks."
        }
      },
      {
        "@type": "Question",
        "name": "Can technicians log chemical usage in the mobile app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can require technicians to complete digital forms before a job is marked complete. This is perfect for EPA compliance, allowing techs to log exactly which chemicals were used and in what quantities."
        }
      },
      {
        "@type": "Question",
        "name": "Does it support emergency dispatching for sudden infestations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our live GPS map shows where all your technicians are currently located. If an emergency bed bug or wasp call comes in, you can instantly route the closest available technician to the site."
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
