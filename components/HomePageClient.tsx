"use client";

import dynamic from "next/dynamic";
import SplitHero from "@/components/SplitHero";
import IndustryShowcase from "@/components/IndustryShowcase";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LazySection } from "@/components/ui/lazy-section";

// --- Dynamically Imported Components (Below the fold) ---
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: true });
const FeaturesGrid = dynamic(() => import("@/components/FeaturesGrid"), { ssr: true });
const TestimonialsMarquee = dynamic(() => import("@/components/TestimonialsMarquee"), { ssr: true });
const CaseStudySection = dynamic(() => import("@/components/CaseStudySection"), { ssr: true });
const PricingTable = dynamic(() => import("@/components/PricingTable"), { ssr: true });
const LatestBlogsSection = dynamic(() => import("@/components/LatestBlogsSection"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/FAQSection"), { ssr: true });
const EliteFinalCTA = dynamic(() => import("@/components/EliteFinalCTA"), { ssr: true });


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
      <IndustryShowcase />


      {/* 4. How it works */}
      <LazySection>
        <HowItWorks />
      </LazySection>

      {/* 5. Feature highlights */}
      <LazySection>
        <FeaturesGrid />
      </LazySection>

      {/* 10. Testimonials */}
      <LazySection>
        <TestimonialsMarquee />
      </LazySection>

      {/* 11. Case Study */}
      <LazySection>
        <CaseStudySection />
      </LazySection>

      {/* 12. Pricing + link to page */}
      <LazySection>
        <PricingTable />
      </LazySection>
      
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
      <LazySection>
        <LatestBlogsSection posts={latestBlogs} />
      </LazySection>

      {/* 13. FAQ */}
      <LazySection>
        <FAQSection />
      </LazySection>

      {/* 14. Elite Final CTA */}
      <LazySection>
        <EliteFinalCTA />
      </LazySection>
      </div>
    </div>
  );
}
