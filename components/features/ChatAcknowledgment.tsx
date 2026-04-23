"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { CheckSquare, AlertCircle, FileSignature, Check } from "lucide-react";

export default function ChatAcknowledgment() {
  const [acknowledged, setAcknowledged] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAcknowledged(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-brand-dark border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 order-2 lg:order-1 w-full max-w-lg lg:max-w-none relative aspect-video flex items-center justify-center">
             
             {/* Progress Circle Decor */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />

             {/* UI Card */}
             <div className="relative z-10 w-full max-w-md bg-slate-50 dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-6">
                
                {/* Manager Broadcast */}
                <div className="bg-white dark:bg-brand-dark p-5 rounded-2xl border border-border shadow-sm mb-6">
                   <div className="flex items-center gap-2 mb-3 text-rose-500 font-bold text-xs uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4" /> Required Knowledge
                   </div>
                   <div className="text-brand-dark dark:text-white font-black text-lg mb-2 leading-tight">
                      New Deep Fryer Safety Protocol
                   </div>
                   <div className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                      Effective immediately. Please review the attached PDF and acknowledge you understand the new cooling procedure.
                   </div>
                   
                   {/* Interactive Acknowledge Button */}
                   <motion.div 
                      className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-colors duration-300 ${acknowledged ? 'bg-emerald-500 text-white' : 'bg-brand-primary text-white'}`}
                   >
                      {acknowledged ? <><Check className="w-5 h-5" /> Acknowledged</> : <><FileSignature className="w-5 h-5" /> Tap to Acknowledge</>}
                   </motion.div>
                </div>

                {/* Manager Dashboard View (Live updating) */}
                <div className="px-2">
                   <div className="flex justify-between items-end mb-2">
                      <div className="text-sm font-bold text-slate-400">Completion Rate</div>
                      <div className="text-2xl font-black text-brand-dark dark:text-white">
                         <motion.span>{acknowledged ? "42" : "41"}</motion.span>
                         <span className="text-slate-400 text-lg font-medium">/50</span>
                      </div>
                   </div>
                   <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                         initial={{ width: "82%" }}
                         animate={{ width: acknowledged ? "84%" : "82%" }}
                         transition={{ duration: 0.5, ease: "easeOut" }}
                         className="h-full bg-emerald-500 rounded-full"
                      />
                   </div>
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
                <CheckSquare className="w-4 h-4" /> Bulletproof Compliance
              </motion.div>
              <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight"
              >
                 Don't just track reading. <br />
                 <span className="text-emerald-500">Require signatures.</span>
              </motion.h2>
              <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-8"
              >
                 Traditional read receipts aren't enough for legal compliance. Send critical updates with a mandated "Acknowledgment" button and track exactly who hasn't signed off in real-time.
              </motion.p>
              
              <ul className="space-y-4">
                 {[
                   "Perfect for health, wage, and safety changes",
                   "Creates a permanent digital paper trail",
                   "Automatically nudges staff who haven't signed",
                   "Export compliance logs instantly"
                 ].map((item, i) => (
                    <motion.li 
                       key={i} 
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-center gap-3 text-brand-slate dark:text-slate-300 font-bold"
                    >
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
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
