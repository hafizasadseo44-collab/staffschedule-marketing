"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { NavItemType } from "./nav-data";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, TrendingUp, HelpCircle } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

interface MegaMenuProps {
  items: NavItemType[];
  type: 'platform' | 'solutions' | 'resources' | 'company';
}

const getSpotlightContent = (type: string) => {
  switch (type) {
    case 'platform':
      return {
        badge: "What's New",
        title: "Predictive AI Scheduling",
        desc: "Slash labor spend by another 12% with our new neural engine.",
        cta: "Explore AI Hub",
        href: "/features/ai",
        color: "bg-brand-primary"
      };
    case 'solutions':
      return {
        badge: "Success Story",
        title: "Scaling 5,000+ Teams",
        desc: "How SouthGlobal Hospitality reduced turnover by 40% in 12 months.",
        cta: "Read Case Study",
        href: "/customer-success",
        color: "bg-orange-500"
      };
    case 'resources':
      return {
        badge: "Free Guide",
        title: "Operational Excellence Blueprint",
        desc: "Master workforce automation and scale your team with our expert-led operational playbook.",
        cta: "Access Guide",
        href: "/guides",
        color: "bg-brand-secondary"
      };
    case 'company':
      return {
        badge: "Our Mission",
        title: "The Future of Workforce AI",
        desc: "We're building the infrastructure that will power the next 100 million desks. Discover our story.",
        cta: "Our Heritage",
        href: "/about",
        color: "bg-brand-primary"
      };
    default:
      return null;
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { 
       type: "spring" as const, 
       stiffness: 300, 
       damping: 24 
    }
  }
};

export const MegaMenu = ({ items, type }: MegaMenuProps) => {
  const spotlight = getSpotlightContent(type);

  return (
    <div className="flex gap-12 relative">
      {/* Navigation Grid with Staggered Items */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 grid grid-cols-2 gap-x-10 gap-y-2 relative z-10"
      >
        {items.map((item) => (
          <motion.div key={item.title} variants={itemVariants}>
            <LinkPreview
              url={item.href}
              className="group flex items-start gap-5 p-4 rounded-3xl hover:bg-white hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 outline-none no-underline group/link"
            >
              <motion.div 
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-start gap-5 w-full"
              >
                {item.icon && (
                  <div className={cn(
                    "mt-0.5 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 ring-1",
                    "bg-brand-primary/5 text-brand-primary ring-brand-primary/10 group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                  )}>
                    <item.icon size={22} strokeWidth={2.5} />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-black text-brand-dark group-hover:text-brand-primary transition-colors duration-500 tracking-tighter">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-500 leading-tight max-w-[170px] transition-colors duration-500">
                      {item.description}
                    </span>
                  )}
                </div>
              </motion.div>
            </LinkPreview>
          </motion.div>
        ))}

        {/* View All CTA for Platform */}
        {type === 'platform' && (
          <motion.div variants={itemVariants} className="col-span-2 mt-4 px-4">
            <LinkPreview 
              url="/features"
              className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-brand-primary/5 transition-all duration-500 no-underline"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                  <ArrowRight size={16} />
                </div>
                <span className="text-xs font-black text-brand-dark group-hover:text-brand-primary transition-colors duration-500 uppercase tracking-widest">
                  View All Platform Features
                </span>
              </div>
              <Sparkles size={16} className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </LinkPreview>
          </motion.div>
        )}
      </motion.div>

      {/* Atmospheric Sidebar Spotlight */}
      {spotlight && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-[320px] shrink-0 bg-slate-50/50 -my-10 -mr-10 p-10 flex flex-col justify-between relative overflow-hidden group/card border-l border-slate-100"
        >
           {/* Dynamic Mesh Polish */}
           <div className={cn("absolute -top-32 -right-32 w-64 h-64 blur-[100px] opacity-25 pointer-events-none transition-all duration-1000", spotlight.color)} />
           
           <div className="relative z-10">
              <div className="inline-flex px-3 py-1 rounded-full bg-white text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-8 ring-1 ring-slate-200/50 shadow-sm">
                 {spotlight.badge}
              </div>
              <h4 className="text-2xl font-black text-brand-dark mb-4 tracking-tighter leading-[1.05]">
                 {spotlight.title}
              </h4>
              <p className="text-xs text-slate-400 font-bold leading-relaxed mb-10">
                 {spotlight.desc}
              </p>
           </div>

           <LinkPreview 
             url={spotlight.href}
             className="relative z-10 flex items-center gap-2 text-xs font-black text-brand-primary uppercase tracking-widest no-underline group-hover/card:translate-x-1 transition-transform"
           >
              {spotlight.cta} <ArrowRight size={14} className="stroke-[3]" />
           </LinkPreview>
        </motion.div>
      )}

      {/* Ambient Gradient Blobs for Depth - Dynamic by Type */}
      <div className={cn(
        "absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 blur-[130px] pointer-events-none rounded-full transition-all duration-1000 opacity-20",
        type === 'company' ? "bg-brand-primary" : (type === 'platform' ? "bg-brand-primary" : "bg-brand-secondary")
      )} />
      <div className={cn(
        "absolute bottom-10 right-1/2 w-64 h-64 blur-[110px] pointer-events-none rounded-full transition-all duration-1000 opacity-15",
        type === 'company' ? "bg-indigo-500" : (type === 'platform' ? "bg-indigo-500" : "bg-orange-500")
      )} />
    </div>
  );
};

export const MenuWrapper = ({ children, active, className }: { children: React.ReactNode, active: boolean, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -10, scale: 0.98 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-auto pointer-events-auto",
        !active && "pointer-events-none",
        className
      )}
    >
      <div className="bg-white border border-slate-200 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15),0_30px_60px_-15px_rgba(0,0,0,0.1)] p-10 overflow-hidden relative ring-1 ring-slate-900/5">
        {/* Subtle Luxury Top Reflection - Non-transparent */}
        <div className="absolute inset-x-0 top-0 h-px bg-slate-100" />
        {children}
      </div>
    </motion.div>
  );
};
