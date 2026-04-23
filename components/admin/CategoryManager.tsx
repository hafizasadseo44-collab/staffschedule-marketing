"use client";

import React from "react";
import { 
  Tag, FolderPlus, Palette, Pencil, Trash2, 
  Check, X, Loader2, BarChart2, Globe, Hash
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface CategoryManagerProps {
  categories: Category[];
  posts: any[];
  newCatName: string;
  setNewCatName: (v: string) => void;
  newCatColor: string;
  setNewCatColor: (v: string) => void;
  editingCat: string | null;
  setEditingCat: (v: string | null) => void;
  editCatName: string;
  setEditCatName: (v: string) => void;
  editCatColor: string;
  setEditCatColor: (v: string) => void;
  addCategory: () => void;
  updateCategory: (id: string) => void;
  deleteCategory: (id: string) => void;
  catSaving: boolean;
  colorPresets: string[];
}

export default function CategoryManager(props: CategoryManagerProps) {
  const { 
    categories, posts, newCatName, setNewCatName, newCatColor, setNewCatColor, 
    editingCat, setEditingCat, editCatName, setEditCatName, editCatColor, setEditCatColor,
    addCategory, updateCategory, deleteCategory, catSaving, colorPresets 
  } = props;

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">Taxonomy <span className="text-brand-primary">Engine.</span></h2>
          <p className="text-sm text-slate-500 font-medium">Engineer your site structure with color-coded high-authority categories.</p>
        </div>
        <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Segments</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">{categories.length} Units</span>
           </div>
           <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
              <BarChart2 size={20} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Advanced Creator Console */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm sticky top-32">
            <h3 className="text-[11px] font-black text-brand-primary mb-10 uppercase tracking-[0.4em] flex items-center gap-3">
              <FolderPlus size={16} /> Category Architect
            </h3>
            
            <div className="space-y-10">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Unit Name</label>
                <input
                  type="text"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  placeholder="e.g. Artificial Intelligence"
                  className="w-full h-14 px-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all placeholder:text-slate-300"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">Brand Color Matrix</label>
                <div className="grid grid-cols-5 gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                  {colorPresets.map(c => (
                    <button
                      key={c}
                      onClick={() => setNewCatColor(c)}
                      className={cn(
                        "w-full aspect-square rounded-xl transition-all duration-300 relative group",
                        newCatColor === c ? "ring-4 ring-brand-primary ring-offset-4 dark:ring-offset-slate-900 scale-90" : "hover:scale-110"
                      )}
                      style={{ backgroundColor: c }}
                    >
                      {newCatColor === c && <Check size={14} className="text-white absolute inset-0 m-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={addCategory}
                disabled={!newCatName.trim() || catSaving}
                className="w-full h-16 bg-slate-900 dark:bg-brand-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-primary transition-all shadow-2xl shadow-slate-900/10 dark:shadow-brand-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {catSaving ? <Loader2 size={18} className="animate-spin" /> : <Tag size={18} />}
                Deploy Category
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Asset Hub */}
        <div className="xl:col-span-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat, i) => (
                <div 
                  key={cat.id} 
                  className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden relative"
                >
                   {/* Background Glow */}
                   <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] -mr-10 -mt-10 blur-3xl rounded-full" style={{ backgroundColor: cat.color }} />
                   
                   <div className="relative z-10 flex items-start justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: cat.color }}>
                         <Hash size={24} />
                      </div>
                      <div className="flex items-center gap-1">
                         <button 
                           onClick={() => { setEditingCat(cat.id); setEditCatName(cat.name); setEditCatColor(cat.color); }}
                           className="p-3 rounded-xl text-slate-300 hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                         >
                            <Pencil size={16} />
                         </button>
                         <button 
                           onClick={() => deleteCategory(cat.id)}
                           className="p-3 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                   </div>

                   {editingCat === cat.id ? (
                      <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                         <input
                           type="text"
                           value={editCatName}
                           onChange={e => setEditCatName(e.target.value)}
                           className="w-full h-12 px-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-bold outline-none"
                         />
                         <div className="flex items-center gap-2">
                           <button onClick={() => updateCategory(cat.id)} className="flex-1 h-12 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                             <Check size={14} /> Update Sync
                           </button>
                           <button onClick={() => setEditingCat(null)} className="w-12 h-12 bg-slate-100 dark:bg-white/5 text-slate-400 rounded-xl flex items-center justify-center">
                             <X size={14} />
                           </button>
                         </div>
                      </div>
                   ) : (
                      <>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2 uppercase group-hover:text-brand-primary transition-colors">{cat.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Path Control: <span className="text-slate-600 dark:text-slate-300">/blog/category/{cat.slug}</span></p>
                        
                        <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="px-3 py-1 bg-slate-50 dark:bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                 <Globe size={10} /> Live Assets
                              </div>
                              <span className="text-sm font-black text-slate-900 dark:text-white">
                                {posts.filter(p => p.category === cat.name).length}
                              </span>
                           </div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">Active Node</span>
                        </div>
                      </>
                   )}
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
