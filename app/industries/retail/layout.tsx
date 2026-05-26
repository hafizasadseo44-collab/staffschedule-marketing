import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Retail Employee Scheduling Software | StaffSchedule.io — Built for Stores",
  description: "Retail employee scheduling software for single stores, multi-store chains, and seasonal operators. Match coverage to foot traffic, fill last-minute callouts, manage holiday staffing, and sync payroll. Free 14-day trial.",
  keywords: [
    "retail employee scheduling software",
    "retail scheduling app",
    "store employee scheduling",
    "cashier scheduling software",
    "retail workforce management",
    "multi-store scheduling",
    "seasonal staff scheduling",
    "holiday retail scheduling",
    "retail shift planning",
    "boutique scheduling software",
    "shop floor scheduling",
    "retail labor management",
    "retail time clock",
    "retail payroll integration",
    "store coverage planning",
  ],
  alternates: { canonical: `${BASE_URL}/industries/retail` },
  openGraph: {
    title: "Retail Employee Scheduling Software | StaffSchedule.io",
    description: "Match staff to foot traffic. Cover Black Friday. Fill callouts in minutes. Built for boutique, big-box, and multi-store retail.",
    url: `${BASE_URL}/industries/retail`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Retail employee scheduling software dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Employee Scheduling Software | StaffSchedule.io",
    description: "Built for stores. Foot-traffic-based coverage. Holiday staffing. Multi-store control. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Retail Employee Scheduling Software",
      url: `${BASE_URL}/industries/retail`,
      description: "Retail employee scheduling software designed for boutiques, big-box stores, specialty retailers, franchise locations, and multi-store chains. Matches staffing to foot traffic forecasts, handles seasonal hiring, and syncs to payroll.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Foot-traffic-based coverage planning",
        "Holiday and Black Friday templates",
        "Seasonal staff onboarding",
        "Multi-store unified scheduling",
        "Mobile shift swap marketplace",
        "Real-time labor cost vs sales",
        "POS sales sync",
        "Break compliance enforcement",
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
          name: "What is retail employee scheduling software?",
          acceptedAnswer: { "@type": "Answer", text: "Retail employee scheduling software is a digital platform that replaces paper rotas and spreadsheets used to plan staff shifts in stores. It coordinates cashiers, sales associates, stock teams, and visual merchandisers; matches coverage to foot traffic forecasts; handles last-minute callouts; and syncs approved hours to payroll. StaffSchedule.io is purpose-built for retail rhythms — peak hours, seasonal hires, and multi-store operations." },
        },
        {
          "@type": "Question",
          name: "How does it handle Black Friday and holiday staffing?",
          acceptedAnswer: { "@type": "Answer", text: "Pre-built holiday templates let you draft coverage for Black Friday, Boxing Day, Mother's Day, and any other peak in advance. Drag the template onto the week and every position fills automatically. Seasonal hires onboard in minutes, get the mobile app the same day, and you can de-activate them after the season ends." },
        },
        {
          "@type": "Question",
          name: "Can I match staff coverage to foot traffic?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Pull foot traffic forecasts from your POS or counter system, and the platform suggests coverage by hour. Schedule more cashiers during the lunch rush, more associates Saturday afternoon, and fewer staff during weekday mornings. Labor cost stays aligned with revenue automatically." },
        },
        {
          "@type": "Question",
          name: "Can it manage multiple retail locations?",
          acceptedAnswer: { "@type": "Answer", text: "Absolutely. The multi-store dashboard shows every location at once. Move staff between sister stores with one tap, run group-wide labor reports, and let district managers oversee 5 to 500 stores from one screen. Built for chains, franchises, and multi-brand retail operators." },
        },
        {
          "@type": "Question",
          name: "How does shift swapping work for retail teams?",
          acceptedAnswer: { "@type": "Answer", text: "An associate posts a swap, qualified coworkers in the same store get a push notification, the first to accept gets it after a one-tap manager approval. Average swap time: under 90 seconds. You can also auto-approve same-role swaps to remove the manager step entirely." },
        },
        {
          "@type": "Question",
          name: "Does the software integrate with retail POS systems?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Pull hourly sales data, transaction counts, and foot traffic from major retail POS systems to drive schedule recommendations. Labor cost displays as a live percentage of forecasted revenue — so you spot overstaffing before it shows up on the P&L." },
        },
        {
          "@type": "Question",
          name: "What types of retail businesses use StaffSchedule.io?",
          acceptedAnswer: { "@type": "Answer", text: "Independent boutiques, multi-location chains, big-box retailers, specialty stores, franchise retail brands, pop-ups, outlet stores, grocery, hardware, beauty, fashion, electronics, sporting goods, jewelry, and pet retail. From a 3-person boutique to a 500-store chain — the platform scales to your operation." },
        },
        {
          "@type": "Question",
          name: "How fast can a retail store get started?",
          acceptedAnswer: { "@type": "Answer", text: "Most retail stores publish their first schedule on day one. The setup wizard applies the retail industry preset (positions, peak templates, break rules), imports your roster from a CSV or your POS, and walks you through publishing the first week. Staff get the mobile app the same day — average employee adoption is 2 days." },
        },
      ],
    },
  ],
};

export default function RetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
