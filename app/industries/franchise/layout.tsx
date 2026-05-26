import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Franchise Scheduling Software | StaffSchedule.io — Multi-Location Workforce Management",
  description: "Franchise scheduling software for multi-location operations. Centralized HQ visibility, local franchisee autonomy, brand-consistent templates, and portfolio-wide labor reporting. From 5 units to 500. Free 14-day trial.",
  keywords: [
    "franchise scheduling software",
    "franchise employee scheduling",
    "multi-location scheduling software",
    "multi-location employee scheduling",
    "franchise workforce management",
    "franchise staff management",
    "centralized franchise scheduling",
    "franchise time clock software",
    "franchise payroll integration",
    "franchise operations software",
    "branch scheduling software",
    "franchise compliance software",
    "franchise labor management",
    "franchise team management",
    "franchise location dashboard",
  ],
  alternates: { canonical: `${BASE_URL}/industries/franchise` },
  openGraph: {
    title: "Franchise Scheduling Software | StaffSchedule.io",
    description: "Multi-location workforce management for franchise brands. HQ visibility, franchisee autonomy, brand templates, portfolio reporting.",
    url: `${BASE_URL}/industries/franchise`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Franchise scheduling software dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franchise Scheduling Software | StaffSchedule.io",
    description: "Built for franchise brands and multi-unit operators. Enterprise-grade. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Franchise Scheduling Software",
      url: `${BASE_URL}/industries/franchise`,
      description: "Multi-location workforce management software for franchise brands. Balances corporate brand standards with franchisee operational autonomy across hundreds of locations.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Multi-location unified scheduling",
        "Centralized HQ command center",
        "Local franchisee permission tiers",
        "Brand-standard schedule templates",
        "Portfolio-wide labor reporting",
        "Cross-location staff sharing",
        "Compliance audit trails per location",
        "Multi-tenant payroll integration",
        "Regional and territory rollups",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is franchise scheduling software?",
          acceptedAnswer: { "@type": "Answer", text: "Franchise scheduling software is multi-location workforce management built for the unique structure of franchise brands. It balances corporate-level visibility and brand standards with franchisee-level operational autonomy. HQ sees the portfolio. Franchisees run their unit. Both work in one platform with role-appropriate permissions." },
        },
        {
          "@type": "Question",
          name: "How does multi-location scheduling work for franchises?",
          acceptedAnswer: { "@type": "Answer", text: "Each franchise location operates independently with its own schedule, staff roster, and labor budget. HQ sees every location in one dashboard with labor cost percentages, coverage status, and compliance alerts. Brand-standard templates can be pushed to all units; franchisees adapt them to local needs within configurable guardrails." },
        },
        {
          "@type": "Question",
          name: "Can corporate enforce brand-standard scheduling rules?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. HQ can lock certain positions, minimum coverage levels, break enforcement rules, and labor budget ranges as brand standards. Franchisees schedule freely within those bounds. Audit trails prove compliance for franchise-agreement reviews." },
        },
        {
          "@type": "Question",
          name: "Can staff work across multiple franchise locations?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Cross-location staff sharing lets one employee be scheduled at multiple units (with HQ and franchisee approval). Hours, breaks, and overtime aggregate correctly across locations. Useful for traveling managers, regional trainers, and corporate-employee deployments." },
        },
        {
          "@type": "Question",
          name: "Does the platform support large franchise networks?",
          acceptedAnswer: { "@type": "Answer", text: "Absolutely. The platform scales from 2 to 2,000+ locations with regional and territory-level rollups, multi-tier reporting, and enterprise SSO. Used by franchise brands in food service, fitness, education, beauty, and home services." },
        },
        {
          "@type": "Question",
          name: "Does it handle franchise compliance and audits?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Every location maintains full audit trails for labor-law compliance, break enforcement, certification tracking, and shift documentation. HQ can run compliance reports across the portfolio for any date range — useful for franchise-agreement reviews, regulatory audits, or M&A diligence." },
        },
        {
          "@type": "Question",
          name: "Can each location use its own payroll provider?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Different franchisees often use different payroll providers (ADP, Gusto, QuickBooks, Rippling, or local processors). Each location configures its own integration; HQ still sees aggregated labor cost without needing payroll access at the unit level." },
        },
        {
          "@type": "Question",
          name: "How fast can a franchise network roll out?",
          acceptedAnswer: { "@type": "Answer", text: "Single-unit rollouts go live in a day. Brand-wide rollouts typically launch one region at a time over 4–12 weeks, with onboarding playbooks, train-the-trainer support, and dedicated franchise customer success. Most brands report 80%+ unit adoption within 90 days." },
        },
      ],
    },
  ],
};

export default function FranchiseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
