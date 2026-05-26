import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electrician Scheduling Software & Dispatch App | StaffSchedule.io",
  description: "Manage electrical contractors, dispatch emergency technicians, and track field jobs with our premium electrician scheduling software.",
  keywords: [
    "electrician scheduling software",
    "electrical contractor dispatch app",
    "field technician scheduling",
    "electrician workforce management",
    "emergency dispatch software for electricians",
    "electrical service scheduling app"
  ],
  openGraph: {
    title: "Electrician Scheduling Software & Dispatch App | StaffSchedule.io",
    description: "Manage electrical contractors, dispatch emergency technicians, and track field jobs with our premium electrician scheduling software.",
    type: "website",
    url: "https://staffschedule.io/industries/electrician-scheduling-software",
  },
};

export default function ElectricianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StaffSchedule.io Electrician Scheduling Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Advanced dispatch and scheduling platform designed specifically for electrical contractors, allowing rapid emergency response and seamless field coordination.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "942"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does this software help with emergency electrical calls?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our live dispatch board allows you to see the real-time GPS locations of all your technicians. When an emergency call comes in, you can instantly assign the job to the closest available electrician with the right certifications."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track which electrician has specific certifications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, StaffSchedule.io includes a robust certification tracking system. You can tag technicians with their specific licenses (e.g., Master Electrician, High Voltage) and the system will alert you if you try to assign an unqualified tech to a specialized job."
        }
      },
      {
        "@type": "Question",
        "name": "Do electricians get mobile notifications for new jobs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Field technicians receive instant push notifications on our mobile app whenever a new job is dispatched or a schedule changes, along with all the necessary client details and site notes."
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
