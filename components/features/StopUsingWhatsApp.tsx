"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle, ShieldCheck, HeartOff } from "lucide-react";

export default function StopUsingWhatsApp() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            Protect Your Business
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            Stop using WhatsApp <br className="hidden md:block" />
            <span className="text-brand-primary">for company operations.</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
             Mixing personal texts with company schedules is a compliance nightmare waiting to happen. Give your staff their privacy back with a dedicated tool.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* THE NIGHTMARE (WhatsApp) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-200 dark:border-slate-700 relative overflow-hidden group"
          >
            <div className="mb-8 relative z-10 flex items-center justify-between">
               <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200">Personal Messengers</h3>
               <div className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2">
                  <HeartOff className="w-4 h-4" /> Unboundaried
               </div>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-[#E5DDD5] dark:bg-[#0B141A] p-4 flex flex-col gap-3 border-4 border-slate-800 shadow-xl">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
               
               <div className="self-end bg-[#D9FDD3] dark:bg-[#005C4B] p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] z-10 text-sm font-medium text-slate-800 dark:text-slate-200">
                  Hey guys, who can cover my shift tomorrow?
               </div>
               <div className="self-start bg-white dark:bg-[#202C33] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] z-10 text-sm font-medium text-slate-800 dark:text-slate-200">
                  <span className="text-amber-500 font-bold text-xs block mb-1">Jimmy</span>
                  I can't, taking my dog to the vet 🐶
               </div>
               <div className="self-start bg-white dark:bg-[#202C33] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] z-10 text-sm font-medium text-slate-800 dark:text-slate-200 opacity-60">
                  <span className="text-blue-500 font-bold text-xs block mb-1">Sarah</span>
                  Muted this chat ages ago lol
               </div>
               
               <div className="mt-auto self-center bg-black/20 dark:bg-white/10 px-3 py-1 rounded-full text-[10px] text-slate-800 dark:text-slate-300 font-bold backdrop-blur-sm z-10">
                  Manager: Important Safety PDF (Unread by 14)
               </div>
            </div>

            <ul className="space-y-4 relative z-10">
               {[
                 "Staff mute noisy group chats containing vital info",
                 "Terminated employees still have access to data",
                 "Fails GDPR and Right-to-Disconnect laws",
                 "Managers have zero control or moderation"
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                     <div className="mt-1 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                     </div>
                     <span className="text-slate-600 dark:text-slate-400 font-medium">{item}</span>
                  </li>
               ))}
            </ul>
          </motion.div>

          {/* THE SOLUTION */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 border-2 border-brand-primary/20 shadow-2xl relative overflow-hidden group hover:border-brand-primary/50 transition-colors"
          >
            <div className="absolute lg:top-[-20%] lg:right-[-20%] w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="mb-8 relative z-10 flex items-center justify-between">
               <h3 className="text-2xl font-black text-brand-dark dark:text-white">StaffSchedule Hub</h3>
               <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-full flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Secure
               </div>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-slate-100 dark:bg-slate-800 p-4 flex flex-col gap-3 border-4 border-slate-200 dark:border-slate-700 shadow-xl">
               
               <div className="w-full flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-border z-10">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded bg-brand-primary/10 flex items-center justify-center text-brand-primary font-black text-xs">#</div>
                     <div>
                        <div className="font-bold text-sm text-brand-dark dark:text-white leading-none">Kitchen Shift (Today)</div>
                        <div className="text-[10px] text-emerald-500 font-bold mt-1">4 Active Members</div>
                     </div>
                  </div>
               </div>

               <div className="self-start bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm max-w-[80%] z-10 text-sm font-medium border border-border mt-auto">
                  <span className="text-brand-primary font-black text-xs block mb-1">Manager</span>
                  Please remember to lock the walk-in fridge tonight.
               </div>
               
               <div className="self-end flex items-center gap-2">
                  <div className="bg-brand-primary p-3 rounded-2xl shadow-sm z-10 text-sm font-medium text-white">
                     Understood, I'll handle it.
                  </div>
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                     <CheckCircle className="w-3 h-3" />
                  </div>
               </div>

            </div>

            <ul className="space-y-4 relative z-10">
               {[
                 "Clear boundary between work and personal life",
                 "Access revokes automatically upon termination",
                 "Read receipts so you know who saw what",
                 "100% GDPR and labor law compliant"
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                     <div className="mt-1 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                     </div>
                     <span className="text-brand-dark dark:text-slate-300 font-bold">{item}</span>
                  </li>
               ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
