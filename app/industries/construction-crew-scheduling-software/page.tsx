"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  HardHat, Hammer, Wrench, Clock, CheckCircle2, Star, ChevronDown,
  Smartphone, BarChart3, Users, AlertTriangle, MapPin, Zap, Shield,
  TrendingUp, ArrowRight, Calendar, CloudRain, Sun, FileCheck, Radio
} from "lucide-react";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-1/4 right-[-10%] w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[150px]" />
        <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-600/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "linear-gradient(45deg, #f97316 25%, transparent 25%, transparent 75%, #f97316 75%, #f97316), linear-gradient(45deg, #f97316 25%, transparent 25%, transparent 75%, #f97316 75%, #f97316)", backgroundSize: "40px 40px", backgroundPosition: "0 0, 20px 20px" }} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 font-bold text-xs tracking-widest uppercase mb-6">
              <HardHat size={14} className="text-orange-500" /> Field Crew & Contractor Scheduling
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Construction Crew Scheduling That Actually{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Works in the Field.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
              Stop relying on whiteboards and group texts to manage your job sites. StaffSchedule.io gives project managers a single view to coordinate crews, track equipment, and communicate instantly when weather delays strike.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/signup"><button className="h-14 px-8 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide">Start Free Trial</button></Link>
              <Link href="/demo"><button className="h-14 px-8 rounded-xl font-bold border border-slate-600 bg-slate-800/60 text-slate-200 hover:bg-slate-700 transition-all w-full sm:w-auto text-sm">Watch Demo</button></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1.5">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}<span className="text-white font-bold ml-1">4.8</span><span className="text-slate-400">· 892 reviews</span></div>
              <span className="text-slate-400">Trusted by <span className="text-white font-bold">1,500+</span> contractors</span>
            </motion.div>
          </div>

          {/* RIGHT: Job Site Dashboard */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
              <div className="bg-slate-800 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3"><MapPin size={16} className="text-orange-400" /><span className="text-white font-bold text-sm">Site: Westside Commercial Build</span></div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-700 text-xs font-bold text-slate-300"><Sun size={12} className="text-amber-400" /> 72° Clear</div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-700/60 border-b border-slate-700/60">
                {[
                  { label: "Crews On-Site", val: "4", color: "text-white" },
                  { label: "Workers", val: "38", color: "text-white" },
                  { label: "Alerts", val: "1", color: "text-amber-400" },
                ].map((m, i) => (
                  <div key={i} className="py-4 text-center">
                    <p className={`text-xl font-black ${m.color}`}>{m.val}</p>
                    <p className="text-slate-500 text-[10px] mt-1 font-medium">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 space-y-3">
                {[
                  { crew: "Concrete Pouring (Team A)", foreman: "Dave Miller", status: "On-Site", time: "6:00 AM – 2:00 PM", c: "text-green-400 bg-green-500/10 border-green-500/20" },
                  { crew: "Electrical Rough-in", foreman: "Sarah Jenkins", status: "On-Site", time: "7:00 AM – 3:30 PM", c: "text-green-400 bg-green-500/10 border-green-500/20" },
                  { crew: "HVAC Installers", foreman: "Mike Chen", status: "Arriving Soon", time: "10:00 AM – 6:00 PM", c: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                ].map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-orange-500/30 transition-colors">
                    <div>
                      <p className="text-white font-semibold text-sm">{c.crew}</p>
                      <p className="text-slate-500 text-[10px] mt-0.5">Foreman: {c.foreman} · {c.time}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${c.c}`}>{c.status}</span>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 pt-0">
                <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-3 flex items-center gap-3">
                  <AlertTriangle size={14} className="text-amber-400 shrink-0" />
                  <p className="text-amber-200 text-xs flex-1">Approaching Overtime: Concrete Team A has 3 workers over 38 hours.</p>
                  <button className="text-[10px] bg-amber-500 text-slate-900 px-3 py-1.5 rounded-lg font-bold">Review</button>
                </div>
              </div>
            </div>
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
    { val: "3.5hrs", label: "Average time saved weekly on crew scheduling", icon: Clock },
    { val: "22%", label: "Reduction in unnecessary overtime costs", icon: TrendingUp },
    { val: "100%", label: "Real-time visibility into who is actually on the job site", icon: MapPin },
    { val: "1,500+", label: "Contractors build better with StaffSchedule.io", icon: Building2 },
  ];
  return (
    <section ref={ref} className="py-14 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="text-center">
            <Icon size={20} className="mx-auto mb-3 text-orange-500" />
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
    { icon: CloudRain, title: "Weather Delays Create Scheduling Chaos", desc: "A morning storm washes out your site. Now you have to call 15 guys, reschedule the concrete trucks, and try to find work for the framing crew on a different site. Without a centralized system, half the crew shows up anyway." },
    { icon: AlertTriangle, title: "Unplanned Overtime Destroys Budgets", desc: "When foremen build schedules manually, they can't easily track who is close to hitting 40 hours. You don't realize you're paying time-and-a-half until the payroll report comes out the following week." },
    { icon: Users, title: "Where is everyone?", desc: "You're managing three active job sites but you can't be at all of them. Are the subs there? Did the heavy equipment operator show up? Relying on phone calls from the foreman leaves you completely blind to actual labor costs." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Why Whiteboards Don't Work in Construction
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }} className="text-lg text-slate-600 leading-relaxed">
            Construction is unpredictable. Schedules change daily. When your scheduling tool is a whiteboard in the office or a spreadsheet on your laptop, the guys in the field never have the latest plan.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p, i) => {
            const Icon = p.icon;
            return <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.1 }}
              className="p-8 rounded-2xl bg-orange-50 border border-orange-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5"><Icon size={22} className="text-orange-600" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES BENTO ───────────────────────────────────────────────────────────
function FeaturesBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Built for the Field, Designed for the Office</motion.h2>
          <p className="text-slate-600 text-lg">Connect your project managers, foremen, and field workers on one unified platform.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 auto-rows-[260px]">
          {/* Large Card: Multi-Site Management */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-slate-900 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.3),transparent_60%)]" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-5"><MapPin size={24} className="text-orange-400" /></div>
              <h3 className="text-2xl font-black text-white mb-2">Multi-Site Job Boards</h3>
              <p className="text-slate-300 text-sm max-w-lg">Create a dedicated scheduling board for every active job site. See exactly which crews are assigned where, move workers between sites seamlessly, and prevent double-booking across projects.</p>
            </div>
          </motion.div>

          {/* Small: Weather Alerts */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4"><CloudRain size={20} className="text-blue-600" /></div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Mass Communication</h3>
            <p className="text-slate-600 text-sm leading-relaxed flex-1">Rain out? Send an instant push notification or SMS to the entire crew or specific trades in one click. No more endless calling.</p>
          </motion.div>

          {/* Small: Certifications */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4"><FileCheck size={20} className="text-emerald-600" /></div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Certification Tracking</h3>
            <p className="text-slate-600 text-sm leading-relaxed flex-1">Track OSHA safety certs, equipment licenses, and union cards. The system warns you before you assign an uncertified worker to a job.</p>
          </motion.div>

          {/* Large: Overtime */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 flex flex-col justify-end relative border border-orange-100 group">
            <div className="absolute top-8 right-8 text-orange-200"><TrendingUp size={100} /></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5"><BarChart3 size={24} className="text-orange-600" /></div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Proactive Overtime Alerts</h3>
              <p className="text-slate-600 text-sm max-w-lg">Stop paying unexpected time-and-a-half. Set daily or weekly threshold alerts. When a foreman tries to schedule a worker who will hit overtime, the system flags it immediately.</p>
            </div>
          </motion.div>
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
    { icon: "🏗️", title: "General Contractors", desc: "Coordinate multiple sub-contractors, schedule phased site work, and manage your core team's assignments across various active builds." },
    { icon: "⚡", title: "Electrical & Plumbing", desc: "Manage service calls alongside long-term new construction projects. Track apprentice ratios and journeyman certifications." },
    { icon: "🛣️", title: "Civil & Road Construction", desc: "Manage complex shifts, track heavy equipment assignments alongside operators, and adjust schedules quickly for weather delays." },
    { icon: "🧱", title: "Masonry & Concrete", desc: "Coordinate massive pours, schedule specialized finishing crews, and track hours accurately for prevailing wage jobs." },
    { icon: "🌲", title: "Landscaping & Hardscaping", desc: "Schedule residential routes alongside large commercial installs. Manage seasonal workers and track equipment allocation." },
    { icon: "🛠️", title: "Specialty Trades", desc: "From HVAC to roofing, ensure the right skilled workers are at the right site, with the right tools, at exactly the right time." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Built for the Toughest Trades
          </motion.h2>
          <p className="text-slate-600 text-lg">StaffSchedule.io is tough enough to handle the scheduling demands of any construction specialty.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-orange-400 hover:shadow-md transition-all">
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
    { name: "John T.", title: "Project Manager, Summit Builders", location: "Denver, CO", avatar: "https://i.pravatar.cc/100?img=53", rating: 5, quote: "We have 5 active commercial sites and managing who was supposed to be where was a nightmare. StaffSchedule.io gave us a master board. Now I can see every foreman, every crew, and every sub in one place. It eliminated the morning 'where are you?' phone calls entirely." },
    { name: "Maria Gonzales", title: "Operations, Precision Electrical", location: "Austin, TX", avatar: "https://i.pravatar.cc/100?img=21", rating: 5, quote: "The overtime tracking is worth its weight in gold. Our foremen used to just grab whoever was available to finish a rough-in, not realizing that guy was already at 42 hours for the week. The app stops that before it happens. It's saved us thousands." },
    { name: "Dave R.", title: "Owner, Rocky Mountain Concrete", location: "Salt Lake City, UT", avatar: "https://i.pravatar.cc/100?img=11", rating: 5, quote: "When weather ruins a pour, the mass communication tool is incredible. Instead of having my supervisor spend 45 minutes calling guys at 5 AM to tell them not to come in, we hit one button and everyone gets a text. It's brilliant." },
  ];
  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black mb-4">
            Trusted on the Job Site
          </motion.h2>
          <p className="text-slate-400 text-lg">See how other contractors are building better with our scheduling software.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              className="bg-slate-800/70 border border-slate-700 rounded-2xl p-8 flex flex-col hover:border-orange-500/40 transition-colors">
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
    { q: "What is construction crew scheduling software?", a: "Construction scheduling software helps project managers and foremen assign crews to different job sites, track worker hours, manage equipment, and communicate changes. It replaces whiteboards and group texts with a centralized digital board that updates in real time on everyone's mobile device." },
    { q: "How does it handle multi-site scheduling?", a: "StaffSchedule.io allows you to create separate 'Schedules' or 'Locations' for every active project. Project Managers can view a master dashboard of all sites, while a Foreman only sees the schedule for their specific site. You can easily drag and drop workers from one site to another without causing double-booking conflicts." },
    { q: "Can workers clock in from the job site using the app?", a: "Yes. The StaffSchedule.io mobile app includes a mobile time clock. You can enable GPS geofencing, meaning workers can only clock in when they are physically within the boundaries of the job site. This ensures accurate time tracking and prevents time theft." },
    { q: "Does it track prevailing wage jobs differently?", a: "Yes. You can assign specific pay rates to specific roles or specific job sites. If a worker works 20 hours on a standard commercial site and 20 hours on a prevailing wage government site, the system tracks and exports those hours correctly for payroll processing." },
    { q: "How does the software handle rainouts or weather delays?", a: "StaffSchedule.io includes a mass communication feature. If a site is rained out, the foreman can send an instant push notification or SMS to every worker scheduled for that specific site, telling them to stay home or redirecting them to an indoor site. It takes seconds, not hours." },
    { q: "Does the app work if the job site has no cell service?", a: "Yes. The StaffSchedule.io mobile app features offline mode. Workers can view their downloaded schedule and even log their time while offline. The app automatically syncs all data back to the central server as soon as the device regains cellular or Wi-Fi connectivity." },
  ];
  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Construction Scheduling FAQs</motion.h2>
          <p className="text-slate-500 text-lg">Answers for project managers, business owners, and field operations teams.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-orange-500 shadow-lg shadow-orange-50" : "border-slate-200 hover:border-orange-300"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left flex items-center justify-between p-6 font-bold text-slate-800 text-sm md:text-base">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-orange-500 transition-transform ${open === i ? "rotate-180" : ""}`} />
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
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-slate-900 p-12 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-orange-100 text-xs font-bold uppercase tracking-widest mb-6"><HardHat size={12} />Built for the Trades</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Stop Scheduling from the Truck</h2>
            <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto">
              Get your crews organized, eliminate unnecessary overtime, and keep everyone on the same page. Start your free trial today and build your first schedule in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup"><button className="h-14 px-10 rounded-xl font-black bg-white text-orange-900 hover:bg-orange-50 transition-all shadow-xl hover:-translate-y-1 text-sm w-full sm:w-auto">Start Free 14-Day Trial</button></Link>
              <Link href="/demo"><button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">Book a Demo</button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ConstructionCrewSchedulingSoftwarePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HeroSection />
      <StatsBar />
      <PainSection />
      <FeaturesBento />
      <IndustryShowcase />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
