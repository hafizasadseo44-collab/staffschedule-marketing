import React from "react";
import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";
const PAGE_URL = `${BASE_URL}/industries/plumbing-scheduling-software`;

export const metadata: Metadata = {
  title: "Plumbing Scheduling Software for Contractors & Crews | StaffSchedule.io",
  description:
    "The best plumbing scheduling software for contractors. Dispatch technicians instantly, manage on-call crews, track overtime, and sync job details to the mobile app. Try free for 14 days.",
  keywords: [
    "plumbing scheduling software",
    "plumber scheduling app",
    "plumbing dispatch software",
    "field technician scheduling",
    "plumbing crew management",
    "scheduling software for plumbing contractors",
    "emergency plumbing dispatch system",
    "plumbing workforce management",
    "plumber job management app",
    "plumbing team scheduling",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Plumbing Scheduling Software for Contractors & Crews | StaffSchedule.io",
    description:
      "Dispatch plumbers faster, manage emergency call-outs, track overtime, and keep your field crews connected. Trusted by 1,500+ plumbing contractors.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Plumbing Scheduling Software Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plumbing Scheduling Software | StaffSchedule.io",
    description: "Stop scheduling plumbing crews on spreadsheets. Dispatch in seconds, track overtime, manage emergencies. Free 14-day trial.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

export default function PlumbingLayout({ children }: { children: React.ReactNode }) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StaffSchedule.io — Plumbing Scheduling Software",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description:
      "Plumbing scheduling software that helps contractors manage field technicians, dispatch emergency jobs, track on-call overtime, and coordinate multi-crew operations from one dashboard.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial, no credit card required." },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best scheduling software for plumbing contractors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "StaffSchedule.io is purpose-built for plumbing contractors. It includes live dispatch mapping, on-call and overtime tracking, offline mobile access for field techs, and payroll-ready timesheets — all in one platform.",
        },
      },
      {
        "@type": "Question",
        name: "How does plumbing dispatch software handle emergency calls?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When an emergency call comes in, StaffSchedule.io lets you instantly see all available technicians and their current locations. You can push the job to the nearest plumber with a single tap, and they'll get the full job details on their mobile app within seconds.",
        },
      },
      {
        "@type": "Question",
        name: "Can plumbers use the scheduling app offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The StaffSchedule.io mobile app caches job details offline, so plumbers can access instructions, take notes, and log their time even in basements or areas with poor cell coverage. Everything syncs automatically when connectivity is restored.",
        },
      },
      {
        "@type": "Question",
        name: "Does the plumbing scheduling software track overtime?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. The platform automatically differentiates regular hours from on-call and emergency overtime. You can export precise payroll-ready reports so your accountant or payroll software gets the exact numbers every time.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  );
}
