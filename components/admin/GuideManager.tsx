"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, Plus, Trash2, Edit3, 
  CheckCircle2, XCircle, Star,
  Eye, Loader2, ImageIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function GuideManager() {
  const router = useRouter();
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const res = await fetch("/api/guides");
      if (res.ok) setGuides(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteGuide = async (id: string) => {
    if (!confirm("Delete this guide?")) return;
    try {
      const res = await fetch(`/api/guides/${id}`, { method: "DELETE" });
      if (res.ok) setGuides(guides.filter(g => g.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Syncing Knowledge Base...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Knowledge Base</h2>
          <p className="text-sm text-slate-500 font-bold">Deploy long-form structured guides and playbooks.</p>
        </div>
        <button 
          onClick={() => router.push("/admin/guide-editor")}
          className="h-14 px-8 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 flex items-center gap-3"
        >
          <Plus size={18} />
          Create New Guide
        </button>
      </div>

      {/* Grid of Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <motion.div 
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500"
          >
            <div className="aspect-[16/9] bg-slate-50 relative overflow-hidden">
              {guide.coverImage ? (
                <img src={guide.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <ImageIcon size={48} />
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                {guide.isFeatured && (
                  <div className="bg-amber-400 text-white p-2 rounded-xl shadow-lg">
                    <Star size={14} fill="currentColor" />
                  </div>
                )}
                <div className={cn(
                  "p-2 rounded-xl shadow-lg text-white font-black text-[10px] uppercase tracking-widest",
                  guide.isPublished ? "bg-emerald-500" : "bg-slate-400"
                )}>
                  {guide.isPublished ? "Live" : "Draft"}
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-lg">{guide.categoryName}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">• {guide.viewCount || 0} Views</span>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">{guide.title}</h4>
              <p className="text-xs text-slate-500 font-bold leading-relaxed mb-8 line-clamp-2">{guide.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-400">
                  <Eye size={16} />
                  <span className="text-[11px] font-black tracking-tight">{guide.viewCount || 0} Views</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => router.push(`/admin/guide-editor/${guide.id}`)} 
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => deleteGuide(guide.id)} 
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
