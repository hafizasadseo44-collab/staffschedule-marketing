"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Utensils, ShoppingBag, HeartPulse, Building2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const INDUSTRIES = [
  {
    title: "Restaurants",
    description: "Handle shift scheduling, weekend rushes, and last-minute changes with less stress and zero confusion.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
    icon: Utensils,
    color: "#F59E0B",
    stats: "98% Fill Rate",
    benefit: "Eliminate No-Shows"
  },
  {
    title: "Retail Teams",
    description: "Keep staff schedules organized during busy business hours and changing shift rotations without manual work.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    icon: ShoppingBag,
    color: "#6366F1",
    stats: "24/7 Sync",
    benefit: "Auto-Rotation"
  },
  {
    title: "Healthcare",
    description: "Improve employee shift scheduling and manage team availability more efficiently for patient-first care.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    icon: HeartPulse,
    color: "#EF4444",
    stats: "HIPAA Ready",
    benefit: "Cert Tracking"
  },
  {
    title: "Hospitality",
    description: "Coordinate workforce scheduling and employee communication across multiple locations from one dashboard.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    icon: Building2,
    color: "#10B981",
    stats: "Multi-Site",
    benefit: "Labor Control"
  }
];

function IndustryCard({ industry, index }: { industry: typeof INDUSTRIES[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative group w-full h-[450px] lg:h-[550px] rounded-[2.5rem] overflow-hidden bg-slate-900 cursor-pointer"
    >
      {/* Background Image with Parallax-ready scale */}
      <motion.div className="absolute inset-0 z-0">
        <Image
          src={industry.image}
          alt={industry.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/90" />
      </div>

      {/* Floating Glass Content */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl"
            style={{ backgroundColor: `${industry.color}33` }}
          >
            <industry.icon size={28} style={{ color: industry.color }} />
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80">
              {industry.stats}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400">
              {industry.benefit}
            </span>
          </div>
          
          <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">
            {industry.title}
          </h3>
          
          <p className="text-slate-300 text-sm lg:text-base font-medium leading-relaxed max-w-[280px] lg:max-w-xs transition-colors group-hover:text-white">
            {industry.description}
          </p>

          <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border border-white/20 bg-slate-800" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Join 2k+ {industry.title}</span>
          </div>
        </div>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

export default function IndustryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-40 bg-white overflow-hidden"
      id="industries"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-10 h-px bg-indigo-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600">Built for Real Teams</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8"
          >
            Trusted by Teams That Need <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Faster and Easier</span> Scheduling.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl"
          >
            Managing employee schedules shouldn’t feel confusing, stressful, or time consuming. 
            From restaurants to healthcare, teams trust StaffSchedule to organize shifts instantly.
          </motion.p>
        </div>

        {/* 3D Perspective Grid */}
        <motion.div 
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard key={i} industry={industry} index={i} />
          ))}
        </motion.div>

        {/* Floating Trust Point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 flex flex-wrap justify-center gap-8 lg:gap-16 border-t border-slate-100 pt-16"
        >
          {[
            { label: "Faster Employee Scheduling", text: "Create schedules in minutes, not hours." },
            { label: "Better Shift Management", text: "Reduce conflicts and missed shifts." },
            { label: "Simple Team Coordination", text: "Keep everyone updated in real-time." }
          ].map((point, i) => (
            <div key={i} className="max-w-[280px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-indigo-600" />
                </div>
                <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-wider">{point.label}</h4>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed pl-9">
                {point.text}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
