"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChartHorizontal, Map, TrendingUp, TrendingDown, Target, Search } from "lucide-react";

export default function RegionalAnalytics() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Target className="w-3.5 h-3.5" /> Regional Intelligence
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Compare performance <br />
                 <span className="text-indigo-600">across every region.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10"
              >
                 Identifying efficient sites and underperforming regions is trivial with StaffSchedule Enterprise. View consolidated heatmaps of labor spend and staff productivity across your entire geographic footprint.
              </motion.p>
              
              <div className="space-y-6">
                 {[
                   { title: "District Benchmarking", desc: "Compare the labor-to-sales ratios of Store A vs. Store B side-by-side." },
                   { title: "Regional Heatmaps", desc: "Instantly see which cities are trending over-budget this week." },
                   { title: "Executive Summaries", desc: "Get global reports for the entire franchise group in one click." },
                 ].map((item, i) => (
                    <motion.div 
                       key={i} 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-start gap-4"
                    >
                       <div className="mt-1 w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                          <BarChartHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                       </div>
                       <div>
                          <div className="text-brand-dark dark:text-white font-black text-xl mb-1">{item.title}</div>
                          <div className="text-brand-slate dark:text-slate-400 font-medium">{item.desc}</div>
                       </div>
                    </motion.div>
                 ))}
              </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square flex items-center justify-center">
             <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
             
             {/* Comparison Dashboard UI */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-border p-6 flex flex-col"
             >
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                         <Map className="w-5 h-5 fill-indigo-500/20" />
                      </div>
                      <div>
                         <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">Comparative Insights</div>
                         <div className="text-sm font-black text-brand-dark dark:text-white leading-none">Regional Heatmap</div>
                      </div>
                   </div>
                   <Search className="w-4 h-4 text-slate-300" />
                </div>

                <div className="space-y-6">
                   {/* Site 1 */}
                   <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                         <span className="text-xs font-black text-brand-dark dark:text-white tracking-tight">Main Street Store</span>
                         <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" /> Healthy
                         </span>
                      </div>
                      <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "32%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full"
                         />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                         <span>Labor %</span>
                         <span>32% (Target 35%)</span>
                      </div>
                   </div>

                   {/* Site 2 */}
                   <div className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                         <span className="text-xs font-black text-brand-dark dark:text-white tracking-tight">Express Terminal</span>
                         <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> Alert
                         </span>
                      </div>
                      <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "48%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="absolute inset-y-0 left-0 bg-rose-500 rounded-full"
                         />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                         <span>Labor %</span>
                         <span>48% (Target 35%)</span>
                      </div>
                   </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                   <div className="text-xs font-bold text-slate-500 mb-4 italic">"Action Required: Shift express staffing models to match Main St. efficiency."</div>
                   <button className="w-full py-3 bg-brand-primary text-white font-black text-xs rounded-xl shadow-lg shadow-brand-primary/20">
                      View Global Audit
                   </button>
                </div>
             </motion.div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
