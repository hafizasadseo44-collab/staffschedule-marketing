"use client";

import React from "react";
import Link from "next/link";
import { 
  CalendarRange, Globe, Share2, MessageCircle, 
  Mail, ArrowRight, Shield, ArrowUp, 
  Zap, Building2, BarChart3, Users2, ShieldCheck,
  Newspaper, BookOpen, GraduationCap, Trophy
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SubscribeForm from "./SubscribeForm";
import { LinkPreview } from "@/components/ui/link-preview";


const Twitter = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Linkedin = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const Github = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);
const Youtube = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.4-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);

const footerLinks = [
  {
    title: "Platform",
    links: [
      { name: "Smart Scheduling", href: "/employee-schedule-maker", icon: CalendarRange },
      { name: "AI Attendance", href: "/features/attendance", icon: Zap },
      { name: "Compliance Engine", href: "/features/compliance", icon: ShieldCheck },
      { name: "Global Payroll", href: "/features/payroll", icon: Building2 },
      { name: "Team Comms", href: "/features/communication", icon: MessageCircle },
      { name: "Deep Analytics", href: "/features/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "Solutions",
    links: [
      { name: "Healthcare", href: "/solutions/healthcare" },
      { name: "Retail & Commerce", href: "/solutions/retail" },
      { name: "Hospitality", href: "/solutions/hospitality" },
      { name: "Security Ops", href: "/solutions/security" },
      { name: "Enterprise Hub", href: "/pricing" },
    ]
  },
  {
    title: "Knowledge",
    links: [
      { name: "Industry Blog", href: "/blog", icon: Newspaper },
      { name: "Expert Guides", href: "/guides", icon: BookOpen },
      { name: "Newsroom", href: "/news", icon: GraduationCap },
      { name: "Success Stories", href: "/customer-success", icon: Trophy },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About StaffSchedule", href: "/about" },
      { name: "Contact Support", href: "/contact" },
      { name: "Plans & Pricing", href: "/pricing" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ]
  }
];

const socialLinks = [
  { icon: Twitter, href: "#", color: "hover:text-sky-400", label: "Follow StaffSchedule.io on Twitter" },
  { icon: Linkedin, href: "#", color: "hover:text-blue-600", label: "Connect with StaffSchedule.io on LinkedIn" },
  { icon: Github, href: "#", color: "hover:text-slate-200", label: "StaffSchedule.io on GitHub" },
  { icon: Youtube, href: "#", color: "hover:text-rose-600", label: "StaffSchedule.io on YouTube" },
];

const PremiumFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#020617] pt-32 pb-16 relative overflow-hidden selection:bg-indigo-500/30">
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.06] z-10 mix-blend-overlay bg-grain" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* CTA SECTION REMOVED AS REQUESTED */}

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="xl:col-span-4 text-center xl:text-left">
            <Link href="/" className="flex items-center justify-center xl:justify-start gap-3 mb-8 group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                <CalendarRange className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                StaffSchedule<span className="text-indigo-500">.io</span>
              </span>
            </Link>
            <p className="text-base sm:text-lg text-slate-400 font-medium mb-8 leading-relaxed max-w-xl mx-auto xl:mx-0">
              The world&apos;s most advanced workforce orchestration platform. Built for the modern enterprise, designed for the human experience.
            </p>

            <div className="mb-10 max-w-sm mx-auto xl:mx-0">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">
                Join our Newsletter
              </div>
              <SubscribeForm variant="dark" buttonText="Join" />
            </div>

            
            <div className="flex justify-center xl:justify-start gap-3">
              {socialLinks.map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    "w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 transition-all duration-300",
                    social.color,
                    "hover:bg-white/10 hover:-translate-y-1"
                  )}
                >
                  <social.icon size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center sm:text-left">
            {footerLinks.map((section, idx) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6 sm:mb-8">
                  {section.title}
                </div>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-white font-bold transition-colors flex items-center justify-center sm:justify-start group"
                      >
                        <span className="hidden sm:block w-0 h-0.5 bg-indigo-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              © {new Date().getFullYear()} StaffSchedule.io — All rights reserved.
            </p>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10">
                 <Shield className="w-3 h-3" />
                 SOC2 Certified
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-sky-500 uppercase tracking-widest bg-sky-500/5 px-3 py-1.5 rounded-full border border-sky-500/10">
                 <Globe className="w-3 h-3" />
                 GDPR Compliant
               </div>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 rounded-xl flex items-center justify-center transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
