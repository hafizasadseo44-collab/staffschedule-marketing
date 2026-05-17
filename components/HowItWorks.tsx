"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserPlus, CalendarCheck2, LayoutDashboard,
  MessageSquare, MapPin, BarChart3,
  CheckCircle, Zap, Clock, Shield, TrendingUp, Users
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    id: "team",
    title: "Onboard Your Staff in Minutes",
    shortTitle: "Onboard Your Staff",
    desc: "Getting started takes less time than your morning coffee. Import your existing roster, invite team members via magic links, assign roles, set wages, and define locations — all from one clean dashboard. Your employee scheduling software is ready before your next shift begins.",
    Icon: UserPlus,
    gradient: "from-[#6366f1] to-[#4338ca]",
    glow: "rgba(99,102,241,0.15)",
    lightBg: "bg-indigo-50",
    lightText: "text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
    stats: [{ icon: Clock, label: "Setup in < 5 min" }, { icon: Users, label: "Unlimited Staff" }, { icon: Zap, label: "Magic Link Invite" }],
  },
  {
    num: "02",
    id: "schedule",
    title: "Build Shifts That Actually Work",
    shortTitle: "Build Perfect Shifts",
    desc: "Drag, drop, done. Our shift scheduling software lets you build weekly schedules in minutes — not hours. It automatically flags overtime risks, availability conflicts, and time-off requests before you hit publish. No more last-minute surprises.",
    Icon: CalendarCheck2,
    gradient: "from-[#8b5cf6] to-[#6d28d9]",
    glow: "rgba(139,92,246,0.15)",
    lightBg: "bg-purple-50",
    lightText: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
    stats: [{ icon: Zap, label: "Drag & Drop" }, { icon: Shield, label: "Conflict Detection" }, { icon: Clock, label: "Minutes, Not Hours" }],
  },
  {
    num: "03",
    id: "dashboard",
    title: "See Everything. Miss Nothing.",
    shortTitle: "Monitor in Real Time",
    desc: "Your live dashboard shows who's clocked in, who's running late, open shifts, and daily labor spend — all updated in real time. It's the shift tracker app your managers didn't know they needed, until now.",
    Icon: LayoutDashboard,
    gradient: "from-[#0ea5e9] to-[#0284c7]",
    glow: "rgba(14,165,233,0.15)",
    lightBg: "bg-sky-50",
    lightText: "text-sky-600",
    badge: "bg-sky-100 text-sky-700",
    stats: [{ icon: TrendingUp, label: "Live Updates" }, { icon: Clock, label: "Attendance Tracking" }, { icon: BarChart3, label: "Labor Cost View" }],
  },
  {
    num: "04",
    id: "chat",
    title: "Keep Your Team on the Same Page",
    shortTitle: "Communicate Instantly",
    desc: "No more scattered group chats or missed messages. Built-in team messaging lets managers broadcast announcements, confirm shift covers, and connect with any team member directly — all inside your staff scheduling app. Everyone stays informed, always.",
    Icon: MessageSquare,
    gradient: "from-[#10b981] to-[#059669]",
    glow: "rgba(16,185,129,0.15)",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    stats: [{ icon: Users, label: "Team Messaging" }, { icon: Zap, label: "Instant Alerts" }, { icon: CheckCircle, label: "Read Receipts" }],
  },
  {
    num: "05",
    id: "locations",
    title: "One Platform. Every Location.",
    shortTitle: "Scale Across Locations",
    desc: "Running more than one branch? No problem. Switch between locations instantly, share staff across sites, and manage every team from a single dashboard. Whether you have 3 stores or 300 — our workforce scheduling software scales with you, without the chaos.",
    Icon: MapPin,
    gradient: "from-[#f59e0b] to-[#d97706]",
    glow: "rgba(245,158,11,0.15)",
    lightBg: "bg-amber-50",
    lightText: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    stats: [{ icon: MapPin, label: "Multi-Location" }, { icon: Users, label: "Cross-Site Sharing" }, { icon: Shield, label: "Centralized Control" }],
  },
  {
    num: "06",
    id: "analytics",
    title: "Schedule Smarter, Spend Less",
    shortTitle: "Analyze & Optimize",
    desc: "Turn your scheduling data into real decisions. Track labor costs, spot overtime patterns, measure shift fill rates, and fine-tune your work scheduling strategy — week after week. Because great businesses don't just run schedules, they improve them.",
    Icon: BarChart3,
    gradient: "from-[#ec4899] to-[#db2777]",
    glow: "rgba(236,72,153,0.15)",
    lightBg: "bg-pink-50",
    lightText: "text-pink-600",
    badge: "bg-pink-100 text-pink-700",
    stats: [{ icon: TrendingUp, label: "Labor Insights" }, { icon: BarChart3, label: "Shift Fill Rates" }, { icon: CheckCircle, label: "Weekly Reports" }],
  },
];

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const Icon = step.Icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center"
    >
      {/* ── Number Column ── */}
      <div className={`flex flex-col gap-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        {/* Step badge */}
        <div className="flex items-center gap-4">
          <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg flex-shrink-0`}
            style={{ boxShadow: `0 8px 32px ${step.glow}` }}
          >
            <span className="text-white font-black text-xl leading-none">{step.num}</span>
            <div className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow`}>
              <Icon size={12} className="text-white" />
            </div>
          </div>
          <div>
            <span className={`text-xs font-black uppercase tracking-[0.2em] ${step.lightText}`}>Step {step.num}</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#0f172a] leading-tight mt-0.5">
              {step.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-[#64748b] leading-relaxed font-medium">
          {step.desc}
        </p>

        {/* Mini stat badges */}
        <div className="flex flex-wrap gap-2">
          {step.stats.map((s, i) => (
            <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${step.badge}`}>
              <s.icon size={12} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Visual Card Column ── */}
      <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div
          className="relative rounded-3xl overflow-hidden border border-white/80 shadow-2xl"
          style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", boxShadow: `0 25px 60px ${step.glow}, 0 0 0 1px rgba(255,255,255,0.6)` }}
        >
          {/* Top gradient band */}
          <div className={`h-2 w-full bg-gradient-to-r ${step.gradient}`} />

          <div className="p-6 md:p-8">
            {/* Icon header */}
            <div className="flex items-center justify-between mb-6">
              <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${step.lightBg}`}>
                <Icon size={18} className={step.lightText} />
                <span className={`font-black text-sm ${step.lightText}`}>{step.shortTitle}</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
              </div>
            </div>

            {/* Simulated UI content */}
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.08 + i * 0.1 + 0.3 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-white shadow-sm"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 opacity-${100 - i * 20}`}>
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`h-2.5 rounded-full bg-gradient-to-r ${step.gradient} opacity-${90 - i * 20}`} style={{ width: `${85 - i * 12}%` }} />
                    <div className="h-2 rounded-full bg-slate-100 mt-1.5" style={{ width: `${60 - i * 10}%` }} />
                  </div>
                  <div className={`text-xs font-bold ${step.lightText} ${step.lightBg} px-2 py-0.5 rounded-md`}>
                    {["Done", "Active", "Ready"][i - 1]}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom metric bar */}
            <div className={`mt-5 p-4 rounded-xl bg-gradient-to-r ${step.gradient} bg-opacity-10`}
              style={{ background: step.glow.replace("0.15", "0.08") }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${step.lightText}`}>Progress</span>
                <span className={`text-xs font-black ${step.lightText}`}>100%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/50 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${step.gradient}`}
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 1.2, delay: index * 0.08 + 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating glow orb */}
        <div
          className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${step.glow.replace("0.15", "0.8")}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-[#FAFBFF]" id="how-it-works">

      {/* ── Premium Mesh Background ── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[130px] -mr-60 -mt-60" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -ml-40 -mb-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/3 rounded-full blur-[100px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:36px_36px]" />
        <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-[#FAFBFF] to-transparent" />
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#FAFBFF] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-purple-100 shadow-sm mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
            <span className="text-xs font-black tracking-[0.2em] uppercase text-[#8b5cf6]">
              Simple · Powerful · Proven
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.1] mb-6">
            <span className="text-[#0f172a]">How </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]">StaffSchedule.io</span>
            <span className="text-[#0f172a]"> Works</span>
          </h2>

          <p className="text-lg md:text-xl text-[#64748b] font-medium leading-relaxed max-w-3xl mx-auto">
            From your first hire to your fiftieth shift — our staff scheduling platform is built to make workforce management feel effortless, not exhausting. <strong className="text-[#0f172a] font-bold">Six simple steps. Zero confusion.</strong>
          </p>

          {/* Decorative step count strip */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {STEPS.map((s, i) => (
              <div key={i} className={`h-1 rounded-full bg-gradient-to-r ${s.gradient} transition-all duration-300`}
                style={{ width: `${100 / STEPS.length}%`, maxWidth: "64px" }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Steps ── */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {STEPS.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex flex-col items-center gap-5 bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl rounded-3xl px-10 py-8"
            style={{ boxShadow: "0 20px 60px rgba(139,92,246,0.1), 0 0 0 1px rgba(255,255,255,0.8)" }}
          >
            <p className="text-xl font-black text-[#0f172a]">Ready to simplify your staff scheduling?</p>
            <a
              href="https://app.staffschedule.io/onboarding.php?start_trial=1"
              className="inline-flex items-center gap-3 h-14 px-10 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-black text-sm uppercase tracking-[0.1em] shadow-lg hover:shadow-purple-500/30 hover:scale-[1.03] transition-all active:scale-95"
              style={{ boxShadow: "0 10px 30px rgba(139,92,246,0.35)" }}
            >
              Start Your Free Trial
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <p className="text-xs text-[#94a3b8] font-medium">No credit card required · 14-day free trial · Cancel anytime</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
