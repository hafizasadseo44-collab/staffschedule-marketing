"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  CalendarCheck2, MessageSquare, MapPin, BarChart3,
  UserCheck, RefreshCw, BellRing, Clock,
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Users, Star,
  LayoutDashboard, Users2, Calendar, FileText, Settings, Search, Bell, User
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const DASHBOARD_STATS = [
  { label: "Total Employees", value: "128", growth: "+12%", color: "text-emerald-500" },
  { label: "Shifts This Week", value: "42", growth: "+8%", color: "text-indigo-500" },
  { label: "Open Shifts", value: "7", growth: "-15%", color: "text-rose-500" },
  { label: "Attendance", value: "96%", growth: "+5%", color: "text-sky-500" },
];

const SECONDARY_FEATURES = [
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
        
        {/* TOP SECTION: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 lg:mb-40 items-center">
          
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

            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.05]">
              Everything you need to manage your <span className="text-indigo-600">workforce smarter</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
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

          {/* RIGHT COLUMN: Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-7 relative group"
          >
            {/* Main Dashboard Card */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden relative z-20 group-hover:shadow-2xl transition-all duration-700">
              {/* Header */}
              <div className="h-16 border-b border-slate-100 px-6 flex items-center justify-between bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">S</div>
                  <span className="font-black text-slate-900 text-sm">StaffSchedule.io</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Bell size={18} />
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                    <User size={14} />
                    <span className="text-[10px] font-bold text-slate-600">Manager</span>
                  </div>
                </div>
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="w-16 md:w-48 border-r border-slate-50 p-4 space-y-2 hidden md:block">
                  {[
                    { icon: <LayoutDashboard size={18} />, label: "Overview", active: true },
                    { icon: <Calendar size={18} />, label: "Schedule" },
                    { icon: <Users size={18} />, label: "Employees" },
                    { icon: <Clock size={18} />, label: "Shifts" },
                    { icon: <FileText size={18} />, label: "Reports" },
                  ].map((item, i) => (
                    <div key={i} className={cn(
                      "flex items-center gap-3 p-2.5 rounded-xl transition-colors",
                      item.active ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:bg-slate-50"
                    )}>
                      {item.icon}
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 md:p-8 bg-slate-50/30">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-slate-900">Overview</h3>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {DASHBOARD_STATS.map((stat, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -4 }}
                        className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                      >
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="flex items-end gap-2">
                          <div className="text-xl font-black text-slate-900">{stat.value}</div>
                          <div className={cn("text-[10px] font-black", stat.color)}>{stat.growth}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Schedule Snippet */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-xs font-black text-slate-900">April 21 – April 27, 2026</div>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black">‹</div>
                        <div className="w-6 h-6 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black">›</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <div key={i} className="text-center">
                          <div className="text-[10px] font-bold text-slate-400 mb-4">{day}</div>
                          {i === 0 && <div className="h-20 bg-indigo-50 rounded-xl border border-indigo-100/50 p-2 text-left">
                            <div className="text-[8px] font-black text-indigo-600 mb-1">Morning Shift</div>
                            <div className="text-[8px] font-medium text-indigo-400">Anna</div>
                          </div>}
                          {i === 2 && <div className="h-20 bg-emerald-50 rounded-xl border border-emerald-100/50 p-2 text-left">
                            <div className="text-[8px] font-black text-emerald-600 mb-1">Evening Shift</div>
                            <div className="text-[8px] font-medium text-emerald-400">Sarah</div>
                          </div>}
                          {(i !== 0 && i !== 2) && <div className="h-20 bg-slate-50/50 rounded-xl border border-dashed border-slate-200" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-xl z-30 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Shift Confirmed</div>
                  <div className="text-[10px] font-medium text-slate-400">Instant notification sent</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: Feature Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {SECONDARY_FEATURES.map((feature, i) => (
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
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                {feature.desc}
              </p>
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
