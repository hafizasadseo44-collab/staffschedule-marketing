"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Building2, Package, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free Trial",
    description: "Try every feature of StaffSchedule.io for 15 days.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "15-Day Full Access",
      "Up to 10 Team Members",
      "1 Office Location",
      "5 Main Departments",
      "Easy Schedule Builder",
      "Mobile App Included",
      "No Credit Card Needed"
    ],
    icon: Sparkles,
    buttonText: "Start Free Trial",
    popular: false,
    color: "emerald",
    href: "https://app.staffschedule.io/signup.php?start_trial=1"
  },
  {
    name: "Team",
    description: "Great for small teams starting out with a single location.",
    monthlyPrice: 29,
    yearlyPrice: 23,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY || "price_1T3jnOHtp8VMWVyUW7m27ulf",
    features: [
      "Up to 20 Team Members",
      "1 Office Location",
      "5 Departments",
      "1 Manager Account",
      "Weekly Schedule Builder",
      "Calendar View",
      "Time-Off Management"
    ],
    icon: Package,
    buttonText: "Join Team",
    popular: false,
    color: "indigo"
  },
  {
    name: "Business",
    description: "Advanced tools for growing companies with multiple sites.",
    monthlyPrice: 50,
    yearlyPrice: 40,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY || "price_1T3jnsHtp8VMWVyUvZ67Eif5",
    features: [
      "Up to 50 Team Members",
      "10 Global Locations",
      "25 Departments",
      "Unlimited Manager Accounts",
      "Team Chat & Messages",
      "Shift Trading & Swaps",
      "Business Analytics"
    ],
    icon: Zap,
    buttonText: "Get Business",
    popular: true,
    color: "violet"
  },
  {
    name: "Company",
    description: "Full control and priority support for large operations.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPANY_MONTHLY || "price_1T3joMHtp8VMWVyUdizcksql",
    features: [
      "Up to 100 Team Members",
      "25 Enterprise Locations",
      "50 Departments",
      "Open Shift Job Board",
      "24/7 Priority Support",
      "Security Audit Logs",
      "Custom Setup Help"
    ],
    icon: Building2,
    buttonText: "Scale with Company",
    popular: false,
    color: "pink"
  }
];

const PricingCard = ({ plan, index }: { plan: typeof plans[0], index: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handlePlanSelection() {
    if (plan.href) {
      window.location.href = plan.href;
      return;
    }

    const priceId = plan.priceId;
    if (priceId) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            priceId,
            planName: plan.name 
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
    }
  }

  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`relative flex flex-col h-full p-8 rounded-[2rem] border bg-white transition-shadow duration-300 ${
        plan.popular 
          ? "border-indigo-500 shadow-[0_20px_40px_-15px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/20" 
          : "border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-8 -translate-y-1/2">
          <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
          plan.popular ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-600"
        }`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">{plan.description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl font-bold tracking-tight text-slate-900">
            {plan.monthlyPrice === 0 ? "Free" : `$${plan.monthlyPrice}`}
          </span>
          {plan.monthlyPrice > 0 && <span className="text-slate-500 font-medium">/mo</span>}
        </div>
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex gap-3 items-start">
            <Check className={`w-5 h-5 shrink-0 ${plan.popular ? "text-indigo-500" : "text-slate-400"}`} />
            <span className="text-sm text-slate-700 font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handlePlanSelection}
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
          plan.popular
            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
            : "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100"
        }`}
      >
        {isLoading ? "Processing..." : plan.buttonText}
        {!isLoading && <ArrowRight className="w-4 h-4" />}
      </button>
    </motion.div>
  );
};

const PricingCards = () => {
  return (
    <section className="pb-24 bg-slate-50 relative z-20 -mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
