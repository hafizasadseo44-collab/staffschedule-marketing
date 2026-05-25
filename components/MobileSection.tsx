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
    <section className="relative py-24 lg:py-40 bg-white overflow-hidden font-sans">
      {/* ── Background Grid & Ambient Glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Modern Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />
        
        {/* Soft Radial Orbs */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 to-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-pink-500/5 to-violet-600/10 rounded-full blur-[120px]" />
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
            <motion.div variants={itemVariants} className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm">
              <Smartphone size={12} className="animate-pulse" />
              Mobile Experience
            </motion.div>

            {/* Main Heading */}
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
              How Can Managers Handle Staff Scheduling <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-sm">From Anywhere?</span>
            </motion.h2>

            {/* Description Paragraphs */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-10 max-w-2xl">
              <p>
                StaffSchedule.io helps managers handle staff scheduling, employee availability, shift updates, leave requests, and workforce communication from anywhere using a mobile workforce management app designed for shift-based businesses.
              </p>
              <p>
                Whether you are at the office, working remotely, traveling, or managing multiple business locations, our employee scheduling platform provides real-time shift management, scheduling automation, and employee communication tools that help teams stay connected and informed.
              </p>
              <p>
                Managers can create schedules, approve leave requests, send announcements, and manage open shifts directly from their mobile devices without relying on spreadsheets, phone calls, or scattered group chats. This helps businesses improve workforce coordination, reduce scheduling delays, and keep daily operations running more efficiently.
              </p>
            </motion.div>

            {/* Features Staggered List */}
            <div className="flex flex-col gap-5 mb-10">
              {listItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300 shadow-sm"
                >
                  <div className={`p-3 rounded-xl ${item.iconBg} ${item.iconColor} flex-shrink-0`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
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

              <div className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-slate-50 border border-slate-200 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-slate-700 font-black text-xs uppercase tracking-[0.12em]">Live Web App Sync</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Device Mockups & Interactive Elements ── */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center items-center">
            
            {/* Floating Background Glow under device */}
            <div className="absolute w-[450px] h-[450px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full transform scale-90 pointer-events-none" />

            {/* Main Showcase Image (User Uploaded Composite) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 1200, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[450px] sm:max-w-[550px] lg:max-w-[650px] z-10 cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ rotateY: -4, rotateX: 4, scale: 1.02 }}
                className="relative w-full"
              >
                <img 
                  src="/staffschedule-mobile.png" 
                  alt="StaffSchedule.io Mobile App Showcase" 
                  className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] select-none"
                  onError={(e) => {
                    // Fallback image in case the file has any issue
                    e.currentTarget.src = "/mobile-schedule-app.png";
                  }}
                />
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
