"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  CalendarCheck2, 
  Send, 
  Clock, 
  MessageSquare, 
  BarChart3,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

// --- Types ---
interface Step {
  id: number;
  title: string;
  desc: string;
  headline: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

// --- Data ---
const STEPS: Step[] = [
  {
    id: 0,
    title: "Onboard Your Staff",
    headline: "Scheduling your workforce shouldn't feel chaotic.",
    desc: "Import your roster in seconds. Magic links invite your team automatically, setting up roles and availability without a single manual entry.",
    icon: <UserPlus className="w-6 h-6" />,
    color: "text-blue-600",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    id: 1,
    title: "Build Perfect Shifts",
    headline: "Everything your team needs, flowing in one place.",
    desc: "Our smart builder auto-arranges shifts based on staff availability and labor laws. Drag, drop, and let AI flag conflicts before they happen.",
    icon: <CalendarCheck2 className="w-6 h-6" />,
    color: "text-purple-600",
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    id: 2,
    title: "Share Instantly",
    headline: "Instant sync. Zero confusion. Happy teams.",
    desc: "Publish with one click. Mobile push notifications and SMS fly out instantly, ensuring every staff member knows exactly where to be.",
    icon: <Send className="w-6 h-6" />,
    color: "text-emerald-600",
    gradient: "from-emerald-600 to-teal-600"
  },
  {
    id: 3,
    title: "Track Time & Attendance",
    headline: "Ditch the paper. Track time with GPS precision.",
    desc: "Staff clock in via mobile app or tablet kiosk. Real-time GPS tracking and geofencing ensure honesty while attendance stats update live.",
    icon: <Clock className="w-6 h-6" />,
    color: "text-rose-600",
    gradient: "from-rose-600 to-orange-600"
  },
  {
    id: 4,
    title: "Manage Team Requests",
    headline: "Manager approvals, handled in seconds.",
    desc: "Shift swaps, time-off requests, and availability changes flow into one inbox. Approve or decline with a single tap, syncing the schedule live.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "text-amber-600",
    gradient: "from-amber-600 to-orange-500"
  },
  {
    id: 5,
    title: "Run Smarter Operations",
    headline: "From shift planning to payroll-ready operations.",
    desc: "Powerful analytics dashboards reveal labor costs vs. sales in real-time. Optimize your future strategies with automated business insights.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "text-sky-600",
    gradient: "from-sky-600 to-blue-500"
  }
];

// --- Components ---

const VisualizerStep0 = () => (
  <div className="relative w-full h-full flex items-center justify-center p-8">
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
            {String.fromCharCode(64 + i)}
          </div>
          <div className="flex-1">
            <div className="h-2 w-16 bg-slate-100 rounded-full mb-2" />
            <div className="h-2 w-10 bg-slate-50 rounded-full" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-emerald-500" 
          />
        </motion.div>
      ))}
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-blue-200 shadow-2xl z-20"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <UserPlus size={24} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900">Invite Sent</h4>
          <p className="text-xs text-slate-500">24 staff members invited</p>
        </div>
      </div>
      <div className="flex -space-x-2">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
        ))}
        <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600">+19</div>
      </div>
    </motion.div>
  </div>
);

const VisualizerStep1 = () => (
  <div className="relative w-full h-full flex flex-col p-8">
    <div className="flex-1 border-2 border-dashed border-slate-200 rounded-3xl p-4 relative">
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-48 bg-indigo-600 p-4 rounded-xl text-white shadow-xl z-20"
      >
        <div className="text-[10px] opacity-80 uppercase font-black tracking-widest mb-1">Morning Shift</div>
        <div className="font-bold">08:00 - 16:00</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 rounded-full bg-white/20" />
          <div className="text-xs font-medium">Sarah Jenkins</div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-7 gap-2 h-full opacity-30">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="bg-slate-100 rounded-lg" />
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute bottom-10 right-10 bg-white p-4 rounded-2xl shadow-2xl border border-indigo-100 max-w-[200px]"
      >
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <Sparkles size={14} />
          <span className="text-[10px] font-black uppercase tracking-wider">AI Optimizer</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">Auto-assign filled 14 shifts with zero conflicts.</p>
      </motion.div>
    </div>
  </div>
);

const VisualizerStep2 = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-64 aspect-[9/19] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-800 relative shadow-2xl"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-2xl" />
      <div className="p-6 pt-12">
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
              <Send size={12} />
            </div>
            <span className="text-[10px] font-bold">StaffSchedule.io</span>
          </div>
          <div className="text-xs font-bold mb-1">New Schedule Published!</div>
          <p className="text-[10px] opacity-70">Your shifts for next week are now live. Tap to view.</p>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full" />
    </motion.div>
    
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
       {[1,2,3].map(i => (
         <motion.div
           key={i}
           animate={{ 
             y: [-100, 500], 
             opacity: [0, 1, 0],
             scale: [0.5, 1, 0.5]
           }}
           transition={{ 
             duration: 3, 
             repeat: Infinity, 
             delay: i * 1,
             ease: "linear"
           }}
           className="absolute top-0 w-10 h-10 bg-indigo-500/20 rounded-full blur-xl"
           style={{ left: `${20 + i * 25}%` }}
         />
       ))}
    </div>
  </div>
);

const VisualizerStep3 = () => (
  <div className="relative w-full h-full flex items-center justify-center p-8">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Live Attendance</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-600">8 Staff In</span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {[
          { name: "Alex Rivera", time: "08:02 AM", status: "On Time" },
          { name: "Jessica Wu", time: "07:58 AM", status: "Early" },
          { name: "Tom Baker", time: "08:15 AM", status: "Late" },
        ].map((staff, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200" />
              <div>
                <div className="text-xs font-bold text-slate-900">{staff.name}</div>
                <div className="text-[10px] text-slate-500">{staff.time}</div>
              </div>
            </div>
            <div className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              staff.status === 'Late' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
            }`}>
              {staff.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const VisualizerStep4 = () => (
  <div className="relative w-full h-full flex items-center justify-center p-8">
    <motion.div 
      initial={{ rotate: -5, scale: 0.95 }}
      animate={{ rotate: 0, scale: 1 }}
      className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 relative"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
          <MessageSquare size={24} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900">Shift Swap Request</h4>
          <p className="text-xs text-slate-500">From Sarah to Mike</p>
        </div>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-xl mb-6">
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Shift Details</div>
        <div className="text-sm font-bold text-slate-700">Saturday, Oct 24 · 09:00 - 17:00</div>
      </div>
      
      <div className="flex gap-3">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm"
        >
          Decline
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 py-3 rounded-xl bg-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-500/25"
        >
          Approve
        </motion.button>
      </div>
      
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -top-4 -right-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg"
      >
        No Conflicts
      </motion.div>
    </motion.div>
  </div>
);

const VisualizerStep5 = () => (
  <div className="relative w-full h-full flex flex-col p-8 overflow-hidden">
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="space-y-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Labor vs Sales</div>
          <div className="text-2xl font-black text-slate-900">18.4%</div>
          <div className="mt-4 flex items-end gap-1 h-12">
            {[40, 60, 30, 80, 50, 90].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 bg-sky-500/20 rounded-t-sm" 
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Staff Productivity</div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-black text-slate-900">+12%</div>
            <div className="text-emerald-500 text-[10px] font-bold">↑ 2.4% vs LY</div>
          </div>
        </motion.div>
      </div>
      
      <div className="relative">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-full bg-slate-900 rounded-[2rem] p-6 text-white overflow-hidden"
        >
           <div className="text-xs font-black uppercase tracking-widest opacity-40 mb-6">Manager Insights</div>
           <div className="space-y-4">
             {[
               "Optimal shift density reached.",
               "Labor cost saving target met.",
               "Overtime reduced by 14hrs."
             ].map((text, i) => (
               <div key={i} className="flex gap-3 items-start">
                 <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                 <p className="text-[11px] leading-relaxed opacity-80">{text}</p>
               </div>
             ))}
           </div>
           
           <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-sky-500/20 to-transparent" />
        </motion.div>
      </div>
    </div>
  </div>
);

// --- Main Section ---

export default function ModernHowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active step based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const step = Math.min(Math.floor(v * STEPS.length), STEPS.length - 1);
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-white" 
      id="how-it-works"
    >
      {/* ── Heading Section (Non-sticky) ── */}
      <div className="pt-32 pb-16 lg:pb-32 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] mb-8 border border-slate-100 shadow-sm"
          >
            <Sparkles size={12} className="text-blue-600" /> Operational Excellence
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9] lg:leading-[0.85]"
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">StaffSchedule.io</span> Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Centralize your workforce, eliminate scheduling chaos, and scale operations seamlessly in 6 cinematic steps.
          </motion.p>
        </div>
      </div>

      {/* ── Scroll Experience Container ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 h-[600vh]">
        
        {/* Sticky Visual Side (Right) */}
        <div className="sticky top-0 h-screen w-full lg:w-1/2 ml-auto flex items-center justify-center pointer-events-none lg:pointer-events-auto">
          <div className="relative w-full aspect-square max-w-[600px] bg-slate-50 rounded-[3rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex items-center justify-center">
            
            {/* Background elements */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
            <div className="absolute top-0 left-0 w-full h-full">
               <motion.div 
                 animate={{ 
                   scale: [1, 1.1, 1],
                   opacity: [0.3, 0.5, 0.3]
                 }}
                 transition={{ duration: 10, repeat: Infinity }}
                 className={`absolute -top-1/4 -left-1/4 w-full h-full bg-gradient-to-br ${STEPS[activeStep].gradient} opacity-5 blur-[120px] rounded-full`} 
               />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full relative z-10"
              >
                {activeStep === 0 && <VisualizerStep0 />}
                {activeStep === 1 && <VisualizerStep1 />}
                {activeStep === 2 && <VisualizerStep2 />}
                {activeStep === 3 && <VisualizerStep3 />}
                {activeStep === 4 && <VisualizerStep4 />}
                {activeStep === 5 && <VisualizerStep5 />}
              </motion.div>
            </AnimatePresence>

            {/* Floating Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          </div>
        </div>

        {/* Content Side (Left) - Absolute positioned but behaves like scroll triggers */}
        <div className="absolute top-0 left-0 w-full lg:w-1/2">
           {STEPS.map((step, i) => (
             <div key={step.id} className="h-screen flex flex-col justify-center pr-0 lg:pr-20">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-20%" }}
                  className={`p-10 lg:p-16 rounded-[2.5rem] border transition-all duration-700 ${
                    activeStep === i 
                      ? "bg-white border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] scale-100" 
                      : "bg-transparent border-transparent scale-95 opacity-20 blur-[2px]"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center ${step.color} mb-8 border border-slate-50`}>
                    {step.icon}
                  </div>
                  
                  <span className={`text-xs font-black uppercase tracking-[0.2em] mb-4 block ${step.color}`}>
                    Step 0{i + 1}
                  </span>
                  
                  <h3 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                    {step.title}
                  </h3>
                  
                  <h4 className="text-xl lg:text-2xl font-bold text-slate-800 mb-6 leading-snug">
                    {step.headline}
                  </h4>
                  
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="mt-10 flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest group cursor-pointer">
                    Explore Feature <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
             </div>
           ))}
        </div>
      </div>

      {/* ── Bottom Section ── */}
      <div className="py-32 lg:py-48 px-6 bg-slate-900 text-white overflow-hidden relative">
         {/* Background Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full" />
         
         <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl font-black mb-8 tracking-tight"
            >
              Ready to experience the future of workforce management?
            </motion.h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="h-16 px-12 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-[0.15em] shadow-2xl shadow-blue-500/20 hover:scale-105 transition-all">
                Get Started Free
              </button>
              <button className="h-16 px-12 rounded-2xl bg-white/10 text-white font-black text-sm uppercase tracking-[0.15em] backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                Book a Demo
              </button>
            </div>
         </div>
      </div>
    </section>
  );
}
