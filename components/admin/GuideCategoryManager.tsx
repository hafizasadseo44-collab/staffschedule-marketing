"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Edit3, Save, X, 
  Tag, Loader2, Sparkles, Image as ImageIcon,
  ChevronRight, LayoutGrid
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GuideCategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/guides/categories");
      if (res.ok) setCategories(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name) return alert("Category name is required");
    setSaving(true);
    try {
      const url = editingCategory ? `/api/guides/categories/${editingCategory.id}` : "/api/guides/categories";
      const method = editingCategory ? "PATCH" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        fetchCategories();
        setIsEditorOpen(false);
        resetForm();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setEditingCategory(null);
    setForm({ name: "", description: "", icon: "" });
  };

  const openEditor = (cat: any = null) => {
    if (cat) {
      setEditingCategory(cat);
      setForm({
        name: cat.name,
        description: cat.description || "",
        icon: cat.icon || ""
      });
    } else {
      resetForm();
    }
    setIsEditorOpen(true);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure? This will fail if the category has active guides.")) return;
    try {
      const res = await fetch(`/api/guides/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Categories...</p>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Knowledge Architecture</h2>
          <p className="text-sm text-slate-500 font-bold">Manage the functional categories that power your help center.</p>
        </div>
        <button 
          onClick={() => openEditor()}
          className="h-14 px-8 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 flex items-center gap-3"
        >
          <Plus size={18} />
          Create Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 group hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <LayoutGrid size={24} />
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditor(cat)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                <button onClick={() => deleteCategory(cat.id)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{cat.name}</h3>
            <p className="text-xs text-slate-500 font-bold leading-relaxed mb-6 line-clamp-2">{cat.description || "No description provided."}</p>
            
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Tag size={12} className="text-indigo-500" />
                {cat.guideCount || 0} Guides
              </span>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">{cat.slug}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditorOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{editingCategory ? "Edit Feature" : "New Feature"}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Configure functional category</p>
                </div>
                <button onClick={() => setIsEditorOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-slate-50 text-slate-400 transition-all"><X size={20} /></button>
              </div>

              <div className="p-10 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category Name</label>
                  <input 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-14 px-6 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold outline-none focus:border-indigo-600 transition-all"
                    placeholder="e.g. Workforce Scheduling"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Short Description</label>
                  <textarea 
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full h-32 px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold outline-none focus:border-indigo-600 transition-all resize-none"
                    placeholder="Describe what users will learn in this category..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Icon Identifier (Optional)</label>
                  <input 
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full h-14 px-6 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold outline-none focus:border-indigo-600 transition-all"
                    placeholder="e.g. calendar, clock, users"
                  />
                </div>
              </div>

              <div className="p-10 bg-slate-50 flex gap-4">
                <button 
                  onClick={() => setIsEditorOpen(false)}
                  className="flex-1 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 h-14 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {editingCategory ? "Update Architecture" : "Deploy Category"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
