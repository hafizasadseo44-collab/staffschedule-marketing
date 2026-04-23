"use client";

import React from "react";
import { motion } from "framer-motion";
import { Languages, ArrowRightLeft, Globe2 } from "lucide-react";

export default function ChatTranslation() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            <Globe2 className="w-4 h-4" /> Global Workforce Hub
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
          >
            Destroy the language barrier. <br />
            <span className="text-purple-500">Auto-translate everything.</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-brand-slate dark:text-slate-400 font-medium"
          >
             Managers type in English. Staff read in their native language natively inside the app. Zero friction. 100% understanding.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto aspect-auto lg:aspect-[21/9] bg-white dark:bg-brand-dark rounded-[2.5rem] p-6 lg:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
           
           <div className="absolute inset-0 bg-purple-500/5 rounded-[2.5rem] pointer-events-none" />

           {/* Source Language (Manager) */}
           <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10 w-full max-w-sm bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-border shadow-lg"
           >
              <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                 <Languages className="w-4 h-4" /> Source: English
              </div>
              <div className="bg-brand-primary p-4 rounded-xl rounded-tl-none text-white font-medium text-sm shadow-md">
                 "Please ensure the alarm is armed before locking the back door tonight."
              </div>
           </motion.div>

           {/* Translation Engine Logic */}
           <div className="hidden lg:flex flex-col items-center justify-center shrink-0">
              <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="w-16 h-16 rounded-full border border-dashed border-purple-500/50 flex items-center justify-center relative"
              >
                 <ArrowRightLeft className="w-6 h-6 text-purple-500 absolute" />
              </motion.div>
              <div className="text-[10px] font-black text-purple-500 mt-2 tracking-widest uppercase">Auto-Translate</div>
           </div>

           {/* Destination Languages (Staff) */}
           <div className="flex flex-col gap-4 w-full max-w-sm z-10">
              
              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-border shadow-sm flex flex-col items-end"
              >
                 <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Delivered in Spanish</div>
                 <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl rounded-tr-none text-brand-dark dark:text-white font-medium text-sm">
                    "Asegúrese de que la alarma esté armada antes de cerrar la puerta trasera esta noche."
                 </div>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 }}
                 className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-border shadow-sm flex flex-col items-end"
              >
                 <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">Delivered in Tagalog</div>
                 <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-xl rounded-tr-none text-brand-dark dark:text-white font-medium text-sm">
                    "Tiyaking naka-armas ang alarm bago i-lock ang likod na pinto ngayong gabi."
                 </div>
              </motion.div>

           </div>

        </div>

      </div>
    </section>
  );
}
