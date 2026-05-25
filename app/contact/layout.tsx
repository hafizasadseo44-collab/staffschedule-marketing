import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | StaffSchedule.io — Book a Demo or Get Support",
  description: "Get in touch with the StaffSchedule.io team. Book a personalized demo, request enterprise pricing, or reach our 24/7 support team. We respond within 2 hours.",
  keywords: ["contact staffschedule", "book demo scheduling software", "workforce management support", "enterprise scheduling quote"],
  alternates: { canonical: "https://staffschedule.io/contact" },
  openGraph: {
    title: "Contact StaffSchedule.io — Sales & Support",
    description: "Book a live demo, get enterprise pricing, or contact our 24/7 support team.",
    url: "https://staffschedule.io/contact",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "Contact StaffSchedule.io" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact StaffSchedule.io",
    description: "Book a demo or talk to our team — we respond within 2 hours.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
