import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/delivery-scheduling-software`;

export const metadata: Metadata = {
  title: "Delivery Scheduling Software for Drivers & Dispatch Teams | StaffSchedule.io",
  description: "Purpose-built delivery scheduling software to coordinate drivers, manage dispatch shifts, and optimize last-mile operations. Real-time updates, route coordination, and mobile access for every driver.",
  keywords: ["delivery scheduling software", "delivery driver scheduling", "dispatch scheduling software", "last-mile delivery management", "driver shift planning", "fleet scheduling app", "delivery workforce management", "route scheduling software", "delivery dispatch system", "courier scheduling software"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Delivery Scheduling Software for Drivers & Dispatch Teams | StaffSchedule.io",
    description: "Coordinate delivery drivers, manage dispatch shifts, and keep last-mile operations running on time. Free 14-day trial.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Delivery Scheduling Software Dashboard" }],
  },
};

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Delivery Scheduling Software", url: PAGE_URL,
      applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android",
      description: "Delivery scheduling software for coordinating drivers, managing dispatch shifts, and optimizing last-mile delivery operations.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5" },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is delivery scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Delivery scheduling software helps businesses plan driver shifts, coordinate dispatch operations, and manage last-mile delivery teams. It replaces spreadsheets and phone calls with a centralized platform where dispatchers can assign jobs, track availability, and communicate with drivers in real time." } },
        { "@type": "Question", name: "How do I schedule delivery drivers efficiently?", acceptedAnswer: { "@type": "Answer", text: "StaffSchedule.io lets you view all driver availability at once, drag-and-drop shifts onto a visual calendar, and auto-build schedules based on demand. Drivers get instant notifications on their phones and can accept or flag scheduling issues in the app." } },
        { "@type": "Question", name: "Does delivery scheduling software work with multiple depots?", acceptedAnswer: { "@type": "Answer", text: "Yes. StaffSchedule.io supports multi-depot operations. Each location has its own schedule, roster, and reporting, while managers with the right permissions can see across all locations from a single dashboard." } },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      {children}
    </>
  );
}
