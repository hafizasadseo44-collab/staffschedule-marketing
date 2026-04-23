"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ArrowUpRight,
  Clock,
  ChevronRight,
  Zap,
  Activity,
  Calendar
} from "lucide-react";

// --- Types & Data ---

type TimeRange = "Day" | "Week" | "Month";

interface DataPoint {
  x: number;
  y: number;
}

const DATA_SETS: Record<TimeRange, DataPoint[]> = {
  Day: [
    { x: 0, y: 80 }, { x: 50, y: 60 }, { x: 100, y: 75 }, 
    { x: 150, y: 40 }, { x: 200, y: 55 }, { x: 250, y: 30 }, 
    { x: 300, y: 45 }, { x: 350, y: 20 }, { x: 400, y: 35 }
  ],
  Week: [
    { x: 0, y: 70 }, { x: 50, y: 75 }, { x: 100, y: 50 }, 
    { x: 150, y: 65 }, { x: 200, y: 40 }, { x: 250, y: 55 }, 
    { x: 300, y: 30 }, { x: 350, y: 45 }, { x: 400, y: 25 }
  ],
  Month: [
    { x: 0, y: 90 }, { x: 50, y: 80 }, { x: 100, y: 85 }, 
    { x: 150, y: 70 }, { x: 200, y: 75 }, { x: 250, y: 60 }, 
    { x: 300, y: 65 }, { x: 350, y: 50 }, { x: 400, y: 55 }
  ]
};

// --- Helper Components ---

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * ease;
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{prefix}{displayValue.toLocaleString(undefined, { maximumFractionDigits: 1 })}{suffix}</span>;
}

function Sparkline({ data, color }: { data: DataPoint[], color: string }) {
  const path = useMemo(() => {
    return `M ${data.map(p => `${p.x / 4},${p.y / 2}`).join(" L ")}`;
  }, [data]);

  return (
    <svg viewBox="0 0 100 50" className="w-16 h-8 opacity-40">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KPICard({ label, value, trend, icon, color, data, suffix = "" }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-slate-50 dark:to-white/5 -mr-8 -mt-8 rounded-full transition-transform group-hover:scale-125" />
      
      <div className="flex justify-between items-start mb-4 relative">
        <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        <Sparkline data={data} color={color.includes("indigo") ? "#6366f1" : color.includes("emerald") ? "#10b981" : "#f59e0b"} />
      </div>

      <div className="relative">
        <div className="flex items-baseline gap-2 mb-1">
          <h4 className="text-3xl font-black text-slate-900 dark:text-white">
            <AnimatedCounter value={value} suffix={suffix} />
          </h4>
          <span className={`text-xs font-black flex items-center ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
    </motion.div>
  );
}

// --- Main Component ---

const AnalyticsSection = () => {
  const [range, setRange] = useState<TimeRange>("Week");
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [jitter, setJitter] = useState(0);

  // Simulated live jitter for "real-time" feel
  useEffect(() => {
    const interval = setInterval(() => {
      setJitter(Math.random() * 4 - 2); // +/- 2px jitter
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    const baseData = DATA_SETS[range];
    // Apply jitter to the last point to make it feel "live"
    return baseData.map((p, i) => 
      i === baseData.length - 1 ? { ...p, y: p.y + jitter } : p
    );
  }, [range, jitter]);

  const pathD = useMemo(() => {
    return `M ${chartData.map(p => `${p.x},${p.y}`).join(" L ")}`;
  }, [chartData]);

  const axisLabels = useMemo(() => {
    if (range === "Day") return ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
    if (range === "Week") return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return ["Week 1", "Week 2", "Week 3", "Week 4"];
  }, [range]);

  return (
    <section className="py-24 lg:py-40 bg-[#F8FAFC] dark:bg-slate-950 overflow-hidden relative" id="analytics">
      {/* Dynamic Animated Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -mr-64 -mt-64" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[100px] -ml-32 -mb-32" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Dashboard Visual Area (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] p-4 sm:p-8 border border-white/50 dark:border-white/5 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden"
            >
              {/* Glass Glare */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ rotate: 15 }}
                    className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30"
                  >
                    <Activity className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Live Operations</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Real-time Data</span>
                    </div>
                  </div>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                  {["Day", "Week", "Month"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setRange(t as TimeRange)}
                      className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${range === t ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Stage */}
              <div className="relative h-64 sm:h-80 w-full mb-10 group/chart pl-8 pb-8 pt-4">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-4 bottom-8 flex flex-col justify-between text-[10px] font-black text-slate-300 dark:text-slate-600 pointer-events-none uppercase">
                   <span>100%</span>
                   <span>50%</span>
                   <span>0%</span>
                </div>

                <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d overflow-visible">
                  {/* Grid Lines */}
                  {[0, 25, 50, 75, 100].map(y => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" className="text-slate-100 dark:text-white/5" strokeWidth="1" />
                  ))}

                  {/* Gradient Fill */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ d: pathD, pathLength: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Interaction Layer */}
                  {chartData.map((p, i) => (
                    <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(p)} onMouseLeave={() => setHoveredPoint(null)}>
                      <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
                      <motion.circle
                        initial={{ r: 4 }}
                        animate={{ r: hoveredPoint === p ? 8 : 4 }}
                        cx={p.x}
                        cy={p.y}
                        fill="#4F46E5"
                        stroke="#FFF"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>

                {/* X-Axis Labels */}
                <div className="absolute left-8 bottom-0 right-0 flex justify-between text-[9px] font-bold text-slate-400 dark:text-slate-500 pointer-events-none uppercase tracking-tight">
                   {axisLabels.map((lbl, i) => <span key={i}>{lbl}</span>)}
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredPoint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-2xl pointer-events-none z-50 whitespace-nowrap border border-white/10 dark:border-slate-200"
                      style={{ 
                        left: `${(hoveredPoint.x / 400) * 100}%`, 
                        top: `${(hoveredPoint.y / 100) * 100}%`,
                        transform: 'translate(-30%, -130%)'
                      }}
                    >
                      Efficiency: {Math.round(100 - hoveredPoint.y)}%
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 relative z-10">
                 <KPICard 
                    label="Labor Cost Efficiency" 
                    value={range === "Month" ? 94.2 : range === "Week" ? 88.5 : 91.8} 
                    trend={12.4} 
                    suffix="%"
                    icon={<DollarSign className="w-6 h-6" />} 
                    color="bg-indigo-600 shadow-indigo-600/20"
                    data={DATA_SETS.Week}
                 />
                 <KPICard 
                    label="Shift Attendance" 
                    value={99.4} 
                    trend={2.1} 
                    suffix="%"
                    icon={<Users className="w-6 h-6" />} 
                    color="bg-emerald-500 shadow-emerald-500/20"
                    data={DATA_SETS.Month}
                 />
              </div>
            </motion.div>
          </div>

          {/* Copy Area (5 cols) */}
          <div className="lg:col-span-5 px-4 lg:px-0 relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-8 cursor-default"
              >
                 <Zap className="w-3.5 h-3.5 fill-indigo-600 animate-pulse" />
                 Intelligence Layer
              </motion.div>

              <h2 className="text-4xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter mb-8 uppercase italic">
                Predictive <br />
                <span className="text-indigo-600 not-italic">Reporting.</span>
              </h2>

              <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium mb-12 leading-relaxed max-w-xl italic">
                 "Stop guessing your labor costs. StaffSchedule.io analyzes millions of data points to predict staffing needs before they become budget leaks."
              </p>

              <div className="space-y-4 mb-12">
                 {[
                   { t: "Automated Weekly P&L", d: "Real-time Profit and Loss analysis per location.", icon: <DollarSign /> },
                   { t: "Conflict Detection", d: "AI automatically spots time-off and OT overlaps.", icon: <Calendar /> },
                   { t: "Smart Forecasts", d: "Predict next week's needs based on historical traffic.", icon: <Clock /> }
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     whileHover={{ x: 10 }}
                     className="flex items-start gap-5 group cursor-pointer"
                   >
                     <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-indigo-500/20">
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                          {React.cloneElement(item.icon as any, { className: "w-5 h-5" })}
                        </motion.div>
                     </div>
                     <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-base mb-0.5 group-hover:text-indigo-600 transition-colors">{item.t}</h4>
                        <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                     </div>
                   </motion.div>
                 ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-lg shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
                <span className="relative z-10 flex items-center gap-3">
                  Explore Enterprise Analytics
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
