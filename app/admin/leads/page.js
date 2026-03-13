"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, Trash2, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const statusColors = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-purple-50 text-purple-700",
  Interested: "bg-amber-50 text-amber-700",
  Converted: "bg-emerald-50 text-emerald-700",
  Closed: "bg-slate-100 text-slate-600",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Format date for display if it exists
        date: doc.data().createdAt?.toDate ? 
              doc.data().createdAt.toDate().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }) : 
              "Just now"
      }));
      setLeads(leadsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filtered = leads.filter((l) => 
    l.name?.toLowerCase().includes(search.toLowerCase()) || 
    l.courseInterested?.toLowerCase().includes(search.toLowerCase()) ||
    l.email?.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (id, newStatus) => {
    try {
      const leadRef = doc(db, "leads", id);
      await updateDoc(leadRef, { status: newStatus });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteDoc(doc(db, "leads", id));
    } catch (err) {
      console.error("Failed to delete lead", err);
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
        <h1 className="font-heading text-2xl font-bold text-slate-900">Lead Management</h1>
        <button className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5">
          <Search size={16} className="text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads by name, email or course..." className="flex-1 outline-none text-sm bg-transparent" />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Leads List */}
      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Student Details</th>
                <th className="px-6 py-3">Course / Location</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-500 italic">No leads found.</td>
                </tr>
              ) : (
                filtered.map((lead, i) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-t border-slate-50 hover:bg-slate-50/50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{lead.name}</p>
                        <p className="text-xs text-slate-500">{lead.email}</p>
                        <p className="text-xs text-slate-500">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700 font-medium">{lead.courseInterested}</p>
                      <p className="text-xs text-slate-500">{lead.preferredLocation || "Not specified"}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{lead.date}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[lead.status] || "bg-slate-100"}`}>{lead.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none focus:border-primary bg-white"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Interested">Interested</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-slate-50">
          {filtered.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-500 italic text-sm">No leads found.</div>
          ) : (
            filtered.map((lead, i) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{lead.name}</h3>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                    <p className="text-xs text-slate-500">{lead.phone}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColors[lead.status] || "bg-slate-100"}`}>
                    {lead.status}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Course</span>
                    <span className="font-semibold text-slate-700">{lead.courseInterested}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Location</span>
                    <span className="font-semibold text-slate-700">{lead.preferredLocation || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Date</span>
                    <span className="text-slate-500">{lead.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none bg-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button 
                    onClick={() => handleDelete(lead.id)}
                    className="p-3 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
