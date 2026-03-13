"use client";

import { motion } from "framer-motion";
import { appointments } from "@/lib/site-data";
import { Calendar, Clock, User } from "lucide-react";

export default function AppointmentsManagement() {
  const allAppointments = [
    ...appointments,
    { student: "Aditi Rao", counselor: "Maya Kapoor", date: "16 Mar 2026", time: "2:00 PM", status: "Pending" },
    { student: "Sahil Khan", counselor: "Raj Patel", date: "17 Mar 2026", time: "10:00 AM", status: "Confirmed" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Appointment Management</h1>

      {/* Calendar View Placeholder */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Calendar View</h2>
        <div className="h-48 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
          <div className="text-center">
            <Calendar className="mx-auto text-primary/30 mb-2" size={40} />
            <p className="text-sm text-slate-500">Integrate a calendar component (FullCalendar / react-big-calendar)</p>
          </div>
        </div>
      </motion.div>

      {/* Appointments List */}
      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Counselor</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments.map((apt, i) => (
              <motion.tr key={apt.student + apt.date} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="border-t border-slate-50 hover:bg-slate-50/50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{apt.student}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{apt.counselor}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{apt.date}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{apt.time}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    apt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}>{apt.status}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-xs font-semibold text-primary hover:text-secondary transition-colors">Reschedule</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
