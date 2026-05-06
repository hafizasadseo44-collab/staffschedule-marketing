"use client";

import React, { useState } from "react";
import { PricingComponent, PriceTier, BillingCycle } from "@/components/ui/pricing-card";

// Ensure exact stripe IDs are kept
const STRIPE_PRICES = {
  team_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY || "price_1T3jnOHtp8VMWVyUW7m27ulf",
  business_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY || "price_1T3jnsHtp8VMWVyUvZ67Eif5",
  company_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPANY_MONTHLY || "price_1T3joMHtp8VMWVyUdizcksql",
  // Note: Add annual price IDs here if they exist in your Stripe account
};

const staffSchedulePlans: [PriceTier, PriceTier, PriceTier] = [
  {
    id: "team",
    name: "Team",
    description: "Great for small teams starting out with a single location.",
    priceMonthly: 29,
    priceAnnually: 23, // Per month billed annually
    isPopular: false,
    buttonLabel: "Start 15-Day Free Trial",
    priceId: STRIPE_PRICES.team_monthly,
    features: [
      { name: "Team Members", isIncluded: true, value: "Up to 20" },
      { name: "Office Locations", isIncluded: true, value: "1 Location" },
      { name: "Departments", isIncluded: true, value: "5 Departments" },
      { name: "Manager Accounts", isIncluded: true, value: "1 Account" },
      { name: "Weekly Schedule Builder", isIncluded: true },
      { name: "Calendar View", isIncluded: true },
      { name: "Time-Off Management", isIncluded: true },
      { name: "Team Chat & Messages", isIncluded: false },
      { name: "Shift Trading & Swaps", isIncluded: false },
      { name: "Business Analytics", isIncluded: false },
      { name: "Open Shift Job Board", isIncluded: false },
      { name: "24/7 Priority Support", isIncluded: false },
      { name: "Security Audit Logs", isIncluded: false },
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "Advanced tools for growing companies with multiple sites.",
    priceMonthly: 50,
    priceAnnually: 40,
    isPopular: true,
    buttonLabel: "Start 15-Day Free Trial",
    priceId: STRIPE_PRICES.business_monthly,
    features: [
      { name: "Team Members", isIncluded: true, value: "Up to 50" },
      { name: "Office Locations", isIncluded: true, value: "10 Locations" },
      { name: "Departments", isIncluded: true, value: "25 Departments" },
      { name: "Manager Accounts", isIncluded: true, value: "Unlimited" },
      { name: "Weekly Schedule Builder", isIncluded: true },
      { name: "Calendar View", isIncluded: true },
      { name: "Time-Off Management", isIncluded: true },
      { name: "Team Chat & Messages", isIncluded: true },
      { name: "Shift Trading & Swaps", isIncluded: true },
      { name: "Business Analytics", isIncluded: true },
      { name: "Open Shift Job Board", isIncluded: false },
      { name: "24/7 Priority Support", isIncluded: false },
      { name: "Security Audit Logs", isIncluded: false },
    ],
  },
  {
    id: "company",
    name: "Company",
    description: "Full control and priority support for large operations.",
    priceMonthly: 99,
    priceAnnually: 79,
    isPopular: false,
    buttonLabel: "Contact Sales",
    priceId: STRIPE_PRICES.company_monthly,
    features: [
      { name: "Team Members", isIncluded: true, value: "Up to 100" },
      { name: "Office Locations", isIncluded: true, value: "25 Locations" },
      { name: "Departments", isIncluded: true, value: "50 Departments" },
      { name: "Manager Accounts", isIncluded: true, value: "Unlimited" },
      { name: "Weekly Schedule Builder", isIncluded: true },
      { name: "Calendar View", isIncluded: true },
      { name: "Time-Off Management", isIncluded: true },
      { name: "Team Chat & Messages", isIncluded: true },
      { name: "Shift Trading & Swaps", isIncluded: true },
      { name: "Business Analytics", isIncluded: true },
      { name: "Open Shift Job Board", isIncluded: true },
      { name: "24/7 Priority Support", isIncluded: true },
      { name: "Security Audit Logs", isIncluded: true },
    ],
  },
];

const PricingCards = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = async (planId: string, currentCycle: BillingCycle) => {
    // Determine which plan was clicked
    const selectedPlan = staffSchedulePlans.find(p => p.id === planId);
    
    // For Company/Enterprise tier, we might want to direct to contact
    if (planId === "company") {
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
            priceId: selectedPlan.priceId, // Note: You'd ideally swap priceId based on currentCycle here if you had annual stripe IDs
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
        billingCycle={billingCycle}
        onCycleChange={setBillingCycle}
        onPlanSelect={handlePlanSelect}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PricingCards;
