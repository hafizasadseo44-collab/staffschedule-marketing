"use client";

import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import CompanyStats from "@/components/about/CompanyStats";
import CompanyTimeline from "@/components/about/CompanyTimeline";
import TeamSection from "@/components/about/TeamSection";
import FounderVision from "@/components/about/FounderVision";
import GlobalNetwork from "@/components/about/GlobalNetwork";
import SecurityTrust from "@/components/about/SecurityTrust";

export default function AboutPageClient() {
  return (
    <div className="bg-background">
      <AboutHero />
      <FounderVision />
      <MissionValues />
      <CompanyStats />
      <GlobalNetwork />
      <SecurityTrust />
      <CompanyTimeline />
      <TeamSection />
    </div>
  );
}
