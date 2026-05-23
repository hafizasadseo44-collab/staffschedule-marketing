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
    title: "Smart Staff Scheduling",
    date: "Core Feature · Scheduling",
    content: "Easily create team schedules in just a few clicks. StaffSchedule.io helps managers create shifts, set work hours, add break times, assign roles, and include notes from one simple dashboard. Once schedules are published, employees can instantly view their shifts from the web or mobile app.",
    category: "Scheduling",
    icon: CalendarCheck2,
    relatedIds: [2, 6],
    status: "completed" as const,
    energy: 99,
  },
  {
    id: 2,
    title: "Team Management",
    date: "Core Feature · Workforce",
    content: "Easily add, edit, or manage team members from one simple dashboard. Set employee access levels, add staff details, and send secure invite links by email so employees can quickly join your workspace and access their schedules.",
    category: "Management",
    icon: Users2,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Shift Swap System",
    date: "Active · Flexibility",
    content: "StaffSchedule.io includes a simple shift swap system that allows employees to exchange shifts with teammates quickly and easily. It helps teams stay flexible and manage last-minute schedule changes without confusion.",
    category: "Operations",
    icon: RefreshCw,
    relatedIds: [1, 6],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Multi-Location Management",
    date: "Active · Scale",
    content: "No matter how many branches your business has, StaffSchedule.io keeps every team, location, and employee schedule organized in one place with our multi-location staff scheduling system.",
    category: "Enterprise",
    icon: MapPin,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 5,
    title: "Team Chat & Communication",
    date: "Active · Communication",
    content: "Chat with your team, discuss schedules, and share important updates from one simple dashboard. StaffSchedule.io helps businesses avoid messy WhatsApp groups by keeping team communication and staff scheduling together in one place.",
    category: "Communication",
    icon: MessageSquare,
    relatedIds: [1, 6],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 6,
    title: "Smart Alerts & Notifications",
    date: "Active · Automation",
    content: "StaffSchedule.io sends smart notifications through email, mobile and in-app alerts to keep employees updated about upcoming shifts, open shifts, leave requests and team announcements. This helps teams stay organized and avoid missed updates.",
    category: "Automation",
    icon: BellRing,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 96,
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
            Our Staff Scheduling Software Has All the Tools to Make <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 drop-shadow-md">Employee Scheduling Easy</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg sm:text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            StaffSchedule.io comes with easy-to-use scheduling tools that help managers and teams handle daily scheduling tasks without confusion. From shift planning to team management, everything is designed to make work faster, simpler, and more organized.
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
