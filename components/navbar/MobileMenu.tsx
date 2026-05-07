"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ArrowRight, CalendarRange } from "lucide-react";
import { 
  PLATFORM_ITEMS, 
  SOLUTIONS_ITEMS, 
  RESOURCES_ITEMS, 
  COMPANY_ITEMS,
  STATIC_LINKS 
} from "./nav-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryAccordion = ({ title, items, badge }: { title: string, items: any[], badge?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100/60 pb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left outline-none"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-1">{badge || "Category"}</span>
          <span className="text-xl font-black text-brand-dark tracking-tighter">{title}</span>
        </div>
        <ChevronRight className={cn("text-slate-300 transition-transform duration-500 stroke-[3]", isOpen && "rotate-90 text-brand-primary")} size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-3 pt-4 pb-2">
              {items.map((item, idx) => (
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.title}
                >
                  <Link 
                    href={item.href} 
                    className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50/50 border border-slate-100/50 no-underline group/item"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                       {item.icon && <item.icon size={18} strokeWidth={2.5} />}
                    </div>
                    <span className="text-sm font-bold text-brand-dark tracking-tight">{item.title}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Progressive Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-md z-[110] lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[90%] max-w-sm bg-white z-[120] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] lg:hidden flex flex-col overflow-hidden"
          >
            {/* Header with Branding */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <CalendarRange size={16} className="text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter text-brand-dark">
                  Menu
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-slate-50 text-slate-500 active:scale-90 transition-all font-bold"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Content with Accordions */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-6 space-y-2">
              <CategoryAccordion title="Company" items={COMPANY_ITEMS} badge="Our Story" />
              <CategoryAccordion title="Platform" items={PLATFORM_ITEMS} badge="Explore" />
              <CategoryAccordion title="Solutions" items={SOLUTIONS_ITEMS} badge="Our Sector" />
              <CategoryAccordion title="Resources" items={RESOURCES_ITEMS} badge="Knowledge" />

              {/* STATIC LINKS */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-0 pt-6"
              >
                {STATIC_LINKS.map((link) => (
                  <Link 
                    key={link.title} 
                    href={link.href} 
                    onClick={onClose}
                    className="block py-4 text-3xl font-black text-brand-dark tracking-tighter hover:text-brand-primary active:scale-95 transition-all no-underline"
                  >
                    {link.title}
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Footer Actions */}
            <motion.div 
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="p-8 border-t border-slate-100 bg-white sticky bottom-0 z-20 flex flex-col gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]"
            >
              <Link 
                href="https://app.staffschedule.io/login.php"
                onClick={onClose}
                className="w-full py-4 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand-primary transition-colors no-underline"
              >
                Sign In
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="https://app.staffschedule.io/onboarding.php" 
                  onClick={onClose} 
                  className={cn(
                    "flex items-center justify-center gap-2 h-16 w-full rounded-[2rem] bg-gradient-to-r from-brand-primary to-indigo-600 text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand-primary/30 ring-1 ring-white/20 active:scale-95 transition-all no-underline"
                  )}
                >
                  Start Free Trial <ArrowRight size={20} className="stroke-[3]" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
