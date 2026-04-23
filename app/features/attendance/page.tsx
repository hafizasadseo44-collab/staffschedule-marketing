import React from "react";
import FeatureHero from "@/components/features/FeatureHero";
import AeoSection from "@/components/features/AeoSection";
import AttendanceHeroVisual from "@/components/features/AttendanceHeroVisual";
import AttendanceBento from "@/components/features/AttendanceBento";
import GeofencingShowcase from "@/components/features/GeofencingShowcase";
import TimeTheftVsVerified from "@/components/features/TimeTheftVsVerified";
import AttendanceHardware from "@/components/features/AttendanceHardware";
import AttendanceAlerts from "@/components/features/AttendanceAlerts";
import AttendanceOfflineSync from "@/components/features/AttendanceOfflineSync";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPS Time Clock & Employee Attendance Software",
  description: "Track employee hours with precision. StaffSchedule.io offers GPS geofencing, automated timesheets, and real-time attendance tracking for your team.",
};

const FAQS = [
  {
    question: "How does GPS geofencing work?",
    answer: "You can set a 'virtual fence' around your business location. When employees try to clock in, the app verifies their GPS coordinates. If they aren't on-site, they won't be able to punch in, preventing buddy punching and time theft."
  },
  {
    question: "Can employees clock in without a smartphone?",
    answer: "While we recommend our mobile app for the best experience, we also offer a 'Kiosk Mode' where you can set up a tablet at your entrance for staff to punch in using a unique PIN."
  },
  {
    question: "How are timesheets generated?",
    answer: "Timesheets are built in real-time as staff clock in and out. The system automatically subtracts breaks and flags any overtime, so you have a perfectly accurate report ready for payroll at the end of the week."
  },
  {
    question: "Can I track attendance across multiple locations?",
    answer: "Yes. Managers can see exactly who is clocked in at every location from a single live dashboard. You'll get alerts if someone hasn't shown up for their shift."
  }
];

export default function AttendancePage() {
  return (
    <main className="pt-10">
      <FeatureHero
        badge="Time & Attendance"
        title={
          <>
            Clock-in with <br />
            <span className="text-emerald-500">
              GPS Precision.
            </span>
          </>
        }
        description="Verify attendance, prevent time theft, and automate your entire payroll process with StaffSchedule.io's secure attendance tracking suite."
        ctaText="Try Smart Attendance"
        visual={<AttendanceHeroVisual />}
      />

      <TimeTheftVsVerified />
      <AttendanceBento />
      
      {/* 3 New Attractive User Sections */}
      <AttendanceHardware />
      <GeofencingShowcase />
      <AttendanceAlerts />
      <AttendanceOfflineSync />

      <AeoSection faqs={FAQS} />
    </main>
  );
}
