import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Home Care Scheduling Software | StaffSchedule.io — For In-Home Care Agencies",
  description: "Home care scheduling software for in-home care agencies, hospice teams, and personal-care providers. Visit-based scheduling, GPS clock-in at client homes, route coordination, and EVV-friendly timesheets. Free 14-day trial.",
  keywords: [
    "home care scheduling software",
    "in-home care scheduling",
    "home health scheduling",
    "personal care agency software",
    "hospice scheduling software",
    "home care EVV software",
    "caregiver visit scheduling",
    "mobile caregiver clock-in",
    "home care workforce app",
    "home care billing integration",
    "home care payroll software",
    "field caregiver scheduling",
    "home care agency management",
    "caregiver route planning",
    "home care compliance",
  ],
  alternates: { canonical: `${BASE_URL}/industries/home-care` },
  openGraph: {
    title: "Home Care Scheduling Software | StaffSchedule.io",
    description: "Built for in-home care agencies. Visit scheduling, GPS clock-in at client homes, route coordination, EVV-friendly timesheets.",
    url: `${BASE_URL}/industries/home-care`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Home care scheduling software" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Care Scheduling Software | StaffSchedule.io",
    description: "Built for in-home care, home health, and hospice. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Home Care Scheduling Software",
      url: `${BASE_URL}/industries/home-care`,
      description: "Visit-based scheduling and workforce management for home care agencies, home health, hospice, and personal-care providers. Includes mobile caregiver clock-in at client homes, route coordination, EVV-friendly timesheets, and payroll integration.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Visit-based caregiver scheduling",
        "GPS clock-in at client locations",
        "Caregiver route coordination",
        "Real-time visit verification",
        "Client preference and care notes",
        "EVV-friendly timesheet exports",
        "Mobile caregiver app",
        "Home care payroll and billing integration",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is home care scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Home care scheduling software is a workforce platform built for agencies that send caregivers into client homes. It coordinates visit-based schedules, captures GPS-verified clock-ins at client addresses, manages caregiver routes, and feeds accurate hours into payroll and billing. StaffSchedule.io serves in-home care, home health, hospice, and personal-care agencies of every size." } },
        { "@type": "Question", name: "How does the GPS clock-in work at client homes?", acceptedAnswer: { "@type": "Answer", text: "When a caregiver arrives at a client's home, they open the mobile app and clock in. The system captures their GPS location and confirms it matches the client's address. The visit start and end times are timestamped, geo-verified, and ready for payroll and EVV reporting." } },
        { "@type": "Question", name: "Is this EVV compliant?", acceptedAnswer: { "@type": "Answer", text: "StaffSchedule.io captures the data points EVV programs require (caregiver identity, client identity, location, start time, end time, service type) and exports them in formats compatible with state EVV aggregators. Pair with your billing/EVV vendor of choice for full compliance — or use our managed EVV export to your state aggregator directly." } },
        { "@type": "Question", name: "Does it help with caregiver route planning?", acceptedAnswer: { "@type": "Answer", text: "Yes. The route view shows each caregiver's daily visits on a map, ordered by time, with estimated drive between stops. Schedulers can rebalance to reduce drive time and miss-rate. Caregivers see their route in the mobile app with turn-by-turn directions." } },
        { "@type": "Question", name: "How does it reduce missed visits?", acceptedAnswer: { "@type": "Answer", text: "Caregivers get visit reminders 60, 30, and 10 minutes before each appointment. Late clock-ins trigger immediate alerts to the office so coverage can be reassigned. Daily completion dashboards track miss rate by caregiver, client, and zip code — so you spot patterns before they become complaints." } },
        { "@type": "Question", name: "Does it handle caregiver availability and preferences?", acceptedAnswer: { "@type": "Answer", text: "Yes. Caregivers set availability windows, preferred clients, blackout days, and travel limits via the mobile app. Schedulers see availability when building routes; the system warns when assignments conflict. Reduces caregiver churn by respecting their boundaries." } },
        { "@type": "Question", name: "Does it integrate with home care billing and payroll?", acceptedAnswer: { "@type": "Answer", text: "Yes. Approved visit hours flow to home care billing platforms and to major payroll providers (ADP, Gusto, QuickBooks, Rippling). Bill-rate vs pay-rate is configurable per service type, client, or caregiver. Mileage reimbursement is supported." } },
        { "@type": "Question", name: "How fast can a home care agency get started?", acceptedAnswer: { "@type": "Answer", text: "Most home care agencies are running their first week of visits on day one. The setup wizard imports your caregiver roster and client list, applies home care industry presets (visit-based scheduling, GPS clock-in, route view), and walks you through publishing. Caregivers get the mobile app the same day." } },
      ],
    },
  ],
};

export default function HomeCareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
