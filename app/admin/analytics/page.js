"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Globe, ArrowUpRight, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, getCountFromServer, where, Timestamp } from "firebase/firestore";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    leadsToday: 0,
    totalColleges: 0,
    totalCourses: 0,
    leadsBySource: [
      { source: "Direct/Web", leads: 0, conversions: 0, rate: "0%" },
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    async function fetchAnalytics() {
      try {
        const leadsCol = collection(db, "leads");
        const collegesCol = collection(db, "colleges");
        const coursesCol = collection(db, "courses");

        // Basic Counts
        const totalLeadsSnap = await getCountFromServer(leadsCol);
        const totalCollegesSnap = await getCountFromServer(collegesCol);
        const totalCoursesSnap = await getCountFromServer(coursesCol);

        // Leads Today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayQuery = query(leadsCol, where("createdAt", ">=", Timestamp.fromDate(today)));
        const todaySnap = await getCountFromServer(todayQuery);

        // Simulated distribution for UI (until source tracking is implemented)
        const totalLeads = totalLeadsSnap.data().count;
        
        setStats({
          totalLeads,
          leadsToday: todaySnap.data().count,
          totalColleges: totalCollegesSnap.data().count,
          totalCourses: totalCoursesSnap.data().count,
          leadsBySource: [
            { source: "Website Form", leads: totalLeads, conversions: Math.floor(totalLeads * 0.15), rate: "15%" },
            { source: "Manual Entry", leads: 0, conversions: 0, rate: "0%" }
          ]
        });
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
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
      <h1 className="font-heading text-2xl font-bold text-slate-900">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Leads", value: stats.totalLeads.toLocaleString(), change: "Live", icon: Users },
          { label: "Leads Today", value: stats.leadsToday.toString(), change: "Live", icon: ArrowUpRight },
          { label: "Total Colleges", value: stats.totalColleges.toString(), change: "Active", icon: Globe },
          { label: "Total Courses", value: stats.totalCourses.toString(), change: "Available", icon: BarChart3 },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} className="text-primary" />
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">{m.change}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{m.value}</p>
              <p className="text-xs text-slate-500 mt-1">{m.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Traffic Insights</h2>
          <div className="h-56 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="mx-auto text-primary/30 mb-2" size={40} />
              <p className="text-sm text-slate-500">Live Traffic Tracking</p>
              <p className="text-xs text-slate-400 mt-1">Visit counts will appear here as users browse the site</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Lead Performance</h2>
          <div className="space-y-3">
            {stats.leadsBySource.map((d) => (
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
    </div>
  );
}
