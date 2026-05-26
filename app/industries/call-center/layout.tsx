import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Call Center Scheduling Software | StaffSchedule.io — For BPO & Customer Support Teams",
  description: "Call center scheduling software that hits service levels every hour. Real-time agent adherence, peak-hour coverage, mobile shift swaps, and payroll-ready timesheets. Built for inbound, outbound, BPO, and remote support teams.",
  keywords: [
    "call center scheduling software",
    "agent scheduling software",
    "BPO scheduling software",
    "customer support scheduling",
    "contact center workforce management",
    "call center shift planning",
    "remote agent scheduling",
    "real-time adherence software",
    "call center time clock",
    "agent attendance tracking",
    "call center labor cost software",
    "service level scheduling",
    "queue-based scheduling",
    "call center payroll integration",
    "support team scheduling app",
  ],
  alternates: { canonical: `${BASE_URL}/industries/call-center` },
  openGraph: {
    title: "Call Center Scheduling Software | StaffSchedule.io",
    description: "Hit service levels every hour. Real-time adherence. Mobile shift swaps. Payroll-ready timesheets. For inbound, outbound, BPO, and remote support.",
    url: `${BASE_URL}/industries/call-center`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Call center scheduling software dashboard" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Call Center Scheduling Software | StaffSchedule.io",
    description: "Service-level driven scheduling for call centers and BPOs. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Call Center Scheduling Software",
      url: `${BASE_URL}/industries/call-center`,
      description: "Workforce scheduling and management software for inbound and outbound call centers, BPOs, and customer support teams. Includes real-time adherence, queue-based coverage, mobile time clock, and payroll integration.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Service-level driven agent scheduling",
        "Real-time adherence monitoring",
        "Queue and skill-based assignment",
        "Multi-timezone shift planning",
        "Mobile shift swaps for agents",
        "Real-time overtime alerts",
        "Break and aux-time tracking",
        "Payroll integration with ADP, Gusto, QuickBooks",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is call center scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Call center scheduling software is a workforce management platform that plans, publishes, and adjusts agent shifts based on forecasted call volume, queue requirements, and skill mix. StaffSchedule.io adds real-time adherence monitoring, mobile shift swaps, and payroll-ready timesheets — purpose-built for inbound, outbound, BPO, and remote customer support teams." } },
        { "@type": "Question", name: "How does it help hit service levels?", acceptedAnswer: { "@type": "Answer", text: "Pre-built templates match staffing to call-volume forecasts hour by hour. When adherence dips, the system flags it instantly so floor leads can reassign or call in coverage before service levels drop. Average response time for a callout: under five minutes." } },
        { "@type": "Question", name: "Can remote and hybrid agents use the platform?", acceptedAnswer: { "@type": "Answer", text: "Yes. Native iOS and Android apps let agents clock in from home, request shift swaps, message coworkers, and see their next shift — anywhere. Geofencing and IP-based clock-in rules keep things compliant for fully remote, hybrid, or on-site teams." } },
        { "@type": "Question", name: "Does it support multi-timezone scheduling?", acceptedAnswer: { "@type": "Answer", text: "Yes. Build schedules in any timezone; agents see their shifts in their local time. Manage queues that span timezones with one unified view. Built for follow-the-sun support models and global BPOs." } },
        { "@type": "Question", name: "Does it integrate with workforce-planning tools?", acceptedAnswer: { "@type": "Answer", text: "Yes. Approved timesheets sync directly to ADP, Gusto, QuickBooks, Rippling, and major payroll providers. CSV exports work with NICE, Genesys, Five9, and other WFM/CCaaS platforms for adherence and forecast data." } },
        { "@type": "Question", name: "How fast can a call center get set up?", acceptedAnswer: { "@type": "Answer", text: "Most call centers publish their first schedule on day one. The setup wizard applies the call center industry preset (agent positions, queue tags, peak templates, break rules), imports your roster from CSV or your WFM, and walks you through publishing. Agents get the mobile app the same day — average team adoption is 2 days." } },
        { "@type": "Question", name: "Can agents handle their own time-off and shift swaps?", acceptedAnswer: { "@type": "Answer", text: "Yes. Agents request PTO, swap shifts, and update availability from the mobile app. Manager approval is one tap. You can also auto-approve same-skill swaps to eliminate the middle step entirely." } },
      ],
    },
  ],
};

export default function CallCenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
