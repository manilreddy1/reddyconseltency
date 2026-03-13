"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Clock, ArrowRight } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        if (!db) return;
        const snap = await getDocs(collection(db, "courses"));
        setCourses(snap.docs.map(d => ({ slug: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
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
            Explore <span className="text-secondary">Courses</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 mx-auto max-w-2xl text-lg text-blue-100"
          >
            Find the right academic path with expert guidance across top programs worldwide.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/courses/${course.slug}`}
                className="group block rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                  <GraduationCap size={28} />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-slate-900">{course.name}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{course.description}</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                </div>
                <div className="mt-6 font-semibold text-primary group-hover:text-secondary flex items-center gap-2 transition-colors">
                  View Details <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
