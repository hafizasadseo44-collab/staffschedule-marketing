"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, Filter, Download, Newspaper, 
  ChevronRight, Globe, Info, Sparkles,
  ArrowUpRight, Share2, FileText, Image as ImageIcon
} from "lucide-react";
import PressReleaseCard from "./PressReleaseCard";
import Link from "next/link";
interface NewsroomClientProps {
  posts: any[];
}

export default function NewsroomClient({ posts }: NewsroomClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FAFBFE] dark:bg-brand-dark min-h-screen font-sans selection:bg-brand-primary/10">
      {/* Hero Section */}
      <section className="relative pt-44 pb-24 overflow-hidden border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-brand-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(79,70,229,0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-brand-dark text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <Sparkles size={12} /> News & Media Hub
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-8"
            >
              The Latest from <br /> 
              <span className="text-brand-primary">Corporate Headquarters.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12 max-w-2xl"
            >
              Official news, strategic announcements, and media resources from the StaffSchedule.io leadership team and global operational network.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="flex items-center gap-4 p-2 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl max-w-md"
            >
              <div className="pl-4 text-slate-400"><Search size={18} /></div>
              <input 
                type="text" 
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-700 dark:text-white placeholder:text-slate-300 py-3"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: News Listing */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Newspaper size={16} /> Press Releases
                </h2>
                <span className="text-xs font-bold text-slate-400">{filteredPosts.length} entries found</span>
            </div>

            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {filteredPosts.map((post) => (
                        <PressReleaseCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <Newspaper size={32} />
                    </div>
                    <p className="text-slate-400 font-bold">No announcements found matching your criteria.</p>
                </div>
            )}
          </div>

          {/* Right: Sidebar / Media Kit Placeholder */}
          <aside className="lg:col-span-4 space-y-8">
             {/* Media Kit Card */}
             <div className="bg-brand-primary rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-brand-primary/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                        <Download size={24} />
                    </div>
                    <h3 className="text-3xl font-black tracking-tight leading-none mb-4">Official <br /> Media Kit.</h3>
                    <p className="text-sm text-white/70 font-medium mb-10 leading-relaxed">
                        Need our logo, executive portraits, or brand guidelines? Our complete toolkit is coming soon.
                    </p>
                    
                    <div className="space-y-4">
                        <MediaKitItem icon={FileText} label="Brand Guidelines" disabled />
                        <MediaKitItem icon={ImageIcon} label="Hi-Res Logos" disabled />
                        <MediaKitItem icon={Globe} label="Executive Bios" disabled />
                    </div>

                    <button className="w-full mt-10 h-16 bg-white text-brand-primary rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                        Request Assets <Share2 size={14} />
                    </button>
                </div>
             </div>

             {/* Press Contact */}
             <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800/50 shadow-xl">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Press Contact</h4>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-brand-primary overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=press&backgroundColor=f8fafc" alt="Press Team" />
                    </div>
                    <div>
                        <div className="text-sm font-black text-slate-900 dark:text-white">Media Relations</div>
                        <div className="text-[11px] font-bold text-slate-400">press@staffschedule.io</div>
                    </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-6">For urgent media inquiries or quote requests from our leadership team.</p>
                <Link href="/contact" className="text-xs font-black text-brand-primary uppercase tracking-widest flex items-center gap-2 group">
                    Send Inquiry <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
             </div>
          </aside>

        </div>
      </section>

      {/* Newsletter / News Alerts */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Stay Synchronized.</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">Get official press releases and strategic updates delivered straight to your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="corporate@email.com" 
                      className="flex-1 h-16 px-8 rounded-2xl bg-slate-50 dark:bg-brand-dark border border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-brand-primary transition-all text-sm font-bold" 
                    />
                    <button className="h-16 px-10 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

function MediaKitItem({ icon: Icon, label, disabled }: { icon: any, label: string, disabled?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border border-white/10 ${disabled ? 'opacity-50 grayscale' : 'hover:bg-white/5 cursor-pointer'} transition-all`}>
        <div className="flex items-center gap-3">
            <Icon size={16} className="text-white/60" />
            <span className="text-xs font-bold text-white tracking-tight">{label}</span>
        </div>
        <ChevronRight size={14} className="text-white/20" />
    </div>
  );
}
