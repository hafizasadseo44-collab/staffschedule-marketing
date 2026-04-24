"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeatureHeroProps {
  badge: string;
  title: React.ReactNode;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  visual?: React.ReactNode;
}

export default function FeatureHero({
  badge,
  title,
  description,
  ctaText = "Start Free Trial",
  ctaLink = "https://app.staffschedule.io/signup.php",
  secondaryCtaText = "Contact Sales",
  secondaryCtaLink = "/contact",
  visual
}: FeatureHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div suppressHydrationWarning className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-brand-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {badge}
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-brand-dark dark:text-white mb-6 leading-[1.05] tracking-tight">
              {title}
            </h1>
            
            <p className="text-lg lg:text-xl text-brand-slate dark:text-slate-400 font-medium mb-10 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href={ctaLink}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-14 px-8 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-primary/25 transition-all hover:scale-105 active:scale-95 flex items-center"
                )}
              >
                {ctaText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                href={secondaryCtaLink}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-14 px-8 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center"
                )}
              >
                {secondaryCtaText}
              </Link>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {visual ? (
              visual
            ) : (
              <div className="relative aspect-square lg:aspect-video bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-2xl overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-transparent" />
                 {/* Placeholder graphic */}
                 <div className="flex items-center justify-center h-full">
                    <div className="text-slate-200 dark:text-slate-800 font-black text-9xl select-none rotate-12 group-hover:rotate-0 transition-transform duration-700">
                      UI
                    </div>
                 </div>
              </div>
            )}
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-secondary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
