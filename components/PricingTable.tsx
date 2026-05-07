"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as PricingCard from "@/components/ui/new-pricing-card";
import { CheckCircle2, Zap, Building2, Crown, Sparkles } from "lucide-react";

const PricingTable = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans = [
    {
      icon: <Sparkles className="text-[#6C5CE7]" />,
      name: "Free Trial",
      description: "Experience the full power for 15 days.",
      badge: "Best to Start",
      price: "$0",
      period: "/15 days",
      variant: "default",
      buttonLabel: "Start 15-Day Trial",
      priceId: "free_trial",
      features: [
        "Enterprise Suite Access",
        "Unlimited Scale & Growth",
        "Smart AI Scheduling",
        "Open Shift Marketplace",
        "Team Communication Hub",
        "Dedicated Mobile Apps",
        "Advanced Labor Analytics",
        "No Credit Card Required"
      ],
    },
    {
      icon: <Zap className="text-[#6C5CE7]" />,
      name: "Team",
      description: "Perfect for single locations.",
      price: "$29",
      period: "/month",
      variant: "outline",
      buttonLabel: "Get Started",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY || "price_1T3jnOHtp8VMWVyUW7m27ulf",
      features: [
        "10 Verified Members", 
        "1 Operating Location", 
        "1 Department Cluster", 
        "Smart Weekly Scheduler", 
        "Employee Self-Service",
        "Basic Leave Management",
        "Mobile Web Access",
        "Standard Support"
      ],
    },
    {
      icon: <Building2 className="text-[#6C5CE7]" />,
      name: "Business",
      description: "Ideal for growing multi-unit teams.",
      badge: "Popular",
      price: "$79",
      period: "/month",
      variant: "outline",
      buttonLabel: "Scale Now",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY || "price_1T3jnsHtp8VMWVyUvZ67Eif5",
      features: [
        "50 Verified Members", 
        "5 Operating Locations", 
        "5 Department Clusters", 
        "Native iOS & Android Apps", 
        "Team Communication Chat", 
        "Company Announcements",
        "Advanced Labor Analytics",
        "Priority 24/7 Support"
      ],
    },
    {
      icon: <Crown className="text-slate-400" />,
      name: "Company",
      description: "Perfect for large scale companies.",
      price: "$199",
      period: "/month",
      variant: "outline",
      buttonLabel: "Enterprise Pilot",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPANY_MONTHLY || "price_1T3joMHtp8VMWVyUdizcksql",
      features: [
        "Unlimited Members & Scale", 
        "Unlimited Sites & Depts", 
        "Open Shift Job Board", 
        "Employee Shift Trading", 
        "Bulk Workforce Import", 
        "Advanced Custom Roles",
        "Full Compliance Audit Logs",
        "Dedicated Success Manager"
      ],
    },
  ];

  const handlePlanSelect = async (planName: string, priceId: string) => {
    setIsLoading(planName);
    if (planName === "Company" || priceId === "free_trial") {
      window.location.href = "https://app.staffschedule.io/onboarding.php?start_trial=1";
      setIsLoading(null);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          priceId: priceId,
          planName: planName 
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout session failed:", data.error);
        setIsLoading(null);
      }
    } catch (err) {
      console.error("Payment redirect error:", err);
      setIsLoading(null);
    }
  };

  return (
    <section className="py-32 relative bg-[#FAF9FF] overflow-hidden" id="pricing">
      {/* Subtle dotted grid from prompt styled for light mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(rgba(108,92,231,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(circle at 50% 10%, rgba(0,0,0,1), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Left spotlight from prompt with brand colors for light mode */}
      <div
        aria-hidden="true"
        className="absolute inset-0 isolate hidden opacity-40 contain-strict lg:block pointer-events-none mix-blend-multiply"
      >
        <div className="absolute top-0 left-[20%] h-[800px] w-[560px] -translate-y-[20%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(108,92,231,0.06)_0,rgba(108,92,231,0.02)_50%,transparent_100%)] blur-[40px]" />
        <div className="absolute top-0 right-[20%] h-[800px] w-[240px] -translate-y-[10%] rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(142,124,255,0.06)_0,rgba(142,124,255,0.02)_50%,transparent_100%)] blur-[40px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#6C5CE7] font-black text-[10px] uppercase tracking-widest mb-6 border border-slate-200 shadow-sm">
            Simple Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
            Plans that <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]">Scale with You</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed">
            Start for free, then grow with us. Flexible plans for projects of all sizes.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto justify-items-center items-stretch">
          {plans.map((plan) => {
            const isFeatured = plan.variant === 'default';

            return (
              <PricingCard.Card 
                key={plan.name} 
                className={cn(
                  "w-full transition-all duration-300",
                  isFeatured 
                    ? "md:-translate-y-2 border-[#6C5CE7]/40 shadow-[0_20px_40px_-15px_rgba(108,92,231,0.15)] ring-1 ring-[#6C5CE7]/20" 
                    : "hover:shadow-xl hover:border-slate-200"
                )}
              >
                <PricingCard.Header glassEffect={isFeatured}>
                  <PricingCard.Plan>
                    <PricingCard.PlanName>
                      {plan.icon}
                      <span className="text-slate-800 font-semibold">{plan.name}</span>
                    </PricingCard.PlanName>
                    {plan.badge && (
                      <PricingCard.Badge>{plan.badge}</PricingCard.Badge>
                    )}
                  </PricingCard.Plan>
                  
                  <PricingCard.Price>
                    <PricingCard.MainPrice>{plan.price}</PricingCard.MainPrice>
                    <PricingCard.Period>{plan.period}</PricingCard.Period>
                  </PricingCard.Price>

                  <Button
                    variant={isFeatured ? "default" : "outline"}
                    className={cn(
                      'w-full font-bold py-6 rounded-xl transition-all',
                      isFeatured 
                        ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] hover:opacity-90 text-white shadow-lg shadow-[#6C5CE7]/30 border-transparent'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                    )}
                    onClick={() => handlePlanSelect(plan.name, plan.priceId)}
                    disabled={isLoading !== null}
                  >
                    {isLoading === plan.name ? "Processing..." : plan.buttonLabel}
                  </Button>
                </PricingCard.Header>

                <PricingCard.Body>
                  <PricingCard.Description>
                    {plan.description}
                  </PricingCard.Description>
                  <PricingCard.List>
                    {plan.features.map((item) => (
                      <PricingCard.ListItem key={item}>
                        <CheckCircle2
                          className={cn("h-4 w-4 shrink-0 mt-0.5", isFeatured ? "text-[#6C5CE7]" : "text-slate-400")}
                          aria-hidden="true"
                        />
                        <span className="text-slate-600">{item}</span>
                      </PricingCard.ListItem>
                    ))}
                  </PricingCard.List>
                </PricingCard.Body>
              </PricingCard.Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
