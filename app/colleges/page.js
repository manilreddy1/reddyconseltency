"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Navbar />
      <div className="bg-primary pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white sm:text-6xl"
          >
            Partner <span className="text-secondary">Colleges</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 mx-auto max-w-2xl text-lg text-blue-100"
          >
            Browse our network of 13 partner engineering colleges across Hyderabad, Telangana.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college, i) => (
            <motion.div
              key={college.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/colleges/${college.slug}`}
                className="group block rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{college.state}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={12} /> {college.location}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {college.logo ? (
                    <img src={college.logo} alt={college.name} className="w-16 h-16 rounded-xl object-contain bg-slate-50 border border-slate-100 p-2" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-2xl">{college.name.charAt(0)}</div>
                  )}
                  <h3 className="font-heading text-xl font-semibold text-slate-900">{college.name}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{college.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={14} /> {college.city}, {college.state}
                </div>
                <div className="mt-6 font-semibold text-primary group-hover:text-secondary flex items-center gap-2 text-sm transition-colors">
                  View College <ArrowRight size={14} />
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
