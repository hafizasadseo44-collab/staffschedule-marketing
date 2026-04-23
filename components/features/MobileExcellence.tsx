"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Zap, Fingerprint, MapPin } from "lucide-react";

export default function MobileExcellence() {
  return (
    <section className="py-24 bg-brand-dark dark:bg-black overflow-hidden relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">
          
          <div className="flex-1 w-full max-w-sm lg:max-w-none relative min-h-[500px] perspective-1000 flex items-center justify-center">
             
             {/* 3D Rotating Phones */}
             <div className="relative preserve-3d">
                
                {/* Phone 1 (Front) */}
                <motion.div 
                   animate={{ 
                      rotateY: [-10, 10, -10],
                      y: [0, -20, 0]
                   }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="relative z-20 w-[260px] h-[520px] bg-slate-900 rounded-[3rem] border-4 border-slate-700 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                   {/* Notch */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-700 rounded-b-2xl z-20" />
                   
                   {/* App UI Mockup */}
                   <div className="w-full h-full p-6 pt-12 flex flex-col gap-4 bg-gradient-to-b from-brand-dark to-slate-900">
                      <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                      <div className="h-32 w-full bg-brand-primary/20 rounded-3xl border border-brand-primary/30 flex items-center justify-center">
                         <Zap className="w-12 h-12 text-brand-primary" />
                      </div>
                      <div className="space-y-2 mt-4">
                         {[1,2,3,4].map(i => (
                            <div key={i} className="h-12 w-full bg-white/5 rounded-2xl border border-white/5" />
                         ))}
                      </div>
                   </div>
                </motion.div>

                {/* Phone 2 (Back/Floating) */}
                <motion.div 
                   animate={{ 
                      rotateY: [10, -10, 10],
                      y: [20, -10, 20],
                      x: [40, 60, 40]
                   }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-10 left-10 -z-10 w-[260px] h-[520px] bg-slate-800/40 backdrop-blur-xl rounded-[3rem] border-2 border-white/10 flex items-center justify-center"
                >
                   <MapPin className="w-16 h-16 text-white/10" />
                </motion.div>

             </div>

             {/* Dynamic Glows */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />
          </div>

          <div className="flex-1">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-primary font-black text-xs uppercase tracking-widest mb-6"
             >
                <Smartphone className="w-3.5 h-3.5" /> Mobile-First Excellence
             </motion.div>
             <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                Your operation, <br />
                <span className="text-brand-primary">in your pocket.</span>
             </h2>
             <p className="text-lg text-slate-400 font-medium mb-10">
                Don't sacrifice power for portability. Our native mobile engine delivers the full StaffSchedule experience to your managers and staff, with zero feature degradation. 
             </p>
             
             <div className="space-y-8">
                {[
                   { title: "Native Performance", desc: "No slow web-wrappers. Built with native code for fluid 60fps animations.", icon: <Zap /> },
                   { title: "Biometric Access", desc: "Secure your workspace with Fingerprint and FaceID integration.", icon: <Fingerprint /> },
                   { title: "Offline Resilience", desc: "Clock in and out even without an internet connection. Auto-syncing.", icon: <MapPin /> },
                ].map((item, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-5"
                   >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary shrink-0">
                         {item.icon}
                      </div>
                      <div>
                         <div className="text-white font-black text-xl mb-1">{item.title}</div>
                         <div className="text-slate-400 text-sm font-medium">{item.desc}</div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
