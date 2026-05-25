import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Event Staff Scheduling Software | StaffSchedule.io — For Catering, Weddings & Live Events",
  description: "Event staff scheduling software built for catering companies, event production crews, wedding planners, and venue operators. Roster temp staff, coordinate multi-venue events, and run day-of-event coverage from your phone. Free 14-day trial.",
  keywords: [
    "event staff scheduling software",
    "catering scheduling software",
    "event crew management",
    "temporary staff scheduling",
    "wedding staff scheduling",
    "event production scheduling",
    "on-demand event staffing",
    "event roster management",
    "catering payroll software",
    "event labor management",
    "freelance event staff app",
    "multi-venue event scheduling",
    "wedding planner scheduling tool",
    "event coordination software",
    "festival staff scheduling",
  ],
  alternates: { canonical: `${BASE_URL}/industries/events-catering` },
  openGraph: {
    title: "Event Staff Scheduling Software | StaffSchedule.io",
    description: "Schedule event crews. Coordinate day-of-event. Track temp staff hours. From wedding receptions to 5,000-person festivals.",
    url: `${BASE_URL}/industries/events-catering`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Event staff scheduling software" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Staff Scheduling Software | StaffSchedule.io",
    description: "Built for caterers, event production, and venue operators. Roster, coordinate, pay. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Event Staff Scheduling Software",
      url: `${BASE_URL}/industries/events-catering`,
      description: "Event staff scheduling software for catering companies, event production firms, wedding planners, and venue operators. Roster, coordinate, and pay temporary and freelance event crews from one platform.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Event-based roster builder",
        "Multi-venue scheduling",
        "Skill and certification tagging",
        "Day-of-event group chat",
        "GPS clock-in at event sites",
        "Temp staff and freelance payroll",
        "Real-time event timeline view",
        "Tip pool for event servers",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is event staff scheduling software?",
          acceptedAnswer: { "@type": "Answer", text: "Event staff scheduling software is a digital platform used by catering companies, event production firms, and venue operators to plan, roster, and coordinate temporary and freelance event crews. It replaces spreadsheets and group texts with a system that handles event timelines, skill-based crew assignment, day-of-event communication, and payroll for variable workforces." },
        },
        {
          "@type": "Question",
          name: "Can I schedule temporary or freelance event staff?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Build a roster of available temp staff, tag each by skill (bartender, server, audio tech, setup crew, security), and assign per event. Staff get notifications, can accept or decline, and their hours flow straight to payroll — including 1099 contractors." },
        },
        {
          "@type": "Question",
          name: "How does day-of-event coordination work?",
          acceptedAnswer: { "@type": "Answer", text: "Every event has its own group chat that opens 24 hours before load-in. Crews check in via GPS at the venue, get real-time updates from coordinators, and report issues without a single phone call. Once the event ends, the chat archives and timesheets are payroll-ready." },
        },
        {
          "@type": "Question",
          name: "Can I manage staff across multiple venues at once?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. A single dashboard shows every event happening today across every venue. Move crew between events with a tap, see who's confirmed at which site, and broadcast updates to all locations at once." },
        },
        {
          "@type": "Question",
          name: "Does the platform handle event timelines and load-in schedules?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Every event has a structured timeline (load-in, setup, service, breakdown, load-out) with staff assigned to each phase. Crews see their full timeline in the mobile app and get alerts before each phase starts." },
        },
        {
          "@type": "Question",
          name: "What kinds of events does StaffSchedule.io support?",
          acceptedAnswer: { "@type": "Answer", text: "Weddings, corporate events, fundraisers, galas, festivals, concerts, conferences, sporting events, conventions, private parties, brand activations, pop-ups, and any other event with a temporary or rotating crew. From a 20-person reception to a 5,000-attendee festival." },
        },
        {
          "@type": "Question",
          name: "How does payroll work for freelance event crews?",
          acceptedAnswer: { "@type": "Answer", text: "Timesheets generated from GPS clock-ins flow to your payroll provider with W-2 and 1099 classification preserved. Tips, overtime, and per-event rates are all supported. Pay your freelance crew in days, not weeks." },
        },
      ],
    },
  ],
};

export default function EventsCateringLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
