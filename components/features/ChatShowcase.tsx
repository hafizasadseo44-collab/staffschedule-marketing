"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Users, BellRing, HeartOff } from "lucide-react";

const steps = [
  {
    title: "Organize by Location",
    desc: "Got three different stores? Group your communication so the downtown location isn't bothered by messages meant for the uptown branch.",
    icon: <Users className="w-6 h-6 text-emerald-500" />
  },
  {
    title: "Instant Broadcasts",
    desc: "Need to announce a sudden policy change? Send a priority broadcast that pings every single employee simultaneously.",
    icon: <BellRing className="w-6 h-6 text-brand-primary" />
  },
  {
    title: "Right to Disconnect",
    desc: "Automatically suppress push notifications for employees who are currently off-shift, ensuring you comply with Right-to-Disconnect labor laws.",
    icon: <HeartOff className="w-6 h-6 text-indigo-500" />
  }
];

export default function ChatShowcase() {
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
    if (val < 0.5) return 0;
    return 1;
  });

  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    return activeIndex.onChange((v) => setCurrentStep(v));
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="py-24 lg:py-48 bg-white dark:bg-brand-dark relative hidden lg:block border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 gap-20">
          
          {/* Left: Scrolling Content */}
          <div className="py-20 flex flex-col gap-[50vh]">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                className="flex gap-8 items-start relative"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: currentStep >= (i === 2 ? 1 : i) ? 1 : 0.2 }}
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

          {/* Right: Sticky Images */}
          <div className="relative">
            <div className="sticky top-40">
               <div className="relative w-full aspect-[4/3] rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-border overflow-hidden bg-slate-100">
                  
                  {/* Step 0 Image */}
                  <motion.img 
                     src="/images/chat-manager-v1.jpg" 
                     alt="Manager Broadcasting" 
                     className="absolute inset-0 w-full h-full object-cover"
                     animate={{ opacity: currentStep === 0 ? 1 : 0, scale: currentStep === 0 ? 1.05 : 1 }}
                     transition={{ duration: 0.7 }}
                  />
                  {/* Step 1 Image */}
                  <motion.img 
                     src="/images/chat-staff-v1.jpg" 
                     alt="Staff receiving message" 
                     className="absolute inset-0 w-full h-full object-cover"
                     animate={{ opacity: currentStep === 1 ? 1 : 0, scale: currentStep === 1 ? 1.05 : 1 }}
                     transition={{ duration: 0.7 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                     <div className="bg-white/20 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold text-sm border border-white/20 flex items-center gap-2">
                        {currentStep === 0 && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary" /> Back Office Hub</span>}
                        {currentStep === 1 && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Frontline Staff</span>}
                     </div>
                  </div>

               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
