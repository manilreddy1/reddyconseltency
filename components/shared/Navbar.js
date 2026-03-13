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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      
      {/* Navbar Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/images/logo.png"
            alt="Reddy Consultancy"
            className="w-9 h-9 rounded-full object-contain"
          />
          <span className="font-bold text-slate-900 text-base sm:text-lg">
            Reddy Consultancy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-slate-600">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full border border-slate-300 text-sm font-semibold hover:bg-slate-100 transition"
          >
            Apply Now
          </Link>

          <Link
            href="/login"
            className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 md:hidden flex flex-col"
          >

            {/* Mobile Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="font-bold text-lg">Menu</span>

              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={26} />
              </button>
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col px-6 py-6 space-y-2 text-lg font-semibold">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 rounded-lg hover:bg-slate-100 transition"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Buttons */}
              <div className="pt-6 flex flex-col gap-3">

                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3 rounded-xl border border-slate-300 font-semibold"
                >
                  Apply Now
                </Link>

                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3 rounded-xl bg-blue-600 text-white font-semibold"
                >
                  Admin Login
                </Link>

              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
