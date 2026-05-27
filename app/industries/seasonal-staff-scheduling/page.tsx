"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  CalendarDays, Users, TrendingUp, Sun, Snowflake, CheckCircle2,
  Star, ChevronDown, Clock, MessageCircle, BarChart, ArrowRight,
  UserPlus, ShieldCheck, UserCheck, Zap
} from "lucide-react";

// ─── SECTION: HERO (TIMELINE SCALE CHART) ──────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#fffdfa] pt-24 pb-16">
      {/* Warm background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 right-[-10%] w-[800px] h-[800px] bg-amber-400/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs tracking-wider uppercase mb-6"
            >
              <Zap size={14} className="text-amber-600" />
              Scale Up in Seconds
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6"
            >
              Scale Your Workforce For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-purple-600">
                Every Season.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl"
            >
              Whether it's the holiday retail rush, summer camps, or harvest season — manage the chaos. Onboard 50 temporary workers in minutes, manage fluctuating availability, and auto-generate schedules that match peak demand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link href="/signup">
                <button className="h-14 px-8 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide">
                  Start Your Free Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-8 rounded-xl font-bold border-2 border-amber-200 bg-white text-amber-700 hover:bg-amber-50 transition-all w-full sm:w-auto text-sm">
                  Watch Demo
                </button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 text-sm"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <span className="font-bold text-slate-800">4.8/5</span>
                <span className="text-slate-500">Reviews</span>
              </div>
              <div className="text-slate-500">
                Trusted by <strong className="text-slate-800">1,200+</strong> seasonal businesses
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Scaling Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="relative"
          >
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-purple-900/10 p-6 relative">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-800">Staffing Demand vs Active Employees</h3>
                  <p className="text-xs text-slate-500">Year-over-Year comparison</p>
                </div>
                <div className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-purple-200 flex items-center gap-1">
                  <TrendingUp size={14}/> Peak Season
                </div>
              </div>

              {/* Chart area */}
              <div className="relative h-64 border-b border-l border-slate-200 flex items-end justify-between px-2 pb-0 pt-8">
                {/* Background grid */}
                <div className="absolute inset-0 grid grid-rows-4 opacity-50 z-0">
                  <div className="border-b border-slate-100"></div>
                  <div className="border-b border-slate-100"></div>
                  <div className="border-b border-slate-100"></div>
                  <div className="border-b border-slate-100"></div>
                </div>

                {/* Bars representing staff numbers */}
                {[
                  { month: "Jan", h: "20%", icon: Snowflake, c: "bg-slate-300" },
                  { month: "Feb", h: "20%", icon: null, c: "bg-slate-300" },
                  { month: "Mar", h: "25%", icon: null, c: "bg-slate-300" },
                  { month: "Apr", h: "40%", icon: null, c: "bg-amber-300" },
                  { month: "May", h: "70%", icon: null, c: "bg-amber-400" },
                  { month: "Jun", h: "90%", icon: Sun, c: "bg-amber-500 relative" }, // Peak
                  { month: "Jul", h: "100%", icon: null, c: "bg-amber-500" },
                  { month: "Aug", h: "85%", icon: null, c: "bg-amber-400" },
                  { month: "Sep", h: "40%", icon: null, c: "bg-amber-300" },
                  { month: "Oct", h: "20%", icon: null, c: "bg-slate-300" },
                  { month: "Nov", h: "35%", icon: null, c: "bg-purple-400" },
                  { month: "Dec", h: "60%", icon: Snowflake, c: "bg-purple-500" },
                ].map((col, i) => (
                  <div key={i} className="flex flex-col items-center z-10 w-[6%] h-full justify-end group">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: col.h }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.05, type: "spring" }}
                      className={`w-full rounded-t-md ${col.c} hover:opacity-80 transition-opacity`}
                    >
                      {i === 5 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl"
                        >
                          +45 Hires
                        </motion.div>
                      )}
                    </motion.div>
                    <span className="text-[10px] text-slate-400 font-medium mt-2">{col.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating feature card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8, type: "spring" }}
              className="absolute -left-8 top-1/3 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 z-20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Time to Onboard</p>
                <p className="font-black text-slate-800 text-lg">Under 2 mins</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── SECTION: PAIN POINTS ─────────────────────────────────────────────────────
function PainPointsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const points = [
    {
      title: "Onboarding bottlenecks",
      desc: "Hiring 50 temporary workers means manually entering 50 emails, phone numbers, and availability charts into a spreadsheet. By the time they're in the system, the peak season is half over."
    },
    {
      title: "Crazy availability changes",
      desc: "Seasonal staff are often students, parents, or people with second jobs. Their availability changes weekly. When you schedule them during a class, they no-show, and you're left understaffed during a rush."
    },
    {
      title: "Paying for inactive users",
      desc: "Most software charges you per user per month. Why should you pay for 100 employees in January when you only employ 20 people off-season? You end up deleting users and losing their data."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight"
          >
            What Seasonal Businesses Deal With Every Year
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Managing a workforce that triples in size overnight breaks most standard scheduling systems.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mb-4">✕</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: FEATURES (HORIZONTAL SCROLL STYLE) ──────────────────────────────
function HorizontalFeatures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: UserPlus,
      title: "Self-Serve Onboarding",
      desc: "Send a single invite link to your entire new cohort. They download the app, create their profile, and enter their own availability. You just click 'Approve'.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Clock,
      title: "Dynamic Availability",
      desc: "Staff can update their availability week-to-week via the app (subject to your approval). The auto-scheduler will never place a worker in a slot they marked unavailable.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: BarChart,
      title: "Demand-Based Auto-Scheduling",
      desc: "Input your peak traffic hours or historical sales data, and the system automatically generates a schedule that puts more staff on the floor when you're busy.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: ShieldCheck,
      title: "Archive & Reactivate",
      desc: "When the season ends, archive your temporary staff. You stop paying for them, but retain all their historical data, performance notes, and contact info for next year.",
      color: "from-teal-500 to-emerald-500"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-900 to-purple-900/20 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Built for Elastic Workforces</h2>
            <p className="text-slate-400 text-lg">Features designed specifically for high-turnover, rapid-scaling businesses.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition-colors relative overflow-hidden group"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${f.color}`}></div>
                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mb-6 mt-2 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: MOBILE APP VIEW ─────────────────────────────────────────────────
function AppViewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -5 }} animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}} transition={{ duration: 0.8 }}
              className="w-72 bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl p-4 z-10"
            >
               <div className="bg-amber-500 rounded-2xl p-5 mb-4 text-white">
                 <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Next Shift</p>
                 <p className="text-xl font-black">Friday, 2:00 PM</p>
                 <p className="text-sm mt-1 opacity-90">Retail Floor · 6 hrs</p>
               </div>

               <div className="bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-700">
                 <div className="flex justify-between items-center mb-3">
                   <p className="text-white font-bold text-sm">My Availability</p>
                   <p className="text-amber-400 text-[10px] font-bold bg-amber-400/10 px-2 py-1 rounded">Edit</p>
                 </div>
                 {[
                   { d: "Mon", s: "Available" },
                   { d: "Tue", s: "Class (Unavailable)", c: "text-red-400" },
                   { d: "Wed", s: "After 3:00 PM", c: "text-amber-400" },
                   { d: "Thu", s: "Class (Unavailable)", c: "text-red-400" },
                   { d: "Fri", s: "Available" },
                 ].map((a, i) => (
                   <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-700/50 last:border-0 text-xs">
                     <span className="text-slate-400">{a.d}</span>
                     <span className={a.c || "text-green-400"}>{a.s}</span>
                   </div>
                 ))}
               </div>

               <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
                  <p className="text-white font-bold text-sm mb-2">Open Shifts (Need Cover)</p>
                  <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
                    <p className="text-white text-xs font-bold">Saturday · 9:00 AM</p>
                    <p className="text-slate-400 text-[10px] mt-0.5 mb-2">Warehouse loading</p>
                    <button className="w-full bg-amber-500 text-slate-900 font-bold text-[10px] py-1.5 rounded-lg">Claim Shift</button>
                  </div>
               </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight"
            >
              Give Temporary Staff the Tools to Manage Themselves
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 mb-8 leading-relaxed"
            >
              When you hire dozens of people at once, you don't have time to hold their hands. The StaffSchedule.io mobile app shifts the administrative burden from your managers to the employees.
            </motion.p>

            <ul className="space-y-4">
              {[
                "Employees input their own changing availability",
                "Shift trades happen in the app (with auto-manager approval options)",
                "Open shifts can be claimed by staff looking for extra hours",
                "Instant push notifications mean no more 'I didn't see the schedule' excuses",
                "Group chat keeps the whole seasonal team connected"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-1" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: FAQ ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const faqs = [
    {
      q: "What is the best scheduling app for seasonal workers?",
      a: "StaffSchedule.io is widely considered the best because of its self-serve onboarding and flexible billing. You can send a link to hire 50 people instantly, they set their own availability in the app, and you can archive them when the season ends so you aren't paying for unused licenses."
    },
    {
      q: "How do you manage seasonal employee availability?",
      a: "Seasonal workers, especially students, have schedules that change constantly. StaffSchedule.io lets them update their availability directly through the mobile app. The auto-scheduling tool automatically reads this data and will never assign a shift during a worker's 'unavailable' blocked time."
    },
    {
      q: "Do I have to pay for seasonal employees when they aren't working?",
      a: "No. StaffSchedule.io allows you to 'Archive' employees when the season ends. Archived employees do not count toward your active user billing plan. However, you retain all their past schedule data, hours worked, and contact info so you can easily reactivate them next season."
    },
    {
      q: "Can seasonal staff trade shifts with each other?",
      a: "Yes. Staff can offer up shifts or request trades within the mobile app. The system automatically ensures that the person picking up the shift is qualified for the role and won't hit overtime limits. You can configure the system to require manager approval for trades, or auto-approve them."
    },
    {
      q: "How fast can I generate a schedule for a large temporary team?",
      a: "Once availability is entered, you can use the Auto-Build feature to generate a full weekly schedule for 100+ employees in under a minute. The system matches your required coverage levels with staff availability and role qualifications automatically."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="text-slate-500 text-lg">Managing temporary staff comes with unique challenges. We have the answers.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-amber-500 shadow-lg shadow-amber-100" : "border-slate-200 hover:border-amber-300"}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-center justify-between p-6 font-bold text-slate-800 text-sm md:text-base"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-amber-500 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: CTA ─────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 to-purple-700 p-12 md:p-16 text-center shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready for Your Next Peak Season?
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              Stop letting scheduling chaos hold back your seasonal revenue. Onboard fast, schedule smart, and pay only for active users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="h-14 px-10 rounded-xl font-black bg-white text-slate-900 hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1 text-sm w-full sm:w-auto">
                  Start Free 14-Day Trial
                </button>
              </Link>
              <Link href="/demo">
                <button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">
                  Schedule a Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SeasonalStaffPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HeroSection />
      <PainPointsSection />
      <HorizontalFeatures />
      <AppViewSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
