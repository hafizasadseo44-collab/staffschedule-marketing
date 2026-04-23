"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Clock, Zap } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data/case-studies";

export default function FeaturedStory() {
  const featured = CASE_STUDIES[0]; // Global Coffee House

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden relative border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm mb-8 border border-brand-primary/20">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.8)]" /> 
              Featured Impact Story
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-brand-dark dark:text-white leading-[1.05] mb-6 tracking-tighter">
              {featured.title}
            </h2>
            
            <p className="text-xl lg:text-2xl text-brand-slate dark:text-slate-400 mb-10 leading-relaxed font-medium">
              {featured.summary}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-border shadow-xl shadow-brand-dark/5 dark:shadow-none hover:border-brand-primary/40 transition-colors">
                 <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-7 h-7 text-emerald-500" />
                 </div>
                 <h4 className="text-2xl font-black text-brand-dark dark:text-white mb-2">75% Less <br/> No-Shows</h4>
                 <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">Through decentralized P2P shift swapping.</p>
              </div>
              <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-border shadow-xl shadow-brand-dark/5 dark:shadow-none hover:border-brand-primary/40 transition-colors">
                 <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Clock className="w-7 h-7 text-indigo-500" />
                 </div>
                 <h4 className="text-2xl font-black text-brand-dark dark:text-white mb-2">15 Hours <br/> Saved / Wk</h4>
                 <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">Managers reclaim their weekends instantly.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href={`/customer-success/${featured.slug}`}>
                <button className="h-16 px-10 bg-brand-dark dark:bg-white text-white dark:text-brand-dark rounded-full font-black text-lg transition-all flex items-center gap-3 hover:scale-105 active:scale-95 shadow-xl">
                  Explore Implementation <ArrowRight className="w-6 h-6" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Visual/Media */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-brand-primary/30 via-transparent to-emerald-500/30 rounded-full blur-3xl opacity-50 z-0" />
            
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-2 border-white/10 dark:border-white/5 bg-slate-900 shadow-2xl shadow-brand-primary/20 group">
              <img 
                src={featured.heroImage} 
                alt={featured.companyName}
                className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-90"
              />
              
              <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] cursor-pointer hover:bg-brand-primary hover:border-brand-primary hover:scale-110 transition-all duration-300 group/play">
                    <Play className="w-10 h-10 text-white fill-white translate-x-[2px] child-transition" />
                 </div>
              </div>

              {/* Glass Card Quote */}
              <div className="absolute bottom-6 left-6 right-6">
                 <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <p className="text-white font-medium text-lg md:text-xl italic mb-6 leading-relaxed">
                      "{featured.quote.text}"
                    </p>
                    <div className="flex items-center gap-4">
                       <img 
                          src={featured.logo} 
                          alt="Company Logo" 
                          className="h-12 w-12 rounded-full border-2 border-white/20 bg-white"
                       />
                       <div>
                          <div className="font-bold text-white text-lg">{featured.quote.author}</div>
                          <div className="text-white/70 font-medium">{featured.quote.role}</div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
