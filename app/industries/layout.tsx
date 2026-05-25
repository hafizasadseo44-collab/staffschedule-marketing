import type { Metadata } from "next";

const BASE_URL = "https://staffschedule.io";

export const metadata: Metadata = {
  title: "Industries We Serve | StaffSchedule.io — Workforce Software for Every Sector",
  description: "Workforce scheduling, time tracking, and team messaging built for restaurants, retail, healthcare, construction, security, hospitality, professional services, and 30+ more industries. Free 14-day trial.",
  keywords: [
    "workforce software by industry",
    "restaurant scheduling software",
    "retail employee scheduling",
    "healthcare workforce management",
    "construction crew scheduling",
    "hotel staff scheduling",
    "security guard scheduling",
    "salon scheduling software",
    "cleaning company scheduling",
    "logistics workforce management",
    "industry scheduling solutions",
    "shift scheduling for industries",
  ],
  alternates: { canonical: `${BASE_URL}/industries` },
  openGraph: {
    title: "Industries Served | StaffSchedule.io",
    description: "Built for restaurants, retail, healthcare, construction, hospitality, security, and 30+ more industries.",
    url: `${BASE_URL}/industries`,
    images: [{ url: `${BASE_URL}/staffschedule-dashboard.png`, width: 1200, height: 630, alt: "StaffSchedule.io — Industries Served" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | StaffSchedule.io",
    description: "Workforce scheduling for every sector. Restaurants. Retail. Healthcare. Construction. And every business in between.",
    images: [`${BASE_URL}/staffschedule-dashboard.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "StaffSchedule.io",
      url: `${BASE_URL}/industries`,
      description: "Workforce management platform tailored for restaurants, retail, healthcare, construction, hospitality, security, education, logistics, and 30+ more industries.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 14-day trial." },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1038", bestRating: "5", worstRating: "1" },
    },
    {
      "@type": "ItemList",
      name: "Industries Served by StaffSchedule.io",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Restaurants & Food Service", url: `${BASE_URL}/solutions/hospitality` },
        { "@type": "ListItem", position: 2, name: "Hotels & Hospitality", url: `${BASE_URL}/solutions/hospitality` },
        { "@type": "ListItem", position: 3, name: "Retail & Consumer", url: `${BASE_URL}/solutions/retail` },
        { "@type": "ListItem", position: 4, name: "Healthcare & Medical", url: `${BASE_URL}/solutions/healthcare` },
        { "@type": "ListItem", position: 5, name: "Security Services", url: `${BASE_URL}/solutions/security` },
        { "@type": "ListItem", position: 6, name: "Construction & Trades", url: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 7, name: "Manufacturing", url: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 8, name: "Professional Services", url: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 9, name: "Education", url: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 10, name: "Logistics & Transportation", url: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 11, name: "Cleaning & Maintenance", url: `${BASE_URL}/industries` },
        { "@type": "ListItem", position: 12, name: "Non-Profit & Community", url: `${BASE_URL}/industries` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What industries does StaffSchedule.io support?",
          acceptedAnswer: { "@type": "Answer", text: "StaffSchedule.io serves 30+ industries including restaurants, retail, healthcare, construction, hospitality, security, education, professional services, logistics, cleaning, manufacturing, and non-profits. The platform adapts to the specific scheduling, time tracking, and communication needs of each sector." },
        },
        {
          "@type": "Question",
          name: "Is StaffSchedule.io different for each industry?",
          acceptedAnswer: { "@type": "Answer", text: "The core platform is the same, but features can be tailored to your industry's workflow. Healthcare gets HIPAA-aware messaging, restaurants get tip pooling and section assignments, construction gets GPS site verification, and so on — all configurable at setup." },
        },
        {
          "@type": "Question",
          name: "Do I need a different plan for my industry?",
          acceptedAnswer: { "@type": "Answer", text: "No. Every plan includes every feature. Pick the tier that matches your team size — all industry-specific configurations are available on every plan, including the free 14-day trial." },
        },
        {
          "@type": "Question",
          name: "Can StaffSchedule.io handle multi-location businesses?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Multi-location management is built into every plan. Manage retail chains, restaurant groups, healthcare networks, and franchise operations from one dashboard with location-specific scheduling and reporting." },
        },
      ],
    },
  ],
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
