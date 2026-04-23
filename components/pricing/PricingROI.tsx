"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, DollarSign, ArrowUpRight } from "lucide-react";

const stats = [
  {
    label: "Admin Time Saved",
    value: "15h",
    subtext: "per manager / week",
    description: "Eliminate manual data entry and redundancy.",
    icon: Clock,
    color: "indigo",
    progress: 75
  },
  {
    label: "Labor Cost Reduction",
    value: "22%",
    subtext: "avg. annual savings",
    description: "Optimize staffing levels based on real demand.",
    icon: DollarSign,
    color: "emerald",
    progress: 90
  },
  {
    label: "Team Engagement",
    value: "+35%",
    subtext: "retention increase",
    description: "Empower staff with flexibility and clarity.",
    icon: Users,
    color: "indigo",
    progress: 65
  },
  {
    label: "Compliance Accuracy",
    value: "100%",
    subtext: "audit-ready 24/7",
    description: "Radically reduce legal and operational risks.",
    icon: TrendingUp,
    color: "emerald",
    progress: 100
  }
];

const PricingROI = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-8">
              <ArrowUpRight className="w-3 h-3" />
              Efficiency Report
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              The math of modern operations.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
              StaffSchedule.io isn't just a tool; it's a financial catalyst. 
              Our customers see full platform payback within the first 60 days 
              of implementation.
            </p>
          </motion.div>

          {/* Featured Stat Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 lg:p-10 rounded-3xl bg-slate-50 border border-slate-200 relative overflow-hidden"
          >
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Economic Impact</div>
            <div className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">$24k+</div>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Average annual savings for a medium-sized enterprise scaling with 
              our Business features.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
               <motion.div
                 key={stat.label}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm"
               >
                 <div className="flex items-start justify-between mb-8">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      stat.color === "indigo" ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {/* Mini Progress Ring */}
                    <div className="w-10 h-10 relative">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                        <motion.circle 
                          cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" 
                          className={stat.color === "indigo" ? "text-indigo-500" : "text-emerald-500"}
                          strokeDasharray="100"
                          initial={{ strokeDashoffset: 100 }}
                          whileInView={{ strokeDashoffset: 100 - stat.progress }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </svg>
                    </div>
                 </div>
                 
                 <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                   {stat.value}
                 </div>
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                   {stat.subtext}
                 </div>
                 <h3 className="text-base font-bold text-slate-900 mb-2">{stat.label}</h3>
                 <p className="text-sm font-medium text-slate-500 leading-relaxed">
                   {stat.description}
                 </p>
               </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingROI;
