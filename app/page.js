"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { CheckCircle2, Star, ArrowRight, GraduationCap, Globe, Users, Sparkles } from "lucide-react";

export default function HomePage() {
  const [data, setData] = useState({
    stats: [],
    services: [],
    courses: [],
    colleges: [],
    testimonials: [],
    blogPosts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const statsSnap = await getDocs(collection(db, "stats"));
        const servicesSnap = await getDocs(collection(db, "services"));
        const coursesSnap = await getDocs(query(collection(db, "courses"), limit(4)));
        const collegesSnap = await getDocs(query(collection(db, "colleges"), limit(4)));
        const testimonialsSnap = await getDocs(query(collection(db, "testimonials"), limit(2)));
        const blogsSnap = await getDocs(query(collection(db, "blogs"), limit(2)));

        setData({
          stats: statsSnap.docs.map(d => d.data()),
          services: servicesSnap.docs.map(d => d.data()),
          courses: coursesSnap.docs.map(d => ({ slug: d.id, ...d.data() })),
          colleges: collegesSnap.docs.map(d => ({ slug: d.id, ...d.data() })),
          testimonials: testimonialsSnap.docs.map(d => d.data()),
          blogPosts: blogsSnap.docs.map(d => ({ slug: d.id, ...d.data() }))
        });
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const { stats, services, courses, colleges, testimonials, blogPosts } = data;

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-secondary border-t-transparent animate-spin mb-4"></div>
          <p>Loading Platform...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section - Human/Photo Centric */}
      <section className="relative bg-white pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <Navbar />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* Left Content (Text) */}
            <div className="flex-1 text-center lg:text-left pt-12 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 mb-6"
              >
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Admissions Open 2026</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6"
              >
                Your <span className="text-blue-600">Career Journey</span> Starts Here.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                We provide hands-on, expert admission guidance for students in Hyderabad and Telangana. Real counselors helping real students secure seats in top engineering colleges.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link href="/contact" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-700 shadow-md shadow-blue-600/20">
                  Talk to a Counselor
                  <ArrowRight size={18} />
                </Link>
                <Link href="/about" className="w-full sm:w-auto flex items-center justify-center rounded-lg border-2 border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300">
                  Meet Our Team
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span>Verified Admissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-emerald-500" />
                  <span>500+ Students Helped</span>
                </div>
              </motion.div>
            </div>

            {/* Right Content (Image) */}
            <div className="flex-1 relative w-full max-w-lg mx-auto lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
              >
                {/* Fallback pattern in case image is missing, but meant to look like a photo container */}
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                   <img 
                    src="/images/counseling-session.png" 
                    alt="Students in a counseling session" 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="text-center p-8"><span class="block mb-2 text-slate-400">Photo: Students working with counselor</span><div class="w-full h-full min-h-[300px] bg-slate-200 rounded-xl"></div></div>';
                    }}
                   />
                </div>
                
                {/* Simple Overlay Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-6 py-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                     <GraduationCap size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Expert Guidance</p>
                    <p className="text-xs text-slate-500">2+ Years Experience</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="-mt-10 pb-16 relative z-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4">
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur p-6 text-white shadow-glass"
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 font-heading text-3xl font-bold text-secondary">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Services</p>
            <h2 className="mt-4 font-heading text-4xl font-bold">Complete Admission Workflow</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses & Colleges */}
      <section className="bg-slate-950 pb-24 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Courses and Colleges</p>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="font-heading text-2xl font-bold mb-6">Popular Courses</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {courses.map((item) => (
                  <Link key={item.slug} href={`/courses/${item.slug}`} className="group rounded-2xl border border-white/10 p-4 hover:bg-white/5 transition-colors">
                    <h4 className="font-heading text-lg font-semibold group-hover:text-secondary transition-colors">{item.name}</h4>
                    <p className="mt-1 text-sm text-slate-400">{item.duration}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="font-heading text-2xl font-bold mb-6">Partner Colleges</h3>
              {colleges.map((item) => (
                <Link key={item.slug} href={`/colleges/${item.slug}`} className="group mb-4 block rounded-2xl border border-white/10 p-4 hover:bg-white/5 transition-colors">
                  <h4 className="font-heading text-lg font-semibold group-hover:text-secondary transition-colors">{item.name}</h4>
                  <p className="mt-1 text-sm text-slate-400">{item.city}, {item.state}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Blog */}
      <section className="bg-white py-24 text-slate-900">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Trust & Resources</p>
            <h2 className="mt-4 font-heading text-4xl font-bold">What Our Students Say</h2>
          </motion.div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              {testimonials.map((item, i) => (
                <motion.div
                  key={item.studentName}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-6"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={16} className={j < item.rating ? "fill-secondary text-secondary" : "text-slate-200"} />
                    ))}
                  </div>
                  <p className="text-slate-600 italic">&ldquo;{item.review}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary">{item.studentName.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-sm">{item.studentName}</p>
                      <p className="text-xs text-slate-500">{item.course} at {item.college}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-6">
              <h3 className="font-heading text-2xl font-bold">Latest from Our Blog</h3>
              {blogPosts.map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${item.slug}`} className="group block rounded-3xl bg-slate-50 border border-slate-100 p-6 hover:shadow-lg transition-all">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{item.category}</p>
                    <h4 className="mt-3 font-heading text-xl font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="mt-3 text-sm text-slate-600">{item.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-secondary transition-colors">Read More <ArrowRight size={14} /></span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] bg-primary px-8 py-12 text-white text-center"
          >
            <h2 className="font-heading text-4xl font-bold">Ready to Start Your Journey?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-blue-100">
              Complete Admin CRM to manage students, applications, and college data.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/admin" className="rounded-full bg-white px-8 py-3 font-semibold text-primary hover:bg-slate-100 transition-colors">Admin Dashboard</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/916309959539"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <Footer />
    </main>
  );
}
