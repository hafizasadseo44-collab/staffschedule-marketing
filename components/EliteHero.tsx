"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle2, ShieldCheck, Zap, Bell, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

import HeroDemoAnimation from "@/components/HeroDemoAnimation";

const EliteHero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#F4F0FC] dark:bg-brand-dark">
      {/* 1. Elite Background Design (Purple -> Blue Depth) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main Gradient Surface */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-brand-secondary/5 opacity-50" />
        
        {/* Glow Spheres */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[10%] -top-[10%] w-[60%] h-[60%] bg-brand-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -left-[10%] top-[20%] w-[50%] h-[50%] bg-brand-secondary/20 rounded-full blur-[100px]"
        />
        
        {/* Subtle Mesh Grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: `radial-gradient(circle, #4F46E5 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT SIDE: Content */}
          <div className="relative">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-brand-primary/15 shadow-sm mb-10"
            >
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                  ))}
               </div>
               <span className="text-xs font-black uppercase tracking-widest text-brand-slate dark:text-slate-400 flex items-center gap-2">
                 <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                 Join 5,000+ top-tier managers
               </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl lg:text-[6.5rem] font-black leading-[0.9] tracking-tight text-brand-dark dark:text-white mb-8"
            >
              Workforce <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Simplified.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-brand-slate dark:text-slate-400 font-medium mb-12 max-w-xl leading-relaxed"
            >
              The premium hub for modern teams. Schedule faster, track efficiency, 
              and build a workforce that never stops growing.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.6 }}
               className="flex flex-col sm:flex-row gap-5 mb-14"
            >
               <Link href="https://app.staffschedule.io/onboarding.php" className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
                  <Button className="relative w-full sm:w-auto h-16 px-10 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-2xl text-xl font-black transition-all hover:scale-[1.03] active:scale-[0.97] shadow-xl">
                    Start Free Trial
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
               </Link>
               
               <Link href="/contact" className="inline-flex h-12 md:h-14 px-8 items-center justify-center rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-md text-sm font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group">
                  <Play size={18} className="mr-2 text-indigo-500 group-hover:scale-110 transition-transform" />
                  Contact Sales
                </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 1 }}
               className="flex flex-wrap items-center gap-8"
            >
               {[
                 { icon: <ShieldCheck className="w-5 h-5" />, text: "Enterprise Secure" },
                 { icon: <Zap className="w-5 h-5" />, text: "Real-time Sync" },
                 { icon: <CheckCircle2 className="w-5 h-5" />, text: "Fast Deployment" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-2.5">
                    <div className="text-brand-success">{item.icon}</div>
                    <span className="text-sm font-black text-brand-slate dark:text-slate-500 uppercase tracking-widest">{item.text}</span>
                 </div>
               ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE: Visual Masterpiece */}
          <div className="relative group lg:perspective-[2000px]">
            {/* Dashboard Container with 3D Perspective */}
            <motion.div
               animate={{ 
                  rotateY: [-5, 5, -5],
                  rotateX: [2, -2, 2],
               }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10 p-2 bg-white/40 backdrop-blur rounded-[3.5rem] border-2 border-white dark:border-slate-800 shadow-[0_64px_128px_-16px_rgba(79,70,229,0.15)] overflow-hidden lg:rotate-y-12 lg:-rotate-x-3 transform-style-3d"
            >
               {/* THE ANIMATION COMPONENT */}
               <HeroDemoAnimation />
            </motion.div>

            {/* FLOATING CARDS */}
            
            {/* Card 1: Efficiency */}
            <motion.div
               animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 2, 0]
               }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-12 -right-8 z-20 bg-white/95 backdrop-blur p-6 rounded-3xl shadow-2xl border border-white hidden sm:block"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-success/10 flex items-center justify-center text-brand-success">
                     <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Efficiency</p>
                     <p className="text-xl font-black text-brand-dark">+24% Monthly</p>
                  </div>
               </div>
            </motion.div>

            {/* Card 2: Real-time Sync */}
            <motion.div
               animate={{ 
                  y: [0, 20, 0],
                  x: [0, -10, 0]
               }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-1/2 -left-16 z-20 bg-brand-dark p-6 rounded-3xl shadow-2xl border border-white/10 hidden sm:block"
            >
               <div className="flex items-center gap-4">
                  <div className="bg-brand-primary/20 p-3 rounded-xl border border-brand-primary/20">
                     <Zap className="w-6 h-6 text-brand-primary fill-brand-primary" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Live Status</p>
                     <p className="text-xl font-black text-white">100% Active</p>
                  </div>
               </div>
            </motion.div>

            {/* Card 3: Shift Assigned (NEW) */}
            <motion.div
               animate={{ 
                  scale: [1, 1.05, 1],
                  y: [0, -10, 0]
               }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               className="absolute -bottom-12 right-0 z-20 bg-white/95 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border border-brand-primary/10 hidden sm:block"
            >
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                     <Bell className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                     <p className="text-[11px] font-black text-brand-dark">Shift assigned</p>
                     <p className="text-[10px] font-bold text-slate-400">Marketing Dept.</p>
                  </div>
               </div>
            </motion.div>

            {/* Glowing Accent Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-primary/15 rounded-full blur-[150px] -z-10 animate-pulse"></div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteHero;
