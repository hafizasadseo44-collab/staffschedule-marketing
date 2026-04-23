"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ShieldCheck, Zap, CalendarDays, RefreshCw } from "lucide-react";

interface SimulationDashboardProps {
  isActive: boolean;
  updateCursor?: (x: number, y: number, clicking?: boolean) => void;
}

export default function SimulationDashboard({ isActive, updateCursor }: SimulationDashboardProps) {
  const [step, setStep] = useState(0);
  
  // Data States to simulate real-time updates
  const [data, setData] = useState({
     staff: 42,
     coverage: 95,
     openShifts: 3,
     leaveReqs: 1,
     chartHeights: [40, 65, 85, 45, 90, 100, 75],
     activeStaff: [
       { name: "Sarah Connor", role: "Manager", time: "09:00 - 17:00", color: "bg-blue-500" },
       { name: "John Smith", role: "Cashier", time: "10:00 - 18:00", color: "bg-emerald-500" },
       { name: "Mike Johnson", role: "Stock", time: "12:00 - 20:00", color: "bg-purple-500" },
     ]
  });

  useEffect(() => {
    if (!isActive || !updateCursor) {
      setStep(0);
      return;
    }

    let isMounted = true;
    let timeoutId: any;

    const runLoop = async () => {
      while (isMounted) {
        setStep(0);
        updateCursor(80, 80); // Start cursor 
        setData({
          staff: 42, coverage: 95, openShifts: 3, leaveReqs: 1,
          chartHeights: [40, 65, 85, 45, 90, 100, 75],
          activeStaff: [
            { name: "Sarah Connor", role: "Manager", time: "09:00 - 17:00", color: "bg-blue-500" },
            { name: "John Smith", role: "Cashier", time: "10:00 - 18:00", color: "bg-emerald-500" },
            { name: "Mike Johnson", role: "Stock", time: "12:00 - 20:00", color: "bg-purple-500" },
          ]
        });

        // 1. Wait, let user see initial load
        await new Promise(r => { timeoutId = setTimeout(r, 2000); });
        if (!isMounted) break;

        // 2. Cursor moves to Refresh Button
        updateCursor(90, 15);
        await new Promise(r => { timeoutId = setTimeout(r, 800); });
        if (!isMounted) break;

        // 3. Click Refresh
        updateCursor(90, 15, true);
        setStep(1); // Triggers spinning icon
        await new Promise(r => { timeoutId = setTimeout(r, 600); });
        if (!isMounted) break;

        // 4. Data Updates Live
        setData({
          staff: 45, // +3
          coverage: 100, // +5
          openShifts: 0, // Filled
          leaveReqs: 2, // New request
          chartHeights: [45, 70, 95, 50, 100, 100, 80], // Bars jump up slightly
          activeStaff: [
            { name: "Sarah Connor", role: "Manager", time: "09:00 - 17:00", color: "bg-blue-500" },
            { name: "John Smith", role: "Cashier", time: "10:00 - 18:00", color: "bg-emerald-500" },
            { name: "Mike Johnson", role: "Stock", time: "12:00 - 20:00", color: "bg-purple-500" },
            { name: "Emily Chen", role: "Host", time: "13:00 - 19:00", color: "bg-indigo-500" }, // New staff clocked in
          ]
        });

        // 5. Cursor views the left chart
        await new Promise(r => { timeoutId = setTimeout(r, 1500); });
        if (!isMounted) break;
        updateCursor(35, 60);

        // 6. Rest before restarting
        await new Promise(r => { timeoutId = setTimeout(r, 4000); });
      }
    };

    runLoop();
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isActive, updateCursor]);

  const stats = [
    { label: "Total Staff", value: data.staff, suffix: "", icon: Users, color: "text-blue-600", bg: "bg-blue-50", highlight: step === 1 },
    { label: "Coverage Today", value: data.coverage, suffix: "%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", highlight: step === 1 },
    { label: "Open Shifts", value: data.openShifts, suffix: "", icon: Zap, color: "text-amber-600", bg: "bg-amber-50", highlight: step === 1 },
    { label: "Leave Requests", value: data.leaveReqs, suffix: "", icon: CalendarDays, color: "text-purple-600", bg: "bg-purple-50", highlight: step === 1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 p-8 overflow-hidden pointer-events-none bg-white"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-start"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Real-Time Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">Live operational metrics across Main Branch.</p>
          </div>
          <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm">
             <RefreshCw className={`w-4 h-4 ${step === 1 ? 'animate-spin' : ''}`} />
             Live Sync
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`bg-white rounded-2xl p-5 border shadow-sm flex items-center gap-4 transition-colors duration-500 relative overflow-hidden ${stat.highlight ? 'border-indigo-300 bg-indigo-50/30' : 'border-slate-200'}`}
              >
                {stat.highlight && (
                   <motion.div 
                     initial={{ opacity: 1, scale: 0 }} 
                     animate={{ opacity: 0, scale: 2 }} 
                     transition={{ duration: 0.8 }} 
                     className="absolute inset-0 bg-indigo-400/10 pointer-events-none" 
                   />
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-800 tracking-tight flex items-baseline">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-lg">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts and Tables Area */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Main Chart (Weekly Hours) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-slate-800">Scheduled vs Actual Hours</h3>
              <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                This Week
              </div>
            </div>
            
            {/* Fake Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-3">
              {data.chartHeights.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <motion.div
                    animate={{ height: `${height}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 12 }}
                    className={`w-full rounded-t-lg relative group ${i === 2 ? 'bg-indigo-500' : 'bg-slate-200'}`}
                  >
                     <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold transition-opacity whitespace-nowrap">
                       {height} hrs
                     </div>
                  </motion.div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Shifts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-slate-800">On Shift Now</h3>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="space-y-4 flex-1 overflow-hidden">
              <AnimatePresence>
                {data.activeStaff.map((staff, i) => (
                  <motion.div 
                    key={staff.name} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${staff.color}`}>
                      {staff.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">{staff.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{staff.time} • {staff.role}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

// Simple internal component to animate numbers rolling up or down
function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    
    const duration = 800;
    const startTime = performance.now();
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + (end - start) * ease);
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue}</span>;
}
