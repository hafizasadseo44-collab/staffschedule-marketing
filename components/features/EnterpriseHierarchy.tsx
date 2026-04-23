"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Lock, ChevronRight, Eye } from "lucide-react";

const levels = [
  {
    icon: <Shield className="w-5 h-5 text-brand-primary" />,
    name: "Global HQ / Corporate",
    visibility: "Total System Oversight",
    desc: "View global reports, manage all sites, and audit cross-region performance.",
    color: "brand"
  },
  {
    icon: <Users className="w-5 h-5 text-indigo-500" />,
    name: "Regional Management",
    visibility: "Area & District Data",
    desc: "Manage specific clusters of branches and reallocate staff between region sites.",
    color: "indigo"
  },
  {
    icon: <Lock className="w-5 h-5 text-slate-500" />,
    name: "Branch Level",
    visibility: "Local Operations",
    desc: "Autonomous management of single site schedules, local staff, and daily costs.",
    color: "slate"
  }
];

export default function EnterpriseHierarchy() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <Eye className="w-3.5 h-3.5" /> Tiered Visibility
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Command your empire <br />
                 <span className="text-brand-primary">with surgical precision.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-10"
              >
                 Don't overwhelm branch managers with global data, and don't limit owners with local silos. Our Role-Based Access Control (RBAC) ensures everyone sees exactly what they need — and nothing they shouldn't.
              </motion.p>

              <div className="space-y-4">
                 {levels.map((level, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="group p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-border hover:border-brand-primary/30 transition-all cursor-default shadow-sm hover:shadow-xl"
                    >
                       <div className="flex gap-4 items-start">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                             level.color === 'brand' ? 'bg-brand-primary/10' :
                             level.color === 'indigo' ? 'bg-indigo-500/10' : 'bg-slate-500/10'
                          }`}>
                             {level.icon}
                          </div>
                          <div>
                             <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-black text-brand-dark dark:text-white">{level.name}</h3>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${
                                   level.color === 'brand' ? 'text-brand-primary' :
                                   level.color === 'indigo' ? 'text-indigo-500' : 'text-slate-500'
                                }`}>{level.visibility}</span>
                             </div>
                             <p className="text-sm text-slate-500 font-medium leading-relaxed">{level.desc}</p>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square flex items-center justify-center">
             
             {/* Glowing Pulse */}
             <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
             
             {/* Hierarchy Visualization Graphic */}
             <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Level 1: Global (Large) */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="w-48 h-48 sm:w-64 sm:h-64 rounded-[3rem] bg-brand-dark border-4 border-slate-800 shadow-2xl z-30 flex flex-col items-center justify-center p-6 text-center"
                >
                   <GlobeVisual />
                   <div className="mt-4 text-white font-black text-lg sm:text-2xl tracking-tighter">GLOBAL HQ</div>
                   <div className="text-brand-primary font-black text-[10px] uppercase tracking-widest mt-1">Sytem Super Admin</div>
                </motion.div>

                {/* Level 2: Regional (Medium) */}
                <motion.div 
                   animate={{ y: [0, 10, 0], x: [-10, 0, -10] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-[10%] left-[-10%] w-32 h-32 sm:w-40 sm:h-40 rounded-[2.5rem] bg-indigo-600 border-4 border-indigo-700 shadow-2xl z-20 flex flex-col items-center justify-center p-4 text-center"
                >
                   <div className="w-8 h-8 rounded-lg bg-white/20 mb-2 flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                   </div>
                   <div className="text-white font-black text-xs sm:text-base tracking-tight">REGIONAL MGMT</div>
                </motion.div>

                {/* Level 3: Local (Small) */}
                <motion.div 
                   animate={{ y: [10, 0, 10], x: [10, 0, 10] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute bottom-[20%] right-[-10%] w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] bg-slate-800 border-4 border-slate-700 shadow-2xl z-10 flex flex-col items-center justify-center p-4 text-center"
                >
                   <div className="w-6 h-6 rounded-lg bg-white/10 mb-2 flex items-center justify-center">
                      <Lock className="w-3 h-3 text-slate-400" />
                   </div>
                   <div className="text-white font-black text-[10px] sm:text-xs">BRANCH LEVEL</div>
                </motion.div>

                {/* Connection paths (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100">
                   <motion.path 
                      d="M20,30 Q50,10 80,40"
                      stroke="currentColor" strokeWidth="0.5" fill="none"
                      className="text-brand-primary/20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                   />
                </svg>

             </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}

function GlobeVisual() {
   return (
      <div className="relative w-12 h-12 flex items-center justify-center">
         <div className="absolute inset-0 bg-brand-primary rounded-full blur-xl opacity-40 animate-pulse" />
         <div className="relative w-10 h-10 rounded-full border-2 border-brand-primary flex items-center justify-center overflow-hidden">
             <div className="absolute inset-x-0 h-px bg-brand-primary/50 top-1/2 -translate-y-1/2" />
             <div className="absolute inset-y-0 w-px bg-brand-primary/50 left-1/2 -translate-x-1/2" />
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border border-brand-primary/30 rounded-full" 
             />
         </div>
      </div>
   );
}
