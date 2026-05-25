import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Restaurant Scheduling Software | StaffSchedule.io — Built for FOH & BOH Teams",
  description: "Restaurant staff scheduling software trusted by independent restaurants, QSR chains, fine dining, and bars. Cover the dinner rush, swap shifts in seconds, track tips, and sync hours straight to payroll. Free 14-day trial.",
  keywords: [
    "restaurant scheduling software",
    "restaurant employee scheduling",
    "restaurant staff scheduling app",
    "kitchen scheduling software",
    "shift swap restaurant",
    "tip tracking software",
    "restaurant time clock",
    "FOH BOH scheduling",
    "QSR scheduling software",
    "bar scheduling app",
    "restaurant workforce management",
    "dinner rush staffing",
    "restaurant labor cost software",
    "tip pool calculator",
    "restaurant payroll integration",
  ],
  alternates: { canonical: `${BASE_URL}/industries/restaurants` },
  openGraph: {
    title: "Restaurant Scheduling Software | StaffSchedule.io",
    description: "Cover the dinner rush. Track tips. Stop chasing call-outs. Restaurant scheduling built for the way kitchens and floors actually run.",
    url: `${BASE_URL}/industries/restaurants`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Restaurant scheduling software dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Scheduling Software | StaffSchedule.io",
    description: "FOH and BOH on one platform. Tips tracked. Payroll synced. 8x faster scheduling.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Restaurant Scheduling Software",
      url: `${BASE_URL}/industries/restaurants`,
      description: "Restaurant scheduling software with front-of-house and back-of-house support, shift swaps, tip pool tracking, GPS time clock, and payroll integration. Built for restaurants, cafés, bars, QSRs, and fine dining.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "FOH and BOH unified scheduling",
        "Dinner rush coverage planning",
        "Shift swap marketplace",
        "Tip pool and tip-out tracking",
        "Section and station assignments",
        "Kitchen brigade role templates",
        "GPS time clock with break tracking",
        "Real-time labor cost alerts",
        "Payroll integration (ADP, Gusto, QuickBooks)",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is restaurant scheduling software?",
          acceptedAnswer: { "@type": "Answer", text: "Restaurant scheduling software is a digital tool that replaces paper rotas and spreadsheets used to plan staff shifts in restaurants, cafés, bars, and QSRs. It lets managers build the week's schedule in minutes, handles shift swaps and call-outs automatically, tracks hours and tips, and syncs everything to payroll. StaffSchedule.io is built specifically for the rhythms of food service — covering both front-of-house and back-of-house in one platform." },
        },
        {
          "@type": "Question",
          name: "How does StaffSchedule.io handle the dinner rush?",
          acceptedAnswer: { "@type": "Answer", text: "Demand-based templates let you pre-build coverage levels for Friday 7pm, weekend brunch, and any other peak. Drag the template onto the week and every server, bartender, and line cook position is filled in seconds. Real-time alerts warn you when coverage drops below threshold — so you fix it before the doors open, not after." },
        },
        {
          "@type": "Question",
          name: "Can staff swap restaurant shifts in the app?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. A server posts a swap request, qualified coworkers see it instantly, the first to claim it gets approved, and the manager gets a notification to confirm. The whole swap takes under a minute — no phone tag, no missed coverage. You can also auto-approve swaps between same-role employees if you want to remove the manager step entirely." },
        },
        {
          "@type": "Question",
          name: "Does it track tips and tip pools?",
          acceptedAnswer: { "@type": "Answer", text: "Built in. Configure tip-out percentages per role, pool by shift, and let the system calculate distributions automatically. Tips flow into approved timesheets and sync to payroll alongside regular wages — so tipped employees get accurate pay every cycle without spreadsheet gymnastics." },
        },
        {
          "@type": "Question",
          name: "Does it work for both FOH and BOH staff?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Front-of-house (servers, hosts, bartenders, bussers) and back-of-house (chefs, line cooks, prep, dishwashers) all live in one platform. Each role has its own section and station templates, certifications, and tip rules — so the system fits how your restaurant actually operates instead of forcing you into a generic scheduling box." },
        },
        {
          "@type": "Question",
          name: "Does StaffSchedule.io integrate with restaurant payroll?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Approved timesheets sync directly with ADP, Gusto, QuickBooks, and other major payroll providers. Tips, regular hours, overtime, and break deductions all flow through automatically. Payroll runs in 30 minutes instead of 3 days." },
        },
        {
          "@type": "Question",
          name: "What types of restaurants use StaffSchedule.io?",
          acceptedAnswer: { "@type": "Answer", text: "Independent restaurants, multi-location chains, fast-casual brands, quick-service (QSR), fine dining, bars, pubs, cafés, coffee shops, bakeries, food trucks, ghost kitchens, catering operations, and bistros. From a 5-person café to a 50-location group — the platform scales to your operation." },
        },
        {
          "@type": "Question",
          name: "How fast can a restaurant get started?",
          acceptedAnswer: { "@type": "Answer", text: "Most restaurants are running their first schedule on day one. The setup wizard imports your roster, applies a restaurant industry preset (FOH/BOH structure, common positions, tip rules), and walks you through your first schedule. Staff get the mobile app on their phones the same day." },
        },
      ],
    },
  ],
};

export default function RestaurantsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
