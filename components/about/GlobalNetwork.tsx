"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Users, Zap, ShieldCheck, MapPin, Activity } from "lucide-react";

const HUBS = [
  { id: "sf", x: 18, y: 35, city: "San Francisco", team: "Engineering", active: true },
  { id: "ny", x: 28, y: 32, city: "New York", team: "Product", active: true },
  { id: "ldn", x: 48, y: 28, city: "London", team: "Operations", active: true },
  { id: "dub", x: 62, y: 38, city: "Dubai", team: "Design", active: true },
  { id: "lag", x: 50, y: 52, city: "Lagos", team: "Growth", active: true },
  { id: "syd", x: 88, y: 75, city: "Sydney", team: "Support", active: true },
  { id: "ber", x: 52, y: 28, city: "Berlin", team: "Security", active: true },
];

const CONNECTIONS = [
  { from: "sf", to: "ny" },
  { from: "ny", to: "ldn" },
  { from: "ldn", to: "dub" },
  { from: "dub", to: "syd" },
  { from: "ldn", to: "lag" },
  { from: "sf", to: "ldn" },
];

export default function GlobalNetwork() {
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative py-24 lg:py-40 bg-white overflow-hidden">
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/[0.03] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#4F46E5 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-slate-900">
        {/* ── Header ─────────────────────────── */}
        <div className="text-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-[0.25em] mb-8 shadow-sm border border-slate-100"
            style={{ background: "rgba(255,255,255,0.8)", color: "#4F46E5", backdropFilter: "blur(10px)" }}
          >
            <Globe className="w-4 h-4" />
            Global Infrastructure
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8"
          >
            Powering remote teams, <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)" }}>
              on every continent.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed border-l border-slate-100 pl-8 text-left sm:text-center sm:pl-0 sm:border-l-0"
          >
            StaffSchedule.io isn&rsquo;t just code — it&rsquo;s a living network. Our distributed team of developers and architects are online 24/7, ensuring your schedules never miss a beat.
          </motion.p>
        </div>

        {/* ── The "Real" Map Visual ──────────────── */}
        <div className="relative w-full aspect-[2/1] lg:aspect-[2.2/1] rounded-[3.5rem] bg-[#FAFBFF] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.05)] overflow-hidden group/map">
          
          {/* Detailed Dotted World Map SVG */}
          <div className="absolute inset-0 opacity-[0.25] pointer-events-none">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <pattern id="world-dots-light" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                 <circle cx="2" cy="2" r="1.2" fill="#4F46E5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#world-dots-light)" />
            </svg>
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-center bg-no-repeat bg-contain opacity-[0.4] grayscale" />
          </div>

          {/* Arcs & Connections */}
          <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {CONNECTIONS.map((conn, idx) => {
              const from = HUBS.find(h => h.id === conn.from)!;
              const to = HUBS.find(h => h.id === conn.to)!;
              
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2 - 8;

              return (
                <g key={idx}>
                  <motion.path
                    d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                    stroke="url(#arcGradientLight)"
                    strokeWidth="0.15"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: idx * 0.3 }}
                  />
                  <motion.circle r="0.25" fill="#4F46E5">
                    <animateMotion 
                      dur={`${3 + idx}s`} 
                      repeatCount="indefinite" 
                      path={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                    />
                  </motion.circle>
                </g>
              );
            })}
            <defs>
              <linearGradient id="arcGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Major Hubs / Cities */}
          {HUBS.map((hub) => (
            <motion.div
              key={hub.id}
              className="absolute z-20 group"
              style={{ top: `${hub.y}%`, left: `${hub.x}%` }}
              onMouseEnter={() => setHoveredHub(hub.id)}
              onMouseLeave={() => setHoveredHub(null)}
            >
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-4 bg-brand-primary/20 rounded-full"
              />
              
              <div className={`relative w-4 h-4 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-lg ${hoveredHub === hub.id ? 'bg-brand-primary scale-125' : 'bg-white'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${hoveredHub === hub.id ? 'bg-white' : 'bg-brand-primary'}`} />
              </div>

              <AnimatePresence>
                {(hoveredHub === hub.id || !hoveredHub) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ 
                      opacity: hoveredHub === hub.id ? 1 : 0.6, 
                      y: hoveredHub === hub.id ? -10 : 15,
                      scale: hoveredHub === hub.id ? 1 : 0.8
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 pointer-events-none min-w-[140px]"
                  >
                    <div className="relative px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-3 h-3 text-brand-success" />
                        <p className="text-[10px] font-black uppercase text-brand-primary tracking-widest">{hub.city}</p>
                      </div>
                      <p className="text-slate-900 font-bold text-xs">{hub.team} Team</p>
                      <div className="mt-2 flex items-center gap-1.5">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[9px] font-bold text-slate-400 uppercase">Live Operations</span>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Bottom HUD (Heads-Up Display) Stats */}
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-wrap items-end justify-between gap-6 pointer-events-none z-30">
            <div className="flex items-center gap-8">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Active Nodes</span>
                  <span className="text-3xl font-black text-slate-900">418<span className="text-brand-primary text-xl ml-1">+</span></span>
               </div>
               <div className="h-10 w-px bg-slate-100" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Global Latency</span>
                  <span className="text-3xl font-black text-brand-success">0.02<span className="text-sm ml-1 text-emerald-500/50">ms</span></span>
               </div>
            </div>

            <div className="hidden lg:flex items-center gap-12 text-slate-300">
               <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">SOC 2 Standard</span>
               </div>
               <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Distributed Architecture</span>
               </div>
            </div>
          </div>
        </div>

        {/* ── Feature Grid Below Map ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { icon: Users, title: "Distributed Culture", desc: "Our team spans 12 countries and 6 timezones, ensuring we remain as distributed as the workforces we serve." },
            { icon: Zap, title: "Latency Zero", desc: "Global edge network deployments ensure the StaffSchedule dashboard is instantaneous, no matter where you are." },
            { icon: ShieldCheck, title: "Data Sovereignty", desc: "Automated local data hosting keeps your employee information compliant with regional regulations globally." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
