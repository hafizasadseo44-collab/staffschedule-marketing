"use client";

import { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronRight, 
  Loader2,
  Sparkles,
  LayoutGrid,
  Search,
  Filter,
  Eye,
  Download
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CategoryGuidesClient({ slug }: { slug: string }) {
  const [category, setCategory] = useState<any>(null);
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // 1. Fetch category details
    fetch(`/api/guides/categories`)
      .then(res => res.json())
      .then(cats => {
        if (Array.isArray(cats)) {
          const cat = cats.find((c: any) => c.slug === slug);
          setCategory(cat);
          
          // 2. Fetch guides in this category
          if (cat) {
            fetch(`/api/guides?categorySlug=${slug}&published=true`)
              .then(res => res.json())
              .then(data => {
                if (Array.isArray(data)) {
                  setGuides(data);
                } else {
                  setGuides([]);
                }
                setLoading(false);
              })
              .catch(() => {
                setGuides([]);
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-6" />
      <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Filtering Intelligence...</p>
    </div>
  );

  if (!category) return (
    <div className="max-w-xl mx-auto py-32 text-center space-y-8 px-6">
      <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto">
        <Sparkles size={40} />
      </div>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight">Category Not Found</h1>
      <p className="text-slate-500 font-bold">We couldn't locate the intelligence cluster you're looking for.</p>
      <Link href="/guides" className="inline-flex items-center gap-3 h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
        <ArrowLeft size={18} />
        Back to Knowledge Hub
      </Link>
    </div>
  );

  return (
    <div className="pb-32">
      {/* ── Sub-Category Header ── */}
      <section className="bg-slate-950 pt-32 pb-20 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full -z-0" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link href="/guides" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-12 group no-underline">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Knowledge Base Hub
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500/10 border border-white/5 text-indigo-400 text-[10px] font-black uppercase tracking-widest w-fit">
                <LayoutGrid size={14} />
                Feature Mastery
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                {category.name} <span className="text-slate-500">Playbooks</span>
              </h1>
              <p className="text-xl text-slate-400 font-bold max-w-2xl leading-relaxed">
                {category.description || `Expert-led documentation and strategic blueprints for mastering ${category.name} operations.`}
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="text"
                  placeholder="Filter category guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guides Grid ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide, idx) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full"
              >
                {/* Image Header */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {guide.coverImage ? (
                    <img src={guide.coverImage} alt={guide.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                      <BookOpen size={40} />
                    </div>
                  )}
                  {/* Overlay Tags */}
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                      Blueprint
                    </span>
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed mb-8 line-clamp-3">
                    {guide.description || guide.excerpt || "No description provided for this technical guide."}
                  </p>

                  <div className="mt-auto space-y-6">
                    <div className="flex items-center gap-6 py-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Eye size={12} className="text-indigo-500" />
                        {guide.viewCount || 0} Views
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Download size={12} className="text-indigo-500" />
                        {guide.downloadCount || 0} DLs
                      </div>
                    </div>

                    <Link 
                      href={`/guides/${guide.slug}`}
                      className="inline-flex items-center justify-between w-full h-14 px-8 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 no-underline"
                    >
                      Analyze Intelligence
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-slate-100 p-20 text-center space-y-6">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto opacity-50">
              <BookOpen size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase">Coming Soon</h3>
            <p className="text-slate-500 font-bold max-w-sm mx-auto">
              Our engineers are currently drafting professional playbooks for this category. Stay tuned.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
