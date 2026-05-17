"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, Sparkles, Quote, Building2, Users, MapPin, 
  Star, CheckCircle2, XCircle, Zap, ShieldAlert 
} from "lucide-react";

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

// --- Animation Configs ---
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
};

export default function CaseStudySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const timeSaved = useCountUp(42, 2200, isInView);
  const errorReduction = useCountUp(87, 2200, isInView);
  const productivityBoost = useCountUp(3, 2200, isInView);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 bg-gradient-to-b from-white to-[#FAF9FF] overflow-hidden border-t border-slate-100 font-sans">
      {/* Decorative premium glows */}
      <div className="absolute top-[-250px] right-[-200px] w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05),transparent_65%)] pointer-events-none" />
      
      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[100px] bg-indigo-500/10 blur-[80px] pointer-events-none rounded-full" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50/80 backdrop-blur-sm text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6 border border-indigo-100 shadow-sm"
          >
            <Sparkles size={12} className="text-indigo-500" /> Customer Success Story
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-6">
            From Scheduling Chaos to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-sm">Complete Control</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Numbers don't lie — and neither do our customers. See how real businesses used StaffSchedule.io to fix their staff scheduling problems and take back control of their time, teams, and costs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* LEFT COLUMN: Narrative Case Study */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-10"
          >
            {/* Company Block */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Building2 size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">Greenfield Healthcare Group</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                  <span className="flex items-center gap-1"><Users size={12} className="text-indigo-400" /> 340 Employees</span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-indigo-400" /> Chicago, IL</span>
                </div>
              </div>
            </motion.div>

            {/* Pull Quote Headline */}
            <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-[1.15]">
              "We eliminated double-bookings completely — <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 font-black">within the first month</span>."
            </motion.h3>

            {/* Before / After Story Blocks */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Challenge */}
              <div className="flex gap-4 group">
                <div className="w-1.5 bg-gradient-to-b from-red-500 to-red-300 rounded-full shrink-0 group-hover:from-red-600 group-hover:to-red-400 transition-colors" />
                <div className="bg-red-50/20 border border-red-100/30 p-5 rounded-2xl">
                  <h4 className="text-xs font-black text-red-500 uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
                    <ShieldAlert size={14} /> The Challenge
                  </h4>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">
                    Greenfield was managing 340 healthcare workers across 12 locations using nothing but spreadsheets and email chains. Every week brought at least 15 scheduling conflicts, staff were frustrated, and overtime costs were quietly eating through their budget — hitting $52,000 every single month. Something had to change.
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="flex gap-4 group">
                <div className="w-1.5 bg-gradient-to-b from-emerald-500 to-teal-300 rounded-full shrink-0 group-hover:from-emerald-600 group-hover:to-teal-400 transition-colors" />
                <div className="bg-emerald-50/20 border border-emerald-100/30 p-5 rounded-2xl">
                  <h4 className="text-xs font-black text-emerald-600 uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} /> The Solution
                  </h4>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">
                    They switched to StaffSchedule.io and the difference was immediate. Shift assignments became automated, staff could request swaps in real time, and managers finally had full visibility across all 12 locations — from one single dashboard. No more firefighting. Just clean, confident workforce scheduling.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Results Metrics */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/60 rounded-2xl p-4 text-center hover:scale-[1.03] transition-all">
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-1">{timeSaved}%</div>
                <div className="text-[10px] font-black text-indigo-600/80 uppercase tracking-widest leading-tight">Less Time on Scheduling</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/60 rounded-2xl p-4 text-center hover:scale-[1.03] transition-all">
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mb-1">{errorReduction}%</div>
                <div className="text-[10px] font-black text-emerald-600/80 uppercase tracking-widest leading-tight">Drop in Shift Conflicts</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100/60 rounded-2xl p-4 text-center hover:scale-[1.03] transition-all">
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 mb-1">{productivityBoost}x</div>
                <div className="text-[10px] font-black text-pink-600/80 uppercase tracking-widest leading-tight">Faster Schedule Builds</div>
              </div>
            </motion.div>

            {/* Testimonial Quote */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative"
            >
              <Quote size={32} className="text-indigo-200 absolute -top-4 -left-2 -z-10" />
              <p className="text-base text-slate-800 font-semibold italic leading-relaxed mb-6">
                "StaffSchedule.io didn't just fix our schedules — it changed how our whole operation runs. Our managers used to spend hours every week just figuring out who's working when. Now they spend that time with patients."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black">RS</div>
                <div>
                  <div className="text-sm font-black text-slate-900">Dr. Rachel Simmons</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">COO · Greenfield Healthcare Group</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Performance Comparison Table & ROI Callout */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-6 lg:sticky lg:top-8"
          >
            {/* Before vs After Table Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
                <Zap size={14} className="text-indigo-600 animate-pulse" /> Metric Transformation
              </h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100">Metric</th>
                      <th className="py-3 text-[10px] font-black text-red-500 uppercase tracking-[0.15em] border-b border-slate-100 pl-4">Before StaffSchedule.io</th>
                      <th className="py-3 text-[10px] font-black text-emerald-600 uppercase tracking-[0.15em] border-b border-slate-100 pl-4">After StaffSchedule.io</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { m: "Scheduling Method", b: "Google Sheets + Email", a: "Smart Automated Scheduling", isBest: true },
                      { m: "Conflicts Per Week", b: "15+", a: "0", isBest: true },
                      { m: "Time to Build Schedule", b: "6 Hours", a: "12 Minutes", isBest: true },
                      { m: "Monthly Overtime Costs", b: "$52,000", a: "$8,200", isBest: true },
                      { m: "Staff Satisfaction Score", b: "2.1 / 5", a: "4.8 / 5", isBest: true }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 text-xs font-black text-slate-800 leading-tight pr-2">{row.m}</td>
                        <td className="py-4 pl-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 bg-red-50/50 border border-red-100/60 px-2.5 py-1 rounded-lg">
                            <XCircle size={10} className="shrink-0" /> {row.b}
                          </span>
                        </td>
                        <td className="py-4 pl-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg shadow-sm">
                            <CheckCircle2 size={10} className="shrink-0" /> {row.a}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Savings Banner Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[2.5rem] p-8 text-center shadow-xl shadow-indigo-500/25 relative overflow-hidden group cursor-default"
            >
              {/* Animated Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-white/80 text-[10px] font-black uppercase tracking-[0.25em] mb-3 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                  Total Annual Savings
                </div>
                <div className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-3 drop-shadow-md">
                  $525,600
                </div>
                <p className="text-indigo-100 text-sm font-semibold max-w-sm leading-relaxed">
                  Saved in overtime costs, reduced conflicts, and recovered manager hours — in just one year.
                </p>
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
            href="https://app.staffschedule.io/onboarding.php"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all group"
          >
            Calculate Your Savings
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
