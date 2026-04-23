import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | StaffSchedule.io - Sales & Support",
  description: "Get in touch with the StaffSchedule.io team. Book a demo, request an enterprise quote, or get technical support.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
