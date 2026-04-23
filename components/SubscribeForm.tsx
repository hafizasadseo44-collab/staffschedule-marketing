"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

interface SubscribeFormProps {
  type?: "blog" | "news" | "guides" | "all";
  layout?: "horizontal" | "vertical";
  buttonText?: string;
}

export default function SubscribeForm({ 
  type = "all", 
  layout = "horizontal",
  buttonText = "Subscribe"
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

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
        className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700"
      >
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h4 className="font-bold text-sm">You're subscribed successfully!</h4>
          <p className="text-xs font-medium text-emerald-600/80">Keep an eye on your inbox for updates.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex ${layout === "horizontal" ? "flex-col sm:flex-row gap-3" : "flex-col gap-4"} w-full max-w-md`}>
      <div className="relative flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          disabled={status === "loading"}
          className="w-full h-12 pl-5 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all disabled:opacity-70 font-medium"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={`h-12 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed ${layout === "vertical" ? "w-full" : "w-full sm:w-auto shrink-0"}`}
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
        <div className="absolute -bottom-6 left-2 flex items-center gap-1.5 text-red-500 text-xs font-bold mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {errorMessage}
        </div>
      )}
    </form>
  );
}
