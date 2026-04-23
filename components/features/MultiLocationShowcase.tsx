"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Globe, ShieldCheck, BarChart3, Users2 } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    title: "Global Operations View",
    desc: "Get an instant birds-eye view of your entire organization. Track labor percentages across every location in real-time and identify branches that need your attention.",
    icon: <Globe className="w-6 h-6 text-brand-primary" />,
    image: "/images/multi-location-global-v1.jpg"
  },
  {
    title: "Enforce Standard Policies",
    desc: "Update labor rules, break policies, and tax settings globally or by region. Ensure every site stays compliant with local labor laws without manual intervention.",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    image: "/images/multi-location-manager-v1.jpg"
  },
  {
    title: "Enterprise Auditing",
    desc: "Deep-dive into audit logs to see exactly who made changes to which schedule and when. Maintain total accountability across your entire management hierarchy.",
    icon: <BarChart3 className="w-6 h-6 text-indigo-500" />,
    image: "/images/multi-location-global-v1.jpg" // Re-using for visual consistency
  }
];

export default function MultiLocationShowcase() {
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
    if (val < 0.4) return 0;
    if (val < 0.7) return 1;
    return 2;
  });

  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    return activeIndex.onChange((v) => setCurrentStep(Math.round(v)));
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="py-24 lg:py-48 bg-white dark:bg-brand-dark relative border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile View: Vertical Stack */}
        <div className="lg:hidden space-y-16">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-brand-dark dark:text-white mb-4">Command your empire.</h2>
              <p className="text-slate-500 font-medium">Professional tools for professional operators.</p>
           </div>
           {steps.map((step, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex flex-col gap-6"
             >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-border shadow-md flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-2">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">{step.desc}</p>
                </div>
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-xl">
                   <Image 
                      src={step.image} 
                      alt={step.title}
                      fill
                      className="object-cover"
                   />
                </div>
             </motion.div>
           ))}
        </div>

        {/* Desktop View: Sticky Scroll */}
        <div className="hidden lg:grid grid-cols-2 gap-20">
          
          {/* Left: Scrolling Content */}
          <div className="py-20 flex flex-col gap-[50vh]">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                className="flex gap-8 items-start relative"
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-200px" }}
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
                  <motion.div 
                     className="absolute inset-0"
                     animate={{ opacity: currentStep === 0 ? 1 : 0, scale: currentStep === 0 ? 1.05 : 1 }}
                     transition={{ duration: 0.7 }}
                  >
                     <Image 
                        src="/images/multi-location-global-v1.jpg" 
                        alt="Global Operations Control Center" 
                        fill
                        className="object-cover"
                        priority={true}
                     />
                  </motion.div>

                  {/* Step 1 & 2 Image */}
                  <motion.div 
                     className="absolute inset-0"
                     animate={{ opacity: currentStep >= 1 ? 1 : 0, scale: currentStep >= 1 ? 1.05 : 1 }}
                     transition={{ duration: 0.7 }}
                  >
                     <Image 
                        src="/images/multi-location-manager-v1.jpg" 
                        alt="Professional management reviewing site data" 
                        fill
                        className="object-cover"
                     />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                     <div className="bg-white/20 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold text-sm border border-white/20 flex items-center gap-2">
                        {currentStep === 0 && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-primary" /> Global Dashboard</span>}
                        {currentStep === 1 && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Compliance Check</span>}
                        {currentStep === 2 && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-400" /> Audit Center</span>}
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
