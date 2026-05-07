"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CaseStudy, CASE_STUDIES } from "@/lib/data/case-studies";
import { 
  ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck, 
  MapPin, Calendar, Quote, ArrowRight, Zap, TrendingUp, CheckCircle, Package
} from "lucide-react";
import Link from "next/link";

interface Props {
  study: CaseStudy;
}

export default function CaseStudyClientLayout({ study: safeStudy }: Props) {
  // Rehydrate the full study local to the Client Component to bypass Next.js function serialization limits
  const study = CASE_STUDIES.find(s => s.slug === safeStudy.slug) || safeStudy;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Parallax Values
  const yHeroText = useTransform(scrollYProgress, [0, 0.1], [0, 80]);
  const scaleHeroImage = useTransform(scrollYProgress, [0, 0.1], [1, 1.05]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const heightTimeline = useSpring(useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]), {
    stiffness: 80, damping: 20
  });

  // Layout Configuration
  const isNarrative = study.layoutStyle === "narrative";
  const isData = study.layoutStyle === "data";
  const isTimeline = study.layoutStyle === "timeline";

  return (
    <main ref={containerRef} className="min-h-screen bg-white dark:bg-brand-dark overflow-hidden selection:bg-brand-primary/30">
      
      {/* 1. Shared Cinematic Hero Header */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-32 border-b border-border">
        <div className="absolute top-0 right-0 w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] bg-brand-primary/10 rounded-full blur-[100px] lg:blur-[140px] -mt-40 lg:-mt-64 -mr-40 lg:-mr-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-emerald-500/10 rounded-full blur-[100px] lg:blur-[120px] -mb-40 lg:-mb-64 -ml-40 lg:-ml-64 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 lg:mb-20"
          >
            <Link href="/customer-success" className="inline-flex items-center gap-3 text-brand-slate dark:text-slate-400 font-bold hover:text-brand-primary transition-colors group px-5 py-2.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-border backdrop-blur-md shadow-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Stories
            </Link>
            
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest px-3 sm:px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <CheckCircle className="w-3.5 h-3.5" /> 100% Real Data
               </div>
               <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-brand-primary uppercase tracking-widest px-3 sm:px-4 py-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5" /> {study.region}
               </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div style={{ y: yHeroText, opacity: opacityHero }} className="lg:col-span-7">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                 className="inline-flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 p-2 sm:p-3 pr-4 sm:pr-6 bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-xl shadow-brand-dark/5"
               >
                 <img src={study.logo} alt={study.companyName} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain bg-slate-50 dark:bg-white p-1" />
                 <span className="text-lg sm:text-xl font-bold text-brand-slate dark:text-slate-300 tracking-tight">{study.companyName}</span>
               </motion.div>

               <motion.h1 
                 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                 className="text-4xl sm:text-5xl md:text-6xl lg:text-[85px] font-black text-brand-dark dark:text-white leading-[1.1] lg:leading-[0.95] tracking-tighter mb-6 lg:mb-8"
               >
                 {study.title}
               </motion.h1>

               <motion.p 
                 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                 className="text-xl sm:text-2xl text-brand-slate dark:text-slate-400 font-medium leading-[1.6] max-w-2xl"
               >
                 {study.summary}
               </motion.p>
            </motion.div>

            <motion.div className="lg:col-span-5 relative mt-8 lg:mt-0 px-4 sm:px-8 lg:px-0">
              <motion.div 
                 initial={{ opacity: 0, rotateY: -15, x: 50 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                 style={{ scale: scaleHeroImage }}
                 className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-2 border-white/20 dark:border-white/10 shadow-3xl relative z-10 bg-slate-100 dark:bg-slate-800"
              >
                 <img src={study.heroImage} alt="Hero representation" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/30 via-transparent to-transparent opacity-60" />
              </motion.div>
              
              {/* Floating Metric Card over Image */}
              {study.metrics[0] && (
                <motion.div 
                   initial={{ opacity: 0, x: 50, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
                   className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-8 lg:-left-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-border p-5 sm:p-8 rounded-[1.5rem] sm:rounded-3xl shadow-2xl z-20 min-w-[240px] sm:min-w-[280px]"
                >
                   <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                         <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
                      </div>
                      <div>
                         <div className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">{study.metrics[0].label}</div>
                         <div className="text-2xl sm:text-3xl font-black text-brand-dark dark:text-white leading-none mt-1">{study.metrics[0].value}</div>
                      </div>
                   </div>
                   <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-emerald-500 rounded-full" />
                   </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONDITIONAL NARRATIVE LAYOUT BLOCKS --- */}
      {isNarrative && (
         <>
            {/* Quick Metrics Bar underneath Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-8 sm:-mt-16 mb-20">
               <motion.div 
               initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
               className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] border border-border shadow-xl shadow-brand-dark/5 p-6 sm:p-8 lg:p-12 flex flex-col sm:flex-row flex-wrap gap-8 lg:gap-12 justify-around"
               >
               {study.metrics.slice(1).map((m: any, i: number) => (
                  <div key={i} className="text-center group">
                     <div className="text-4xl sm:text-5xl font-black text-brand-primary mb-1 sm:mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-300">{m.value}</div>
                     <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">{m.label}</div>
                  </div>
               ))}
               </motion.div>
            </section>

            {/* Deep Editorial Prose */}
            <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                  
                  {/* Sticky Context */}
                  <div className="lg:w-1/3 lg:sticky lg:top-32 lg:pb-32">
                     <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-black text-[10px] lg:text-xs tracking-widest uppercase mb-6 border border-brand-primary/20 shadow-sm">
                           Editorial Deep Dive
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-brand-dark dark:text-white tracking-tighter mb-6 leading-[1.05]">
                           The story behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-500">metrics.</span>
                        </h2>
                     </motion.div>
                  </div>

                  {/* Rich Prose & Images */}
                  <div className="lg:w-2/3 max-w-3xl">
                     {study.narrative?.background && (
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="mb-16 lg:mb-24">
                           <h3 className="text-2xl lg:text-4xl font-black text-brand-dark dark:text-white mb-6 tracking-tighter flex items-center gap-3">
                           <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0">
                              <AlertCircle className="text-rose-500 w-5 h-5 lg:w-6 lg:h-6" />
                           </div>
                           The Problem Context
                           </h3>
                           <p className="text-lg lg:text-xl leading-[1.8] text-brand-slate dark:text-slate-300 font-medium">
                           {study.narrative.background}
                           </p>
                        </motion.div>
                     )}

                     {study.narrative?.strategy && (
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="mb-16 lg:mb-24">
                           <h3 className="text-2xl lg:text-4xl font-black text-brand-dark dark:text-white mb-6 tracking-tighter flex items-center gap-3">
                           <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                              <Zap className="text-amber-500 w-5 h-5 lg:w-6 lg:h-6" />
                           </div>
                           The Strategy
                           </h3>
                           <p className="text-lg lg:text-xl leading-[1.8] text-brand-slate dark:text-slate-300 font-medium mb-10">
                           {study.narrative.strategy}
                           </p>
                           {study.proofImages && study.proofImages[0] && (
                              <div className="rounded-2xl lg:rounded-[2rem] overflow-hidden border-2 lg:border-4 border-white/50 dark:border-slate-800 shadow-2xl">
                              <img src={study.proofImages[0]} alt="Strategy Interface" className="w-full object-cover aspect-[16/10]" />
                              </div>
                           )}
                        </motion.div>
                     )}

                     {study.narrative?.execution && (
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="mb-16 lg:mb-24">
                           <p className="text-lg lg:text-xl leading-[1.8] text-brand-slate dark:text-slate-300 font-medium">
                           <span className="font-bold text-brand-dark dark:text-white mr-2">Execution Phase:</span>{study.narrative.execution}
                           </p>
                        </motion.div>
                     )}

                     {study.narrative?.outcome && (
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="mb-10">
                           <h3 className="text-2xl lg:text-4xl font-black text-brand-dark dark:text-white mb-6 tracking-tighter flex items-center gap-3">
                           <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <TrendingUp className="text-emerald-500 w-5 h-5 lg:w-6 lg:h-6" />
                           </div>
                           The Results
                           </h3>
                           <p className="text-lg lg:text-xl leading-[1.8] text-brand-slate dark:text-slate-300 font-medium mb-10">
                           {study.narrative.outcome}
                           </p>
                           {study.proofImages && study.proofImages[1] && (
                              <div className="rounded-2xl lg:rounded-[2rem] overflow-hidden border border-border shadow-2xl bg-white dark:bg-slate-800 p-2 sm:p-4">
                              <div className="rounded-xl lg:rounded-[1.5rem] overflow-hidden">
                                 <img src={study.proofImages[1]} alt="Results Data" className="w-full object-cover aspect-video" />
                              </div>
                              </div>
                           )}
                        </motion.div>
                     )}
                  </div>
               </div>
               </div>
            </section>
         </>
      )}

      {/* --- CONDITIONAL DATA LAYOUT BLOCKS --- */}
      {isData && (
         <>
            {/* Blown-Up Massive Metrics section replacing standard narrative */}
            <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16 lg:mb-24">
                     <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-brand-dark dark:text-white tracking-tighter mb-6">
                        By the <span className="text-brand-primary italic">Numbers.</span>
                     </h2>
                     <p className="text-lg lg:text-2xl text-brand-slate dark:text-slate-400 font-medium max-w-3xl mx-auto">
                        In operations, emotion doesn't pay the bills. This exact ROI was achieved by removing human error from the equation entirely.
                     </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20 lg:mb-32">
                     <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 sm:p-10 lg:p-14 border border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] col-span-full md:col-span-1">
                         <div className="text-6xl sm:text-7xl lg:text-[120px] font-black text-brand-primary mb-4 tracking-tighter leading-none">{study.metrics[1]?.value}</div>
                         <div className="text-lg sm:text-xl font-bold text-slate-500 uppercase tracking-widest">{study.metrics[1]?.label}</div>
                     </div>
                     <div className="grid gap-8 lg:gap-12">
                        {study.metrics.slice(2).map((m: any, i: number) => {
                           const Icon = m.icon;
                           return (
                           <div key={i} className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 lg:p-10 border border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex items-end justify-between">
                              <div>
                                 <div className="text-4xl sm:text-5xl lg:text-7xl font-black text-brand-dark dark:text-white mb-2 tracking-tighter">{m.value}</div>
                                 <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">{m.label}</div>
                              </div>
                              {Icon && <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-slate-200 dark:text-slate-700" />}
                           </div>
                           );
                        })}
                     </div>
                  </div>

                  {/* Dual Images for Data Layout */}
                  <div className="grid md:grid-cols-2 gap-8">
                     {study.proofImages?.map((img, i) => (
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.2 }} key={i} className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                           <img src={img} alt="Data View" className="w-full aspect-[4/3] object-cover" />
                        </motion.div>
                     ))}
                  </div>

               </div>
            </section>

            {/* Platform Modules Utilized Grid (Data gets this) */}
            <section className="py-20 lg:py-32">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12 lg:mb-16">
                     <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tighter mb-4">
                        Platform <span className="text-brand-primary italic">Architecture.</span>
                     </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                     {study.solution?.map((sol: string, i: number) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-border hover:shadow-2xl hover:-translate-y-1 transition-all group">
                           <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">
                              <Package className="w-6 h-6 text-brand-primary" />
                           </div>
                           <p className="text-lg font-bold text-brand-dark dark:text-white leading-relaxed">{sol}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
         </>
      )}

      {/* --- CONDITIONAL TIMELINE LAYOUT BLOCKS --- */}
      {isTimeline && (
         <>
         {/* The Blueprint immediately after hero */}
         <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
               <div className="text-center mb-16 lg:mb-24">
                  <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-brand-dark dark:text-white tracking-tighter mb-6 lg:mb-8">
                     Deployment <span className="text-brand-primary italic">Blueprint.</span>
                  </h2>
                  <p className="text-xl lg:text-3xl font-medium text-brand-slate dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                     A massive enterprise transition completed strictly under 30 days. No downtime.
                  </p>
               </div>

               <div className="relative pl-8 sm:pl-12 lg:pl-0 mt-20">
                  <div className="absolute left-6 sm:left-[39px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-1 sm:w-[5px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                     <motion.div style={{ height: heightTimeline }} className="w-full bg-gradient-to-b from-brand-primary to-emerald-500 rounded-full" />
                  </div>

                  <div className="space-y-8 sm:space-y-12 lg:space-y-24 pt-4 lg:pt-8 pb-4 lg:pb-8">
                     {study.timeline.map((item: any, i: number) => {
                        const isEven = i % 2 === 0;
                        return (
                           <motion.div 
                              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                              key={i} className={`relative flex items-center justify-between lg:w-1/2 ${isEven ? "lg:pr-20 lg:ml-0" : "lg:pl-20 lg:ml-auto"}`}
                           >
                              <div className={`absolute left-[-16px] sm:left-auto top-1/2 -translate-y-1/2 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-brand-dark border-4 border-brand-primary z-10 sm:-ml-[7.5px] lg:ml-0 shadow-[0_0_20px_rgba(79,70,229,0.5)] ${isEven ? 'lg:-right-[13.5px]' : 'lg:-left-[16px]'}`} />
                              <div className="w-full p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-[2rem] bg-white dark:bg-slate-900 border border-border shadow-xl ml-6 sm:ml-10 lg:ml-0">
                                 <div className="text-brand-primary font-black uppercase text-[10px] sm:text-xs tracking-widest px-2 sm:px-3 py-1 bg-brand-primary/10 rounded-lg border border-brand-primary/20 inline-block mb-4">Week {i + 1}</div>
                                 <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-dark dark:text-white tracking-tight sm:tracking-tighter">
                                    {item.milestone}
                                 </h4>
                              </div>
                           </motion.div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </section>

         {/* Dual Image Spread for Timeline */}
         <section className="pb-20 max-w-7xl mx-auto px-4 mt-20">
             <div className="grid grid-cols-2 gap-4 lg:gap-8">
               {study.proofImages?.map((img, i) => (
                  <div key={i} className={`rounded-2xl lg:rounded-[3rem] overflow-hidden shadow-xl aspect-square lg:aspect-[4/3] ${i === 1 ? 'mt-12 lg:mt-24' : ''}`}>
                     <img src={img} alt="Operation View" className="w-full h-full object-cover" />
                  </div>
               ))}
             </div>
         </section>
         </>
      )}

      {/* --- SHARED LOWER BLOCKS (Depending on Flow) --- */}
      
      {/* 3. Operational Contrast (Shared for Narrative & Timeline, Data brings its own variant) */}
      {!isData && (
         <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border">
            <div className="text-center mb-12 lg:mb-16">
               <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white tracking-tighter mb-4">
                  The Operational <span className="text-brand-primary italic">Contrast.</span>
               </h2>
               <p className="text-lg lg:text-xl text-brand-slate dark:text-slate-400 font-medium">A stark look at the reality before and after deployment.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
               {/* Before Card */}
               <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-rose-500/5 border border-rose-500/20 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                     <AlertCircle className="w-40 h-40 text-rose-500" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-[10px] sm:text-xs tracking-widest uppercase mb-8 border border-rose-500/20">
                     Before StaffSchedule
                  </div>
                  <ul className="space-y-6 relative z-10">
                     {study.problem.map((prob: string, i: number) => (
                        <li key={i} className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-rose-600 font-black text-sm">X</span>
                           </div>
                           <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{prob}</p>
                        </li>
                     ))}
                  </ul>
               </motion.div>

               {/* After Card */}
               <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group shadow-2xl shadow-emerald-500/5">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                     <TrendingUp className="w-40 h-40 text-emerald-500" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-[10px] sm:text-xs tracking-widest uppercase mb-8 border border-emerald-500/20">
                     <CheckCircle className="w-3.5 h-3.5" /> After Deployment
                  </div>
                  <ul className="space-y-6 relative z-10">
                     {study.results.map((res: string, i: number) => (
                        <li key={i} className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                           </div>
                           <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{res}</p>
                        </li>
                     ))}
                  </ul>
               </motion.div>
            </div>
         </section>
      )}

      {/* 7. The Human Element (Immense Quote) Shared */}
      <section className="py-24 lg:py-32 bg-brand-dark relative overflow-hidden px-4">
         <div className="absolute inset-0 bg-brand-primary/5" />
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
         
         <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
               className="text-center"
            >
               <Quote className="w-16 h-16 sm:w-24 sm:h-24 text-brand-primary/30 mx-auto mb-10 sm:mb-16" />
               <blockquote className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:leading-[1.4] lg:leading-[1.4] font-medium text-white tracking-tight mb-16 sm:mb-20 max-w-5xl mx-auto font-serif italic drop-shadow-lg leading-tight">
                  "{study.quote.text}"
               </blockquote>
               <div className="flex flex-col items-center gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-slate-800 flex items-center justify-center text-brand-primary text-2xl sm:text-3xl font-black shadow-2xl border-2 border-brand-primary/30 relative overflow-hidden">
                     {study.quote.author.split(' ').map((n: string)=>n[0]).join('')}
                  </div>
                  <div className="text-center px-4">
                     <div className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2 tracking-tighter">{study.quote.author}</div>
                     <div className="text-brand-primary font-bold text-base sm:text-lg">{study.quote.role}</div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 8. Strategic CTA */}
      <section className="py-24 sm:py-32 lg:py-40 bg-white dark:bg-brand-dark text-center border-t border-border mt-auto px-4">
         <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black text-brand-dark dark:text-white mb-6 sm:mb-10 tracking-tighter">
               Achieve similar <br className="sm:hidden" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-500">results.</span> 
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl text-brand-slate dark:text-slate-400 font-medium mb-10 sm:mb-16 max-w-2xl mx-auto leading-relaxed">
               Automate your shift management. Deploy StaffSchedule.io in 4 weeks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
               <Link href="https://app.staffschedule.io/onboarding.php" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto h-16 sm:h-20 px-8 sm:px-12 bg-brand-primary text-white rounded-full font-black text-lg sm:text-xl shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 sm:gap-4 group">
                     Deploy Platform <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
               </Link>
               <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto h-16 sm:h-20 px-8 sm:px-12 bg-slate-50 dark:bg-slate-900 border border-border text-brand-dark dark:text-white rounded-full font-black text-lg sm:text-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-center">
                     Contact Sales
                  </button>
               </Link>
            </div>
         </div>
      </section>

    </main>
  );
}
