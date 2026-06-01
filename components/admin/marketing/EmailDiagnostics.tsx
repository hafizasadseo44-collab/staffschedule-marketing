"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Mail,
  Server,
  Globe,
  Shield,
  Send,
  Copy,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
} from "lucide-react";

interface Diagnosis {
  configured: {
    apiKeySet: boolean;
    apiKeyLooksValid: boolean;
    apiKeyHint: string | null;
    fromHello: string;
    fromNewsletter: string;
    fromNoreply: string;
    contactInbox: string;
    siteUrl: string;
    turnstileConfigured: boolean;
  };
  resendConnection: { ok: boolean; status?: number; error?: string };
  domains: Array<{ id: string; name: string; status: string; region?: string }>;
  expectedDomain: string;
  matchingDomain: { name: string; status: string } | null;
  issues: Array<{ severity: "error" | "warning" | "info"; message: string; fix?: string }>;
  healthy: boolean;
}

export default function EmailDiagnostics({
  defaultExpanded = false,
}: {
  defaultExpanded?: boolean;
}) {
  const [data, setData] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [testTo, setTestTo] = useState("");
  const [testSender, setTestSender] = useState<"hello" | "newsletter" | "noreply">(
    "noreply"
  );
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    message?: string;
    error?: string;
    hint?: string;
  } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/email/diagnose", { cache: "no-store" });
      const d = await r.json();
      setData(d);
      if (!d.healthy && !defaultExpanded) setExpanded(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendTest = async () => {
    if (!testTo.trim()) return;
    setTesting(true);
    setTestResult(null);
    try {
      const r = await fetch("/api/admin/email/test-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: testTo.trim(), sender: testSender }),
      });
      const d = await r.json();
      setTestResult(d);
    } catch (e: any) {
      setTestResult({ ok: false, error: e.message });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex items-center gap-3 text-sm text-slate-400">
        <Loader2 className="w-4 h-4 animate-spin" /> Checking email setup...
      </div>
    );
  }
  if (!data) return null;

  const healthy = data.healthy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-3xl border overflow-hidden ${
        healthy
          ? "bg-gradient-to-br from-emerald-50 to-white border-emerald-200"
          : "bg-gradient-to-br from-rose-50 to-white border-rose-200"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/40 transition"
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            healthy
              ? "bg-emerald-500 text-white"
              : "bg-rose-500 text-white"
          }`}
        >
          {healthy ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
            Email setup{" "}
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                healthy
                  ? "bg-emerald-200 text-emerald-800"
                  : "bg-rose-200 text-rose-800"
              }`}
            >
              {healthy ? "Healthy" : "Issues found"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {healthy
              ? "Resend connected and domain verified. Emails are delivering."
              : `${data.issues.filter((i) => i.severity === "error").length} blocker(s) preventing emails from sending.`}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              load();
            }}
            className="p-2 rounded-lg hover:bg-white text-slate-500 hover:text-slate-700"
            title="Re-check"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-100 overflow-hidden"
          >
            <div className="p-5 space-y-5 bg-white">
              {/* Issues */}
              {data.issues.length > 0 && (
                <div className="space-y-2">
                  {data.issues.map((issue, i) => (
                    <IssueRow key={i} issue={issue} />
                  ))}
                </div>
              )}

              {/* Status grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <StatusCell
                  icon={Server}
                  label="RESEND_API_KEY"
                  ok={data.configured.apiKeySet && data.configured.apiKeyLooksValid}
                  detail={data.configured.apiKeyHint || "Not set"}
                />
                <StatusCell
                  icon={Globe}
                  label="Resend API reachable"
                  ok={data.resendConnection.ok}
                  detail={
                    data.resendConnection.ok
                      ? "200 OK"
                      : `HTTP ${data.resendConnection.status || "—"}${
                          data.resendConnection.error
                            ? ` · ${data.resendConnection.error.slice(0, 60)}`
                            : ""
                        }`
                  }
                />
                <StatusCell
                  icon={Shield}
                  label={`Domain ${data.expectedDomain}`}
                  ok={data.matchingDomain?.status === "verified"}
                  detail={
                    data.matchingDomain
                      ? `Status: ${data.matchingDomain.status}`
                      : "Not added to Resend"
                  }
                />
                <StatusCell
                  icon={Mail}
                  label="Sender addresses"
                  ok={true}
                  detail="3 senders configured"
                />
              </div>

              {/* Verified domains list */}
              {data.domains.length > 0 && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    Domains in your Resend account
                  </div>
                  <div className="space-y-1.5">
                    {data.domains.map((d) => (
                      <div key={d.id} className="flex items-center gap-2 text-sm">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            d.status === "verified"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        <span className="font-bold text-slate-900">{d.name}</span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            d.status === "verified"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {d.status}
                        </span>
                        {d.region && (
                          <span className="text-xs text-slate-400">{d.region}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Configured senders */}
              <details className="bg-slate-50 rounded-2xl border border-slate-100">
                <summary className="cursor-pointer p-4 text-[10px] font-black uppercase tracking-widest text-slate-500 list-none flex items-center gap-2">
                  <Info className="w-3 h-3" /> View configured senders
                </summary>
                <div className="px-4 pb-4 space-y-1 text-xs">
                  <SenderRow label="hello@" value={data.configured.fromHello} />
                  <SenderRow label="newsletter@" value={data.configured.fromNewsletter} />
                  <SenderRow label="noreply@" value={data.configured.fromNoreply} />
                  <SenderRow label="Contact inbox" value={data.configured.contactInbox} />
                  <SenderRow label="Site URL" value={data.configured.siteUrl} />
                </div>
              </details>

              {/* Test send */}
              <div className="border-t border-slate-100 pt-5">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                  <Send className="w-3 h-3" /> Send a test email
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={testTo}
                    onChange={(e) => setTestTo(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                  />
                  <select
                    value={testSender}
                    onChange={(e) => setTestSender(e.target.value as any)}
                    className="h-10 px-3 rounded-lg bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="noreply">From noreply@</option>
                    <option value="newsletter">From newsletter@</option>
                    <option value="hello">From hello@</option>
                  </select>
                  <button
                    onClick={sendTest}
                    disabled={!testTo.trim() || testing}
                    className="h-10 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    {testing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send test
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {testResult && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-3 p-3 rounded-lg text-sm ${
                        testResult.ok
                          ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                          : "bg-rose-50 border border-rose-200 text-rose-800"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {testResult.ok ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold leading-tight">
                            {testResult.ok ? "Sent!" : "Send failed"}
                          </div>
                          <p className="text-xs mt-1 leading-relaxed break-words">
                            {testResult.message || testResult.error}
                          </p>
                          {testResult.hint && (
                            <p className="text-xs mt-1 font-bold opacity-80">
                              💡 {testResult.hint}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Helpful links */}
              <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-2">
                <ExtLink href="https://resend.com/api-keys" label="API keys" />
                <ExtLink href="https://resend.com/domains" label="Domains" />
                <ExtLink href="https://resend.com/emails" label="Email log" />
                <ExtLink href="https://status.resend.com" label="Resend status" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function IssueRow({ issue }: { issue: any }) {
  const styles =
    issue.severity === "error"
      ? "bg-rose-50 border-rose-200 text-rose-900"
      : issue.severity === "warning"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : "bg-emerald-50 border-emerald-200 text-emerald-900";
  const Icon =
    issue.severity === "error"
      ? XCircle
      : issue.severity === "warning"
      ? AlertTriangle
      : CheckCircle2;
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border ${styles}`}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm leading-tight">{issue.message}</div>
        {issue.fix && (
          <p className="text-xs mt-1 leading-relaxed opacity-80">{issue.fix}</p>
        )}
      </div>
    </div>
  );
}

function StatusCell({
  icon: Icon,
  label,
  ok,
  detail,
}: {
  icon: any;
  label: string;
  ok: boolean;
  detail: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-xl border ${
        ok
          ? "bg-emerald-50/50 border-emerald-200"
          : "bg-rose-50/50 border-rose-200"
      }`}
    >
      <Icon
        className={`w-4 h-4 mt-0.5 shrink-0 ${
          ok ? "text-emerald-600" : "text-rose-600"
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          {label}
        </div>
        <div className="text-sm font-bold text-slate-900 truncate">{detail}</div>
      </div>
      <div className="shrink-0">
        {ok ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        ) : (
          <XCircle className="w-4 h-4 text-rose-600" />
        )}
      </div>
    </div>
  );
}

function SenderRow({ label, value }: { label: string; value: string }) {
  const copy = () => navigator.clipboard.writeText(value).catch(() => {});
  return (
    <div className="flex items-center gap-2 group">
      <span className="font-bold text-slate-500 w-24 shrink-0">{label}</span>
      <code className="text-slate-700 truncate flex-1">{value}</code>
      <button
        onClick={copy}
        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
      >
        <Copy className="w-3 h-3" />
      </button>
    </div>
  );
}

function ExtLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition"
    >
      <ExternalLink className="w-3 h-3" /> {label}
    </a>
  );
}
