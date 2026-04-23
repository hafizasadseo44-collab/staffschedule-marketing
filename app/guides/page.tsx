import { Metadata } from "next";
import GuidesClient from "@/components/resources/GuidesClient";

export const metadata: Metadata = {
  title: "Staffing Blueprints & Playbooks | StaffSchedule.io",
  description: "Download step-by-step staffing blueprints, labor cost reports, and operational excellence guides for modern workforce leaders.",
  openGraph: {
    title: "Staffing Blueprints & Playbooks | StaffSchedule.io",
    description: "Expert resources to help you master workforce management and labor optimization.",
  }
};

export default function GuidesPage() {
  return <GuidesClient />;
}
