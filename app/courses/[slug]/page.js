"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, BookOpen, CheckCircle2 } from "lucide-react";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      if (!slug) return;
      try {
        const docSnap = await getDoc(doc(db, "courses", slug));
        if (docSnap.exists()) {
          setCourse({ slug: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-slate-900">Course Not Found</h1>
          <Link href="/courses" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-white font-semibold">Back to Courses</Link>
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
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Course Details</p>
            <h1 className="mt-4 font-heading text-4xl font-bold text-white sm:text-6xl">{course.name}</h1>
            <p className="mt-6 max-w-2xl text-lg text-blue-100">{course.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Program Overview</h2>
              <p className="text-slate-600 leading-relaxed mb-6">{course.description}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <Clock className="text-secondary" size={20} />
                  <div><p className="text-xs text-slate-500">Duration</p><p className="font-semibold text-slate-900">{course.duration}</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <BookOpen className="text-secondary" size={20} />
                  <div><p className="text-xs text-slate-500">Eligibility</p><p className="font-semibold text-slate-900">{course.eligibility}</p></div>
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold text-slate-900 mt-10 mb-4">What We Help With</h3>
              <ul className="space-y-3">
                {["University shortlisting", "Application strategy", "SOP and essay review", "Scholarship research", "Visa preparation", "Pre-departure briefing"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="sticky top-8 rounded-3xl bg-slate-950 text-white p-8">
              <h3 className="font-heading text-xl font-bold mb-4">Ready to Apply?</h3>
              <p className="text-slate-400 text-sm mb-6">Get expert guidance for {course.name} admissions. Schedule a free consultation.</p>
              <Link href="/contact" className="block text-center rounded-full bg-secondary px-6 py-3 font-semibold text-slate-950 hover:bg-gold transition-colors">
                Get Free Consultation
              </Link>
              <Link href="/courses" className="block text-center mt-4 rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/5 transition-colors">
                View All Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
