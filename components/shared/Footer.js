import Link from "next/link";
import { company, navLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-secondary mb-4">{company.name}</h2>
          <p className="text-slate-400 text-sm">{company.address}</p>
          <p className="text-slate-400 text-sm mt-2">{company.phone}</p>
          <p className="text-slate-400 text-sm mt-2">{company.email}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-secondary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/services" className="hover:text-secondary transition-colors">College Admission</Link></li>
            <li><Link href="/services" className="hover:text-secondary transition-colors">Career Counseling</Link></li>
            <li><Link href="/services" className="hover:text-secondary transition-colors">Study Abroad</Link></li>
            <li><Link href="/services" className="hover:text-secondary transition-colors">Visa Guidance</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Join Us</h3>
          <p className="text-sm text-slate-400 mb-4">Sign up for our newsletter to get the latest admission tips.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="email" placeholder="Email address" className="bg-white/10 rounded-lg px-4 py-2 text-sm flex-1 min-w-0 outline-none border border-white/20 focus:border-secondary" />
            <button className="bg-secondary text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-400 transition-colors whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} {company.name}. All rights reserved. Premium Education Consultancy.
      </div>
    </footer>
  );
}
