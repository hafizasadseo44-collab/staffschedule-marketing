"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, MapPin, BarChart3, 
  MessageSquare, Bell, UserPlus, RefreshCw, 
  Smile, ClipboardList, Database, ShieldCheck,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Scheduling",
    desc: "Drag-and-drop visual builder with pattern cloning.",
    link: "/features/scheduling",
    color: "bg-indigo-500",
    size: "lg"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Attendance",
    desc: "GPS & Geofenced clock-ins via mobile app.",
    link: "/features/attendance",
    color: "bg-emerald-500",
    size: "sm"
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: "Availability",
    desc: "Staff-led availability blocks for better planning.",
    link: "/features/availability",
    color: "bg-amber-500",
    size: "sm"
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: "Leave Management",
    desc: "Automated holiday requests and balance tracking.",
    link: "/features/leave-management",
    color: "bg-rose-500",
    size: "sm"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Team Chat",
    desc: "Secure, real-time messaging for the whole team.",
    link: "/features/communication",
    color: "bg-purple-500",
    size: "lg"
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Announcements",
    desc: "Official noticeboard with read-receipts.",
    link: "/features/announcements",
    color: "bg-orange-500",
    size: "sm"
  },
  {
    icon: <UserPlus className="w-6 h-6" />,
    title: "Open Shifts",
    desc: "Post unfilled shifts for staff to claim instantly.",
    link: "/features/open-shifts",
    color: "bg-sky-500",
    size: "sm"
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Shift Swaps",
    desc: "Manager-free swap workflow with peer discovery.",
    link: "/features/shift-swaps",
    color: "bg-brand-primary",
    size: "sm"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Labor Analytics",
    desc: "Real-time daily spend and overtime alerts.",
    link: "/features/analytics",
    color: "bg-indigo-600",
    size: "lg"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Multi-Location",
    desc: "Manage franchises and regions from one hub.",
    link: "/features/multi-location",
    color: "bg-brand-dark",
    size: "sm"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Reporting",
    desc: "Export payroll-ready CSV and PDF reports.",
    link: "/features/reporting",
    color: "bg-slate-700",
    size: "sm"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Compliance",
    desc: "Automated auditing for labor laws and rest periods.",
    link: "/features/compliance",
    color: "bg-rose-600",
    size: "sm"
  }
];

export default function MegaFeaturesGrid() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 lg:mb-24">
           <h2 className="text-4xl md:text-5xl font-black text-brand-dark dark:text-white tracking-tight mb-4">
              Everything you need, <br className="hidden md:block"/>
              <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                in one professional tool.
              </span>
           </h2>
           <p className="text-lg text-brand-slate dark:text-slate-400 font-medium">Click any major feature to explore its deep-dive page.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">
           {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative group rounded-[2.5rem] p-8 border border-border shadow-sm flex flex-col justify-between overflow-hidden transition-all hover:shadow-2xl hover:border-brand-primary/20 bg-slate-50 dark:bg-slate-800 ${
                  f.size === "lg" ? "lg:col-span-2 md:col-span-2" : "col-span-1"
                }`}
              >
                {/* Background Hover Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                   <div className={`w-12 h-12 rounded-2xl ${f.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-4`}>
                      {f.icon}
                   </div>
                   <h3 className="text-xl font-black text-brand-dark dark:text-white tracking-tight leading-none mb-2">{f.title}</h3>
                   <p className="text-sm font-bold text-slate-400 group-hover:text-brand-slate dark:group-hover:text-slate-300 transition-colors">{f.desc}</p>
                </div>

                {f.link ? (
                  <Link href={f.link} className="relative z-10 self-end">
                     <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-border flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                     </div>
                  </Link>
                ) : (
                  <div className="self-end px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">Included</div>
                )}
                
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
