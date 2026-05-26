import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Security Guard Scheduling Software | StaffSchedule.io",
  description:
    "Security guard scheduling software for post coverage, 24/7 shift management, mobile patrol coordination, and emergency staffing. Manage your entire security operation from one platform. Free 14-day trial.",
  keywords: [
    "security guard scheduling software",
    "security guard shift management",
    "security company scheduling software",
    "guard scheduling app",
    "24/7 security scheduling",
    "post coverage software",
    "security patrol scheduling",
    "mobile security guard scheduling",
    "security workforce management",
    "guard shift planning software",
    "security officer scheduling",
    "event security scheduling",
    "loss prevention scheduling software",
    "security team scheduling app",
    "employee scheduling for security companies",
  ],
  alternates: { canonical: `${BASE_URL}/industries/security-guard-scheduling-software` },
  openGraph: {
    title: "Security Guard Scheduling Software | StaffSchedule.io",
    description:
      "Manage 24/7 guard shifts, post coverage, mobile patrols, and emergency replacements from one command center. Built for security companies that cannot afford gaps in coverage.",
    url: `${BASE_URL}/industries/security-guard-scheduling-software`,
    images: [
      {
        url: `${BASE_URL}/staffschedule-dashboard.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Security Guard Scheduling Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Guard Scheduling Software | StaffSchedule.io",
    description:
      "24/7 post coverage. Instant replacements. GPS-verified clock-ins. Built for security companies.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Security Guard Scheduling",
      url: `${BASE_URL}/industries/security-guard-scheduling-software`,
      description:
        "Enterprise-grade scheduling software for security guard companies managing 24/7 post coverage, mobile patrols, site assignments, and emergency staffing.",
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
          name: "What is security guard scheduling software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Security guard scheduling software is a workforce management platform built specifically for security companies. It handles 24/7 shift planning, post assignments, guard-to-site matching, GPS clock-in verification, mobile patrol coordination, and instant emergency replacement — ensuring no post is ever left uncovered.",
          },
        },
        {
          "@type": "Question",
          name: "How does StaffSchedule.io handle last-minute guard replacements?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When a guard calls out, StaffSchedule.io automatically broadcasts the open shift to all qualified, available guards via push notification. Guards respond in one tap. Supervisors approve instantly from their phone. Most emergency replacements are filled in under 10 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Does StaffSchedule.io verify that guards actually show up at their posts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Guards must clock in within a GPS-verified zone around their assigned post. If a guard is late or clocks in from the wrong location, supervisors receive an instant alert. Every clock-in creates a timestamped, location-verified audit trail.",
          },
        },
        {
          "@type": "Question",
          name: "Can I manage security guards across multiple client sites?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "StaffSchedule.io is built for multi-site security operations. Manage dozens of client locations, assign guards based on certifications and proximity, track hours per site for billing accuracy, and view all active posts from one dashboard.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: "Security Guard Scheduling", item: `${BASE_URL}/industries/security-guard-scheduling-software` },
      ],
    },
  ],
};

export default function SecurityGuardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
