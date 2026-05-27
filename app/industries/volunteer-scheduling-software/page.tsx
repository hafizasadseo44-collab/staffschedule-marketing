"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Heart, Users, CalendarDays, Bell, CheckCircle2, Star, ChevronDown,
  Smartphone, BarChart3, Clock, MessageSquare, ArrowRight, Zap,
  UserPlus, ClipboardList, Award, HandHelping
} from "lucide-react";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 right-0 w-[700px] h-[700px] bg-emerald-600/20 rounded-full blur-[160px]" />
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          className="absolute bottom-0 left-[-10%] w-[600px] h-[500px] bg-teal-500/15 rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs tracking-widest uppercase mb-6">
              <Heart size={13} className="text-emerald-400" /> Nonprofit & Community Scheduling
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Volunteer Scheduling Software That Actually{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Works.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
              Coordinating volunteers is hard enough without wrestling with spreadsheets and endless email threads. StaffSchedule.io makes it easy for volunteers to self-sign up, get reminders, and show up — so your coordinators can focus on the mission, not the logistics.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/signup"><button className="h-14 px-8 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm">Start Free — No Card Needed</button></Link>
              <Link href="/demo"><button className="h-14 px-8 rounded-xl font-bold border border-slate-600 bg-slate-800/60 text-slate-200 hover:bg-slate-700 transition-all w-full sm:w-auto text-sm">See How It Works</button></Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1.5">{[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}<span className="text-white font-bold ml-1">4.9</span><span className="text-slate-400">· 1,038 reviews</span></div>
              <span className="text-slate-400">Used by <span className="text-white font-bold">1,000+</span> nonprofits worldwide</span>
            </motion.div>
          </div>

          {/* RIGHT: Event Coordination Dashboard */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-2xl shadow-emerald-900/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest">Community Food Drive</p>
                    <h3 className="font-black text-lg mt-0.5">Saturday Event — All Roles</h3>
                  </div>
                  <div className="bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold">38/40 filled</div>
                </div>
                {/* Progress */}
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ delay: 0.8, duration: 1.2 }}
                    className="h-full bg-white rounded-full" />
                </div>
                <p className="text-emerald-200 text-[10px] mt-1.5">2 spots left — share the sign-up link</p>
              </div>

              {/* Volunteer rows */}
              <div className="p-4 space-y-2">
                {[
                  { name: "Sarah Mitchell", role: "Food Distribution Lead", time: "8:00 AM – 12:00 PM", status: "Confirmed ✓", c: "text-emerald-600 bg-emerald-50" },
                  { name: "James Okafor", role: "Registration Volunteer", time: "9:00 AM – 1:00 PM", status: "Confirmed ✓", c: "text-emerald-600 bg-emerald-50" },
                  { name: "Linda Chen", role: "Sorting & Packing", time: "8:00 AM – 10:00 AM", status: "Reminder Sent", c: "text-amber-600 bg-amber-50" },
                  { name: "Role: Driver", role: "Pickup & Delivery", time: "10:00 AM – 2:00 PM", status: "Open Slot", c: "text-slate-500 bg-slate-50" },
                ].map((v, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{v.name}</p>
                      <p className="text-slate-500 text-[10px] mt-0.5">{v.role} · {v.time}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${v.c}`}>{v.status}</span>
                  </motion.div>
                ))}
              </div>

              {/* Share link button */}
              <div className="px-4 pb-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
                  <UserPlus size={14} className="text-emerald-600 shrink-0" />
                  <p className="text-emerald-800 text-xs font-medium flex-1">Share sign-up link to fill 2 remaining spots</p>
                  <button className="text-[10px] bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold">Copy Link</button>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8 }}
              className="absolute -left-6 bottom-12 bg-white rounded-xl shadow-xl border border-slate-100 p-3.5 flex items-center gap-3 z-20">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center"><Award size={17} className="text-emerald-600" /></div>
              <div><p className="text-[9px] text-slate-400 font-bold uppercase">No-Show Rate</p><p className="font-black text-slate-800 text-base">-67%</p></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const stats = [
    { val: "67%", label: "Reduction in volunteer no-shows with automated reminders", icon: Bell },
    { val: "4hrs", label: "Average time saved weekly on volunteer coordination tasks", icon: Clock },
    { val: "3×", label: "Faster event fill times with self-signup portals vs email", icon: Zap },
    { val: "1,000+", label: "Nonprofits and community organizations use StaffSchedule.io", icon: Heart },
  ];
  return (
    <section ref={ref} className="py-14 bg-emerald-950 border-y border-emerald-900/50">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="text-center">
            <Icon size={20} className="mx-auto mb-3 text-emerald-400" />
            <p className="text-3xl font-black text-white mb-1">{s.val}</p>
            <p className="text-emerald-200/70 text-sm leading-snug">{s.label}</p>
          </motion.div>;
        })}
      </div>
    </section>
  );
}

// ─── PAIN POINTS ──────────────────────────────────────────────────────────────
function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const points = [
    { icon: ClipboardList, title: "Signups are scattered across email and Google forms", desc: "You send out a Google Form, people sign up in a spreadsheet, someone else registers via email, and by the day of the event you have no idea who's actually coming — or what role they signed up for." },
    { icon: Bell, title: "Volunteers forget and no-shows tank your event", desc: "Life happens. Without automated reminders sent at the right time through the right channel, a well-intentioned volunteer simply forgets. You're left scrambling to cover critical roles an hour before your event starts." },
    { icon: MessageSquare, title: "Coordinating last-minute changes is chaos", desc: "A key volunteer cancels the morning of. You need to reach out to your waitlist, find someone available, explain the role, and confirm — all while managing 50 other pre-event tasks. Without a coordination tool, it's pure chaos." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            What Makes Volunteer Coordination So Exhausting
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }} className="text-lg text-slate-600 leading-relaxed">
            Volunteers give their time because they care about your mission. But when the coordination experience is frustrating, confusing, or inconsistent — they stop showing up. Here's what most organizations are still dealing with.
          </motion.p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p, i) => {
            const Icon = p.icon;
            return <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 + i * 0.1 }}
              className="p-8 rounded-2xl bg-red-50/60 border border-red-100">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-5"><Icon size={22} className="text-red-600" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const features = [
    { icon: UserPlus, title: "Self-Signup Portals", desc: "Share a unique sign-up link for each event or shift. Volunteers browse available roles, pick their preferred time slot, and register themselves. No back-and-forth emails, no spreadsheet updates.", color: "text-emerald-600 bg-emerald-50" },
    { icon: Bell, title: "Automated Multi-Channel Reminders", desc: "Set reminder sequences — 7 days out, 24 hours out, and 2 hours out. Reminders go via push notification, SMS, and email. Your no-show rate drops significantly without any manual follow-up.", color: "text-blue-600 bg-blue-50" },
    { icon: ClipboardList, title: "Role-Based Event Management", desc: "Create events with multiple roles, each with its own capacity, time window, and skill requirements. The system matches volunteers to roles and notifies you when a role is full or still needs filling.", color: "text-purple-600 bg-purple-50" },
    { icon: Award, title: "Volunteer Hours Tracking", desc: "Track cumulative volunteer hours automatically. Generate reports by individual, team, or program. Perfect for grant reporting, recognition programs, and demonstrating community impact.", color: "text-amber-600 bg-amber-50" },
    { icon: MessageSquare, title: "Direct Team Communication", desc: "Send announcements, event updates, and last-minute changes directly through the app. Volunteers receive a notification immediately — no need to blast a mailing list or hope they saw the email.", color: "text-teal-600 bg-teal-50" },
    { icon: BarChart3, title: "Impact & Participation Reporting", desc: "See which volunteers are most active, which events have the highest attendance, and which roles are hardest to fill. Use the data to improve future events and recognize top contributors.", color: "text-rose-600 bg-rose-50" },
  ];
  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Everything Your Coordinators Need to Succeed
          </motion.h2>
          <p className="text-slate-600 text-lg">Purpose-built for nonprofits and community organizations — not adapted from enterprise HR software.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((f, i) => {
            const Icon = f.icon;
            return <motion.div key={i} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.color}`}><Icon size={22} /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>;
          })}
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRY SHOWCASE ────────────────────────────────────────────────────────
function IndustryShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scenarios = [
    { icon: "🍽️", title: "Food Banks & Hunger Relief", desc: "Coordinate large volunteer teams for weekly food distributions, food drives, and holiday events with self-signup and automated reminders." },
    { icon: "🏥", title: "Healthcare & Medical Nonprofits", desc: "Manage credentialed medical volunteers for community clinics, vaccination drives, and health fairs. Track certifications and roles automatically." },
    { icon: "🎪", title: "Community Events & Festivals", desc: "Staff events with dozens of roles — from setup crew to information booths — with role-specific sign-up windows and real-time fill tracking." },
    { icon: "🐾", title: "Animal Rescue & Shelters", desc: "Schedule dog walkers, adoption event volunteers, foster care coordinators, and fundraiser staff. Keep everyone informed and on time." },
    { icon: "📚", title: "Educational Nonprofits & Tutoring", desc: "Coordinate recurring weekly volunteer tutors alongside one-off event volunteers using one unified scheduling platform." },
    { icon: "🌍", title: "Environmental & Conservation Groups", desc: "Plan cleanup events, trail maintenance crews, and awareness campaigns with easy group scheduling and participant tracking." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            For Every Type of Volunteer Organization
          </motion.h2>
          <p className="text-slate-600 text-lg">From intimate community groups to large national nonprofits — StaffSchedule.io adapts to your mission.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
              className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-7 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MOBILE + WORKFLOW ────────────────────────────────────────────────────────
function MobileSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex justify-center">
            <div className="relative">
              <div className="w-64 bg-slate-800 rounded-[3rem] border-4 border-slate-700 shadow-2xl overflow-hidden">
                <div className="bg-emerald-600 p-5 pt-10">
                  <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest mb-1">Your Next Volunteer Shift</p>
                  <p className="text-white font-black text-lg">Saturday, 8:00 AM</p>
                  <p className="text-emerald-200 text-xs mt-1">Food Drive · Downtown Hub</p>
                </div>
                <div className="p-4 space-y-3 bg-slate-800">
                  <div className="bg-slate-700 rounded-xl p-3 border border-slate-600">
                    <p className="text-slate-400 text-[9px] uppercase font-bold">Your Role</p>
                    <p className="text-white font-bold text-sm mt-0.5">Food Sorting & Packing</p>
                  </div>
                  <div className="bg-slate-700 rounded-xl p-3 border border-slate-600">
                    <p className="text-slate-400 text-[9px] uppercase font-bold">Shift Notes</p>
                    <p className="text-slate-300 text-xs mt-0.5 leading-snug">Wear closed-toe shoes. Parking is on the south side. Coordinator: Sarah M.</p>
                  </div>
                  <motion.div animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                    className="bg-emerald-900/40 border border-emerald-700/40 rounded-xl p-3">
                    <p className="text-emerald-300 font-bold text-xs">⏰ Reminder: 24 hrs until your shift</p>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 bg-emerald-600 text-white text-[10px] font-bold py-1.5 rounded-lg">Confirm</button>
                      <button className="flex-1 bg-slate-600 text-slate-300 text-[10px] font-bold py-1.5 rounded-lg">Can't Make It</button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Give Every Volunteer a Seamless Experience
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }} className="text-slate-400 text-lg leading-relaxed mb-8">
              The volunteer experience matters. When it's easy to sign up, easy to confirm, and easy to know exactly where to show up — people come back. StaffSchedule.io makes the entire journey smooth, from first sign-up to thank-you message.
            </motion.p>
            <ul className="space-y-4">
              {[
                "Volunteers receive automatic reminders at 7 days, 24 hours, and 2 hours before their shift",
                "One-tap shift confirmation directly from push notification or SMS",
                "Full shift details — role, location, notes, supervisor contact — all in the app",
                "Easy cancellation flow that automatically opens the slot for others",
                "Team chat for event-day announcements and last-minute updates",
                "Personal hours tracker so volunteers can see their cumulative contribution",
              ].map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /><span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const testimonials = [
    { name: "Diane Foster", title: "Volunteer Coordinator, Harvest Hope Food Bank", location: "Columbia, SC", avatar: "https://i.pravatar.cc/100?img=33", rating: 5, quote: "I used to spend my entire Monday managing last weekend's volunteer list and prepping for next Saturday. With StaffSchedule.io, my Monday is back. Reminders go out automatically, sign-ups fill without my involvement, and I can see in real time which roles still need people. It's transformed how we operate." },
    { name: "Pastor Andre Webb", title: "Community Programs Director, New Life Church", location: "Nashville, TN", avatar: "https://i.pravatar.cc/100?img=68", rating: 5, quote: "We run 40+ community events per year with entirely volunteer staff. Coordinating all of that on email was a nightmare. StaffSchedule.io gave us self-signup links that our congregation could share, automated reminders that cut our no-shows by 70%, and a single view of every event's fill status. It's a game changer for nonprofits." },
    { name: "Yuki Tanaka", title: "Executive Director, Clean Shores Alliance", location: "San Diego, CA", avatar: "https://i.pravatar.cc/100?img=44", rating: 5, quote: "Our coastal cleanup events sometimes have 200 volunteers. Before StaffSchedule.io, managing that on a spreadsheet was genuinely stressful. Now I share one link, watch it fill up, and on event day everyone knows exactly where they're going and what they're doing. Our volunteer retention improved dramatically." },
  ];
  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Coordinators Who Got Their Time Back</motion.h2>
          <p className="text-slate-500 text-lg">Real results from nonprofits, churches, and community organizations.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-8 flex flex-col hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="flex mb-4">{[...Array(t.rating)].map((_, si) => <Star key={si} size={14} className="text-amber-400 fill-amber-400" />)}</div>
              <p className="text-slate-700 leading-relaxed text-sm flex-1 mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-emerald-100">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div><p className="font-bold text-slate-900 text-sm">{t.name}</p><p className="text-xs text-slate-400">{t.title} · {t.location}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const faqs = [
    { q: "Is there free volunteer scheduling software for nonprofits?", a: "StaffSchedule.io offers a free 14-day trial with full access to all volunteer management features. We also offer special nonprofit pricing for qualifying organizations. The trial requires no credit card, so your whole team can test it before committing." },
    { q: "How do volunteers sign up for shifts?", a: "You create an event or recurring shift in StaffSchedule.io and share a unique sign-up link. Volunteers click the link, see the available roles and time slots, and register for the one that fits them. No account required for the initial sign-up — you can configure it so they're invited to create a profile afterward." },
    { q: "How does the software reduce volunteer no-shows?", a: "StaffSchedule.io sends automated reminder sequences via push notification, SMS, and email. You configure when reminders go out — typically 7 days, 24 hours, and 2 hours before a shift. The reminder includes a one-tap confirm or cancel button. When a volunteer cancels, you can immediately notify the waitlist to fill the spot." },
    { q: "Can I track volunteer hours for reporting and recognition?", a: "Yes. Every check-in and check-out is recorded automatically. You can view cumulative hours by volunteer, by program, or by event. Export detailed reports for grant applications, board reports, or recognition programs. Volunteers can also see their own hours history in the app." },
    { q: "How do I communicate with volunteers on event day?", a: "StaffSchedule.io includes an in-app messaging feature. You can send a message to all volunteers for a specific event, a specific role, or a specific shift. Messages are delivered as push notifications instantly, so everyone sees last-minute updates even if they aren't actively checking their email." },
    { q: "Can I manage both recurring volunteer shifts and one-time events?", a: "Yes. You can create recurring volunteer schedules (like weekly soup kitchen shifts) and standalone event schedules (like an annual fundraiser) in the same platform. Volunteers can be registered on recurring schedules with their preferred slots or sign up for individual events through event-specific links." },
    { q: "Does StaffSchedule.io work for large events with hundreds of volunteers?", a: "Yes. The platform scales to events of any size. You can create multiple roles with specific capacities, set up volunteer team leaders, and use the live dashboard to monitor fill rates in real time as sign-ups come in. For very large events, bulk invitation tools let you reach your entire volunteer database with one action." },
  ];
  return (
    <section ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Questions About Volunteer Scheduling</motion.h2>
          <p className="text-slate-500 text-lg">Common questions from nonprofit coordinators and community event managers.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${open === i ? "border-emerald-500 shadow-lg shadow-emerald-50" : "border-slate-200 hover:border-emerald-300"}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left flex items-center justify-between p-6 font-bold text-slate-800 text-sm md:text-base">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-emerald-500 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-800 p-12 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-emerald-200 text-xs font-bold uppercase tracking-widest mb-6"><Heart size={12} />Built for Nonprofits & Community Groups</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Your Volunteers Deserve Better Coordination</h2>
            <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
              Give your volunteers a seamless experience and give your coordinators their time back. Join 1,000+ nonprofits using StaffSchedule.io to run better, more impactful events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup"><button className="h-14 px-10 rounded-xl font-black bg-white text-emerald-900 hover:bg-emerald-50 transition-all shadow-xl hover:-translate-y-1 text-sm w-full sm:w-auto">Start Free 14-Day Trial</button></Link>
              <Link href="/demo"><button className="h-14 px-10 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all w-full sm:w-auto text-sm">Book a Demo</button></Link>
            </div>
            <p className="mt-6 text-emerald-300 text-sm">No credit card required · Nonprofit pricing available · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VolunteerSchedulingSoftwarePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <HeroSection />
      <StatsBar />
      <PainSection />
      <FeaturesSection />
      <IndustryShowcase />
      <MobileSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
