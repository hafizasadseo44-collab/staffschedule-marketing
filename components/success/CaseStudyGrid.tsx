"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data/case-studies";

const industries = ["All", "Hospitality", "Healthcare", "Retail", "Construction", "Logistics", "Corporate"];

const TiltCard = ({ study, index }: { study: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 40 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="group relative h-full flex"
    >
      <motion.div
         style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
         className="relative flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border hover:border-brand-primary/40 transition-colors duration-500 shadow-xl shadow-brand-dark/5 dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-2xl hover:shadow-brand-primary/20 flex-1 overflow-hidden"
      >
        {/* Subdued Glow Focus Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="aspect-[16/9] w-full overflow-hidden relative shrink-0 border-b border-border">
           <img 
            src={study.heroImage} 
            alt={study.companyName} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent p-6 lg:p-8 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                 <div className="px-3 py-1 rounded-full bg-brand-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {study.industry}
                 </div>
                 <div className="flex items-center gap-1 text-[10px] font-bold text-white/80 uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                    <MapPin className="w-3 h-3" /> {study.region}
                 </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight" style={{ transform: "translateZ(30px)" }}>
                {study.companyName}
              </h3>
           </div>
        </div>

        <div className="p-8 lg:p-10 flex flex-col flex-1 transform-style-3d relative">
           <p className="text-lg font-medium text-brand-slate dark:text-slate-400 mb-8 leading-relaxed line-clamp-3">
             {study.title}: {study.summary}
           </p>

           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-4 mb-auto pb-6 sm:pb-10 border-b border-border">
              {study.metrics.slice(0, 3).map((m: any, i: number) => (
                <div key={i} className="group/metric">
                   <div className="text-[22px] leading-none sm:text-2xl lg:text-3xl font-black text-brand-primary mb-1.5 group-hover/metric:scale-110 origin-left transition-transform duration-300 truncate">{m.value}</div>
                   <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight">{m.label}</div>
                </div>
              ))}
           </div>

           <div className="pt-8">
               <Link href={`/customer-success/${study.slug}`} className="block w-full">
                  <button className="w-full h-14 bg-slate-50 hover:bg-brand-primary dark:bg-slate-800 dark:hover:bg-brand-primary flex items-center justify-between px-6 rounded-full font-bold text-brand-dark hover:text-white dark:text-white group/btn transition-colors duration-300">
                    <span className="relative z-10 transition-colors">Read Full Story</span>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-brand-primary group-hover/btn:bg-white group-hover/btn:text-brand-primary transition-all group-hover/btn:scale-110 shadow-sm">
                       <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-[2px] transition-transform" />
                    </div>
                  </button>
               </Link>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CaseStudyGrid() {
  const [filter, setFilter] = useState("All");

  const filteredStudies = filter === "All" 
    ? CASE_STUDIES.slice(1) // Skip the first one since it's the featured story
    : CASE_STUDIES.filter(s => s.industry === filter);

  return (
    <section className="py-24 lg:py-32 bg-slate-50 dark:bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 lg:mb-20">
           <h2 className="text-5xl font-black text-brand-dark dark:text-white mb-6 tracking-tighter">
             Transformations by<br className="sm:hidden"/> Indsutry.
           </h2>
           <p className="text-xl text-brand-slate dark:text-slate-400 font-medium">
             Filter by your sector to see how similar operations scale.
           </p>
        </div>

        {/* Premium Industry Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 lg:mb-24">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setFilter(ind)}
              className={`px-6 py-3 rounded-full font-black text-sm transition-all sm:w-auto w-full max-w-[200px] border shrink-0 ${
                filter === ind 
                  ? "bg-brand-dark dark:bg-white text-white dark:text-brand-dark border-transparent shadow-xl shadow-brand-dark/20 scale-105" 
                  : "bg-white dark:bg-slate-900 border-border text-brand-slate dark:text-slate-400 hover:border-brand-primary/40 hover:text-brand-primary shadow-sm"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, index) => (
              <TiltCard key={study.slug} study={study} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
