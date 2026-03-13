"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Globe, BookOpen } from "lucide-react";

export default function CollegeDetailPage() {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollege() {
      if (!slug) return;
      try {
        if (!db) return;
        const docSnap = await getDoc(doc(db, "colleges", slug));
        if (docSnap.exists()) {
          setCollege({ slug: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollege();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </main>
    );
  }

  if (!college) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-slate-900">College Not Found</h1>
          <Link href="/colleges" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-white font-semibold">Browse All Colleges</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-primary pb-20 pt-32">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary">{college.state}</span>
              <span className="flex items-center gap-1 text-xs text-blue-200"><MapPin size={12} /> {college.location}</span>
            </div>
            <div className="flex items-end gap-5">
              {college.logo && (
                <img src={college.logo} alt={college.name} className="w-24 h-24 rounded-2xl object-contain bg-white shadow-lg border-4 border-white" />
              )}
              <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">{college.name}</h1>
            </div>
            <p className="mt-4 flex items-center gap-2 text-blue-200"><MapPin size={16} /> {college.location}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">About the Institution</h2>
              <p className="text-slate-600 leading-relaxed">{college.description}</p>

              <h3 className="font-heading text-xl font-bold text-slate-900 mt-10 mb-4 flex items-center gap-2"><BookOpen size={20} /> Courses Offered</h3>
              <div className="flex flex-wrap gap-3">
                {college.courses.map((c) => (
                  <span key={c} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">{c}</span>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-5 text-center">
                  <MapPin className="mx-auto text-secondary" size={24} />
                  <p className="mt-2 text-2xl font-bold text-slate-900">{college.location}</p>
                  <p className="text-xs text-slate-500">Location</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 text-center">
                  <Globe className="mx-auto text-secondary" size={24} />
                  <p className="mt-2 text-2xl font-bold text-slate-900">{college.state}</p>
                  <p className="text-xs text-slate-500">State</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 text-center">
                  <MapPin className="mx-auto text-secondary" size={24} />
                  <p className="mt-2 text-2xl font-bold text-slate-900">{college.city}</p>
                  <p className="text-xs text-slate-500">City</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="sticky top-8 rounded-3xl bg-slate-950 text-white p-8">
              <h3 className="font-heading text-xl font-bold mb-4">Apply to {college.name}</h3>
              <p className="text-slate-400 text-sm mb-6">Our experts will guide you through the entire application process.</p>
              <Link href="/contact" className="block text-center rounded-full bg-secondary px-6 py-3 font-semibold text-slate-950 hover:bg-gold transition-colors">
                Get Free Consultation
              </Link>
              <Link href="/colleges" className="block text-center mt-4 rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/5 transition-colors">
                Browse All Colleges
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
