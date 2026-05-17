"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CalendarCheck2, Users2, RefreshCw, BarChart3,
  MessageSquare, MapPin, BellRing, Brain, Sparkles
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
    title: "Team Management",
    date: "Core Feature · Workforce",
    content: "Add staff, assign roles, set permissions, and manage your entire workforce from one place. Whether you have 10 employees or 500, keeping your team organized has never been this straightforward.",
    category: "Management",
    icon: Users2,
    relatedIds: [8, 2],
    status: "completed" as const,
    energy: 98,
  },
  {
    id: 2,
    title: "Shift Swaps",
    date: "Active · Flexibility",
    content: "Life happens. When someone can't make their shift, our staff scheduling app lets employees request swaps instantly — and managers approve them in one click. No group chats. No confusion. No no-shows.",
    category: "Operations",
    icon: RefreshCw,
    relatedIds: [5, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Multi-Location Management",
    date: "Active · Scale",
    content: "Managing more than one branch? Switch between locations in seconds, share staff across sites, and keep every team running smoothly — all from a single dashboard. Your workforce scheduling software grows with your business.",
    category: "Enterprise",
    icon: MapPin,
    relatedIds: [6, 1],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Team Chat",
    date: "Active · Communication",
    content: "Stop hunting through WhatsApp threads and missed calls. Built-in messaging lets you send shift announcements, handle 1:1 conversations, and broadcast updates to your entire team — right inside your employee scheduling app.",
    category: "Communication",
    icon: MessageSquare,
    relatedIds: [6, 3],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 5,
    title: "Smart Alerts",
    date: "Active · Automation",
    content: "Never get blindsided again. StaffSchedule.io automatically notifies managers about open shifts, late clock-ins, overtime risks, and availability conflicts — before they turn into real problems. Stay one step ahead, always.",
    category: "Automation",
    icon: BellRing,
    relatedIds: [2, 8],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 6,
    title: "Real-Time Analytics",
    date: "Active · Insights",
    content: "See exactly what's happening across your workforce — right now. Track labor costs, monitor scheduled vs actual hours, and spot inefficiencies before they hurt your bottom line. Data-driven work scheduling starts here.",
    category: "Analytics",
    icon: BarChart3,
    relatedIds: [7, 3],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 7,
    title: "AI Forecasting",
    date: "Active · Intelligence",
    content: "Stop guessing how many people you need next Friday. Our AI studies your historical data, peak hours, and seasonal trends to recommend the right staffing levels — so your shift scheduling software works smarter, not harder.",
    category: "AI",
    icon: Brain,
    relatedIds: [6, 8],
    status: "completed" as const,
    energy: 75,
  },
  {
    id: 8,
    title: "Smart Scheduling",
    date: "Core Feature · Automation",
    content: "Building a weekly schedule used to take hours. Now it takes minutes. Our online employee scheduling engine auto-fills shifts based on availability, roles, and labor rules — then flags anything that needs your attention. You stay in control. The platform does the heavy lifting.",
    category: "Scheduling",
    icon: CalendarCheck2,
    relatedIds: [7, 1],
    status: "completed" as const,
    energy: 99,
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
          className="text-center max-w-4xl mx-auto mb-20 relative"
        >
          {/* Subtle glow behind the heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-indigo-500/20 blur-[80px] pointer-events-none rounded-full" />

          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50/80 backdrop-blur-sm text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-8 border border-indigo-100 shadow-[0_4px_20px_-10px_rgba(99,102,241,0.4)]">
            <Sparkles size={14} className="text-indigo-500" />
            Interactive Tour
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.05] drop-shadow-sm">
            Everything Your Team Needs for <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-md">
              Smarter Staff Scheduling
            </span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg sm:text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            Most scheduling tools make you work around them. We built ours around you. From shift management to real-time insights — every feature in StaffSchedule.io solves a real problem your team faces every single week.
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
