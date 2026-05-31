"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  Trash2,
  Tag,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Filter,
  UserPlus,
} from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  status: string;
  subscribedAt: string;
  sourcePage: string | null;
  tags: string | null;
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
}

const PAGE_SIZE = 25;

export default function SubscriberManager() {
  const [items, setItems] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(0);
  const [tagFilter, setTagFilter] = useState("");
  const [editingTagsId, setEditingTagsId] = useState<string | null>(null);
  const [editTagsValue, setEditTagsValue] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      offset: String(page * PAGE_SIZE),
      status: statusFilter,
    });
    if (search) params.set("search", search);
    if (tagFilter) params.set("tag", tagFilter);
    const r = await fetch(`/api/admin/subscribers?${params}`, {
      cache: "no-store",
    });
    const data = await r.json();
    setItems(data.items || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, tagFilter]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(0);
      fetchData();
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this subscriber?")) return;
    await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
    setItems((arr) => arr.filter((s) => s.id !== id));
    setTotal((t) => t - 1);
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/subscribers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setItems((arr) =>
      arr.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const saveTags = async (id: string) => {
    await fetch(`/api/admin/subscribers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags: editTagsValue }),
    });
    setItems((arr) =>
      arr.map((s) => (s.id === id ? { ...s, tags: editTagsValue } : s))
    );
    setEditingTagsId(null);
  };

  const exportCsv = () => {
    const params = new URLSearchParams({ format: "csv", status: statusFilter });
    if (search) params.set("search", search);
    if (tagFilter) params.set("tag", tagFilter);
    window.open(`/api/admin/subscribers?${params}`, "_blank");
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            Marketing
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mt-2">
            Subscribers
            <span className="text-indigo-600 ml-2">
              {total.toLocaleString()}
            </span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Search, segment, tag and export your audience.
          </p>
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition shadow-sm text-sm font-bold text-slate-700"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or name..."
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(0);
          }}
          className="h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="UNSUBSCRIBED">Unsubscribed</option>
          <option value="BOUNCED">Bounced</option>
        </select>
        <input
          value={tagFilter}
          onChange={(e) => {
            setTagFilter(e.target.value);
            setPage(0);
          }}
          placeholder="Filter by tag..."
          className="h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 w-40"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading subscribers...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-extrabold text-slate-700 mb-1">
              No subscribers found
            </h3>
            <p className="text-sm text-slate-400">
              Try adjusting your filters or wait for new signups.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="text-left px-6 py-4">Subscriber</th>
                  <th className="text-left px-4 py-4">Status</th>
                  <th className="text-left px-4 py-4">Source</th>
                  <th className="text-left px-4 py-4">Tags</th>
                  <th className="text-left px-4 py-4">Engagement</th>
                  <th className="text-left px-4 py-4">Joined</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((s) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-black flex items-center justify-center shrink-0">
                          {(s.name || s.email)[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate">
                            {s.name || s.email}
                          </div>
                          {s.name && (
                            <div className="text-xs text-slate-400 truncate">
                              {s.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={s.status}
                        onChange={(e) => handleStatusChange(s.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full border-0 focus:outline-none cursor-pointer uppercase tracking-wider ${
                          s.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700"
                            : s.status === "UNSUBSCRIBED"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="UNSUBSCRIBED">Unsubscribed</option>
                        <option value="BOUNCED">Bounced</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500 max-w-[180px] truncate">
                      {s.sourcePage || "—"}
                    </td>
                    <td className="px-4 py-4">
                      {editingTagsId === s.id ? (
                        <div className="flex gap-1">
                          <input
                            autoFocus
                            value={editTagsValue}
                            onChange={(e) => setEditTagsValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveTags(s.id);
                              if (e.key === "Escape") setEditingTagsId(null);
                            }}
                            onBlur={() => saveTags(s.id)}
                            placeholder="tag1, tag2"
                            className="px-2 py-1 text-xs rounded-md border border-indigo-300 focus:outline-none w-40"
                          />
                        </div>
                      ) : (
                        <div
                          className="flex flex-wrap gap-1 cursor-pointer max-w-[180px]"
                          onClick={() => {
                            setEditingTagsId(s.id);
                            setEditTagsValue(s.tags || "");
                          }}
                        >
                          {s.tags ? (
                            s.tags.split(",").filter(Boolean).map((t, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold"
                              >
                                {t.trim()}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-300 flex items-center gap-1 hover:text-indigo-500">
                              <Tag className="w-3 h-3" />
                              Add
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                        <span title="Sent">📤 {s.emailsSent}</span>
                        <span title="Opens">👀 {s.emailsOpened}</span>
                        <span title="Clicks">🔗 {s.emailsClicked}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">
                      {new Date(s.subscribedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-slate-400 hover:text-rose-600 transition p-2 rounded-lg hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
                className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-40 hover:border-indigo-300 hover:text-indigo-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-500">
                {page + 1} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-40 hover:border-indigo-300 hover:text-indigo-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
