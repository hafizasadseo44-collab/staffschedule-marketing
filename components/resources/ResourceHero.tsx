"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Sparkles } from "lucide-react";
import Link from "next/link";

const ResourceHero = () => {
  return (
    <section className="relative pt-32 lg:pt-48 pb-20 lg:pb-32 overflow-hidden bg-brand-dark">
      {/* Background Cinematic Glows */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-primary/10 rounded-full blur-[160px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-[140px] -ml-64 -mb-64" />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col xl:flex-row items-center gap-16 lg:gap-24">
          {/* Left Content: Featured Spotlight */}
          <div className="flex-1 text-center xl:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-[0.2em] mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Monthly Spotlight
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10"
            >
              The AI-Powered <br />
              <span className="text-reveal">Schedule.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl mb-12"
            >
              How enterprise teams are using predictive intelligence to reduce 
              overtime by 15% without sacrificing team flexibility.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center xl:justify-start gap-8 mb-16 text-sm font-black text-slate-500 uppercase tracking-widest"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-primary" />
                By Dr. Marcus Thorne
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-amber" />
                12 Min Read
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-slate-400">
                Strategy
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/resources/ai-scheduling-2026"
                className="h-24 px-16 bg-white text-brand-dark rounded-[2.5rem] text-xl font-black inline-flex items-center gap-4 hover:bg-brand-primary hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)] active:scale-95 group"
              >
                Read Featured Article
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          {/* Right Content: Visuall Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-1 w-full max-w-3xl aspect-[4/3] rounded-[4rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 relative overflow-hidden group shadow-3xl"
          >
            {/* Conceptual Image Placeholder (Would be a real high-end image) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
            <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/10 transition-colors duration-700" />
            
            {/* Visual Glass Overlay */}
            <div className="absolute inset-x-12 bottom-12 p-10 rounded-[2.5rem] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-xl font-black text-white">Insight #402</div>
              </div>
              <p className="text-base text-slate-300 font-medium leading-relaxed">
                "The shift from reactive to proactive scheduling is no longer luxury—it's survival."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResourceHero;
