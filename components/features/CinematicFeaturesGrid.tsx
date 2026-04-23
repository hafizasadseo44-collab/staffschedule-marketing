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
import { MicroSchedulingUI, MicroChatUI, MicroAnalyticsUI } from "./microui/MicroUIs";

const features = [
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Scheduling",
    desc: "Drag-and-drop visual builder with AI-powered pattern cloning.",
    link: "/features/scheduling",
    color: "from-indigo-500/20 to-brand-primary/10",
    visual: <MicroSchedulingUI />,
    size: "lg"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Attendance",
    desc: "GPS & Geofenced clock-ins with offline sync support.",
    link: "/features/attendance",
    color: "from-emerald-500/20 to-emerald-600/10",
    size: "sm"
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Team Chat",
    desc: "Secure, real-time messaging with individual & group channels.",
    color: "from-purple-500/20 to-purple-600/10",
    visual: <MicroChatUI />,
    size: "lg"
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: "Availability",
    desc: "Staff-led availability blocks for better work-life balance.",
    color: "from-amber-500/20 to-amber-600/10",
    size: "sm"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Labor Analytics",
    desc: "Real-time daily spend, budget tracking, and overtime alerts.",
    link: "/features/analytics",
    color: "from-blue-500/20 to-indigo-600/10",
    visual: <MicroAnalyticsUI />,
    size: "lg"
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: "Leave MGMT",
    desc: "Automated holiday requests and dynamic balance tracking.",
    color: "from-rose-500/20 to-rose-600/10",
    size: "sm"
  },
  {
    icon: <UserPlus className="w-6 h-6" />,
    title: "Open Shifts",
    desc: "Post unfilled shifts for eligible staff to claim instantly.",
    color: "from-sky-500/20 to-sky-600/10",
    size: "sm"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Multi-Location",
    desc: "Manage franchises and global regions from one dashboard.",
    link: "/features/multi-location",
    color: "from-slate-500/20 to-slate-800/10",
    size: "sm"
  }
];

export default function CinematicFeaturesGrid() {
  return (
    <section className="py-24 md:py-32 bg-brand-dark overflow-hidden relative noise-bg">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 lg:mb-24">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-primary font-black text-[10px] uppercase tracking-[0.2em] mb-6"
           >
             The Enterprise Arsenal
           </motion.div>
           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
              Built for your <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                expanding empire.
              </span>
           </h2>
           <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">Click any major feature to explore its deep-dive page.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
           {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -10 }}
                className={`group relative rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden flex flex-col p-8 transition-all hover:bg-white/[0.08] hover:border-brand-primary/30 shadow-2xl ${
                  f.size === "lg" ? "lg:col-span-2 md:col-span-2" : "col-span-1"
                } perspective-1000`}
              >
                {/* Visual Area */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                   <div className={`absolute inset-0 bg-gradient-to-br ${f.color} blur-3xl`} />
                   {f.visual && (
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                         {f.visual}
                      </div>
                   )}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform shadow-xl">
                         {f.icon}
                      </div>
                      {f.link && (
                         <Link href={f.link}>
                            <motion.div 
                               whileHover={{ rotate: -45, scale: 1.1 }}
                               className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg hover:shadow-brand-primary/40 transition-all"
                            >
                               <ArrowRight className="w-4 h-4" />
                            </motion.div>
                         </Link>
                      )}
                   </div>
                   
                   <div className="mt-auto">
                      <h3 className="text-2xl font-black text-white tracking-tight leading-none mb-3">{f.title}</h3>
                      <p className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed max-w-[80%]">{f.desc}</p>
                   </div>
                </div>

                {/* Glass Polish */}
                <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-[2.5rem] pointer-events-none" />
                
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
