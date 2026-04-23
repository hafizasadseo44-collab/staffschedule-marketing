"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, TrendingUp, Sparkles, Quote, Building2, Users, MapPin, Star, CheckCircle2, XCircle, Zap } from "lucide-react";

// --- Animated Counter Hook ---
function useCountUp(target: number, duration: number = 2200, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return count;
}

// --- Stagger Container ---
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// --- Main Component ---
export default function CaseStudySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const timeSaved = useCountUp(42, 2200, isInView);
  const errorReduction = useCountUp(87, 2200, isInView);
  const productivityBoost = useCountUp(3, 2200, isInView);

  const beforeData = [
    { label: "Scheduling method", value: "Google Sheets + Email" },
    { label: "Conflicts per week", value: "15+" },
    { label: "Time to build weekly schedule", value: "6 hours" },
    { label: "Monthly overtime costs", value: "$52,000" },
    { label: "Staff satisfaction score", value: "2.1 / 5" },
  ];

  const afterData = [
    { label: "Scheduling method", value: "AI-Powered Automation" },
    { label: "Conflicts per week", value: "0" },
    { label: "Time to build weekly schedule", value: "12 minutes" },
    { label: "Monthly overtime costs", value: "$8,200" },
    { label: "Staff satisfaction score", value: "4.8 / 5" },
  ];

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 bg-white overflow-hidden border-t border-slate-100">
      {/* Subtle background glows */}
      <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-6 border border-indigo-100"
          >
            <Star size={12} fill="currentColor" /> Customer Success Story
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-4">
            Real Results. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">Real Impact.</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            See how leading organizations are transforming their workforce management with StaffSchedule.io
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* LEFT COLUMN: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {/* Company Info */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Building2 size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Greenfield Healthcare Group</h3>
                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Users size={14} className="text-indigo-400" /> 340 employees</span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-indigo-400" /> Chicago, IL</span>
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-[1.15] mb-8">
              "We eliminated double-bookings completely within{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">the first month</span>."
            </motion.h2>

            {/* Story */}
            <motion.div variants={fadeInUp} className="space-y-5 mb-10">
              <div className="flex gap-4 group">
                <div className="w-1 bg-gradient-to-b from-red-400 to-red-200 rounded-full shrink-0 group-hover:from-red-500 group-hover:to-red-300 transition-colors" />
                <div>
                  <h4 className="text-sm font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <XCircle size={14} /> The Challenge
                  </h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Managing 340 healthcare workers across 12 locations with spreadsheets was creating <span className="font-bold text-red-500">15+ scheduling conflicts</span> every week. Staff turnover was climbing and overtime costs reached <span className="font-bold text-red-500">$52K/month</span>.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="w-1 bg-gradient-to-b from-emerald-400 to-emerald-200 rounded-full shrink-0 group-hover:from-emerald-500 group-hover:to-emerald-300 transition-colors" />
                <div>
                  <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} /> The Solution
                  </h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    After deploying StaffSchedule.io, Greenfield automated shift assignments with <span className="font-bold text-emerald-600">AI-powered scheduling</span>, enabled real-time swap requests, and gained <span className="font-bold text-emerald-600">full visibility across all 12 locations</span>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Results Metrics */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-10">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 text-center cursor-default"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-1">{timeSaved}%</div>
                <div className="text-[10px] font-black text-indigo-600/70 uppercase tracking-widest">Time Saved</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 text-center cursor-default"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-1">{errorReduction}%</div>
                <div className="text-[10px] font-black text-emerald-600/70 uppercase tracking-widest">Fewer Errors</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 rounded-2xl p-6 text-center cursor-default"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 mb-1">{productivityBoost}x</div>
                <div className="text-[10px] font-black text-sky-600/70 uppercase tracking-widest">Faster</div>
              </motion.div>
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-indigo-100/50 rounded-2xl p-7 mb-10 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <Quote size={28} className="text-indigo-200 mb-3" />
              <p className="text-lg text-slate-800 font-semibold italic leading-relaxed mb-5">
                "StaffSchedule.io didn't just fix our scheduling — it <span className="text-indigo-600 not-italic font-black">transformed how we operate</span>. Our managers now spend their time on patient care, not fighting with spreadsheets."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-500/20">DR</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Dr. Rachel Simmons</div>
                  <div className="text-xs text-slate-500 font-medium">COO, Greenfield Healthcare Group</div>
                </div>
              </div>
            </motion.div>


          </motion.div>

          {/* RIGHT COLUMN: Before/After Visual */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="relative"
          >
            {/* Before Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              className="bg-white border border-red-100/80 rounded-2xl p-8 mb-6 shadow-sm hover:shadow-lg hover:shadow-red-500/5 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-[length:200%_100%] group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-red-100">
                <XCircle size={12} /> Before StaffSchedule.io
              </div>
              <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "show" : "hidden"} className="space-y-1">
                {beforeData.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={fadeInUp}
                    className="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                    <span className="text-sm font-black text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100/50">{item.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Transformation Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              className="flex justify-center -my-2 relative z-10"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap size={20} className="text-white" />
              </div>
            </motion.div>

            {/* After Card */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              className="bg-white border border-emerald-100/80 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:shadow-emerald-500/5 transition-all relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-[length:200%_100%] group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
                <CheckCircle2 size={12} /> After StaffSchedule.io
              </div>
              <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "show" : "hidden"} className="space-y-1">
                {afterData.map((item, i) => (
                  <motion.div
                    key={item.label}
                    variants={fadeInUp}
                    className="flex items-center justify-between py-3.5 border-b border-slate-50 last:border-0"
                  >
                    <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                    <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100/50">{item.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ROI Callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl p-7 text-center shadow-xl shadow-indigo-500/25 relative overflow-hidden cursor-default"
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" />
              <div className="relative z-10">
                <div className="text-white/70 text-xs font-black uppercase tracking-[0.2em] mb-2">Total Annual Savings</div>
                <div className="text-5xl font-black text-white mb-1">$525,600</div>
                <div className="text-indigo-200 text-sm font-semibold">in reduced overtime & operational costs</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Centered CTA below entire section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center mt-20"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:from-indigo-700 hover:to-purple-700 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all group"
          >
            View All Case Studies
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
