"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Store, 
  Utensils, 
  HeartPulse, 
  Truck, 
  HardHat, 
  Building2, 
  Briefcase, 
  Factory, 
  School,
  X,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Target,
  Zap,
  Layout,
  Headphones,
  Dumbbell,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Key,
  Plane,
  Inbox,
  Heart,
  Code2,
  Users2,
  Scissors,
  Wrench,
  ShoppingBag,
  Pill,
  Navigation,
  LucideIcon
} from "lucide-react";

// --- Types & Data ---

interface Industry {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  shortDesc: string;
  description: string;
  useCase: string;
  benefits: string[];
  uiPreview: string;
  color: string;
  accent: string;
}

const INDUSTRIES: Industry[] = [
  {
    id: "retail",
    name: "Retail & E-commerce",
    tagline: "Maximize sales by aligning staff with traffic surges.",
    icon: Store,
    shortDesc: "Retail labor management that syncs with sales.",
    description: "Align your labor costs with sales peaks. Our AI predicts traffic patterns to ensure you're never understaffed during heavy trading hours or holiday rushes.",
    useCase: "Retailers report a 15% reduction in labor cost and improved service consistency.",
    benefits: ["Demand-base scheduling", "Multi-store management", "Automated roster generation"],
    uiPreview: "Sales-Linked Scheduler",
    color: "from-blue-600 to-indigo-600",
    accent: "bg-blue-500"
  },
  {
    id: "hospitality",
    name: "Hospitality & Restaurants",
    tagline: "Handle last-minute call-outs without chaos.",
    icon: Utensils,
    shortDesc: "The operating system for restaurant scheduling.",
    description: "Manage high staff turnover and unpredictable shifts with ease. Instantly fill open shifts, communicate with prep and floor teams, and keep service running smoothly.",
    useCase: "Restaurants reduced no-shows by 25% and zero missed shifts.",
    benefits: ["Instant shift swaps", "Real-time kitchen availability", "Automated tip tracking", "Multi-location sync"],
    uiPreview: "Service Floor Manager",
    color: "from-orange-500 to-red-600",
    accent: "bg-orange-500"
  },
  {
    id: "healthcare",
    name: "Healthcare",
    tagline: "Ensure compliant and stress-free staff scheduling.",
    icon: HeartPulse,
    shortDesc: "Mission-critical scheduling for care teams.",
    description: "Schedule doctors and staff with compliance, certifications, and shift limits in mind. Automated ratio checks ensure patient care quality without burning out your team.",
    useCase: "Clinics improved staff coverage by 30% while maintaining strict safety ratios.",
    benefits: ["Certification tracking", "Compliance-based scheduling", "Shift rotation automation", "Emergency coverage"],
    uiPreview: "Care Ratio Compliance Monitor",
    color: "from-emerald-500 to-teal-700",
    accent: "bg-emerald-500"
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Reduce downtime with smarter workforce allocation.",
    icon: Factory,
    shortDesc: "High-precision scheduling for production floor.",
    description: "Ensure every machine station is staffed with the right skilled worker. Align shifts with production targets, reduce idle time, and improve efficiency across all lines.",
    useCase: "Manufacturers improved output by 15% with optimized shift planning.",
    benefits: ["Skill-based shift assignment", "Real-time attendance tracking", "Production-aligned scheduling", "Overtime optimization"],
    uiPreview: "Line Station Scheduler",
    color: "from-zinc-700 to-black",
    accent: "bg-zinc-700"
  },
  {
    id: "corporate",
    name: "Corporate Offices",
    tagline: "Sync hybrid teams and office desk rotations.",
    icon: Building2,
    shortDesc: "The modern interface for hybrid workspace staffing.",
    description: "Bridge the gap between remote and in-office teams. Manage desk booking, meeting space, and HQ staff rotations seamlessly to maximize collaboration days.",
    useCase: "HQ teams report 40% better desk utilization and improved team attendance sync.",
    benefits: ["Hybrid policy management", "Smart desk allocation", "Collaborative team sync", "Office entry verification"],
    uiPreview: "Hybrid Attendance Dashboard",
    color: "from-slate-600 to-slate-900",
    accent: "bg-slate-600"
  },
  {
    id: "logistics",
    name: "Logistics & Delivery",
    tagline: "Coordinate drivers and warehouse hubs across regions.",
    icon: Truck,
    shortDesc: "Centralized workforce management for fleet hubs.",
    description: "Manage complex fleet schedules and hub transitions with centralized time tracking. Ensure route-linked shifts are covered and hubs stay operational 24/7.",
    useCase: "Logistics firms save an average of 40 hours per month on payroll reconciliation.",
    benefits: ["Hub-to-hub clock-in tracking", "Route-integrated scheduling", "Overtime prevention tools", "Fleet availability sync"],
    uiPreview: "Fleet Hub Scheduler",
    color: "from-sky-500 to-blue-700",
    accent: "bg-sky-500"
  },
  {
    id: "construction",
    name: "Construction",
    tagline: "Track on-site labor with precision geofencing.",
    icon: HardHat,
    shortDesc: "Site-verified labor tracking for complex projects.",
    description: "Ensure teams are exactly where they need to be. Our geofenced clock-ins verify location before a shift can start, reducing site-to-site labor discrepancies.",
    useCase: "Construction projects reduce labor discrepancies by 22% with location-verified shifts.",
    benefits: ["Geofence verification", "Multi-site reporting", "Safety certification sync", "Subcontractor tracking"],
    uiPreview: "Site-Ready Dashboard",
    color: "from-amber-500 to-orange-700",
    accent: "bg-amber-500"
  },
  {
    id: "agencies",
    name: "Agencies & Creative",
    tagline: "Track billable time across diverse client projects.",
    icon: Briefcase,
    shortDesc: "Project-aware time management for client teams.",
    description: "Automate project-linked time tracking. Get real-time alerts on budget burn and generate professional billing reports in seconds for multiple clients.",
    useCase: "Agencies report a 10-day reduction in billing cycles with automated time-to-invoice sync.",
    benefits: ["Client project tagging", "Budget burn monitoring", "Real-time profitability", "Project-based rosters"],
    uiPreview: "Billable Hour Tracker",
    color: "from-indigo-600 to-violet-800",
    accent: "bg-indigo-600"
  },
  {
    id: "callcenters",
    name: "Call Centers",
    tagline: "Optimize agent coverage for fluctuating queue volumes.",
    icon: Headphones,
    shortDesc: "Dynamic staffing for high-volume support.",
    description: "Align agent shifts with historical call volume data. Reduce wait times and agent burnout by ensuring optimal coverage across all support channels.",
    useCase: "Support teams reduced average wait times by 18% through dynamic gap filling.",
    benefits: ["Volume-based rosters", "Real-time break management", "Remote agent verified clock-in", "Queue-ready alerts"],
    uiPreview: "Support Volume Monitor",
    color: "from-cyan-500 to-blue-600",
    accent: "bg-cyan-500"
  },
  {
    id: "education",
    name: "Education & Schools",
    tagline: "Match substitute teachers and faculty rotations.",
    icon: School,
    shortDesc: "Faculty management for modern schools.",
    description: "Automated substitute teacher matching based on subject expertise and availability. Simplify faculty leave management and ensure no classroom is left unattended.",
    useCase: "School districts fill sub gaps in under 15 minutes with automated broadcast alerts.",
    benefits: ["Subject-based matching", "Automated vacancy alerts", "Faculty certification sync", "Integrated leave management"],
    uiPreview: "Faculty Placement Portal",
    color: "from-purple-600 to-indigo-800",
    accent: "bg-purple-600"
  },
  {
    id: "fitness",
    name: "Fitness & Gyms",
    tagline: "Manage trainer schedules and group class rotations.",
    icon: Dumbbell,
    shortDesc: "The workout for your gym's operations.",
    description: "Coordinate personal trainers and group fitness instructors across multiple branches. Sync class schedules and ensure specialized trainers are available for high-demand slots.",
    useCase: "Fitness hubs report a 40% reduction in class cancellation due to scheduling errors.",
    benefits: ["Class-linked scheduling", "Specialist availability", "PT session tracking", "Multi-branch coordination"],
    uiPreview: "Trainer Roster View",
    color: "from-pink-600 to-rose-700",
    accent: "bg-pink-600"
  },
  {
    id: "events",
    name: "Event Management",
    tagline: "Coordinate vendors and field staff for large events.",
    icon: CalendarDays,
    shortDesc: "Scalable workforce for one-off wonders.",
    description: "Mass-onboard temporary event staff and vendors. Coordinate complex load-ins and set-up shifts with real-time field communication tools.",
    useCase: "Festivals reduced coordination overhead by 50% using bulk-shift broadcasts.",
    benefits: ["Bulk shift broadcast", "Field staff chat", "QR-based site registration", "Vendor portal access"],
    uiPreview: "Live Production Hub",
    color: "from-fuchsia-600 to-purple-800",
    accent: "bg-fuchsia-600"
  },
  {
    id: "security",
    name: "Security Services",
    tagline: "Deploy guards with real-time verification.",
    icon: ShieldCheck,
    shortDesc: "Mission-ready deployment for safety teams.",
    description: "Ensure multi-site coverage with location-verified shifts. Track guard patrols and incident responses with integrated reporting and real-time team alerts.",
    useCase: "Security firms maintain 100% attendance verification through geofenced clock-ins.",
    benefits: ["Patrol verification", "Multi-site guard monitoring", "Incident quick-reporting", "License validity alerts"],
    uiPreview: "Security Master Terminal",
    color: "from-slate-700 to-slate-900",
    accent: "bg-slate-800"
  },
  {
    id: "cleaning",
    name: "Cleaning Services",
    tagline: "Optimize route planning and service times.",
    icon: Sparkles,
    shortDesc: "Sparkling schedules for mobile teams.",
    description: "Dispatch cleaning teams based on proximity and booking duration. Track service quality and completion times across commercial and residential clients.",
    useCase: "Service teams increased daily output by 20% through optimized travel routing.",
    benefits: ["Mobile route optimization", "Task-based clock-out", "Equipment tracking", "Client service window sync"],
    uiPreview: "Field Dispatch Board",
    color: "from-teal-400 to-emerald-600",
    accent: "bg-teal-500"
  },
  {
    id: "realestate",
    name: "Real Estate",
    tagline: "Schedule viewings and agent floor duties.",
    icon: Key,
    shortDesc: "High-stakes scheduling for hot markets.",
    description: "Organize agent availability for property viewings and floor duty. Ensure top agents are present for high-value listings with integrated calendar sync.",
    useCase: "Agencies improved agent response times by 35% with mobile duty notifications.",
    benefits: ["Viewing calendar sync", "Floor duty rotation", "Agent availability tracker", "Lead response monitoring"],
    uiPreview: "Agent Duty Roster",
    color: "from-rose-500 to-orange-600",
    accent: "bg-rose-500"
  },
  {
    id: "tourism",
    name: "Travel & Tourism",
    tagline: "Manage seasonal guides and city personnel.",
    icon: Plane,
    shortDesc: "Global schedules for global experiences.",
    description: "Handle large tour guide teams across multi-city routes. Sync shift rotations with travel schedules and ensure language-specific guides are where they need to be.",
    useCase: "Tour operators reduced scheduling errors by 40% during peak holiday seasons.",
    benefits: ["Language-based matching", "Seasonal staff onboarding", "Tour start-point check-ins", "Cross-city staff tracking"],
    uiPreview: "Global Guide Scheduler",
    color: "from-sky-400 to-indigo-600",
    accent: "bg-sky-500"
  },
  {
    id: "warehousing",
    name: "Warehousing",
    tagline: "Balance inventory demand with floor staff.",
    icon: Inbox,
    shortDesc: "Streamlined logistics for the storage stage.",
    description: "Sync warehouse shifts with incoming shipment schedules. Ensure enough loaders and pickers are on site during intake windows and peak shipping periods.",
    useCase: "Warehouses improved package processing speed by 15% with volume-based staffing.",
    benefits: ["Inbound volume sync", "Picker/Loader rotations", "Warehouse floor zones", "Safety briefing tracking"],
    uiPreview: "Warehouse Ops Dashboard",
    color: "from-amber-600 to-yellow-700",
    accent: "bg-amber-600"
  },
  {
    id: "ngo",
    name: "NGOs & Non-profits",
    tagline: "Organize volunteer rotations and field outreach.",
    icon: Heart,
    shortDesc: "Passion-powered scheduling for good.",
    description: "Manage large, fluid volunteer networks across diverse community projects. Send bulk broadcasts to fill emergency outreach slots and track impact in real-time.",
    useCase: "Non-profits increased volunteer retention by 50% with easy-to-use self-scheduling.",
    benefits: ["Volunteer self-rostering", "Project impact tracking", "Field outreach sync", "Bulk donor event coordination"],
    uiPreview: "Volunteer Impact Hub",
    color: "from-red-500 to-pink-600",
    accent: "bg-red-500"
  },
  {
    id: "itteams",
    name: "IT & Tech Teams",
    tagline: "Manage on-call rotations and sprint time.",
    icon: Code2,
    shortDesc: "Developer-focused scheduling for reliability.",
    description: "Fairly distribute on-call and maintenance rotations across engineering teams. Track billable dev hours and sprint capacity without the administrative overhead.",
    useCase: "Tech teams reduced on-call handover friction by 60% using automated rotations.",
    benefits: ["On-call rotation manager", "Sprint capacity tracker", "Dev-availability sync", "Critical incident alerts"],
    uiPreview: "Engineering Roster Console",
    color: "from-blue-700 to-indigo-900",
    accent: "bg-blue-700"
  },
  {
    id: "freelance",
    name: "Freelance Teams",
    tagline: "Sync remote schedules for project milestones.",
    icon: Users2,
    shortDesc: "Distributed workforce management.",
    description: "Connect independent contractors and remote teams. Track hours against specific deliverables and ensure everyone is aligned for crucial project milestones.",
    useCase: "Project managers reduced milestone delays by 30% with multi-timezone sync.",
    benefits: ["Timezone-aware scheduling", "Project-linked billing", "Deliverable time-tracking", "Contractor portal access"],
    uiPreview: "Contractor Status Board",
    color: "from-violet-600 to-purple-800",
    accent: "bg-violet-600"
  },
  {
    id: "salons",
    name: "Salons & Beauty",
    tagline: "Optimize station utilization and specialist bookings.",
    icon: Scissors,
    shortDesc: "Stunning schedules for stylistic teams.",
    description: "Coordinate specialists across salon chairs and treatment rooms. Sync employee shifts with client appointment software to ensure 100% capacity during peak times.",
    useCase: "Salons improved daily chair revenue by 20% through smart station allocation.",
    benefits: ["Station/Chair management", "Specialist booking sync", "Automated commission tracking", "Inventory duty rosters"],
    uiPreview: "Artist Activity Board",
    color: "from-rose-400 to-pink-600",
    accent: "bg-rose-400"
  },
  {
    id: "auto",
    name: "Automotive Services",
    tagline: "Align technician shifts with service bay demand.",
    icon: Wrench,
    shortDesc: "High-performance rosters for high-octane shops.",
    description: "Manage mechanics and service advisors across multi-bay workshops. Ensure the right technicians are on site for specific vehicle service appointments and emergency repairs.",
    useCase: "Workshops reduced service lead times by 22% with technician task matching.",
    benefits: ["Service bay scheduling", "Technician skill matrix", "Emergency repair rosters", "Parts inventory shift tasks"],
    uiPreview: "Garage Workflow Sync",
    color: "from-orange-600 to-red-800",
    accent: "bg-orange-600"
  },
  {
    id: "supermarket",
    name: "Supermarkets",
    tagline: "Manage department staffing from produce to checkout.",
    icon: ShoppingBag,
    shortDesc: "Fresh schedules for high-volume grocery.",
    description: "Ensure floor coverage across produce, deli, and checkouts. Sync staffing levels with delivery schedules and peak shopping hours to maintain service excellence.",
    useCase: "Supermarkets reduced checkout wait times by 15% via volume-linked staffing.",
    benefits: ["Department zone rosters", "Delivery-sync staffing", "Checkout-ready alerts", "Night-fill team management"],
    uiPreview: "Store Coverage Radar",
    color: "from-green-600 to-emerald-800",
    accent: "bg-green-600"
  },
  {
    id: "pharmacy",
    name: "Pharmacies",
    tagline: "Maintain safe pharmacist-to-tech ratios.",
    icon: Pill,
    shortDesc: "Compounding schedules for safe service.",
    description: "Stay compliant with local health laws. Ensure a licensed pharmacist and the correct number of technicians are always on duty for safe patient medication dispensing.",
    useCase: "Pharmacies achieved 100% compliance record for legal staffing requirements.",
    benefits: ["Legal ratio monitoring", "License validity sync", "Prescription volume rosters", "Night-pharmacist rotations"],
    uiPreview: "Pharmacy Compliance Hub",
    color: "from-blue-400 to-cyan-600",
    accent: "bg-blue-400"
  },
  {
    id: "fieldservice",
    name: "Field Service Businesses",
    tagline: "Dispatch technicians based on location and skill.",
    icon: Navigation,
    shortDesc: "Precision routing for service specialists.",
    description: "Connect field teams with a central dispatch engine. Route technicians to client sites based on real-time traffic and specific job required skills like plumbing or HVAC.",
    useCase: "Field teams improved first-time fix rates by 30% with better technician matching.",
    benefits: ["Skill-based dispatch", "Real-time location sync", "On-site job tracking", "Automated route planning"],
    uiPreview: "Mobile Dispatch Command",
    color: "from-emerald-600 to-green-700",
    accent: "bg-emerald-600"
  }
];

// --- Marquee Components ---

function IndustryCard({ industry, onClick }: { industry: Industry; onClick: () => void }) {
  const Icon = industry.icon;
  return (
    <motion.button
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative w-[260px] h-[180px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[1.5rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col items-start text-left shrink-0"
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform relative`}>
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${industry.color} blur-md opacity-0 group-hover:opacity-40 transition-opacity`} />
        <Icon className="w-5 h-5 relative z-10" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tight italic mb-1 truncate w-full">
          {industry.name}
        </div>
        <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight italic line-clamp-2">
          {industry.shortDesc}
        </p>
      </div>

      {/* Hover CTA */}
      <div className="absolute bottom-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex items-center gap-1.5">
        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">View Details</span>
        <ArrowRight className="w-3 h-3 text-indigo-600" />
      </div>
    </motion.button>
  );
}

function MarqueeRow({ 
  items, 
  direction = "left", 
  onClick 
}: { 
  items: Industry[], 
  direction?: "left" | "right", 
  onClick: (id: string) => void 
}) {
  const duplicatedItems = [...items, ...items, ...items]; // Triple for safety

  return (
    <div className="flex overflow-hidden py-4 -mx-4 group">
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"]
        }}
        transition={{
          duration: direction === "left" ? 50 : 60, // Slower for readability with 25 items
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex gap-4 px-4"
      >
        {duplicatedItems.map((item, idx) => (
          <IndustryCard key={`${item.id}-${idx}`} industry={item} onClick={() => onClick(item.id)} />
        ))}
      </motion.div>
    </div>
  );
}

// --- Main Section ---

const UseCases = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedIndustry = INDUSTRIES.find(i => i.id === selectedId);

  // Split industries for two rows
  const row1 = INDUSTRIES.slice(0, 13);
  const row2 = INDUSTRIES.slice(13);

  return (
    <section className="py-24 lg:py-40 bg-white dark:bg-slate-950 relative overflow-hidden" id="industries">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
           <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 font-black text-[9px] uppercase tracking-[0.2em] mb-8"
           >
              <Target className="w-3.5 h-3.5 text-indigo-500" />
              Specialized Solutions
           </motion.div>
           
           <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter italic uppercase leading-[0.9]">
             Built for <span className="text-indigo-600 not-italic">Every Sector.</span>
           </h2>
           <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto italic">
            StaffSchedule.io supports 25+ workflows across leading worldwide industries.
           </p>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="relative space-y-2">
        <MarqueeRow items={row1} direction="left" onClick={setSelectedId} />
        <MarqueeRow items={row2} direction="right" onClick={setSelectedId} />
        
        {/* Row Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Detail Modal Stage */}
      <AnimatePresence>
        {selectedId && selectedIndustry && (
           <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 lg:p-12 overflow-hidden"
           >
              <motion.div
                 initial={{ opacity: 0, scale: 0.95, y: 30 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 30 }}
                 onClick={(e) => e.stopPropagation()}
                 className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col"
              >
                 {/* Header Bar */}
                 <div className="p-8 lg:p-10 border-b border-slate-50 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                       <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedIndustry.color} flex items-center justify-center text-white shadow-xl`}>
                          <selectedIndustry.icon className="w-7 h-7" />
                       </div>
                       <div>
                          <div className="text-xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">
                            {selectedIndustry.name}
                          </div>
                          <p className="text-xs lg:text-sm font-semibold text-slate-500 dark:text-slate-400 italic">
                             {selectedIndustry.tagline}
                          </p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                    >
                       <X className="w-5 h-5" />
                    </button>
                 </div>

                 {/* Body */}
                 <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Info */}
                    <div className="p-8 lg:p-12 space-y-8">
                       <div className="space-y-4">
                          <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Industry Snapshot</div>
                          <p className="text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic">
                             {selectedIndustry.description}
                          </p>
                       </div>

                       <div className="space-y-4">
                          <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Key Industry Benefits</div>
                          <div className="space-y-3">
                             {selectedIndustry.benefits.map((benefit, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: i * 0.1 }}
                                 className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-400"
                               >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  {benefit}
                               </motion.div>
                             ))}
                          </div>
                       </div>
                    </div>

                    {/* Right: UI Preview Placeholder */}
                    <div className="bg-slate-50 dark:bg-slate-950 p-8 lg:p-12 flex flex-col justify-center border-l border-slate-50 dark:border-white/5 relative overflow-hidden">
                       <div className="relative z-10 space-y-6">
                          <div className="aspect-video w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 flex items-center justify-center p-4">
                             <div className="text-center space-y-2">
                                <Layout className="w-8 h-8 text-indigo-500 mx-auto opacity-50" />
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{selectedIndustry.uiPreview}</div>
                             </div>
                          </div>
                          
                          <div className="p-4 bg-indigo-600/5 rounded-2xl border border-indigo-500/10">
                             <p className="text-xs font-medium text-slate-500 dark:text-indigo-400 leading-normal italic text-center">
                                {selectedIndustry.useCase}
                             </p>
                          </div>
                       </div>
                       
                       {/* Subtle Background Icon */}
                       <div className="absolute -bottom-10 -right-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                          <selectedIndustry.icon className="w-64 h-64" />
                       </div>
                    </div>
                 </div>

                 {/* Footer */}
                 <div className="p-8 border-t border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                       Start Free Trial
                    </button>
                    <button className="w-full sm:w-auto px-10 py-4 border-2 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-slate-100 dark:hover:bg-white/5">
                       View Full Demo
                    </button>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default UseCases;

