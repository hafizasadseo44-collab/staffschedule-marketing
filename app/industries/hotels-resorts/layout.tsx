import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Hotel Staff Scheduling Software | StaffSchedule.io — Built for Hotels, Resorts & Hospitality",
  description: "Hotel staff scheduling software for 24/7 properties. Coordinate housekeeping, front desk, F&B, spa, and maintenance from one dashboard. Multi-property rollouts, union shift rules, and payroll integration. Free 14-day trial.",
  keywords: [
    "hotel staff scheduling software",
    "hotel employee scheduling",
    "housekeeping scheduling software",
    "front desk scheduling",
    "resort workforce management",
    "hotel labor management software",
    "hotel time clock app",
    "multi-property hotel scheduling",
    "hotel payroll integration",
    "hospitality scheduling app",
    "24/7 hotel staffing",
    "boutique hotel scheduling",
    "resort employee management",
    "hotel union shift rules",
    "hotel housekeeping app",
  ],
  alternates: { canonical: `${BASE_URL}/industries/hotels-resorts` },
  openGraph: {
    title: "Hotel Staff Scheduling Software | StaffSchedule.io",
    description: "Schedule housekeeping, front desk, F&B, spa, and maintenance from one platform. Built for 24/7 properties and multi-location hotel groups.",
    url: `${BASE_URL}/industries/hotels-resorts`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Hotel staff scheduling software dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Staff Scheduling Software | StaffSchedule.io",
    description: "24/7 multi-department scheduling for hotels and resorts. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Hotel Staff Scheduling Software",
      url: `${BASE_URL}/industries/hotels-resorts`,
      description: "Hotel staff scheduling software for hotels, resorts, and hospitality properties. Coordinates housekeeping, front desk, food and beverage, spa, and maintenance schedules across single and multi-location operations.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "24-hour shift coverage view",
        "Multi-department scheduling (housekeeping, front desk, F&B, spa, maintenance)",
        "Multi-property command center",
        "Union and labor law compliance",
        "Housekeeping room assignment",
        "Front desk shift handover notes",
        "F&B tip pooling",
        "GPS time clock for resort properties",
        "Payroll integration",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is hotel staff scheduling software?",
          acceptedAnswer: { "@type": "Answer", text: "Hotel staff scheduling software is a workforce management platform built for the unique demands of 24/7 hospitality operations. It coordinates schedules across multiple departments (housekeeping, front desk, food and beverage, spa, maintenance, security), enforces union and labor law rules, and provides real-time coverage visibility across single or multiple properties." },
        },
        {
          "@type": "Question",
          name: "How does it handle multiple hotel departments?",
          acceptedAnswer: { "@type": "Answer", text: "Every department gets its own schedule template with role-specific positions (room attendants, front desk agents, banquet servers, spa technicians, maintenance engineers). Department heads schedule independently but property managers see all departments in one dashboard. Cross-department messaging keeps everyone aligned on guest events, VIP arrivals, and overnight handoffs." },
        },
        {
          "@type": "Question",
          name: "Does it support 24/7 hotel operations?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Continuous 24-hour coverage views show exactly who is on-property every hour, every department, every day. Overnight shift transitions are tracked. Late check-ins, early arrivals, and overnight maintenance windows are scheduled and staffed without coverage gaps." },
        },
        {
          "@type": "Question",
          name: "Can I manage staff across multiple properties?",
          acceptedAnswer: { "@type": "Answer", text: "Absolutely. The multi-property command center shows labor cost, coverage status, and active issues across every property in your portfolio. Move staff between sister properties with a tap. Run portfolio-wide labor reports. Built for hotel groups managing 2 to 200 properties." },
        },
        {
          "@type": "Question",
          name: "Does it handle union shift rules?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Union-specific rules (rest periods, minimum-hour guarantees, seniority-based bidding, holiday rotation, mandatory break enforcement) are configurable per department or per property. Audit-ready logs prove compliance on every shift assignment." },
        },
        {
          "@type": "Question",
          name: "Does it work for boutique hotels and large resorts?",
          acceptedAnswer: { "@type": "Answer", text: "Both. From a 12-room boutique inn to a 1,200-room resort, the platform scales. Boutique hotels appreciate the simplicity (live in under an hour); resorts use the multi-department coordination and union compliance features daily." },
        },
        {
          "@type": "Question",
          name: "How does payroll integration work for hotels?",
          acceptedAnswer: { "@type": "Answer", text: "Approved timesheets sync with ADP, Gusto, QuickBooks, and major payroll providers. F&B tips, housekeeping room-based bonuses, and per-property differentials all flow through correctly. Payroll runs in under an hour instead of two days." },
        },
      ],
    },
  ],
};

export default function HotelsResortsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
