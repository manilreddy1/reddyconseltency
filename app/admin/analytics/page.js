"use client";

import { motion } from "framer-motion";
import { analyticsMetrics } from "@/lib/site-data";
import { BarChart3, TrendingUp, Users, Globe, ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
  const conversionData = [
    { source: "Google Organic", leads: 890, conversions: 134, rate: "15.1%" },
    { source: "Social Media", leads: 456, conversions: 68, rate: "14.9%" },
    { source: "Referrals", leads: 312, conversions: 58, rate: "18.6%" },
    { source: "WhatsApp", leads: 245, conversions: 41, rate: "16.7%" },
    { source: "Direct", leads: 183, conversions: 17, rate: "9.3%" },
  ];

  const topPages = [
    { page: "/contact", views: 12450, conversion: "8.2%" },
    { page: "/courses/engineering", views: 8930, conversion: "6.4%" },
    { page: "/colleges", views: 7210, conversion: "5.1%" },
    { page: "/blog/study-abroad-scholarships-guide", views: 5680, conversion: "3.8%" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Visitors", value: "24,580", change: "+18.3%", icon: Globe },
          { label: "Page Views", value: "68,420", change: "+12.6%", icon: BarChart3 },
          { label: "Lead Conversion", value: "12.8%", change: "+2.1%", icon: TrendingUp },
          { label: "Avg. Session", value: "4m 32s", change: "+0.8%", icon: Users },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} className="text-primary" />
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600"><ArrowUpRight size={12} />{m.change}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{m.value}</p>
              <p className="text-xs text-slate-500 mt-1">{m.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Traffic Overview</h2>
          <div className="h-56 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="mx-auto text-primary/30 mb-2" size={40} />
              <p className="text-sm text-slate-500">Traffic chart visualization</p>
              <p className="text-xs text-slate-400 mt-1">Connect Recharts / Chart.js for live data</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Lead Sources</h2>
          <div className="space-y-3">
            {conversionData.map((d) => (
              <div key={d.source} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{d.source}</p>
                  <p className="text-xs text-slate-500">{d.leads} leads &bull; {d.conversions} conversions</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{d.rate}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Pages */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-6 pb-0"><h2 className="font-heading text-lg font-bold text-slate-900">Top Pages</h2></div>
        <table className="w-full mt-4">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-3">Page</th>
              <th className="px-6 py-3">Views</th>
              <th className="px-6 py-3">Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map((p) => (
              <tr key={p.page} className="border-t border-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-primary">{p.page}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{p.views.toLocaleString()}</td>
                <td className="px-6 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{p.conversion}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
