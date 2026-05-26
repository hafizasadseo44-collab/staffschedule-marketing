import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Nurse Scheduling Software | StaffSchedule.io — Built for Nurse Managers & Clinical Units",
  description: "Nurse scheduling software for hospitals, units, and clinical teams. 12-hour rotation templates, float pool coordination, staffing-ratio enforcement, certification gating, and burnout prevention. Free 14-day trial.",
  keywords: [
    "nurse scheduling software",
    "nurse scheduling app",
    "clinical staff scheduling",
    "hospital nurse scheduling",
    "RN scheduling software",
    "nurse manager software",
    "float pool scheduling",
    "PRN nurse scheduling",
    "12 hour shift scheduling",
    "nurse staffing software",
    "unit-based scheduling",
    "nurse burnout prevention",
    "staffing ratio software",
    "shift differential tracking",
    "nurse self-scheduling",
  ],
  alternates: { canonical: `${BASE_URL}/industries/nurse-scheduling` },
  openGraph: {
    title: "Nurse Scheduling Software | StaffSchedule.io",
    description: "Built for nurse managers. 12-hour rotations, float pool, ratios, certifications. Stop the callout chaos. Free 14-day trial.",
    url: `${BASE_URL}/industries/nurse-scheduling`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Nurse scheduling software dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nurse Scheduling Software | StaffSchedule.io",
    description: "Built for nurse managers. 12-hour rotations. Float pool. Ratios. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Nurse Scheduling Software",
      url: `${BASE_URL}/industries/nurse-scheduling`,
      description: "Nurse scheduling software for clinical units, hospitals, and health systems. Handles 12-hour rotation patterns, float pool coordination, PRN coverage, certification gating, staffing-ratio enforcement, and shift differentials.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "3x12 and 4x10 rotation templates",
        "Float pool coordination across units",
        "PRN and on-call shift management",
        "Patient-to-nurse ratio enforcement",
        "RN/LPN/CNA license tracking",
        "Shift differential calculations",
        "Mobile self-scheduling for nurses",
        "Burnout-aware schedule warnings",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is nurse scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Nurse scheduling software is a workforce platform built for the specific demands of clinical units: 12-hour rotations, float pools, PRN coverage, certification gating, staffing-ratio enforcement, and shift differentials. StaffSchedule.io is designed for nurse managers running 24/7 units in hospitals, surgery centers, and health systems." } },
        { "@type": "Question", name: "Does it handle 12-hour rotating shifts?", acceptedAnswer: { "@type": "Answer", text: "Yes. Pre-built templates cover 3x12 (three 12-hour shifts per week), 4x10, day-night rotations, weekend-only patterns, and on-call rotations. Templates respect fatigue rules, mandatory rest periods, and union agreements. Drag the template onto the calendar and the unit fills in." } },
        { "@type": "Question", name: "How does float pool coordination work?", acceptedAnswer: { "@type": "Answer", text: "Float nurses are visible across every unit they're credentialed for. When a unit needs coverage, the system suggests available floats based on skill match, recent assignments, and overtime status. Floats accept via mobile app. Skills and unit credentials transfer automatically." } },
        { "@type": "Question", name: "Can it enforce patient-to-nurse staffing ratios?", acceptedAnswer: { "@type": "Answer", text: "Yes. Set state-mandated or facility-specific ratios per unit (ICU 1:2, Med-Surg 1:5, etc.). The system prevents publishing schedules that violate ratios and flags real-time understaffing during shifts. Compliance reports are one click away." } },
        { "@type": "Question", name: "How does it help prevent nurse burnout?", acceptedAnswer: { "@type": "Answer", text: "The system tracks consecutive shifts, weekly hour totals, and overtime trends per nurse. Burnout-risk indicators flag when someone is approaching unsafe workload. Auto-balanced schedules distribute hard shifts (weekends, holidays, nights) fairly across the team." } },
        { "@type": "Question", name: "Does it track shift differentials?", acceptedAnswer: { "@type": "Answer", text: "Yes. Night, weekend, holiday, on-call, and charge nurse differentials all calculate automatically based on shift type. Differentials flow through to payroll with the right hourly rate applied to each segment." } },
        { "@type": "Question", name: "Can nurses self-schedule via the app?", acceptedAnswer: { "@type": "Answer", text: "Yes. Open shifts post to the marketplace; qualified nurses claim them via the mobile app. Self-scheduling windows let staff bid on shifts during designated periods. Manager approval is one tap. Nurses love the control; managers love the time saved." } },
        { "@type": "Question", name: "Is it audit-ready for Joint Commission and state regulators?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every schedule change, swap approval, credential update, and overtime decision is logged with timestamps. Reports filter by date range, unit, or individual for surveys, audits, and regulatory inspections." } },
      ],
    },
  ],
};

export default function NurseSchedulingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
