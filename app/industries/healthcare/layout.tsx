import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Healthcare Staff Scheduling Software | StaffSchedule.io — For Hospitals, Clinics & Medical Centers",
  description: "Healthcare staff scheduling software for hospitals, clinics, and medical groups. Manage rotating shifts, certifications, 24/7 coverage, and HIPAA-aware messaging across every department. Free 14-day trial.",
  keywords: [
    "healthcare staff scheduling software",
    "medical staff scheduling software",
    "hospital scheduling software",
    "clinic scheduling software",
    "healthcare workforce management",
    "medical group scheduling",
    "physician scheduling",
    "healthcare time clock",
    "HIPAA staff messaging",
    "healthcare payroll integration",
    "multi-facility scheduling",
    "healthcare credential tracking",
    "24/7 medical staffing",
    "rotating shift scheduler",
    "medical compliance scheduling",
  ],
  alternates: { canonical: `${BASE_URL}/industries/healthcare` },
  openGraph: {
    title: "Healthcare Staff Scheduling Software | StaffSchedule.io",
    description: "Built for hospitals, clinics, dental, urgent care, and medical groups. Rotating shifts, credentials, 24/7 coverage, HIPAA-aware messaging.",
    url: `${BASE_URL}/industries/healthcare`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Healthcare staff scheduling software dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Staff Scheduling Software | StaffSchedule.io",
    description: "Built for hospitals, clinics, and medical groups. 24/7 coverage. Credentials. Compliance. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Healthcare Staff Scheduling Software",
      url: `${BASE_URL}/industries/healthcare`,
      description: "Healthcare workforce scheduling for hospitals, clinics, medical groups, dental practices, urgent care, and outpatient facilities. Coordinates rotating shifts, credentials, multi-site coverage, and HIPAA-aware team messaging.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Rotating shift templates (3x12, 4x10, etc.)",
        "Credential and license tracking",
        "Multi-department and multi-site scheduling",
        "HIPAA-aware team messaging",
        "24/7 coverage views",
        "Staffing ratio enforcement",
        "Real-time overtime alerts",
        "Healthcare payroll integration",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is healthcare staff scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Healthcare staff scheduling software is a workforce management platform that handles the unique demands of medical environments: rotating shifts, certification gating, 24/7 coverage, multi-department coordination, and HIPAA-aware communication. StaffSchedule.io is purpose-built for hospitals, clinics, dental groups, urgent care, and outpatient facilities." } },
        { "@type": "Question", name: "Does it handle rotating shifts and 12-hour patterns?", acceptedAnswer: { "@type": "Answer", text: "Yes. Pre-built templates cover 3x12, 4x10, day-night rotations, weekend-only patterns, on-call rotations, and PRN coverage. Schedules respect rest periods, fatigue rules, and union agreements. Build once, drag into the calendar, and the entire department fills in." } },
        { "@type": "Question", name: "Does it track licenses and certifications?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every clinician's credentials (RN, LPN, CNA, BLS, ACLS, state license) are tracked with expiration alerts 60, 30, and 7 days out. The system blocks scheduling anyone with expired credentials — making compliance automatic." } },
        { "@type": "Question", name: "Is the messaging HIPAA-friendly?", acceptedAnswer: { "@type": "Answer", text: "Yes. All team communication stays inside the StaffSchedule.io platform with end-to-end encryption. No personal phone numbers shared. Audit logs track every message. Suitable as part of a HIPAA-compliant workflow when configured per your compliance officer's requirements." } },
        { "@type": "Question", name: "Can it manage staff across multiple facilities?", acceptedAnswer: { "@type": "Answer", text: "Yes. Multi-site scheduling shows every facility from one dashboard. Float pool nurses move between sites with one tap. Multi-facility reports roll up to organization-level for system administrators." } },
        { "@type": "Question", name: "Does it integrate with healthcare payroll?", acceptedAnswer: { "@type": "Answer", text: "Yes. Approved timesheets sync to ADP, Gusto, QuickBooks, Rippling, and major payroll providers. Shift differentials (night, weekend, on-call), overtime, and PTO all calculate correctly. Payroll runs in under an hour." } },
        { "@type": "Question", name: "How fast can a clinic or hospital get started?", acceptedAnswer: { "@type": "Answer", text: "Most clinics go live in 1–2 days. Multi-department hospitals usually take 1–2 weeks for full rollout including credential import and template configuration. Dedicated healthcare onboarding is included on every plan." } },
      ],
    },
  ],
};

export default function HealthcareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
