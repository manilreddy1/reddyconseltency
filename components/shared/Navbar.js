"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-2">
          {/* A rounded logo on white bg */}
          <div className="flex bg-blue-600 rounded-full p-1 overflow-hidden">
             <img src="/images/logo.png" alt="Reddy Consultancy" className="w-10 h-10 rounded-full bg-white object-contain" />
          </div>
          <span className="font-heading text-xl font-bold text-slate-900 hidden sm:block">Reddy Consultancy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blue-600 transition-colors">{item.label}</Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/contact" className="rounded-full border-2 border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors">
            Apply Now
          </Link>
          {/* <Link href="/login" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
            Student Portal
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[65px] z-[100] bg-white border-t border-slate-100 md:hidden overflow-y-auto">
          <nav className="flex flex-col items-center gap-1 px-6 py-8 h-full bg-slate-50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="w-full text-center rounded-xl px-4 py-4 text-lg font-semibold text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 hover:text-blue-600 transition-all shadow-sm"
              >
                {item.label}
              </Link>
            ))}
            <div className="w-full mt-6 pt-6 border-t border-slate-200 space-y-4">
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block w-full text-center rounded-full border-2 border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 hover:border-slate-300 transition-colors">
                Apply Now
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block w-full text-center rounded-full bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors">
                Student Portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
