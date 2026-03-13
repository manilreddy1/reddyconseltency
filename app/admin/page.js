"use client";

import { motion } from "framer-motion";
import { analyticsMetrics, leadPipeline, appointments } from "@/lib/site-data";
import { TrendingUp, Users, DollarSign, Calendar, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const iconMap = { "Total Leads": Users, "Leads Today": ArrowUpRight, "Conversions": TrendingUp, "Revenue": DollarSign, "Appointments": Calendar };

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your consultancy performance.</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {analyticsMetrics.map((metric, i) => {
          const Icon = iconMap[metric.label] || TrendingUp;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} className="text-primary" />
                <span className="text-xs font-semibold text-emerald-600">{metric.change}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              <p className="text-xs text-slate-500 mt-1">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Lead Pipeline & Appointments */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-slate-900">Lead Pipeline</h2>
            <Link href="/admin/leads" className="text-sm text-primary font-semibold hover:text-secondary transition-colors">View All &rarr;</Link>
          </div>
          <div className="space-y-3">
            {leadPipeline.map((lead) => (
              <div key={lead.name} className="rounded-xl bg-slate-50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">{lead.name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.course} | {lead.location}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  lead.status === "New" ? "bg-blue-50 text-blue-700" :
                  lead.status === "Interested" ? "bg-amber-50 text-amber-700" :
                  lead.status === "Converted" ? "bg-emerald-50 text-emerald-700" :
                  "bg-slate-100 text-slate-600"
                }`}>{lead.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-slate-900">Recent Appointments</h2>
            <Link href="/admin/appointments" className="text-sm text-primary font-semibold hover:text-secondary transition-colors">View All &rarr;</Link>
          </div>
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div key={apt.student + apt.date} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{apt.student}</p>
                    <p className="text-xs text-slate-500 mt-1">{apt.date} at {apt.time}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    apt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}>{apt.status}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Counselor: {apt.counselor}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart Placeholder */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Revenue Overview</h2>
        <div className="h-64 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
          <div className="text-center">
            <DollarSign className="mx-auto text-primary/30 mb-2" size={48} />
            <p className="text-sm text-slate-500">Revenue chart visualization</p>
            <p className="text-xs text-slate-400 mt-1">Connect a charting library (Recharts / Chart.js) to display live data</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
