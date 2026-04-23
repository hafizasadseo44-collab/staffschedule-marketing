"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, ShieldCheck, AlertTriangle, Clock } from "lucide-react";

export default function AttendanceAlerts() {
  return (
    <section className="py-24 bg-brand-dark overflow-hidden relative border-t border-slate-800">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full max-w-sm lg:max-w-none relative aspect-[3/4] flex justify-center items-end pointer-events-none order-2 lg:order-1">
             
             {/* Mock Phone Container */}
             <div className="w-72 h-[500px] bg-black rounded-[3rem] border-[12px] border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col pt-12 pb-6 translate-y-8">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-slate-900 rounded-full" />
                
                {/* Lockscreen Clock */}
                <div className="text-center mb-8">
                   <div className="text-white/80 font-medium text-sm mb-1">Wednesday, April 12</div>
                   <div className="text-white font-black text-6xl tracking-tighter">09:15</div>
                </div>

                {/* Notifications Stack */}
                <div className="flex flex-col gap-3 px-4 relative">
                   <motion.div 
                     initial={{ y: 20, opacity: 0, scale: 0.95 }}
                     whileInView={{ y: 0, opacity: 1, scale: 1 }}
                     viewport={{ margin: "-100px" }}
                     className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg"
                   >
                     <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1.5 text-rose-400 font-medium text-xs">
                           <AlertTriangle className="w-3.5 h-3.5" /> LATE ALERT
                        </div>
                        <div className="text-white/40 text-xs">Now</div>
                     </div>
                     <div className="text-white font-bold text-sm mb-1">Kitchen Staff No-Show</div>
                     <div className="text-white/70 text-xs">Michael T. has not clocked in for his 09:00 AM shift.</div>
                   </motion.div>

                   <motion.div 
                     initial={{ y: 20, opacity: 0, scale: 0.95 }}
                     whileInView={{ y: 0, opacity: 1, scale: 1 }}
                     viewport={{ margin: "-100px" }}
                     transition={{ delay: 0.2 }}
                     className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg"
                   >
                     <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1.5 text-amber-400 font-medium text-xs">
                           <Clock className="w-3.5 h-3.5" /> OVERTIME
                        </div>
                        <div className="text-white/40 text-xs">12m ago</div>
                     </div>
                     <div className="text-white font-bold text-sm mb-1">Approaching Overtime</div>
                     <div className="text-white/70 text-xs">Sarah J. has 15 minutes remaining before hitting OT pay.</div>
                   </motion.div>

                   <motion.div 
                     initial={{ y: 20, opacity: 0, scale: 0.95 }}
                     whileInView={{ y: 0, opacity: 1, scale: 1 }}
                     viewport={{ margin: "-100px" }}
                     transition={{ delay: 0.4 }}
                     className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg"
                   >
                     <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                           <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                        </div>
                        <div className="text-white/40 text-xs">1h ago</div>
                     </div>
                     <div className="text-white font-bold text-sm mb-1">Store Opened</div>
                     <div className="text-white/70 text-xs">Manager David clocked in at Main St. location.</div>
                   </motion.div>
                </div>
             </div>

          </div>

          <div className="flex-1 order-1 lg:order-2">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Bell className="w-3.5 h-3.5" /> Manage by Exception
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              >
                 Know exactly who's late, <br/>
                 <span className="text-brand-primary">before you even arrive.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-slate-400 font-medium mb-8"
              >
                 You don't need to stare at a dashboard all day. StaffSchedule.io quietly monitors your locations and sends push notifications to your phone only when something requires your attention.
              </motion.p>
              
              <ul className="space-y-4">
                 {[
                   "Instant alerts for no-shows or late arrivals",
                   "Pre-overtime warnings to control labor costs",
                   "Time-off request approvals from your pocket",
                   "Daily digest of total hours worked"
                 ].map((item, i) => (
                    <motion.li 
                       key={i} 
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-center gap-3 text-slate-300 font-bold"
                    >
                       <div className="w-2 h-2 rounded-full bg-brand-primary" />
                       {item}
                    </motion.li>
                 ))}
              </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
