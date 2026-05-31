"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  UserCheck,
  UserX,
  Mail,
  Send,
  Loader2,
  TrendingUp,
  Eye,
  MousePointerClick,
} from "lucide-react";

interface Overview {
  stats: {
    totalSubscribers: number;
    activeSubscribers: number;
    unsubscribed: number;
    newLast30: number;
    subscriberGrowthPct: number;
    campaignsTotal: number;
    campaignsSent: number;
    emailsSent30: number;
    openRate: number;
    clickRate: number;
  };
  growth: { day: string; count: number; cumulative: number }[];
  recentSubscribers: any[];
  recentCampaigns: any[];
}

export default function MarketingOverview() {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/marketing/overview", { cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 gap-2">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading marketing
        intelligence...
      </div>
    );
  }
  if (!data) return null;

  const { stats, growth, recentSubscribers, recentCampaigns } = data;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              Marketing Hub
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              Live
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">
            Audience <span className="text-indigo-600">Intelligence.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-lg">
            Track subscriber growth, monitor campaign performance, and grow your
            workforce community.
          </p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={Users}
          label="Total Subscribers"
          value={stats.totalSubscribers.toLocaleString()}
          change={stats.subscriberGrowthPct}
          accent="from-indigo-500 to-violet-500"
        />
        <KpiCard
          icon={UserCheck}
          label="Active"
          value={stats.activeSubscribers.toLocaleString()}
          subValue={`${pct(stats.activeSubscribers, stats.totalSubscribers)}%`}
          accent="from-emerald-500 to-teal-500"
        />
        <KpiCard
          icon={UserX}
          label="Unsubscribed"
          value={stats.unsubscribed.toLocaleString()}
          subValue={`${pct(stats.unsubscribed, stats.totalSubscribers)}%`}
          accent="from-rose-500 to-pink-500"
        />
        <KpiCard
          icon={TrendingUp}
          label="New (30d)"
          value={`+${stats.newLast30}`}
          change={stats.subscriberGrowthPct}
          accent="from-purple-500 to-fuchsia-500"
        />
      </div>

      {/* Email performance row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <KpiCard
          icon={Send}
          label="Emails Sent (30d)"
          value={stats.emailsSent30.toLocaleString()}
          accent="from-indigo-500 to-blue-500"
        />
        <KpiCard
          icon={Eye}
          label="Open Rate (30d)"
          value={`${stats.openRate}%`}
          accent="from-cyan-500 to-blue-500"
        />
        <KpiCard
          icon={MousePointerClick}
          label="Click Rate (30d)"
          value={`${stats.clickRate}%`}
          accent="from-violet-500 to-purple-500"
        />
      </div>

      {/* Growth chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Subscriber Growth
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Cumulative subscribers over the last 30 days
            </p>
          </div>
          <span className="text-sm font-bold text-indigo-600">
            +{stats.newLast30} this month
          </span>
        </div>
        <div className="h-72 -ml-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growth}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6D5DF6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6D5DF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#6D5DF6"
                strokeWidth={2.5}
                fill="url(#growthGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Two columns: recent subs + recent campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Recent Subscribers
            </h3>
            <Users className="w-4 h-4 text-slate-300" />
          </div>
          {recentSubscribers.length === 0 ? (
            <p className="text-sm text-slate-400 py-10 text-center">
              No subscribers yet. Share your newsletter to start growing.
            </p>
          ) : (
            <div className="space-y-3">
              {recentSubscribers.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-black flex items-center justify-center shrink-0">
                    {(s.name || s.email)[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate">
                      {s.name || s.email}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {s.name ? s.email : s.sourcePage || "Direct"}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">
                    {formatRelative(s.subscribedAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Recent Campaigns
            </h3>
            <Send className="w-4 h-4 text-slate-300" />
          </div>
          {recentCampaigns.length === 0 ? (
            <p className="text-sm text-slate-400 py-10 text-center">
              No campaigns yet. Send your first newsletter from a blog post or
              create a custom campaign.
            </p>
          ) : (
            <div className="space-y-3">
              {recentCampaigns.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="text-sm font-bold text-slate-900 truncate">
                      {c.name}
                    </div>
                    <CampaignStatusPill status={c.status} />
                  </div>
                  <div className="text-xs text-slate-400 truncate mb-2">
                    {c.subject}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                    <span>📨 {c.totalSent} sent</span>
                    <span>👀 {c.totalOpened} opens</span>
                    <span>🔗 {c.totalClicked} clicks</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  subValue,
  change,
  accent,
}: {
  icon: any;
  label: string;
  value: string;
  subValue?: string;
  change?: number;
  accent: string;
}) {
  const positive = (change ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="relative bg-white rounded-3xl p-5 border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} text-white flex items-center justify-center shadow-lg shadow-indigo-100`}
        >
          <Icon className="w-4 h-4" />
        </div>
        {typeof change === "number" && (
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
              positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
            }`}
          >
            {positive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </div>
      <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
        {value}
      </div>
      {subValue && (
        <div className="text-[11px] font-bold text-slate-400 mt-1">
          {subValue}
        </div>
      )}
    </motion.div>
  );
}

function CampaignStatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    SENT: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Sent" },
    SENDING: { bg: "bg-amber-100", text: "text-amber-700", label: "Sending" },
    DRAFT: { bg: "bg-slate-100", text: "text-slate-600", label: "Draft" },
    SCHEDULED: { bg: "bg-indigo-100", text: "text-indigo-700", label: "Scheduled" },
    FAILED: { bg: "bg-rose-100", text: "text-rose-700", label: "Failed" },
    CANCELLED: { bg: "bg-slate-100", text: "text-slate-600", label: "Cancelled" },
  };
  const s = map[status] || map.DRAFT;
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}

function formatRelative(date: string | Date) {
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function pct(a: number, b: number) {
  if (!b) return 0;
  return Math.round((a / b) * 100);
}
