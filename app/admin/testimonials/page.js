"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

export default function TestimonialsManagement() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ studentName: "", course: "", college: "", review: "", rating: "5" });

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        if (!db) return;
        const snap = await getDocs(collection(db, "testimonials"));
        setList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const resetForm = () => { setForm({ studentName: "", course: "", college: "", review: "", rating: "5" }); setEditing(null); setShowForm(true); };
  const cancelForm = () => { setForm({ studentName: "", course: "", college: "", review: "", rating: "5" }); setEditing(null); setShowForm(false); };
  const startEdit = (t) => { setForm({ ...t, rating: String(t.rating) }); setEditing(t.id); setShowForm(true); };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteDoc(doc(db, "testimonials", id));
        setList(list.filter((t) => t.id !== id));
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  const handleSave = async () => {
    try {
      const targetId = editing || form.id || form.studentName.toLowerCase().replace(/\s+/g, '-');
      const finalData = { ...form, id: targetId, rating: Number(form.rating) };
      await setDoc(doc(db, "testimonials", targetId), finalData);
      setList(prev => {
        if (editing) return prev.map(t => t.id === editing ? finalData : t);
        return [...prev, finalData];
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
        <h1 className="font-heading text-2xl font-bold text-slate-900">Testimonial Management</h1>
        <button onClick={resetForm} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">{editing ? "Edit Testimonial" : "Add New Testimonial"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder="Student Name" className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
            <input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="Course" className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
            <input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} placeholder="College" className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary">
              {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
            </select>
          </div>
          <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} placeholder="Review" rows={3} className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white">{editing ? "Update" : "Save"}</button>
            <button onClick={cancelForm} className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {list.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm flex items-start justify-between">
            <div className="flex-1">
              <div className="flex gap-1 mb-2">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className={j < Number(t.rating) ? "fill-secondary text-secondary" : "text-slate-200"} />)}</div>
              <p className="text-sm text-slate-600 italic mb-2">&ldquo;{t.review}&rdquo;</p>
              <p className="text-sm font-semibold text-slate-900">{t.studentName}</p>
              <p className="text-xs text-slate-500">{t.course} at {t.college}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => startEdit(t)} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(t.id)} className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
