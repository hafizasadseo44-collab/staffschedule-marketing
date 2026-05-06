"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as PricingCard from "@/components/ui/glass-pricing-card";
import { CheckCircle2, Zap, Building2, Crown } from "lucide-react";

const PricingTable = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans = [
    {
      icon: <Zap className="text-[#6C5CE7]" />,
      name: "Team",
      description: "Perfect for single locations",
      price: "$29",
      period: "/month",
      variant: "outline",
      buttonLabel: "Start 15-Day Free Trial",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY || "price_1T3jnOHtp8VMWVyUW7m27ulf",
      features: [
        "Up to 20 employees", 
        "1 location & 5 departments", 
        "Smart scheduling", 
        "Mobile app access", 
        "Direct messaging",
        "Basic reporting"
      ],
    },
    {
      icon: <Building2 className="text-[#6C5CE7]" />,
      name: "Business",
      description: "For growing multi-unit teams",
      badge: "Most Popular",
      price: "$50",
      period: "/month",
      variant: "default",
      buttonLabel: "Start 15-Day Free Trial",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY || "price_1T3jnsHtp8VMWVyUvZ67Eif5",
      features: [
        "Up to 50 employees", 
        "10 locations & 25 departments", 
        "Labor forecasting", 
        "POS integration", 
        "Premium support",
        "Team Chat & Swaps"
      ],
    },
    {
      icon: <Crown className="text-slate-700" />,
      name: "Company",
      description: "Unlimited scaling for large orgs",
      price: "$99",
      period: "/month",
      variant: "outline",
      buttonLabel: "Contact Sales",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPANY_MONTHLY || "price_1T3joMHtp8VMWVyUdizcksql",
      features: [
        "Unlimited employees", 
        "25 locations & 50 departments", 
        "API access & Webhooks", 
        "SSO & SAML Security", 
        "Custom onboarding",
        "Dedicated manager"
      ],
    },
  ];

  const handlePlanSelect = async (planName: string, priceId: string) => {
    setIsLoading(planName);
    if (planName === "Company") {
      window.location.href = "https://app.staffschedule.io/signup.php?start_trial=1";
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
      {/* Background Ornaments */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(rgba(108, 92, 231, 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(circle at 50% 10%, rgba(0,0,0,1), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 isolate hidden opacity-50 contain-strict lg:block pointer-events-none"
      >
        <div className="absolute top-0 left-[20%] h-[800px] w-[400px] -translate-y-[20%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(108,92,231,0.06)_0,rgba(108,92,231,0.02)_50%,transparent_100%)] blur-[40px]" />
        <div className="absolute top-0 right-[20%] h-[800px] w-[400px] -translate-y-[10%] rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(142,124,255,0.06)_0,rgba(142,124,255,0.02)_50%,transparent_100%)] blur-[40px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#6C5CE7] font-black text-[10px] uppercase tracking-widest mb-6 border border-slate-200 shadow-sm">
            Simple Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
            Choose the right plan for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]">your business</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed">
            Scale effortlessly with features designed for growth. Start free, upgrade when you need more power.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isFeatured = plan.variant === 'default';

            return (
              <PricingCard.Card 
                key={plan.name} 
                className={cn(
                  "w-full max-w-none transition-all duration-300",
                  isFeatured ? "ring-2 ring-[#6C5CE7] shadow-xl md:-translate-y-2 bg-white" : "bg-white/80 hover:bg-white hover:shadow-lg"
                )}
              >
                <PricingCard.Header glassEffect={isFeatured}>
                  <PricingCard.Plan>
                    <PricingCard.PlanName>
                      {plan.icon}
                      <span className={cn(isFeatured ? "text-slate-900" : "text-slate-700")}>{plan.name}</span>
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
                        ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] hover:opacity-90 text-white shadow-lg shadow-[#6C5CE7]/30'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
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
                          className={cn("h-5 w-5 shrink-0", isFeatured ? "text-[#6C5CE7]" : "text-slate-400")}
                          aria-hidden="true"
                        />
                        <span className={cn(isFeatured ? "text-slate-700 font-semibold" : "text-slate-600")}>{item}</span>
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
