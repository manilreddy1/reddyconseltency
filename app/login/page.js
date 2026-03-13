"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "ADMIN" }); // Defaulting to ADMIN for now as per user request
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;
        
        await setDoc(doc(db, "users", user.uid), {
          name: form.name || form.email.split("@")[0],
          email: user.email,
          role: form.role,
          createdAt: serverTimestamp()
        });

        if (form.role === "ADMIN") {
          document.cookie = "admin_session=true; path=/; max-age=86400";
        }
        window.location.href = form.role === "ADMIN" ? "/admin" : "/";
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userRole = userDoc.exists() ? userDoc.data().role : "STUDENT";
        
        if (userRole === "ADMIN") {
          document.cookie = "admin_session=true; path=/; max-age=86400";
        }
        window.location.href = userRole === "ADMIN" ? "/admin" : "/";
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setError("Account already exists with this email.");
      else if (err.code === 'auth/invalid-credential') setError("Invalid email or password.");
      else if (err.code === 'auth/weak-password') setError("Password should be at least 6 characters.");
      else setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050d1a] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shadow-glow">
                <ShieldCheck className="text-slate-950" size={28} />
              </div>
              <span className="font-heading text-3xl font-bold text-white tracking-tight">Reddy<span className="text-secondary">Consultancy</span></span>
            </motion.div>
          </Link>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-12 shadow-glass relative overflow-hidden">
          {/* Form Tabs */}
          

          <AnimatePresence mode="wait">
            <motion.div
              key={isRegister ? "register" : "login"}
              initial={{ opacity: 0, x: isRegister ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRegister ? -20 : 20 }}
              transition={{ duration: 0.2 }}
            >
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 px-4 py-3.5 text-sm text-red-300 flex items-center gap-3"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {isRegister && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-secondary transition-colors" size={20} />
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-4 text-white outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder-slate-600"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-secondary transition-colors" size={20} />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-4 text-white outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder-slate-600"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                    {!isRegister && (
                      <button type="button" className="text-xs font-bold text-secondary hover:text-white transition-colors">FORGOT?</button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-secondary transition-colors" size={20} />
                    <input
                      required
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-4 text-white outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder-slate-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-secondary px-8 py-4 font-bold text-slate-950 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      SECURELY ACCESSING...
                    </>
                  ) : (
                    <>
                      {isRegister ? "CREATE SECURE ACCOUNT" : "SIGN IN TO PORTAL"}
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="text-center mt-6">
          <button className="bg-secondary text-white px-6 py-2 rounded-full"  onClick={() => router.push("/")} > Home</button>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-slate-500"
        >
          Protected by end-to-end encryption. &copy; {new Date().getFullYear()} ReddyConsultancy.
        </motion.p>
      </motion.div>
    </main>
  );
}
