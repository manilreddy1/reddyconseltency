"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot, getCountFromServer, where, Timestamp } from "firebase/firestore";

const iconMap = { "Total Leads": Users, "Leads Today": ArrowUpRight, "Conversions": TrendingUp, "Revenue": DollarSign, "Appointments": Calendar };

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState([
    { label: "Total Leads", value: "0", change: "..." },
    { label: "Leads Today", value: "0", change: "..." },
    { label: "Conversions", value: "0", change: "0%" },
    { label: "Revenue", value: "Rs. 0", change: "0%" },
    { label: "Appointments", value: "0", change: "..." }
  ]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    async function fetchStats() {
      try {
        // 1. Total Leads Count
        const leadsCol = collection(db, "leads");
        const totalSnap = await getCountFromServer(leadsCol);
        const totalLeads = totalSnap.data().count;

        // 2. Leads Today Count
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayQuery = query(leadsCol, where("createdAt", ">=", Timestamp.fromDate(today)));
        const todaySnap = await getCountFromServer(todayQuery);
        const leadsToday = todaySnap.data().count;

        // Update metrics
        setMetrics(prev => prev.map(m => {
          if (m.label === "Total Leads") return { ...m, value: totalLeads.toString(), change: "Live" };
          if (m.label === "Leads Today") return { ...m, value: leadsToday.toString(), change: "Live" };
          return m;
        }));
      } catch (err) {
        console.error("Error fetching dashboard counts:", err);
      }
    }

    // Recent Leads Pipeline (Real-time)
    const qRecent = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(5));
    const unsubscribeLeads = onSnapshot(qRecent, (snapshot) => {
      setRecentLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    fetchStats();
    return () => unsubscribeLeads();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your consultancy performance.</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, i) => {
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
            {recentLeads.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4">No recent leads found.</p>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="rounded-xl bg-slate-50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">{lead.name?.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{lead.name}</p>
                      <p className="text-xs text-slate-500">{lead.courseInterested} | {lead.preferredLocation || "N/A"}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    lead.status === "New" ? "bg-blue-50 text-blue-700" :
                    lead.status === "Interested" ? "bg-amber-50 text-amber-700" :
                    lead.status === "Converted" ? "bg-emerald-50 text-emerald-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>{lead.status}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-slate-900">Recent Appointments</h2>
            <Link href="/admin/appointments" className="text-sm text-primary font-semibold hover:text-secondary transition-colors">View All &rarr;</Link>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-slate-500 italic py-10 text-center">No recent appointments scheduled.</p>
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
            <p className="text-sm text-slate-500">Revenue tracking will begin after first conversion</p>
            <p className="text-xs text-slate-400 mt-1">Connect Stripe or Razorpay to visualize real-time earnings</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
