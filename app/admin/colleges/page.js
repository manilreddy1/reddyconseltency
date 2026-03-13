"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { Plus, Pencil, Trash2, MapPin, Trophy } from "lucide-react";

export default function CollegesManagement() {
  const [collegesList, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", location: "", country: "", city: "", description: "", ranking: "", logo: "", courses: [] });

  useEffect(() => {
    async function fetchColleges() {
      try {
        if (!db) return;
        const snap = await getDocs(collection(db, "colleges"));
        setColleges(snap.docs.map(d => ({ slug: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchColleges();
  }, []);

  const resetForm = () => { setForm({ name: "", slug: "", location: "", country: "", city: "", description: "", ranking: "", logo: "", courses: [] }); setEditing(null); setShowForm(true); };
  const cancelForm = () => { setForm({ name: "", slug: "", location: "", country: "", city: "", description: "", ranking: "", logo: "", courses: [] }); setEditing(null); setShowForm(false); };

  const startEdit = (c) => { setForm({ ...c, ranking: String(c.ranking || "") }); setEditing(c.slug); setShowForm(true); };

  const handleDelete = async (slug) => {
    if (confirm("Are you sure you want to delete this college?")) {
      try {
        await deleteDoc(doc(db, "colleges", slug));
        setColleges(collegesList.filter((c) => c.slug !== slug));
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  const handleSave = async () => {
    try {
      const targetSlug = editing || form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
      await setDoc(doc(db, "colleges", targetSlug), { ...form, slug: targetSlug });
      setColleges(prev => {
        if (editing) return prev.map(c => c.slug === editing ? { ...form, slug: targetSlug } : c);
        return [...prev, { ...form, slug: targetSlug }];
      });
      cancelForm();
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-900">College Management</h1>
        <button onClick={resetForm} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add College
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">{editing ? "Edit College" : "Add New College"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="College Name" className="rounded-xl border border-slate-200 text-slate-900 bg-slate-50 px-4 py-3 outline-none text-sm focus:border-primary" />
            <input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} placeholder="Logo URL" className="rounded-xl border border-slate-200 text-slate-900 bg-slate-50 px-4 py-3 outline-none text-sm focus:border-primary" />
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" className="rounded-xl border border-slate-200 text-slate-900 bg-slate-50 px-4 py-3 outline-none text-sm focus:border-primary" />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="rounded-xl border border-slate-200 text-slate-900 bg-slate-50 px-4 py-3 outline-none text-sm focus:border-primary" />
            <input value={form.ranking} onChange={(e) => setForm({ ...form, ranking: e.target.value })} placeholder="Ranking" type="number" className="rounded-xl border border-slate-200 text-slate-900 bg-slate-50 px-4 py-3 outline-none text-sm focus:border-primary" />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="mt-4 w-full rounded-xl border border-slate-200 text-slate-900 bg-slate-50 px-4 py-3 outline-none text-sm focus:border-primary" />
          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">{editing ? "Update" : "Save"}</button>
            <button onClick={cancelForm} className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Colleges List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collegesList.map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} className="w-12 h-12 rounded-lg object-contain bg-slate-50 border border-slate-100 p-1" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center font-heading font-bold text-primary">{c.name.charAt(0)}</div>
                )}
                <div>
                  <h3 className="font-heading font-semibold text-slate-900 line-clamp-1">{c.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {c.city}, {c.country}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap"><Trophy size={12} /> #{c.ranking}</span>
            </div>
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{c.description}</p>
            <div className="flex gap-2">
              <button onClick={() => startEdit(c)} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
                <Pencil size={12} /> Edit
              </button>
              <button onClick={() => handleDelete(c.slug)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-1">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
