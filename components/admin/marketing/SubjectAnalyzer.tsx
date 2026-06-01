"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Inbox,
  Tag,
  ShieldAlert,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface Analysis {
  score: number;
  level: "great" | "good" | "risky" | "bad";
  length: number;
  issues: Array<{ severity: string; rule: string; message: string }>;
  estimatedTab: "Primary" | "Promotions" | "Spam-risk";
  suggestions: string[];
}

/**
 * Live subject-line analyzer for campaign creation. Debounces the input,
 * pings /api/admin/email/analyze-subject, and shows a score + tab estimate
 * + 1-line issues + suggested rewrites — all inline above the create-campaign
 * form so the admin can iterate before sending.
 */
export default function SubjectAnalyzer({
  value,
  onPickSuggestion,
}: {
  value: string;
  onPickSuggestion?: (s: string) => void;
}) {
  const [data, setData] = useState<Analysis | null>(null);

  useEffect(() => {
    if (!value.trim()) {
      setData(null);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const r = await fetch("/api/admin/email/analyze-subject", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subject: value }),
        });
        const d = await r.json();
        if (!r.ok) return;
        setData(d);
      } catch {}
    }, 250);
    return () => clearTimeout(t);
  }, [value]);

  if (!data) return null;

  const tabMeta: Record<string, { icon: any; bg: string; text: string; label: string }> = {
    Primary: {
      icon: Inbox,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      label: "Likely Primary inbox",
    },
    Promotions: {
      icon: Tag,
      bg: "bg-amber-100",
      text: "text-amber-700",
      label: "Likely Promotions tab",
    },
    "Spam-risk": {
      icon: ShieldAlert,
      bg: "bg-rose-100",
      text: "text-rose-700",
      label: "High spam risk",
    },
  };
  const tab = tabMeta[data.estimatedTab];
  const TabIcon = tab.icon;

  const scoreColor =
    data.level === "great"
      ? "from-emerald-500 to-teal-500"
      : data.level === "good"
      ? "from-amber-400 to-orange-500"
      : data.level === "risky"
      ? "from-amber-500 to-rose-500"
      : "from-rose-500 to-red-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 p-3 rounded-xl border border-slate-200 bg-slate-50/50"
    >
      {/* Header: score bar + tab pill */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="relative w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${data.score}%` }}
              transition={{ duration: 0.3 }}
              className={`h-full bg-gradient-to-r ${scoreColor}`}
            />
          </div>
          <span className="text-xs font-black text-slate-700">
            {data.score}/100
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${tab.bg} ${tab.text}`}
        >
          <TabIcon className="w-2.5 h-2.5" />
          {tab.label}
        </span>

        <span className="text-[10px] font-bold text-slate-400 ml-auto">
          {data.length} chars
        </span>
      </div>

      {/* Issues */}
      {data.issues.length > 0 && (
        <div className="mt-2.5 space-y-1">
          {data.issues.slice(0, 3).map((issue, i) => (
            <div
              key={i}
              className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-relaxed"
            >
              <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
              <span>{issue.message}</span>
            </div>
          ))}
        </div>
      )}

      {data.issues.length === 0 && data.estimatedTab === "Primary" && (
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold">
          <CheckCircle2 className="w-3 h-3" />
          Looks great — conversational and inbox-friendly.
        </div>
      )}

      {/* Suggestions */}
      <AnimatePresence>
        {data.suggestions && data.suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2.5 pt-2.5 border-t border-slate-200"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-violet-600 mb-1.5">
              <Sparkles className="w-2.5 h-2.5" />
              Primary-friendly alternatives
            </div>
            <div className="space-y-1">
              {data.suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onPickSuggestion?.(s)}
                  className="w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-left transition group"
                >
                  <span className="text-xs font-bold text-slate-700 truncate">
                    {s}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-violet-600 shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
