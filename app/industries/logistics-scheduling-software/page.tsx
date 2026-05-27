"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Building2, Layers, Package, Clock, CheckCircle2, Star, ChevronDown,
  Smartphone, BarChart3, Users, AlertTriangle, MapPin, Zap, Shield,
  TrendingUp, ArrowRight, Calendar, RefreshCw, Settings, Globe
} from "lucide-react";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#070d1a] pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[600px] bg-cyan-900/30 rounded-full blur-[160px]" />
        <motion.div animate={{ opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 11, repeat: Infinity, delay: 3 }}
          className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-900/30 rounded-full blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.9) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs tracking-widest uppercase mb-6">
              <Globe size={13} className="text-cyan-400" /> Enterprise Logistics Management
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Logistics Scheduling Software for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Complex Operations.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
              Managing a logistics workforce across multiple warehouses, shifts, and transport hubs is complicated enough. StaffSchedule.io gives operations managers a single command center to staff every facility, every shift, and every role — without the chaos.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/signup"><button className="h-14 px-8 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-600 text-slate-900 shadow-xl shadow-cyan-500/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide">Start Free Trial</button></Link>
              <Link href="/demo"><button className="h-14 px-8 rounded-xl font-bold border border-slate-600 bg-slate-800/60 text-slate-200 hover:bg-slate-700 transition-all w-full sm:w-auto text-sm">Request a Demo</button></Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1.5">{[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}<span className="text-white font-bold ml-1">4.9</span><span className="text-slate-400">· 1,038 reviews</span></div>
              <span className="text-slate-400"><span className="text-white font-bold">500+</span> logistics companies worldwide</span>
            </motion.div>
          </div>

          {/* RIGHT: Multi-Location Command Center */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
              <div className="bg-slate-800 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3"><Globe size={15} className="text-cyan-400" /><span className="text-white font-bold text-sm">Operations HQ — All Facilities</span></div>
                <span className="text-[10px] text-cyan-400 font-bold">4 Locations Active</span>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { name: "Warehouse A — Chicago Hub", shift: "Night Shift: 10:30 PM – 6:30 AM", staff: "24/24", status: "Fully Staffed", c: "text-green-400 bg-green-500/10 border-green-500/20" },
                  { name: "Distribution B — Dallas", shift: "Day Shift: 7:00 AM – 3:00 PM", staff: "18/20", status: "2 Gaps", c: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                  { name: "Cross-Dock C — Memphis", shift: "Eve Shift: 3:00 PM – 11:00 PM", staff: "12/12", status: "Fully Staffed", c: "text-green-400 bg-green-500/10 border-green-500/20" },
                  { name: "Port Terminal — LA", shift: "Night Shift: 12:00 AM – 8:00 AM", staff: "8/15", status: "Critical Gap", c: "text-red-400 bg-red-500/10 border-red-500/20" },
                ].map((loc, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                    <div>
                      <p className="text-white font-semibold text-sm">{loc.name}</p>
                      <p className="text-slate-500 text-[10px] mt-0.5">{loc.shift} · {loc.staff} workers</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${loc.c}`}>{loc.status}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 pt-0">
                <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-xl p-3 flex items-center gap-3">
                  <AlertTriangle size={14} className="text-cyan-400 shrink-0" />
                  <p className="text-cyan-200 text-xs">Port Terminal needs 7 workers for tonight. 12 qualified available.</p>
                  <button className="ml-auto text-[10px] bg-cyan-500 text-slate-900 px-3 py-1 rounded-lg font-bold shrink-0">Fill Gaps</button>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8 }}
              className="absolute -right-5 bottom-10 bg-white rounded-xl shadow-xl border border-slate-100 p-3.5 flex items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center"><TrendingUp size={17} className="text-cyan-600" /></div>
              <div><p className="text-[9px] text-slate-400 font-bold uppercase">Labor Efficiency</p><p className="font-black text-slate-800 text-base">+28%</p></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const stats = [
    { val: "47%", label: "Of logistics managers report shift gaps as their #1 operational challenge", icon: AlertTriangle },
    { val: "3.8hrs", label: "Wasted per week on manual multi-site scheduling across facilities", icon: Clock },
    { val: "28%", label: "Improvement in labor efficiency reported by logistics clients", icon: TrendingUp },
    { val: "500+", label: "Logistics companies manage their workforce on StaffSchedule.io", icon: Building2 },
  ];
  return (
    <section ref={ref} className="py-14 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="text-center">
              <Icon size={20} className="mx-auto mb-3 text-cyan-400" />
              <p className="text-3xl font-black text-white mb-1">{s.val}</p>
              <p className="text-slate-400 text-sm leading-snug">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── PAIN POINTS ──────────────────────────────────────────────────────────────
function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const problems = [
    { icon: Globe, title: "No single view across all facilities", desc: "Your Chicago warehouse is fully staffed. Dallas has three gaps. Memphis just had a supervisor call out. But you're managing each location on a separate spreadsheet and only find out about problems when they've already become incidents." },
    { icon: RefreshCw, title: "Cross-shift handovers get lost", desc: "In logistics, the outgoing shift's unfinished work needs to reach the incoming shift clearly. When communication relies on sticky notes and hallway conversations, critical cargo status, pending loads, and equipment issues fall through the cracks every day." },
    { icon: Layers, title: "Labor demand is unpredictable", desc: "A delayed freight shipment means your night team suddenly needs 8 more unloaders. Your current system has no way to quickly surface who's available, who's certified for forklift, and who can come in on 2 hours' notice." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-cyan-600 font-bold text-xs uppercase tracking-widest mb-3">The Logistics Challenge</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Why Logistics Scheduling Is a Different Beast
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-lg text-slate-600 leading-relaxed">
            Logistics isn't a 9-to-5 operation. You're managing 24/7 facilities, multiple locations, fluctuating freight volumes, and complex shift patterns — all at once. Here's what breaks down when your workforce management doesn't keep up.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-5"><Icon size={22} className="text-red-600" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE SHOWCASE ─────────────────────────────────────────────────────────
function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const tabs = [
    {
      label: "Multi-Location", icon: Globe,
      title: "Manage Every Facility From One Screen",
      desc: "Stop logging into five different spreadsheets. StaffSchedule.io gives you a unified command center where you can see staffing levels, shift coverage gaps, and live worker status across every warehouse and transport hub simultaneously. Drill into any location with a single click.",
      points: ["Real-time staffing level view per location", "Color-coded coverage alerts (full, partial, critical)", "One-click drill-down to any facility's roster", "Cross-location worker sharing with conflict detection"],
    },
    {
      label: "Shift Planning", icon: Calendar,
      title: "Build Complex Shift Rotations Without the Headache",
      desc: "Logistics runs on 24/7 shift patterns — days, evenings, nights, weekends, and surge coverage for high-volume periods. StaffSchedule.io's drag-and-drop scheduler handles it all. Build recurring rotation templates, copy schedules across locations, and let the system flag any coverage gaps before you publish.",
      points: ["Drag-and-drop shift builder with rotation templates", "24/7 three-shift and four-shift rotation support", "Auto-detect coverage gaps before publishing", "Copy schedules across multiple locations"],
    },
    {
      label: "Compliance", icon: Shield,
      title: "Stay Compliant With Labor Rules Automatically",
      desc: "Logistics operations face strict labor compliance requirements — mandatory rest periods, overtime caps, certification requirements for forklift operators, and OSHA fatigue rules. StaffSchedule.io enforces your configured rules automatically, blocking non-compliant schedules before they're published.",
      points: ["Mandatory rest period enforcement between shifts", "Certification tracking per worker and role", "Overtime threshold alerts before limits are reached", "Audit-ready compliance export reports"],
    },
    {
      label: "Analytics", icon: BarChart3,
      title: "See Where Your Labor Budget Is Actually Going",
      desc: "Labor is your biggest logistics cost. StaffSchedule.io's reporting gives you real-time visibility into labor spend by location, shift type, and team. Identify which facilities are running over-staffed, which shifts have chronic no-shows, and where your overtime spend is concentrated.",
      points: ["Labor cost breakdown by location and shift", "Overtime spend tracking and trend analysis", "No-show and callout rate reporting", "Workforce utilization dashboards"],
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Designed for Operational Complexity
          </motion.h2>
          <p className="text-slate-600 text-lg">Tools built for the realities of logistics — not adapted from generic HR software.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button key={i} onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${active === i ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20" : "bg-white text-slate-600 border border-slate-200 hover:border-cyan-300"}`}>
                <Icon size={15} />{tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-5 leading-tight">{tabs[active].title}</h3>
            <p className="text-slate-600 leading-relaxed mb-7">{tabs[active].desc}</p>
            <ul className="space-y-3">
              {tabs[active].points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={16} className="text-cyan-500 shrink-0 mt-0.5" /><span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Visual */}
          <div className="bg-[#070d1a] rounded-2xl p-6 min-h-[320px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5">
              <span className="text-white font-bold text-sm">{tabs[active].label} Overview</span>
              <span className="text-[10px] text-cyan-400 font-bold">● LIVE</span>
            </div>
            {tabs[active].label === "Multi-Location" && (
              <div className="space-y-3">
                {["Chicago Hub", "Dallas Dist.", "Memphis X-Dock", "LA Port"].map((loc, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-slate-400 text-xs w-24">{loc}</span>
                    <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={inView ? { width: `${[100, 90, 100, 53][i]}%` } : {}} transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                        className={`h-full rounded-full ${[100, 90, 100, 53][i] === 100 ? "bg-green-500" : [100, 90, 100, 53][i] > 70 ? "bg-amber-500" : "bg-red-500"}`} />
                    </div>
                    <span className="text-white text-xs font-bold w-8">{[100, 90, 100, 53][i]}%</span>
                  </div>
                ))}
              </div>
            )}
            {tabs[active].label !== "Multi-Location" && (
              <div className="space-y-3">
                {tabs[active].points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 border border-slate-700">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <p className="text-slate-300 text-xs">{pt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRY SHOWCASE ────────────────────────────────────────────────────────
function IndustryShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scenarios = [
    { icon: "🏭", title: "Warehouse & Distribution Centers", desc: "Schedule receiving, picking, packing, and shipping teams across 3-shift operations. Manage peak-season surge staffing with auto-scheduling." },
    { icon: "🚛", title: "Freight & Transportation Companies", desc: "Coordinate drivers, dispatchers, dock workers, and administrative staff across multiple depots from one unified dashboard." },
    { icon: "⚓", title: "Port & Terminal Operations", desc: "Handle complex crane operator certifications, safety training requirements, and rotating shift patterns for port labor teams." },
    { icon: "❄️", title: "Cold Chain & Refrigerated Logistics", desc: "Ensure qualified operators are assigned to temperature-controlled storage areas. Track certification compliance for food-safe handling." },
    { icon: "🛫", title: "Air Cargo & Airport Logistics", desc: "Manage ground crews, cargo handlers, and customs teams across multiple terminals with real-time gap alerts and compliance enforcement." },
    { icon: "🔄", title: "Third-Party Logistics (3PL)", desc: "Manage workforce across client accounts from one platform. Set up separate scheduling boards per client while maintaining a shared worker pool." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Every Corner of the Logistics Industry
          </motion.h2>
          <p className="text-slate-600 text-lg">From warehouses to air cargo, StaffSchedule.io handles the scheduling complexity of every logistics operation.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-cyan-400 hover:shadow-md transition-all group">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const testimonials = [
    { name: "Sandra Kim", title: "VP Operations, Crestline Freight", location: "Memphis, TN", avatar: "https://i.pravatar.cc/100?img=26", rating: 5, quote: "We run four distribution centers across three time zones. Before StaffSchedule.io, each facility was on a different spreadsheet and I had no idea what anyone was doing in real time. Now I open the dashboard and see every facility's staffing status in about 10 seconds. It changed how I operate." },
    { name: "Tom Nguyen", title: "Warehouse Director, Pacific 3PL", location: "Los Angeles, CA", avatar: "https://i.pravatar.cc/100?img=49", rating: 5, quote: "Managing labor compliance for forklift operators used to be a full-time job. We had certifications expiring mid-shift because nobody was tracking them properly. StaffSchedule.io tracks every certification, alerts us 30 days before expiry, and blocks us from scheduling expired operators. Compliance is now automatic." },
    { name: "Rachel Davies", title: "HR Manager, TransGlobal Logistics", location: "Houston, TX", avatar: "https://i.pravatar.cc/100?img=37", rating: 5, quote: "Our overtime costs were 22% over budget every quarter because nobody could see who was approaching their weekly limit. With StaffSchedule.io's real-time overtime alerts, I get a notification before anyone hits the threshold. We cut overtime costs by 31% in the first six months." },
  ];
  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black mb-4">
            Operations Leaders Who Demand Visibility
          </motion.h2>
          <p className="text-slate-400 text-lg">From distribution centers to international freight, real results from real logistics teams.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              className="bg-slate-800/70 border border-slate-700 rounded-2xl p-8 flex flex-col hover:border-cyan-500/40 transition-colors">
              <div className="flex mb-4">{[...Array(t.rating)].map((_, si) => <Star key={si} size={14} className="text-amber-400 fill-amber-400" />)}</div>
              <p className="text-slate-300 leading-relaxed text-sm flex-1 mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div><p className="font-bold text-white text-sm">{t.name}</p><p className="text-xs text-slate-400">{t.title} · {t.location}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const faqs = [
    { q: "What is logistics scheduling software?", a: "Logistics scheduling software helps operations managers plan warehouse shifts, coordinate transportation teams, and manage multi-location workforces from a single platform. It provides real-time visibility into staffing levels, coverage gaps, and labor costs across the entire logistics operation — replacing disconnected spreadsheets and phone-based coordination." },
    { q: "How does StaffSchedule.io handle scheduling across multiple warehouses?", a: "Each facility gets its own scheduling board, roster, and reporting. Regional managers or VP-level users can see all locations simultaneously on an operations dashboard. Workers can be shared across facilities when needed — the system automatically checks for scheduling conflicts and compliance issues before confirming cross-location assignments." },
    { q: "Can logistics scheduling software manage complex shift rotations?", a: "Yes. StaffSchedule.io supports three-shift, four-shift, continental, DuPont, and fully custom rotation patterns. You build the rotation template once and the system generates future schedules automatically. It handles day, evening, night, and weekend variations while tracking minimum staffing requirements per shift." },
    { q: "How does the software handle compliance for forklift and equipment operators?", a: "Each worker profile stores their certifications, training dates, and expiry dates. When you schedule a shift that requires forklift certification, the system only surfaces workers who are currently certified. Supervisors get automated alerts 30, 14, and 7 days before any certification expires — preventing accidental scheduling of non-compliant operators." },
    { q: "How do logistics companies manage surge staffing during high-volume periods?", a: "StaffSchedule.io has an open shift broadcasting feature. When you need to fill 15 extra positions for a high-volume night, you can broadcast an open shift opportunity to every qualified available worker simultaneously. They receive a push notification and can claim the shift through the mobile app. You can fill a surge staffing need in minutes rather than hours of phone calls." },
    { q: "Does the software track labor costs across locations?", a: "Yes. The analytics dashboard breaks down labor hours and estimated costs by location, shift type, department, and worker. You can compare planned versus actual labor spend, identify which locations are consistently over-staffed or under-staffed, and track overtime spend trends across the organization." },
    { q: "Can workers at one location be scheduled at another facility if needed?", a: "Yes, with the right permissions and configurations. Workers can have multiple home locations, and supervisors with cross-location access can schedule them at any facility. The system automatically prevents double-booking, checks for conflicting shift times, and verifies that the worker's certifications meet the destination facility's requirements." },
    { q: "How quickly can a large logistics operation get set up?", a: "Most mid-size logistics operations (100-500 workers across 2-5 locations) are fully operational in 2-5 business days. Larger enterprises with complex compliance requirements may take 1-2 weeks. Our customer success team provides dedicated onboarding support including roster import, shift template configuration, and manager training." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Questions About Logistics Scheduling Software</motion.h2>
          <p className="text-slate-500 text-lg">Answers for operations directors, warehouse managers, and logistics HR teams.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-cyan-500 shadow-lg shadow-cyan-50" : "border-slate-200 hover:border-cyan-300"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left flex items-center justify-between p-6 font-bold text-slate-800 text-sm md:text-base">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-cyan-500 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RELATED + CTA ────────────────────────────────────────────────────────────
function CTASection() {
  const links = [
    { label: "Delivery Scheduling", href: "/industries/delivery-scheduling-software" },
    { label: "Manufacturing", href: "/industries/manufacturing-scheduling-software" },
    { label: "Construction Crews", href: "/industries/construction-crew-scheduling-software" },
    { label: "Field Service", href: "/industries/field-service-scheduling-software" },
  ];
  return (
    <>
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <p className="text-slate-500 font-semibold text-sm mb-5">Related Industries</p>
          <div className="flex flex-wrap gap-3">
            {links.map((l, i) => <Link key={i} href={l.href}><span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-cyan-400 hover:text-cyan-600 transition-colors">{l.label} <ArrowRight size={13} /></span></Link>)}
          </div>
        </div>
      </section>
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-700 via-blue-800 to-slate-900 p-12 md:p-16 text-center shadow-2xl">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-cyan-200 text-xs font-bold uppercase tracking-widest mb-6"><Globe size={12} />Enterprise Logistics Management</div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">One Platform. Every Warehouse. Every Shift.</h2>
              <p className="text-cyan-100 text-lg mb-10 max-w-2xl mx-auto">Join 500+ logistics companies that replaced disconnected spreadsheets with a unified workforce management platform. See the whole operation. Fill gaps instantly. Control labor costs.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup"><button className="h-14 px-10 rounded-xl font-black bg-white text-cyan-900 hover:bg-cyan-50 transition-all shadow-xl hover:-translate-y-1 text-sm w-full sm:w-auto">Start Free 14-Day Trial</button></Link>
                <Link href="/demo"><button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">Request Enterprise Demo</button></Link>
              </div>
              <p className="mt-6 text-cyan-300 text-sm">No credit card required · Free 14-day trial · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function LogisticsSchedulingSoftwarePage() {
  return (
    <main className="min-h-screen bg-[#070d1a] font-sans">
      <HeroSection />
      <StatsBar />
      <PainSection />
      <FeatureShowcase />
      <IndustryShowcase />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
