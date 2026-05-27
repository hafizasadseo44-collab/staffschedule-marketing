"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Factory, Cog, Repeat, ShieldCheck, CheckCircle2, Star, ChevronDown,
  Smartphone, BarChart3, Users, AlertTriangle, Activity, Zap,
  TrendingUp, ArrowRight, CalendarDays, ClipboardCheck, History
} from "lucide-react";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f172a] pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[600px] bg-indigo-600/30 rounded-full blur-[160px]" />
        <motion.div animate={{ opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-xs tracking-widest uppercase mb-6">
              <Factory size={14} className="text-indigo-400" /> Plant Operations & HR
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Manufacturing Scheduling Software for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Continuous Production.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
              Stop fighting with Excel to manage rotating shifts and union compliance. StaffSchedule.io gives plant managers an automated, compliance-first scheduling platform built to keep production lines running 24/7 without the administrative headache.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/signup"><button className="h-14 px-8 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide">Start Free Trial</button></Link>
              <Link href="/demo"><button className="h-14 px-8 rounded-xl font-bold border border-slate-600 bg-slate-800/60 text-slate-200 hover:bg-slate-700 transition-all w-full sm:w-auto text-sm">Request Enterprise Demo</button></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}<span className="text-white font-bold ml-1">4.9</span><span className="text-slate-400">· 642 reviews</span></div>
              <span className="text-slate-400">Powering <span className="text-white font-bold">1,200+</span> manufacturing plants</span>
            </motion.div>
          </div>

          {/* RIGHT: Plant Dashboard & Shift Builder */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="relative">
            <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden relative z-10">
              <div className="bg-slate-800 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3"><Cog size={16} className="text-indigo-400" /><span className="text-white font-bold text-sm">Line 1: Auto-Shift Generator (DuPont Pattern)</span></div>
              </div>

              {/* Pattern visualization */}
              <div className="p-4 border-b border-slate-700/60 bg-slate-800/30">
                <p className="text-xs text-slate-400 font-bold uppercase mb-3 tracking-widest">12-Hour Shift Pattern: Team A</p>
                <div className="flex gap-1">
                  {[
                    "D","D","D","D", "O","O","O", "N","N","N", "O","O","O","O"
                  ].map((shift, i) => (
                    <div key={i} className={`flex-1 h-8 rounded flex items-center justify-center text-[10px] font-bold ${shift === 'D' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : shift === 'N' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                      {shift}
                    </div>
                  ))}
                </div>
              </div>

              {/* Roster alerts */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-white font-bold text-sm">Shift: Night 1 (Tonight)</p>
                  <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-bold">1 Gap Detected</span>
                </div>
                {[
                  { role: "Line Supervisor", name: "David K.", status: "Confirmed", c: "text-green-400" },
                  { role: "Machine Operator (Cert Req)", name: "Maria T.", status: "Confirmed", c: "text-green-400" },
                  { role: "Quality Control", name: "Unassigned", status: "Required", c: "text-red-400 animate-pulse" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800 border border-slate-700">
                    <div>
                      <p className="text-slate-300 text-xs font-bold uppercase">{r.role}</p>
                      <p className="text-white text-sm mt-0.5">{r.name}</p>
                    </div>
                    <span className={`text-[10px] font-bold ${r.c}`}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating compliance alert */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
              className="absolute -right-6 top-1/3 bg-white rounded-xl shadow-xl border border-slate-100 p-4 flex items-center gap-4 z-20">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><ShieldCheck size={20} className="text-red-600" /></div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Compliance Block</p>
                <p className="font-black text-slate-800 text-xs mt-0.5">Worker lacks 8hr required rest.</p>
              </div>
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
    { val: "100%", label: "Union & OSHA scheduling compliance enforcement", icon: ShieldCheck },
    { val: "6hrs", label: "Average time saved weekly per plant manager", icon: History },
    { val: "85%", label: "Faster shift-cover resolution for line operators", icon: Zap },
    { val: "1,200+", label: "Manufacturing plants powered by StaffSchedule.io", icon: Factory },
  ];
  return (
    <section ref={ref} className="py-14 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="text-center">
            <Icon size={20} className="mx-auto mb-3 text-indigo-400" />
            <p className="text-3xl font-black text-white mb-1">{s.val}</p>
            <p className="text-slate-400 text-sm leading-snug">{s.label}</p>
          </motion.div>;
        })}
      </div>
    </section>
  );
}

// ─── PAIN POINTS ──────────────────────────────────────────────────────────────
function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const points = [
    { icon: Repeat, title: "Building rotating schedules is a nightmare", desc: "Your plant runs a 4-on-4-off schedule. Doing that math across 200 employees in Excel takes hours. When one person takes PTO, the whole delicate pattern falls apart and you have to recalculate the coverage manually." },
    { icon: ShieldCheck, title: "Compliance violations cost thousands", desc: "Between OSHA fatigue guidelines and complex union agreements (seniority-based overtime, mandatory rest periods), your supervisors are constantly guessing if a schedule is legal. One mistake can lead to costly grievances." },
    { icon: Activity, title: "Production halts when critical roles are absent", desc: "If your certified crane operator calls in sick at 5 AM, you have minutes to find a replacement. Without a system that instantly shows you who else has that specific certification and is available, the line stops." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3">The Manufacturing Problem</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Excel Wasn't Built for 24/7 Production Lines
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-lg text-slate-600 leading-relaxed">
            When the production line has to run 24 hours a day, your scheduling process can't rely on fragile spreadsheets and supervisor memory. Here's what breaks down in standard manufacturing workforce management.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p, i) => {
            const Icon = p.icon;
            return <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.1 }}
              className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-5"><Icon size={22} className="text-indigo-600" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES (INTERACTIVE TABS) ──────────────────────────────────────────────
function FeaturesSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const tabs = [
    {
      label: "Rotating Patterns", icon: Repeat,
      title: "Automate Any Rotation Pattern Instantly",
      desc: "Stop manually plotting out weeks of shifts. Select a standard template (DuPont, Pitman, Continental, 2-2-3) or build your custom rotation once. Assign workers to a team, and StaffSchedule.io will automatically generate their exact schedule for the rest of the year.",
      points: ["Pre-built templates for all standard 12-hour and 8-hour rotations", "Auto-generate schedules months in advance", "Instantly recalculate coverage when PTO is approved", "Visual shift pattern builder"],
    },
    {
      label: "Compliance & Unions", icon: ShieldCheck,
      title: "Hard-Coded Compliance Rules",
      desc: "Turn your complex union handbook into automated software rules. The system blocks managers from assigning shifts that violate mandatory rest periods, exceeds overtime caps, or ignores seniority requirements for open shifts.",
      points: ["Mandatory 8-hour or 10-hour rest period enforcement", "Seniority-based open shift distribution", "OSHA fatigue guideline tracking", "Audit logs for all scheduling changes"],
    },
    {
      label: "Skills & Certifications", icon: ClipboardCheck,
      title: "Never Schedule an Uncertified Operator",
      desc: "Attach specific required certifications to specific roles (e.g., Forklift, CNC Operator, Hazmat). The system tracks every employee's certs and expiration dates, warning you 30 days before expiry and blocking expired operators from being scheduled.",
      points: ["Role-based certification requirements", "Automated expiry warning notifications", "Block expired workers from shift assignment", "Centralized document storage"],
    },
    {
      label: "Callouts & Coverage", icon: AlertTriangle,
      title: "Fill Critical Line Gaps in Minutes",
      desc: "When an operator calls out sick at 4 AM, the system instantly identifies all available, qualified, and compliant (not in overtime/rest period) workers. Send an SMS blast to just those workers and fill the gap before the line stops.",
      points: ["Instant filtered list of available/qualified workers", "Automated SMS/Push shift coverage requests", "First-to-claim or manager-approval workflows", "Zero phone calls required"],
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Industrial-Strength Features
          </motion.h2>
          <p className="text-slate-600 text-lg">Built specifically to handle the rigid requirements of manufacturing operations.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button key={i} onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${active === i ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"}`}>
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
                  <CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5" /><span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Visual abstract */}
          <div className="bg-[#0f172a] rounded-2xl p-6 min-h-[320px] flex flex-col justify-center border border-slate-700">
             <div className="space-y-4">
               {tabs[active].points.map((pt, i) => (
                 <div key={i} className="flex items-center gap-4 bg-slate-800 rounded-xl p-4 border border-slate-700">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${i===0 ? "bg-indigo-500/20 text-indigo-400" : i===1 ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"}`}>
                     {active === 0 ? <Repeat size={16} /> : active === 1 ? <ShieldCheck size={16} /> : active === 2 ? <ClipboardCheck size={16} /> : <Zap size={16} />}
                   </div>
                   <p className="text-slate-300 font-medium text-sm">{pt}</p>
                 </div>
               ))}
             </div>
          </div>
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
    { name: "Robert Gaines", title: "Plant Manager, Apex Automotive Parts", location: "Detroit, MI", avatar: "https://i.pravatar.cc/100?img=15", rating: 5, quote: "We run a 2-2-3 schedule across 450 employees. Building that schedule used to take our HR team a full day every month, not including adjustments for PTO. With StaffSchedule.io, we set the pattern once and it rolls forward automatically. It's flawless." },
    { name: "Elena Rostova", title: "HR Director, Global Packaging Solutions", location: "Chicago, IL", avatar: "https://i.pravatar.cc/100?img=42", rating: 5, quote: "Union compliance was our biggest headache. Supervisors were accidentally assigning overtime to the wrong people, violating seniority rules. We built those rules into StaffSchedule.io, and now the system literally prevents them from making those mistakes. Grievances dropped by 90%." },
    { name: "Mark Williams", title: "Operations Lead, Valley Food Processing", location: "Fresno, CA", avatar: "https://i.pravatar.cc/100?img=60", rating: 5, quote: "When someone calls out sick at 3 AM for a 5 AM shift, we used to panic. Now, the system shows us exactly who is certified to run that specific machine, who hasn't maxed out their hours, and lets us text them all at once. We fill the shift before I even finish my coffee." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Trusted on the Factory Floor</motion.h2>
          <p className="text-slate-500 text-lg">See how plant managers are eliminating scheduling chaos.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="flex mb-4">{[...Array(t.rating)].map((_, si) => <Star key={si} size={14} className="text-amber-400 fill-amber-400" />)}</div>
              <p className="text-slate-700 leading-relaxed text-sm flex-1 mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div><p className="font-bold text-slate-900 text-sm">{t.name}</p><p className="text-xs text-slate-400">{t.title} · {t.location}</p></div>
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
    { q: "What is manufacturing scheduling software?", a: "Manufacturing scheduling software helps plant managers and HR teams plan factory shifts, manage rotating schedules, track overtime compliance, and coordinate the production workforce. It ensures the right number of workers with the right certifications are on each production line for every shift, replacing manual Excel spreadsheets." },
    { q: "How does the software handle rotating shift patterns like DuPont or 2-2-3?", a: "StaffSchedule.io includes pre-built templates for standard continuous operation patterns (DuPont, Pitman, Continental, 2-2-3, 4-on-4-off). You assign a worker or team to a pattern, set the start date, and the system automatically rolls the schedule forward indefinitely. If you have a custom rotation, you can build it in our pattern generator." },
    { q: "Can it handle complex union agreements and seniority rules?", a: "Yes. The platform is highly configurable. You can set rules requiring minimum rest periods between shifts, establish overtime limits, and configure open-shift distribution to respect seniority hierarchies. The system flags any schedule assignment that violates your custom compliance rules." },
    { q: "How does it prevent uncertified workers from operating machinery?", a: "You can create custom certifications (e.g., Forklift, CNC Level 2, Hazmat) and assign them as requirements for specific shift roles. The system tracks every employee's certification status and expiration dates. It will physically block a manager from assigning an employee to a role if they lack the required certification or if their certification is expired." },
    { q: "How do employees view their schedules and request time off?", a: "Employees use the free StaffSchedule.io mobile app (iOS and Android). They can view their upcoming shifts months in advance, submit PTO requests (which route to their supervisor for approval), and trade shifts with qualified co-workers. When a schedule changes, they receive an instant push notification." },
    { q: "Can it integrate with our existing ERP or payroll software?", a: "Yes. StaffSchedule.io offers direct integrations with major payroll providers (ADP, Paychex, Gusto, QuickBooks) to export time and attendance data. We also offer API access for custom integrations with enterprise ERP systems (SAP, Oracle) to align labor scheduling with production planning." },
  ];
  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Manufacturing Scheduling FAQs</motion.h2>
          <p className="text-slate-500 text-lg">Answers for plant managers, HR directors, and operations leads.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-indigo-500 shadow-lg shadow-indigo-50" : "border-slate-200 hover:border-indigo-300"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left flex items-center justify-between p-6 font-bold text-slate-800 text-sm md:text-base">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-indigo-500 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 p-12 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-indigo-200 text-xs font-bold uppercase tracking-widest mb-6"><Factory size={12} />Enterprise Manufacturing Software</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Keep the Lines Running. Drop the Spreadsheets.</h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
              Automate your complex shift rotations, enforce labor compliance automatically, and never scramble to cover a no-show again. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup"><button className="h-14 px-10 rounded-xl font-black bg-white text-indigo-900 hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-1 text-sm w-full sm:w-auto">Start Free 14-Day Trial</button></Link>
              <Link href="/demo"><button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">Request Enterprise Demo</button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ManufacturingSchedulingSoftwarePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HeroSection />
      <StatsBar />
      <PainSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
