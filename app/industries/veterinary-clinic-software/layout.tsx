import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Veterinary Clinic Staff Scheduling Software | StaffSchedule.io",
  description:
    "Employee scheduling software built for veterinary clinics and animal hospitals. Manage vet schedules, tech rotations, and emergency coverage effortlessly. Free 14-day trial.",
  keywords: [
    "veterinary scheduling software",
    "veterinary clinic staff scheduling software",
    "employee scheduling software for vets",
    "vet tech shift scheduling",
    "animal hospital workforce management",
    "veterinarian schedule management",
    "pet care team scheduling",
    "veterinary staff rota software",
    "clinic staff coordination",
    "on-call emergency vet scheduling",
    "shift scheduling for veterinary clinics",
    "workforce scheduling platform for vets",
    "veterinary practice management integration",
    "employee availability tracking for clinics",
  ],
  alternates: { canonical: `${BASE_URL}/industries/veterinary-clinic-software` },
  openGraph: {
    title: "Veterinary Clinic Staff Scheduling Software | StaffSchedule.io",
    description:
      "Manage veterinarians, vet techs, and front desk staff across routine appointments and emergency rotations. The scheduling platform built for modern animal care teams.",
    url: `${BASE_URL}/industries/veterinary-clinic-software`,
    images: [
      {
        url: `${BASE_URL}/staffschedule-dashboard.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Veterinary Clinic Scheduling Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veterinary Clinic Scheduling Software | StaffSchedule.io",
    description:
      "Coordinate your veterinary staff, from emergency on-call shifts to daily clinic operations.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Veterinary Clinic Edition",
      url: `${BASE_URL}/industries/veterinary-clinic-software`,
      description:
        "Employee scheduling and workforce management software designed specifically for veterinary clinics, animal hospitals, and emergency pet care centers.",
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
        reviewCount: "842",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is veterinary clinic staff scheduling software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Veterinary clinic staff scheduling software helps practice managers coordinate shifts for veterinarians, vet techs, assistants, and receptionists. It ensures the clinic has the right mix of skills on the floor at all times, manages on-call emergency rotations, and handles time-off requests to prevent understaffing.",
          },
        },
        {
          "@type": "Question",
          name: "How does StaffSchedule.io handle emergency on-call vet scheduling?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "StaffSchedule.io allows you to build dedicated on-call rotation schedules separate from daily clinic shifts. If a doctor needs coverage, they can broadcast a shift swap request to qualified peers instantly via the mobile app, ensuring emergency slots are never left empty.",
          },
        },
        {
          "@type": "Question",
          name: "Can I schedule different roles like Vet Techs and Receptionists together?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our platform allows you to create specific roles and assign them to different zones or tasks within the clinic (e.g., Surgery, Triage, Front Desk). You can see your entire daily roster in one view, ensuring you aren't short-staffed in any critical area.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: "Veterinary Clinics", item: `${BASE_URL}/industries/veterinary-clinic-software` },
      ],
    },
  ],
};

export default function VeterinaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
