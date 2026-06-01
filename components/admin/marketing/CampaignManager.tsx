"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Plus,
  Send,
  Eye,
  Trash2,
  Pencil,
  Calendar,
  MousePointerClick,
  Inbox,
  FileText,
  Users,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import EmailDiagnostics from "./EmailDiagnostics";
import SubjectAnalyzer from "./SubjectAnalyzer";

interface Campaign {
  id: string;
  type: string;
  name: string;
  subject: string;
  status: string;
  totalRecipients: number;
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  scheduledFor: string | null;
  sentAt: string | null;
  createdAt: string;
  contentHtml: string;
  fromName: string;
  fromEmail: string;
}

export default function CampaignManager() {
  const [items, setItems] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [previewCampaign, setPreviewCampaign] = useState<Campaign | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [sendingDigest, setSendingDigest] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(
    null
  );

  const load = async () => {
    setLoading(true);
    const [cR, pR] = await Promise.all([
      fetch("/api/admin/campaigns", { cache: "no-store" }),
      fetch("/api/posts?published=true", { cache: "no-store" }),
    ]);
    const cData = await cR.json();
    const pData = await pR.json();
    setItems(cData.items || []);
    setPosts(Array.isArray(pData) ? pData.filter((p) => p.published) : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSend = async (id: string) => {
    if (!confirm("Send this campaign to all matching subscribers? This cannot be undone."))
      return;
    showToast("Sending campaign...", "ok");
    const r = await fetch(`/api/admin/campaigns/${id}/send`, { method: "POST" });
    const data = await r.json();
    if (r.ok) {
      showToast(`Campaign sent to ${data.sent} subscribers`, "ok");
      load();
    } else {
      showToast(data.error || "Send failed", "err");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this campaign?")) return;
    await fetch(`/api/admin/campaigns/${id}`, { method: "DELETE" });
    setItems((arr) => arr.filter((c) => c.id !== id));
  };

  const sendDigestNow = async () => {
    if (!confirm("Send the Weekly Digest now to all subscribers opted into weeklyDigest?"))
      return;
    setSendingDigest(true);
    const r = await fetch("/api/admin/digest/send", { method: "POST" });
    const data = await r.json();
    setSendingDigest(false);
    if (r.ok) {
      if (data.skipped) {
        showToast("No new content this week — digest skipped", "err");
      } else {
        showToast(`Weekly Digest sent to ${data.sent}`, "ok");
      }
      load();
    } else {
      showToast(data.error || "Digest send failed", "err");
    }
  };

  const sendFromPost = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    if (!confirm(`Send "${post.title}" as a newsletter to all blog subscribers?`)) return;
    showToast("Generating and sending campaign...", "ok");
    const r = await fetch("/api/admin/campaigns/from-blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });
    const data = await r.json();
    if (r.ok) {
      showToast(`Campaign sent to ${data.sent} subscribers`, "ok");
      load();
    } else {
      showToast(data.error || "Send failed", "err");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            Marketing
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mt-2">
            Campaigns
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Send beautiful, branded emails to your subscribers.
          </p>
        </div>
        {/* Right side action area filled by buttons below */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={sendDigestNow}
            disabled={sendingDigest}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition shadow-sm text-sm font-bold text-slate-700 disabled:opacity-60"
          >
            {sendingDigest ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Inbox className="w-4 h-4" />
            )}
            Send Weekly Digest
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-all text-sm font-bold"
          >
            <Plus className="w-4 h-4" /> Create Campaign
          </button>
        </div>
      </div>

      {/* Email setup diagnostics — auto-expands when something's broken */}
      <EmailDiagnostics />

      {/* From-blog quick action */}
      {posts.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 via-violet-50 to-purple-50 rounded-3xl border border-indigo-100 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-slate-900">
                Send a published post as a newsletter
              </h3>
              <p className="text-sm text-slate-600 mt-1 mb-4">
                Auto-generates a beautiful branded email from any published blog
                post.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {posts.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => sendFromPost(p.id)}
                    className="flex items-center gap-3 text-left p-3 bg-white rounded-xl border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition"
                  >
                    <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-sm font-bold text-slate-900 truncate">
                      {p.title}
                    </span>
                    <Send className="w-3.5 h-3.5 text-slate-400 ml-auto shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign list */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading campaigns...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Send className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-extrabold text-slate-700 mb-1">
              No campaigns yet
            </h3>
            <p className="text-sm text-slate-400 mb-5">
              Send your first newsletter from a blog post above, or create one
              manually.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((c) => {
              const openRate =
                c.totalSent === 0
                  ? 0
                  : Math.round((c.totalOpened / c.totalSent) * 100);
              const clickRate =
                c.totalSent === 0
                  ? 0
                  : Math.round((c.totalClicked / c.totalSent) * 100);
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 hover:bg-slate-50 transition group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          {c.type}
                        </span>
                        <StatusPill status={c.status} />
                      </div>
                      <div className="font-extrabold text-slate-900 truncate">
                        {c.name}
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {c.subject}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs">
                      <Stat icon={Users} label="Sent" value={c.totalSent} />
                      <Stat
                        icon={Eye}
                        label="Open"
                        value={`${openRate}%`}
                        secondary={String(c.totalOpened)}
                      />
                      <Stat
                        icon={MousePointerClick}
                        label="Click"
                        value={`${clickRate}%`}
                        secondary={String(c.totalClicked)}
                      />
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setPreviewCampaign(c)}
                        className="p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 transition"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {(c.status === "DRAFT" || c.status === "SCHEDULED") && (
                        <button
                          onClick={() => handleSend(c.id)}
                          className="p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 transition"
                          title="Send now"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold ${
            toast.type === "ok"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          {toast.type === "ok" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {toast.msg}
        </motion.div>
      )}

      {/* Create modal */}
      {showCreate && (
        <CreateCampaignModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            load();
          }}
        />
      )}

      {/* Preview modal */}
      {previewCampaign && (
        <PreviewModal
          campaign={previewCampaign}
          onClose={() => setPreviewCampaign(null)}
        />
      )}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    SENT: { bg: "bg-emerald-100", text: "text-emerald-700" },
    SENDING: { bg: "bg-amber-100", text: "text-amber-700" },
    DRAFT: { bg: "bg-slate-100", text: "text-slate-600" },
    SCHEDULED: { bg: "bg-indigo-100", text: "text-indigo-700" },
    FAILED: { bg: "bg-rose-100", text: "text-rose-700" },
    CANCELLED: { bg: "bg-slate-100", text: "text-slate-500" },
  };
  const s = map[status] || map.DRAFT;
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${s.bg} ${s.text}`}
    >
      {status}
    </span>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  secondary,
}: {
  icon: any;
  label: string;
  value: string | number;
  secondary?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-slate-300" />
      <div>
        <div className="font-extrabold text-slate-900 text-sm">{value}</div>
        <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
          {label} {secondary && `· ${secondary}`}
        </div>
      </div>
    </div>
  );
}

function CreateCampaignModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [html, setHtml] = useState(
    `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;color:#0f172a">
  <h1 style="font-size:28px;font-weight:800;margin:0 0 16px;letter-spacing:-0.5px">Your headline here</h1>
  <p style="font-size:16px;line-height:1.7;color:#64748b;margin:0 0 24px">
    Write your message here. Use clear, conversational copy and one strong call-to-action.
  </p>
  <a href="https://staffschedule.io" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#6D5DF6,#A855F7);color:#fff;border-radius:12px;font-weight:700;text-decoration:none">Call to action →</a>
  <p style="margin-top:32px;font-size:13px;color:#94a3b8">
    <a href="{{preferences_url}}" style="color:#6D5DF6">Manage preferences</a> · <a href="{{unsubscribe_url}}" style="color:#94a3b8">Unsubscribe</a>
  </p>
</div>`
  );
  const [prefs, setPrefs] = useState<string[]>(["announcements"]);
  const [saving, setSaving] = useState(false);

  const PREF_OPTIONS = [
    { value: "blog", label: "Blog Updates" },
    { value: "news", label: "News" },
    { value: "guides", label: "Guides" },
    { value: "productUpdates", label: "Product Updates" },
    { value: "schedulingTips", label: "Scheduling Tips" },
    { value: "industryInsights", label: "Industry Insights" },
    { value: "featureReleases", label: "Feature Releases" },
    { value: "announcements", label: "Announcements" },
    { value: "weeklyDigest", label: "Weekly Digest" },
  ];

  const togglePref = (v: string) => {
    setPrefs((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  };

  const save = async (status: "DRAFT" | "SENT") => {
    setSaving(true);
    try {
      const r = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subject,
          preheader,
          contentHtml: html,
          audience: { preferences: prefs },
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      if (status === "SENT") {
        await fetch(`/api/admin/campaigns/${data.id}/send`, { method: "POST" });
      }
      onCreated();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-900">
            Create Campaign
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Campaign Name (internal)
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="March product launch"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Subject Line
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Quick read for your Monday morning"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
            <SubjectAnalyzer
              value={subject}
              onPickSuggestion={(s) => setSubject(s)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Preview Text
            </label>
            <input
              value={preheader}
              onChange={(e) => setPreheader(e.target.value)}
              placeholder="Shows next to subject in the inbox"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Send To (preferences)
            </label>
            <div className="flex flex-wrap gap-2">
              {PREF_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  onClick={() => togglePref(o.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    prefs.includes(o.value)
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              HTML Body — use{" "}
              <code className="text-indigo-600">{`{{unsubscribe_url}}`}</code>{" "}
              and{" "}
              <code className="text-indigo-600">{`{{preferences_url}}`}</code>
            </label>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            disabled={!name || !subject || !html || saving}
            onClick={() => save("DRAFT")}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            disabled={!name || !subject || !html || prefs.length === 0 || saving}
            onClick={() => save("SENT")}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 disabled:opacity-50 inline-flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Send Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function PreviewModal({
  campaign,
  onClose,
}: {
  campaign: Campaign;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Preview
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 truncate">
              {campaign.subject}
            </h2>
            <div className="text-xs text-slate-400 mt-0.5">
              From: {campaign.fromName} &lt;{campaign.fromEmail}&gt;
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-slate-100 p-6">
          <iframe
            srcDoc={campaign.contentHtml || "<p>Preview will be available after the first send.</p>"}
            className="w-full h-[70vh] rounded-2xl bg-white border border-slate-200 shadow-sm"
            sandbox="allow-same-origin"
          />
        </div>
      </motion.div>
    </div>
  );
}
