"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function Step3Operations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: "Fill Rate", value: "98%", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Labor Cost", value: "$3.2k", icon: DollarSign, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#F4F0FC] p-6 sm:p-8 flex flex-col font-sans overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
           <h3 className="text-xl font-bold text-slate-900 tracking-tight">Master Dashboard</h3>
           <p className="text-sm text-slate-500">Real-time operational insights.</p>
        </div>
        <div className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl shadow-sm flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
           <TrendingUp className="w-4 h-4" /> Export Report
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
         {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                 key={stat.label}
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
                 transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                 className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4"
              >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                     <Icon className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                     <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{stat.label}</div>
                  </div>
              </motion.div>
            )
         })}
      </div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={mounted ? { opacity: 1, y: 0 } : {}}
         transition={{ delay: 0.5, type: "spring" }}
         className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-1 flex flex-col min-h-0"
      >
         <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
               <Activity className="w-4 h-4 text-indigo-500" /> Live Staff Activity
            </h4>
         </div>

         <div className="flex-1 flex items-end justify-between gap-2 px-1 pb-1">
             {[45, 65, 30, 80, 50, 95, 75, 60, 85].map((height, i) => (
               <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group relative">
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={mounted ? { height: `${height}%` } : {}}
                   transition={{ delay: 0.8 + i * 0.05, duration: 0.8, type: "spring" }}
                   className={`w-full rounded-t-lg transition-colors ${i === 5 ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-indigo-100 group-hover:bg-indigo-300'}`}
                 />
                 <span className="text-[9px] font-bold text-slate-400 uppercase">{i + 8}a</span>
               </div>
             ))}
         </div>
      </motion.div>
    </motion.div>
  );
}
