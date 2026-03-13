"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { Plus, Pencil, Trash2, Calendar, Tag } from "lucide-react";

export default function BlogManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", category: "", excerpt: "", content: "", seoTitle: "", seoDescription: "", tags: "" });

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const snap = await getDocs(collection(db, "blogs"));
        setPosts(snap.docs.map(d => ({ slug: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const resetForm = () => { setForm({ title: "", slug: "", category: "", excerpt: "", content: "", seoTitle: "", seoDescription: "", tags: "" }); setEditing(null); setShowForm(true); };
  const cancelForm = () => { setForm({ title: "", slug: "", category: "", excerpt: "", content: "", seoTitle: "", seoDescription: "", tags: "" }); setEditing(null); setShowForm(false); };
  const startEdit = (p) => { setForm({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags || "" }); setEditing(p.slug); setShowForm(true); };
  
  const handleDelete = async (slug) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "blogs", slug));
        setPosts(posts.filter((p) => p.slug !== slug));
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  const handleSave = async () => {
    try {
      const targetSlug = editing || form.slug || form.title.toLowerCase().replace(/\s+/g, '-');
      const tagsArray = typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(t => t) : form.tags;
      const finalData = { 
        ...form, 
        slug: targetSlug, 
        tags: tagsArray,
        publishedAt: form.publishedAt || new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      };
      await setDoc(doc(db, "blogs", targetSlug), finalData);
      setPosts(prev => {
        if (editing) return prev.map(p => p.slug === editing ? finalData : p);
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
        <h1 className="font-heading text-2xl font-bold text-slate-900">Blog Management</h1>
        <button onClick={resetForm} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-slate-900 mb-4">{editing ? "Edit Post" : "Create New Post"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post Title" className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary col-span-2" />
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags (comma-separated)" className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
          </div>
          <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" rows={2} className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Full Content" rows={6} className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} placeholder="SEO Title" className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
            <input value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} placeholder="SEO Description" className="rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none text-sm focus:border-primary" />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white">{editing ? "Update" : "Publish"}</button>
            <button onClick={cancelForm} className="rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {posts.map((p, i) => (
          <motion.div key={p.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{p.category}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar size={12} /> {p.publishedAt}</span>
              </div>
              <h3 className="font-heading font-semibold text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{p.excerpt}</p>
              {p.tags && <div className="flex gap-2 mt-2">{(Array.isArray(p.tags) ? p.tags : []).map(t => <span key={t} className="flex items-center gap-1 text-xs text-slate-400"><Tag size={10} />{t}</span>)}</div>}
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => startEdit(p)} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(p.slug)} className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
