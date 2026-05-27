import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/volunteer-scheduling-software`;

export const metadata: Metadata = {
  title: "Volunteer Scheduling Software for Nonprofits & Events | StaffSchedule.io",
  description: "Free and affordable volunteer scheduling software for nonprofits, charities, and event coordinators. Self-signup portals, automated shift reminders, and real-time volunteer management.",
  keywords: ["volunteer scheduling software", "nonprofit scheduling app", "volunteer management software", "event volunteer scheduling", "charity workforce management", "volunteer coordinator app", "volunteer shift planning", "nonprofit workforce software", "event staffing software", "community scheduling app"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Volunteer Scheduling Software for Nonprofits & Events | StaffSchedule.io",
    description: "Coordinate volunteers, manage event shifts, and keep your community team organized with StaffSchedule.io.",
    url: PAGE_URL, type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Volunteer Scheduling Software" }],
  },
};

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "SoftwareApplication",
      name: "StaffSchedule.io — Volunteer Scheduling Software", url: PAGE_URL,
      applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android",
      description: "Volunteer scheduling software with self-signup portals, automated reminders, event management, and real-time coordination for nonprofits and community organizations.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial. Nonprofit pricing available." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5" },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is volunteer scheduling software?", acceptedAnswer: { "@type": "Answer", text: "Volunteer scheduling software helps nonprofit coordinators organize volunteer shifts, manage sign-ups, send reminders, and track participation. It replaces spreadsheets and email chains with a single platform where volunteers can self-register for available shifts." } },
        { "@type": "Question", name: "Is there free volunteer scheduling software?", acceptedAnswer: { "@type": "Answer", text: "StaffSchedule.io offers a free 14-day trial with full access to all volunteer management features. We also offer special nonprofit pricing for qualifying organizations. Contact our team to learn more about discounted plans." } },
        { "@type": "Question", name: "How do I manage volunteer no-shows?", acceptedAnswer: { "@type": "Answer", text: "StaffSchedule.io sends automated shift reminders via push notification, SMS, and email before each shift. When a volunteer cancels, you can instantly open that slot to other available volunteers with one click. Coverage reports show your historical no-show rates by role and event." } },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      {children}
    </>
  );
}
