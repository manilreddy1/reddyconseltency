"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Loader2, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student: "", counselor: "", date: "", time: "", status: "Pending" });

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "appointments"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "appointments"), {
        ...form,
        createdAt: serverTimestamp()
      });
      setForm({ student: "", counselor: "", date: "", time: "", status: "Pending" });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to add appointment", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "appointments", id), { status });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "appointments", id));
    } catch (err) {
      console.error("Failed to delete appointment", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Appointment Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
        >
          {showForm ? "Cancel" : <><Plus size={16} /> Schedule Appointment</>}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input required value={form.student} onChange={e => setForm({...form, student: e.target.value})} placeholder="Student Name" className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary" />
            <input required value={form.counselor} onChange={e => setForm({...form, counselor: e.target.value})} placeholder="Counselor Name" className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary" />
            <input required type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary" />
            <input required type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary" />
            <button type="submit" className="lg:col-span-4 rounded-xl bg-primary py-2 text-sm font-semibold text-white hover:bg-primary/90">Save Appointment</button>
          </form>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">Calendar Overview</h2>
        <div className="h-32 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
          <p className="text-xs text-slate-400">Total Scheduled: {appointments.length} Appointments</p>
        </div>
      </motion.div>

      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
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
              {appointments.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-10 text-center text-slate-500 italic">No appointments scheduled.</td></tr>
              ) : (
                appointments.map((apt, i) => (
                  <motion.tr key={apt.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="border-t border-slate-50 hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{apt.student}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{apt.counselor}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{apt.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{apt.time}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={apt.status} 
                        onChange={e => updateStatus(apt.id, e.target.value)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold outline-none appearance-none cursor-pointer ${
                          apt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(apt.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
