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

export default function EmployeeScheduleMakerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
