"use client";

import React from "react";
import { motion } from "framer-motion";
import { MousePointer2, Users, Rocket } from "lucide-react";

const steps = [
  {
    title: "Select your plan",
    description: "Choose the tier that fits your team's current size and scale.",
    icon: MousePointer2,
    color: "indigo"
  },
  {
    title: "Onboard your team",
    description: "Add your staff members and departments in minutes.",
    icon: Users,
    color: "emerald"
  },
  {
    title: "Start scheduling",
    description: "Build beautiful schedules and empower your operations.",
    icon: Rocket,
    color: "violet"
  }
];

const PricingSteps = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
           <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
             Ready in three simple steps.
           </h2>
           <p className="text-lg text-slate-500 max-w-2xl mx-auto">
             Stop wasting hours on complex setups. Get your entire team live on StaffSchedule.io before lunch.
           </p>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto"
        >
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-slate-200" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="relative text-center group"
            >
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center bg-white shadow-sm border border-slate-100 mb-6 transition-transform duration-300 group-hover:-translate-y-2 relative z-10`}>
                <step.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-500 font-medium text-sm px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSteps;
