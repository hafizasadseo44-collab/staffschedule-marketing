"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Loader2,
  Eye,
  MousePointerClick,
  Send,
  AlertTriangle,
  UserMinus,
  BarChart3,
} from "lucide-react";

interface Analytics {
  days: number;
  totals: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    bounced: number;
    campaigns: number;
    openRate: number;
    clickRate: number;
    ctor: number;
  };
  series: { day: string; sent: number; opened: number; clicked: number }[];
  topCampaigns: any[];
  sourcePages: { source: string; count: number }[];
}

const PIE_COLORS = ["#6D5DF6", "#A855F7", "#EC4899", "#F59E0B", "#10B981", "#06B6D4"];

export default function EmailAnalytics() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics?days=${days}`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [days]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 gap-2">
        <Loader2 className="w-5 h-5 animate-spin" /> Loading analytics...
      </div>
    );
  }
  if (!data) return null;

  const { totals, series, topCampaigns, sourcePages } = data;

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
            Marketing
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mt-2">
            Email Analytics
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            How your campaigns are performing across the last {days} days.
          </p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                days === d
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-500 hover:text-indigo-600"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Headline metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Send}
          label="Sent"
          value={totals.sent.toLocaleString()}
          accent="from-indigo-500 to-violet-500"
        />
        <MetricCard
          icon={Eye}
          label="Open Rate"
          value={`${totals.openRate}%`}
          secondary={`${totals.opened} opens`}
          accent="from-cyan-500 to-blue-500"
        />
        <MetricCard
          icon={MousePointerClick}
          label="Click Rate"
          value={`${totals.clickRate}%`}
          secondary={`${totals.clicked} clicks`}
          accent="from-violet-500 to-purple-500"
        />
        <MetricCard
          icon={BarChart3}
          label="CTOR"
          value={`${totals.ctor}%`}
          secondary="click / open"
          accent="from-pink-500 to-fuchsia-500"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Send}
          label="Campaigns"
          value={totals.campaigns.toLocaleString()}
          accent="from-emerald-500 to-teal-500"
        />
        <MetricCard
          icon={Eye}
          label="Total Opens"
          value={totals.opened.toLocaleString()}
          accent="from-blue-500 to-indigo-500"
        />
        <MetricCard
          icon={UserMinus}
          label="Unsubs"
          value={totals.unsubscribed.toLocaleString()}
          accent="from-rose-500 to-pink-500"
        />
        <MetricCard
          icon={AlertTriangle}
          label="Bounces"
          value={totals.bounced.toLocaleString()}
          accent="from-amber-500 to-orange-500"
        />
      </div>

      {/* Timeseries */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm"
      >
        <h3 className="text-lg font-extrabold text-slate-900 mb-1">
          Engagement Over Time
        </h3>
        <p className="text-xs text-slate-400 font-medium mb-6">
          Sent vs. opened vs. clicked, by day
        </p>
        <div className="h-72 -ml-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
              <Line
                type="monotone"
                dataKey="sent"
                stroke="#94A3B8"
                strokeWidth={2}
                dot={false}
                name="Sent"
              />
              <Line
                type="monotone"
                dataKey="opened"
                stroke="#6D5DF6"
                strokeWidth={2.5}
                dot={false}
                name="Opened"
              />
              <Line
                type="monotone"
                dataKey="clicked"
                stroke="#A855F7"
                strokeWidth={2.5}
                dot={false}
                name="Clicked"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top campaigns */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Top Campaigns
          </h3>
          <p className="text-xs text-slate-400 font-medium mb-6">
            By open count
          </p>
          {topCampaigns.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">
              No campaigns sent in this period
            </p>
          ) : (
            <div className="space-y-3">
              {topCampaigns.map((c, i) => {
                const openRate =
                  c.totalSent === 0
                    ? 0
                    : Math.round((c.totalOpened / c.totalSent) * 100);
                return (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-black flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-slate-900 truncate">
                        {c.name}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {c.subject}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-sm text-slate-900">
                        {openRate}%
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        open
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Source attribution */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Top Signup Sources
          </h3>
          <p className="text-xs text-slate-400 font-medium mb-6">
            Where your new subscribers came from
          </p>
          {sourcePages.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">
              No source data yet
            </p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourcePages} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                  <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="source"
                    stroke="#94A3B8"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "white",
                      border: "1px solid #E2E8F0",
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {sourcePages.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  secondary,
  accent,
}: {
  icon: any;
  label: string;
  value: string;
  secondary?: string;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm"
    >
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} text-white flex items-center justify-center shadow-lg shadow-indigo-100 mb-3`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </div>
      <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
        {value}
      </div>
      {secondary && (
        <div className="text-[11px] font-bold text-slate-400 mt-1">{secondary}</div>
      )}
    </motion.div>
  );
}
