import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function LoadingAuthorProfile() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── CINEMATIC HERO SKELETON ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-slate-50/50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="inline-flex items-center gap-2 text-slate-300 font-bold text-xs uppercase tracking-widest mb-12">
              <ArrowLeft size={14} /> Back to Insights
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-3">
                 <div className="w-48 h-48 rounded-[3rem] bg-slate-200 animate-pulse border-4 border-white shadow-2xl rotate-3" />
              </div>
              <div className="md:col-span-9">
                 <div className="w-32 h-6 bg-slate-200 rounded-full mb-6 animate-pulse" />
                 <div className="w-3/4 h-16 bg-slate-200 rounded-2xl mb-6 animate-pulse" />
                 <div className="w-full h-24 bg-slate-100 rounded-xl mb-8 animate-pulse" />

                 <div className="flex gap-4">
                    <div className="w-24 h-6 bg-slate-100 rounded-md animate-pulse" />
                    <div className="w-24 h-6 bg-slate-100 rounded-md animate-pulse" />
                    <div className="w-24 h-6 bg-slate-100 rounded-md animate-pulse" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ─── POSTS GRID SKELETON ─── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
           <div>
              <div className="w-64 h-10 bg-slate-200 rounded-xl animate-pulse mb-2" />
              <div className="w-48 h-5 bg-slate-100 rounded-md animate-pulse" />
           </div>
           <div className="w-24 h-8 bg-slate-100 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {[1, 2, 3].map((i) => (
             <div key={i} className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm">
                <div className="aspect-[16/10] bg-slate-200 rounded-2xl animate-pulse mb-6" />
                <div className="px-2 pb-4">
                   <div className="w-full h-6 bg-slate-200 rounded-md mb-2 animate-pulse" />
                   <div className="w-5/6 h-6 bg-slate-200 rounded-md mb-6 animate-pulse" />
                   <div className="w-full h-16 bg-slate-100 rounded-md mb-6 animate-pulse" />
                   <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between">
                      <div className="w-24 h-4 bg-slate-100 rounded-md animate-pulse" />
                      <div className="w-20 h-4 bg-slate-100 rounded-md animate-pulse" />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
