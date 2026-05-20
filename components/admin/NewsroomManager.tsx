"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Newspaper, Plus, Eye, Pencil, Trash2, 
  Globe, Lock, MapPin, ExternalLink, Search,
  Calendar, Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  category: string | null;
  type: string; // Add this
  createdAt: string;
}

interface NewsroomManagerProps {
  posts: Post[];
  onDelete: (id: string) => void;
  loading?: boolean;
}

export default function NewsroomManager({ posts, onDelete, loading }: NewsroomManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = posts.filter(p => {
    // Only Include Newsroom content
    // We check for type 'NEWS' but also fallback to checking category if type is missing or defaulted to ARTICLE
    const isNewsType = p.type === 'NEWS';
    const isNewsCategory = ['Announcement', 'Company Announcement', 'Product Update', 'Press Release'].includes(p.category || '');
    
    if (!isNewsType && !isNewsCategory) return false;

    return p.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Newsroom Command</h2>
          <p className="text-sm text-slate-500 font-medium">Manage corporate announcements and official press releases.</p>
        </div>
        <Link 
          href="/admin/blog-editor/new"
          className="flex items-center gap-2 px-6 py-4 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20"
        >
          <Plus size={16} /> Draft Release
        </Link>
      </div>

      {/* Info Banner */}
      <div className="bg-indigo-50 dark:bg-brand-primary/10 rounded-3xl p-6 border border-indigo-100 dark:border-brand-primary/20 flex items-start gap-4">
          <Info className="text-brand-primary mt-1 shrink-0" size={20} />
          <div>
              <h4 className="text-sm font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest mb-1">Syndication Notice</h4>
              <p className="text-xs text-indigo-700/70 dark:text-indigo-400 font-medium leading-relaxed">
                  Items in this section are automatically pushed to the **Brand Newsroom Hub**. Ensure headlines are professional and editorial in nature.
              </p>
          </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm max-w-md">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter press releases..."
          className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 dark:text-white w-full"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 dark:border-slate-800 bg-slate-50/30">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Release Headline</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Distribution</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {filteredNews.length === 0 ? (
                <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                        <Newspaper className="mx-auto mb-4 text-slate-200" size={48} />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No Press Releases Found</p>
                        <p className="text-xs text-slate-400 mt-1">Posts with 'Announcement' category will appear here.</p>
                    </td>
                </tr>
            ) : filteredNews.map((post) => (
              <tr key={post.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
                <td className="px-8 py-6">
                  <div className="text-sm font-black text-slate-800 dark:text-white group-hover:text-brand-primary transition-colors mb-1">{post.title}</div>
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Calendar size={10} /> {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <MapPin size={10} /> GLOBAL
                     </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest">Web Hub</span>
                      {post.published && <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest">RSS</span>}
                   </div>
                </td>
                <td className="px-8 py-6">
                   <div className={cn(
                     "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.1em]",
                     post.published ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                   )}>
                      {post.published ? <Globe size={11} /> : <Lock size={11} />}
                      {post.published ? "Live" : "Draft"}
                   </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/news/${post.slug}`} target="_blank" className="p-2.5 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-all">
                      <ExternalLink size={16} />
                    </Link>
                    <Link 
                      href={`/admin/blog-editor/${post.id}`}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => onDelete(post.id)} className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
