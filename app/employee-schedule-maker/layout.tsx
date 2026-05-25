import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Employee Schedule Maker | StaffSchedule.io — Free Online Rota Builder",
  description: "Create employee schedules online in minutes. StaffSchedule.io is the easiest free employee schedule maker — drag-and-drop shifts, manage availability, and publish rotas instantly.",
  keywords: [
    "employee schedule maker",
    "free schedule maker",
    "online rota builder",
    "employee roster maker",
    "work schedule creator",
    "shift schedule maker",
    "staff rota software",
    "online employee scheduling",
    "team schedule builder",
  ],
  alternates: { canonical: `${BASE_URL}/employee-schedule-maker` },
  openGraph: {
    title: "Employee Schedule Maker | StaffSchedule.io",
    description: "The easiest way to create and manage employee schedules online. Free 14-day trial.",
    url: `${BASE_URL}/employee-schedule-maker`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Employee Schedule Maker — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Employee Schedule Maker | StaffSchedule.io",
    description: "Create employee schedules online in minutes. No credit card required.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Employee Schedule Maker",
      url: `${BASE_URL}/employee-schedule-maker`,
      description: "Free online employee schedule maker. Create work schedules, manage shifts, track availability, and keep teams updated from one dashboard.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can ChatGPT create a schedule?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, ChatGPT can help create employee schedules, suggest shift plans, and organize work schedules for teams. However, businesses usually need a dedicated employee schedule maker like StaffSchedule.io to manage staff scheduling, employee availability, leave requests, shift swaps, and real-time team updates in one organized dashboard." },
        },
        {
          "@type": "Question",
          name: "What is the 7 3 7 4 shift pattern?",
          acceptedAnswer: { "@type": "Answer", text: "The 7 3 7 4 shift pattern is a rotating work schedule where employees work 7 days, get 3 days off, then work another 7 days followed by 4 days off. Businesses often use this employee shift scheduling pattern in workplaces that need 24/7 coverage such as healthcare, security, and manufacturing." },
        },
        {
          "@type": "Question",
          name: "Can AI make my work schedule?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, AI can help businesses create employee work schedules faster by organizing shifts, tracking employee availability, and reducing scheduling conflicts. Modern employee scheduling software like StaffSchedule.io makes scheduling easier by helping managers manage shifts, leave requests, notifications, and team communication from one place." },
        },
        {
          "@type": "Question",
          name: "What is the best employee scheduling software?",
          acceptedAnswer: { "@type": "Answer", text: "The best employee scheduling software is one that makes staff scheduling simple, keeps teams organized, and saves managers time. StaffSchedule.io is built for growing businesses that want an easy employee schedule maker with shift management, employee availability tracking, team communication, mobile access, and multi-location scheduling features." },
        },
        {
          "@type": "Question",
          name: "What is a 5 2 5 3 work schedule?",
          acceptedAnswer: { "@type": "Answer", text: "A 5 2 5 3 work schedule is a rotating shift pattern where employees work 5 days, get 2 days off, work another 5 days, then receive 3 days off. This type of employee shift planning helps businesses balance workloads while giving employees regular rest days." },
        },
        {
          "@type": "Question",
          name: "Which AI is good for scheduling?",
          acceptedAnswer: { "@type": "Answer", text: "Different AI scheduling tools help businesses automate scheduling tasks, but the best option depends on your business needs. Many growing teams use employee scheduling online software like StaffSchedule.io to simplify staff scheduling, manage employee shifts, track availability, and keep teams updated in real time." },
        },
      ],
    },
  ],
};

export default function EmployeeScheduleMakerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
