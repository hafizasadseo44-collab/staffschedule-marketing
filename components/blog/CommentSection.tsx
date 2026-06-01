"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
  ArrowDownUp,
  CheckCircle2,
} from "lucide-react";

interface Comment {
  id: string;
  postId: string;
  parentId: string | null;
  name: string;
  email: string;
  website?: string | null;
  avatar?: string | null;
  content: string;
  status: string;
  isPinned: boolean;
  isAuthor: boolean;
  isAdmin: boolean;
  likeCount: number;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  postSlug: string;
}

type SortMode = "newest" | "oldest" | "popular";

// Stable per-browser identifier for like deduplication. Generated once and
// persisted in localStorage; never sent to any third party.
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
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CommentSection({ postId, postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortMode>("newest");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Persisted user identity (so they don't retype name/email every time)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("ss_comment_name") || "");
    setEmail(localStorage.getItem("ss_comment_email") || "");
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

  const loadComments = async () => {
    setLoading(true);
    try {
      const r = await fetch(
        `/api/comments?postId=${postId}&sort=${sort}`,
        { cache: "no-store" }
      );
      const data = await r.json();
      setComments(data.comments || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, sort]);

  const handleLike = async (id: string) => {
    const wasLiked = likedIds.has(id);
    // Optimistic UI
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
        // Reconcile with server count
        setComments((arr) => setLikeCount(arr, id, data.likeCount));
      } else {
        // Rollback
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
    // Scroll the form into view after layout
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleSubmitted = (comment: Comment | null, pending?: boolean) => {
    if (pending) return; // wait for moderation; just clear
    if (!comment) return;
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

  return (
    <section className="mt-16 sm:mt-24 scroll-mt-24" id="comments">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 mb-3">
            <MessageCircle className="w-3 h-3 text-violet-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-700">
              Discussion
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {total === 0
              ? "Join the conversation"
              : `${total} ${total === 1 ? "comment" : "comments"}`}
          </h2>
          {total > 0 && (
            <p className="text-sm text-slate-500 mt-1">
              Share your perspective — others can&apos;t reply if you don&apos;t go first.
            </p>
          )}
        </div>
        {total > 1 && (
          <div className="flex items-center gap-1 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {(
              [
                { id: "newest", label: "Newest" },
                { id: "popular", label: "Top" },
                { id: "oldest", label: "Oldest" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSort(opt.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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

      {/* Form */}
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
          setName={setName}
          setEmail={setEmail}
          onSubmitted={handleSubmitted}
        />
      </div>

      {/* Comments list */}
      <div className="mt-10">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-slate-50 to-violet-50/30 rounded-3xl border border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-extrabold text-slate-700 mb-1">
              Be the first to comment
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Your thoughts could spark a great discussion. Share what you
              think about this article.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {comments.map((c, i) => (
                <CommentNode
                  key={c.id}
                  comment={c}
                  index={i}
                  likedIds={likedIds}
                  onLike={handleLike}
                  onReply={handleReplyClick}
                  isReplyTarget={replyingTo === c.id}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Comment node (top-level + replies) ──────────────────────────

function CommentNode({
  comment,
  index,
  likedIds,
  onLike,
  onReply,
  isReplyTarget,
  isReply = false,
}: {
  comment: Comment;
  index: number;
  likedIds: Set<string>;
  onLike: (id: string) => void;
  onReply: (id: string) => void;
  isReplyTarget: boolean;
  isReply?: boolean;
}) {
  const liked = likedIds.has(comment.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      className={`relative ${isReply ? "ml-6 sm:ml-14" : ""}`}
    >
      {/* Connector line for replies */}
      {isReply && (
        <div className="absolute left-[-22px] sm:left-[-44px] top-0 bottom-4 w-[2px] bg-gradient-to-b from-slate-200 via-slate-200 to-transparent rounded-full" />
      )}

      <div
        className={`relative bg-white rounded-3xl border transition-all p-5 sm:p-6 ${
          comment.isPinned
            ? "border-amber-200/60 bg-gradient-to-br from-amber-50/30 to-white shadow-md shadow-amber-100/40"
            : isReplyTarget
            ? "border-violet-300 shadow-lg shadow-violet-100"
            : "border-slate-100 hover:border-slate-200 hover:shadow-md shadow-sm"
        }`}
      >
        {/* Pinned badge */}
        {comment.isPinned && (
          <div className="absolute -top-2.5 left-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
            <Pin className="w-2.5 h-2.5" /> Pinned
          </div>
        )}

        <div className="flex items-start gap-3 sm:gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-md ${
                comment.isAdmin || comment.isAuthor
                  ? "ring-2 ring-violet-400 ring-offset-2 ring-offset-white"
                  : ""
              }`}
            >
              {comment.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-sm">
                  {initials(comment.name)}
                </div>
              )}
            </div>
            {(comment.isAdmin || comment.isAuthor) && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-white flex items-center justify-center shadow-md">
                {comment.isAdmin ? (
                  <Shield className="w-2.5 h-2.5 text-white" />
                ) : (
                  <PenTool className="w-2.5 h-2.5 text-white" />
                )}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                {comment.website ? (
                  <a
                    href={comment.website}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="hover:text-violet-600 transition"
                  >
                    {comment.name}
                  </a>
                ) : (
                  comment.name
                )}
              </span>
              {comment.isAuthor && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 text-[10px] font-bold uppercase tracking-wider">
                  <PenTool className="w-2.5 h-2.5" /> Author
                </span>
              )}
              {comment.isAdmin && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                  <Shield className="w-2.5 h-2.5" /> Staff
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <Clock className="w-3 h-3" /> {timeAgo(comment.createdAt)}
              </span>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
              {comment.content}
            </p>

            <div className="flex items-center gap-1 mt-4">
              <button
                onClick={() => onLike(comment.id)}
                className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  liked
                    ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-rose-500"
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-all ${
                    liked ? "fill-rose-500 text-rose-500 scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span>
                  {comment.likeCount > 0 ? comment.likeCount : "Like"}
                </span>
              </button>
              {!isReply && (
                <button
                  onClick={() => onReply(comment.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-violet-600 transition"
                >
                  <Reply className="w-3.5 h-3.5" /> Reply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((r, i) => (
            <CommentNode
              key={r.id}
              comment={r}
              index={i}
              likedIds={likedIds}
              onLike={onLike}
              onReply={onReply}
              isReplyTarget={false}
              isReply
            />
          ))}
        </div>
      )}
    </motion.article>
  );
}

// ─── Comment form ────────────────────────────────────────────────

function CommentForm({
  postId,
  postSlug,
  parentId,
  replyingToName,
  onCancelReply,
  name,
  email,
  setName,
  setEmail,
  onSubmitted,
}: {
  postId: string;
  postSlug: string;
  parentId: string | null;
  replyingToName: string | null | undefined;
  onCancelReply: () => void;
  name: string;
  email: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  onSubmitted: (comment: Comment | null, pending?: boolean) => void;
}) {
  const [content, setContent] = useState("");
  const [website, setWebsite] = useState("");
  const [url, setUrl] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const charCount = content.length;
  const overLimit = charCount > 5000;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !content.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (overLimit) {
      setError("Comment is too long (max 5000 characters).");
      return;
    }

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
          website: website.trim() || undefined,
          content: content.trim(),
          url, // honeypot
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Failed to post comment");

      // Persist identity for next time
      localStorage.setItem("ss_comment_name", name.trim());
      localStorage.setItem("ss_comment_email", email.trim());

      setContent("");
      setWebsite("");
      if (data.pending) {
        setSuccess("Thanks! Your comment is awaiting moderation.");
      } else if (data.spam) {
        setSuccess("Comment received.");
      } else {
        setSuccess("Comment posted! 🎉");
      }
      onSubmitted(data.comment, data.pending);
      setTimeout(() => setSuccess(null), 4000);
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={false}
      className="relative"
    >
      {parentId && (
        <div className="flex items-center justify-between mb-3 px-4 py-2 rounded-2xl bg-violet-50 border border-violet-100">
          <span className="text-xs font-bold text-violet-700 flex items-center gap-2">
            <Reply className="w-3.5 h-3.5" />
            Replying to{" "}
            <span className="text-violet-900">{replyingToName}</span>
          </span>
          <button
            onClick={onCancelReply}
            className="text-xs font-bold text-violet-500 hover:text-violet-700"
          >
            Cancel
          </button>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="relative bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
      >
        {/* Subtle gradient header band */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

        {/* Honeypot */}
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

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name *"
              required
              className="h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 focus:bg-white transition"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (not published) *"
              required
              className="h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 focus:bg-white transition"
            />
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              parentId
                ? "Write your reply..."
                : "What's your take on this article?"
            }
            required
            rows={4}
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition resize-none ${
              overLimit
                ? "border-rose-300 focus:ring-rose-500/30 focus:border-rose-400"
                : "border-slate-200 focus:ring-violet-500/30 focus:border-violet-400"
            }`}
          />

          {/* Bottom action bar */}
          <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold">
              <span className={overLimit ? "text-rose-500" : ""}>
                {charCount}/5000
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Be kind. Be useful.</span>
            </div>
            <button
              type="submit"
              disabled={submitting || overLimit || !content.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {parentId ? "Post reply" : "Post comment"}
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
                className="mt-3 flex items-center gap-1.5 text-rose-600 text-xs font-bold"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-1.5 text-emerald-600 text-xs font-bold"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {success}
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

// ─── Reducer helpers for optimistic like updates ─────────────────

function bumpLike(arr: Comment[], id: string, delta: number): Comment[] {
  return arr.map((c) => {
    if (c.id === id) return { ...c, likeCount: Math.max(0, c.likeCount + delta) };
    if (c.replies && c.replies.length) {
      return { ...c, replies: bumpLike(c.replies, id, delta) };
    }
    return c;
  });
}

function setLikeCount(arr: Comment[], id: string, count: number): Comment[] {
  return arr.map((c) => {
    if (c.id === id) return { ...c, likeCount: count };
    if (c.replies && c.replies.length) {
      return { ...c, replies: setLikeCount(c.replies, id, count) };
    }
    return c;
  });
}
