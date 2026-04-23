"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, CreditCard } from "lucide-react";

export default function PosIntegration() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative border-t border-border">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-slate-100 dark:bg-slate-800/50 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 order-2 lg:order-1">
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-6"
              >
                <CreditCard className="w-3.5 h-3.5" /> Point of Sale Integrations
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Connect your Sales. <br/>
                 <span className="text-brand-primary">Automate your Margins.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-8"
              >
                 Link StaffSchedule.io directly to your POS system to pull live sales data. Watch your actual Labor-to-Sales percentage update by the minute, allowing you to cut staff on slow days before profits bleed.
              </motion.p>
              
              <ul className="space-y-4">
                 {[
                   "Live updates every 15 minutes",
                   "Works with Square, Toast, Lightspeed & more",
                   "Historical trend comparison",
                   "Automated end-of-day discrepancy reports"
                 ].map((item, i) => (
                    <motion.li 
                       key={i} 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-center gap-3 text-brand-dark dark:text-slate-300 font-bold"
                    >
                       <div className="w-2 h-2 rounded-full bg-brand-primary" />
                       {item}
                    </motion.li>
                 ))}
              </ul>
          </div>
          
          <div className="flex-1 w-full max-w-sm lg:max-w-none relative aspect-square flex justify-center items-center pointer-events-none order-1 lg:order-2">
             
             {/* Central Hub */}
             <div className="absolute z-20 w-32 h-32 bg-brand-dark rounded-3xl shadow-2xl border-4 border-slate-800 flex items-center justify-center">
                <div className="text-white font-black text-2xl tracking-tighter">SS.io</div>
             </div>

             {/* Connecting Nodes (Simulating POS terminals) */}
             {[
                { top: '10%', left: '20%', label: 'SQUARE', color: 'bg-white text-black' },
                { top: '80%', left: '15%', label: 'TOAST', color: 'bg-orange-500 text-white' },
                { top: '50%', right: '10%', label: 'LIGHTSPEED', color: 'bg-red-500 text-white' },
             ].map((pos, i) => (
                <motion.div 
                   key={i}
                   animate={{ y: [-10, 10, -10] }}
                   transition={{ duration: 4, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
                   className="absolute z-10 flex flex-col items-center"
                   style={pos.right ? { top: pos.top, right: pos.right } : { top: pos.top, left: pos.left }}
                >
                   <div className={`w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center font-black text-[10px] ${pos.color}`}>
                      {pos.label}
                   </div>
                   
                   {/* Data flow dots */}
                   <motion.div 
                     animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="w-2 h-2 bg-emerald-500 rounded-full mt-4 blur-[1px]"
                   />
                </motion.div>
             ))}

             {/* Background Wireframe Ring */}
             <div className="absolute inset-0 border border-slate-200 dark:border-slate-800 rounded-full scale-75 opacity-50 border-dashed animate-[spin_60s_linear_infinite]" />

          </div>

        </div>
      </div>
    </section>
  );
}
