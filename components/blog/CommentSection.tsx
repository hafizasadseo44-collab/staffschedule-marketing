"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Reply,
  Send,
  Clock,
  Pin,
  Shield,
  PenTool,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Info,
} from "lucide-react";
import Turnstile from "@/components/ui/Turnstile";

interface Comment {
  id: string;
  postId: string;
  parentId: string | null;
  name: string;
  company: string | null;
  avatar: string | null;
  content: string;
  status: string;
  isPinned: boolean;
  isAuthor: boolean;
  isAdmin: boolean;
  isTrusted: boolean;
  likeCount: number;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  postSlug: string;
  initialComments?: Comment[];
  initialTotal?: number;
  initialHasMore?: boolean;
  turnstileSiteKey?: string | null;
}

type SortMode = "newest" | "oldest" | "popular";

const PAGE_SIZE = 10;
const MIN_CONTENT = 20;
const MAX_CONTENT = 1000;

// Stable per-browser identifier for like deduplication.
function getFingerprint(): string {
  if (typeof window === "undefined") return "";
  let fp = localStorage.getItem("ss_fp");
  if (!fp) {
    fp =
      "ss_" +
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2) +
      Date.now().toString(36);
    localStorage.setItem("ss_fp", fp);
  }
  return fp;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Linkify URLs in plain text with rel="nofollow ugc noopener" target="_blank".
// We accept plain text only — anchors are NEVER user-provided HTML.
function linkifyContent(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /(https?:\/\/[^\s)]+)/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));
    const url = m[0];
    let display = url.replace(/^https?:\/\//, "");
    if (display.length > 40) display = display.slice(0, 40) + "…";
    parts.push(
      <a
        key={`l-${key++}`}
        href={url}
        target="_blank"
        rel="nofollow ugc noopener noreferrer"
        className="text-violet-600 hover:text-violet-700 underline underline-offset-2 break-all"
      >
        {display}
      </a>
    );
    lastIdx = m.index + url.length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts.length > 0 ? parts : text;
}

export default function CommentSection({
  postId,
  postSlug,
  initialComments = [],
  initialTotal = 0,
  initialHasMore = false,
  turnstileSiteKey,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [total, setTotal] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sort, setSort] = useState<SortMode>("newest");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [collapsedReplies, setCollapsedReplies] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLDivElement>(null);

  // Persisted user identity
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("ss_comment_name") || "");
    setEmail(localStorage.getItem("ss_comment_email") || "");
    setCompany(localStorage.getItem("ss_comment_company") || "");
    const stored = localStorage.getItem("ss_liked_comments");
    if (stored) {
      try {
        setLikedIds(new Set(JSON.parse(stored)));
      } catch {}
    }
  }, []);

  const persistLiked = (set: Set<string>) => {
    setLikedIds(new Set(set));
    localStorage.setItem("ss_liked_comments", JSON.stringify(Array.from(set)));
  };

  const fetchPage = async (p: number, append: boolean) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    try {
      const r = await fetch(
        `/api/comments?postId=${postId}&sort=${sort}&page=${p}&pageSize=${PAGE_SIZE}`,
        { cache: "no-store" }
      );
      const data = await r.json();
      if (append) {
        setComments((prev) => [...prev, ...(data.comments || [])]);
      } else {
        setComments(data.comments || []);
      }
      setTotal(data.total || 0);
      setHasMore(!!data.hasMore);
      setPage(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Refetch when sort changes (always page 1)
  useEffect(() => {
    fetchPage(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const handleLike = async (id: string) => {
    const wasLiked = likedIds.has(id);
    const updated = new Set(likedIds);
    if (wasLiked) updated.delete(id);
    else updated.add(id);
    persistLiked(updated);
    setComments((arr) => bumpLike(arr, id, wasLiked ? -1 : 1));

    try {
      const r = await fetch(`/api/comments/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: getFingerprint() }),
      });
      const data = await r.json();
      if (r.ok) {
        setComments((arr) => setLikeCount(arr, id, data.likeCount));
      } else {
        persistLiked(likedIds);
        setComments((arr) => bumpLike(arr, id, wasLiked ? 1 : -1));
      }
    } catch {
      persistLiked(likedIds);
      setComments((arr) => bumpLike(arr, id, wasLiked ? 1 : -1));
    }
  };

  const handleReplyClick = (id: string) => {
    setReplyingTo(id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSubmitted = (comment: Comment | null, status: string) => {
    if (status !== "APPROVED" || !comment) return; // moderation queue
    setComments((arr) => {
      if (comment.parentId) {
        return arr.map((c) =>
          c.id === comment.parentId
            ? { ...c, replies: [...(c.replies || []), comment] }
            : c
        );
      }
      return [comment, ...arr];
    });
    setTotal((t) => t + 1);
    setReplyingTo(null);
  };

  const toggleReplies = (id: string) => {
    const next = new Set(collapsedReplies);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCollapsedReplies(next);
  };

  return (
    <section className="mt-12 sm:mt-16 scroll-mt-24" id="comments">
      {/* ── Compact header ── */}
      <div className="flex items-end justify-between gap-3 mb-6 flex-wrap">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-50 border border-violet-100 mb-2">
            <MessageCircle className="w-3 h-3 text-violet-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-700">
              Discussion
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {total === 0
              ? "Be the first to comment"
              : `${total} ${total === 1 ? "comment" : "comments"}`}
          </h2>
        </div>
        {total > 1 && (
          <div className="flex items-center gap-0.5 p-0.5 bg-white rounded-xl border border-slate-200 shadow-sm">
            {(
              [
                { id: "newest", label: "New" },
                { id: "popular", label: "Top" },
                { id: "oldest", label: "Old" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSort(opt.id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  sort === opt.id
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-violet-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Form ── */}
      <div ref={formRef}>
        <CommentForm
          postId={postId}
          postSlug={postSlug}
          parentId={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
          replyingToName={
            replyingTo
              ? comments
                  .flatMap((c) => [c, ...(c.replies || [])])
                  .find((c) => c.id === replyingTo)?.name
              : null
          }
          name={name}
          email={email}
          company={company}
          setName={setName}
          setEmail={setEmail}
          setCompany={setCompany}
          onSubmitted={handleSubmitted}
          turnstileSiteKey={turnstileSiteKey || null}
        />
      </div>

      {/* ── List ── */}
      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-10 text-slate-400 gap-2 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 bg-gradient-to-br from-slate-50 to-violet-50/30 rounded-2xl border border-slate-100">
            <Sparkles className="w-5 h-5 text-violet-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">
              Start the conversation
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Be the first to share your perspective.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {comments.map((c, i) => (
                <CommentCard
                  key={c.id}
                  comment={c}
                  index={i}
                  likedIds={likedIds}
                  onLike={handleLike}
                  onReply={handleReplyClick}
                  isReplyTarget={replyingTo === c.id}
                  collapsedReplies={collapsedReplies}
                  toggleReplies={toggleReplies}
                />
              ))}
            </AnimatePresence>

            {hasMore && (
              <div className="pt-2">
                <button
                  onClick={() => fetchPage(page + 1, true)}
                  disabled={loadingMore}
                  className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-violet-300 hover:text-violet-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading
                      more...
                    </>
                  ) : (
                    <>
                      Load more comments <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Compact comment card ──────────────────────────────────

function CommentCard({
  comment,
  index,
  likedIds,
  onLike,
  onReply,
  isReplyTarget,
  collapsedReplies,
  toggleReplies,
  isReply = false,
}: {
  comment: Comment;
  index: number;
  likedIds: Set<string>;
  onLike: (id: string) => void;
  onReply: (id: string) => void;
  isReplyTarget: boolean;
  collapsedReplies: Set<string>;
  toggleReplies: (id: string) => void;
  isReply?: boolean;
}) {
  const liked = likedIds.has(comment.id);
  const repliesHidden = collapsedReplies.has(comment.id);
  const replyCount = comment.replies?.length || 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.15) }}
      className={`relative ${isReply ? "ml-4 sm:ml-10" : ""}`}
    >
      {/* Connector for replies */}
      {isReply && (
        <div className="absolute left-[-14px] sm:left-[-30px] top-0 bottom-3 w-[2px] bg-gradient-to-b from-slate-200 to-transparent rounded-full" />
      )}

      <div
        className={`relative bg-white rounded-2xl border transition-all ${
          comment.isPinned
            ? "border-amber-200/60 bg-gradient-to-br from-amber-50/40 to-white"
            : isReplyTarget
            ? "border-violet-300 shadow-md shadow-violet-100"
            : "border-slate-100 hover:border-slate-200 shadow-sm"
        }`}
      >
        {comment.isPinned && (
          <div className="absolute -top-2 left-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider shadow-md">
            <Pin className="w-2.5 h-2.5" /> Pinned
          </div>
        )}

        <div className="flex gap-3 p-3.5 sm:p-4">
          {/* Avatar — smaller */}
          <div className="relative shrink-0">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden ${
                comment.isAdmin || comment.isAuthor
                  ? "ring-2 ring-violet-400 ring-offset-1 ring-offset-white"
                  : ""
              }`}
            >
              {comment.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={comment.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xs">
                  {initials(comment.name)}
                </div>
              )}
            </div>
            {(comment.isAdmin || comment.isAuthor) && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-[1.5px] border-white flex items-center justify-center">
                {comment.isAdmin ? (
                  <Shield className="w-2 h-2 text-white" />
                ) : (
                  <PenTool className="w-2 h-2 text-white" />
                )}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5 text-[13px]">
              <span className="font-bold text-slate-900 truncate max-w-[180px] sm:max-w-none">
                {comment.name}
              </span>
              {comment.company && (
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[11px] text-slate-400 font-medium">
                  <Briefcase className="w-2.5 h-2.5" />
                  {comment.company}
                </span>
              )}
              {comment.isAuthor && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0 rounded bg-violet-100 text-violet-700 text-[9px] font-bold uppercase tracking-wider">
                  Author
                </span>
              )}
              {comment.isAdmin && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">
                  Staff
                </span>
              )}
              <span className="text-[11px] text-slate-400 font-medium">
                · {timeAgo(comment.createdAt)}
              </span>
            </div>

            <div className="text-[14px] sm:text-[14.5px] text-slate-700 leading-[1.6] whitespace-pre-wrap break-words">
              {linkifyContent(comment.content)}
            </div>

            <div className="flex items-center gap-0.5 mt-2 -ml-2">
              <button
                onClick={() => onLike(comment.id)}
                className={`group inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  liked
                    ? "text-rose-600 hover:bg-rose-50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-rose-500"
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-all ${
                    liked
                      ? "fill-rose-500 text-rose-500 scale-110"
                      : "group-hover:scale-110"
                  }`}
                />
                {comment.likeCount > 0 ? comment.likeCount : "Like"}
              </button>
              {!isReply && (
                <button
                  onClick={() => onReply(comment.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-violet-600 transition"
                >
                  <Reply className="w-3.5 h-3.5" /> Reply
                </button>
              )}
              {!isReply && replyCount > 0 && (
                <button
                  onClick={() => toggleReplies(comment.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-violet-600 transition"
                >
                  {repliesHidden ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronUp className="w-3.5 h-3.5" />
                  )}
                  {replyCount} {replyCount === 1 ? "reply" : "replies"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isReply && replyCount > 0 && !repliesHidden && (
        <div className="mt-3 space-y-3">
          {comment.replies!.map((r, i) => (
            <CommentCard
              key={r.id}
              comment={r}
              index={i}
              likedIds={likedIds}
              onLike={onLike}
              onReply={onReply}
              isReplyTarget={false}
              collapsedReplies={collapsedReplies}
              toggleReplies={toggleReplies}
              isReply
            />
          ))}
        </div>
      )}
    </motion.article>
  );
}

// ─── Compact form ─────────────────────────────────────────

function CommentForm({
  postId,
  postSlug,
  parentId,
  replyingToName,
  onCancelReply,
  name,
  email,
  company,
  setName,
  setEmail,
  setCompany,
  onSubmitted,
  turnstileSiteKey,
}: {
  postId: string;
  postSlug: string;
  parentId: string | null;
  replyingToName: string | null | undefined;
  onCancelReply: () => void;
  name: string;
  email: string;
  company: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setCompany: (v: string) => void;
  onSubmitted: (comment: Comment | null, status: string) => void;
  turnstileSiteKey: string | null;
}) {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState(""); // honeypot
  const [website, setWebsite] = useState(""); // legacy honeypot too
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const charCount = content.length;
  const tooShort = charCount > 0 && charCount < MIN_CONTENT;
  const overLimit = charCount > MAX_CONTENT;
  const charsRemaining = MAX_CONTENT - charCount;

  const canSubmit =
    !submitting &&
    name.trim().length >= 2 &&
    email.trim().length > 5 &&
    charCount >= MIN_CONTENT &&
    !overLimit &&
    (!turnstileSiteKey || turnstileToken);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSuccess(null);
    setSubmitting(true);
    try {
      const r = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          postSlug,
          parentId,
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          content: content.trim(),
          url,
          website,
          turnstileToken,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed to post comment");

      // Persist identity
      localStorage.setItem("ss_comment_name", name.trim());
      localStorage.setItem("ss_comment_email", email.trim());
      if (company.trim()) localStorage.setItem("ss_comment_company", company.trim());

      setContent("");
      setTurnstileToken(null);
      setSuccess(data.message || "Comment posted! 🎉");
      onSubmitted(data.comment, data.status || "PENDING");
      setTimeout(() => setSuccess(null), 6000);
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div layout initial={false} className="relative">
      {parentId && (
        <div className="flex items-center justify-between mb-2 px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-100">
          <span className="text-[11px] font-bold text-violet-700 flex items-center gap-1.5">
            <Reply className="w-3 h-3" />
            Replying to{" "}
            <span className="text-violet-900">{replyingToName}</span>
          </span>
          <button
            onClick={onCancelReply}
            className="text-[11px] font-bold text-violet-500 hover:text-violet-700"
          >
            Cancel
          </button>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

        {/* Honeypots */}
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] opacity-0 pointer-events-none"
        />
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

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name *"
              required
              maxLength={60}
              className="h-10 px-3.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 focus:bg-white transition"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (not displayed) *"
              required
              className="h-10 px-3.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 focus:bg-white transition"
            />
          </div>

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (optional)"
            maxLength={80}
            className="w-full h-10 px-3.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 focus:bg-white transition mb-2.5"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              parentId
                ? "Write a thoughtful reply..."
                : "What was your biggest takeaway from this article?"
            }
            required
            rows={3}
            maxLength={MAX_CONTENT + 100}
            className={`w-full px-3.5 py-3 rounded-lg bg-slate-50 border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition resize-none ${
              overLimit
                ? "border-rose-300 focus:ring-rose-500/30 focus:border-rose-400"
                : "border-slate-200 focus:ring-violet-500/30 focus:border-violet-400"
            }`}
          />

          {/* Turnstile widget — only if configured */}
          {turnstileSiteKey && (
            <div className="mt-3">
              <Turnstile
                siteKey={turnstileSiteKey}
                onToken={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
                size="flexible"
              />
            </div>
          )}

          {/* Bottom bar */}
          <div className="flex items-center justify-between gap-2 mt-3 flex-wrap">
            <div className="flex items-center gap-2 text-[10px] font-bold flex-wrap">
              <span
                className={
                  overLimit
                    ? "text-rose-500"
                    : tooShort
                    ? "text-amber-500"
                    : "text-slate-400"
                }
              >
                {tooShort
                  ? `${MIN_CONTENT - charCount} more characters needed`
                  : overLimit
                  ? `${Math.abs(charsRemaining)} over limit`
                  : `${charCount}/${MAX_CONTENT}`}
              </span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span className="hidden sm:inline text-slate-400 flex items-center gap-1">
                <Info className="w-3 h-3" /> First-time comments need approval
              </span>
            </div>
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  {parentId ? "Reply" : "Post"}
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2.5 flex items-start gap-1.5 text-rose-600 text-xs font-bold leading-relaxed"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2.5 flex items-start gap-1.5 text-emerald-600 text-xs font-bold leading-relaxed"
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}

// ─── Reducer helpers ─────────────────────────────────────

function bumpLike(arr: Comment[], id: string, delta: number): Comment[] {
  return arr.map((c) => {
    if (c.id === id) return { ...c, likeCount: Math.max(0, c.likeCount + delta) };
    if (c.replies?.length) return { ...c, replies: bumpLike(c.replies, id, delta) };
    return c;
  });
}

function setLikeCount(arr: Comment[], id: string, count: number): Comment[] {
  return arr.map((c) => {
    if (c.id === id) return { ...c, likeCount: count };
    if (c.replies?.length) return { ...c, replies: setLikeCount(c.replies, id, count) };
    return c;
  });
}
