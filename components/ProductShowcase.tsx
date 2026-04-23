"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  BarChart3, 
  FileBox,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const showcases = [
  {
    title: "Master the Art of Scheduling",
    subtitle: "SCHEDULING",
    description: "Build complex rotas in seconds. Our AI-powered engine automatically suggests shifts based on availability, costs, and historical demand.",
    points: ["Drag-and-drop builder", "Auto-shift suggestions", "Cost forecasting"],
    image: "/images/dashboard.png",
    icon: <Calendar className="w-6 h-6" />,
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    title: "Your Entire Team, Connected",
    subtitle: "MANAGEMENT",
    description: "Manage staff from a central hub. From onboarding to daily performance, keep your team motivated and in sync.",
    points: ["Centralized staff directory", "Role-based permissions", "In-app communication"],
    image: "/images/welcome.png",
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    reverse: true
  },
  {
    title: "Insights That Drive Growth",
    subtitle: "ANALYTICS",
    description: "Visualize your success. Real-time dashboards provide deep insights into labor metrics, staff efficiency, and operational bottlenecks.",
    points: ["Real-time labor tracking", "Custom reporting engine", "Trend analysis"],
    image: "/images/dashboard.png", // Re-using for now high quality pics
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

const ProductShowcaseRedesign = () => {
  return (
    <section className="py-32 space-y-32">
      {showcases.map((s, i) => (
        <div key={i} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${s.reverse ? 'lg:flex-row-reverse' : ''}`}>
            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, x: s.reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={s.reverse ? 'lg:order-2' : ''}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-border mb-6">
                 <div className="text-brand-primary">{s.icon}</div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{s.subtitle}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                {s.title}
              </h2>
              <p className="text-xl text-brand-slate dark:text-slate-400 font-medium mb-8 leading-relaxed">
                {s.description}
              </p>
              
              <ul className="space-y-4 mb-10">
                {s.points.map((p, pi) => (
                  <li key={pi} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-success/10 flex items-center justify-center text-brand-success">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-brand-dark dark:text-slate-300">{p}</span>
                  </li>
                ))}
              </ul>

              <Button className="h-14 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-xl shadow-brand-primary/20 hover:scale-[1.03] active:scale-[0.98] transition-all">
                 Explore {s.subtitle.toLowerCase()}
                 <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: s.reverse ? -50 : 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`relative ${s.reverse ? 'lg:order-1' : ''}`}
            >
              {/* Premium Glow Backdrop */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} rounded-[3rem] blur-[80px] -z-10`}></div>

              <div className="relative p-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur rounded-[3rem] border border-white dark:border-slate-800 shadow-2xl">
                 <div className="rounded-[2.5rem] overflow-hidden border border-border aspect-[4/3] bg-white dark:bg-slate-900 shadow-inner">
                    <img 
                      src={s.image} 
                      alt={s.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                    />
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductShowcaseRedesign;
