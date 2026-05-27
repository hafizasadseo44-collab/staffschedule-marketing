import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/manufacturing-scheduling-software`;

export const metadata: Metadata = {
  title: "Manufacturing Scheduling Software for Shift Planning & Compliance | StaffSchedule.io",
  description: "Manufacturing scheduling software for factory shift planning, rotating schedules, overtime management, and production workforce coordination. Built for plant managers and HR teams.",
  keywords: ["manufacturing scheduling software", "factory shift planning", "rotating shift management", "manufacturing workforce management", "plant scheduling software", "production scheduling software", "factory employee scheduling", "manufacturing HR software", "union scheduling compliance", "shift rotation software"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Manufacturing Scheduling Software for Shift Planning & Compliance | StaffSchedule.io",
    description: "Plan rotating shifts, manage overtime compliance, and coordinate your entire production workforce from one platform.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Manufacturing Scheduling Software" }],
  },
};

export default function ManufacturingLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Manufacturing Scheduling Software", url: PAGE_URL,
      applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android",
      description: "Manufacturing scheduling software for shift planning, rotating schedules, overtime compliance, and production workforce management.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5" },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is manufacturing scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Manufacturing scheduling software helps plant managers and HR teams plan factory shifts, manage rotating schedules, track overtime compliance, and coordinate the production workforce. It ensures the right number of workers are on each production line for every shift." } },
        { "@type": "Question", name: "How do you manage rotating shifts in a manufacturing plant?", acceptedAnswer: { "@type": "Answer", text: "StaffSchedule.io supports common manufacturing rotation patterns including continental shifts, DuPont schedules, and custom rotating cycles. You configure the pattern once and the system automatically generates future schedules, tracks who is next in the rotation, and alerts supervisors to any coverage gaps." } },
        { "@type": "Question", name: "Can manufacturing scheduling software help with union compliance?", acceptedAnswer: { "@type": "Answer", text: "Yes. StaffSchedule.io lets you configure seniority-based rules, minimum rest periods between shifts, overtime distribution requirements, and other union agreement terms. The system flags any schedule that would violate your configured rules before it is published." } },
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
