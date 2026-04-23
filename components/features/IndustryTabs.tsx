"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ShoppingBag, Stethoscope, HardHat, Check } from "lucide-react";

const industries = [
  {
    id: "hospitality",
    name: "Hospitality",
    icon: <Coffee className="w-5 h-5" />,
    title: "Perfect rotas for bars & restaurants.",
    desc: "Manage split shifts, dinner rushes, and floor sections with ease. StaffSchedule handles the complexity of late finishes and early starts.",
    points: ["Floor & Kitchen separation", "Server section assignments", "Late-night pay calculations", "Instant staff swap requests"]
  },
  {
    id: "retail",
    name: "Retail",
    icon: <ShoppingBag className="w-5 h-5" />,
    title: "Scale your store operations.",
    desc: "Coordinate store openings, inventory shifts, and peak season demand across all your locations from one master dashboard.",
    points: ["Opening & Closing checklists", "Visual heatmaps of staff density", "Multi-store staff sharing", "Holiday trading hour templates"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Stethoscope className="w-5 h-5" />,
    title: "Compliance-first scheduling.",
    desc: "Ensure care ratios and certifications are met for every shift. Automate complex rotation patterns for 24/7 coverage.",
    points: ["Mandatory rest period checks", "Certification tracking (CPR, etc.)", "On-call rotation management", "Patient-to-staff ratio alerts"]
  },
  {
    id: "construction",
    name: "Construction",
    icon: <HardHat className="w-5 h-5" />,
    title: "Site management made simple.",
    desc: "Track staff across multiple jobsites. Ensure the right skills are on-site every morning with real-time GPS clock-in.",
    points: ["Jobsite-specific scheduling", "Weather-delay rescheduling", "Skill & Tool requirements", "GPS-verified site attendance"]
  }
];

export default function IndustryTabs() {
  const [activeTab, setActiveTab] = useState(industries[0].id);
  const activeData = industries.find(ind => ind.id === activeTab)!;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6"
          >
            Built for your <span className="text-brand-primary">specific niche.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Every industry has different rules. StaffSchedule.io adapts to your workflow, 
            not the other way around.
          </motion.p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black transition-all ${
                activeTab === ind.id 
                  ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105" 
                  : "bg-white dark:bg-slate-800 text-brand-slate hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {ind.icon}
              {ind.name}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="relative bg-white dark:bg-brand-dark rounded-[3rem] p-8 lg:p-16 border border-border shadow-2xl overflow-hidden min-h-[450px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full"
            >
              <div>
                <div className="w-16 h-16 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-8 transition-transform hover:rotate-12">
                   {activeData.icon}
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                  {activeData.title}
                </h3>
                <p className="text-lg font-medium text-brand-slate dark:text-slate-400 mb-8 leading-relaxed">
                  {activeData.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeData.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                         <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="font-bold text-brand-dark dark:text-white text-sm">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-brand-primary/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-50 dark:bg-slate-900 aspect-video rounded-3xl border border-border flex items-center justify-center overflow-hidden">
                   {/* HD Photographic Industry Visuals */}
                   {activeData.id === "hospitality" && (
                      <img src="/images/industry-hospitality-v2.jpg" alt="Hospitality Scheduling" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                   )}
                   
                   {activeData.id === "retail" && (
                      <img src="/images/industry-retail-v2.jpg" alt="Retail Scheduling" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                   )}

                   {activeData.id === "healthcare" && (
                      <img src="/images/industry-healthcare-v2.jpg" alt="Healthcare Scheduling" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                   )}

                   {activeData.id === "construction" && (
                      <img src="/images/industry-construction-v2.jpg" alt="Construction Scheduling" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                   )}
                   
                   <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
