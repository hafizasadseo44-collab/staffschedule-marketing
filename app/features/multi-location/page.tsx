import React from "react";
import FeatureHero from "@/components/features/FeatureHero";
import AeoSection from "@/components/features/AeoSection";
import MultiLocationHeroVisual from "@/components/features/MultiLocationHeroVisual";
import MultiLocationBento from "@/components/features/MultiLocationBento";
import StaffSharingHub from "@/components/features/StaffSharingHub";
import MultiLocationShowcase from "@/components/features/MultiLocationShowcase";
import EnterpriseHierarchy from "@/components/features/EnterpriseHierarchy";
import MultiLocationCompliance from "@/components/features/MultiLocationCompliance";
import RegionalAnalytics from "@/components/features/RegionalAnalytics";
import EnterpriseIntegrations from "@/components/features/EnterpriseIntegrations";
import EnterpriseSecurity from "@/components/features/EnterpriseSecurity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Location Staff Management & Scheduling Software | StaffSchedule.io",
  description: "Scale your empire with professional multi-site management. Shared staff pools, centralized regional reporting, and cross-location compliance for franchises and large organizations.",
  keywords: ["multi-location scheduling", "franchise staff management", "shared labor pool", "regional workforce reporting", "multi-site time tracking", "enterprise resource management"],
  openGraph: {
    title: "Multi-Location & Enterprise Staff Management | StaffSchedule.io",
    description: "Built for scale. Manage hundreds of branches, share staff seamlessly, and maintain global control from one dashboard.",
    images: ["/images/multi-location-global-v1.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Location Enterprise Scheduling",
    description: "Unified control for your entire multi-site operation.",
    images: ["/images/multi-location-global-v1.jpg"],
  }
};

const FAQS = [
  {
    question: "Can I share staff between different locations?",
    answer: "Yes! One of our most powerful features is the shared staff pool. You can assign an employee to multiple branches, and they'll see all their shifts in one calendar. The system handles the payroll allocation automatically based on where they actually worked."
  },
  {
    question: "Are permissions location-specific?",
    answer: "Absolutely. You can assign 'Branch Managers' who only see their specific location, while 'Region Managers' or 'Owners' have access to multiple sites or the entire organization."
  },
  {
    question: "How do reports handle multiple sites?",
    answer: "You can view reports for a single location, a specific group of sites, or the entire company. This allows for easy comparison of labor efficiency across your different branches."
  },
  {
    question: "Can each location have its own time zone and rules?",
    answer: "Yes. Every location is configurable with its own time zone, labor laws, break rules, and tax settings, making it perfect for businesses operating across different states or countries."
  }
];

export default function MultiLocationPage() {
  // AEO Enterprise Software Schema
  const enterpriseSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StaffSchedule.io Enterprise Hub",
    "operatingSystem": "Web-based",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Enterprise-grade multi-location staff management and scheduling platform featuring shared staff pools, regional hierarchy management, and centralized global reporting."
  };

  return (
    <main className="pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enterpriseSchema) }}
      />

      <FeatureHero
        badge="Enterprise Scale"
        title={
          <>
            Scale your empire, <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              without the stress.
            </span>
          </>
        }
        description="Complex organizations need powerful tools. StaffSchedule.io was built for scale, allowing you to manage hundreds of locations, departments, and teams with surgical precision."
        ctaText="Explore Enterprise Tools"
        visual={<MultiLocationHeroVisual />}
      />

      <MultiLocationBento />
      <EnterpriseHierarchy />
      <StaffSharingHub />
      <MultiLocationCompliance />
      <RegionalAnalytics />
      <MultiLocationShowcase />
      <EnterpriseIntegrations />
      <EnterpriseSecurity />

      <AeoSection faqs={FAQS} />
    </main>
  );
}
