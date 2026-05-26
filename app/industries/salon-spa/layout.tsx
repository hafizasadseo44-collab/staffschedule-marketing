import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Salon & Spa Scheduling Software | StaffSchedule.io — For Stylists, Therapists & Beauty Teams",
  description: "Salon scheduling software and spa staff scheduling software built for appointment-based businesses. Manage stylists, therapists, and treatment rooms; track commission; coordinate front-desk and back-bar staff from one elegant platform. Free 14-day trial.",
  keywords: [
    "salon scheduling software",
    "spa staff scheduling software",
    "salon staff scheduling",
    "stylist scheduling app",
    "beauty salon scheduling",
    "spa employee scheduling",
    "barbershop scheduling software",
    "nail salon scheduling",
    "med spa scheduling",
    "salon commission tracking",
    "treatment room scheduling",
    "salon front desk software",
    "salon time clock",
    "salon payroll integration",
    "beauty business scheduling",
  ],
  alternates: { canonical: `${BASE_URL}/industries/salon-spa` },
  openGraph: {
    title: "Salon & Spa Scheduling Software | StaffSchedule.io",
    description: "Elegant staff scheduling for salons, spas, barbershops, and med spas. Stylist rotas, commission tracking, and treatment-room coordination — beautifully done.",
    url: `${BASE_URL}/industries/salon-spa`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "Salon and spa scheduling software" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon & Spa Scheduling Software | StaffSchedule.io",
    description: "Built for beauty businesses. Stylist appointments, commission tracking, treatment rooms — one elegant platform.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io Salon & Spa Scheduling Software",
      url: `${BASE_URL}/industries/salon-spa`,
      description: "Staff scheduling software for salons, spas, barbershops, med spas, nail bars, and lash & brow studios. Manages stylists, therapists, and treatment rooms with appointment-aware scheduling and commission tracking.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      featureList: [
        "Appointment-aware staff scheduling",
        "Stylist and therapist commission tracking",
        "Treatment room and chair assignment",
        "Service-specific certification gating",
        "Client request and preference notes",
        "Retail product upsell tracking",
        "Front-desk and back-bar coordination",
        "Mobile time clock with GPS",
        "Beauty industry payroll integration",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is salon scheduling software?",
          acceptedAnswer: { "@type": "Answer", text: "Salon scheduling software is a digital platform that coordinates the rotas of stylists, colorists, assistants, receptionists, and back-bar staff while respecting appointment bookings, treatment room availability, and service certifications. StaffSchedule.io is built specifically for beauty businesses — handling commission-based pay, retail product upsells, and the daily rhythm of an appointment-based operation." },
        },
        {
          "@type": "Question",
          name: "How does spa staff scheduling work?",
          acceptedAnswer: { "@type": "Answer", text: "Spa staff scheduling coordinates therapists, estheticians, front-desk receptionists, and amenity attendants based on appointment volume, treatment room availability, and required certifications. StaffSchedule.io blocks staff from being scheduled for treatments they're not certified for, suggests coverage by booking density, and tracks commission and tip-pool distributions." },
        },
        {
          "@type": "Question",
          name: "Does the platform track stylist commissions?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Configure commission tiers per stylist (e.g., 40% on service, 10% on product retail) or per service category. The system tracks hours, services performed, and retail sold, then calculates commission alongside hourly wages — all syncs to payroll automatically." },
        },
        {
          "@type": "Question",
          name: "Can I schedule treatment rooms and chairs?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Treatment rooms, chairs, and stations are resources you can schedule alongside staff. The system prevents double-booking a stylist into two chairs or a therapist into two treatment rooms. Room utilization reports show which spaces are over- or under-used." },
        },
        {
          "@type": "Question",
          name: "Does it work for barbershops and nail salons?",
          acceptedAnswer: { "@type": "Answer", text: "Absolutely. Barbershops, nail salons, lash and brow studios, eyebrow bars, and any other appointment-driven beauty business use StaffSchedule.io daily. The platform adapts to chair-based scheduling, walk-in queues, and the mixed commission/hourly pay models common in beauty." },
        },
        {
          "@type": "Question",
          name: "Can stylists swap shifts in the app?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. A stylist posts a swap request; qualified peers see it instantly; the first to accept gets it after a one-tap manager approval. The system respects existing appointment bookings so a client booked with a specific stylist isn't accidentally reassigned." },
        },
        {
          "@type": "Question",
          name: "Does it integrate with salon booking software?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. StaffSchedule.io complements your booking platform — pulling appointment data to drive coverage decisions and sending availability back. Common integrations include major salon and spa booking systems, with custom API connections available." },
        },
        {
          "@type": "Question",
          name: "How fast can my salon get started?",
          acceptedAnswer: { "@type": "Answer", text: "Most salons publish their first week's schedule on day one. The setup wizard applies the salon industry preset (positions, commission rules, treatment room templates), imports your stylist roster, and walks you through the first schedule. Staff get the mobile app the same day — average adoption is 2–3 days." },
        },
      ],
    },
  ],
};

export default function SalonSpaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
