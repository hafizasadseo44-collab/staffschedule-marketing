"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, CheckCircle2, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
];

const EliteFinalCTA = () => {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white dark:bg-[#020617] overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-[#1E1B4B] via-[#0F172A] to-[#1E1B4B] rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-10"
        >
          {/* --- AMBIENT ATMOSPHERICS --- */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [0, 50, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-violet-600/30 rounded-full blur-[160px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
                x: [0, -30, 0],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-1/4 -left-1/4 w-[900px] h-[900px] bg-indigo-600/20 rounded-full blur-[160px]" 
            />
            {/* Animated Mesh Gradients */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          <div className="relative z-20 grid lg:grid-cols-2 gap-16 items-center p-10 md:p-16 lg:p-24">
            
            {/* LEFT SIDE: CONTENT */}
            <div className="flex flex-col items-start text-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full text-violet-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/10 backdrop-blur-xl shadow-lg shadow-black/20"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                Join 10,000+ businesses growing with StaffSchedule.io
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tight"
              >
                Ready to Simplify <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-[length:200%_auto] animate-gradient">
                  Workforce Management?
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-slate-400 font-medium mb-12 max-w-xl leading-relaxed"
              >
                Start scheduling, managing, and communicating with your team in one powerful, AI-driven platform. Perfect for teams of all sizes.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mb-10"
              >
                <Link 
                  href="https://app.staffschedule.io/onboarding.php?start_trial=1"
                  className="h-16 px-10 bg-white text-indigo-900 rounded-2xl text-base font-black transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_25px_50px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 group"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/pricing"
                  className="h-16 px-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-base font-black hover:-translate-y-1 transition-all flex items-center justify-center"
                >
                  Explore Plans
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-6 mb-12"
              >
                {[
                  { label: "No Credit Card Required", icon: <CheckCircle2 size={12} /> },
                  { label: "Setup In Minutes", icon: <Zap size={12} /> },
                  { label: "Cancel Anytime", icon: <CheckCircle2 size={12} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span className="text-violet-500">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </motion.div>

              {/* Reviews & Social Proof */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {AVATARS.map((url, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F172A] overflow-hidden shadow-xl">
                        <img src={url} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                      4.9/5 <span className="text-slate-400">from 1,200+ reviews</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-violet-400 border border-white/5">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white">10,000+</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Businesses Trust Us</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: VISUALS */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Floating Orbs & Glows */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-600/10 rounded-full blur-[120px] -z-10"
              />

              {/* The Main Mockup Container */}
              <div className="relative w-full max-w-[650px]">
                {/* Dashboard Mockup (Main) */}
                <motion.div
                  initial={{ opacity: 0, x: 40, rotateY: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="relative z-10 w-full group"
                >
                  <div className="relative p-2 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                    <img 
                      src="/hero-master.png" 
                      alt="StaffSchedule Dashboard" 
                      className="w-full h-auto rounded-[1.8rem] shadow-2xl"
                    />
                    {/* Glass Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Mobile UI (Using hero-mockup for a dark premium contrast) */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-8 -bottom-12 w-[240px] z-20 hidden xl:block"
                  >
                    <div className="p-1.5 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                      <img 
                        src="/hero-mockup.png" 
                        alt="StaffSchedule Mobile" 
                        className="w-full h-auto rounded-[2.5rem] object-cover aspect-[9/16]"
                      />
                    </div>
                  </motion.div>

                  {/* Floating ROI Card */}
                  <motion.div
                    animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -top-12 -left-8 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl hidden lg:block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <TrendingUp size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Labor Efficiency</p>
                        <h5 className="text-lg font-black text-white">+18% Profit Growth</h5>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Real-time Sync Card */}
                  <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-8 -left-16 z-20 bg-indigo-600/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl hidden 2xl:block border border-white/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                        <Zap size={16} fill="white" />
                      </div>
                      <span className="text-xs font-black text-white uppercase tracking-wider">Real-time Sync Active</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EliteFinalCTA;
