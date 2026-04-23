"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Globe2, Heart, Laptop, 
  Lightbulb, Rocket, ShieldCheck, Sparkles, 
  Users, Zap, ChevronRight, Briefcase, X, Upload, CheckCircle2, Loader2, Play, Check, Clock, Code2, Coffee, Video
} from "lucide-react";

// --- Data Models ---
const BENEFITS = [
  { icon: Globe2, title: "Work Anywhere", desc: "Remote-first culture with global talent and flexible hours to fit your life." },
  { icon: Heart, title: "Health & Wellness", desc: "100% covered premium health, dental, and vision for you and your dependents." },
  { icon: Laptop, title: "Home Office Setup", desc: "$3,000 stipend to build your perfect workspace, upgraded every 2 years." },
  { icon: Users, title: "Global Retreats", desc: "All-expenses-paid team retreats twice a year to places like Bali, Lisbon, and Tokyo." },
  { icon: Zap, title: "Unlimited PTO", desc: "Mandatory minimum of 4 weeks off per year. We want you rested and sharp." },
  { icon: Lightbulb, title: "Learning Budget", desc: "$2,000 annual budget for courses, books, and conference tickets." },
];

const TESTIMONIALS = [
  { quote: "The velocity here is unmatched. We ship features in days that took my last company months.", author: "Sarah Jenkins", role: "Lead Engineer", avatar: "SJ" },
  { quote: "I've never worked anywhere that takes 'Extreme Ownership' so literally. It's incredibly empowering.", author: "Marcus Chen", role: "Product Director", avatar: "MC" },
  { quote: "The remote culture isn't just an afterthought; it's the core of how we operate and communicate.", author: "Elena Rostova", role: "Head of Marketing", avatar: "ER" },
  { quote: "We are building something that actually matters. You can feel the impact of your code instantly.", author: "David Kim", role: "Founding Engineer", avatar: "DK" },
  { quote: "Best healthcare benefits and stipends I've ever seen at an early-stage company. Period.", author: "Jessica Alvez", role: "Sales Executive", avatar: "JA" },
];

const PROCESS = [
  { icon: Coffee, title: "1. The Introduction", desc: "A casual 30-minute chat with our recruiter to discuss your background, our mission, and mutual alignment." },
  { icon: Code2, title: "2. The Deep Dive", desc: "A 60-minute technical or strategic interview with your future manager. No brain-teasers, just real-world scenarios." },
  { icon: Users, title: "3. The Team Fit", desc: "Meet 2-3 future teammates. We look for cultural add, not just cultural fit." },
  { icon: CheckCircle2, title: "4. The Offer", desc: "A final chat with a founder, followed by a competitive offer within 48 hours. We move fast." },
];

const OPEN_ROLES = [
  { 
    id: "role-1",
    dept: "Engineering",
    title: "Founding Full-Stack Engineer", 
    location: "Remote (Global)", 
    type: "Full-Time + Equity" 
  },
  { 
    id: "role-2",
    dept: "Sales & Growth",
    title: "Head of Enterprise Sales", 
    location: "Remote (US)", 
    type: "Full-Time + Commission" 
  }
];

const INVESTORS = ["Sequoia", "Andreessen Horowitz", "Y Combinator", "Index Ventures", "Lightspeed"];

// --- Sub-components ---

function ApplicationModal({ role, isOpen, onClose }: { role: any, isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");
    setTimeout(() => setStep("success"), 2500);
  };

  const resetAndClose = () => {
    setTimeout(() => setStep("form"), 300);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={step === "loading" ? undefined : resetAndClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-500/20 border border-slate-800 overflow-hidden"
        >
          {step !== "loading" && (
            <button onClick={resetAndClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 transition-colors z-10">
              <X size={20} className="text-slate-400 hover:text-white" />
            </button>
          )}

          <div className="p-8 md:p-12">
            {step === "form" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-black uppercase tracking-widest mb-4">
                    {role?.dept}
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight mb-2">Apply for {role?.title}</h3>
                  <p className="text-slate-400 text-sm">Join the mission. Our recruiting team will review your profile within 48 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">First Name</label>
                      <input required type="text" className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white text-sm" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">Last Name</label>
                      <input required type="text" className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white text-sm" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white text-sm" placeholder="jane@example.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">LinkedIn Profile</label>
                    <input required type="url" className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white text-sm" placeholder="https://linkedin.com/in/..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">Resume / CV</label>
                    <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500 bg-slate-800/50 hover:bg-indigo-500/10 transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors shadow-inner">
                        <Upload size={20} className="text-slate-400 group-hover:text-white" />
                      </div>
                      <span className="text-sm font-bold text-white mb-1">Click to upload or drag & drop</span>
                      <span className="text-xs text-slate-500 font-medium">PDF or DOCX (Max 5MB)</span>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-5 mt-6 bg-indigo-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.7)] transition-all flex items-center justify-center gap-2 group">
                    Submit Application
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === "loading" && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-24 flex flex-col items-center justify-center text-center">
                <Loader2 size={64} className="text-indigo-500 animate-spin mb-8" />
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Encrypting & Submitting...</h3>
                <p className="text-slate-400 text-sm font-medium">Please do not close this window.</p>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 border border-emerald-500/30">
                  <CheckCircle2 size={48} className="text-emerald-400" />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Application Sent!</h3>
                <p className="text-slate-400 max-w-[300px] mx-auto mb-10 leading-relaxed text-lg">
                  Thank you for applying. Our recruiting team will review your profile and reach out shortly.
                </p>
                <button onClick={resetAndClose} className="w-full py-5 bg-slate-800 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700">
                  Close & Return
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// --- Main Page Component ---

export default function CareersClient() {
  const [selectedRole, setSelectedRole] = useState<any>(null);

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-500/30 font-sans text-slate-900 overflow-hidden">
      {/* 1. RADICAL AURORA HERO SECTION (DARK MODE) */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#020617] text-white">
        {/* Deep Aurora Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_70%)]" />
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.4, 1],
            }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-sky-500/20 rounded-full blur-[120px] mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] mb-12 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-white tracking-widest uppercase">
              We are hiring globally
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-[8rem] font-black text-white tracking-tighter leading-[0.9] mb-10"
          >
            Do the Best <br />
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-2 blur-3xl bg-gradient-to-r from-indigo-500/40 to-sky-400/40 opacity-70"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-400 animate-gradient-x">
                Work of your Life.
              </span>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            We are a venture-backed, hyper-growth team building the infrastructure for the next 100 million desks. Join our mission.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <a href="#roles" className="px-12 py-6 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] flex items-center justify-center gap-3 group relative overflow-hidden inline-flex">
              View Strategic Roles
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
        
        {/* Bottom fade into white section */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* INVESTOR LOGOS MARQUEE (LIGHT MODE) */}
      <section className="pt-10 pb-20 relative z-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 mb-8 text-center">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Backed By Top Tier Investors</p>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 animate-infinite-scroll">
            {[...INVESTORS, ...INVESTORS, ...INVESTORS].map((investor, i) => (
              <li key={i} className="text-2xl md:text-4xl font-black text-slate-800 whitespace-nowrap">
                {investor}
              </li>
            ))}
          </ul>
        </div>
        <style jsx>{`
          .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
          }
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-33.33%); }
          }
          .animate-gradient-x {
            background-size: 200% auto;
            animation: gradient-x 4s linear infinite;
          }
          @keyframes gradient-x {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}</style>
      </section>

      {/* 2. THE BENTO GRID (CULTURE) - LIGHT MODE */}
      <section className="py-24 relative bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-20 md:flex items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">Our Operating <br/>System.</h2>
              <p className="text-xl text-slate-500 leading-relaxed">
                We operate with high velocity and extreme ownership. This is not a place for maintaining the status quo.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-8 group relative p-10 md:p-14 bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center mb-10 border border-indigo-100">
                  <Zap size={36} className="text-indigo-600" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Radical Velocity</h3>
                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                  Speed is our ultimate competitive advantage. We ship fast, learn faster, and iterate relentlessly. We prefer rapid execution over endless planning.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-4 group relative p-10 bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-sky-500/50 transition-colors shadow-sm">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:20px_20px] opacity-10" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 border border-slate-700">
                  <ShieldCheck size={28} className="text-sky-400" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Extreme Ownership</h3>
                <p className="text-lg text-slate-300 leading-relaxed">
                  No passing the buck. When you own a feature, you own it from ideation to production to maintenance.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-5 group relative p-10 bg-indigo-50 rounded-[2.5rem] overflow-hidden border border-indigo-100 hover:border-indigo-300 transition-colors shadow-sm">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-indigo-100 shadow-sm">
                  <Heart size={28} className="text-indigo-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">User Obsession</h3>
                <p className="text-lg text-indigo-900/80 leading-relaxed">
                  We don't build software for ourselves. We build it for the operator on the floor. Their success is our only metric.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-7 group relative p-10 md:p-14 bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 hover:border-emerald-300 transition-colors shadow-sm">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center border border-emerald-100">
                    <Globe2 size={36} className="text-emerald-600" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Global Remote</h3>
                </div>
                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                  Talent is evenly distributed. We hire the absolute best engineers and operators, regardless of their zip code. Work where you are happiest.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM BENEFITS GRID - LIGHT MODE */}
      <section className="py-32 relative bg-white">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="mb-20 text-center">
             <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">World-Class Benefits.</h2>
             <p className="text-xl text-slate-500 max-w-2xl mx-auto">
               We expect the best from our team, so we provide the best in return. Top-tier support for your life and career.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 bg-slate-50 border border-slate-200 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 transition-all"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 border border-slate-200 shadow-sm">
                  <benefit.icon size={24} className="text-indigo-600" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{benefit.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE INTERVIEW PROCESS TIMELINE - LIGHT MODE */}
      <section className="py-32 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="mb-24 text-center">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-6">How We Hire.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              We respect your time. Our process is streamlined, transparent, and designed to move from application to offer in under 10 days.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 md:-translate-x-1/2 rounded-full" />
            
            <div className="space-y-12">
              {PROCESS.map((step, idx) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-1/2" />
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-white rounded-full border-4 border-slate-100 flex items-center justify-center z-10 md:-translate-x-1/2 shadow-lg shadow-slate-200/50">
                    <step.icon size={20} className="text-indigo-600" />
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-20 md:pl-0">
                    <div className={`bg-white border border-slate-200 p-8 rounded-[2rem] hover:border-indigo-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <h4 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h4>
                      <p className="text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM TESTIMONIALS MARQUEE - LIGHT MODE */}
      <section className="py-32 overflow-hidden bg-white">
        <div className="max-w-[1200px] mx-auto px-6 mb-16 text-center">
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Inside the Team.</h2>
           <p className="text-xl text-slate-500">Don't just take our word for it.</p>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_200px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-[infinite-scroll_60s_linear_infinite]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((test, i) => (
              <li key={i} className="w-[400px] flex-shrink-0">
                <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem]">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(s => <Sparkles key={s} size={16} className="text-indigo-500" fill="currentColor" />)}
                  </div>
                  <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8">"{test.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-slate-500 border border-slate-200 shadow-sm">
                      {test.avatar}
                    </div>
                    <div>
                      <h5 className="text-slate-900 font-bold">{test.author}</h5>
                      <p className="text-sm text-slate-500 font-medium">{test.role}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. EXCLUSIVE ROLES SECTION - LIGHT MODE */}
      <section id="roles" className="py-32 md:py-40 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_50%)]" />
        </div>
        
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-6xl font-black tracking-tighter mb-6">Strategic Opportunities</h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto">
              We are currently filling exactly <span className="text-slate-900 font-bold">two high-leverage roles</span> to spearhead our next phase of explosive growth.
            </p>
          </div>

          <div className="space-y-6">
            {OPEN_ROLES.map((role, idx) => (
              <motion.div 
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="group relative p-8 md:p-10 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-[2.5rem] transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%]" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-black uppercase tracking-widest mb-6">
                      {role.dept}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-5 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500">
                       <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"><Globe2 size={16} className="text-slate-400" /> {role.location}</span>
                       <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"><Sparkles size={16} className="text-amber-500" /> {role.type}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedRole(role)}
                    className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-indigo-600 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shrink-0 shadow-lg group-hover:shadow-indigo-500/30 group-hover:scale-105"
                  >
                    Apply Now <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION MODAL */}
      <ApplicationModal 
        role={selectedRole} 
        isOpen={!!selectedRole} 
        onClose={() => setSelectedRole(null)} 
      />
    </div>
  );
}
