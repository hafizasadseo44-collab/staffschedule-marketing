"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CalendarCheck2, Users2, RefreshCw, BarChart3,
  ArrowRight, Star, ShieldCheck, Clock, Users, Zap,
  MessageSquare, MapPin, BellRing, Brain
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

// --- Orbital Timeline Data (StaffSchedule.io Features) ---
const featureTimelineData = [
  {
    id: 1,
    title: "Smart Scheduling",
    date: "Core Feature",
    content: "AI-powered scheduling engine that creates optimized shift plans in seconds. Drag-and-drop simplicity meets intelligent automation.",
    category: "Scheduling",
    icon: CalendarCheck2,
    relatedIds: [2, 8],
    status: "completed" as const,
    energy: 98,
  },
  {
    id: 2,
    title: "Team Management",
    date: "Core Feature",
    content: "Manage your entire workforce — roles, departments, skills, certifications, and availability — all from one centralized hub.",
    category: "Management",
    icon: Users2,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Shift Swaps",
    date: "Core Feature",
    content: "Empower your staff to request and approve shift swaps instantly. Eliminate late-night texts and phone tag forever.",
    category: "Operations",
    icon: RefreshCw,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Real-Time Analytics",
    date: "Core Feature",
    content: "Track labor costs, overtime, attendance patterns, and team efficiency with beautiful, actionable dashboards.",
    category: "Analytics",
    icon: BarChart3,
    relatedIds: [3, 5],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 5,
    title: "Team Chat",
    date: "Communication",
    content: "Built-in messaging for shift announcements, 1:1 conversations, and team-wide broadcasts. No more scattered group chats.",
    category: "Communication",
    icon: MessageSquare,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 6,
    title: "Multi-Location",
    date: "Enterprise",
    content: "Manage unlimited locations with shared staff pools, per-site analytics, and cross-location scheduling flexibility.",
    category: "Enterprise",
    icon: MapPin,
    relatedIds: [5, 7],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 7,
    title: "Smart Alerts",
    date: "Automation",
    content: "Automated notifications for schedule changes, no-shows, overtime warnings, and shift reminders via push, SMS, and email.",
    category: "Automation",
    icon: BellRing,
    relatedIds: [6, 8],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 8,
    title: "AI Forecasting",
    date: "Coming Soon",
    content: "Predict staffing needs based on historical data, seasonal trends, and real-time demand signals. Always be perfectly staffed.",
    category: "AI",
    icon: Brain,
    relatedIds: [7, 1],
    status: "pending" as const,
    energy: 45,
  },
];

// --- Bottom Feature Cards ---
const FEATURE_CARDS = [
  {
    icon: <CalendarCheck2 className="w-6 h-6" />,
    title: "Smart Scheduling",
    desc: "Create optimized schedules in minutes with drag-and-drop simplicity.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: <Users2 className="w-6 h-6" />,
    title: "Team Management",
    desc: "Manage your team, roles, permissions, and availability in one place.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Shift Swaps",
    desc: "Let your team request and approve shift swaps effortlessly.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Reports & Analytics",
    desc: "Get real-time insights and make better decisions with powerful reports.",
    color: "bg-sky-50 text-sky-600",
  },
];

export default function FeaturesGrid() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 lg:py-40 bg-[#FAFBFE] overflow-hidden relative font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* TOP: Split Layout — Content + Orbital Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 lg:mb-40 items-center">

          {/* LEFT COLUMN: Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="lg:col-span-5"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-8 border border-indigo-100">
              <Star size={12} fill="currentColor" /> Powerful Features
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6 sm:mb-8 leading-[1.1] sm:leading-[1.05]">
              Everything you need to manage your <span className="text-indigo-600">workforce smarter</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg lg:text-xl text-slate-500 font-medium leading-relaxed mb-8 sm:mb-10">
              StaffSchedule.io comes packed with powerful features designed to simplify scheduling, reduce errors, and keep your team happy.
            </motion.p>

            <motion.div variants={fadeInUp} className="mb-12">
              <Link
                href="/features"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 group"
              >
                Explore All Features
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-y-6 gap-x-8">
              {[
                { icon: <ShieldCheck size={18} />, label: "Easy to use" },
                { icon: <Clock size={18} />, label: "Time saving" },
                { icon: <Users size={18} />, label: "Built for teams" },
                { icon: <Zap size={18} />, label: "Secure & Reliable" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-indigo-500 shadow-sm">
                    {item.icon}
                  </div>
                  {item.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Radial Orbital Timeline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-7 relative"
          >
            <div className="bg-slate-950 rounded-[2rem] border border-slate-800/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
              <RadialOrbitalTimeline timelineData={featureTimelineData} />
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: Feature Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {FEATURE_CARDS.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all group"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500", feature.color)}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{feature.desc}</p>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
