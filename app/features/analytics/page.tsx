import React from "react";
import FeatureHero from "@/components/features/FeatureHero";
import AeoSection from "@/components/features/AeoSection";
import AnalyticsHeroVisual from "@/components/features/AnalyticsHeroVisual";
import AnalyticsBento from "@/components/features/AnalyticsBento";
import PosIntegration from "@/components/features/PosIntegration";
import AnalyticsShowcase from "@/components/features/AnalyticsShowcase";
import AnalyticsCostBleed from "@/components/features/AnalyticsCostBleed";
import AnalyticsROICalculator from "@/components/features/AnalyticsROICalculator";
import AnalyticsDecisionSupport from "@/components/features/AnalyticsDecisionSupport";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labor Cost Analytics & Workforce Reporting Software | StaffSchedule.io",
  description: "Stop profit leakage with real-time labor cost analytics. Track overtime, automate payroll exports, and calculate ROI with StaffSchedule.io. Professional reporting for smarter workforce management.",
  keywords: ["labor cost analytics", "workforce reporting", "overtime alerts", "payroll automation", "ROI calculator", "labor spend tracking", "POS integration for scheduling"],
  alternates: { canonical: "https://staffschedule.io/features/analytics" },
  openGraph: {
    title: "Labor Cost Analytics & Workforce Reporting | StaffSchedule.io",
    description: "Master your profit margins with real-time labor spend oversight and automated reporting.",
    url: "https://staffschedule.io/features/analytics",
    images: [{ url: "https://staffschedule.io/staffschedule-dashboard.png", width: 1200, height: 630, alt: "Labor Cost Analytics — StaffSchedule.io" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labor Cost Analytics & Workforce Reporting",
    description: "Track your labor costs in real-time and eliminate expensive overtime.",
    images: ["https://staffschedule.io/staffschedule-dashboard.png"],
  },
};

const FAQS = [
  {
    question: "How accurate are the labor cost estimates?",
    answer: "Costs are calculated based on the precise hourly rates or salaries you set for each employee. The system also factors in scheduled breaks and overtime rules to give you a highly accurate estimate before the week even begins."
  },
  {
    question: "Can I track labor cost as a percentage of sales?",
    answer: "Yes! If you input your expected revenue, StaffSchedule.io can automatically calculate your labor-to-sales ratio, helping you stay within your budget targets."
  },
  {
    question: "Who can see the financial reports?",
    answer: "Access to financial data and reports is strictly controlled by role-based permissions. Typically, only Owners and General Managers can view labor cost data."
  },
  {
    question: "What types of reports are available?",
    answer: "We offer daily labor reports, weekly payroll summaries, overtime audit logs, and employee attendance history — all exportable for use in Excel or other accounting software."
  }
];

export default function AnalyticsPage() {
  // AEO SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StaffSchedule.io Analytics Hub",
    "operatingSystem": "Web-based",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Professional labor cost analytics and reporting software designed to protect business profit margins through real-time spend tracking and overtime prevention."
  };

  return (
    <main className="pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      
      <FeatureHero
        badge="Labor Analytics"
        title={
          <>
            Master your costs <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              with intelligence.
            </span>
          </>
        }
        description="Transform your data into decisions. StaffSchedule.io gives you the real-time financial oversight you need to run a more profitable and efficient business."
        ctaText="See Analysis for Free"
        visual={<AnalyticsHeroVisual />}
      />

      <AnalyticsCostBleed />
      <AnalyticsBento />
      <AnalyticsDecisionSupport />
      <PosIntegration />
      <AnalyticsShowcase />
      <AnalyticsROICalculator />

      <AeoSection faqs={FAQS} />
    </main>
  );
}
