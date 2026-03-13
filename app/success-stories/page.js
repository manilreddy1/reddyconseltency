"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function SuccessStoriesPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const snap = await getDocs(collection(db, "testimonials"));
        setTestimonials(snap.docs.map(d => d.data()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-primary pb-20 pt-32">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white sm:text-6xl"
          >
            Success <span className="text-secondary">Stories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 mx-auto max-w-2xl text-lg text-blue-100"
          >
            Our students share their journey from application to acceptance. See what makes ReddyConsultancy different.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.studentName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={18}
                    className={j < t.rating ? "fill-secondary text-secondary" : "text-slate-200"}
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed italic">&ldquo;{t.review}&rdquo;</p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-lg">
                    {t.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.studentName}</p>
                    <p className="text-sm text-slate-500">{t.course} at {t.college}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
