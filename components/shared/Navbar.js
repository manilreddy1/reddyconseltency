"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/courses", label: "Courses" },
  { href: "/colleges", label: "Colleges" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex bg-blue-600 rounded-full p-1 overflow-hidden shrink-0">
             <img src="/images/logo.png" alt="Reddy Consultancy" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white object-contain" />
          </div>
          <span className="font-heading text-lg sm:text-xl font-bold text-slate-900 truncate max-w-[150px] sm:max-w-none">Reddy Consultancy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blue-600 transition-colors">{item.label}</Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" className="rounded-full border-2 border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors">
            Apply Now
          </Link>
          <Link href="/login" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all">
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors z-[70]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1000] bg-white md:hidden flex flex-col"
          >
            {/* Mobile Header (Repeat identity for context) */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-2">
                <div className="flex bg-blue-600 rounded-full p-1 overflow-hidden shrink-0">
                  <img src="/images/logo.png" alt="Logo" className="w-8 h-8 rounded-full bg-white object-contain" />
                </div>
                <span className="font-heading text-lg font-bold text-slate-900">Reddy Consultancy</span>
              </div>
              <button 
                onClick={() => setMobileOpen(false)} 
                className="p-2 rounded-lg text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8 bg-white">
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block w-full rounded-xl px-4 py-4 text-xl font-bold text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition-all border border-transparent active:border-slate-200"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-4"
              >
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="block w-full text-center rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 font-bold text-slate-900">
                  Apply Now
                </Link>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block w-full text-center rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/20">
                  Admin Login
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
