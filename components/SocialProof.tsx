"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const SocialProof = () => {
  return (
    <section className="py-12 border-y border-border bg-white/50 dark:bg-brand-dark/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Rating */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-brand-amber fill-brand-amber" />
              ))}
            </div>
            <p className="text-sm font-black text-brand-dark dark:text-white">
              Rated 4.9/5 by 2,000+ HR Managers
            </p>
          </motion.div>

          {/* Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {["Innovate", "GlobalTech", "EcoSystems", "NextGen", "PeakFlow"].map((name) => (
               <motion.div
                 key={name}
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 className="text-2xl font-black tracking-tighter text-brand-slate whitespace-nowrap"
               >
                 {name}
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
