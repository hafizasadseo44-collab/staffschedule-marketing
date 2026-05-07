"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const floatingBadgeVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: [0, -12, 0],
    transition: {
      y: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
        delay: i * 0.6,
      },
      opacity: { duration: 0.8, delay: 0.8 + i * 0.2 },
    },
  }),
};

export default function AboutHero() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFBFF] pt-28 pb-20 lg:pt-36 lg:pb-32">
      {/* ── BACKGROUND ATMOSPHERE ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[radial-gradient(circle_at_70%_20%,rgba(79,70,229,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-[radial-gradient(circle_at_20%_80%,rgba(124,58,237,0.04)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#4F46E5 1px, transparent 0)", backgroundSize: "44px 44px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full mt-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          
          {/* ── LEFT CONTENT: TEXT & CTAs ── */}
          <div className="flex-[1.2] text-center lg:text-left">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-[11px] uppercase tracking-[0.25em] mb-8"
              style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.15)", color: "#4F46E5" }}
            >
              <Sparkles className="w-3 h-3" />
              Our Story & Vision
            </motion.div>

            {/* Headline: Responsive but wide */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
              className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 tracking-[-0.04em] leading-[1.1] sm:leading-[0.98] mb-6 sm:mb-8 lg:max-w-[12ch]"
            >
              Scaling <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text inline-block pb-1 sm:pb-3" style={{ backgroundImage: "linear-gradient(135deg,#4F46E5 0%, #3B82F6 100%)" }}>
                Human Potential.
              </span>
            </motion.h1>


            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg sm:text-xl text-slate-500 font-medium max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              We built StaffSchedule.io to replace the chaos of spreadsheets with the clarity of a perfect schedule. Our mission is to give every manager their time back and every employee a voice.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 items-center justify-center lg:justify-start mb-12"
            >
              <Link 
                href="https://app.staffschedule.io/onboarding.php"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-16 px-10 rounded-2xl text-white font-black text-lg transition-all hover:scale-105 active:scale-95 group flex items-center gap-3 relative overflow-hidden pt-0 pb-0"
                )}
                style={{ background: "linear-gradient(135deg,#4F46E5,#3B82F6)", boxShadow: "0 10px 40px rgba(79,70,229,0.3)" }}
              >
                <span className="relative z-10">Get Started Free</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                        <img 
                          src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                          alt="Customer Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                 </div>
                 <div className="text-left">
                    <div className="flex text-amber-400 w-3.5 h-3.5 gap-0.5 mb-0.5">
                       {[1,2,3,4,5].map(i => <Star key={i} className="fill-current" />)}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">10k+ Teams</p>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT CONTENT: THE VISUAL ── */}
          <div className="flex-1 w-full relative">
             <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.2)] border border-white/50 bg-slate-100"
             >
                <Image 
                  src="/about-hero.png"
                  fill
                  className="object-cover"
                  alt="StaffSchedule Modern Workplace"
                  priority
                />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Badges */}
                <motion.div 
                  custom={1}
                  variants={floatingBadgeVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute top-10 right-[-5%] lg:right-10 hidden sm:flex items-center gap-3 px-6 py-4 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl z-20"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                     <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 leading-tight">12.5 hrs</p>
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.1em] mt-0.5">Avg. Saved Weekly</p>
                  </div>
                </motion.div>

                <motion.div 
                  custom={2}
                  variants={floatingBadgeVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute bottom-10 left-[-5%] lg:left-10 hidden sm:flex items-center gap-3 px-6 py-4 rounded-3xl bg-slate-900 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20"
                >
                  <ShieldCheck className="w-6 h-6 text-brand-primary" />
                  <div>
                    <p className="font-black leading-tight tracking-tight">Bank-Grade</p>
                    <p className="text-[9px] font-black uppercase opacity-50 tracking-[0.1em]">AES-256 Security</p>
                  </div>
                </motion.div>
             </motion.div>
             
             {/* Decorative Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(79,70,229,0.06)_0%,transparent_60%)] -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
