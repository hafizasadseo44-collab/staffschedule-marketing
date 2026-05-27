import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/construction-crew-scheduling-software`;

export const metadata: Metadata = {
  title: "Construction Crew Scheduling Software for Job-Site Operations | StaffSchedule.io",
  description: "Construction crew scheduling software for job-site planning, contractor coordination, and field workforce management. Track overtime, manage multi-site crews, and keep every worker informed.",
  keywords: ["construction crew scheduling software", "construction workforce management", "job-site scheduling app", "contractor scheduling software", "field crew scheduling", "construction shift planning", "construction worker scheduling", "site supervisor app", "construction labor management", "heavy equipment scheduling"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Construction Crew Scheduling Software for Job-Site Operations | StaffSchedule.io",
    description: "Schedule construction crews across multiple job sites, track overtime, and coordinate field workers with a mobile-first platform built for the trades.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Construction Crew Scheduling Software" }],
  },
};

export default function ConstructionLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Construction Crew Scheduling Software", url: PAGE_URL,
      applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android",
      description: "Construction crew scheduling software for job-site planning, contractor coordination, overtime tracking, and mobile field workforce management.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5" },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is the best scheduling software for construction crews?", acceptedAnswer: { "@type": "Answer", text: "StaffSchedule.io is designed for the unpredictable nature of construction scheduling. It handles multi-site crew management, contractor coordination, overtime tracking, weather-delay rescheduling, and mobile-first field communication — all from one platform." } },
        { "@type": "Question", name: "How do construction companies manage multiple job-site schedules?", acceptedAnswer: { "@type": "Answer", text: "With StaffSchedule.io, you can create separate scheduling boards for every active job site and manage them from a unified dashboard. Foremen can see their crew assignments, project managers can view cross-site resource allocation, and workers get mobile notifications about schedule changes." } },
        { "@type": "Question", name: "Can construction scheduling software track overtime?", acceptedAnswer: { "@type": "Answer", text: "Yes. StaffSchedule.io automatically tracks regular hours versus overtime for every worker. You can set daily and weekly overtime thresholds, receive alerts before a worker hits overtime, and export payroll-ready reports at the end of each pay period." } },
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
