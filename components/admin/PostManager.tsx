"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, Plus, Eye, Pencil, Trash2, 
  Sparkles, Globe, Lock, Clock, Filter,
  MoreHorizontal, ChevronRight, FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  category: string | null;
  type: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PostManagerProps {
  posts: Post[];
  categories: any[];
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  loading?: boolean;
}

export default function PostManager({ posts, categories, onDelete, onToggleFeatured, loading }: PostManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPosts = posts.filter(p => {
    // Show Articles (Blog)
    const type = p.type || 'ARTICLE';
    const category = p.category || '';
    
    const isArticle = type === 'ARTICLE' || (!['NEWS'].includes(type) && !['Announcement', 'Company Announcement', 'Product Update', 'Press Release'].includes(category));
    
    if (!isArticle) return false;

    const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || (statusFilter === "published" ? p.published : !p.published);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-4 bg-red-100 text-red-900 rounded font-mono text-xs">
        DEBUG INFO: Total posts received: {posts?.length || 0}. Filtered: {filteredPosts?.length || 0}.
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Editorial Hub</h2>
          <p className="text-sm text-slate-500 font-medium">Manage your long-form articles and educational content.</p>
        </div>
        <Link 
          href="/admin/editor/new"
          className="flex items-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
        >
          <Plus size={16} /> Write New Article
        </Link>
      </div>

      {/* Filters Hub */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 px-4 py-2 w-full lg:w-96">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 dark:text-white w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl border-none text-xs font-black uppercase tracking-widest text-slate-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 hover:text-brand-primary transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Modern Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 dark:border-slate-800 bg-slate-50/30">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Article Title</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hidden xl:table-cell">Category</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Visibility</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hidden md:table-cell">Published</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {filteredPosts.map((post) => (
              <tr key={post.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
                <td className="px-8 py-6">
                  <Link href={`/admin/editor/${post.id}`} className="block max-w-md">
                    <div className="text-sm font-black text-slate-800 dark:text-white group-hover:text-brand-primary transition-colors mb-1 truncate">{post.title}</div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-wider">/{post.slug}</div>
                  </Link>
                </td>
                <td className="px-8 py-6 hidden xl:table-cell">
                   <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100 dark:border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      {post.category || "Unsorted"}
                   </span>
                </td>
                <td className="px-8 py-6">
                   <div className={cn(
                     "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em]",
                     post.published ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                   )}>
                      {post.published ? <Globe size={11} /> : <Lock size={11} />}
                      {post.published ? "Live" : "Draft"}
                   </div>
                </td>
                <td className="px-8 py-6 hidden md:table-cell text-xs font-bold text-slate-400">
                   {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                    <Link href={`/blog/${post.slug}`} target="_blank" className="p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 hover:text-sky-600 transition-all">
                      <Eye size={16} />
                    </Link>
                    <button 
                      onClick={() => onToggleFeatured(post.id, post.featured)}
                      className={cn(
                        "p-2.5 rounded-xl transition-all",
                        post.featured ? "bg-amber-50 text-amber-600" : "bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-amber-500"
                      )}
                    >
                      <Sparkles size={16} />
                    </button>
                    <Link 
                      href={`/admin/editor/${post.id}`}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => onDelete(post.id)} className="p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-400 hover:text-rose-600 transition-all">
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
