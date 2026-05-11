"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, Users, MessageSquare, Layers, 
  Utensils, ShoppingBag, HeartPulse, Hotel,
  CheckCircle2, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "Faster Employee Scheduling",
    description: "Create employee schedules in minutes instead of spending hours managing shifts manually.",
    icon: Zap,
    color: "indigo",
    className: "md:col-span-2 md:row-span-1",
    visual: (
      <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
        <Zap className="w-full h-full text-indigo-600" />
      </div>
    )
  },
  {
    title: "Better Shift Management",
    description: "Reduce scheduling conflicts, missed shifts, and communication issues.",
    icon: Layers,
    color: "purple",
    className: "md:col-span-1 md:row-span-2",
    visual: (
      <div className="mt-6 flex flex-col gap-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${80 - i * 15}%` }}
              className="h-full bg-purple-500"
            />
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Simple Team Coordination",
    description: "Keep employees updated with schedule changes and shift updates instantly.",
    icon: MessageSquare,
    color: "blue",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Flexible Workforce Scheduling",
    description: "Manage shift planning and team availability across multiple departments.",
    icon: Users,
    color: "emerald",
    className: "md:col-span-1 md:row-span-1",
  }
];

const industries = [
  { name: "Restaurants", icon: Utensils, desc: "Handle shifts & weekend rushes." },
  { name: "Retail Teams", icon: ShoppingBag, desc: "Organize busy business hours." },
  { name: "Healthcare", icon: HeartPulse, desc: "Efficient shift management." },
  { name: "Hospitality", icon: Hotel, desc: "Centralized staff dashboard." }
];

export default function TrustBento() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <CheckCircle2 size={12} /> Trusted by Managers Worldwide
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]"
          >
            Built for Real Teams and <br className="hidden md:block" />
            <span className="text-indigo-600">Real Scheduling Challenges</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl"
          >
            Managing employee schedules shouldn’t feel confusing, stressful, or time consuming. 
            StaffSchedule simplifies scheduling and keeps teams connected without the chaos of spreadsheets.
          </motion.p>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "group relative p-8 rounded-[2rem] border border-slate-100 bg-slate-50/50 backdrop-blur-sm overflow-hidden transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100",
                benefit.className
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500",
                benefit.color === "indigo" ? "bg-indigo-100 text-indigo-600" :
                benefit.color === "purple" ? "bg-purple-100 text-purple-600" :
                benefit.color === "blue" ? "bg-blue-100 text-blue-600" :
                "bg-emerald-100 text-emerald-600"
              )}>
                <benefit.icon size={24} strokeWidth={2.5} />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{benefit.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm max-w-[240px]">
                {benefit.description}
              </p>
              
              {benefit.visual}

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={20} className="text-slate-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Focus Section */}
        <div className="pt-16 border-t border-slate-100">
          <p className="text-center text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">
            Designed for Different Industries
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 transition-all group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:scale-110 shadow-sm border border-slate-100">
                  <industry.icon size={24} />
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-1 tracking-tight">{industry.name}</h4>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{industry.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Side Decorative Lines */}
      <div className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-transparent via-slate-100 to-transparent hidden lg:block" />
      <div className="absolute top-0 bottom-0 right-8 w-px bg-gradient-to-b from-transparent via-slate-100 to-transparent hidden lg:block" />
    </section>
  );
}
