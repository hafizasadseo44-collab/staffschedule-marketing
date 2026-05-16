"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Utensils,
  ShoppingBag,
  Truck,
  HeartPulse,
  MessageSquare,
  ShieldCheck
} from "lucide-react";

// --- Types ---
interface BaseWidget {
  type: string;
  label: string;
}

interface ScheduleWidget extends BaseWidget {
  type: "schedule";
  time: string;
  staff: number;
}

interface NotificationWidget extends BaseWidget {
  type: "notification";
  user: string;
  action: string;
  time: string;
}

interface AttendanceWidget extends BaseWidget {
  type: "attendance";
  present: number;
  late: number;
}

interface HealthcareWidget extends BaseWidget {
  type: "healthcare";
  active: number;
  required: number;
}

interface GenericWidget extends BaseWidget {
  type: "alert" | "chart" | "badge";
  info?: string;
  value?: string;
  icon?: any;
}

type StoryWidget = ScheduleWidget | NotificationWidget | AttendanceWidget | HealthcareWidget | GenericWidget;

interface StorySet {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  images: string[];
  metric: string;
  metricLabel: string;
  accentColor: string;
  glowColor: string;
  widgets: StoryWidget[];
}

// --- Story Data ---
const STORY_SETS: StorySet[] = [
  {
    id: "restaurant",
    category: "Hospitality",
    title: "The Rush is Under Control.",
    subtitle: "Ditch the whiteboard. Manage your kitchen crew with a digital brain.",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop"
    ],
    metric: "20hrs",
    metricLabel: "Saved per week",
    accentColor: "from-orange-500 to-rose-500",
    glowColor: "rgba(244, 63, 94, 0.2)",
    widgets: [
      { type: "schedule", label: "Dinner Shift", time: "5 PM - 11 PM", staff: 8 },
      { type: "notification", label: "System", user: "Marco", action: "Shift swap request accepted", time: "2m ago" }
    ]
  },
  {
    id: "retail",
    category: "Retail",
    title: "Always Full Coverage.",
    subtitle: "Never leave your floor empty. Predict traffic and staff accordingly.",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop"
    ],
    metric: "15%",
    metricLabel: "Lower labor costs",
    accentColor: "from-blue-500 to-indigo-600",
    glowColor: "rgba(79, 70, 229, 0.2)",
    widgets: [
      { type: "attendance", label: "Store Floor", present: 12, late: 0 },
      { type: "alert", label: "Peak Hours Detected", info: "1 PM - 4 PM" }
    ]
  },
  {
    id: "logistics",
    category: "Logistics",
    title: "Efficiency in Motion.",
    subtitle: "Scale your warehouse team without the scheduling headache.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop"
    ],
    metric: "99.9%",
    metricLabel: "Shift coverage",
    accentColor: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.2)",
    widgets: [
      { type: "chart", label: "Throughput", value: "+24%" },
      { type: "badge", label: "Verified Safety Protocol", icon: ShieldCheck }
    ]
  },
  {
    id: "healthcare",
    category: "Healthcare",
    title: "Patient-First Focus.",
    subtitle: "Ensure your clinic is always staffed with the right specialists.",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop"
    ],
    metric: "100%",
    metricLabel: "Compliance",
    accentColor: "from-purple-500 to-fuchsia-600",
    glowColor: "rgba(168, 85, 247, 0.2)",
    widgets: [
      { type: "healthcare", label: "ER Nursing", active: 14, required: 14 },
      { type: "notification", label: "System", user: "Dr. Smith", action: "Schedule approved", time: "Just now" }
    ]
  }
];

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[1000vh] bg-[#FAF9FF] overflow-clip">
      {/* --- Background Design System --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-200/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 100, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-200/20 blur-[120px] rounded-full" 
        />
      </div>

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pt-24 pb-12 relative overflow-hidden">
        {STORY_SETS.map((set, index) => (
          <StorySlide 
            key={set.id} 
            set={set} 
            index={index} 
            total={STORY_SETS.length}
            scrollYProgress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
}

function StorySlide({ set, index, total, scrollYProgress }: { 
  set: StorySet, 
  index: number, 
  total: number,
  scrollYProgress: any 
}) {
  // --- New Global Timing Strategy ---
  // 0.0 - 0.2: Entry Buffer (Slide 1 visible, closed, sharp)
  // 0.2 - 0.4: Slide 1 Story Arc
  // 0.4 - 0.6: Slide 2 Story Arc
  // 0.6 - 0.8: Slide 3 Story Arc
  // 0.8 - 1.0: Slide 4 Story Arc
  
  const entryBuffer = 0.2;
  const slideSpace = (1 - entryBuffer) / total;
  
  const start = entryBuffer + (index * slideSpace);
  const end = entryBuffer + ((index + 1) * slideSpace);

  // Sub-phases (Percentage of slideSpace)
  // 0% - 30%: HOLD phase (Static view)
  // 30% - 70%: EXPAND phase
  // 50% - 85%: REVEAL phase
  // 85% - 100%: EXIT phase
  
  const holdEnd = start + (slideSpace * 0.3);
  const expandStart = start + (slideSpace * 0.3);
  const expandEnd = start + (slideSpace * 0.7);
  const revealStart = start + (slideSpace * 0.45);
  const revealEnd = start + (slideSpace * 0.85);
  const exitStart = end - (slideSpace * 0.15);
  const exitEnd = end;

  // --- Animations ---
  // Opacity: Special handling for Slide 1 (visible from scroll 0)
  const opacityInput = index === 0 
    ? [0, 0.01, exitStart, exitEnd] 
    : [start - 0.05, start, exitStart, exitEnd];
  const opacityOutput = [index === 0 ? 1 : 0, 1, 1, 0];
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  
  // Scale & Blur: Only for non-initial slides to ensure Slide 1 is sharp at start
  const scale = useTransform(
    scrollYProgress, 
    [index === 0 ? 0 : start, index === 0 ? 0.01 : holdEnd], 
    [index === 0 ? 1 : 0.85, 1]
  );
  
  const blurValue = useTransform(
    scrollYProgress, 
    [index === 0 ? 0 : start, index === 0 ? 0.01 : holdEnd], 
    [index === 0 ? 0 : 15, 0]
  );
  const blur = useTransform(blurValue, (v) => `blur(${v}px)`);

  // --- Cinematic Transformation Logic ---
  const expandRange = [expandStart, expandEnd];
  
  // Card 1: Main Focus
  const card1X = useTransform(scrollYProgress, expandRange, [0, -340]);
  const card1Y = useTransform(scrollYProgress, expandRange, [0, -180]);
  const card1Width = useTransform(scrollYProgress, expandRange, ["320px", "740px"]);
  const card1Height = useTransform(scrollYProgress, expandRange, ["480px", "800px"]);
  const card1Rotate = useTransform(scrollYProgress, expandRange, [0, -3]);
  
  // Card 2: Supporting
  const card2X = useTransform(scrollYProgress, expandRange, [0, 340]);
  const card2Y = useTransform(scrollYProgress, expandRange, [0, -260]);
  const card2Width = useTransform(scrollYProgress, expandRange, ["320px", "640px"]);
  const card2Rotate = useTransform(scrollYProgress, expandRange, [0, 4]);
  
  // Card 3: Supporting
  const card3X = useTransform(scrollYProgress, expandRange, [0, 300]);
  const card3Y = useTransform(scrollYProgress, expandRange, [0, 320]);
  const card3Width = useTransform(scrollYProgress, expandRange, ["320px", "680px"]);
  const card3Rotate = useTransform(scrollYProgress, expandRange, [0, -2]);

  // --- Content Revelation ---
  const revealRange = [revealStart, revealEnd];
  const contentOpacity = useTransform(scrollYProgress, revealRange, [0, 1]);
  const contentY = useTransform(scrollYProgress, revealRange, [140, 0]);
  
  const widget1X = useTransform(scrollYProgress, revealRange, [-140, 0]);
  const widget2X = useTransform(scrollYProgress, revealRange, [140, 0]);

  return (
    <motion.div 
      style={{ opacity, scale, filter: blur }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center">
        
        {/* Dynamic Background Glow */}
        <div 
          className="absolute inset-0 opacity-30 blur-[200px] transition-colors duration-1000"
          style={{ backgroundColor: set.glowColor }}
        />

        {/* --- Card 1 (Main Story) --- */}
        <motion.div 
          style={{ x: card1X, y: card1Y, width: card1Width, height: card1Height, rotateZ: card1Rotate }}
          className="absolute z-20 rounded-[3.5rem] overflow-hidden shadow-[0_60px_150px_-30px_rgba(0,0,0,0.3)] bg-white pointer-events-auto border border-white/20 ring-1 ring-black/5"
        >
          <Image src={set.images[0]} alt="" fill className="object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          
          {/* Inner Content Reveal */}
          <motion.div 
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute inset-0 p-14 flex flex-col justify-end text-white"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className={`px-5 py-2 rounded-2xl bg-gradient-to-br ${set.accentColor} text-[12px] font-black uppercase tracking-[0.25em] shadow-lg`}>
                {set.category}
              </span>
              <div className="h-1 w-8 bg-white/20 rounded-full" />
            </div>
            <h3 className="text-6xl lg:text-7xl font-black mb-8 leading-[0.95] tracking-tightest">
              {set.title}
            </h3>
            <p className="text-2xl text-white/80 max-w-xl font-medium leading-relaxed mb-10">
              {set.subtitle}
            </p>

            {/* KPI Section */}
            <div className="flex items-center gap-12">
              <div className="flex flex-col">
                <span className="text-5xl font-black tabular-nums">{set.metric}</span>
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em] mt-1">{set.metricLabel}</span>
              </div>
              <div className="h-16 w-px bg-white/10" />
              <button className="flex items-center gap-4 group px-8 py-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                Explore Solutions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* --- Card 2 --- */}
        <motion.div 
          style={{ x: card2X, y: card2Y, width: card2Width, rotateZ: card2Rotate }}
          className="absolute z-10 aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl bg-white border-[8px] border-white pointer-events-auto"
        >
          <Image src={set.images[1]} alt="" fill className="object-cover" />
          
          <motion.div 
            style={{ opacity: contentOpacity, x: widget2X }}
            className="absolute top-10 right-10 w-72 p-6 bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white/50"
          >
            {set.widgets[0].type === "schedule" ? (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Utensils size={24} />
                  </div>
                  <span className="text-base font-black text-slate-900">{(set.widgets[0] as ScheduleWidget).label}</span>
                </div>
                <div className="space-y-3">
                   <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{(set.widgets[0] as ScheduleWidget).time}</p>
                   <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        className="h-full bg-indigo-500" 
                      />
                   </div>
                   <p className="text-sm font-black text-indigo-600">{(set.widgets[0] as ScheduleWidget).staff} Staff Assigned</p>
                </div>
              </>
            ) : set.widgets[0].type === "healthcare" ? (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                    <HeartPulse size={24} />
                  </div>
                  <span className="text-base font-black text-slate-900">{set.widgets[0].label}</span>
                </div>
                <div className="flex items-center justify-between px-2">
                   <div className="flex flex-col text-center">
                      <span className="text-3xl font-black text-slate-900">{(set.widgets[0] as HealthcareWidget).active}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Active</span>
                   </div>
                   <div className="w-px h-10 bg-slate-100" />
                   <div className="flex flex-col text-center">
                      <span className="text-3xl font-black text-slate-900">{(set.widgets[0] as HealthcareWidget).required}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Goal</span>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 size={24} />
                   </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <ShoppingBag size={24} />
                  </div>
                  <span className="text-base font-black text-slate-900">{set.widgets[0].label}</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-3xl font-black text-slate-900">
                        {(set.widgets[0] as AttendanceWidget).present || (set.widgets[0] as GenericWidget).value}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {(set.widgets[0] as AttendanceWidget).present ? "Present" : "Efficiency"}
                      </span>
                   </div>
                   <div className="flex gap-1.5 items-end h-10">
                      {[1, 2, 3, 4, 5].map(b => (
                        <div key={b} className={`w-2.5 rounded-sm ${b <= 4 ? 'bg-blue-500' : 'bg-slate-100'}`} style={{ height: `${b * 20}%` }} />
                      ))}
                   </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* --- Card 3 --- */}
        <motion.div 
          style={{ x: card3X, y: card3Y, width: card3Width, rotateZ: card3Rotate }}
          className="absolute z-10 aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-white border-[8px] border-white pointer-events-auto"
        >
          <Image src={set.images[2]} alt="" fill className="object-cover" />

          <motion.div 
            style={{ opacity: contentOpacity, x: widget1X }}
            className="absolute bottom-10 left-10 right-10 p-6 bg-slate-900/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/10 flex items-center gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shadow-inner">
              <MessageSquare size={28} />
            </div>
            <div className="flex flex-col">
              <p className="text-[12px] font-black text-white/40 uppercase tracking-[0.3em]">Live Update</p>
              <p className="text-base font-bold text-white leading-tight">
                <span className="text-indigo-400">{(set.widgets[1] as NotificationWidget).user || "System"}:</span> {(set.widgets[1] as NotificationWidget).action || set.widgets[1].label}
              </p>
            </div>
            <div className="ml-auto text-[11px] font-black text-white/30 tracking-widest uppercase">{(set.widgets[1] as NotificationWidget).time || "Just now"}</div>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}

const ArrowRight = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="4" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);


