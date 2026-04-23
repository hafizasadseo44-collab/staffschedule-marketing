"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Heart, Target, Users, Globe, Quote, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react";

// ── ENHANCED SVG LOGO COMPONENTS (BIGGER & MORE BEAUTIFUL) ──
const PartnerLogo1 = () => (
  <div className="flex items-center gap-3 group/l1 cursor-pointer">
    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-all duration-500 group-hover/l1:bg-indigo-600 group-hover/l1:text-white shadow-sm">
       <Globe className="w-7 h-7" />
    </div>
    <span className="font-black text-lg tracking-tighter text-slate-500 group-hover/l1:text-indigo-600 transition-colors">GlobalTech</span>
  </div>
);

const PartnerLogo2 = () => (
  <div className="flex items-center gap-3 group/l2 cursor-pointer">
    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-all duration-500 group-hover/l2:bg-emerald-600 group-hover/l2:text-white shadow-sm">
       <ShieldCheck className="w-7 h-7" />
    </div>
    <span className="font-black text-lg tracking-tighter text-slate-400 group-hover/l2:text-slate-900 transition-colors">EcoSync</span>
  </div>
);

const PartnerLogo3 = () => (
  <div className="flex items-center gap-3 group/l3 cursor-pointer">
    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 transition-all duration-500 group-hover/l3:bg-amber-600 group-hover/l3:text-white shadow-sm">
       <Zap className="w-7 h-7 fill-current" />
    </div>
    <span className="font-black text-lg tracking-tighter text-slate-400 group-hover/l3:text-slate-900 transition-colors">NexusAI</span>
  </div>
);

const PartnerLogo4 = () => (
  <div className="flex items-center gap-3 group/l4 cursor-pointer">
    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-all duration-500 group-hover/l4:bg-indigo-600 group-hover/l4:text-white shadow-sm">
       <Target className="w-7 h-7" />
    </div>
    <span className="font-black text-lg tracking-tighter text-slate-400 group-hover/l4:text-slate-900 transition-colors">ApexOp</span>
  </div>
);

const VALUES = [
  {
    icon: <Heart className="w-7 h-7" />,
    color: "#EF4444",
    bg: "rgba(239,68,68,0.06)",
    title: "Teams First",
    desc: "Every logic we build starts with the frontline worker. If it doesn't make their shift better, it doesn't belong in the app.",
  },
  {
    icon: <Target className="w-7 h-7" />,
    color: "#4F46E5",
    bg: "rgba(79,70,229,0.06)",
    title: "Radical Simplicity",
    desc: "Complexity is the enemy of execution. We strip away the noise so you can focus on leading your team, not the software.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    color: "#6366F1",
    bg: "rgba(99,102,241,0.06)",
    title: "Operational Excellence",
    desc: "Built alongside industry veterans. We understand the unique pressures of retail, healthcare, and hospitality.",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    color: "#059669",
    bg: "rgba(5,150,105,0.06)",
    title: "Infinite Scale",
    desc: "From your first hire to your 1,000th location. Our infrastructure is built to grow as fast as your ambition.",
  },
];

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function MissionValues() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ── MISSION & LARGE LOGO MARQUEE ── */}
        <div className="flex flex-col lg:flex-row gap-20 items-start mb-32">
          
          {/* Left: Mission Statement */}
          <div className="lg:basis-[55%]">
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl font-black text-[11px] uppercase tracking-[0.25em] bg-indigo-600 text-white shadow-lg shadow-indigo-200 mb-10"
            >
              <Sparkles className="w-4 h-4" />
              Our Core Mission
            </motion.div>

            <motion.h2
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-6xl lg:text-8xl font-black text-slate-900 tracking-[-0.05em] leading-[0.92] mb-10"
            >
               Workforce <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#4F46E5 0%, #3B82F6 100%)" }}>
                 for everyone.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl sm:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mb-16"
            >
              We’re dismantling the complexity of staff management. From local cafes to global giants, we provide the tools to build thriving workplaces.
            </motion.p>

            {/* ENHANCED LOGO MARQUEE (Animated) */}
            <motion.div 
               variants={fadeInVariant}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="pt-12 border-t border-slate-100"
            >
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Leading Enterprise Partners
               </p>
               
               {/* Marquee Animation using Framer Motion */}
               <div className="relative overflow-hidden flex items-center w-full">
                  <motion.div 
                    animate={{ x: [0, -400] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-16 whitespace-nowrap"
                  >
                    <PartnerLogo1 />
                    <PartnerLogo2 />
                    <PartnerLogo3 />
                    <PartnerLogo4 />
                    {/* Duplicate for infinite effect */}
                    <PartnerLogo1 />
                    <PartnerLogo2 />
                    <PartnerLogo3 />
                    <PartnerLogo4 />
                  </motion.div>
                  {/* Fades for smooth edges */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
               </div>
            </motion.div>
          </div>

          {/* Right: Premium Founders Card */}
          <div className="lg:basis-[45%] w-full">
            <motion.div
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative p-12 rounded-[3.5rem] bg-slate-950 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden group border border-white/5"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000" />
              
              <Quote className="w-16 h-16 text-indigo-500 opacity-20 mb-10" />
              
              <h3 className="text-3xl lg:text-4xl font-black leading-[1.1] mb-12 tracking-tight">
                &ldquo;Nobody should have to cry over an Excel sheet at midnight. We built this to end that era forever.&rdquo;
              </h3>

              <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-500/20">
                  SS
                </div>
                <div>
                  <p className="font-black text-xl">Hafiz & Team</p>
                  <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.2em] mt-1">Founders of StaffSchedule.io</p>
                </div>
              </div>

              <div className="absolute top-10 right-10">
                <div className="flex flex-col items-end">
                   <p className="text-4xl font-black text-indigo-500 leading-none mb-1">100%</p>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Venture Scale</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── VALUES GRID ── */}
        <div className="relative">
          <div className="text-center mb-20">
            <motion.h3 
               variants={fadeInVariant}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="text-4xl lg:text-5xl font-black text-slate-900 tracking-[-0.03em]"
            >
              Built on Principles
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                whileHover={{ y: -12, transition: { duration: 0.4, type: "spring", stiffness: 400 } }}
                className="relative p-10 rounded-[3rem] bg-[#FAFCFF] border border-slate-100 hover:border-indigo-200 transition-all group shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-sm transition-transform group-hover:scale-110" style={{ background: v.bg, color: v.color }}>
                  {v.icon}
                </div>
                
                <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {v.title}
                </h4>
                
                <p className="text-slate-500 font-medium leading-relaxed">
                  {v.desc}
                </p>

                <div className="mt-10 flex items-center gap-2 text-[11px] font-black text-indigo-600 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  EXPLORE VALUES <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
