"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Team Plan",
    price: "$29",
    description: "Perfect for small teams and branch startups.",
    features: [
      "Up to 25 Users",
      "2 Locations",
      "2 Departments",
      "Standard Support",
      "Email Notifications",
    ],
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    name: "Business Plan",
    price: "$59",
    description: "The complete solution for growing businesses.",
    features: [
      "Up to 100 Users",
      "10 Locations",
      "10 Departments",
      "Priority Support",
      "Push Notifications",
      "Advanced Analytics",
    ],
    buttonText: "Join Business",
    popular: true,
  },
  {
    name: "Company Plan",
    price: "$199",
    description: "Enterprise power for large-scale operations.",
    features: [
      "Up to 1000 Users",
      "Unlimited Locations",
      "Unlimited Departments",
      "Dedicated Manager",
      "Custom Integrations",
      "Full API Access",
    ],
    buttonText: "Contact Sales",
    popular: false,
  }
];

const PricingPreview = () => {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6"
          >
            Transparent pricing for <br />
            <span className="text-brand-primary">every stage of growth.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-[2.5rem] border transition-all duration-300 ${
                plan.popular 
                  ? "bg-slate-900 border-brand-primary shadow-2xl shadow-brand-primary/20 scale-105 z-10" 
                  : "bg-white dark:bg-slate-800 border-border hover:border-brand-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className={`text-2xl font-black mb-2 ${plan.popular ? "text-white" : "text-brand-dark dark:text-white"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-8 font-medium ${plan.popular ? "text-slate-400" : "text-brand-slate dark:text-slate-400"}`}>
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-5xl font-black ${plan.popular ? "text-white" : "text-brand-dark dark:text-white"}`}>
                  {plan.price}
                </span>
                <span className={`text-lg font-bold ${plan.popular ? "text-slate-400" : "text-brand-slate dark:text-slate-500"}`}>
                  /mo
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-brand-primary text-white" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"}`}>
                      <Check className="w-3 h-3" strokeWidth={4} />
                    </div>
                    <span className={`text-sm font-bold ${plan.popular ? "text-slate-300" : "text-brand-slate dark:text-slate-300"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="https://app.staffschedule.io/onboarding.php"
                className={`block w-full py-4 rounded-2xl text-center font-black text-lg transition-all active:scale-95 ${
                  plan.popular 
                    ? "bg-brand-primary text-white hover:shadow-xl hover:shadow-brand-primary/30" 
                    : "bg-slate-100 dark:bg-slate-700 text-brand-dark dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
