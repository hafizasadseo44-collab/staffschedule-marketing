import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Caregiver Scheduling Software | StaffSchedule.io — For Assisted Living & Senior Care",
  description: "Caregiver scheduling software for assisted living, nursing homes, memory care, and senior living communities. 24/7 coverage, certification tracking, shift handoffs, and resident-aware care assignments. Free 14-day trial.",
  keywords: [
    "caregiver scheduling software",
    "assisted living scheduling software",
    "senior care scheduling",
    "nursing home scheduling software",
    "memory care scheduling",
    "CNA scheduling software",
    "caregiver time clock",
    "senior living workforce management",
    "resident care scheduling",
    "long term care scheduling",
    "caregiver compliance software",
    "assisted living payroll",
    "caregiver shift handoff",
    "senior living staff app",
    "caregiver overtime tracking",
  ],
  alternates: { canonical: `${BASE_URL}/industries/caregivers-assisted-living` },
  openGraph: {
    title: "Caregiver Scheduling Software | StaffSchedule.io",
    description: "Built for assisted living, memory care, and senior care. 24/7 coverage. Certified handoffs. Resident-aware scheduling.",
    url: `${BASE_URL}/industries/caregivers-assisted-living`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Caregiver scheduling software for assisted living" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caregiver Scheduling Software | StaffSchedule.io",
    description: "Built for assisted living, senior care, and nursing homes. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Caregiver Scheduling Software",
      url: `${BASE_URL}/industries/caregivers-assisted-living`,
      description: "Caregiver scheduling and workforce management software for assisted living communities, nursing homes, memory care, and senior living operators. Coordinates 24/7 caregiver coverage with certifications, shift handoffs, and resident-aware assignments.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "24/7 caregiver coverage scheduling",
        "Certification tracking (CNA, HHA, Med Tech)",
        "Resident-to-caregiver assignment",
        "Shift handoff notes and acknowledgements",
        "Document storage with license expiration alerts",
        "Multi-facility coordination",
        "Mobile clock-in with location verification",
        "Senior care payroll integration",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is caregiver scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Caregiver scheduling software is a workforce platform built for assisted living, senior care, nursing homes, and memory care communities. It coordinates around-the-clock caregiver coverage, tracks certifications and renewals, manages shift handoffs, and keeps resident-to-caregiver assignments organized — all while staying compliant with state senior care regulations." } },
        { "@type": "Question", name: "Does it work for assisted living, nursing homes, and memory care?", acceptedAnswer: { "@type": "Answer", text: "Yes. All long-term care and senior living settings are supported: assisted living, skilled nursing facilities, memory care, independent living, CCRCs, and adult day programs. Templates adapt to your model — from a 20-bed memory care home to a 300-unit CCRC campus." } },
        { "@type": "Question", name: "How does the system track caregiver certifications?", acceptedAnswer: { "@type": "Answer", text: "Every caregiver's credentials (CNA, HHA, Med Tech, dementia training, CPR, first aid) are stored with expiration dates. The system sends renewal alerts 60, 30, and 7 days out — and blocks scheduling anyone with expired credentials. State compliance becomes automatic." } },
        { "@type": "Question", name: "How are shift handoffs managed?", acceptedAnswer: { "@type": "Answer", text: "Outgoing caregivers leave structured handoff notes (resident updates, medication observations, mood changes, family communication) that incoming staff acknowledge before starting their shift. Audit-ready records prove continuity of care." } },
        { "@type": "Question", name: "Can I manage multiple senior living facilities?", acceptedAnswer: { "@type": "Answer", text: "Yes. The multi-facility dashboard shows every community at once with live coverage, labor cost percentages, and compliance alerts. Float caregivers move between sister facilities with one tap. Regional directors oversee 5 to 200 communities from one screen." } },
        { "@type": "Question", name: "Does it control caregiver overtime?", acceptedAnswer: { "@type": "Answer", text: "Yes. Real-time alerts fire the moment a caregiver approaches overtime — so you can swap or call in float coverage before the premium kicks in. Most senior care operators cut overtime spend by 20%+ within the first 90 days." } },
        { "@type": "Question", name: "How easy is it for caregivers to use?", acceptedAnswer: { "@type": "Answer", text: "Caregivers learn the mobile app in under 5 minutes. They see their schedule, swap shifts, message coworkers, and clock in from their phone. Works in English and Spanish. Rated 4.8/5 by frontline care staff." } },
        { "@type": "Question", name: "Does it integrate with senior care payroll?", acceptedAnswer: { "@type": "Answer", text: "Yes. Approved timesheets sync with ADP, Gusto, QuickBooks, Rippling, and major payroll providers. Shift differentials (night, weekend, holiday) and overtime calculate automatically. Payroll runs in under an hour." } },
      ],
    },
  ],
};

export default function CaregiversLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
