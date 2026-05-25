import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Time Clock Software | StaffSchedule.io — GPS Employee Time Tracking",
  description: "StaffSchedule.io time clock software tracks employee hours with GPS verification, prevents buddy punching, auto-generates digital timesheets, and syncs payroll instantly. Free 14-day trial.",
  keywords: [
    "time clock software",
    "employee time tracking",
    "GPS time clock",
    "digital time clock",
    "online time clock",
    "mobile time clock app",
    "employee attendance tracking",
    "timesheet software",
    "buddy punch prevention",
    "geofencing time clock",
    "time and attendance software",
    "workforce time tracking",
  ],
  alternates: { canonical: `${BASE_URL}/time-clock-software` },
  openGraph: {
    title: "Time Clock Software | StaffSchedule.io",
    description: "GPS-verified clock-ins, automatic timesheets, and one-click payroll sync. The time clock software modern teams actually love.",
    url: `${BASE_URL}/time-clock-software`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "StaffSchedule.io Time Clock Software" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Time Clock Software | StaffSchedule.io",
    description: "GPS time tracking, auto-timesheets, and payroll sync. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Time Clock Software",
      url: `${BASE_URL}/time-clock-software`,
      description: "Employee time clock software with GPS tracking, geofencing, photo verification, automatic timesheet generation, and direct payroll integration.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "GPS employee clock-in",
        "Geofencing enforcement",
        "Photo verification",
        "Automatic timesheet generation",
        "Payroll integration",
        "Real-time overtime alerts",
        "Manager approval workflow",
        "Break time tracking",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is time clock software?",
          acceptedAnswer: { "@type": "Answer", text: "Time clock software is a digital tool that replaces paper time cards and spreadsheets. Employees use their phone, tablet, or computer to clock in and out. The software automatically records hours worked, tracks breaks, flags overtime, and generates accurate timesheets for payroll — all without manual data entry." },
        },
        {
          "@type": "Question",
          name: "How does GPS time clock software work?",
          acceptedAnswer: { "@type": "Answer", text: "GPS time clock software captures the employee's location at the moment they clock in or out. It can enforce geofencing rules that prevent clocking in from outside a defined radius around the workplace. This eliminates off-site clock-ins, remote buddy punching, and inaccurate location records." },
        },
        {
          "@type": "Question",
          name: "What is buddy punching and how do you prevent it?",
          acceptedAnswer: { "@type": "Answer", text: "Buddy punching is when one employee clocks in on behalf of another who hasn't arrived yet. Time clock software prevents buddy punching through photo verification (employees must take a selfie at clock-in), GPS location checks, and geofencing rules. These measures ensure only the right person can record their own time." },
        },
        {
          "@type": "Question",
          name: "Can employees clock in from their phones?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. StaffSchedule.io lets employees clock in from any device — iPhone, Android phone, tablet, or desktop browser. The mobile time clock app records GPS location, captures a photo if required, and logs the exact time automatically. No special hardware is needed." },
        },
        {
          "@type": "Question",
          name: "Does time clock software integrate with payroll?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. StaffSchedule.io syncs approved timesheets directly with popular payroll providers, eliminating manual data re-entry, payroll calculation errors, and hours of administrative work. Once managers approve timesheets, the data flows straight into your payroll system." },
        },
        {
          "@type": "Question",
          name: "How accurate is employee time tracking software?",
          acceptedAnswer: { "@type": "Answer", text: "Digital time clock software is significantly more accurate than paper timesheets or spreadsheets. Features like GPS verification, photo clock-in, geofencing, and automatic timestamp logging remove human error entirely. StaffSchedule.io also flags rounding errors, overtime risks, and shift discrepancies in real time." },
        },
      ],
    },
  ],
};

export default function TimeClockLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
