"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sunrise, Sun, Sunset, Moon, Send, CheckCircle2, RefreshCcw } from "lucide-react";

const steps = [
  {
    time: "08:00 AM",
    label: "Morning Prep",
    title: "Build & Publish",
    desc: "Start your day with a clean slate. Clone your favorite template, adjust for today's requests, and publish to the whole team in one tap.",
    details: ["One-tap publishing", "Template cloning", "Conflicts flagged instantly"],
    icon: <Sunrise className="w-8 h-8" />
  },
  {
    time: "12:00 PM",
    label: "Lunch Rush",
    title: "Handle the Unexpected",
    desc: "Staff sick? Shift swap needed? Handle requests from your phone while you're on the move. The app mediates the change for you.",
    details: ["In-app swap requests", "Real-time notifications", "Auto-shift filling"],
    icon: <Sun className="w-8 h-8" />
  },
  {
    time: "06:00 PM",
    label: "Evening Transition",
    title: "Live Cost Tracking",
    desc: "Review labor spend against today's sales. Spot overtime risk before it happens and adjust the evening roster accordingly.",
    details: ["Real-time labor %", "Overtime alerts", "Sales integration"],
    icon: <Sunset className="w-8 h-8" />
  },
  {
    time: "11:00 PM",
    label: "Closing Time",
    title: "Verified Attendance",
    desc: "Every punch-in and punch-out was GPS-verified. Timesheets are ready for approval, and tomorrow's staff are already prepared.",
    details: ["GPS geofencing", "Digital timesheets", "Automatic break tracking"],
    icon: <Moon className="w-8 h-8" />
  }
];

export default function StickyScrollDaily() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-24">
            <motion.h2 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6"
            >
               A day with <span className="text-brand-primary underline decoration-brand-primary/20 underline-offset-8">StaffSchedule.</span>
            </motion.h2>
            <p className="text-lg text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto">
               From the first morning coffee to the last closing shift, we make every hour run smoother.
            </p>
         </div>

         <div className="flex flex-col gap-32">
            {steps.map((step, i) => (
               <div key={i} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                  <motion.div 
                     initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className={`flex-1 ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                           {step.icon}
                        </div>
                        <div>
                           <div className="text-brand-primary font-black tracking-widest uppercase text-xs">{step.time}</div>
                           <div className="text-brand-dark dark:text-white font-black text-xl">{step.label}</div>
                        </div>
                     </div>
                     <h3 className="text-3xl lg:text-4xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                        {step.title}
                     </h3>
                     <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10 leading-relaxed">
                        {step.desc}
                     </p>
                     <div className="flex flex-wrap gap-3">
                        {step.details.map((d, index) => (
                           <div key={index} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="text-sm font-black text-brand-dark dark:text-white">{d}</span>
                           </div>
                        ))}
                     </div>
                  </motion.div>

                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? 2 : -2 }}
                     whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className={`flex-1 relative ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                     <div className="relative aspect-[4/3] sm:aspect-video rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-border overflow-hidden group">
                        {i === 0 && (
                           <>
                              <img src="/images/morning-prep-v2.jpg" alt="Morning Prep" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                           </>
                        )}
                        {i === 1 && (
                           <>
                              <img src="/images/lunch-rush-v2.jpg" alt="Lunch Rush" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                           </>
                        )}
                        {i === 2 && (
                           <>
                              <img src="/images/cost-tracking-v2.jpg" alt="Cost Tracking" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                           </>
                        )}
                        {i === 3 && (
                           <>
                              <img src="/images/closing-time-v2.jpg" alt="Closing Time" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                           </>
                        )}
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/20 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold text-sm border border-white/20">
                           <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                           Real Workflow
                        </div>
                     </div>
                  </motion.div>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
}
