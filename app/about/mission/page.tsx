import type { Metadata } from "next";
import MissionPageClient from "@/components/about/MissionPageClient";

export const metadata: Metadata = {
  title: "Mission & Values | StaffSchedule.io",
  description:
    "Discover the mission, vision, and core values behind StaffSchedule.io — the AI-powered workforce management platform trusted by 10,000+ teams worldwide.",
  openGraph: {
    title: "Mission & Values — StaffSchedule.io",
    description:
      "We believe work should work for everyone. Learn about our mission to replace scheduling chaos with AI-powered clarity.",
    url: "https://staffschedule.io/about/mission",
  },
  alternates: {
    canonical: "https://staffschedule.io/about/mission",
  },
};

export default function MissionPage() {
  return <MissionPageClient />;
}
