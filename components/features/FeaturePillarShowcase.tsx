"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, MessageSquare, BarChart3, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const pillars = [
  {
    title: "Streamlined Operations",
    badge: "Core Logistics",
    desc: "From complex multi-site rotations to simple shift swaps, we automate the heavy lifting of labor management.",
    features: ["Automated Conflict Detection", "Open Shift Marketplace", "Real-world Payroll Export", "Global Labor Rules"],
    image: "/images/features-reporting-v1.jpg",
    icon: <Zap className="w-5 h-5 text-brand-primary" />,
    reverse: false
  },
  {
    title: "Connected Workforce",
    badge: "Staff Experience",
    desc: "Empower your team with professional communication tools. No more group texts or missed messages.",
    features: ["Internal Messenger Hub", "Official Noticeboard", "Read-Receipt Tracking", "Instant Push Alerts"],
    image: "/images/features-chat-v1.jpg",
    icon: <MessageSquare className="w-5 h-5 text-purple-500" />,
    reverse: true
  },
  {
    title: "Operational Intelligence",
    badge: "Business Growth",
    desc: "Gain a competitive edge with real-time data. Stop guessing your labor costs and start optimizing.",
    features: ["Daily Cost-Bleed Analysis", "District Benchmarking", "Predictive Overtime Alerts", "Custom Executive Reports"],
    image: "/images/multi-location-global-v1.jpg",
    icon: <BarChart3 className="w-5 h-5 text-brand-primary" />,
    reverse: false
  }
];

export default function FeaturePillarShowcase() {
  return (
    <div className="bg-slate-50 dark:bg-brand-dark py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-48">
        
        {pillars.map((pillar, i) => (
          <section key={i} className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${pillar.reverse ? 'lg:flex-row-reverse' : ''}`}>
            
            <div className="flex-1 w-full sm:w-[80%] lg:w-full">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotate: pillar.reverse ? -2 : 2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  className="relative group rounded-[3rem] overflow-hidden shadow-2xl border border-border aspect-square sm:aspect-video lg:aspect-[4/3]"
               >
                  <Image 
                     src={pillar.image} 
                     alt={pillar.title} 
                     fill 
                     className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
                  
                  {/* Floating Icon Pill */}
                  <motion.div 
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.5 }}
                     className="absolute top-8 right-8 w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center border border-brand-primary/20"
                  >
                     {pillar.icon}
                  </motion.div>
               </motion.div>
            </div>

            <div className="flex-1">
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
               >
                  {pillar.badge}
               </motion.div>
               <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
               >
                  {pillar.title}
               </motion.h2>
               <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10 leading-relaxed"
               >
                  {pillar.desc}
               </motion.p>
               
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {pillar.features.map((feature, j) => (
                    <motion.li 
                       key={j}
                       initial={{ opacity: 0, x: -10 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.2 + (j * 0.1) }}
                       className="flex items-center gap-3"
                    >
                       <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" />
                       </div>
                       <span className="text-brand-dark dark:text-white font-bold tracking-tight">{feature}</span>
                    </motion.li>
                  ))}
               </ul>
            </div>

          </section>
        ))}

      </div>
    </div>
  );
}
