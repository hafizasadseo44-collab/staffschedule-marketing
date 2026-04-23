"use client";

import React from "react";
import { 
  FileText, Globe, Lock, Tag, 
  TrendingUp, Clock, Sparkles, ArrowUpRight,
  ChevronRight, Calendar, MessageSquare, BarChart3,
  User, Megaphone, Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardOverviewProps {
  stats: {
    total: number;
    published: number;
    drafts: number;
    categories: number;
  };
  recentPosts: any[];
}

export default function DashboardOverview({ stats, recentPosts }: DashboardOverviewProps) {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Premium Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">System v2.4.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Real-time Node: Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-3">
            Command <span className="text-brand-primary">Intelligence.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-lg">Your global content ecosystem is healthy. All distribution nodes are optimized for peak performance.</p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 pl-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Authority</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">Master Administrator</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <User size={20} />
          </div>
        </div>
      </div>

      {/* High-Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard label="Total Content Assets" value={stats.total} icon={FileText} color="from-blue-600 to-indigo-600" trend="+12% this month" />
        <MetricCard label="Global Reach (Live)" value={stats.published} icon={Globe} color="from-emerald-500 to-teal-600" trend="98.2% Uptime" />
        <MetricCard label="Pending Review" value={stats.drafts} icon={Lock} color="from-amber-500 to-orange-600" trend="2 Urgent Action" />
        <MetricCard label="Data Taxonomies" value={stats.categories} icon={Tag} color="from-purple-600 to-pink-600" trend="Optimized" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Real-time Activity Center */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10">
             <BarChart3 className="text-slate-50 dark:text-white/5 w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                  <TrendingUp size={20} className="text-brand-primary" /> Intelligence Feed
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Live tracking of your latest editorial contributions.</p>
              </div>
              <button className="h-10 px-5 bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-brand-primary hover:text-white rounded-xl transition-all">Audit Logs</button>
            </div>

            <div className="space-y-4">
              {recentPosts.slice(0, 4).map((post, i) => {
                const isItemPublished = post.published !== undefined ? !!post.published : !!post.isPublished;
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={post.id} 
                    className="flex items-center gap-6 p-5 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-white/5 transition-all group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0 border border-slate-50 dark:border-slate-700 group-hover:scale-110 transition-transform">
                      <FileText size={22} className="text-brand-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black text-slate-800 dark:text-white truncate group-hover:text-brand-primary transition-colors">{post.title}</h4>
                      <div className="flex items-center gap-4 mt-1.5">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <Calendar size={12} /> {new Date(post.updatedAt || post.createdAt).toLocaleDateString()}
                         </span>
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <User size={12} /> System Admin
                         </span>
                      </div>
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                      isItemPublished ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {isItemPublished ? 'Publicly Synced' : 'Draft Protocol'}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rapid Action Console */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-brand-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary mb-8 border border-brand-primary/20">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tighter">Content Pilot.</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-10">Leverage AI to draft high-converting press releases and articles in seconds.</p>
                <button className="w-full h-14 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-primary hover:text-white transition-all shadow-lg">Activate AI Core</button>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.3em]">Deployment Shortcuts</h3>
              <div className="space-y-4">
                <QuickLink icon={Megaphone} label="New Press Release" color="text-brand-primary" />
                <QuickLink icon={ArrowUpRight} label="Global SEO Audit" color="text-emerald-500" />
                <QuickLink icon={Settings} label="System Protocols" color="text-slate-400" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, color, trend }: { label: string, value: number, icon: any, color: string, trend: string }) {
  const colorMap: Record<string, string> = {
    "from-blue-600 to-indigo-600": "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    "from-emerald-500 to-teal-600": "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    "from-amber-500 to-orange-600": "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    "from-purple-600 to-pink-600": "bg-slate-50 text-slate-600 dark:bg-white/5 dark:text-slate-400",
  };

  const style = colorMap[color] || "bg-slate-50 text-slate-600";

  return (
    <div className={cn("rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-slate-200/20 dark:hover:shadow-none bg-white dark:bg-slate-900 group")}>
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", style)}>
          <Icon size={24} />
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full">{trend}</div>
      </div>
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</h4>
      <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</div>
    </div>
  );
}

function QuickLink({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
  return (
    <button className="w-full flex items-center justify-between p-5 rounded-[1.75rem] bg-slate-50/50 dark:bg-white/[0.02] border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group">
      <div className="flex items-center gap-4">
        <div className={cn("p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm", color)}>
          <Icon size={16} />
        </div>
        <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest group-hover:text-brand-primary transition-colors">{label}</span>
      </div>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
    </button>
  );
}
