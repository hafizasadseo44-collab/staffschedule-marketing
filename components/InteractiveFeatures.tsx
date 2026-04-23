"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageSquare,
  MapPin,
  Megaphone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoSchedule from "./demos/DemoSchedule";
import DemoTeamChat from "./demos/DemoTeamChat";
import DemoLocations from "./demos/DemoLocations";
import DemoAnnouncements from "./demos/DemoAnnouncements";

const features = [
  {
    subtitle: "SCHEDULING",
    title: "Master Your Team's Schedule in Seconds",
    description:
      "Create, assign, and publish shifts with an intuitive drag-and-drop calendar. Our intelligent engine auto-suggests optimal coverage based on availability, labor costs, and historical demand patterns.",
    points: [
      "Drag-and-drop shift builder",
      "Smart auto-assign suggestions",
      "One-click publish to entire team",
    ],
    icon: Calendar,
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-brand-primary",
    iconBg: "bg-brand-primary/10",
    Demo: DemoSchedule,
    cta: "Explore scheduling",
  },
  {
    subtitle: "TEAM CHAT",
    title: "Keep Every Conversation in One Place",
    description:
      "Built-in real-time messaging that eliminates the need for external apps. Direct messages, group channels, read receipts, and typing indicators — all integrated into your workforce hub.",
    points: [
      "Real-time direct & group messaging",
      "Read receipts & typing indicators",
      "File sharing & voice messages",
    ],
    icon: MessageSquare,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    Demo: DemoTeamChat,
    reverse: true,
    cta: "Explore chat",
  },
  {
    subtitle: "LOCATIONS",
    title: "Manage Every Location From a Single Dashboard",
    description:
      "Switch between locations instantly. Monitor staff counts, active shifts, and efficiency metrics per-location with real-time data syncing across your entire operation.",
    points: [
      "Multi-location management hub",
      "Per-location analytics & KPIs",
      "Instant location switching",
    ],
    icon: MapPin,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    Demo: DemoLocations,
    cta: "Explore locations",
  },
  {
    subtitle: "ANNOUNCEMENTS",
    title: "Broadcast Updates That Actually Get Seen",
    description:
      "Send company-wide or location-specific announcements with instant delivery. Track who has read them, pin critical updates, and keep your entire workforce on the same page.",
    points: [
      "Instant broadcast to all staff",
      "Read tracking & confirmations",
      "Pin important announcements",
    ],
    icon: Megaphone,
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    Demo: DemoAnnouncements,
    reverse: true,
    cta: "Explore announcements",
  },
];

const InteractiveFeatures = () => {
  return (
    <section className="py-24 lg:py-32 space-y-24 lg:space-y-32">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6"
        >
          Product Experience
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-6xl font-black text-brand-dark dark:text-white mb-6"
        >
          See it in action. <br />
          <span className="text-brand-primary">Feel the difference.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-brand-slate dark:text-slate-400 font-medium max-w-2xl mx-auto"
        >
          Every feature is designed to feel instant, intuitive, and powerful.
          Watch how your team will interact with StaffSchedule every day.
        </motion.p>
      </div>

      {/* Feature Blocks */}
      {features.map((f, i) => (
        <div key={i} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
          >
            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, x: f.reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={f.reverse ? "lg:order-2" : ""}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-border mb-6">
                <div className={f.iconColor}>
                  <f.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                  {f.subtitle}
                </span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-brand-dark dark:text-white mb-6 leading-tight">
                {f.title}
              </h2>
              <p className="text-lg text-brand-slate dark:text-slate-400 font-medium mb-8 leading-relaxed">
                {f.description}
              </p>

              <ul className="space-y-4 mb-10">
                {f.points.map((p, pi) => (
                  <li key={pi} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-success/10 flex items-center justify-center text-brand-success">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-brand-dark dark:text-slate-300">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>

              <Button className="h-14 px-8 rounded-2xl bg-brand-primary text-white font-black shadow-xl shadow-brand-primary/20 hover:scale-[1.03] active:scale-[0.98] transition-all">
                {f.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Demo Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: f.reverse ? -50 : 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`relative ${f.reverse ? "lg:order-1" : ""}`}
            >
              {/* Premium Glow Backdrop */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${f.color} rounded-[3rem] blur-[80px] -z-10`}
              ></div>

              <div className="relative p-3 bg-white/40 dark:bg-slate-800/40 backdrop-blur rounded-[2rem] border border-white dark:border-slate-800 shadow-2xl">
                <f.Demo />
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default InteractiveFeatures;
