import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Team Scheduling Software | StaffSchedule.io — Schedule Your Whole Team in Minutes",
  description: "The best team scheduling software for modern businesses. Build shift schedules in minutes, manage availability, reduce no-shows, and keep your whole team in sync — all from one platform.",
  keywords: [
    "team scheduling software",
    "employee scheduling tool",
    "shift scheduling app",
    "online rota planner",
    "team schedule builder",
    "workforce scheduling platform",
    "free team scheduling software",
  ],
  alternates: { canonical: `${BASE_URL}/team-scheduling-software` },
  openGraph: {
    title: "Team Scheduling Software | StaffSchedule.io",
    description: "Build perfect shift schedules in minutes. Manage your whole team from one place.",
    url: `${BASE_URL}/team-scheduling-software`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Team Scheduling Software — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Scheduling Software | StaffSchedule.io",
    description: "Build perfect shift schedules in minutes. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

export default function TeamSchedulingSoftwareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
