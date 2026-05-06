"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import PricingROI from "@/components/pricing/PricingROI";
import PricingTrust from "@/components/pricing/PricingTrust";
import PricingSocial from "@/components/pricing/PricingSocial";
import PricingSteps from "@/components/pricing/PricingSteps";
import PricingSecurity from "@/components/pricing/PricingSecurity";
import PricingCTA from "@/components/pricing/PricingCTA";
import FAQ from "@/components/FAQ";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingPageClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark">
      <PricingHero />

      <PricingCards />

      <PricingSteps />

      <PricingROI />

      <PricingSecurity />

      <PricingTrust />

      <PricingSocial />

      <div className="bg-slate-50 dark:bg-slate-900/50">
        <FAQ />
      </div>

      <PricingCTA />

    </div>
  );
}

