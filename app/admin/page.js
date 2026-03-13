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
    { label: "Total Leads", value: "0", change: "Live" },
    { label: "Leads Today", value: "0", change: "Live" },
    { label: "Conversions", value: "0", change: "N/A" },
    { label: "Total Colleges", value: "0", change: "Active" },
    { label: "Appointments", value: "0", change: "Next 7 Days" }
  ]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentApt, setRecentApt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    async function fetchDashboardData() {
      try {
        const leadsCol = collection(db, "leads");
        const collegesCol = collection(db, "colleges");
        const appointmentsCol = collection(db, "appointments");

        // 1. Total Counts
        const totalLeadsSnap = await getCountFromServer(leadsCol);
        const totalCollegesSnap = await getCountFromServer(collegesCol);
        
        // 2. Leads Today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayQuery = query(leadsCol, where("createdAt", ">=", Timestamp.fromDate(today)));
        const todaySnap = await getCountFromServer(todayQuery);

        // 3. Appointments (Upcoming)
        const aptSnap = await getCountFromServer(appointmentsCol);

        setMetrics([
          { label: "Total Leads", value: totalLeadsSnap.data().count.toString(), change: "Live" },
          { label: "Leads Today", value: todaySnap.data().count.toString(), change: "Live" },
          { label: "Conversions", value: "0", change: "Tracked" },
          { label: "Total Colleges", value: totalCollegesSnap.data().count.toString(), change: "Active" },
          { label: "Appointments", value: aptSnap.data().count.toString(), change: "Total" }
        ]);
      } catch (err) {
        console.error("Dashboard init error:", err);
      }
    }

    // Lead Pipeline (Real-time)
    const qLeads = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(4));
    const unsubLeads = onSnapshot(qLeads, (snap) => {
      setRecentLeads(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Recent Appointments (Real-time)
    const qApt = query(collection(db, "appointments"), orderBy("date", "desc"), limit(3));
    const unsubApt = onSnapshot(qApt, (snap) => {
      setRecentApt(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    fetchDashboardData();
    return () => { unsubLeads(); unsubApt(); };
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Live snapshots of your platform performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, i) => {
          const Icon = iconMap[metric.label] || TrendingUp;
          return (
            <motion.div key={metric.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">{metric.change}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              <p className="text-xs text-slate-500 mt-1">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-bold text-slate-900">New Leads</h2>
            <Link href="/admin/leads" className="text-xs font-bold text-primary uppercase tracking-widest">View All &rarr;</Link>
          </div>
          <div className="space-y-4">
            {recentLeads.length === 0 ? <p className="text-sm text-slate-500 italic">No leads captured yet.</p> : recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">{lead.name?.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{lead.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{lead.courseInterested}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{lead.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-bold text-slate-900">Recent Bookings</h2>
            <Link href="/admin/appointments" className="text-xs font-bold text-primary uppercase tracking-widest">Manage &rarr;</Link>
          </div>
          <div className="space-y-4">
            {recentApt.length === 0 ? <p className="text-sm text-slate-500 italic">No appointments booked.</p> : recentApt.map(apt => (
              <div key={apt.id} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{apt.student}</p>
                  <p className="text-[10px] text-slate-500">{apt.date} @ {apt.time}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{apt.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
