import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Education Staff Scheduling Software | StaffSchedule.io",
  description:
    "School staff scheduling software for K-12 and higher education. Manage substitute teachers, paraprofessionals, administrative staff, and campus security. Free 14-day trial.",
  keywords: [
    "education staff scheduling software",
    "school staff scheduling",
    "substitute teacher management",
    "campus workforce coordination",
    "university staff scheduling",
    "paraprofessional shifts",
    "school district scheduling software",
    "higher education workforce management",
    "teacher schedule management",
    "employee scheduling for schools",
    "campus security scheduling",
    "student worker scheduling",
    "education team communication app",
  ],
  alternates: { canonical: `${BASE_URL}/industries/education` },
  openGraph: {
    title: "Education Staff Scheduling Software | StaffSchedule.io",
    description:
      "Coordinate your entire campus workforce. From dispatching substitute teachers to managing after-school staff, keep your school running smoothly.",
    url: `${BASE_URL}/industries/education`,
    images: [
      {
        url: `${BASE_URL}/staffschedule-dashboard.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Education Staff Scheduling Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Staff Scheduling Software | StaffSchedule.io",
    description:
      "Manage substitute teachers, admin staff, and campus security across your entire school district.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Education Edition",
      url: `${BASE_URL}/industries/education`,
      description:
        "Workforce scheduling software for K-12 schools, universities, and educational districts to manage administrative staff, substitutes, and campus services.",
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
        reviewCount: "689",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is education staff scheduling software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Education staff scheduling software is used by schools, universities, and districts to manage the non-instructional and support workforce. It helps coordinate shifts for administrative staff, campus security, maintenance teams, paraprofessionals, and student workers, while also managing rapid deployment of substitute teachers.",
          },
        },
        {
          "@type": "Question",
          name: "How does StaffSchedule.io help with finding substitute teachers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When a teacher calls out sick, administrators can use StaffSchedule.io to instantly broadcast the open assignment to a pre-approved pool of substitute teachers. The first qualified sub to accept the notification on their mobile app secures the job, turning a morning scramble into a seamless process.",
          },
        },
        {
          "@type": "Question",
          name: "Can I manage staff across an entire school district?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. StaffSchedule.io is built for multi-location management. District administrators can view staffing levels across all campus buildings, dispatch floating staff or security where needed, and generate district-wide labor reports from a single dashboard.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: "Education", item: `${BASE_URL}/industries/education` },
      ],
    },
  ],
};

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
