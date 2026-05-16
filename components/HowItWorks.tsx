"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, CalendarCheck2, LayoutDashboard, MessageSquare, MapPin, BarChart3 } from "lucide-react";
import InteractiveAppViewer from "./simulation/InteractiveAppViewer";
import ScaleWrapper from "./simulation/ScaleWrapper";

const STEPS = [
  {
    id: "team",
    title: "Onboard Your Staff",
    desc: "Import your roster or use magic links to invite your team. Set up roles, wages, and store locations in seconds so everyone has exact access.",
    icon: <UserPlus className="w-5 h-5" />,
    color: "bg-blue-600",
    border: "border-blue-500",
    shadow: "shadow-blue-500/10"
  },
  {
    id: "schedule",
    title: "Build Perfect Shifts",
    desc: "Drag-and-drop or auto-fill your week. We automatically flag overtime, time-off requests, and availability conflicts before you publish.",
    icon: <CalendarCheck2 className="w-5 h-5" />,
    color: "bg-indigo-600",
    border: "border-indigo-500",
    shadow: "shadow-indigo-500/10"
  },
  {
    id: "dashboard",
    title: "Monitor Operations",
    desc: "Your master dashboard goes beyond schedules. Get an immediate bird's-eye view of who's working, who's late, and daily labor spend.",
    icon: <LayoutDashboard className="w-5 h-5" />,
    color: "bg-emerald-600",
    border: "border-emerald-500",
    shadow: "shadow-emerald-500/10"
  },
  {
    id: "chat",
    title: "Communicate Instantly",
    desc: "Ditch confusing group texts. Use built-in team chat to broadcast announcements or let staff intuitively coordinate shift covers.",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "bg-purple-600",
    border: "border-purple-500",
    shadow: "shadow-purple-500/10"
  },
  {
    id: "locations",
    title: "Scale Multi-Location",
    desc: "Got 5 stores or 500? Switch between branch schedules instantly. Share staff across locations without creating payroll nightmares.",
    icon: <MapPin className="w-5 h-5" />,
    color: "bg-rose-600",
    border: "border-rose-500",
    shadow: "shadow-rose-500/10"
  },
  {
    id: "analytics",
    title: "Analyze & Optimize",
    desc: "Generate automated reports. Spot labor inefficiencies and optimize your future scheduling strategies for maximum profitability.",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "bg-sky-600",
    border: "border-sky-500",
    shadow: "shadow-sky-500/10"
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(STEPS[0].id);

  return (
    <section className="py-24 bg-[#FCFBFF] relative overflow-hidden" id="how-it-works">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight px-4">
             How <span className="text-brand-primary">StaffSchedule.io</span> Works
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-500 font-medium max-w-2xl mx-auto px-4">
             Centralize your workforce, eliminate scheduling chaos, and scale operations seamlessly in 6 simple steps.
          </p>
        </div>


        {/* Tabbed Interactive Layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Tabs */}
          <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col gap-3">
             {STEPS.map((step) => {
               const isActive = activeStep === step.id;
               
               return (
                 <button
                   key={step.id}
                   onClick={() => setActiveStep(step.id)}
                   className={`text-left p-5 lg:p-6 rounded-2xl transition-all duration-300 border-2 outline-none ${
                     isActive 
                       ? `bg-white ${step.border} shadow-xl ${step.shadow} lg:translate-x-2` 
                       : "bg-transparent border-transparent hover:bg-slate-100 hover:border-slate-200"
                   }`}
                 >
                   <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                       isActive ? step.color + " text-white shadow-md shadow-black/10" : "bg-slate-200 text-slate-500"
                     }`}>
                       {step.icon}
                     </div>
                     <h3 className={`font-black text-xl tracking-tight transition-colors duration-300 ${
                       isActive ? "text-slate-900" : "text-slate-500"
                     }`}>
                       {step.title}
                     </h3>
                   </div>
                   
                   {/* Expanding Description */}
                   <AnimatePresence>
                     {isActive && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3, ease: "easeInOut" }}
                         className="overflow-hidden"
                       >
                         <p className="text-slate-500 font-medium text-base leading-relaxed mt-4 ml-[4rem]">
                           {step.desc}
                         </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </button>
               );
             })}
          </div>

          {/* Right Column: High-Fidelity Simulator */}
          <div className="w-full flex-1 lg:sticky lg:top-32 relative">
             <motion.div 
               key="app-viewer"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-900/5 overflow-hidden"
             >
                <ScaleWrapper targetWidth={1100} targetHeight={700}>
                  {/* The Viewer renders based on the activeTab context internally */}
                  <InteractiveAppViewer activeTab={activeStep} isActive={true} />
                </ScaleWrapper>
             </motion.div>
             {/* Decorative under-glow matching the active step */}
             <div className="absolute inset-0 bg-brand-primary/10 rounded-[3rem] blur-3xl -z-10 transition-colors duration-500" />
          </div>

        </div>

      </div>
    </section>
  );
}
