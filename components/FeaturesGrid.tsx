"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CalendarCheck2, Users2, RefreshCw, BarChart3,
  MessageSquare, MapPin, BellRing, Brain
} from "lucide-react";
import { cn } from "@/lib/utils";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
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

export default function FeaturesGrid() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-24 lg:py-40 bg-gradient-to-b from-[#FAFBFE] to-white overflow-hidden relative font-sans">
      {/* Decorative Minimal Background Elements - Enhanced Vibrancy */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 to-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* Premium Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYzNjZmMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjA4Ii8+PC9zdmc+')] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* TOP: Centered Headers */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#6C5CE7] font-black text-[10px] uppercase tracking-[0.2em] mb-8 border border-slate-200 shadow-sm">
            Interactive Tour
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
            Everything you need to manage your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]">workforce smarter</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed">
            Powerful features designed to simplify scheduling and team management. Explore our platform ecosystem below.
          </motion.p>
        </motion.div>

        {/* CENTER: Radial Orbital Timeline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAFBFE] pointer-events-none z-10 h-32 bottom-0 top-auto" />
          <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_40px_100px_-20px_rgba(108,92,231,0.12)] overflow-hidden">
            <RadialOrbitalTimeline timelineData={featureTimelineData} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
