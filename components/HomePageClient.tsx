"use client";

import dynamic from "next/dynamic";
import SplitHero from "@/components/SplitHero";
import DashboardShowcase from "@/components/DashboardShowcase";
import HowItWorks from "@/components/HowItWorks";
import ComparisonSection from "@/components/ComparisonSection";
import IntegrationsGrid from "@/components/IntegrationsGrid";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import PricingTable from "@/components/PricingTable";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import ROIBanner from "@/components/ROIBanner";
import LatestBlogsSection from "@/components/LatestBlogsSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import OnboardingTimeline from "@/components/OnboardingTimeline";
import CaseStudySection from "@/components/CaseStudySection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const UseCases = dynamic(() => import("@/components/UseCases"), { ssr: false });

export default function HomePageClient({ latestBlogs = [] }: { latestBlogs?: any[] }) {
  return (
    <div className="bg-[#FAF9FF] relative overflow-hidden">
      {/* ── Global Atmosphere Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-500/[0.03] rounded-full blur-[140px]" />
        <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[-5%] w-[900px] h-[900px] bg-indigo-600/[0.02] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10">
      {/* 1. Hero */}
      <SplitHero />

      {/* 2. Dashboard Showcase (Everything in One Dashboard) */}
      <DashboardShowcase />

      {/* 3. Hard ROI numbers */}
      <ROIBanner />

      {/* 4. How it works */}
      <HowItWorks />

      {/* 5. Feature highlights */}
      <FeaturesGrid />

      {/* 6. Onboarding timeline */}
      <OnboardingTimeline />

      {/* 7. Use cases + link to page */}
      <UseCases />


      {/* 8. Competitor comparison */}
      <ComparisonSection />

      {/* 9. Integrations */}
      <IntegrationsGrid />

      {/* 10. Testimonials */}
      <TestimonialsMarquee />

      {/* 11. Case Study */}
      <CaseStudySection />

      {/* 12. Pricing + link to page */}
      <PricingTable />
      <div className="flex justify-center py-12 bg-background">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all group"
        >
          View Full Pricing Details
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 12. Latest Blogs */}
      <LatestBlogsSection posts={latestBlogs} />

      {/* 13. FAQ */}
      <FAQSection />

      {/* 14. Final CTA */}
      <FinalCTA />
      </div>
    </div>
  );
}
