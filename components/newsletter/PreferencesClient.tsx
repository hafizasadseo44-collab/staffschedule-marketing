"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Newspaper,
  BookOpen,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Rocket,
  Megaphone,
  Inbox,
  Bell,
} from "lucide-react";

const PREFS = [
  { key: "weeklyDigest", label: "Weekly Workforce Digest", desc: "Curated articles + guides every Monday", icon: Inbox, accent: "from-indigo-500 to-purple-500" },
  { key: "blog", label: "Blog Updates", desc: "Notified when we publish a new article", icon: Newspaper, accent: "from-violet-500 to-fuchsia-500" },
  { key: "productUpdates", label: "Product Updates", desc: "What's new in the StaffSchedule app", icon: Sparkles, accent: "from-pink-500 to-rose-500" },
  { key: "schedulingTips", label: "Scheduling Tips", desc: "Practical advice for shift planners", icon: Lightbulb, accent: "from-amber-500 to-orange-500" },
  { key: "industryInsights", label: "Industry Insights", desc: "Trends from healthcare, retail, hospitality & more", icon: TrendingUp, accent: "from-emerald-500 to-teal-500" },
  { key: "featureReleases", label: "Feature Releases", desc: "Be first to try new capabilities", icon: Rocket, accent: "from-cyan-500 to-blue-500" },
  { key: "announcements", label: "Company Announcements", desc: "Big news from StaffSchedule.io", icon: Megaphone, accent: "from-slate-600 to-slate-800" },
  { key: "guides", label: "Guides & Resources", desc: "Long-form playbooks & downloadable PDFs", icon: BookOpen, accent: "from-indigo-500 to-blue-500" },
  { key: "news", label: "News & Press", desc: "Press releases and partner announcements", icon: Bell, accent: "from-purple-500 to-indigo-500" },
] as const;

type PrefKey = (typeof PREFS)[number]["key"];

export default function PreferencesClient() {
  const params = useSearchParams();
  const token = params.get("token");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string>("ACTIVE");
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({} as any);

  useEffect(() => {
    if (!token) {
      setError("Missing token. Use the link from your email.");
      setLoading(false);
      return;
    }
    fetch(`/api/newsletter/preferences?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setEmail(data.email);
        setName(data.name || "");
        setStatus(data.status);
        setPrefs(data.preferences);
      })
      .catch((e) => setError(e.message || "Could not load your preferences."))
      .finally(() => setLoading(false));
  }, [token]);

  const togglePref = (key: PrefKey) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, preferences: prefs, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setStatus(data.status);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 text-slate-500">
        <Loader2 className="w-7 h-7 animate-spin text-indigo-500" />
        <p className="text-sm font-medium">Loading your preferences...</p>
      </div>
    );
  }

  if (error && !email) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl p-10 border border-rose-100 shadow-xl text-center"
      >
        <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-7 h-7 text-rose-500" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 mb-2">Something went wrong</h1>
        <p className="text-slate-500 text-sm">{error}</p>
        <a href="/" className="inline-block mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-700">
          ← Back to home
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl w-full"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
          <Mail className="w-3.5 h-3.5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Preferences</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Your inbox, your rules.</h1>
        <p className="text-slate-500 text-base max-w-md mx-auto">
          Choose exactly what you want to hear about. Unchecking everything will unsubscribe you completely.
        </p>
        <p className="mt-3 text-xs font-semibold text-slate-400">
          Signed in as <span className="text-indigo-600">{email}</span>
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-indigo-100/40 overflow-hidden">
        {/* Name */}
        <div className="p-6 border-b border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Display Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
            placeholder="Add your name for a more personal touch"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
          />
        </div>

        {/* Prefs */}
        <div className="divide-y divide-slate-100">
          {PREFS.map((p, i) => {
            const Icon = p.icon;
            const enabled = !!prefs[p.key];
            return (
              <motion.button
                key={p.key}
                onClick={() => togglePref(p.key)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50 transition group"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${p.accent} shadow-md`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                    {p.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{p.desc}</div>
                </div>
                <div
                  className={`relative w-12 h-7 rounded-full transition-colors shrink-0 ${
                    enabled ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md ${
                      enabled ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 flex items-center justify-between gap-4 flex-wrap">
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="flex items-center gap-2 text-emerald-600 text-sm font-bold"
              >
                <CheckCircle2 className="w-4 h-4" /> Preferences saved
              </motion.div>
            )}
            {error && !saved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-rose-600 text-sm font-bold"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}
            {!saved && !error && status === "UNSUBSCRIBED" && (
              <motion.div className="text-rose-600 text-xs font-bold">
                You&apos;re currently unsubscribed
              </motion.div>
            )}
          </AnimatePresence>
          <div className="ml-auto flex items-center gap-3">
            <a
              href="/"
              className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-2.5"
            >
              Cancel
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preferences"
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
