"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ArrowRight, CalendarRange, ChevronDown, 
  CalendarCheck2, Clock, MessageSquare, BarChart3, Map,
  Sparkles, Shield, Globe
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const platformCategories = [
  {
    title: "Core Platform",
    items: [
      { name: "Scheduling", description: "Smart Drag-and-Drop Rotas", href: "/features/scheduling", icon: CalendarCheck2, color: "text-blue-600", bg: "bg-blue-50" },
      { name: "Open Shifts", description: "Claim Open Work Instantly", href: "/features/open-shifts", icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50" },
      { name: "Shift Swaps", description: "Automated Team Trading", href: "/features/shift-swaps", icon: ArrowRight, color: "text-emerald-600", bg: "bg-emerald-50" },
      { name: "Availability", description: "Track Staff Preferences", href: "/features/availability", icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50" }
    ]
  },
  {
    title: "Enterprise Ops",
    items: [
      { name: "Attendance", description: "GPS-Verified Clock-in", href: "/features/attendance", icon: Map, color: "text-rose-600", bg: "bg-rose-50" },
      { name: "Compliance", description: "Predictive & Fair Work Laws", href: "/features/compliance", icon: Shield, color: "text-slate-600", bg: "bg-slate-50" },
      { name: "Leave Management", description: "Unified PTO & Absence", href: "/features/leave-management", icon: CalendarRange, color: "text-purple-600", bg: "bg-purple-50" },
      { name: "Multi-Location", description: "Global Regional Oversight", href: "/features/multi-location", icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50" }
    ]
  },
  {
    title: "Intelligence",
    items: [
      { name: "Labor Analytics", description: "Real-time Cost Tracking", href: "/features/analytics", icon: BarChart3, color: "text-brand-primary", bg: "bg-brand-primary/5" },
      { name: "Reporting", description: "Payroll-Ready Exports", href: "/features/reporting", icon: ArrowRight, color: "text-orange-600", bg: "bg-orange-50" },
      { name: "Team Chat", description: "Integrated Staff Messaging", href: "/features/communication", icon: MessageSquare, color: "text-violet-600", bg: "bg-violet-50" },
      { name: "Announcements", description: "Company-Wide Broadcasts", href: "/features/announcements", icon: Sparkles, color: "text-fuchsia-600", bg: "bg-fuchsia-50" }
    ]
  }
];

const solutionsCategories = [
  {
    title: "By Industry",
    items: [
      { name: "Healthcare", description: "Critical staffing for hospitals", href: "/solutions/healthcare", icon: Shield, color: "text-blue-600", bg: "bg-blue-50" },
      { name: "Retail", description: "Efficiency for store networks", href: "/solutions/retail", icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50" },
      { name: "Hospitality", description: "Seamless flow for hotels/F&B", href: "/solutions/hospitality", icon: Map, color: "text-rose-600", bg: "bg-rose-50" },
      { name: "Logistics", description: "Scale for supply chain teams", href: "/solutions/logistics", icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" }
    ]
  },
  {
    title: "By Strategic Need",
    items: [
      { name: "Cost Optimization", description: "Reduce labor spend by 15%", href: "/roi", icon: BarChart3, color: "text-brand-primary", bg: "bg-brand-primary/5" },
      { name: "Legal Compliance", description: "Stay audit-ready globally", href: "/compliance", icon: Shield, color: "text-slate-600", bg: "bg-slate-50" },
      { name: "Scale & Growth", description: "Build 5,000+ member teams", href: "/enterprise", icon: ArrowRight, color: "text-indigo-600", bg: "bg-indigo-50" }
    ]
  }
];



const PremiumNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
        scrolled
          ? "py-3 bg-white/70 dark:bg-brand-dark/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]"
          : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/" className="flex items-center gap-3 group relative z-10 transition-transform hover:scale-[1.02]">
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-12 h-12 bg-brand-primary rounded-[1rem] flex items-center justify-center shadow-2xl shadow-brand-primary/40"
              >
                <CalendarRange className="text-white w-7 h-7" />
              </motion.div>
              <span className="text-2xl font-black tracking-tighter text-brand-dark dark:text-white flex items-center">
                StaffSchedule<span className="text-brand-primary">.io</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Mega Navigation */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                }
              }
            }}
            className="hidden lg:flex items-center gap-2 flex-1 justify-center"
          >
            {/* PLATFORM */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="px-1" 
              onMouseEnter={() => setActiveMenu('platform')} 
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-black uppercase tracking-widest transition-all",
                activeMenu === 'platform' ? "bg-slate-900/5 dark:bg-white/5 text-brand-primary" : "text-brand-slate dark:text-slate-400 hover:text-brand-primary"
              )}>
                Platform <ChevronDown className={cn("w-4 h-4 transition-transform", activeMenu === 'platform' && "rotate-180")} />
              </button>
              <AnimatePresence>
                {activeMenu === 'platform' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 right-0 mt-4 max-w-[1600px] mx-auto px-12">
                    <div className="bg-white dark:bg-brand-dark rounded-[3.5rem] shadow-2xl border border-white/5 overflow-hidden p-8 flex gap-8">
                       <div className="flex-1 grid grid-cols-3 gap-10">
                          {platformCategories.map((cat) => (
                            <div key={cat.title}>
                               <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-8 pl-6 border-l border-brand-primary/20">{cat.title}</h4>
                               <div className="grid grid-cols-1 gap-2">
                                  {cat.items.map((item) => (
                                    <Link key={item.name} href={item.href} className="flex items-start gap-4 p-4 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-white/5 group/item transition-all">
                                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm", item.bg, item.color)}><item.icon className="w-6 h-6" /></div>
                                      <div>
                                        <div className="text-sm font-black text-brand-dark dark:text-white mb-0.5 group-hover/item:text-brand-primary transition-colors">{item.name}</div>
                                        <div className="text-[11px] font-bold text-slate-400 leading-tight">{item.description}</div>
                                      </div>
                                    </Link>
                                  ))}
                               </div>
                            </div>
                          ))}
                       </div>
                       <div className="w-[340px] bg-brand-dark rounded-[2.5rem] p-8 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-brand-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <h4 className="text-xl font-black text-white mb-4 relative z-10 tracking-tight leading-tight">New Platform Release: <span className="text-brand-primary">AI Logic</span></h4>
                          <p className="text-xs text-slate-400 font-medium mb-8 relative z-10 leading-relaxed">Predictive staffing that self-optimizes based on your real-time demand signals.</p>
                          <Link href="/features/ai-scheduling" className="relative z-10 h-14 w-full bg-white text-brand-dark rounded-xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-xl">Explore Innovation <ArrowRight className="w-4 h-4" /></Link>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* SOLUTIONS */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="px-1" 
              onMouseEnter={() => setActiveMenu('solutions')} 
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-black uppercase tracking-widest transition-all",
                activeMenu === 'solutions' ? "bg-slate-900/5 dark:bg-white/5 text-brand-primary" : "text-brand-slate dark:text-slate-400 hover:text-brand-primary"
              )}>
                Solutions <ChevronDown className={cn("w-4 h-4 transition-transform", activeMenu === 'solutions' && "rotate-180")} />
              </button>
              <AnimatePresence>
                {activeMenu === 'solutions' && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 right-0 mt-4 max-w-[1600px] mx-auto px-12">
                    <div className="bg-white dark:bg-brand-dark rounded-[3.5rem] shadow-2xl border border-white/5 overflow-hidden p-8 flex gap-8">
                       <div className="flex-1 grid grid-cols-2 gap-10">
                          {solutionsCategories.map((cat) => (
                            <div key={cat.title}>
                               <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-8 pl-6 border-l border-brand-primary/20">{cat.title}</h4>
                               <div className="grid grid-cols-1 gap-2">
                                  {cat.items.map((item) => (
                                    <Link key={item.name} href={item.href} className="flex items-start gap-5 p-5 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-white/5 group/item transition-all">
                                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg", item.bg, item.color)}><item.icon className="w-7 h-7" /></div>
                                      <div className="pt-1">
                                        <div className="text-base font-black text-brand-dark dark:text-white mb-1 group-hover/item:text-brand-primary transition-colors">{item.name}</div>
                                        <div className="text-[11px] font-bold text-slate-400 leading-tight">{item.description}</div>
                                      </div>
                                    </Link>
                                  ))}
                               </div>
                            </div>
                          ))}
                       </div>
                       <div className="w-[450px] bg-slate-50 dark:bg-white/[0.03] rounded-[2.5rem] p-10 flex flex-col justify-between group">
                          <div>
                            <div className="inline-flex px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-6">Case Spotlight</div>
                            <h4 className="text-3xl font-black text-brand-dark dark:text-white mb-4 tracking-tighter leading-none">Saving <br /> $240k Annual <br /> <span className="text-brand-primary italic">Labor Spend.</span></h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[280px]">How NorthGroup Healthcare optimized 4,000 nurses across 12 hospitals.</p>
                          </div>
                          <Link href="/customer-success" className="h-16 w-full bg-brand-dark text-white rounded-2xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl">Read Case Study <ArrowRight className="w-5 h-5" /></Link>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {navLinks.map((link) => (
              <motion.div 
                key={link.name}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Link href={link.href} className="px-5 py-2.5 text-[13px] font-black text-brand-slate dark:text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-all relative group">
                  {link.name}
                  <motion.span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-brand-primary rounded-full group-hover:w-6 transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="hidden md:flex items-center gap-6 relative z-10"
          >
            <Link href="https://app.staffschedule.io/login.php" className="text-xs font-black uppercase tracking-widest text-brand-slate dark:text-slate-400 hover:text-brand-primary transition-colors">Sign In</Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="https://app.staffschedule.io/signup.php" className="h-16 px-10 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-[0_15px_30px_-5px_rgba(79,70,229,0.4)] group/btn">
                Start Free Trial <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden relative z-10">
            <Sheet>
              <SheetTrigger>
                <button className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-brand-dark dark:text-white hover:bg-brand-primary hover:text-white transition-all">
                  <Menu className="w-8 h-8" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[500px] border-l border-white/5 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-3xl p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-10 border-b border-white/5 text-left">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center"><CalendarRange className="text-white w-7 h-7" /></div>
                      <span className="text-2xl font-black tracking-tighter text-brand-dark dark:text-white">StaffSchedule.io</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-12">
                     <div className="space-y-12">
                        {/* Platform Accordion */}
                        <div>
                           <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-8">Platform</h4>
                           <div className="grid grid-cols-1 gap-3">
                              {platformCategories.flatMap(c => c.items).slice(0, 6).map((item) => (
                                <Link key={item.name} href={item.href} className="flex items-center gap-5 p-5 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.03] transition-all">
                                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", item.bg, item.color)}><item.icon className="w-6 h-6" /></div>
                                  <div className="text-lg font-black text-brand-dark dark:text-white">{item.name}</div>
                                </Link>
                              ))}
                           </div>
                        </div>
                        {/* Solutions Industry List */}
                        <div>
                           <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-8">Industries</h4>
                           <div className="grid grid-cols-1 gap-3">
                              {solutionsCategories[0].items.map((item) => (
                                <Link key={item.name} href={item.href} className="flex items-center gap-5 p-5 rounded-[2.5rem] bg-slate-50 dark:bg-white/[0.03] transition-all">
                                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", item.bg, item.color)}><item.icon className="w-6 h-6" /></div>
                                  <div className="text-lg font-black text-brand-dark dark:text-white">{item.name}</div>
                                </Link>
                              ))}
                           </div>
                        </div>
                     </div>

                    <div className="h-px bg-white/5" />

                    <div className="flex flex-col gap-8 pb-10">
                       {navLinks.map((link) => (
                         <Link key={link.name} href={link.href} className="text-3xl font-black text-brand-dark dark:text-white hover:text-brand-primary transition-colors tracking-tight">{link.name}</Link>
                       ))}
                       <Link href="https://app.staffschedule.io/login.php" className="text-3xl font-black text-slate-400 hover:text-brand-primary transition-colors tracking-tight">Sign In</Link>
                    </div>
                  </div>

                  <div className="p-10 border-t border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                    <Link href="https://app.staffschedule.io/signup.php" className="w-full h-24 bg-brand-primary text-white rounded-[2.5rem] text-2xl font-black flex items-center justify-center shadow-2xl shadow-brand-primary/40">Start Free Trial</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PremiumNavbar;
