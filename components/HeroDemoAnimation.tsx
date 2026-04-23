"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2 } from "lucide-react";

const steps = [
  {
    image: "/images/dashboard.png",
    name: "Dashboard",
    cursor: { x: "40%", y: "45%", click: false },
    text: "Welcome back, Admin"
  },
  {
    image: "/images/schedule.png",
    name: "Schedule",
    cursor: { x: "12%", y: "35%", click: true },
    text: "Smart Scheduling"
  },
  {
    image: "/images/analytics.png",
    name: "Analytics",
    cursor: { x: "12%", y: "55%", click: true },
    text: "Deep Insights"
  },
  {
    image: "/images/reports.png",
    name: "Reports",
    cursor: { x: "12%", y: "75%", click: true },
    text: "detailed Reporting"
  }
];

const HeroDemoAnimation = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full aspect-[16/10] bg-white dark:bg-slate-950 rounded-[2.5rem] overflow-hidden border border-border shadow-2xl relative">
      
      {/* 1. Main UI Content (Real Screenshots) */}
      <AnimatePresence mode="wait">
        <motion.div
           key={index}
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.95 }}
           transition={{ duration: 0.8, ease: "easeInOut" }}
           className="absolute inset-0"
        >
           <img 
             src={steps[index].image} 
             alt={steps[index].name}
             className="w-full h-full object-cover object-top"
           />
           
           {/* Overlay Gradient for "Real Video" feel */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* 2. Simulated Cursor Interaction */}
      <motion.div
        animate={{ 
           x: steps[index].cursor.x, 
           y: steps[index].cursor.y,
           scale: steps[index].cursor.click ? [1, 0.8, 1] : 1
        }}
        transition={{ duration: 1.2, ease: "anticipate" }}
        className="absolute z-50 pointer-events-none"
        style={{ left: 0, top: 0 }}
      >
         <div className="relative">
            <MousePointer2 className="w-6 h-6 text-brand-primary fill-white drop-shadow-lg" />
            
            {/* Click Ripple Effect */}
            {steps[index].cursor.click && (
               <motion.div 
                 initial={{ scale: 0, opacity: 0.5 }}
                 animate={{ scale: 4, opacity: 0 }}
                 transition={{ duration: 0.8 }}
                 className="absolute inset-0 bg-brand-primary rounded-full -z-10"
               />
            )}
         </div>
      </motion.div>

      {/* 3. Status Toast (Floating Badge) */}
      <motion.div 
        key={`badge-${index}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 left-6 px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-brand-primary/20 flex items-center gap-3 z-40"
      >
         <div className="w-3 h-3 rounded-full bg-brand-primary animate-pulse" />
         <span className="text-xs font-black uppercase tracking-widest text-brand-dark dark:text-white">
            Viewing: {steps[index].name}
         </span>
      </motion.div>

      {/* 4. Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-white/10 z-50 overflow-hidden">
         <motion.div 
           key={`progress-${index}`}
           initial={{ x: "-100%" }}
           animate={{ x: "0%" }}
           transition={{ duration: 5, ease: "linear" }}
           className="h-full bg-brand-primary"
         />
      </div>

    </div>
  );
};

export default HeroDemoAnimation;
