"use client";
import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Check, ArrowRight, AppWindow, Play, MessageSquare, Calendar, Clock } from "lucide-react";

export default function MobileSection() {
  // Stagger animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const listItems = [
    {
      title: "Real-Time Shift Scheduling",
      desc: "Instantly check your assigned shifts, view role details, and see work locations on the go.",
      icon: Calendar,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-500/10",
    },
    {
      title: "Collaborative Shift Swaps",
      desc: "Can't make it? Offer your shift to qualified teammates and let managers approve it instantly.",
      icon: Clock,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      title: "Integrated Team Messaging",
      desc: "Direct messages and department channels. No personal phone numbers or extra chat apps required.",
      icon: MessageSquare,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="relative py-24 lg:py-40 bg-[#0B0F19] overflow-hidden font-sans">
      {/* ── Background Grid & Ambient Glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Modern Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        
        {/* Soft Radial Orbs */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/15 to-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-pink-500/10 to-violet-600/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* ── LEFT: Dynamic Text Content ── */}
          <motion.div
            className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Pill Badge */}
            <motion.div variants={itemVariants} className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] mb-6 shadow-[0_4px_20px_-5px_rgba(99,102,241,0.3)]">
              <Smartphone size={12} className="animate-pulse" />
              Mobile Experience
            </motion.div>

            {/* Main Heading */}
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight mb-6 leading-[1.1]">
              Your Workforce in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-sm">Your Pocket</span>
            </motion.h2>

            {/* Description Paragraph */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed mb-10 max-w-2xl">
              Managers and employees shouldn't be chained to a desk. StaffSchedule.io gives your entire team the power to check schedules, request swaps, submit leave, and chat in real-time — all from a single intuitive mobile app.
            </motion.p>

            {/* Features Staggered List */}
            <div className="flex flex-col gap-5 mb-10">
              {listItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 shadow-lg"
                >
                  <div className={`p-3 rounded-xl ${item.iconBg} ${item.iconColor} flex-shrink-0`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons - Store Badges Mock */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <a
                href="https://app.staffschedule.io/onboarding.php"
                className="relative group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs uppercase tracking-[0.12em] shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)" }} />
                <span>Start Free Trial</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-300 font-black text-xs uppercase tracking-[0.12em]">Live Web App Sync</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Device Mockups & Interactive Elements ── */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center items-center">
            
            {/* Floating Background Glow under device */}
            <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-indigo-600/30 to-purple-600/30 blur-3xl rounded-[3rem] transform scale-90 pointer-events-none" />

            {/* Interactive Phone Frame Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotateY: -6, rotateX: 6, scale: 1.03 }}
              style={{ perspective: 1200, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[320px] sm:max-w-[350px] z-10 cursor-pointer"
            >
              {/* Premium Phone Bezel (Hardware Mockup CSS) */}
              <div 
                className="relative rounded-[3rem] border-[10px] border-slate-900 bg-slate-950 p-2.5 overflow-hidden"
                style={{ 
                  boxShadow: "0 50px 100px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1) inset",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* iPhone Dynamic Island / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-full z-30 flex items-center justify-between px-3.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <div className="w-12 h-1.5 bg-slate-800 rounded-full" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0a122c] border border-slate-900 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-900/50" />
                  </div>
                </div>

                {/* The Mobile Screen Image */}
                <div className="relative rounded-[2.25rem] overflow-hidden bg-slate-900 aspect-[9/19]">
                  <img 
                    src="/staffschedule-mobile.png" 
                    alt="StaffSchedule.io Mobile App interface" 
                    className="w-full h-full object-cover select-none"
                    onError={(e) => {
                      // Fallback image in case the file has any issue
                      e.currentTarget.src = "/mobile-schedule-app.png";
                    }}
                  />
                  {/* Subtle glare overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* ── ORBITING / FLOATING INDICATORS ── */}
              
              {/* Widget 1: Notification (Top-Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[12%] -left-[18%] z-20 hidden sm:flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="size-9 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shift Swap</p>
                  <p className="text-xs font-black text-white leading-tight">Approved by Manager</p>
                </div>
              </motion.div>

              {/* Widget 2: Message Notification (Bottom-Right) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[20%] -right-[18%] z-20 hidden sm:flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="size-9 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Message</p>
                  <p className="text-xs font-black text-white leading-tight">Emma W: "Thanks!"</p>
                </div>
              </motion.div>

            </motion.div>

            {/* Glowing background circles for modern premium aesthetic */}
            <div className="absolute top-[20%] -left-[10%] w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-[20%] -right-[10%] w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          </div>

        </div>
      </div>
    </section>
  );
}
