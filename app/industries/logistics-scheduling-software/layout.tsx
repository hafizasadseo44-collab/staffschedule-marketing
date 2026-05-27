import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/logistics-scheduling-software`;

export const metadata: Metadata = {
  title: "Logistics Scheduling Software for Warehouses & Transport Teams | StaffSchedule.io",
  description: "Enterprise logistics scheduling software for warehouse staffing, transportation coordination, and multi-location workforce management. Real-time visibility across your entire logistics operation.",
  keywords: ["logistics scheduling software", "logistics workforce management", "warehouse scheduling software", "transportation scheduling", "supply chain workforce planning", "dispatch coordination", "multi-location scheduling", "logistics staff scheduling", "freight workforce management"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Logistics Scheduling Software for Warehouses & Transport Teams | StaffSchedule.io",
    description: "Plan warehouse shifts, coordinate transport teams, and manage multi-location logistics operations from one platform.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Logistics Scheduling Software" }],
  },
};

export default function LogisticsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Logistics Scheduling Software", url: PAGE_URL,
      applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android",
      description: "Logistics scheduling software for warehouse staffing, transport coordination, and multi-location workforce management.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5" },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is logistics scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Logistics scheduling software helps operations managers plan warehouse shifts, coordinate transportation teams, and manage multi-location workforces from a single platform. It provides real-time visibility into staffing levels, shift coverage, and labor costs across the entire logistics operation." } },
        { "@type": "Question", name: "How do logistics companies manage shift scheduling?", acceptedAnswer: { "@type": "Answer", text: "Effective logistics scheduling involves matching staffing levels to inbound and outbound freight volumes, coordinating cross-shift handovers, and ensuring compliance with Hours of Service regulations. StaffSchedule.io automates this with demand-based scheduling tools, compliance tracking, and real-time crew visibility." } },
        { "@type": "Question", name: "Can logistics scheduling software handle multiple warehouses?", acceptedAnswer: { "@type": "Answer", text: "Yes. StaffSchedule.io is built for multi-location logistics operations. Each facility has its own scheduling board, roster, and reporting. Regional managers can view all locations simultaneously, and employees can be shared across sites with automatic conflict detection." } },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      {children}
    </>
  );
}
