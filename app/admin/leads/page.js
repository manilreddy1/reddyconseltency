"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, ChevronDown } from "lucide-react";

const initialLeads = [
  { id: "1", name: "Kiran Reddy", email: "kiran@email.com", phone: "+91 98765 00001", course: "B.Tech CSE", location: "Hyderabad", status: "New", date: "13 Mar 2026" },
  { id: "2", name: "Sneha Rao", email: "sneha@email.com", phone: "+91 98765 00002", course: "B.Tech ECE", location: "Warangal", status: "Interested", date: "12 Mar 2026" },
  { id: "3", name: "Vamshi Kumar", email: "vamshi@email.com", phone: "+91 98765 00003", course: "B.Tech Mechanical", location: "Karimnagar", status: "Converted", date: "11 Mar 2026" },
  { id: "4", name: "Lavanya Devi", email: "lavanya@email.com", phone: "+91 98765 00004", course: "B.Tech EEE", location: "Nizamabad", status: "Contacted", date: "10 Mar 2026" },
  { id: "5", name: "Rajesh Goud", email: "rajesh@email.com", phone: "+91 98765 00005", course: "B.Tech IT", location: "Khammam", status: "New", date: "10 Mar 2026" },
];

const statusColors = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-purple-50 text-purple-700",
  Interested: "bg-amber-50 text-amber-700",
  Converted: "bg-emerald-50 text-emerald-700",
  Closed: "bg-slate-100 text-slate-600",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");

  const filtered = leads.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()) || l.course.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = (id, newStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  };

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
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..." className="flex-1 outline-none text-sm bg-transparent" />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
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
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{lead.course}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{lead.location}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{lead.date}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[lead.status]}`}>{lead.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none focus:border-primary"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Interested">Interested</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
