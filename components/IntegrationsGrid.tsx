"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layers,
  ArrowRight,
  Sparkles
} from "lucide-react";

// --- Types & Data ---

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  detail: string;
  color: string;
  icon: string; // Placeholder for logo text/icon
}

const INTEGRATIONS: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    description: "Sync labor costs with revenue for real-time P&L analysis.",
    detail: "StaffSchedule.io integrates directly with your Stripe account to pull real-time revenue data, allowing you to see exactly how your labor costs impact your bottom line every hour.",
    color: "from-blue-500 to-indigo-600",
    icon: "STRIPE"
  },
  {
    id: "gusto",
    name: "Gusto",
    category: "Payroll",
    description: "One-click export of approved timesheets to payroll.",
    detail: "Stop manually entering hours. Our Gusto integration syncs every approved shift directly into your payroll run, including overtime and holiday pay calculations.",
    color: "from-orange-500 to-red-600",
    icon: "GUSTO"
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    description: "Instant shift alerts and team announcements directly in Slack.",
    detail: "Keep your team updated where they already work. Send automated schedule publishes, swap requests, and check-in reminders to dedicated Slack channels.",
    color: "from-purple-500 to-pink-600",
    icon: "SLACK"
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    description: "Connect StaffSchedule to 5,000+ other apps seamlessly.",
    detail: "Trigger workflows in any of your favorite apps when a shift is created, a staff member clocks in, or a new location is added to your workspace.",
    color: "from-orange-600 to-amber-700",
    icon: "ZAPIER"
  },
  {
    id: "adp",
    name: "ADP",
    category: "Enterprise HR",
    description: "Enterprise-grade HR syncing for global workforces.",
    detail: "Designed for large-scale operations. Sync employee profiles, certifications, and payroll data securely between StaffSchedule and ADP Workforce Now.",
    color: "from-red-600 to-red-800",
    icon: "ADP"
  },
  {
    id: "xero",
    name: "Xero",
    category: "Accounting",
    description: "Real-time overhead tracking per location and project.",
    detail: "Automate your accounting entries. StaffSchedule sends labor cost breakdowns directly to Xero as bills or journal entries, segmented by location.",
    color: "from-sky-500 to-blue-600",
    icon: "XERO"
  },
  {
    id: "square",
    name: "Square",
    category: "Point of Sale",
    description: "Import sales data to predict staffing needs with AI.",
    detail: "Use your Square POS data to drive our predictive scheduling engine. Align your staff levels perfectly with your busiest periods across all locations.",
    color: "from-slate-700 to-slate-900",
    icon: "SQUARE"
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    category: "Finance",
    description: "Automated expense tracking and labor capital allocation.",
    detail: "Sync timesheet data as payroll expenses in QuickBooks Online. Keep your books balanced and your financial reporting accurate without the paperwork.",
    color: "from-green-600 to-emerald-700",
    icon: "QUICKBOOKS"
  },
  {
    id: "teams",
    name: "MS Teams",
    category: "Communication",
    description: "Sync schedules directly to your company calendar.",
    detail: "Bring your schedule into Microsoft 365. Staff can see their shifts directly in their Teams calendar and receive native notifications for updates.",
    color: "from-indigo-600 to-blue-700",
    icon: "TEAMS"
  },
  {
    id: "paypal",
    name: "PayPal",
    category: "Payments",
    description: "Quick payouts for temporary and gig staff.",
    detail: "Streamline payments for 1099 contractors and temporary staff. Send payouts directly from the StaffSchedule dashboard upon shift approval.",
    color: "from-blue-700 to-indigo-900",
    icon: "PAYPAL"
  }
];

// --- Sub-components ---

function IntegrationCard({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: Integration, 
  isActive: boolean, 
  onClick: () => void 
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative h-24 lg:h-32 px-8 lg:px-12 rounded-[2rem] border transition-all duration-500 flex items-center justify-center shrink-0 ${
        isActive 
          ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/20' 
          : 'bg-slate-50/50 dark:bg-white/5 border-slate-200 dark:border-white/5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:border-indigo-500/50'
      }`}
    >
      <span className={`text-xl lg:text-3xl font-black tracking-tighter ${
        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600'
      }`}>
        {item.icon}
      </span>
      
      {/* Active Glow */}
      {isActive && (
        <motion.div 
          layoutId="glow"
          className="absolute -inset-[2px] rounded-[2rem] border-2 border-indigo-500/50 blur-[4px] -z-10"
        />
      )}
    </motion.button>
  );
}

// --- Main Section ---

const IntegrationsGrid = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const selectedIntegration = INTEGRATIONS.find(i => i.id === selectedId);

  // Auto-highlight cycle
  useEffect(() => {
    if (selectedId || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % INTEGRATIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedId, isPaused]);

  return (
    <section className="py-24 lg:py-40 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5 overflow-hidden relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-8"
        >
           <Cpu className="w-3.5 h-3.5" />
           Ecosystem
        </motion.div>
        
        <h2 className="text-5xl lg:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter italic uppercase leading-[0.9]">
           Connects with your <br />
           <span className="text-indigo-600 not-italic">favorite tools.</span>
        </h2>
        <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto italic">
           "StaffSchedule.io lives everywhere your data does. Seamlessly sync labor, payroll, and performance across 500+ enterprise integrations."
        </p>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-6 lg:space-y-10 relative">
        
        {/* Row 1: Opposite scrolling */}
        <div 
          className="flex overflow-hidden mask-fade-row"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{ x: isPaused ? undefined : [0, -2000] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 lg:gap-10 py-4 min-w-max px-10"
          >
            {[...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS].map((item, i) => (
              <IntegrationCard 
                key={i} 
                item={item} 
                isActive={ACTIVE_ID_IN_ROW(i, activeIndex)} 
                onClick={() => setSelectedId(item.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Real identity sync */}
        <div 
          className="flex overflow-hidden mask-fade-row"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{ x: isPaused ? undefined : [-2000, 0] }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 lg:gap-10 py-4 min-w-max px-10"
          >
            {[...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS].reverse().map((item, i) => (
              <IntegrationCard 
                key={i} 
                item={item} 
                isActive={ACTIVE_ID_IN_ROW(i, activeIndex)}
                onClick={() => setSelectedId(item.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedId && selectedIntegration && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 lg:p-12"
            >
              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 relative"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left: Info */}
                  <div className="p-10 lg:p-16 space-y-8">
                     <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${selectedIntegration.color} flex items-center justify-center text-white text-2xl font-black shadow-xl`}>
                        {selectedIntegration.icon.charAt(0)}
                     </div>
                     
                     <div>
                        <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">{selectedIntegration.category}</div>
                        <h3 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter uppercase italic">{selectedIntegration.name}</h3>
                     </div>

                     <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                        "{selectedIntegration.detail}"
                     </p>

                     <div className="flex flex-col gap-3">
                        <button className="w-full px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black text-base shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group">
                           Connect to {selectedIntegration.name}
                           <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                        <button className="w-full px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 rounded-2xl font-black text-base hover:bg-slate-50 transition-colors">
                           View Documentation
                        </button>
                     </div>
                  </div>

                  {/* Right: Visual Preview */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden hidden lg:flex">
                     <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 flex items-center justify-center font-black italic text-brand-primary">SS</div>
                           <motion.div 
                              animate={{ x: [0, 10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-[2px] flex-1 bg-gradient-to-r from-brand-primary to-indigo-600 rounded-full" 
                           />
                           <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedIntegration.color} flex items-center justify-center text-white text-xs font-black`}>
                              {selectedIntegration.icon.substring(0,2)}
                           </div>
                        </div>

                        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl space-y-4">
                           <div className="flex items-center justify-between">
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WebHook Status</div>
                              <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black rounded-lg">ACTIVE</div>
                           </div>
                           <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: "85%" }}
                                className="h-full bg-indigo-600 rounded-full"
                              />
                           </div>
                           <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
                              <span>Identity Sync</span>
                              <span>Synced 2m ago</span>
                           </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest">
                           <Sparkles className="w-4 h-4" />
                           Optimized Connection
                        </div>
                     </div>

                     {/* Orbs */}
                     <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${selectedIntegration.color} opacity-10 blur-[80px] rounded-full -mr-32 -mt-32`} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

// --- Helpers ---

function ACTIVE_ID_IN_ROW(currentIdx: number, activeIdx: number) {
  return (currentIdx % INTEGRATIONS.length) === activeIdx;
}

export default IntegrationsGrid;

