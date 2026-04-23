"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ShieldCheck, Heart, UserCheck, RefreshCw } from "lucide-react";

export default function LeaveBento() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark overflow-hidden relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            Digital Time Off
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Manage time off <br />
            <span className="text-brand-primary">without the friction.</span>
          </h2>
          <p className="text-lg text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
            Stop tracking holidays on post-it notes and calendars. StaffSchedule.io automates the entire leave workflow from request to payroll.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Smart Balances (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-border"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                   <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-3">Live Balance Tracking</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">No more "How many days do I have left?" Staff can see their accrued, used, and remaining balance instantly in the app.</p>
             </div>
             
             {/* Visual Decor: Floating Balance Pills */}
             <div className="hidden md:flex absolute right-12 inset-y-0 items-center justify-center w-1/3">
                <div className="flex flex-col gap-4">
                   {[
                      { label: "Annual Leave", val: "14.5 Days", color: "bg-emerald-500" },
                      { label: "Sick Leave", val: "2 Days", color: "bg-rose-500" },
                      { label: "Personal", val: "1 Day", color: "bg-amber-500" }
                   ].map((item, i) => (
                      <motion.div 
                        key={i}
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                        className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-border shadow-xl flex justify-between items-center gap-8 min-w-[200px]"
                      >
                         <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                         <span className={`text-sm font-black text-white px-3 py-1 rounded-lg ${item.color}`}>{item.val}</span>
                      </motion.div>
                   ))}
                </div>
             </div>
          </motion.div>

          {/* 2. Compliance (Square) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-brand-primary rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black mb-2">Legal Compliance</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">Our system automatically enforces regional labor laws, rest periods, and maximum holiday thresholds.</p>
             </div>
          </motion.div>

          {/* 3. Conflict Awareness (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-border shadow-lg flex flex-col justify-between"
          >
             <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
                <Calendar className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black text-brand-dark dark:text-white mb-2">Smart Conflict Alerts</h3>
                <p className="text-brand-slate dark:text-slate-400 text-sm font-medium leading-relaxed">Instant warnings if a leave request will drop your staffing levels below critical minimums for a shift.</p>
             </div>
          </motion.div>

          {/* 4. One-Tap Approval (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-slate-800"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                   <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">One-Tap Approvals</h3>
                <p className="text-slate-400 font-medium leading-relaxed">Managers get push notifications for new requests and can approve or deny in seconds from their phone.</p>
             </div>
             
             {/* Visual Overlay: Approval Pulse */}
             <div className="hidden md:flex absolute right-0 inset-y-0 w-1/2 items-center justify-center">
                <div className="relative">
                   <motion.div 
                     animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl"
                   />
                   <div className="relative bg-emerald-500 text-white px-8 py-4 rounded-3xl font-black text-xl shadow-2xl flex items-center gap-4">
                      <RefreshCw className="w-6 h-6 animate-spin-slow" /> SYNCED TO PAYROLL
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
