"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  FileBox,
  Mail,
  Newspaper,
  Inbox,
  Sparkles,
  Shield,
  Plus,
} from "lucide-react";

const CATEGORY_META: Record<string, { icon: any; accent: string }> = {
  WELCOME: { icon: Mail, accent: "from-indigo-500 to-violet-500" },
  BLOG: { icon: Newspaper, accent: "from-violet-500 to-fuchsia-500" },
  DIGEST: { icon: Inbox, accent: "from-emerald-500 to-teal-500" },
  PRODUCT: { icon: Sparkles, accent: "from-amber-500 to-orange-500" },
  GENERAL: { icon: FileBox, accent: "from-slate-500 to-slate-700" },
  CUSTOM: { icon: FileBox, accent: "from-pink-500 to-rose-500" },
};

export default function TemplateManager() {
  const [data, setData] = useState<{ system: any[]; custom: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/templates", { cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 gap-2">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading templates...
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            Marketing
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mt-2">
            Email Templates
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Built-in React Email templates used by your campaigns. Premium design,
            mobile-responsive, conversion-focused.
          </p>
        </div>
      </div>

      {/* System templates */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-indigo-500" />
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
            Built-in Templates
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.system.map((t) => {
            const meta = CATEGORY_META[t.category] || CATEGORY_META.CUSTOM;
            const Icon = meta.icon;
            return (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg hover:border-indigo-200 transition group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br pointer-events-none transition group-hover:opacity-30 from-indigo-500 to-purple-500" />
                <div className="flex items-start gap-4 relative">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.accent} flex items-center justify-center text-white shadow-lg shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-slate-900">{t.name}</h3>
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                        System
                      </span>
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      {t.category}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">
                      {t.description}
                    </p>
                    <div className="text-xs text-slate-400 font-mono bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 truncate">
                      Subject: {t.subject}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Custom templates */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileBox className="w-4 h-4 text-pink-500" />
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
              Custom Templates
            </h2>
          </div>
        </div>
        {data.custom.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-extrabold text-slate-700 mb-1">
              No custom templates yet
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Saved templates from your campaigns will appear here. Build a
              reusable library of branded emails.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.custom.map((t: any) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
              >
                <h3 className="font-extrabold text-slate-900 mb-1">{t.name}</h3>
                <p className="text-sm text-slate-500">{t.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
