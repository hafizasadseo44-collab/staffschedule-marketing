import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "All Features | StaffSchedule.io — The Complete Workforce Management Platform",
  description: "Explore every StaffSchedule.io feature in one place: AI scheduling, GPS time clock, team messaging, leave management, shift swaps, analytics, multi-location control, payroll integration, and more — all in one unified platform.",
  keywords: [
    "workforce management features",
    "scheduling software features",
    "employee management platform",
    "all-in-one staff scheduling",
    "team management features",
    "shift scheduling features",
    "time tracking features",
    "leave management features",
    "team communication features",
    "workforce analytics",
    "multi-location workforce",
    "payroll integration features",
    "AI scheduling features",
    "open shifts management",
    "employee availability tracking",
  ],
  alternates: { canonical: `${BASE_URL}/features` },
  openGraph: {
    title: "All Features | StaffSchedule.io — Complete Workforce Management Platform",
    description: "One platform for scheduling, time tracking, communication, leave, and analytics. Built for teams of every size.",
    url: `${BASE_URL}/features`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "StaffSchedule.io — All Features" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Features | StaffSchedule.io",
    description: "The all-in-one operating system for the modern workforce.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io",
      url: `${BASE_URL}/features`,
      description: "All-in-one workforce management platform with scheduling, time tracking, team messaging, leave management, analytics, and payroll integration.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Employee Scheduling",
        "AI-Powered Scheduling",
        "GPS Time Clock",
        "Team Messaging",
        "Leave Management",
        "Shift Swaps",
        "Open Shifts",
        "Employee Availability",
        "Multi-Location Management",
        "Workforce Analytics",
        "Payroll Integration",
        "Compliance Tracking",
        "Real-Time Notifications",
        "Mobile App",
        "Custom Reports",
        "Team Announcements",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "ItemList",
      name: "StaffSchedule.io Features",
      description: "Complete list of features available in StaffSchedule.io workforce management platform",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Employee Scheduling", url: `${BASE_URL}/employee-schedule-maker` },
        { "@type": "ListItem", position: 2, name: "AI Scheduling", url: `${BASE_URL}/features/ai` },
        { "@type": "ListItem", position: 3, name: "Time Clock Software", url: `${BASE_URL}/time-clock-software` },
        { "@type": "ListItem", position: 4, name: "Attendance Tracking", url: `${BASE_URL}/features/attendance` },
        { "@type": "ListItem", position: 5, name: "Team Messaging", url: `${BASE_URL}/team-messaging` },
        { "@type": "ListItem", position: 6, name: "Leave Management", url: `${BASE_URL}/features/leave-management` },
        { "@type": "ListItem", position: 7, name: "Shift Swaps", url: `${BASE_URL}/features/shift-swaps` },
        { "@type": "ListItem", position: 8, name: "Open Shifts", url: `${BASE_URL}/features/open-shifts` },
        { "@type": "ListItem", position: 9, name: "Employee Availability", url: `${BASE_URL}/features/availability` },
        { "@type": "ListItem", position: 10, name: "Multi-Location Management", url: `${BASE_URL}/features/multi-location` },
        { "@type": "ListItem", position: 11, name: "Workforce Analytics", url: `${BASE_URL}/features/analytics` },
        { "@type": "ListItem", position: 12, name: "Reporting", url: `${BASE_URL}/features/reporting` },
        { "@type": "ListItem", position: 13, name: "Payroll Integration", url: `${BASE_URL}/features/payroll` },
        { "@type": "ListItem", position: 14, name: "Compliance", url: `${BASE_URL}/features/compliance` },
        { "@type": "ListItem", position: 15, name: "Announcements", url: `${BASE_URL}/features/announcements` },
        { "@type": "ListItem", position: 16, name: "Team Communication", url: `${BASE_URL}/features/communication` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What features does StaffSchedule.io include?",
          acceptedAnswer: { "@type": "Answer", text: "StaffSchedule.io includes employee scheduling, AI-powered shift planning, GPS time clock, team messaging, leave management, shift swaps, open shifts, employee availability tracking, multi-location management, workforce analytics, payroll integration, compliance tracking, and a full-featured mobile app — all included in a single platform." },
        },
        {
          "@type": "Question",
          name: "How long does it take to learn StaffSchedule.io?",
          acceptedAnswer: { "@type": "Answer", text: "Most managers are fully operational within 30 minutes. The Command Center interface is intuitive — if you can use a calendar, you can use StaffSchedule.io. Your team learns the mobile app in under 5 minutes." },
        },
        {
          "@type": "Question",
          name: "Do you have mobile apps for staff?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Professional native mobile apps for both iOS and Android. Staff can check schedules, swap shifts, request leave, message coworkers, and clock in with GPS verification — all from one app." },
        },
        {
          "@type": "Question",
          name: "Can I try all features during my trial?",
          acceptedAnswer: { "@type": "Answer", text: "Absolutely. Your 14-day free trial includes every single feature including enterprise analytics, multi-location hubs, and payroll integrations — no credit card required." },
        },
        {
          "@type": "Question",
          name: "Is my workforce data secure?",
          acceptedAnswer: { "@type": "Answer", text: "Enterprise-grade security is built into the core. We use AES-256 encryption, OIDC/SAML authentication, role-based access controls, and full audit logging. Your workforce data is private, protected, and compliance-ready." },
        },
        {
          "@type": "Question",
          name: "Does StaffSchedule.io integrate with payroll providers?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. StaffSchedule.io integrates with major payroll providers, allowing approved timesheets to sync directly without manual data entry. Eliminates payroll errors and saves hours every pay period." },
        },
      ],
    },
  ],
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
