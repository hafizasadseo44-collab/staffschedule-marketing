"use client";

import dynamic from "next/dynamic";
import SplitHero from "@/components/SplitHero";
import IndustryShowcase from "@/components/IndustryShowcase";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LazySection } from "@/components/ui/lazy-section";

// SSR-enabled dynamic imports — content visible to search engines while still code-split
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const PremiumShowcaseSection = dynamic(() => import("@/components/PremiumShowcaseSection"));
const FeaturesGrid = dynamic(() => import("@/components/FeaturesGrid"));
const MobileSection = dynamic(() => import("@/components/MobileSection"));
const TestimonialsMarquee = dynamic(() => import("@/components/TestimonialsMarquee"));
const PricingTable = dynamic(() => import("@/components/PricingTable"));
const LatestBlogsSection = dynamic(() => import("@/components/LatestBlogsSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const EliteFinalCTA = dynamic(() => import("@/components/EliteFinalCTA"));


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
      {/* 2. Industry Showcase */}
      <LazySection>
        <IndustryShowcase />
      </LazySection>

      {/* 3. Premium Showcase Section */}
      <LazySection>
        <PremiumShowcaseSection />
      </LazySection>



      {/* 4. How it works */}
      <LazySection>
        <div id="how-it-works">
        <HowItWorks />
        </div>
      </LazySection>

      {/* 5. Feature highlights */}
      <LazySection>
        <FeaturesGrid />
      </LazySection>

      {/* 6. Mobile Section */}
      <LazySection>
        <MobileSection />
      </LazySection>

      {/* 7. Testimonials */}
      <LazySection>
        <TestimonialsMarquee />
      </LazySection>

      {/* 8. Pricing + link to page */}
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

      {/* 9. Latest Blogs */}
      <LazySection>
        <LatestBlogsSection posts={latestBlogs} />
      </LazySection>

      {/* 10. FAQ */}
      <LazySection>
        <FAQSection />
      </LazySection>

      {/* 11. Elite Final CTA */}
      <LazySection>
        <EliteFinalCTA />
      </LazySection>
      </div>
    </div>
  );
}
