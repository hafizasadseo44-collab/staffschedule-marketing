"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  Pin,
  PinOff,
  AlertOctagon,
  Loader2,
  ExternalLink,
  Shield,
  PenTool,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Inbox,
  ShieldAlert,
  Ban,
  History,
  Star,
  X,
  Briefcase,
  Network,
} from "lucide-react";

interface AdminComment {
  id: string;
  postId: string;
  parentId: string | null;
  name: string;
  email: string;
  company: string | null;
  avatar: string | null;
  content: string;
  status: "APPROVED" | "PENDING" | "REJECTED" | "SPAM";
  isPinned: boolean;
  isAuthor: boolean;
  isAdmin: boolean;
  isTrusted: boolean;
  spamScore: number;
  spamReasons: string | null;
  likeCount: number;
  ipAddress: string | null;
  createdAt: string;
  post: { id: string; title: string; slug: string };
  _count: { replies: number };
}

interface Stats {
  all: number;
  approved: number;
  pending: number;
  spam: number;
  rejected: number;
}

const STATUS_TABS = [
  { id: "ALL", label: "All", icon: Inbox, color: "text-slate-600" },
  { id: "PENDING", label: "Pending", icon: Clock, color: "text-amber-600" },
  { id: "APPROVED", label: "Approved", icon: CheckCircle2, color: "text-emerald-600" },
  { id: "SPAM", label: "Spam", icon: ShieldAlert, color: "text-rose-600" },
  { id: "REJECTED", label: "Rejected", icon: Ban, color: "text-slate-500" },
] as const;

const PAGE_SIZE = 20;

export default function CommentsManager() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("PENDING");
  const [page, setPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(
    null
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [historyEmail, setHistoryEmail] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      status,
      limit: String(PAGE_SIZE),
      offset: String(page * PAGE_SIZE),
    });
    if (search) params.set("search", search);
    try {
      const r = await fetch(`/api/admin/comments?${params}`, { cache: "no-store" });
      const data = await r.json();
      setComments(data.items || []);
      setStats(data.stats || null);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(0);
      load();
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const flash = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((curr) => {
      const next = new Set(curr);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const allSelected =
    comments.length > 0 && comments.every((c) => selectedIds.has(c.id));
  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(comments.map((c) => c.id)));
  };

  const doBulk = async (
    action: "approve" | "reject" | "spam" | "pin" | "unpin" | "delete" | "trust" | "untrust"
  ) => {
    if (selectedIds.size === 0) return;
    if (action === "delete" && !confirm(`Delete ${selectedIds.size} comment(s)? This cannot be undone.`)) return;

    const ids = Array.from(selectedIds);
    try {
      const r = await fetch("/api/admin/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, action }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      flash(`${data.count} comment(s) ${action}ed`);
      setSelectedIds(new Set());
      load();
    } catch (e: any) {
      flash(e.message, "err");
    }
  };

  const doSingle = async (
    id: string,
    action: "approve" | "reject" | "spam" | "pin" | "unpin" | "delete" | "trust" | "untrust"
  ) => {
    if (action === "delete" && !confirm("Delete this comment?")) return;
    try {
      const r = await fetch("/api/admin/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id], action }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      flash(
        action === "delete"
          ? "Comment deleted"
          : action === "approve"
          ? "Approved — commenter notified"
          : action === "reject"
          ? "Rejected"
          : action === "spam"
          ? "Marked as spam"
          : action === "trust"
          ? "Commenter trusted — future comments auto-approve"
          : action === "untrust"
          ? "Trust revoked"
          : action === "pin"
          ? "Pinned"
          : "Unpinned"
      );
      load();
    } catch (e: any) {
      flash(e.message, "err");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-violet-100 text-violet-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            Engagement
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mt-2">
            Comments
            {stats && (
              <>
                <span className="text-violet-600 ml-2">
                  {stats.all.toLocaleString()}
                </span>
                {stats.pending > 0 && (
                  <span className="ml-3 text-base align-middle px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold">
                    {stats.pending} pending
                  </span>
                )}
              </>
            )}
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Review, approve, and respond to discussions on your blog.
          </p>
        </div>
      </div>

      {/* Stats cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {STATUS_TABS.map((tab) => {
            const Icon = tab.icon;
            const count =
              tab.id === "ALL"
                ? stats.all
                : (stats as any)[tab.id.toLowerCase()] || 0;
            const isActive = status === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setStatus(tab.id);
                  setPage(0);
                  setSelectedIds(new Set());
                }}
                whileHover={{ y: -2 }}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-violet-600 to-purple-600 border-transparent text-white shadow-lg shadow-violet-200"
                    : "bg-white border-slate-200 hover:border-violet-200 shadow-sm"
                }`}
              >
                <Icon
                  className={`w-4 h-4 mb-2 ${isActive ? "text-white" : tab.color}`}
                />
                <div
                  className={`text-2xl font-extrabold tracking-tight ${
                    isActive ? "text-white" : "text-slate-900"
                  }`}
                >
                  {count.toLocaleString()}
                </div>
                <div
                  className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${
                    isActive ? "text-white/80" : "text-slate-400"
                  }`}
                >
                  {tab.label}
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by commenter name, email, or content..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
          />
        </div>
      </div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-wrap items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-2xl"
          >
            <span className="text-sm font-bold text-violet-700">
              {selectedIds.size} selected
            </span>
            <div className="h-5 w-px bg-violet-200" />
            <button
              onClick={() => doBulk("approve")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
            </button>
            <button
              onClick={() => doBulk("reject")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-600 text-white text-xs font-bold hover:bg-slate-700 transition"
            >
              <XCircle className="w-3.5 h-3.5" /> Reject
            </button>
            <button
              onClick={() => doBulk("spam")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition"
            >
              <AlertOctagon className="w-3.5 h-3.5" /> Mark spam
            </button>
            <button
              onClick={() => doBulk("trust")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition"
              title="Future comments from these emails auto-approve"
            >
              <Star className="w-3.5 h-3.5" /> Trust
            </button>
            <button
              onClick={() => doBulk("delete")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="ml-auto text-xs font-bold text-slate-500 hover:text-slate-700"
            >
              Clear selection
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-extrabold text-slate-700 mb-1">
              No comments found
            </h3>
            <p className="text-sm text-slate-400">
              {status === "PENDING"
                ? "Inbox zero — nothing to moderate."
                : "Adjust your filters to see more."}
            </p>
          </div>
        ) : (
          <>
            {/* Select-all row */}
            <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border-b border-slate-100">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500/20"
              />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                {allSelected ? "Deselect all" : "Select all on this page"}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {comments.map((c) => {
                const selected = selectedIds.has(c.id);
                const expanded = expandedId === c.id;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`group transition-colors ${
                      selected ? "bg-violet-50/30" : "hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 p-5">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleSelect(c.id)}
                        className="mt-3 w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500/20 shrink-0"
                      />

                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-xl overflow-hidden shadow-sm">
                          {c.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={c.avatar}
                              alt={c.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-sm">
                              {c.name[0]?.toUpperCase()}
                            </div>
                          )}
                        </div>
                        {c.isPinned && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-md">
                            <Pin className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <button
                            onClick={() => setHistoryEmail(c.email)}
                            className="font-bold text-sm text-slate-900 hover:text-violet-600 hover:underline transition"
                            title="View commenter history"
                          >
                            {c.name}
                          </button>
                          <span className="text-xs text-slate-400">{c.email}</span>
                          {c.company && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500">
                              <Briefcase className="w-2.5 h-2.5" />
                              {c.company}
                            </span>
                          )}
                          <StatusPill status={c.status} />
                          {c.isTrusted && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[9px] font-bold uppercase">
                              <Star className="w-2 h-2 fill-amber-700" /> Trusted
                            </span>
                          )}
                          {/* Spam score chip — color coded by risk */}
                          {typeof c.spamScore === "number" && c.spamScore > 0 && (
                            <span
                              title={c.spamReasons?.replace(/_/g, " ") || ""}
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                                c.spamScore >= 60
                                  ? "bg-rose-100 text-rose-700"
                                  : c.spamScore >= 25
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              <ShieldAlert className="w-2 h-2" /> {c.spamScore}
                            </span>
                          )}
                          {c.isAuthor && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-violet-100 text-violet-700 text-[9px] font-bold uppercase">
                              <PenTool className="w-2 h-2" /> Author
                            </span>
                          )}
                          {c.isAdmin && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase">
                              <Shield className="w-2 h-2" /> Staff
                            </span>
                          )}
                          {c.parentId && (
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              · reply
                            </span>
                          )}
                        </div>

                        {/* Spam reasons row (small) */}
                        {c.spamReasons && c.spamScore >= 25 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {c.spamReasons.split(",").slice(0, 4).map((r, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600"
                              >
                                {r.replace(/_/g, " ")}
                              </span>
                            ))}
                          </div>
                        )}

                        <p
                          className={`text-sm text-slate-700 leading-relaxed mb-3 whitespace-pre-wrap ${
                            expanded ? "" : "line-clamp-3"
                          }`}
                        >
                          {c.content}
                        </p>

                        <div className="flex items-center gap-3 text-xs flex-wrap">
                          <a
                            href={`/blog/${c.post.slug}#comments`}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-1 text-violet-600 font-bold hover:text-violet-700"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="max-w-[180px] sm:max-w-[260px] truncate">
                              {c.post.title}
                            </span>
                          </a>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-400 font-medium">
                            {new Date(c.createdAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {c.likeCount > 0 && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-400 font-medium">
                                ❤️ {c.likeCount}
                              </span>
                            </>
                          )}
                          {c.content.length > 180 && (
                            <button
                              onClick={() => setExpandedId(expanded ? null : c.id)}
                              className="text-slate-500 hover:text-violet-600 font-bold"
                            >
                              {expanded ? "Show less" : "Show more"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Quick actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setHistoryEmail(c.email)}
                          title="View commenter history"
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-violet-600 transition"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        {c.status !== "APPROVED" && (
                          <button
                            onClick={() => doSingle(c.id, "approve")}
                            title="Approve & email commenter"
                            className="p-2 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 transition"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => doSingle(c.id, c.isTrusted ? "untrust" : "trust")}
                          title={c.isTrusted ? "Revoke trust" : "Trust commenter (future auto-approve)"}
                          className={`p-2 rounded-lg transition ${
                            c.isTrusted
                              ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                              : "hover:bg-slate-50 hover:text-amber-600 text-slate-400"
                          }`}
                        >
                          <Star className={`w-4 h-4 ${c.isTrusted ? "fill-amber-600" : ""}`} />
                        </button>
                        {c.status !== "SPAM" && (
                          <button
                            onClick={() => doSingle(c.id, "spam")}
                            title="Mark as spam"
                            className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition"
                          >
                            <AlertOctagon className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => doSingle(c.id, c.isPinned ? "unpin" : "pin")}
                          title={c.isPinned ? "Unpin" : "Pin"}
                          className={`p-2 rounded-lg transition ${
                            c.isPinned
                              ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                              : "hover:bg-slate-50 hover:text-amber-600 text-slate-400"
                          }`}
                        >
                          {c.isPinned ? (
                            <PinOff className="w-4 h-4" />
                          ) : (
                            <Pin className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => doSingle(c.id, "delete")}
                          title="Delete"
                          className="p-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            {total > PAGE_SIZE && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
                <div className="text-xs text-slate-500 font-bold">
                  Showing {page * PAGE_SIZE + 1}–
                  {Math.min((page + 1) * PAGE_SIZE, total)} of {total}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-40 hover:border-violet-300 hover:text-violet-600"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-500">
                    {page + 1} / {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => p + 1)}
                    className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-40 hover:border-violet-300 hover:text-violet-600"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
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
              <AlertOctagon className="w-5 h-5" />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Commenter history modal */}
      <AnimatePresence>
        {historyEmail && (
          <CommenterHistoryModal
            email={historyEmail}
            onClose={() => setHistoryEmail(null)}
            onAfterAction={() => {
              load();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Commenter history modal ─────────────────────────────────────

function CommenterHistoryModal({
  email,
  onClose,
  onAfterAction,
}: {
  email: string;
  onClose: () => void;
  onAfterAction: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/admin/comments/history?email=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, [email]);

  const profile = data?.profile;
  const stats = data?.stats;
  const comments = data?.comments || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-4 min-w-0">
            {profile?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt=""
                className="w-12 h-12 rounded-xl shrink-0 shadow-md"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-black flex items-center justify-center shrink-0">
                {profile?.name?.[0]?.toUpperCase() || email[0].toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-extrabold text-slate-900 text-lg truncate">
                {profile?.name || email}
              </h3>
              <p className="text-xs text-slate-400 truncate">
                {email}
                {profile?.company && ` · ${profile.company}`}
              </p>
              {profile?.isTrusted && (
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">
                  <Star className="w-2.5 h-2.5 fill-amber-700" /> Trusted commenter
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading history...
          </div>
        ) : (
          <>
            {/* Stats grid */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-4 border-b border-slate-100 bg-slate-50">
                <StatCell label="Comments" value={stats.total} accent="text-slate-900" />
                <StatCell label="Approved" value={stats.APPROVED} accent="text-emerald-600" />
                <StatCell label="Pending" value={stats.PENDING} accent="text-amber-600" />
                <StatCell label="Spam" value={stats.SPAM} accent="text-rose-600" />
                <StatCell label="Avg risk" value={`${profile?.avgSpamScore ?? 0}`} accent={
                  (profile?.avgSpamScore ?? 0) >= 60
                    ? "text-rose-600"
                    : (profile?.avgSpamScore ?? 0) >= 25
                    ? "text-amber-600"
                    : "text-emerald-600"
                } />
              </div>
            )}

            {/* IP + first seen */}
            {profile && (
              <div className="flex items-center gap-4 px-5 py-3 border-b border-slate-100 text-xs text-slate-500 flex-wrap">
                {profile.ipAddress && (
                  <span className="flex items-center gap-1.5">
                    <Network className="w-3 h-3" />
                    <span className="font-mono">{profile.ipAddress}</span>
                  </span>
                )}
                {profile.firstSeen && (
                  <span>
                    First seen{" "}
                    <strong className="text-slate-700">
                      {new Date(profile.firstSeen).toLocaleDateString()}
                    </strong>
                  </span>
                )}
                <span>
                  Across <strong className="text-slate-700">{profile.uniquePosts}</strong> post(s)
                </span>
              </div>
            )}

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {comments.map((c: any) => (
                <div key={c.id} className="p-4 hover:bg-slate-50">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <StatusPill status={c.status} />
                    {c.spamScore > 0 && (
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                          c.spamScore >= 60
                            ? "bg-rose-100 text-rose-700"
                            : c.spamScore >= 25
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        risk {c.spamScore}
                      </span>
                    )}
                    <a
                      href={`/blog/${c.post?.slug}#comments`}
                      target="_blank"
                      rel="noopener"
                      className="text-xs font-bold text-violet-600 hover:text-violet-700 truncate max-w-[280px]"
                    >
                      {c.post?.title}
                    </a>
                    <span className="text-xs text-slate-400">
                      · {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 whitespace-pre-wrap">
                    {c.content}
                  </p>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="text-center py-12 text-sm text-slate-400">
                  No prior comments
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function StatCell({ label, value, accent }: { label: string; value: any; accent: string }) {
  return (
    <div className="text-center">
      <div className={`text-xl font-extrabold tracking-tight ${accent}`}>
        {value}
      </div>
      <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5">
        {label}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    APPROVED: { bg: "bg-emerald-100", text: "text-emerald-700" },
    PENDING: { bg: "bg-amber-100", text: "text-amber-700" },
    SPAM: { bg: "bg-rose-100", text: "text-rose-700" },
    REJECTED: { bg: "bg-slate-100", text: "text-slate-600" },
  };
  const s = map[status] || map.PENDING;
  return (
    <span
      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${s.bg} ${s.text}`}
    >
      {status}
    </span>
  );
}
