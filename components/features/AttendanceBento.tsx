"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, TabletSmartphone, ShieldAlert, Download, Clock, Users } from "lucide-react";

export default function AttendanceBento() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-brand-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            Core Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            100% Accurate <br />
            <span className="text-emerald-500">Time & Attendance.</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
            Eliminate buddy punching and manual timesheets with GPS-verified clock-ins and automated payroll reports.
          </motion.p>
        </div>

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* 1. GPS Geofencing (Wide, Row 1, Col 1-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-emerald-600 rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group shadow-xl flex flex-col justify-center"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_center,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
             <div className="relative z-10 w-full sm:w-2/3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6 backdrop-blur-md">
                   <MapPin className="w-5 h-5 lg:w-6 lg:h-6 fill-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 lg:mb-3">GPS Geofencing</h3>
                <p className="text-emerald-50 font-medium text-sm sm:text-base leading-relaxed">Lock clock-ins to your physical building. If an employee tries to clock in from the parking lot or from home, our app blocks it instantly.</p>
             </div>
             
             {/* Animated Radar */}
             <div className="hidden sm:flex absolute right-0 inset-y-0 w-1/3 min-w-[200px] items-center justify-center overflow-hidden">
                <div className="relative w-48 h-48 flex items-center justify-center">
                   <motion.div 
                      animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                      className="absolute w-20 h-20 bg-white/20 rounded-full border border-white/40"
                   />
                   <motion.div 
                      animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5, ease: "easeOut" }}
                      className="absolute w-20 h-20 bg-white/20 rounded-full border border-white/40"
                   />
                   <div className="relative z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center translate-y-[-10px] group-hover:translate-y-[-15px] transition-transform">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                   </div>
                   {/* Decorative ground pin shadow */}
                   <div className="absolute bottom-16 w-8 h-2 bg-black/20 blur-sm rounded-full" />
                </div>
             </div>
          </motion.div>

          {/* 2. Tablet Kiosk Mode (Square, Row 1, Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 relative flex items-center justify-center min-h-[120px]">
                <div className="w-24 h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl border-4 border-slate-300 dark:border-slate-700 shadow-inner flex flex-col items-center justify-center gap-3 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                   {/* Scanning animation */}
                   <motion.div 
                      animate={{ y: [-40, 40] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                      className="absolute w-full h-1 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10"
                   />
                   <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-600 overflow-hidden border-2 border-white dark:border-brand-dark">
                      <img src="https://i.pravatar.cc/100?img=12" alt="Face" className="w-full h-full object-cover opacity-50 dark:opacity-80 grayscale" />
                   </div>
                   <div className="grid grid-cols-3 gap-1 w-16">
                      {[...Array(9)].map((_, i) => (
                         <div key={i} className="h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
                      ))}
                   </div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Tablet Kiosk Mode</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Turn any iPad into a wall-mounted punch clock with PIN entries.</p>
             </div>
          </motion.div>

          {/* 3. Overtime Alerts (Square, Row 2, Col 1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="flex-1 flex items-center justify-center min-h-[100px]">
                <motion.div 
                   animate={{ scale: [1, 1.1, 1], backgroundColor: ['rgba(244,63,94,0.1)', 'rgba(244,63,94,0.2)', 'rgba(244,63,94,0.1)'] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center relative border-2 border-rose-500/20"
                >
                   <ShieldAlert className="w-8 h-8 text-rose-500" />
                   <motion.div 
                      animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-rose-500/20"
                   />
                </motion.div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">Overtime Alerts</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Get push notifications instantly if staff approach overtime limits or punch in late.</p>
             </div>
          </motion.div>

          {/* 4. Automated Payroll Export (Square, Row 2, Col 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 row-span-1 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] border border-border shadow-xl p-6 lg:p-8 relative overflow-hidden group flex flex-col"
          >
             <div className="absolute top-[-20%] right-[-10%] w-48 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
             <div className="flex-1 relative flex items-center justify-center min-h-[120px]">
                <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden group-hover:shadow-2xl transition-all">
                   <motion.div 
                      animate={{ y: [-20, 0, 0, 20], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                      className="absolute flex flex-col items-center gap-2"
                   >
                      <Download className="w-8 h-8 text-indigo-500" />
                      <div className="h-1 w-8 bg-indigo-500/20 rounded-full" />
                   </motion.div>
                </div>
             </div>
             <div className="relative z-10 mt-auto">
                <h3 className="text-lg lg:text-xl font-black text-brand-dark dark:text-white mb-2">1-Click Payroll</h3>
                <p className="text-xs sm:text-sm font-bold text-brand-slate dark:text-slate-400 line-clamp-3">Export 100% verified timesheets directly to Xero, Gusto, or QuickBooks.</p>
             </div>
          </motion.div>

          {/* 5. Real-Time Dashboard (Tall, Row 2-3, Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="col-span-1 lg:row-span-2 bg-brand-dark rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden shadow-2xl flex flex-col group border border-slate-800"
          >
             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center text-white mb-4 lg:mb-6">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
             </div>
             <div className="relative z-10 mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 lg:mb-3">Who's In Right Now?</h3>
                <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed">View a live dashboard of every employee currently clocked in across all your locations.</p>
             </div>
             
             {/* Animated Live Feed */}
             <div className="flex-1 mt-auto flex flex-col justify-end gap-3 min-h-[100px] overflow-hidden">
                {[1, 2, 3].map((num, i) => (
                   <motion.div 
                      key={i}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.4, duration: 0.5 }}
                      className="bg-slate-800/80 p-3 rounded-xl flex items-center gap-3 border border-slate-700"
                   >
                      <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden shrink-0">
                         <img src={`https://i.pravatar.cc/100?img=${num + 20}`} alt="avatar" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="h-2 w-16 bg-slate-600 rounded mb-1.5" />
                         <div className="h-1.5 w-10 bg-slate-700 rounded" />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                   </motion.div>
                ))}
             </div>
          </motion.div>

          {/* 6. Auto Break Deductions (Wide, Row 3, Col 1-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 border border-border rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group flex flex-col sm:flex-row items-center gap-6 lg:gap-8 shadow-xl"
          >
             <div className="flex-1 relative z-10 w-full">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl lg:rounded-2xl flex items-center justify-center text-brand-primary mb-4 lg:mb-6">
                   <Clock className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-brand-dark dark:text-white mb-2 lg:mb-3">Auto Break Deductions</h3>
                <p className="text-brand-slate dark:text-slate-400 text-xs sm:text-sm font-bold max-w-sm line-clamp-3">Forget calculating unpaid lunches manually. Set custom break rules and the system deducts them automatically.</p>
             </div>
             
             {/* Animated Clock/Timer UI */}
             <div className="hidden sm:flex flex-1 relative items-center justify-center min-h-[120px]">
                <div className="relative w-28 h-28 bg-white dark:bg-brand-dark rounded-full shadow-2xl border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center">
                   <div className="w-3 h-3 bg-brand-primary rounded-full z-10" />
                   {/* Clock Hand */}
                   <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="origin-bottom absolute bottom-1/2 left-[calc(50%-2px)] w-1 h-10 bg-brand-primary rounded-full rounded-b-none"
                   />
                   {/* Dedicated Break Section Indicator */}
                   <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="46" fill="transparent" stroke="rgba(244,63,94,0.1)" strokeWidth="8" />
                     <circle cx="50" cy="50" r="46" fill="transparent" stroke="#F43F5E" strokeWidth="8" strokeDasharray="289" strokeDashoffset="260" />
                   </svg>
                   <div className="absolute top-0 right-[-10px] bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg">
                     -30m Break
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
