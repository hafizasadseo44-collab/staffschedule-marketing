"use client";

import React from "react";
import { motion } from "framer-motion";

const METRICS = [
  { value: "12hrs", label: "Saved weekly" },
  { value: "18%", label: "Labor drop" },
  { value: "99.9%", label: "Shift coverage" },
  { value: "25k+", label: "Active users" }
];

export default function ROIBanner() {
  return (
    <section className="border-y border-slate-200 bg-white py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-100">
           {METRICS.map((metric, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
               className="flex flex-col items-center justify-center text-center"
             >
                <span className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-1 sm:mb-2">
                  {metric.value}
                </span>
                <span className="text-[10px] sm:text-sm lg:text-base font-bold text-brand-primary uppercase tracking-widest">
                  {metric.label}
                </span>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
