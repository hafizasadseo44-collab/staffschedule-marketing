import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Pharmacy Scheduling Software | StaffSchedule.io",
  description:
    "Workforce management software for pharmacies. Schedule pharmacists, track compliance, manage float staff across multiple stores, and ensure reliable coverage. Free 14-day trial.",
  keywords: [
    "pharmacy scheduling software",
    "pharmacist shift scheduling",
    "pharmacy workforce management",
    "retail pharmacy staffing",
    "pharmacy tech scheduling",
    "24-hour pharmacy rotas",
    "float pharmacist management",
    "compliance tracking for pharmacies",
    "employee scheduling for pharmacies",
    "pharmacy staff scheduling app",
    "shift scheduling for pharmacists",
    "online scheduling software for pharmacies",
    "pharmacy scheduling system",
  ],
  alternates: { canonical: `${BASE_URL}/industries/pharmacy-scheduling-software` },
  openGraph: {
    title: "Pharmacy Scheduling Software | StaffSchedule.io",
    description:
      "Manage pharmacist rotations, pharmacy techs, and float staff across multiple locations. Prevent fatigue and ensure strict compliance with modern scheduling.",
    url: `${BASE_URL}/industries/pharmacy-scheduling-software`,
    images: [
      {
        url: `${BASE_URL}/staffschedule-dashboard.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Pharmacy Scheduling Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharmacy Scheduling Software | StaffSchedule.io",
    description:
      "Schedule your pharmacy staff efficiently. Manage float pools, track compliance, and prevent burnout.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Pharmacy Edition",
      url: `${BASE_URL}/industries/pharmacy-scheduling-software`,
      description:
        "Employee scheduling and workforce management software designed for retail pharmacies, clinical pharmacies, and pharmacy chains.",
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
        reviewCount: "912",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is pharmacy scheduling software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pharmacy scheduling software is a specialized tool used to manage the shifts of pharmacists, pharmacy technicians, and retail staff. It helps ensure legal compliance for pharmacist-on-duty requirements, manages fatigue by tracking consecutive shifts, and coordinates float staff across multiple store locations.",
          },
        },
        {
          "@type": "Question",
          name: "How does StaffSchedule.io help with float pharmacist management?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "StaffSchedule.io includes a multi-location dashboard that allows regional managers to view staffing gaps across all stores and dispatch float pharmacists exactly where they are needed. Open shifts can be broadcasted to a pre-approved pool of float staff to claim instantly.",
          },
        },
        {
          "@type": "Question",
          name: "Can I track certifications and licenses for my pharmacy staff?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our platform includes compliance tracking. You can log state licenses, immunization certifications, and CPR training. The system alerts you before a credential expires and can automatically block a pharmacist from being scheduled if their license is not up to date.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: "Pharmacy", item: `${BASE_URL}/industries/pharmacy-scheduling-software` },
      ],
    },
  ],
};

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
