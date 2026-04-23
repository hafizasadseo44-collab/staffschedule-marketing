"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { UserPlus, CalendarCheck2, Rocket, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "Create your account",
    desc: "Sign up in 30 seconds. No credit card. Import your roster immediately using a CSV or invite staff with magic links.",
    icon: <UserPlus className="w-8 h-8" />,
    gradient: "from-indigo-600 to-blue-600",
    lightGradient: "from-indigo-50 to-blue-50",
    accent: "text-indigo-600",
    glow: "shadow-indigo-500/20",
    features: ["Instant signup", "CSV Import", "Magic Links"]
  },
  {
    step: "02",
    title: "Build your first schedule",
    desc: "Drag, drop, and publish your first perfect week in under 5 minutes. Auto-assign suggests the best staff for every shift.",
    icon: <CalendarCheck2 className="w-8 h-8" />,
    gradient: "from-purple-600 to-indigo-600",
    lightGradient: "from-purple-50 to-indigo-50",
    accent: "text-purple-600",
    glow: "shadow-purple-500/20",
    features: ["Drag & Drop", "Auto-Assign AI", "Conflict Detection"]
  },
  {
    step: "03",
    title: "Your team gets notified",
    desc: "Every staff member receives a real-time push notification with their shifts. Zero confusion, zero calls, zero stress.",
    icon: <Rocket className="w-8 h-8" />,
    gradient: "from-emerald-600 to-teal-600",
    lightGradient: "from-emerald-50 to-teal-50",
    accent: "text-emerald-600",
    glow: "shadow-emerald-500/20",
    features: ["Push Notifications", "Mobile App", "Shift Swapping"]
  },
];

export default function OnboardingTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 lg:py-48 bg-white relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-slate-800 shadow-xl"
          >
            <Sparkles size={12} className="text-yellow-400" /> Frictionless Onboarding
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-6 sm:mb-8 leading-[1.1] sm:leading-[0.95]"
          >
            Live in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600">3 simple steps.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed px-4"
          >
            Ditch the training manuals. Most teams are fully operational and publishing their first schedule in <span className="text-slate-900 font-black">under 10 minutes</span>.
          </motion.p>
        </div>


        {/* Vertical Stepper Container */}
        <div className="relative space-y-32 lg:space-y-48">
          
          {/* Progress Line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-px bg-slate-100 -translate-x-1/2 hidden lg:block">
            <motion.div 
              style={{ scaleY: pathLength, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500"
            />
          </div>

          {STEPS.map((s, i) => (
            <div key={i} className={`relative flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Step Circle (The Anchor) */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-20 h-20 rounded-full bg-white border-8 border-white shadow-2xl flex items-center justify-center`}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                    {s.step}
                  </div>
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-[2.5rem] p-10 lg:p-14 border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.08)] transition-all duration-500 group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.lightGradient} ${s.accent} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    {s.icon}
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 tracking-tight">{s.title}</h3>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                    {s.desc}
                  </p>

                  <ul className="space-y-4">
                    {s.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-slate-900 font-bold">
                        <CheckCircle2 size={20} className={s.accent} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Visual Side (Bento-style preview or icon display) */}
              <div className="w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? 5 : -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`aspect-video lg:aspect-square bg-gradient-to-br ${s.lightGradient} rounded-[3rem] p-12 flex items-center justify-center relative overflow-hidden border border-white`}
                >
                  {/* Decorative Background Large Number */}
                  <div className={`absolute -bottom-10 -right-10 text-[20rem] font-black opacity-[0.03] select-none leading-none ${s.accent}`}>
                    {s.step}
                  </div>
                  
                  <div className={`w-32 h-32 lg:w-48 lg:h-48 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center relative z-10 animate-float`}>
                     <div className={`${s.accent} scale-[2]`}>
                       {s.icon}
                     </div>
                  </div>

                  {/* Floating particles */}
                  <div className={`absolute top-20 left-20 w-4 h-4 rounded-full bg-white shadow-lg animate-pulse`} />
                  <div className={`absolute bottom-20 right-40 w-6 h-6 rounded-full bg-white shadow-lg animate-bounce`} />
                </motion.div>
              </div>

            </div>
          ))}

        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 lg:mt-48 text-center"
        >
          <div className="inline-block p-1 rounded-[2rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 shadow-2xl shadow-indigo-500/20">
            <Link href="https://app.staffschedule.io/signup.php">
              <button className="bg-white text-slate-900 px-12 py-6 rounded-[1.8rem] font-black text-xl flex items-center gap-4 hover:bg-transparent hover:text-white transition-all duration-300 group">
                Start Your Journey Now
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
          <p className="mt-8 text-slate-400 font-bold flex items-center justify-center gap-3">
             <span className="w-2 h-2 rounded-full bg-emerald-500" />
             Zero setup fee · Unlimited staff · 14-day free trial
          </p>
        </motion.div>

      </div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
