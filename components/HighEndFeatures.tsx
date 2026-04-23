"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Calendar, 
  MessageSquare,
  Clock, 
  LayoutDashboard, 
  Users, 
  Layers, 
  ClipboardCheck, 
  FileBox 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Smart Scheduling",
    text: "AI-driven shift patterns that adapt to your team's availability and labor costs.",
    color: "bg-blue-500"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Management",
    text: "Centralized directory for all staff with role-based permissions and performance tracking.",
    color: "bg-purple-500"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Real-time Metrics",
    text: "Track labor-to-sales ratios and efficiency in real-time with beautiful dashboards.",
    color: "bg-emerald-500"
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Direct Comms",
    text: "Built-in chat and announcements that keep everyone synced without external apps.",
    color: "bg-amber-500"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Time Tracking",
    text: "Precise clock-in/out with GPS verification and automated timesheet generation.",
    color: "bg-rose-500"
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Budget Optimization",
    text: "Predict labor needs and stay within budget with our advanced forecasting engine.",
    color: "bg-cyan-500"
  }
];

const HighEndFeatures = () => {
  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
             Experience the Future
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black text-brand-dark dark:text-white mb-6">
            Everything your team <br />
            <span className="text-brand-primary">needs to thrive.</span>
          </h2>
          <p className="text-xl text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with intuitive design 
            to redefine workforce management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group relative bg-white dark:bg-slate-800 border-border p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <CardContent className="p-0 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${f.color}/10 flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-brand-primary/5`}>
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark dark:text-white mb-4">
                    {f.title}
                  </h3>
                  <p className="text-brand-slate dark:text-slate-400 font-medium leading-relaxed">
                    {f.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighEndFeatures;
