"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion, useInView, AnimatePresence,
  type Variants, type Transition,
  useMotionValue, useTransform, useSpring as useMotionSpring,
} from "framer-motion";
import {
  ArrowRight, CheckCircle2, Star, ChevronDown,
  UtensilsCrossed, Hotel, ShoppingBag, Stethoscope,
  Shield, HardHat, Factory, Briefcase, GraduationCap,
  Truck, Sparkles as SparklesIcon, Heart, Scissors,
  Calendar, Clock, MessageSquare, Users, MapPin,
  Building2, Wrench, Phone, Zap, TrendingUp, Globe,
  PartyPopper, Store, Code, Headphones, Home,
  HeartPulse, PawPrint, Pill, Smile, Bug, TreePine,
  Siren, Package, Music, HeartHandshake, Layers,
} from "lucide-react";

/* ─── animation constants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const spring: Transition = { type: "spring", stiffness: 260, damping: 22 };

/* ─── animated counter ─── */
function Counter({ to, suffix = "", duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const steps = Math.round(duration * 60);
    const inc = to / steps;
    const id = setInterval(() => {
      v += inc;
      if (v >= to) { setN(to); clearInterval(id); }
      else setN(Math.round(v));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── mouse-follow spotlight ─── */
function SpotCard({ children, className = "", glow = "rgba(139,92,246,0.15)" }: { children: React.ReactNode; className?: string; glow?: string }) {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useTransform(mx, v => `${v}px`); const sy = useTransform(my, v => `${v}px`);
  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      whileHover={{ y: -6, scale: 1.02 }} transition={spring}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}
    >
      <motion.div className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(180px circle at ${sx} ${sy}, ${glow}, transparent 70%)` }} />
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════
   DATA
══════════════════════════════════ */
const INDUSTRIES = [
  {
    icon: UtensilsCrossed, grad: "from-orange-500 to-red-600", glow: "rgba(249,115,22,0.18)",
    title: "Restaurants & Food Service",
    pitch: "Pre-shift briefings, last-minute coverage, and section assignments — built for the chaos of food and beverage.",
    sectors: ["Restaurants", "Cafés & Coffee Shops", "Bars & Pubs", "Quick-Service", "Catering"],
    href: "/solutions/hospitality",
    metric: "12+ hrs", metricLabel: "saved weekly per manager",
  },
  {
    icon: Hotel, grad: "from-amber-500 to-orange-600", glow: "rgba(245,158,11,0.18)",
    title: "Hotels & Hospitality",
    pitch: "Front desk, housekeeping, F&B, and concierge — every department coordinated from one platform.",
    sectors: ["Hotels & Resorts", "Boutique Inns", "Hostels", "Vacation Rentals", "Conference Centers"],
    href: "/solutions/hospitality",
    metric: "22%", metricLabel: "less labor waste",
  },
  {
    icon: ShoppingBag, grad: "from-pink-500 to-rose-600", glow: "rgba(244,63,94,0.18)",
    title: "Retail & Consumer",
    pitch: "Flash sale broadcasts, coverage by demand forecast, and shift swaps that fill in minutes.",
    sectors: ["Retail Stores", "Boutiques", "Big Box", "Franchises", "Pop-Ups"],
    href: "/solutions/retail",
    metric: "3×", metricLabel: "faster shift coverage",
  },
  {
    icon: Stethoscope, grad: "from-rose-500 to-pink-600", glow: "rgba(244,63,94,0.18)",
    title: "Healthcare & Medical",
    pitch: "HIPAA-aware messaging, credential tracking, and rotating-shift planning for clinical teams.",
    sectors: ["Hospitals", "Clinics", "Home Care", "Nursing Homes", "Dental & Vet"],
    href: "/solutions/healthcare",
    metric: "0", metricLabel: "compliance incidents",
  },
  {
    icon: Shield, grad: "from-indigo-500 to-blue-600", glow: "rgba(99,102,241,0.18)",
    title: "Security Services",
    pitch: "GPS-verified post checks, geofenced clock-ins, and rapid replacement when guards call out.",
    sectors: ["Guard Companies", "Event Security", "Mobile Patrol", "Loss Prevention", "Cash-in-Transit"],
    href: "/solutions/security",
    metric: "100%", metricLabel: "post coverage verified",
  },
  {
    icon: HardHat, grad: "from-yellow-500 to-amber-600", glow: "rgba(234,179,8,0.18)",
    title: "Construction & Trades",
    pitch: "Site-based GPS clock-ins, crew assignment by skill, and instant updates when plans change.",
    sectors: ["General Contractors", "Electrical", "Plumbing", "HVAC", "Concrete & Framing"],
    href: "/industries/construction-crew-scheduling-software",
    metric: "18%", metricLabel: "less rework from missed updates",
  },
  {
    icon: Factory, grad: "from-slate-500 to-gray-700", glow: "rgba(100,116,139,0.18)",
    title: "Manufacturing",
    pitch: "Line-by-line scheduling, certification gating, and rotating shift patterns that protect production.",
    sectors: ["Production Lines", "Warehouses", "Assembly", "Quality Control", "Maintenance"],
    href: "/industries/manufacturing-scheduling-software",
    metric: "24/7", metricLabel: "continuous coverage",
  },
  {
    icon: Briefcase, grad: "from-violet-500 to-purple-600", glow: "rgba(139,92,246,0.18)",
    title: "Professional Services",
    pitch: "Bill-by-the-hour accuracy, project-based schedules, and remote-friendly time tracking.",
    sectors: ["Consulting", "Legal", "Accounting", "Agencies", "Staffing"],
    href: "/industries/professional-services",
    metric: "98%", metricLabel: "billable hour accuracy",
  },
  {
    icon: GraduationCap, grad: "from-sky-500 to-cyan-600", glow: "rgba(14,165,233,0.18)",
    title: "Education",
    pitch: "Faculty rotations, substitute teacher dispatch, and dining-hall worker coordination in one platform.",
    sectors: ["Universities", "Schools", "Daycares", "Tutoring Centers", "Camps"],
    href: "/industries/education",
    metric: "Zero", metricLabel: "uncovered classrooms",
  },
  {
    icon: Truck, grad: "from-emerald-500 to-teal-600", glow: "rgba(16,185,129,0.18)",
    title: "Logistics & Transportation",
    pitch: "Driver schedules, hours-of-service compliance, and dock crew coordination for warehouses.",
    sectors: ["Delivery", "Warehousing", "Trucking", "Couriers", "Ride-Share"],
    href: "/industries/logistics-scheduling-software",
    metric: "30 min", metricLabel: "average dispatch turnaround",
  },
  {
    icon: SparklesIcon, grad: "from-teal-500 to-cyan-600", glow: "rgba(20,184,166,0.18)",
    title: "Cleaning & Facilities",
    pitch: "Geofenced site verification, recurring crew assignments, and proof-of-service capture.",
    sectors: ["Commercial Cleaning", "Janitorial", "Landscaping", "Pest Control", "Pool Service"],
    href: "/industries/cleaning-service-scheduling-software",
    metric: "100%", metricLabel: "service verification",
  },
  {
    icon: Heart, grad: "from-fuchsia-500 to-pink-600", glow: "rgba(217,70,239,0.18)",
    title: "Non-Profit & Community",
    pitch: "Volunteer coordination, shift signups, and donor-event staffing — without the spreadsheet chaos.",
    sectors: ["Charities", "Religious Orgs", "Volunteer Programs", "Community Centers", "Food Banks"],
    href: "/industries/volunteer-scheduling-software",
    metric: "5×", metricLabel: "more volunteer signups",
  },
];

/* All 32 industries grouped by 11 categories (full competitor coverage) */
const INDUSTRY_INDEX = [
  {
    key: "hospitality",
    category: "Hospitality & Food Services",
    catIcon: UtensilsCrossed,
    accent: "#ea580c",
    bg: "from-orange-500 to-red-600",
    glow: "rgba(249,115,22,0.16)",
    items: [
      { name: "Restaurants, Cafés, Bars & Coffee Shops", icon: UtensilsCrossed, href: "/industries/restaurants", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop" },
      { name: "Catering & Events", icon: PartyPopper, href: "/industries/events-catering", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop" },
      { name: "Hotels & Resorts", icon: Hotel, href: "/industries/hotels-resorts", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "retail",
    category: "Retail & Consumer Services",
    catIcon: ShoppingBag,
    accent: "#ec4899",
    bg: "from-pink-500 to-rose-600",
    glow: "rgba(236,72,153,0.16)",
    items: [
      { name: "Retail Stores", icon: Store, href: "/industries/retail", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop" },
      { name: "Salon & Spa", icon: Scissors, href: "/industries/salon-spa", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop" },
      { name: "Franchises", icon: Building2, href: "/industries/franchise", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "professional",
    category: "Professional & Business Services",
    catIcon: Briefcase,
    accent: "#8b5cf6",
    bg: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.16)",
    items: [
      { name: "Professional Services", icon: Briefcase, href: "/industries/professional-services", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" },
      { name: "Staffing & Recruitment", icon: Users, href: "/industries/staffing-scheduling-software", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
      { name: "Security Services", icon: Shield, href: "/solutions/security", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop" },
      { name: "Technology & Software", icon: Code, href: "/industries/technology-software", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop" },
      { name: "Call Centers & Customer Support", icon: Headphones, href: "/industries/call-center", image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "healthcare",
    category: "Health & Social Care",
    catIcon: Stethoscope,
    accent: "#f43f5e",
    bg: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.16)",
    items: [
      { name: "Healthcare & Medical", icon: Stethoscope, href: "/industries/healthcare", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop" },
      { name: "Caregivers & Assisted Living", icon: Heart, href: "/industries/caregivers-assisted-living", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=600&auto=format&fit=crop" },
      { name: "Home Care", icon: Home, href: "/industries/home-care", image: "/images/industries/ind_home_care.png" },
      { name: "Nursing", icon: HeartPulse, href: "/industries/nurse-scheduling", image: "/images/industries/ind_nursing.png" },
      { name: "Veterinary Care", icon: PawPrint, href: "/industries/veterinary-clinic-software", image: "/images/industries/ind_veterinary.png" },
      { name: "Pharmacy", icon: Pill, href: "/industries/pharmacy-scheduling-software", image: "/images/industries/ind_pharmacy.png" },
      { name: "Dental Practice", icon: Smile, href: "/industries/dental-office-scheduling-software", image: "/images/industries/ind_dental.png" },
    ],
  },
  {
    key: "education",
    category: "Education Services",
    catIcon: GraduationCap,
    accent: "#0ea5e9",
    bg: "from-sky-500 to-cyan-600",
    glow: "rgba(14,165,233,0.16)",
    items: [
      { name: "Colleges, Universities & Schools", icon: GraduationCap, href: "/industries/education", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "facilities",
    category: "Facilities & Maintenance",
    catIcon: Wrench,
    accent: "#14b8a6",
    bg: "from-teal-500 to-cyan-600",
    glow: "rgba(20,184,166,0.16)",
    items: [
      { name: "Cleaning Services", icon: SparklesIcon, href: "/industries/cleaning-service-scheduling-software", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop" },
      { name: "Electricians", icon: Zap, href: "/industries/electrician-scheduling-software", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop" },
      { name: "Lawn Care & Landscaping", icon: TreePine, href: "/industries/lawn-care-scheduling-app", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop" },
      { name: "Pest Control", icon: Bug, href: "/industries/pest-control-scheduling-software", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=600&auto=format&fit=crop" },
      { name: "Plumbers", icon: Wrench, href: "/industries/plumbing-scheduling-software", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "public",
    category: "Public & Emergency Services",
    catIcon: Siren,
    accent: "#dc2626",
    bg: "from-red-500 to-rose-600",
    glow: "rgba(220,38,38,0.16)",
    items: [
      { name: "Emergency & Law Enforcement", icon: Siren, href: "/industries/emergency-worker", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop" },
      { name: "Field Services", icon: Truck, href: "/industries/field-service-scheduling-software", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "entertainment",
    category: "Entertainment & Media",
    catIcon: Music,
    accent: "#a855f7",
    bg: "from-purple-500 to-fuchsia-600",
    glow: "rgba(168,85,247,0.16)",
    items: [
      { name: "Entertainment & Seasonal", icon: PartyPopper, href: "/industries/seasonal-staff-scheduling", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "logistics",
    category: "Logistics & Transportation",
    catIcon: Truck,
    accent: "#10b981",
    bg: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.16)",
    items: [
      { name: "Delivery", icon: Package, href: "/industries/delivery-scheduling-software", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop" },
      { name: "Logistics & Warehousing", icon: Truck, href: "/industries/logistics-scheduling-software", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "nonprofit",
    category: "Non-Profit & Community",
    catIcon: HeartHandshake,
    accent: "#d946ef",
    bg: "from-fuchsia-500 to-pink-600",
    glow: "rgba(217,70,239,0.16)",
    items: [
      { name: "Volunteers & Non-Profit", icon: HeartHandshake, href: "/industries/volunteer-scheduling-software", image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    key: "construction",
    category: "Industry & Construction",
    catIcon: HardHat,
    accent: "#f59e0b",
    bg: "from-yellow-500 to-amber-600",
    glow: "rgba(245,158,11,0.16)",
    items: [
      { name: "Construction & Trades", icon: HardHat, href: "/industries/construction-crew-scheduling-software", image: "/images/industries/ind_construction.png" },
      { name: "Manufacturing", icon: Factory, href: "/industries/manufacturing-scheduling-software", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop" },
    ],
  },
];

const FEATURED = [
  {
    icon: UtensilsCrossed, grad: "from-orange-500 to-red-600",
    title: "Restaurants & Food Service",
    headline: "From back-of-house to front-of-house, one schedule fits every station.",
    desc: "Build prep, line, server, and bar schedules in minutes. Send tip-pool changes as broadcast messages. Approve shift swaps before the dinner rush. Sync tipped hours directly to payroll.",
    bullets: [
      { icon: Calendar, text: "Section and station assignments" },
      { icon: Clock, text: "Tip-pool and overtime tracking" },
      { icon: MessageSquare, text: "Pre-shift announcements" },
      { icon: TrendingUp, text: "Demand-based scheduling" },
    ],
    accent: "#ea580c",
  },
  {
    icon: Stethoscope, grad: "from-rose-500 to-pink-600",
    title: "Healthcare & Clinical Teams",
    headline: "Rotating shifts, credential gates, and secure messaging that respects patient privacy.",
    desc: "Build complex rotating rotas across departments. Block schedules based on missing certifications. Message colleagues without ever sharing personal phone numbers. Audit-trail everything.",
    bullets: [
      { icon: Shield, text: "HIPAA-aware messaging" },
      { icon: CheckCircle2, text: "Credential and license tracking" },
      { icon: Users, text: "Department-level rotations" },
      { icon: Clock, text: "Auditable timesheet history" },
    ],
    accent: "#f43f5e",
  },
  {
    icon: HardHat, grad: "from-yellow-500 to-amber-600",
    title: "Construction & Field Crews",
    headline: "Right crew, right site, right gear — every single morning.",
    desc: "GPS-verify every clock-in at the right site. Match crews to jobs by skill and certification. Push site updates with photos so every worker arrives with the plan.",
    bullets: [
      { icon: MapPin, text: "Site-based GPS verification" },
      { icon: HardHat, text: "Skill-matched crew assignment" },
      { icon: Phone, text: "Pre-arrival site updates with photos" },
      { icon: Shield, text: "OSHA-ready timesheet audit trail" },
    ],
    accent: "#f59e0b",
  },
];

const STATS = [
  { value: 200, suffix: "K+", label: "Workplaces Served" },
  { value: 32, suffix: "", label: "Industries Supported" },
  { value: 4.9, suffix: "/5", label: "Average Customer Rating", isFloat: true },
  { value: 99.9, suffix: "%", label: "Platform Uptime SLA", isFloat: true },
];

const TESTIMONIALS = [
  { name: "Marcus L.", role: "Multi-Unit Restaurant Owner", industry: "Hospitality", quote: "We run six locations across two states. Switching from our old patchwork to StaffSchedule cut weekly admin from 18 hours to under 4. Every location, every shift, one dashboard.", avatar: "ML", color: "#ea580c" },
  { name: "Dr. Lena K.", role: "Clinic Director", industry: "Healthcare", quote: "Credential gating alone saved us. Nurses physically cannot be scheduled if their license is unverified. That eliminated an entire category of compliance risk overnight.", avatar: "LK", color: "#f43f5e" },
  { name: "James W.", role: "Site Foreman", industry: "Construction", quote: "GPS clock-in ended our overtime disputes. Every hour is verified at the actual site. Payroll runs in 30 minutes instead of 3 days.", avatar: "JW", color: "#f59e0b" },
];

const FAQS = [
  { q: "What industries does StaffSchedule.io support?", a: "30+ industries including restaurants, retail, healthcare, construction, hospitality, security, education, professional services, logistics, cleaning, manufacturing, and non-profits. The platform adapts to your sector's specific workflow." },
  { q: "Is StaffSchedule.io different for each industry?", a: "Core features are the same — scheduling, time clock, messaging, leave management, analytics. Industry-specific tweaks include HIPAA-aware messaging for healthcare, tip-pool tracking for restaurants, GPS site verification for construction, and credential gating for licensed roles." },
  { q: "Do I need a different plan for my industry?", a: "No. Every feature is on every plan. Pick the tier that matches your team size — all industry configurations available on every tier, including the 14-day free trial." },
  { q: "Can StaffSchedule.io handle multi-location businesses?", a: "Absolutely. Multi-location management is core to the platform. Run retail chains, restaurant groups, healthcare networks, and franchise operations from one dashboard." },
  { q: "What if my industry isn't listed?", a: "If you employ shift-based workers, StaffSchedule.io works for you. Contact us with your industry and we'll show you exactly how teams like yours are using the platform today." },
  { q: "How long does industry-specific setup take?", a: "Most teams are live within an hour. The setup wizard configures your industry presets, imports employees, and builds your first schedule from a template — guided every step." },
];

/* ══════════════════════════════════
   HERO — cycling industry showcase
══════════════════════════════════ */
function HeroSection() {
  const [active, setActive] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 120, damping: 30 });
  const rotateY = useMotionSpring(useTransform(mouseX, [-600, 600], [-4, 4]), { stiffness: 120, damping: 30 });

  const cards = [
    { icon: UtensilsCrossed, label: "Restaurants", color: "#ea580c", bg: "from-orange-500 to-red-600" },
    { icon: Stethoscope, label: "Healthcare", color: "#f43f5e", bg: "from-rose-500 to-pink-600" },
    { icon: HardHat, label: "Construction", color: "#f59e0b", bg: "from-yellow-500 to-amber-600" },
    { icon: ShoppingBag, label: "Retail", color: "#ec4899", bg: "from-pink-500 to-rose-600" },
    { icon: Hotel, label: "Hospitality", color: "#f97316", bg: "from-amber-500 to-orange-600" },
    { icon: Shield, label: "Security", color: "#6366f1", bg: "from-indigo-500 to-blue-600" },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % cards.length), 2400);
    return () => clearInterval(id);
  }, [cards.length]);

  return (
    <section
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0c0a1a] via-[#110e2a] to-[#0c0a1a] overflow-hidden pt-24 pb-20"
      onMouseMove={e => { mouseX.set(e.clientX - window.innerWidth / 2); mouseY.set(e.clientY - window.innerHeight / 2); }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.22, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left copy */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="text-center lg:text-left">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-6">
            <Globe className="w-3.5 h-3.5" />
            32 Industries Served
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-[3.6rem] font-black text-white leading-[1.07] tracking-tight mb-6">
            Built for Every Industry.{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Customized for Yours.
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            From the back of a restaurant to the floor of a hospital, from a construction site to a retail flagship —
            StaffSchedule.io adapts to how your specific industry runs shifts.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#all-industries"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Browse All Industries
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Industry presets included</span>
          </motion.div>
        </motion.div>

        {/* Right — animated cycling showcase */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div style={{ rotateX, rotateY, transformPerspective: 1500 }} className="relative w-full max-w-md">

            {/* Main panel */}
            <div className="relative bg-gradient-to-br from-[#1a1830] to-[#13112a] rounded-2xl border border-white/10 shadow-2xl shadow-indigo-900/40 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[10px] text-gray-500 font-mono">app.staffschedule.io / industries</span>
                </div>
              </div>

              {/* Active industry display */}
              <div className="p-8 min-h-[360px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div key={cards[active].label}
                    initial={{ opacity: 0, y: 18, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="flex flex-col items-center"
                  >
                    {/* Big icon */}
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${cards[active].bg} flex items-center justify-center shadow-2xl mb-6`}
                      style={{ boxShadow: `0 20px 60px ${cards[active].color}50` }}>
                      {React.createElement(cards[active].icon, { className: "w-12 h-12 text-white" })}
                    </div>
                    <p className="text-white text-2xl font-black mb-2">{cards[active].label}</p>
                    <p className="text-gray-400 text-sm text-center max-w-xs mb-6">
                      Configured. Optimized. Ready in under an hour.
                    </p>
                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {[
                        { l: "Shifts", v: "Auto" },
                        { l: "Setup", v: "1 hr" },
                        { l: "Mobile", v: "Yes" },
                      ].map((m, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-2 text-center">
                          <p className="text-[9px] text-gray-500 uppercase tracking-wider">{m.l}</p>
                          <p className="text-xs font-bold text-white">{m.v}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress dots */}
              <div className="px-6 pb-5 flex items-center justify-center gap-1.5">
                {cards.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${i === active ? "w-6 h-1.5 bg-indigo-400" : "w-1.5 h-1.5 bg-white/20"}`} />
                ))}
              </div>
            </div>

            {/* Floating cards around */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.2, ...spring }}
              className="hidden md:block absolute -left-6 top-24 bg-white rounded-2xl shadow-2xl border border-gray-100 px-3.5 py-2.5 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Industry Preset</p>
                  <p className="text-xs font-bold text-gray-800">Auto-configured</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.7, ...spring }}
              className="hidden md:block absolute -right-6 bottom-20 bg-white rounded-2xl shadow-2xl border border-gray-100 px-3.5 py-2.5 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Setup Complete</p>
                  <p className="text-xs font-bold text-gray-800">47 minutes</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   STATS BAR
══════════════════════════════════ */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-100">
        {STATS.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex flex-col items-center gap-1 px-6 py-4">
            <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {inView ? <Counter to={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
            </p>
            <p className="text-sm font-semibold text-gray-700 text-center">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   ALL INDUSTRIES GRID
══════════════════════════════════ */
function IndustriesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="all-industries" className="py-24 bg-[#faf9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Building2 className="w-3.5 h-3.5" />
            Every Industry · One Platform
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Better Scheduling, Time Tracking, and Payroll
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> for Every Industry</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            Pick your sector. We'll show you the exact workflows we've built for teams like yours.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind) => (
            <motion.div key={ind.title} variants={fadeUp}>
              <Link href={ind.href}>
                <SpotCard glow={ind.glow} className="rounded-2xl border border-gray-100 bg-white shadow-sm cursor-pointer h-full">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.grad} flex items-center justify-center shadow-sm`}>
                        <ind.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-black bg-gradient-to-br ${ind.grad} bg-clip-text text-transparent leading-none`}>{ind.metric}</p>
                        <p className="text-[10px] text-gray-400 mt-1 leading-tight max-w-[110px]">{ind.metricLabel}</p>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{ind.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{ind.pitch}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {ind.sectors.map((s) => (
                        <span key={s} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-50 text-gray-600 border border-gray-100">
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:gap-2 transition-all duration-200">
                      See how it works <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </SpotCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   COMPLETE INDUSTRY INDEX (32 industries)
══════════════════════════════════ */
function IndustryIndexSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.1, 0.04] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-fuchsia-200 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-200 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Layers className="w-3.5 h-3.5" />
            Complete Industry Index
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Browse All <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">32 Industries</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto mb-2">
            Sorted by category. Every sector gets the platform tailored to its specific workflow.
          </motion.p>
        </motion.div>

        {/* Category Jump Links */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-2 mb-20">
          {INDUSTRY_INDEX.map(g => (
            <button key={g.key}
              onClick={() => { const el = document.getElementById(`cat-${g.key}`); el?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md"
            >
              <g.catIcon className="w-3.5 h-3.5" />
              {g.category}
              <span className="ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-100">{g.items.length}</span>
            </button>
          ))}
        </motion.div>

        {/* Industries grouped by category */}
        <div className="space-y-24">
          {INDUSTRY_INDEX.map((category) => (
            <div key={category.key} id={`cat-${category.key}`} className="scroll-mt-28">
              {/* Category heading */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.bg} flex items-center justify-center shadow-lg`}
                  style={{ boxShadow: `0 10px 25px -5px ${category.accent}50` }}>
                  <category.catIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900">{category.category}</h3>
                  <p className="text-sm font-semibold text-gray-400 mt-0.5">{category.items.length} {category.items.length === 1 ? "industry" : "industries"}</p>
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.items.map((ind, i) => (
                  <motion.div key={ind.name}
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    <Link href={ind.href}>
                      <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                        {/* Image */}
                        <div className="w-full h-44 relative overflow-hidden bg-gray-100">
                          <img
                            src={ind.image}
                            alt={ind.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent" />
                          {/* Icon badge */}
                          <div className={`absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${category.bg} flex items-center justify-center shadow-md border border-white/20 group-hover:-translate-y-1 transition-transform duration-300`}>
                            <ind.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                          </div>
                        </div>
                        {/* Text */}
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="text-base font-bold text-gray-900 leading-snug mb-auto group-hover:text-indigo-600 transition-colors duration-200">
                            {ind.name}
                          </h4>
                          <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-gray-400 group-hover:text-indigo-500 transition-colors duration-200">
                            Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center text-sm text-gray-500 mt-20">
          Don&apos;t see your industry? <Link href="/contact" className="text-indigo-600 font-semibold hover:underline">Tell us about your team</Link> — we adapt to your workflow.
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FEATURED INDUSTRY DEEP-DIVES
══════════════════════════════════ */
function FeaturedIndustries() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-600 text-xs font-bold tracking-widest uppercase mb-5">
            <Star className="w-3.5 h-3.5" />
            Industry Deep-Dives
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            See How It Adapts
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"> to Your World</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Three industries with very different needs. One platform that handles all of them — without compromises.
          </p>
        </motion.div>

        <div className="space-y-20">
          {FEATURED.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Text side */}
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-5 shadow-md`}
                  style={{ boxShadow: `0 12px 40px ${f.accent}40` }}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-3">{f.title}</h3>
                <p className="text-lg font-bold text-gray-800 mb-3">{f.headline}</p>
                <p className="text-gray-500 leading-relaxed mb-6">{f.desc}</p>
                <div className="space-y-2.5 mb-6">
                  {f.bullets.map((b) => (
                    <div key={b.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${f.accent}15` }}>
                        <b.icon className="w-4 h-4" style={{ color: f.accent }} />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">{b.text}</p>
                    </div>
                  ))}
                </div>
                <Link href="https://app.staffschedule.io/register"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${f.grad} text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-md`}
                  style={{ boxShadow: `0 8px 24px ${f.accent}40` }}>
                  Try it free for {f.title.split(" ")[0]}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Visual side — animated mock card */}
              <SpotCard glow={`${f.accent}25`} className="rounded-3xl">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1830] via-[#1f1d36] to-[#13112a] border border-white/10 shadow-2xl shadow-indigo-900/40 p-5 sm:p-7">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center`}>
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-bold">{f.title.split(" &")[0]} Dashboard</p>
                      <p className="text-gray-500 text-[10px]">Live · Today</p>
                    </div>
                    <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>

                  {/* Stat tiles */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {["On Shift", "Pending", "Coverage"].map((l, k) => (
                      <motion.div key={k}
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.3 + k * 0.1 }}
                        className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider">{l}</p>
                        <p className="text-lg font-black text-white">{k === 0 ? "18" : k === 1 ? "2" : "100%"}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Shift rows */}
                  <div className="space-y-2 mb-5">
                    {f.bullets.slice(0, 3).map((b, k) => (
                      <motion.div key={k}
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.5 + k * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5 border border-white/5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${f.accent}25` }}>
                          <b.icon className="w-3.5 h-3.5" style={{ color: f.accent }} />
                        </div>
                        <p className="text-xs font-semibold text-white truncate flex-1">{b.text}</p>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Activity bar */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="flex items-end gap-1 h-12">
                      {[55, 75, 60, 90, 70, 85, 95, 78, 88, 65, 92, 80].map((h, k) => (
                        <motion.div key={k}
                          initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                          transition={{ delay: 0.8 + k * 0.03, duration: 0.5 }}
                          className="flex-1 rounded-t" style={{ background: `linear-gradient(to top, ${f.accent}, ${f.accent}80)` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </SpotCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   "ONE PLATFORM" SECTION
══════════════════════════════════ */
function OnePlatform() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-[#0c0a1a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-xs font-bold tracking-widest uppercase mb-6">
            <Workflow />
            One Platform · Every Sector
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Same Powerful Platform.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Perfect for Any Industry.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            Whether you run a 5-person cafe or a 500-person hospital, StaffSchedule.io's core features stay the same —
            but every workflow, terminology, and configuration adapts to how your industry actually works.
          </motion.p>

          <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Calendar, title: "Smart Scheduling", desc: "AI-built rotas with industry-specific role templates" },
              { icon: Clock, title: "GPS Time Clock", desc: "Geofenced clock-in tuned for your job sites and venues" },
              { icon: MessageSquare, title: "Team Messaging", desc: "Channel structures that match your team hierarchy" },
            ].map(item => (
              <motion.div key={item.title} variants={fadeUp}
                whileHover={{ y: -6, scale: 1.03 }} transition={spring}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-left">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* small inline icon since lucide's Workflow needs import */
function Workflow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" />
      <path d="M12 13v2" />
    </svg>
  );
}

/* ══════════════════════════════════
   TESTIMONIALS
══════════════════════════════════ */
function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-xs font-bold tracking-widest uppercase mb-5">
            <Star className="w-3.5 h-3.5 fill-current" />
            Trusted Across Every Sector
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Built for Real Operators.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Loved Across Every Industry.</span>
          </motion.h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }} transition={spring}
              className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <span className="absolute top-5 right-5 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                {t.industry}
              </span>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                  style={{ backgroundColor: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FAQ
══════════════════════════════════ */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="py-24 bg-[#faf9ff]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-12">
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">Industry Questions, Answered</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 text-lg">Everything you need to know about industry-specific workflows.</motion.p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150">
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                    <div className="px-6 pb-5 pt-3 text-gray-500 leading-relaxed text-sm border-t border-gray-50">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   FINAL CTA
══════════════════════════════════ */
function FinalCta() {
  return (
    <section className="py-24 bg-[#0c0a1a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.18, 0.38, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-900/50">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Your Industry.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Your Workflow. Your Platform.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Start your 14-day free trial and pick your industry preset on setup. Live in under an hour.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="https://app.staffschedule.io/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-indigo-900/50">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200">
              Talk to Our Team
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {["No credit card", "Industry presets", "Setup in under 1 hour", "Cancel anytime"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   PAGE
══════════════════════════════════ */
export default function IndustriesPage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <IndustryIndexSection />
      <FeaturedIndustries />
      <OnePlatform />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
