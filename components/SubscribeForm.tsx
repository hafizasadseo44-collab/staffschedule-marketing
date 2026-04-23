"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

interface SubscribeFormProps {
  type?: "blog" | "news" | "guides" | "all";
  layout?: "horizontal" | "vertical";
  buttonText?: string;
  variant?: "light" | "dark";
}

export default function SubscribeForm({
  type = "all",
  layout = "horizontal",
  buttonText = "Subscribe",
  variant = "light",
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const preferences = {
        blog: type === "blog" || type === "all",
        news: type === "news" || type === "all",
        guides: type === "guides" || type === "all",
      };

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, preferences }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-3 p-4 rounded-2xl ${
          variant === "dark"
            ? "bg-white/10 border border-white/20 text-white"
            : "bg-emerald-50 border border-emerald-100 text-emerald-700"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            variant === "dark" ? "bg-emerald-500/20" : "bg-emerald-100"
          }`}
        >
          <CheckCircle2 className={`w-5 h-5 ${variant === "dark" ? "text-emerald-400" : "text-emerald-600"}`} />
        </div>
        <div>
          <h4 className="font-bold text-sm">You&apos;re subscribed successfully!</h4>
          <p className={`text-xs font-medium ${variant === "dark" ? "text-white/60" : "text-emerald-600/80"}`}>
            Keep an eye on your inbox for updates.
          </p>
        </div>
      </motion.div>
    );
  }

  const isDark = variant === "dark";

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex ${
        layout === "horizontal" ? "flex-col sm:flex-row gap-3" : "flex-col gap-3"
      } w-full max-w-md`}
    >
      <div className="relative flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email address"
          required
          disabled={status === "loading"}
          className={`w-full h-12 pl-5 pr-4 rounded-xl transition-all disabled:opacity-70 font-medium text-sm
            ${
              isDark
                ? "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
                : "bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            }
            ${status === "error" ? (isDark ? "border-red-400/50" : "border-red-300") : ""}
          `}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={`h-12 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-sm
          ${layout === "vertical" ? "w-full" : "w-full sm:w-auto shrink-0"}
          ${isDark ? "bg-white text-indigo-600 hover:bg-white/90" : "bg-indigo-600 hover:bg-indigo-700 text-white"}
        `}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {buttonText}
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-1.5 text-xs font-bold mt-1 ${
            isDark ? "text-red-300" : "text-red-500"
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          {errorMessage}
        </motion.div>
      )}
    </form>
  );
}
