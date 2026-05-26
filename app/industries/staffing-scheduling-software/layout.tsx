import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Staffing Agency Scheduling Software | StaffSchedule.io",
  description:
    "Scheduling software built for staffing agencies and workforce management firms. Manage temp placements, coordinate workers across multiple clients, and run your staffing operation efficiently. Free 14-day trial.",
  keywords: [
    "staffing agency scheduling software",
    "staffing scheduling software",
    "temp agency scheduling",
    "workforce management for staffing agencies",
    "employee scheduling for staffing firms",
    "temp staff scheduling software",
    "multi-client scheduling platform",
    "staffing operations software",
    "shift scheduling for staffing agencies",
    "workforce planning software",
    "staff placement scheduling",
    "online scheduling for staffing",
    "employee scheduling app for agencies",
    "shift management software",
    "team scheduling platform",
  ],
  alternates: { canonical: `${BASE_URL}/industries/staffing-scheduling-software` },
  openGraph: {
    title: "Staffing Agency Scheduling Software | StaffSchedule.io",
    description:
      "Manage temp placements, coordinate workers across multiple clients, and run your staffing agency without the chaos. StaffSchedule.io is built for the staffing industry.",
    url: `${BASE_URL}/industries/staffing-scheduling-software`,
    images: [
      {
        url: `${BASE_URL}/staffschedule-dashboard.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Staffing Agency Scheduling Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Staffing Agency Scheduling Software | StaffSchedule.io",
    description:
      "Built for staffing agencies. Manage placements, fill shifts fast, and coordinate workers across multiple clients.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Staffing Agency Edition",
      url: `${BASE_URL}/industries/staffing-scheduling-software`,
      description:
        "Workforce scheduling software for staffing agencies managing temporary workers, permanent placements, and multi-client shift operations.",
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
          name: "What is staffing agency scheduling software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Staffing agency scheduling software helps workforce management firms coordinate temporary and permanent workers across multiple client accounts. It handles shift creation, worker assignment, availability tracking, client-site coordination, and timesheet management — all in one platform.",
          },
        },
        {
          "@type": "Question",
          name: "How does StaffSchedule.io help staffing agencies fill shifts faster?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "StaffSchedule.io sends instant push notifications to qualified workers when a shift opens. Workers can accept or decline from their phones in seconds. Managers see real-time fill status and can escalate to backup workers automatically, filling most shifts in under 5 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Can I manage workers across multiple client sites?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. StaffSchedule.io is built for multi-site operations. Assign workers to different client locations, track hours separately per client, and manage all placements from a single dashboard with full visibility across your entire worker pool.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: "Staffing & Scheduling", item: `${BASE_URL}/industries/staffing-scheduling-software` },
      ],
    },
  ],
};

export default function StaffingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
