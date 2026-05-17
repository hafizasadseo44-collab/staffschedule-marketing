"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Clock, 
  LayoutDashboard, 
  Users, 
  Layers, 
  ClipboardCheck, 
  FileBox, 
  Settings,
  CalendarDays,
  Repeat,
  Bell,
  ArrowRight, // Added back as it's used
  CheckCircle2, // Added back as it's used
  Star, // Added back as it's used
  Rocket // Added back as it's used
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 -top-32 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -left-32 top-1/2 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8">
              <Star className="w-4 h-4 text-brand-primary fill-brand-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                Trusted by 500+ teams worldwide
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-brand-dark dark:text-white leading-[1.1] tracking-tight mb-6">
              Schedule Your Team <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                With Confidence.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-brand-slate dark:text-slate-400 font-medium mb-10 max-w-xl leading-relaxed">
              The all-in-one workforce management platform that helps you build
              smarter schedules, track availability, and communicate with your
              entire team in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="https://app.staffschedule.io/onboarding.php"
                className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl text-lg font-black flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white dark:bg-brand-dark border border-border text-brand-dark dark:text-white rounded-2xl text-lg font-black hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center"
              >
                Contact Sales
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {[
                "No credit card required",
                "15-day free trial",
                "Cancel anytime",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-success" />
                  <span className="text-sm font-bold text-brand-slate dark:text-slate-500">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white/50 dark:border-slate-800/50 shadow-2xl shadow-brand-primary/20 bg-white dark:bg-slate-900 aspect-[4/3] group">
              {/* Browser Header Mockup */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-slate-50 dark:bg-slate-800/50 border-b border-border z-20 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 max-w-[200px] mx-auto h-6 bg-white dark:bg-slate-900 rounded-md border border-border flex items-center px-2 text-[8px] font-bold text-slate-400">
                  app.staffschedule.io
                </div>
              </div>
              
              {/* Main Image */}
              <img 
                src="/dashboard.png" 
                alt="StaffSchedule.io Dashboard" 
                className="w-full h-full object-cover object-top pt-10 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Glass Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating Decorative Cards */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-6 -right-6 z-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-border hidden sm:block"
            >
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-black">
                     +12
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400">New Shifts</p>
                     <p className="text-sm font-black text-brand-dark dark:text-white underline decoration-brand-success">Published Today</p>
                  </div>
               </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-border hidden sm:block"
            >
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black">
                     98%
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400">Efficiency</p>
                     <p className="text-sm font-black text-brand-dark dark:text-white underline decoration-brand-primary">Team Satisfaction</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
