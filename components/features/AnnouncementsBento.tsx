"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, ShieldCheck, Mail, Smartphone, Users, FileText } from "lucide-react";

export default function AnnouncementsBento() {
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
            Communication Hub
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tight">
            Compliance-ready <br />
            <span className="text-brand-primary">Team Announcements.</span>
          </h2>
          <p className="text-lg text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
            Ditch the messy WhatsApp groups. Send official policy updates, safety notices, and team news with guaranteed reach and digital accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Read Receipts (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-border"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                   <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-3">Live Read Receipts</h3>
                <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">See exactly who has read your announcement and who hasn't. Perfect for critical safety updates and policy changes.</p>
             </div>
             
             {/* Visual: Progress Bar Animation */}
             <div className="hidden md:flex absolute right-12 inset-y-0 items-center justify-center w-1/3">
                <div className="w-full space-y-4">
                   <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                      <span>Reach</span>
                      <span>92%</span>
                   </div>
                   <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-brand-primary"
                      />
                   </div>
                   <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                          <ShieldCheck className="w-4 h-4" />
                       </div>
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">14/15 Staff Read</span>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* 2. Push Notifications (Square) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 bg-brand-primary rounded-[2.5rem] p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black mb-2">Instant Push Alerts</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">Announcements aren't buried in emails. They hit the lock-screen of every team member instantly.</p>
             </div>
          </motion.div>

          {/* 3. Acknowledgement (Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-border shadow-lg flex flex-col justify-between"
          >
             <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                <FileText className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-black text-brand-dark dark:text-white mb-2">Digital Signature</h3>
                <p className="text-brand-slate dark:text-slate-400 text-sm font-medium leading-relaxed">Require employees to click "I have read and understood" for critical compliance documents.</p>
             </div>
          </motion.div>

          {/* 4. Segmented Comms (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 row-span-1 bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden group border border-slate-800"
          >
             <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                   <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Segmented Audiences</h3>
                <p className="text-slate-400 font-medium leading-relaxed">Target your updates to specific locations, departments, or staff roles to keep information relevant.</p>
             </div>
             
             {/* Visual Overlay: Audience Selection */}
             <div className="hidden md:flex absolute right-12 inset-y-0 w-1/3 items-center justify-center">
                <div className="flex flex-wrap gap-2 justify-center">
                   {["Kitchen", "Front of House", "Managers", "Bar Staff"].map((tag, i) => (
                      <div key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-widest">
                         {tag}
                      </div>
                   ))}
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
