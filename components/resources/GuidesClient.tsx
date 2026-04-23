"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  BookOpen, 
  ArrowRight, 
  Loader2,
  LayoutGrid,
  Sparkles,
  ChevronRight,
  Target
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SubscribeForm from "../SubscribeForm";


export default function GuidesClient() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/guides/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setCategories([]);
        setLoading(false);
      });
  }, []);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-6" />
      <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Loading Knowledge Architecture...</p>
    </div>
  );

  return (
    <div className="space-y-24 pb-32">
      {/* ── Hero Search Section ── */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-sm"
          >
            <Sparkles size={14} />
            StaffSchedule.io Intelligence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]"
          >
            How can we help you <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">scale today?</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input 
              type="text"
              placeholder="Search features, playbooks, or technical guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-20 pl-16 pr-8 rounded-[2rem] bg-white border border-slate-200 shadow-2xl shadow-indigo-500/10 text-lg font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Category Grid ── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
              <LayoutGrid size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Knowledge Clusters</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Explore by functional feature</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                href={`/guides/category/${cat.slug}`}
                className="group relative flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 p-10 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:-translate-y-2 transition-all duration-500 no-underline"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-sm">
                  <BookOpen size={28} />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed mb-8">
                    {cat.description || `Master the complexities of ${cat.name} with our expert-led playbooks and documentation.`}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {cat.guideCount || 0} Professional Guides
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <ChevronRight size={18} />
                  </div>
                </div>

                {/* Aesthetic Gradient Overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-tr-[2.5rem] pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Spotlight Section ── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
          {/* Background Text */}
          <div className="absolute -bottom-10 -right-10 text-[200px] font-black text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter">
            PRO
          </div>

          <div className="flex-1 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={14} className="text-indigo-400" />
              Featured Intelligence
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Operational Excellence <br /> <span className="text-indigo-400">Mastery Course</span>
            </h2>
            <p className="text-slate-400 text-lg font-bold max-w-xl">
              Take a deep dive into the blueprint for scaling a workforce from 10 to 1,000 using StaffSchedule.io's advanced automation suite.
            </p>
            <Link 
              href="/guides/mastering-operational-intelligence"
              className="inline-flex items-center gap-3 h-14 px-10 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
            >
              Access Blueprint
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="w-full lg:w-[400px] aspect-square rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-700 p-1 shadow-2xl relative group">
            <div className="absolute inset-0 bg-white/10 rounded-[1.9rem] backdrop-blur-3xl group-hover:scale-95 transition-transform duration-700" />
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
              <Target size={60} className="mb-4 text-indigo-300 opacity-50" />
              <p className="text-[10px] font-black uppercase tracking-widest">Staffing Blueprint v4.2</p>
              <h4 className="text-2xl font-black tracking-tight leading-tight">Automation & AI Mastery</h4>
            </div>
          </div>
        </div>
      </section>
      {/* ── Newsletter Section ── */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] border border-slate-100 p-12 lg:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Stay ahead of the curve</h2>
            <p className="text-slate-500 font-bold">Get the latest labor cost reports and operational playbooks delivered directly to your inbox.</p>
          </div>
          <div className="flex justify-center">
            <SubscribeForm type="guides" />
          </div>
        </div>
      </section>
    </div>

  );
}
