"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const LogoMarquee = () => {
  const logos = [
    "MedGroup", "RetailFlow", "CityHealth", "MarketDash", "CareSync",
    "LogiTrack", "StaffSmart", "PrimeOps", "BuildRight", "ServiceAce"
  ];
  
  return (
    <div className="mt-32 relative w-full overflow-hidden py-10 border-t border-slate-100">
      <div className="flex items-center gap-4 mb-12 justify-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Trusted by Global Enterprises</span>
      </div>
      
      <div className="relative">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 items-center whitespace-nowrap px-12"
        >
           {[...logos, ...logos, ...logos].map((logo, i) => (
             <span key={i} className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-300 cursor-default select-none transition-colors hover:text-slate-400">
               {logo}
             </span>
           ))}
        </motion.div>
        
        {/* Superior Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};

const PricingHero = () => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-slate-50">
      {/* Very Subtle Background Texture */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtle Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
            <Award className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-semibold text-slate-600">Rated #1 in Workforce Optimization</span>
          </div>
 
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Simple pricing for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">elite teams.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            One transparent monthly rate to power your entire operation. No hidden fees. No complex tiers.
          </p>
        </motion.div>

        {/* Improved Logo Marquee Integration */}
        <div className="mt-20">
           <LogoMarquee />
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
