"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as PricingCard from "@/components/ui/new-pricing-card";
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
      description: "Ideal for growing multi-unit teams",
      badge: "Popular",
      price: "$50",
      period: "/month",
      variant: "default",
      buttonLabel: "Start 15-Day Free Trial",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY || "price_1T3jnsHtp8VMWVyUvZ67Eif5",
      features: [
        "All Team Plan Features",
        "Up to 50 employees", 
        "10 locations & 25 departments", 
        "Labor forecasting", 
        "POS integration", 
        "Premium support",
        "Team Chat & Swaps"
      ],
    },
    {
      icon: <Crown className="text-slate-400" />,
      name: "Company",
      description: "Perfect for large scale companies",
      price: "$99",
      period: "/month",
      variant: "outline",
      buttonLabel: "Contact Sales",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPANY_MONTHLY || "price_1T3joMHtp8VMWVyUdizcksql",
      features: [
        "All Business Plan Features",
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
    <section className="py-32 relative bg-slate-950 dark text-white overflow-hidden" id="pricing">
      {/* Subtle dotted grid from prompt */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.08) 0.8px, transparent 0.8px)',
          backgroundSize: '14px 14px',
          maskImage:
            'radial-gradient( circle at 50% 10%, rgba(0,0,0,1), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70% )',
        }}
      />

      {/* Left spotlight from prompt with brand colors */}
      <div
        aria-hidden="true"
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block pointer-events-none"
      >
        <div className="absolute top-0 left-0 h-[800px] w-[560px] -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(108,92,231,0.08)_0,rgba(108,92,231,0.02)_50%,transparent_80%)]" />
        <div className="absolute top-0 left-0 h-[800px] w-[240px] [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(142,124,255,0.06)_0,rgba(142,124,255,0.02)_80%,transparent_100%)]" />
        <div className="absolute top-0 left-0 h-[800px] w-[240px] -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(142,124,255,0.04)_0,rgba(108,92,231,0.02)_80%,transparent_100%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6C5CE7]/10 text-[#6C5CE7] font-black text-[10px] uppercase tracking-widest mb-6 border border-[#6C5CE7]/20 shadow-sm">
            Simple Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
            Plans that <span className="text-[#6C5CE7]">Scale with You</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 font-medium leading-relaxed">
            Start for free, then grow with us. Flexible plans for projects of all sizes.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto justify-items-center">
          {plans.map((plan) => {
            const isFeatured = plan.variant === 'default';

            return (
              <PricingCard.Card 
                key={plan.name} 
                className={cn(
                  "w-full transition-all duration-300 h-full",
                  isFeatured ? "md:-translate-y-2 border-[#6C5CE7]/50 shadow-[0_0_30px_-5px_rgba(108,92,231,0.3)]" : ""
                )}
              >
                <PricingCard.Header glassEffect={isFeatured}>
                  <PricingCard.Plan>
                    <PricingCard.PlanName>
                      {plan.icon}
                      <span className="text-slate-300 font-semibold">{plan.name}</span>
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
                        ? 'bg-[#6C5CE7] hover:bg-[#8E7CFF] text-white border-transparent'
                        : 'bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
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
                        <span className="text-slate-300">{item}</span>
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
