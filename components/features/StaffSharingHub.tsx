"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users2, ArrowRightLeft, MapPin, CheckCircle2 } from "lucide-react";

export default function StaffSharingHub() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark overflow-hidden relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 order-2 lg:order-1 w-full max-w-lg lg:max-w-none relative aspect-square flex items-center justify-center">
             
             {/* Progress Circle Decor */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />

             {/* UI Simulation Card */}
             <div className="relative z-10 w-full max-w-md bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col">
                
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Users2 className="w-6 h-6 shrink-0" />
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest leading-none mb-1">Global Workforce Hub</div>
                      <div className="text-lg font-black text-brand-dark dark:text-white leading-none">Shared Staff Member</div>
                   </div>
                </div>

                <div className="bg-white dark:bg-brand-dark p-6 rounded-3xl border border-border shadow-sm mb-8 relative group overflow-hidden">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-brand-primary flex items-center justify-center overflow-hidden">
                         <div className="w-full h-full bg-gradient-to-tr from-brand-primary/20 to-brand-primary/10 flex items-center justify-center text-brand-primary font-black text-xl">JD</div>
                      </div>
                      <div>
                         <div className="text-lg font-black text-brand-dark dark:text-white">John Doe</div>
                         <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Multi-Site Certified</div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      {/* Location A */}
                      <motion.div 
                         initial={{ x: -20, opacity: 0 }}
                         whileInView={{ x: 0, opacity: 1 }}
                         viewport={{ once: true }}
                         className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-brand-primary/30 transition-colors"
                      >
                         <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-brand-primary" />
                            <div>
                               <div className="text-xs font-black text-brand-dark dark:text-white">Downtown Store</div>
                               <div className="text-[10px] font-bold text-slate-400">12 Shifts this month</div>
                            </div>
                         </div>
                         <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                      </motion.div>

                      {/* Animated Connector */}
                      <div className="flex justify-center -my-2 relative z-10">
                         <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-brand-primary text-white rounded-full p-1 shadow-lg"
                         >
                            <ArrowRightLeft className="w-3 h-3 rotate-90" />
                         </motion.div>
                      </div>

                      {/* Location B */}
                      <motion.div 
                         initial={{ x: 20, opacity: 0 }}
                         whileInView={{ x: 0, opacity: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.2 }}
                         className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-indigo-500/30 transition-colors"
                      >
                         <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-indigo-500" />
                            <div>
                               <div className="text-xs font-black text-brand-dark dark:text-white">Airport Terminal 3</div>
                               <div className="text-[10px] font-bold text-slate-400">8 Shifts this month</div>
                            </div>
                         </div>
                         <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/20" />
                      </motion.div>
                   </div>

                   {/* Floating Metric Pill */}
                   <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, type: "spring" }}
                      className="absolute top-6 right-6 bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-black text-[10px] shadow-lg shadow-emerald-500/30 flex items-center gap-1.5"
                   >
                      <CheckCircle2 className="w-3 h-3" /> $1,240 RECOVERED
                   </motion.div>
                </div>

                <div className="mt-auto px-2">
                   <div className="flex items-center gap-3 text-emerald-500 font-bold mb-3">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm">Zero Duplicate Profiles</span>
                   </div>
                   <p className="text-[11px] text-slate-500 font-medium font-bold italic">"Eliminated 40 hours of manual data entry per month for our 12-site group."</p>
                </div>

             </div>

          </div>

          <div className="flex-1 order-1 lg:order-2">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <ArrowRightLeft className="w-4 h-4" /> Shared Workforce Power
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Stop hiring twice. <br />
                 <span className="text-emerald-500">Share your superstars.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-8"
              >
                 Traditional systems force you to create a new profile for every location a staff member works at. We don't. Manage one employee across a hundred site-codes with perfect payroll accuracy.
              </motion.p>
              
              <ul className="space-y-6">
                 {[
                   { title: "Universal Profiles", desc: "Staff view their global schedule in one unified calendar view." },
                   { title: "Automated Cost Allocation", desc: "Labor costs are automatically billed to the site where work actually occurred." },
                   { title: "Consolidated Records", desc: "Verify food safety or alcohol certifications across all locations globally." },
                 ].map((item, i) => (
                    <motion.li 
                       key={i} 
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-start gap-4"
                    >
                       <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       </div>
                       <div>
                          <div className="text-brand-dark dark:text-white font-black text-2xl mb-1 tracking-tight leading-none">{item.title}</div>
                          <div className="text-brand-slate dark:text-slate-400 font-medium">{item.desc}</div>
                       </div>
                    </motion.li>
                 ))}
              </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
