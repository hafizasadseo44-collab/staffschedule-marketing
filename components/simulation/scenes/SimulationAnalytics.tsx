"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Clock, Users, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";

interface SimulationAnalyticsProps {
  isActive: boolean;
  updateCursor?: (x: number, y: number, clicking?: boolean) => void;
}

export default function SimulationAnalytics({ isActive, updateCursor }: SimulationAnalyticsProps) {
  useEffect(() => {
    if (!isActive || !updateCursor) return;

    const sequence = async () => {
      updateCursor(90, 80);

      // Simple interaction: move to download report button, then to side nav
      await new Promise(r => setTimeout(r, 1500));
      updateCursor(90, 15); // Hover Download
      await new Promise(r => setTimeout(r, 600));
      updateCursor(90, 15, true); // Click Download
      
      await new Promise(r => setTimeout(r, 1500));
      updateCursor(10, 31); // Sidebar Shift Swaps
      await new Promise(r => setTimeout(r, 600));
      updateCursor(10, 31, true); 
    };

    sequence();
  }, [isActive, updateCursor]);

  const stats = [
    { label: "Total Labor Cost", value: "$12,450", change: "+2.4%", trend: "up", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", line: "bg-emerald-500" },
    { label: "Overtime Hours", value: "32 hrs", change: "-14%", trend: "down", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", line: "bg-blue-500" },
    { label: "Shift Fill Rate", value: "98.5%", change: "+0.5%", trend: "up", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50", line: "bg-indigo-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 p-8 flex flex-col pointer-events-none"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-2xl font-bold text-slate-800 tracking-tight">Analytics Overview</div>
          <p className="text-sm text-slate-500 mt-1">Key performance metrics for the last 30 days.</p>
        </div>
        <div className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg shadow-sm flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Report
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                 <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {stat.change} <TrendIcon className="w-3 h-3" />
                 </div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div className="text-3xl font-black text-slate-800 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                {stat.label}
              </div>

              {/* Mini Sparkline Simulation */}
              <div className="mt-6 flex items-end gap-1 h-8 opacity-40">
                {[...Array(12)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 60 + 20}%` }}
                    transition={{ delay: 0.3 + j * 0.05, duration: 0.5 }}
                    className={`flex-1 rounded-t-sm ${stat.line}`}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Main Chart */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4 }}
           className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
             <div className="font-bold text-slate-800 text-base">Labor Cost Forecast vs Actuals</div>
             <div className="flex gap-4">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-200"></span><span className="text-[10px] font-bold text-slate-400 uppercase">Forecast</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-500"></span><span className="text-[10px] font-bold text-slate-400 uppercase">Actual</span></div>
             </div>
          </div>
          <div className="flex-1 flex items-end justify-between gap-4 px-2">
             {[
               { f: 40, a: 35 }, { f: 60, a: 65 }, { f: 55, a: 50 },
               { f: 80, a: 75 }, { f: 100, a: 95 }, { f: 70, a: 80 }
             ].map((col, i) => (
               <div key={i} className="flex-1 flex justify-center items-end gap-1 h-full relative">
                 <motion.div initial={{ height: 0 }} animate={{ height: `${col.f}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.7, type: "spring" }} className="w-full rounded-t-xl bg-slate-100" />
                 <motion.div initial={{ height: 0 }} animate={{ height: `${col.a}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 0.7, type: "spring" }} className="w-full rounded-t-xl bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]" />
                 <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 uppercase">Week {i+1}</span>
               </div>
             ))}
          </div>
          <div className="h-6" />
        </motion.div>

        {/* Roles Distribution */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5 }}
           className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
             <div className="font-bold text-slate-800 text-base">Hours by Department</div>
             <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-6">
             {[
               { name: "Front of House", pct: 45, val: "320 hrs", color: "bg-indigo-500" },
               { name: "Kitchen", pct: 35, val: "248 hrs", color: "bg-emerald-500" },
               { name: "Management", pct: 20, val: "142 hrs", color: "bg-blue-500" }
             ].map((dept, i) => (
               <div key={i}>
                 <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                   <span>{dept.name}</span>
                   <span className="text-slate-500">{dept.val} ({dept.pct}%)</span>
                 </div>
                 <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${dept.pct}%` }}
                     transition={{ delay: 0.8 + i * 0.2, duration: 1, ease: "easeOut" }}
                     className={`h-full rounded-full ${dept.color}`}
                   />
                 </div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
