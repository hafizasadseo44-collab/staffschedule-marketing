"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MapPin, TabletSmartphone, CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Draw your Geofences",
    desc: "Set virtual perimeters around your business locations. Staff can only clock in if their smartphone's GPS coordinates fall within the zones you've established.",
    icon: <MapPin className="w-6 h-6 text-emerald-500" />
  },
  {
    title: "Enable Kiosk Mode",
    desc: "Don't want staff using personal phones? No problem. Mount any iPad at your entrance. Staff punch in using unique PINs or secure photo-capture.",
    icon: <TabletSmartphone className="w-6 h-6 text-brand-primary" />
  },
  {
    title: "Verify & Export",
    desc: "Review daily attendance, flagged overtime, and exact punch-in times from your manager dashboard. Approve timesheets and export them to your payroll provider instantly.",
    icon: <CheckCircle2 className="w-6 h-6 text-indigo-500" />
  }
];

export default function GeofencingShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const activeIndex = useTransform(smoothProgress, (val) => {
    if (val < 0.33) return 0;
    if (val < 0.66) return 1;
    return 2;
  });

  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    return activeIndex.onChange((v) => setCurrentStep(v));
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="py-24 lg:py-48 bg-white dark:bg-brand-dark relative hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 gap-20">
          {/* Left: Sticky Images */}
          <div className="relative">
            <div className="sticky top-40">
               <div className="relative w-full aspect-[4/3] rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-border overflow-hidden">
                  
                  {/* Step 0 Image */}
                  <motion.img 
                     src="/images/attendance-geofence-v1.jpg" 
                     alt="GPS Geofencing" 
                     className="absolute inset-0 w-full h-full object-cover"
                     animate={{ opacity: currentStep === 0 ? 1 : 0, scale: currentStep === 0 ? 1.05 : 1 }}
                     transition={{ duration: 0.7 }}
                  />
                  {/* Step 1 Image */}
                  <motion.img 
                     src="/images/attendance-kiosk-v1.jpg" 
                     alt="Tablet Kiosk Mode" 
                     className="absolute inset-0 w-full h-full object-cover"
                     animate={{ opacity: currentStep === 1 ? 1 : 0, scale: currentStep === 1 ? 1.05 : 1 }}
                     transition={{ duration: 0.7 }}
                  />
                  {/* Step 2 Image */}
                  <motion.img 
                     src="/images/attendance-dashboard-v1.jpg" 
                     alt="Payroll Dashboard" 
                     className="absolute inset-0 w-full h-full object-cover"
                     animate={{ opacity: currentStep === 2 ? 1 : 0, scale: currentStep === 2 ? 1.05 : 1 }}
                     transition={{ duration: 0.7 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-6 left-6 bg-white/20 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold text-sm border border-white/20 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                     {currentStep === 0 && "GPS Tracking Active"}
                     {currentStep === 1 && "Secure PIN Entry"}
                     {currentStep === 2 && "Real-Time Dashboard"}
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Scrolling Content */}
          <div className="py-20 flex flex-col gap-[40vh]">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                className="flex gap-8 items-start relative"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: currentStep === i ? 1 : 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative z-10 shrink-0 w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-border shadow-lg flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-brand-dark dark:text-white mb-4 leading-tight">{step.title}</h3>
                  <p className="text-xl text-brand-slate dark:text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
