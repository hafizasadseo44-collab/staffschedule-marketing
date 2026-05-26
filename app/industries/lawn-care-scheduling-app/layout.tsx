import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lawn Care Scheduling App & Routing Software | StaffSchedule.io",
  description: "Optimize landscaping routes, manage seasonal crews, and handle weather delays effortlessly with our lawn care scheduling app.",
  keywords: [
    "lawn care scheduling app",
    "landscaping crew scheduling",
    "seasonal workforce planning software",
    "route optimization for lawn care",
    "field service scheduling app",
    "landscape business software"
  ],
  openGraph: {
    title: "Lawn Care Scheduling App & Routing Software | StaffSchedule.io",
    description: "Optimize landscaping routes, manage seasonal crews, and handle weather delays effortlessly with our lawn care scheduling app.",
    type: "website",
    url: "https://staffschedule.io/industries/lawn-care-scheduling-app",
  },
};

export default function LawnCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StaffSchedule.io Lawn Care Scheduling App",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Complete scheduling, route optimization, and workforce management platform built specifically for lawn care and landscaping businesses.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1502"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does this app handle rain delays and weather cancellations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When bad weather hits, you can pause entire routes or shift an entire day's schedule to the next available slot with a single click. The system automatically notifies your crews and updates the route plan."
        }
      },
      {
        "@type": "Question",
        "name": "Can I optimize driving routes for my landscaping crews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our intelligent route optimization engine automatically sequences jobs based on geographic location, minimizing drive time and reducing fuel costs for your trucks."
        }
      },
      {
        "@type": "Question",
        "name": "How do we manage recurring weekly or bi-weekly mows?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can easily set up recurring templates for specific client properties. Whether it's a weekly mow or a seasonal fertilization treatment, the system automatically populates the schedule."
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
