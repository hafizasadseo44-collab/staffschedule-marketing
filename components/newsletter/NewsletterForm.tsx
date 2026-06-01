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

  // SPLIT variant — Premium animated hero card with mesh gradient,
  // floating orbs, glassmorphism input, social proof stack, and a
  // shimmer on the CTA. Designed for bottom-of-article placement where
  // we want maximum conversion impact.
  if (variant === "split") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative overflow-hidden rounded-[2rem] isolate",
          // Animated gradient border via outer wrapper
          "p-[1.5px] bg-gradient-to-br from-indigo-400/40 via-purple-400/40 to-pink-400/40 shadow-[0_30px_80px_-30px_rgba(109,93,246,0.5)]",
          className
        )}
      >
        <div className="relative rounded-[calc(2rem-1.5px)] overflow-hidden bg-slate-950">
          {/* ─── Animated mesh gradient background ─── */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F0A2E] via-[#1A1247] to-[#2D1B69]" />

            {/* Floating mesh orbs */}
            <motion.div
              animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0], scale: [1, 1.15, 0.95, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full opacity-60"
              style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(109,93,246,0.2) 40%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <motion.div
              animate={{ x: [0, -40, 30, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.1, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full opacity-50"
              style={{
                background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, rgba(168,85,247,0.2) 40%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <motion.div
              animate={{ x: [0, 30, -20, 0], y: [0, -20, 20, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full opacity-40"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
              }}
            />
          </div>

          <div className="relative grid md:grid-cols-5 gap-0">
            {/* ─── LEFT: Marketing copy (3 cols) ─── */}
            <div className="md:col-span-3 p-8 md:p-12 lg:p-14 relative">
              {/* Premium badge with glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400 rounded-full blur-md opacity-60" />
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 relative" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90">
                  The Workforce Brief
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                  Live
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] mb-5"
              >
                {heading?.split(/(?<=\s)/).slice(0, -2).join("") ||
                  "Enjoyed this "}
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300"
                    style={{
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {heading?.split(/(?<=\s)/).slice(-2).join("") || "article?"}
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 rounded-full"
                  />
                </span>
              </motion.h3>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-white/70 leading-relaxed mb-7 max-w-lg font-medium"
              >
                {subheading ||
                  "Join 12,000+ operations leaders who get our best scheduling playbooks, AI workforce trends, and product launches first."}
              </motion.p>

              {/* Trust bullets — premium glass pills */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {[
                  { icon: "⚡", text: "Weekly digest" },
                  { icon: "📚", text: "Exclusive guides" },
                  { icon: "🎁", text: "Beta access" },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55 + i * 0.08 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white/90"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span>{b.icon}</span>
                    <span>{b.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social proof: avatar stack + rating */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-4 flex-wrap"
              >
                {/* Avatar stack */}
                <div className="flex -space-x-2.5">
                  {[
                    "from-rose-400 to-pink-500",
                    "from-amber-400 to-orange-500",
                    "from-emerald-400 to-teal-500",
                    "from-cyan-400 to-blue-500",
                    "from-violet-400 to-purple-500",
                  ].map((c, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-9 h-9 rounded-full border-2 border-slate-900 bg-gradient-to-br shadow-lg ring-1 ring-white/10",
                        c
                      )}
                    />
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-slate-900 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[9px] font-black text-white">
                    +12K
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-white/60 font-medium">
                    <span className="text-white font-bold">4.9/5</span> from
                    1,200+ reviews
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ─── RIGHT: Form card with glassmorphism (2 cols) ─── */}
            <div className="md:col-span-2 p-8 md:p-12 lg:p-14 md:pl-0 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative rounded-2xl p-6 md:p-7"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
                }}
              >
                <div className="mb-5">
                  <h4 className="text-xl font-extrabold text-white mb-1 tracking-tight">
                    Subscribe — it&apos;s free
                  </h4>
                  <p className="text-xs text-white/60 font-medium">
                    No credit card · Unsubscribe with one click
                  </p>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
                      className="h-12 px-4 rounded-xl text-sm font-medium transition-all disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/10 border border-white/15 text-white placeholder:text-white/40 backdrop-blur-sm"
                    />
                  )}

                  <div className="relative">
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
                      className="w-full h-13 pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-300/40 focus:bg-white/15 backdrop-blur-sm transition-all disabled:opacity-70"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="relative h-13 py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #6D5DF6 0%, #A855F7 50%, #EC4899 100%)",
                      boxShadow: "0 10px 30px -5px rgba(168, 85, 247, 0.5)",
                    }}
                  >
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative flex items-center gap-2">
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          {cta}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
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

                <p className="mt-5 text-[11px] text-white/40 font-medium leading-relaxed">
                  By subscribing you agree to our{" "}
                  <a
                    href="/privacy"
                    className="underline hover:text-violet-300 transition"
                  >
                    Privacy Policy
                  </a>
                  . We&apos;ll never share your data.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
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
