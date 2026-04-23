"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Building2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PricingTable = () => {
  const plans = [
    {
      slug: "v1",
      name: "Team",
      desc: "Perfect for single locations",
      price: 29,
      features: [
        "Up to 20 employees", 
        "1 location & 5 departments", 
        "Smart scheduling", 
        "Mobile app access", 
        "Direct messaging",
        "Basic reporting"
      ],
      icon: <Zap className="w-6 h-6" />,
      highlight: false
    },
    {
      slug: "v2",
      name: "Business",
      desc: "For growing multi-unit teams",
      price: 50,
      features: [
        "Everything in Team, plus:",
        "Up to 50 employees", 
        "10 locations & 25 departments", 
        "Labor forecasting", 
        "POS integration", 
        "Premium support"
      ],
      icon: <Building2 className="w-6 h-6" />,
      highlight: true
    },
    {
      slug: "v3",
      name: "Enterprise",
      desc: "Unlimited scaling for large orgs",
      price: 99,
      features: [
        "Everything in Business, plus:",
        "Unlimited employees", 
        "25 locations & 50 departments", 
        "API access", 
        "SSO & SAML", 
        "Custom onboarding",
        "Dedicated manager"
      ],
      icon: <Crown className="w-6 h-6" />,
      highlight: false
    }
  ];

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900/50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-7xl font-black text-brand-dark dark:text-white mb-8">
            Simple, transparent <span className="text-brand-primary">pricing.</span>
          </h2>
          
          {/* We only offer monthly plans at this time */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex"
            >
              <div className={`flex flex-col w-full p-8 rounded-[3rem] border relative transition-all duration-500 ${
                p.highlight 
                  ? "bg-brand-dark text-white border-brand-primary shadow-[0_32px_64px_-16px_rgba(79,70,229,0.3)] scale-[1.05] z-10" 
                  : "bg-white dark:bg-slate-800 text-brand-dark dark:text-white border-border shadow-xl hover:-translate-y-2"
              }`}>
                {p.highlight && (
                   <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-brand-primary text-white border-none px-6 py-2 text-xs font-black uppercase tracking-widest shadow-xl">
                        Most Popular
                      </Badge>
                   </div>
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${
                  p.highlight ? "bg-brand-primary text-white" : "bg-brand-primary/10 text-brand-primary"
                }`}>
                  {p.icon}
                </div>

                <h3 className="text-2xl font-black mb-2">{p.name}</h3>
                <p className={`text-sm font-medium mb-8 ${p.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{p.desc}</p>

                <div className="mb-8">
                  <span className="text-5xl font-black">{typeof p.price === 'number' ? `$${p.price}` : p.price}</span>
                  {typeof p.price === 'number' && <span className={`text-sm font-bold ml-2 ${p.highlight ? 'text-slate-500' : 'text-slate-400'}`}>/month</span>}
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {p.features.map((f, fi) => (
                    <motion.div 
                      key={fi} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (fi * 0.1) }}
                    >
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        f.startsWith('Everything')
                          ? (p.highlight ? 'text-white/40' : 'text-slate-300')
                          : (p.highlight ? 'text-brand-primary' : 'text-brand-success')
                      }`} />
                      <span className={`text-sm font-bold ${
                        f.startsWith('Everything')
                          ? (p.highlight ? 'text-brand-primary/80 italic' : 'text-slate-500 italic')
                          : ''
                      }`}>{f}</span>
                    </motion.div>
                  ))}
                </div>

                <Link href={`https://app.staffschedule.io/signup.php?plan=${p.slug}`}>
                  <Button className={`w-full py-7 rounded-2xl text-lg font-black transition-all border-2 ${
                    p.highlight 
                      ? "bg-brand-primary border-brand-primary hover:bg-brand-primary/90 text-white shadow-xl shadow-brand-primary/40 hover:-translate-y-1" 
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-brand-dark dark:text-white hover:border-brand-primary hover:bg-brand-primary hover:text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/20"
                  }`}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
