"use client";

import React, { useState } from "react";
import { PricingComponent, PriceTier } from "@/components/ui/pricing-card";

// Ensure exact stripe IDs are kept
const STRIPE_PRICES = {
  team_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY || "price_1T3jnOHtp8VMWVyUW7m27ulf",
  business_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY || "price_1T3jnsHtp8VMWVyUvZ67Eif5",
  company_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPANY_MONTHLY || "price_1T3joMHtp8VMWVyUdizcksql",
  // Note: Add annual price IDs here if they exist in your Stripe account
};

const staffSchedulePlans: [PriceTier, PriceTier, PriceTier, PriceTier] = [
  {
    id: "trial",
    name: "Free Trial",
    description: "Experience the full power of StaffSchedule.io with all premium features unlocked.",
    priceMonthly: 0,
    isPopular: false,
    buttonLabel: "Start 15-Day Trial",
    features: [
      { name: "Enterprise Suite Access", isIncluded: true },
      { name: "Unlimited Scale & Growth", isIncluded: true },
      { name: "Smart AI Scheduling", isIncluded: true },
      { name: "Open Shift Marketplace", isIncluded: true },
      { name: "Team Communication Hub", isIncluded: true },
      { name: "Dedicated Mobile Apps", isIncluded: true },
      { name: "Advanced Labor Analytics", isIncluded: true },
      { name: "No Credit Card Required", isIncluded: true },
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "Essential scheduling tools for smaller teams and single locations.",
    priceMonthly: 29,
    isPopular: false,
    buttonLabel: "Get Started",
    priceId: STRIPE_PRICES.team_monthly,
    features: [
      { name: "Verified Members", isIncluded: true, value: "10" },
      { name: "Operating Location", isIncluded: true, value: "1" },
      { name: "Department Cluster", isIncluded: true, value: "1" },
      { name: "Smart Weekly Scheduler", isIncluded: true },
      { name: "Employee Self-Service", isIncluded: true },
      { name: "Basic Leave Management", isIncluded: true },
      { name: "Mobile Web Access", isIncluded: true },
      { name: "Standard Support", isIncluded: true },
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "The complete toolkit for scaling multi-location operations and growing teams.",
    priceMonthly: 79,
    isPopular: true,
    buttonLabel: "Scale Now",
    priceId: STRIPE_PRICES.business_monthly,
    features: [
      { name: "Verified Members", isIncluded: true, value: "50" },
      { name: "Operating Locations", isIncluded: true, value: "5" },
      { name: "Department Clusters", isIncluded: true, value: "5" },
      { name: "Native iOS & Android Apps", isIncluded: true },
      { name: "Team Communication Chat", isIncluded: true },
      { name: "Company Announcements", isIncluded: true },
      { name: "Advanced Labor Analytics", isIncluded: true },
      { name: "Priority 24/7 Support", isIncluded: true },
    ],
  },
  {
    id: "company",
    name: "Company",
    description: "Enterprise-grade control, compliance, and unlimited scale for large organizations.",
    priceMonthly: 199,
    isPopular: false,
    buttonLabel: "Enterprise Pilot",
    priceId: STRIPE_PRICES.company_monthly,
    features: [
      { name: "Verified Members", isIncluded: true, value: "Unlimited" },
      { name: "Operating Locations", isIncluded: true, value: "Unlimited" },
      { name: "Department Clusters", isIncluded: true, value: "Unlimited" },
      { name: "Open Shift Job Board", isIncluded: true },
      { name: "Employee Shift Trading", isIncluded: true },
      { name: "Bulk Workforce Import", isIncluded: true },
      { name: "Full Compliance Audit Logs", isIncluded: true },
      { name: "Dedicated Success Manager", isIncluded: true },
    ],
  },
];

const PricingCards = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = async (planId: string) => {
    const selectedPlan = staffSchedulePlans.find(p => p.id === planId);

    // For Trial and Company/Enterprise tier, we might want to direct to signup
    if (planId === "trial" || planId === "company") {
      window.location.href = "https://app.staffschedule.io/signup.php?start_trial=1";
      return;
    }

    if (selectedPlan && selectedPlan.priceId) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            priceId: selectedPlan.priceId,
            planName: selectedPlan.name 
          }),
        });
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error("Checkout session failed:", data.error);
        }
      } catch (err) {
        console.error("Payment redirect error:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fallback
      window.location.href = "https://app.staffschedule.io/signup.php?start_trial=1";
    }
  };

  return (
    <div className="relative z-20 -mt-20">
      <PricingComponent
        plans={staffSchedulePlans}
        onPlanSelect={handlePlanSelect}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PricingCards;
