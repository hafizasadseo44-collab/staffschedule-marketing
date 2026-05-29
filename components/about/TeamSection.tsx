"use client";

import React, { useState } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useTransform, 
  useSpring,
  useScroll,
  Variants,
} from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Award,
  Users,
  Globe,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* Inline SVG social icons */
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

/* ─────────────────────────────────────────────
   Animated Background Components
   ───────────────────────────────────────────── */
const BackgroundBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <motion.div
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{
        x: [0, -80, 0],
        y: [0, 120, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{
        x: [0, 40, 0],
        y: [0, -100, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[40%] right-[15%] w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[80px]"
    />
  </div>
);

/* ─────────────────────────────────────────────
   Team Data — realistic bios & previous companies
   ───────────────────────────────────────────── */
const TEAM = [
  {
    name: "Alex Rivera",
    role: "Co-Founder & CEO",
    avatar: "/images/team/alex-rivera.jpg",
    initials: "AR",
    gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)",
    ringColor: "#6366F1",
    bio: "10+ years scaling ops-tech startups. Previously VP of Operations at ShiftWise (acq. 2021) and product lead at WorkJam. Built workforce tools used by 200k+ employees across 3 enterprise companies.",
    previousCompanies: ["ShiftWise", "WorkJam"],
    linkedin: "#",
    twitter: "#",
    funFact: "Runs a 5k every morning before standups",
  },
  {
    name: "Shirin Nazari",
    role: "Co-Founder & CTO",
    avatar: "/images/team/shirin-nazari.jpg",
    initials: "SN",
    gradient: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 50%, #60A5FA 100%)",
    ringColor: "#4F46E5",
    bio: "Full-stack engineer with a Stanford CS degree. Prev. senior engineer at Stripe and early engineer at Linear. Obsessed with building tools that feel like magic but are dead-simple under the hood.",
    previousCompanies: ["Stripe", "Linear"],
    linkedin: "#",
    twitter: "#",
    funFact: "Has 1,200+ contributions on GitHub this year",
  },
  {
    name: "Marcus Webb",
    role: "Head of Product",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    initials: "MW",
    gradient: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #3B82F6 100%)",
    ringColor: "#0EA5E9",
    bio: "Former restaurant GM who managed 40+ staff across 3 locations. Led product at Toast for 4 years, shipping the scheduling module used by 60k+ restaurants. Joined because he wished StaffSchedule existed.",
    previousCompanies: ["Toast", "Square"],
    linkedin: "#",
    twitter: "#",
    funFact: "Can still close a restaurant kitchen in 12 mins flat",
  },
  {
    name: "Priya Menon",
    role: "Head of Customer Success",
    avatar: "/images/team/priya-menon.jpg",
    initials: "PM",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
    ringColor: "#10B981",
    bio: "The reason 96% of users rate onboarding as 10/10. Previously built CS teams at Freshworks and Zoho, supporting 15k+ accounts. Every feature she touches becomes simpler and more lovable.",
    previousCompanies: ["Freshworks", "Zoho"],
    linkedin: "#",
    twitter: "#",
    funFact: "Speaks 4 languages fluently",
  },
  {
    name: "James Okafor",
    role: "Lead Designer",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=200&h=200",
    initials: "JO",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",
    ringColor: "#F59E0B",
    bio: "Designed interfaces used by 1M+ people at Figma and InVision. Believes great design is invisible — you should never think about the tool, only your work. Leads our design system and brand.",
    previousCompanies: ["Figma", "InVision"],
    linkedin: "#",
    twitter: "#",
    funFact: "Collects vintage typography books",
  },
  {
    name: "Layla Hassan",
    role: "Head of Growth",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
    initials: "LH",
    gradient: "linear-gradient(135deg, #EC4899 0%, #DB2777 50%, #BE185D 100%)",
    ringColor: "#EC4899",
    bio: "Scaled two B2B SaaS products from 0 → 50k users. Previously growth lead at HubSpot and marketing at Calendly. Loves a good funnel, hates wasted ad spend, and lives for data-driven decisions.",
    previousCompanies: ["HubSpot", "Calendly"],
    linkedin: "#",
    twitter: "#",
    funFact: "Competitive crossword solver",
  },
];

/* ─────────────────────────────────────────────
   Trust statistics
   ───────────────────────────────────────────── */
const TRUST_STATS = [
  { icon: Users, value: "50+", label: "Combined years of experience" },
  { icon: Globe, value: "6", label: "Countries represented" },
  { icon: Award, value: "200k+", label: "Users served at previous companies" },
  { icon: ShieldCheck, value: "100%", label: "Remote-first since day one" },
];

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 18, mass: 0.8 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};


/* ─────────────────────────────────────────────
   TeamCard component
   ───────────────────────────────────────────── */
function TeamCard({ member, index }: { member: (typeof TEAM)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3D Tilt Effect - disabled on mobile
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateXValue = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateYValue = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const rotateX = isMobile ? 0 : rotateXValue;
  const rotateY = isMobile ? 0 : rotateYValue;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: "1000px",
        rotateX,
        rotateY,
      }}
      className="relative group cursor-default"
    >
      {/* Animated glow behind card on hover */}
      <motion.div
        className="absolute -inset-[2px] rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md"
        style={{ background: member.gradient, filter: "brightness(1.1)" }}
      />

      <div
        className="relative bg-white rounded-[28px] overflow-hidden transition-all duration-500"
        style={{
          boxShadow: isHovered
            ? `0 30px 70px -10px rgba(0,0,0,0.15), 0 0 0 1px ${member.ringColor}30`
            : "0 10px 30px -5px rgba(0,0,0,0.03), 0 0 0 1px rgba(226,232,240,0.8)",
          transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top gradient accent bar */}
        <div className="h-1.5 w-full" style={{ background: member.gradient }} />

        <div className="p-7 pb-6">
          {/* Avatar + Social row */}
          <div className="flex items-start justify-between mb-5">
            {/* Avatar with animated ring */}
            <div className="relative">
              <motion.div
                className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-white font-black text-xl relative overflow-hidden"
                style={{ background: member.gradient }}
                animate={{
                  scale: isHovered ? 1.08 : 1,
                  borderRadius: isHovered ? "20px" : "16px",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Shimmer overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "200%" : "-100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                
                {member.avatar ? (
                  <Image 
                    src={member.avatar} 
                    alt={member.name}
                    width={72}
                    height={72}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="relative z-10 drop-shadow-sm">{member.initials}</span>
                )}
              </motion.div>

              {/* Status dot */}
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-[3px] border-white"
                style={{ background: "#22C55E" }}
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Social links */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <a
                href={member.linkedin}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                aria-label={`${member.name} LinkedIn`}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={member.twitter}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                aria-label={`${member.name} Twitter`}
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Name & Role */}
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[17px] font-extrabold text-slate-900 tracking-tight">
              {member.name}
            </h3>
            <BadgeCheck className="w-4 h-4 text-sky-500 fill-sky-500/10" />
          </div>
          <p className="text-sm font-bold mb-3" style={{ color: member.ringColor }}>
            {member.role}
          </p>

          {/* Bio */}
          <p className="text-slate-500 text-[13.5px] font-medium leading-[1.65] mb-4">
            {member.bio}
          </p>

          {/* Previously at badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Prev:
            </span>
            {member.previousCompanies.map((company) => (
              <span
                key={company}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 transition-colors group-hover:text-slate-700"
                style={{
                  background: "rgba(241,245,249,1)",
                  border: "1px solid rgba(226,232,240,0.6)",
                }}
              >
                {company}
              </span>
            ))}
          </div>

          {/* Fun fact - appears on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
                  style={{
                    background: `${member.ringColor}08`,
                    border: `1px solid ${member.ringColor}15`,
                    color: member.ringColor,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{member.funFact}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main TeamSection
   ───────────────────────────────────────────── */
export default function TeamSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-40 overflow-hidden relative" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 30%, #F1F5F9 100%)" }}>
      <BackgroundBlobs />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ─────────────────────────── */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-[0.2em] mb-8"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(99,102,241,0.1)",
              color: "#4F46E5",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            The People Behind It
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-6xl lg:text-[4rem] font-black text-slate-900 tracking-tighter leading-[0.95] mb-8 px-4 sm:px-0"
          >
            Meet the team building
            <br className="hidden sm:block" />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)" }}
            >
              your future.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg lg:text-xl text-slate-500/90 font-medium max-w-2xl mx-auto leading-relaxed border-l-2 border-indigo-500/20 pl-6 text-left sm:text-center sm:pl-0 sm:border-l-0"
          >
            A remote-first team of operators, engineers, and builders who&rsquo;ve
            been in your shoes — and built StaffSchedule because nothing else was good enough.
          </motion.p>
        </motion.div>

        {/* ── Trust Stats Strip ────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {TRUST_STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-center gap-4 px-6 py-5 rounded-3xl bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-indigo-200/50 hover:bg-white/80 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Team Grid ──────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24"
        >
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              onMouseEnter={() => setActiveCardIndex(i)}
              onMouseLeave={() => setActiveCardIndex(null)}
              animate={{
                opacity: activeCardIndex !== null && activeCardIndex !== i ? 0.6 : 1,
                scale: activeCardIndex !== null && activeCardIndex !== i ? 0.98 : 1,
                filter: activeCardIndex !== null && activeCardIndex !== i ? "blur(1px)" : "blur(0px)",
              }}
              transition={{ duration: 0.4 }}
            >
              <TeamCard member={member} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Team Alumni / Previously At Strip ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-24 relative"
        >
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />
          <span className="px-6 py-2 bg-[#F1F5F9] text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] inline-block mb-10">
            Heritage of Excellence
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {["Stripe", "Toast", "HubSpot", "Figma", "Freshworks", "Gusto", "Calendly", "Square"].map(
              (company: string) => (
                <span
                  key={company}
                  className="text-xl sm:text-2xl font-black text-slate-400 hover:text-indigo-600 transition-colors duration-300 cursor-default tracking-tighter"
                >
                  {company}
                </span>
              )
            )}
          </div>
        </motion.div>

        {/* ── We're Hiring CTA ───────────────── */}
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[2.5rem] overflow-hidden group shadow-[0_40px_80px_-20px_rgba(79,70,229,0.25)]"
          >
            {/* 1. Dynamic Background Layer */}
            <div className="absolute inset-0 z-0">
              {/* Base Gradient */}
              <div 
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 25%, #4338CA 60%, #4F46E5 100%)" }}
              />
              {/* Animated Mesh Overlay */}
              <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(79,70,229,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.4) 0%, transparent 50%)" }} />
              
              {/* Global Connectivity Dots (Simulated) */}
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 0)", backgroundSize: "40px 40px" }} />
              
              {/* Moving Aurora Glows */}
              <motion.div 
                animate={{ 
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                  rotate: [0, 180, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-400/15 rounded-full blur-[100px]"
              />
            </div>

            <div className="relative z-10 px-8 py-14 lg:py-16 text-center">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-1.5"
                >
                  <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  Remote First
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-1.5"
                >
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  Impact Driven
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tighter leading-[0.95]">
                  Shape the future of <br />
                  <span className="text-indigo-200">workforce management.</span>
                </h3>
                <p className="text-indigo-50/70 font-medium text-base lg:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Join a world-class team of operators and engineers building the #1 staff scheduling platform. We&apos;re looking for owners, builders, and dreamers.
                </p>
              </motion.div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative h-14 px-8 rounded-xl bg-white text-indigo-900 font-black text-base transition-all shadow-lg flex items-center gap-2 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span className="relative z-10">See Open Positions</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.95 }}
                    className="h-14 px-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-base transition-all flex items-center gap-2 group"
                  >
                    Our Culture
                    <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                  </motion.button>
                </Link>
              </div>

              {/* Bottom Visual Indicator */}
              <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-center gap-8 text-center">
                 <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">Global Nodes</span>
                    <span className="text-lg font-bold text-white">12+ Countries</span>
                 </div>
                 <div className="w-px h-8 bg-white/10" />
                 <div className="flex flex-col items-center">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">Team Growth</span>
                    <span className="text-lg font-bold text-white">2.5X YoY</span>
                 </div>
              </div>
            </div>

            {/* Additional Decorative Shapes */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
               <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-white rounded-full blur-[80px]" />
               <div className="absolute top-[-10%] left-[-10%] w-[150px] h-[150px] bg-indigo-500 rounded-full blur-[60px]" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
