import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Dental Office Scheduling Software | StaffSchedule.io",
  description:
    "Staff scheduling software for dental offices. Coordinate dentists, hygienists, and front desk teams to maximize chair utilization and patient flow. Free 14-day trial.",
  keywords: [
    "dental office scheduling software",
    "dental staff scheduling",
    "dentist schedule management",
    "dental hygienist scheduling",
    "orthodontic staff scheduling",
    "dental clinic employee scheduling",
    "shift scheduling for dental offices",
    "dental workforce management",
    "multi-chair clinic staffing",
    "dental assistant shift planning",
    "online scheduling app for dental teams",
    "team scheduling software for dentists",
  ],
  alternates: { canonical: `${BASE_URL}/industries/dental-office-scheduling-software` },
  openGraph: {
    title: "Dental Office Scheduling Software | StaffSchedule.io",
    description:
      "Manage your dental practice staff schedules efficiently. Coordinate hygienists around dentist availability to keep chairs full and operations smooth.",
    url: `${BASE_URL}/industries/dental-office-scheduling-software`,
    images: [
      {
        url: `${BASE_URL}/staffschedule-dashboard.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Dental Office Scheduling Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Office Scheduling Software | StaffSchedule.io",
    description:
      "Keep your dental chairs full by ensuring perfect staff coordination between dentists, hygienists, and assistants.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Dental Office Edition",
      url: `${BASE_URL}/industries/dental-office-scheduling-software`,
      description:
        "Employee scheduling and workforce management software designed specifically for dental practices, orthodontic clinics, and oral surgery centers.",
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
        reviewCount: "756",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is dental office staff scheduling software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dental office staff scheduling software is a tool that practice managers use to organize the work shifts of their clinical and administrative teams. It ensures that the right ratio of dental hygienists and assistants are available to support the attending dentists, minimizing idle chair time and improving patient flow.",
          },
        },
        {
          "@type": "Question",
          name: "How does StaffSchedule.io help manage dental hygienist schedules?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "StaffSchedule.io allows you to assign specific roles and clinical zones (like Operatory 1, Hygiene 2) to your staff. You can build templates based on appointment volume and dentist availability, ensuring you always have exact coverage for cleanings without overstaffing.",
          },
        },
        {
          "@type": "Question",
          name: "Can our dental staff request time off through the app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Dental assistants, hygienists, and receptionists can submit time-off requests and manage their availability directly from the StaffSchedule.io mobile app. Practice managers receive instant notifications and can approve or deny requests, automatically updating the master schedule.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: "Dental Offices", item: `${BASE_URL}/industries/dental-office-scheduling-software` },
      ],
    },
  ],
};

export default function DentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
