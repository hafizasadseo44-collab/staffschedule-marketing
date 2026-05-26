import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Technology Team Scheduling Software | StaffSchedule.io",
  description:
    "Scheduling software for tech companies managing support teams, on-call rotations, hybrid engineers, and remote developers. Streamline your engineering operations with intelligent workforce scheduling. Free 14-day trial.",
  keywords: [
    "technology team scheduling software",
    "tech staff scheduling software",
    "on-call rotation scheduling",
    "software team scheduling",
    "engineering team scheduling",
    "remote team scheduling software",
    "hybrid team scheduling",
    "IT support scheduling software",
    "developer schedule management",
    "tech workforce management",
    "agile team scheduling",
    "SaaS team scheduling platform",
    "scheduling app for tech teams",
    "employee scheduling for technology companies",
    "shift scheduling for IT teams",
  ],
  alternates: { canonical: `${BASE_URL}/industries/technology-software` },
  openGraph: {
    title: "Technology Team Scheduling Software | StaffSchedule.io",
    description:
      "Manage on-call rotations, support team shifts, hybrid schedules, and engineering availability from one modern platform. Built for tech companies that move fast.",
    url: `${BASE_URL}/industries/technology-software`,
    images: [
      {
        url: `${BASE_URL}/staffschedule-dashboard.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Technology Team Scheduling Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Team Scheduling Software | StaffSchedule.io",
    description:
      "On-call rotations, support shifts, hybrid engineers. Modern scheduling for tech teams.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Technology Team Scheduling",
      url: `${BASE_URL}/industries/technology-software`,
      description:
        "Employee scheduling and on-call management platform for technology companies, software teams, IT support operations, and engineering departments.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "14-day free trial. No credit card required.",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1038",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does scheduling software help technology teams?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Technology teams use scheduling software to manage on-call rotations, customer support shifts, hybrid office schedules, and dev team availability. Instead of juggling spreadsheets and Slack messages, managers can build and publish schedules in minutes, track hours accurately, and communicate changes instantly through the mobile app.",
          },
        },
        {
          "@type": "Question",
          name: "Can StaffSchedule.io manage on-call rotations for engineering teams?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. StaffSchedule.io supports rotating on-call schedules with automatic rotation patterns, escalation rules, and instant mobile alerts. Engineers know exactly when they're on-call weeks in advance, and managers can swap rotations with a tap when conflicts arise.",
          },
        },
        {
          "@type": "Question",
          name: "Does it work for remote and hybrid technology teams?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. StaffSchedule.io works for fully remote, hybrid, and in-office tech teams. Staff manage their availability and schedules from anywhere on the mobile app, managers see real-time team coverage across time zones, and communication happens through built-in team messaging.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: "Technology & Software", item: `${BASE_URL}/industries/technology-software` },
      ],
    },
  ],
};

export default function TechnologySoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
