import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Professional Services Scheduling Software | StaffSchedule.io",
  description:
    "Scheduling software built for consulting firms, agencies, and professional service teams. Track billable hours, manage client projects, and coordinate your workforce — all in one place. Free 14-day trial.",
  keywords: [
    "professional services scheduling software",
    "consulting firm scheduling",
    "employee scheduling software for agencies",
    "billable hour tracking app",
    "professional services workforce management",
    "staff scheduling for consultants",
    "project-based employee scheduling",
    "professional services time tracking",
    "scheduling software for law firms",
    "accounting firm staff scheduling",
    "shift scheduling for service companies",
    "workforce management for professional services",
    "team scheduling software",
    "online employee scheduling",
    "staff rota software",
  ],
  alternates: { canonical: `${BASE_URL}/industries/professional-services` },
  openGraph: {
    title: "Professional Services Scheduling Software | StaffSchedule.io",
    description:
      "Manage your professional service teams across client sites with ease. Track billable hours, coordinate staff, and run your operation without the spreadsheet chaos.",
    url: `${BASE_URL}/industries/professional-services`,
    images: [
      {
        url: `${BASE_URL}/staffschedule-dashboard.png`,
        width: 1200,
        height: 630,
        alt: "StaffSchedule.io — Professional Services Scheduling Software",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Services Scheduling Software | StaffSchedule.io",
    description:
      "Built for consultants, agencies, legal, and accounting firms. Scheduling that respects billable time.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Professional Services",
      url: `${BASE_URL}/industries/professional-services`,
      description:
        "Employee scheduling and workforce management software designed for professional services firms — consultants, agencies, legal teams, accounting firms, and more.",
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
          name: "What is professional services scheduling software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Professional services scheduling software helps consulting firms, agencies, legal offices, and other service-based businesses manage their staff schedules, track billable hours, assign employees to client projects, and coordinate teams across multiple locations — all from one platform.",
          },
        },
        {
          "@type": "Question",
          name: "How does StaffSchedule.io help professional service firms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "StaffSchedule.io gives professional service firms a centralized scheduling platform to assign staff to client engagements, track hours accurately, manage availability, handle leave requests, and communicate in real time — eliminating spreadsheets and reducing admin overhead by up to 80%.",
          },
        },
        {
          "@type": "Question",
          name: "Can I track billable hours with StaffSchedule.io?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. StaffSchedule.io includes built-in time tracking that syncs with your schedules. Staff clock in and out from their phones, hours are verified automatically, and timesheet data is payroll-ready — giving you accurate billable hour records without manual entry.",
          },
        },
        {
          "@type": "Question",
          name: "Does StaffSchedule.io work for multi-location professional service firms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. You can manage staff across multiple offices, client sites, and remote locations from one dashboard. Assign people to projects regardless of geography, track hours across all sites, and get a unified view of your entire workforce.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: "Professional Services", item: `${BASE_URL}/industries/professional-services` },
      ],
    },
  ],
};

export default function ProfessionalServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
