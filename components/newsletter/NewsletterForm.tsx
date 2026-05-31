"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export type NewsletterVariant =
  | "card" // big standalone card (hero/CTA sections)
  | "inline" // tight horizontal form (footer, sidebar)
  | "minimal" // single-line, blends with surrounding surface
  | "split" // 2-column with marketing copy
  | "dark"; // dark gradient hero variant

interface NewsletterFormProps {
  variant?: NewsletterVariant;
  source?: string; // page path (auto-attributed)
  tags?: string[];
  preferences?: Array<
    | "blog"
    | "news"
    | "guides"
    | "productUpdates"
    | "schedulingTips"
    | "industryInsights"
    | "featureReleases"
    | "announcements"
    | "weeklyDigest"
  >;
  showName?: boolean;
  heading?: string;
  subheading?: string;
  cta?: string;
  className?: string;
}

export default function NewsletterForm({
  variant = "card",
  source,
  tags,
  preferences,
  showName = false,
  heading,
  subheading,
  cta = "Subscribe",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // Honeypot — bots fill, humans never see
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const sourcePage =
        source ||
        (typeof window !== "undefined" ? window.location.pathname : undefined);

      const prefPayload = preferences
        ? preferences.reduce(
            (acc, p) => ({ ...acc, [p]: true }),
            {} as Record<string, boolean>
          )
        : undefined;

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          sourcePage,
          tags,
          website,
          preferences: prefPayload,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setStatus("success");
      setEmail("");
      setName("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  // ───────────────────────────────────────────────
  // SUCCESS STATE
  // ───────────────────────────────────────────────
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "relative overflow-hidden",
          variantClasses[variant].successWrap,
          className
        )}
      >
        <div className={variantClasses[variant].successInner}>
          <div className={variantClasses[variant].successIcon}>
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className={variantClasses[variant].successTitle}>
              You&apos;re in! 🎉
            </div>
            <p className={variantClasses[variant].successText}>
              Check your inbox — we just sent a welcome email with your first
              scheduling tips.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // ───────────────────────────────────────────────
  // VARIANT RENDERERS
  // ───────────────────────────────────────────────

  const fieldsContent = (
    <>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
      />
      {showName && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          disabled={status === "loading"}
          className={variantClasses[variant].input}
        />
      )}
      <div className="relative flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@company.com"
          required
          disabled={status === "loading"}
          className={cn(variantClasses[variant].input, "pl-12")}
        />
        <Mail
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
            variant === "dark" ? "text-white/50" : "text-slate-400"
          )}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={variantClasses[variant].button}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {cta}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </>
  );

  // CARD variant - premium standalone with header
  if (variant === "card") {
    return (
      <div
        className={cn(
          "relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-indigo-100/30 overflow-hidden",
          className
        )}
      >
        {/* Decorative orb */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-purple-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-gradient-to-tr from-purple-400/15 to-pink-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-8 md:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Newsletter
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {heading || "The Workforce Brief"}
          </h3>
          <p className="text-slate-500 mb-6 leading-relaxed">
            {subheading ||
              "Weekly scheduling tips, product updates and workforce insights. No spam, unsubscribe anytime."}
          </p>

          <form
            onSubmit={onSubmit}
            className={cn(
              "relative flex gap-3 w-full",
              showName ? "flex-col" : "flex-col sm:flex-row"
            )}
          >
            {fieldsContent}
          </form>

          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 mt-3 text-rose-600 text-xs font-bold"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 mt-5 text-xs text-slate-400 font-medium">
            <span>Join 12,000+ ops leaders</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>No spam ever</span>
          </div>
        </div>
      </div>
    );
  }

  // SPLIT variant - 2-column with marketing copy + form
  if (variant === "split") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-indigo-200/40 bg-white",
          className
        )}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative p-10 md:p-12 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Free Newsletter
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
                {heading || "Master workforce scheduling"}
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                {subheading ||
                  "Join 12,000+ operations leaders who get our best scheduling playbooks, AI workforce trends, and product launches first."}
              </p>
              <div className="space-y-2.5">
                {[
                  "Weekly digest every Monday morning",
                  "Templates, frameworks, and exclusive guides",
                  "Beta-feature access before public launch",
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span className="text-white/90">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-10 md:p-12 bg-white">
            <h4 className="text-xl font-extrabold text-slate-900 mb-2">
              Subscribe — it&apos;s free
            </h4>
            <p className="text-slate-500 text-sm mb-6">
              No credit card. Unsubscribe with one click.
            </p>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              {fieldsContent}
            </form>
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 mt-3 text-rose-600 text-xs font-bold"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
            <p className="mt-5 text-[11px] text-slate-400 font-medium">
              By subscribing you agree to our{" "}
              <a href="/privacy" className="underline hover:text-indigo-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }

  // DARK variant - dark gradient hero
  if (variant === "dark") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 border border-white/10 p-8 md:p-10",
          className
        )}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">
              Stay in the loop
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
            {heading || "Join the smartest ops leaders"}
          </h3>
          <p className="text-white/70 mb-6 leading-relaxed">
            {subheading ||
              "Weekly tips, product news and exclusive guides — delivered Mondays."}
          </p>
          <form
            onSubmit={onSubmit}
            className={cn(
              "relative flex gap-3 w-full",
              showName ? "flex-col" : "flex-col sm:flex-row"
            )}
          >
            {fieldsContent}
          </form>
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 mt-3 text-rose-300 text-xs font-bold"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // MINIMAL — no chrome, just the inputs (good for tight slots)
  if (variant === "minimal") {
    return (
      <div className={className}>
        <form onSubmit={onSubmit} className="relative flex gap-2 w-full">
          {fieldsContent}
        </form>
        <AnimatePresence>
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 mt-2 text-rose-500 text-xs font-bold"
            >
              <AlertCircle className="w-3 h-3" />
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // INLINE — for footer or sidebars
  return (
    <div className={className}>
      <form onSubmit={onSubmit} className="relative flex gap-2 w-full">
        {fieldsContent}
      </form>
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 mt-2 text-rose-500 text-xs font-bold"
          >
            <AlertCircle className="w-3 h-3" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ───────────────────────────────────────────────────
// Variant style table — kept inline so each variant
// is self-contained and easy to tweak.
// ───────────────────────────────────────────────────

const baseInput =
  "h-12 px-4 rounded-xl text-sm font-medium transition-all disabled:opacity-70 focus:outline-none focus:ring-2 w-full";

const variantClasses: Record<
  NewsletterVariant,
  {
    input: string;
    button: string;
    successWrap: string;
    successInner: string;
    successIcon: string;
    successTitle: string;
    successText: string;
  }
> = {
  card: {
    input: `${baseInput} bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white`,
    button:
      "h-12 px-6 sm:px-7 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto shrink-0",
    successWrap: "bg-white rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-50 p-8",
    successInner: "flex items-start gap-4",
    successIcon:
      "w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200",
    successTitle: "text-lg font-extrabold text-slate-900 mb-1",
    successText: "text-sm text-slate-500 leading-relaxed",
  },
  inline: {
    input: `${baseInput} bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-indigo-500/30 focus:border-indigo-400`,
    button:
      "h-12 px-5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shrink-0",
    successWrap:
      "bg-emerald-50 border border-emerald-200 rounded-2xl p-4",
    successInner: "flex items-center gap-3",
    successIcon:
      "w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0",
    successTitle: "text-sm font-bold text-emerald-900",
    successText: "text-xs text-emerald-700",
  },
  minimal: {
    input: `${baseInput} bg-transparent border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-indigo-500/30 focus:border-indigo-400`,
    button:
      "h-12 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shrink-0",
    successWrap:
      "bg-emerald-50 rounded-xl p-3",
    successInner: "flex items-center gap-2",
    successIcon:
      "w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0",
    successTitle: "text-sm font-bold text-emerald-900",
    successText: "text-xs text-emerald-700",
  },
  split: {
    input: `${baseInput} bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white`,
    button:
      "h-12 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 flex items-center justify-center gap-2 w-full shrink-0",
    successWrap: "bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6",
    successInner: "flex items-center gap-4",
    successIcon:
      "w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-lg",
    successTitle: "text-base font-extrabold text-emerald-900 mb-1",
    successText: "text-sm text-emerald-700",
  },
  dark: {
    input: `${baseInput} bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:ring-white/30 focus:border-white/40 backdrop-blur-sm`,
    button:
      "h-12 px-6 sm:px-7 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-sm font-bold shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 flex items-center justify-center gap-2 w-full sm:w-auto shrink-0",
    successWrap:
      "bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm",
    successInner: "flex items-center gap-4",
    successIcon:
      "w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center shrink-0",
    successTitle: "text-base font-extrabold text-white mb-1",
    successText: "text-sm text-white/70",
  },
};

function cn(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(" ");
}
