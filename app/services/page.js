"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const snap = await getDocs(collection(db, "services"));
        setServices(snap.docs.map(d => d.data()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
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
            Premium Admission <span className="text-secondary">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 mx-auto max-w-2xl text-lg text-blue-100"
          >
            Comprehensive consulting solutions tailored to secure your place at the world&apos;s most prestigious institutions.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl border border-slate-100"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-secondary scale-x-0 transition-transform origin-left group-hover:scale-x-100"></div>
              
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <CheckCircle2 size={28} />
              </div>
              
              <h3 className="font-heading text-2xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-4 text-slate-600 leading-relaxed">{service.description}</p>
              
              <button className="mt-8 font-semibold text-primary hover:text-secondary flex items-center gap-2 transition-colors">
                Learn more <span aria-hidden="true">&rarr;</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
