"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarRange, Menu, ArrowRight } from "lucide-react";
import { NavItem } from "./NavItem";
import { MegaMenu, MenuWrapper } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { 
  PLATFORM_ITEMS, 
  SOLUTIONS_ITEMS, 
  RESOURCES_ITEMS, 
  COMPANY_ITEMS,
  STATIC_LINKS 
} from "./nav-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 pointer-events-none",
          "pt-4 sm:pt-6" // Premium floating gap
        )}
      >
        <div 
          className="max-w-7xl mx-auto px-6 sm:px-8 pointer-events-auto"
          onMouseLeave={() => setActiveMenu(null)}
        >
          <nav
            className={cn(
              "relative flex items-center justify-between transition-all duration-1000",
              "bg-white/70 backdrop-blur-3xl border border-white/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,0,0,0.05)] rounded-[2.5rem] mx-auto px-8",
              scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
            )}
          >
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/60 pointer-events-none" />

            {/* LEFT: Logo with Magnetic Effect */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/" className="flex items-center gap-3 shrink-0 relative z-10 no-underline">
                <div className="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-primary/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CalendarRange size={22} className="text-white relative z-10" />
                </div>
                <div className="flex flex-col -gap-1">
                  <span className="text-xl font-black tracking-tighter text-brand-dark hidden sm:block leading-none">
                    StaffSchedule<span className="text-brand-primary">.io</span>
                  </span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] ml-0.5 hidden sm:block opacity-70">
                    Elite Workforce
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* CENTER: Navigation Links */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  }
                }
              }}
              className="hidden lg:flex items-center gap-1.5"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}>
                <NavItem 
                  title="Company" 
                  hasDropdown 
                  active={activeMenu === 'company'}
                  onMouseEnter={() => setActiveMenu('company')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}>
                <NavItem 
                  title="Platform" 
                  hasDropdown 
                  active={activeMenu === 'platform'}
                  onMouseEnter={() => setActiveMenu('platform')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}>
                <NavItem 
                  title="Solutions" 
                  hasDropdown 
                  active={activeMenu === 'solutions'}
                  onMouseEnter={() => setActiveMenu('solutions')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}>
                <NavItem 
                  title="Resources" 
                  hasDropdown 
                  active={activeMenu === 'resources'}
                  onMouseEnter={() => setActiveMenu('resources')}
                />
              </motion.div>
              
              {/* Ultra-Minimal Separator */}
              <motion.div 
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="w-px h-3 bg-slate-200/50 mx-1" 
              />
              
              <div className="flex items-center gap-2">
                {STATIC_LINKS.map(link => (
                  <motion.div 
                    key={link.title}
                    variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <NavItem 
                      title={link.title} 
                      href={link.href}
                      onMouseEnter={() => setActiveMenu(null)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 relative z-10"
            >
              <Link 
                href="https://app.staffschedule.io/login.php"
                className="hidden xl:flex items-center justify-center h-12 px-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark hover:text-brand-primary hover:bg-brand-primary/5 transition-all duration-300 no-underline"
              >
                Sign In
              </Link>
              <motion.div
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="https://app.staffschedule.io/onboarding.php" 
                  className={cn(
                    "hidden sm:flex items-center justify-center gap-3 h-12 px-8 rounded-2xl bg-gradient-to-r from-brand-primary to-indigo-600 text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 no-underline",
                    "shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.7)] ring-1 ring-white/20 relative overflow-hidden group/btn hover:brightness-110"
                  )}
                >
                  {/* Modern Glass Reflection */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shine_1.5s_ease-in-out_infinite] transition-transform" />
                  <span className="relative z-10">Start Free Trial</span>
                  <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-white/30 transition-colors">
                     <ArrowRight size={12} className="stroke-[3]" />
                  </div>
                </Link>
              </motion.div>
              
              {/* Mobile Trigger */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-3 -mr-2 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Menu size={24} />
              </button>
            </motion.div>

            {/* Desktop Mega Menus overlay */}
            <AnimatePresence>
              {activeMenu && (
                <MenuWrapper 
                  active={true} 
                  className={activeMenu === 'platform' ? 'min-w-[1020px]' : 'min-w-[880px]'}
                >
                  <div className="relative">
                    {activeMenu === 'platform' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-10 opacity-50">Explore Platform</h4>
                        <MegaMenu items={PLATFORM_ITEMS} type="platform" />
                      </motion.div>
                    )}
                    {activeMenu === 'solutions' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-10 opacity-50">Our Solutions</h4>
                        <MegaMenu items={SOLUTIONS_ITEMS} type="solutions" />
                      </motion.div>
                    )}
                    {activeMenu === 'resources' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-10 opacity-50">Knowledge Base</h4>
                        <MegaMenu items={RESOURCES_ITEMS} type="resources" />
                      </motion.div>
                    )}
                    {activeMenu === 'company' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-10 opacity-50">Our Company</h4>
                        <MegaMenu items={COMPANY_ITEMS} type="company" />
                      </motion.div>
                    )}
                  </div>
                </MenuWrapper>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Slide-out */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </>
  );
};
