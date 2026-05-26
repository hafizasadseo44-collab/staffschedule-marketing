import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plumbing Scheduling Software & Dispatch App | StaffSchedule.io",
  description: "Manage plumbing crews, dispatch emergency leak calls, and track field technicians seamlessly with our premium plumbing scheduling software.",
  keywords: [
    "plumbing scheduling software",
    "plumber dispatch app",
    "plumbing contractor workforce management",
    "emergency plumber scheduling",
    "field technician scheduling for plumbers",
    "plumbing service dispatch software"
  ],
  openGraph: {
    title: "Plumbing Scheduling Software & Dispatch App | StaffSchedule.io",
    description: "Manage plumbing crews, dispatch emergency leak calls, and track field technicians seamlessly with our premium plumbing scheduling software.",
    type: "website",
    url: "https://staffschedule.io/industries/plumbing-scheduling-software",
  },
};

export default function PlumbingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StaffSchedule.io Plumbing Scheduling Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Premium workforce management and dispatch platform designed specifically for plumbing contractors. Handle emergency calls, track overtime, and coordinate field technicians seamlessly.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1150"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the dispatch board handle emergency plumbing calls?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When an emergency call like a burst pipe comes in, our live GPS dispatch board allows you to instantly locate your nearest available plumber. You can dispatch the job directly to their mobile app with a single click."
        }
      },
      {
        "@type": "Question",
        "name": "Can plumbers access job details offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we know plumbers often work in basements or areas with poor cellular reception. Our mobile app caches job details offline so technicians can view instructions and take notes, syncing automatically when they regain connection."
        }
      },
      {
        "@type": "Question",
        "name": "Does the software help manage on-call overtime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. The platform automatically tracks regular hours versus emergency/on-call overtime, ensuring accurate payroll exports and preventing technician burnout through fair rotation management."
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
