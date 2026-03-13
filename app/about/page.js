"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { company } from "@/lib/site-data";
import Link from "next/link";

export default function AboutPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        if (!db) return;
        const snap = await getDocs(collection(db, "stats"));
        setStats(snap.docs.map(d => d.data()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
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
            About <span className="text-secondary">{company.name}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 mx-auto max-w-2xl text-lg text-blue-100"
          >
            We are a premium global education consultancy dedicated to guiding students towards their dream universities and long-term career success.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl"
          >
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="Our Team" className="w-full h-[500px] object-cover" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">Our Mission & Vision</h2>
            <div className="space-y-6 text-slate-600">
              <p>At {company.name}, our mission is to democratize access to world-class education. We believe every student deserves a transparent, structured, and stress-free pathway to top universities.</p>
              <p>From Ivy League institutions in the US to prestigious MBA programs in India, our expert counselors leverage data-driven insights and deep partnerships to secure the best placements for our applicants.</p>
              <p>With a 98% success rate and thousands of successful alumni across 120+ partner colleges globally, we are more than consultants—we are your dedicated career mentors.</p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link href="/contact" className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors">Contact Our Experts</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-8 text-center"
              >
                <div className="text-4xl font-bold text-secondary">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
