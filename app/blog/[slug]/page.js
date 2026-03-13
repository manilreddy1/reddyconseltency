"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Tag, ArrowLeft } from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        const docSnap = await getDoc(doc(db, "blogs", slug));
        if (docSnap.exists()) {
          setPost({ slug: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-slate-900">Post Not Found</h1>
          <Link href="/blog" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-white font-semibold">Back to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-primary pb-20 pt-32">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm mb-6">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary">{post.category}</span>
            <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-5xl leading-tight">{post.title}</h1>
            <div className="mt-6 flex items-center gap-4 text-sm text-blue-200">
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.publishedAt}</span>
              {post.tags && post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1"><Tag size={12} /> {tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-24">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white border border-slate-100 p-8 sm:p-12 shadow-sm"
        >
          <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">{post.excerpt}</p>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">{post.content}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Need Help with Your Application?</h3>
            <p className="text-slate-600 mb-6">Our expert counselors can help you with {post.category.toLowerCase()} and more.</p>
            <Link href="/contact" className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors">
              Get Free Consultation
            </Link>
          </div>
        </motion.article>
      </div>

      <Footer />
    </main>
  );
}
