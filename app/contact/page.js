"use client";

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { company } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-primary pb-20 pt-32">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white sm:text-6xl"
          >
            Contact <span className="text-secondary">Our Experts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 mx-auto max-w-2xl text-lg text-blue-100"
          >
            Start your global education journey today. Book a free consultation with our senior counselors.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.5fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">Whether you have questions about specific universities, need scholarship assistance, or are ready to apply, our team is here to help.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary/10 p-3 text-secondary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Our Office</h3>
                    <p className="mt-1 text-slate-600">{company.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary/10 p-3 text-secondary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone & WhatsApp</h3>
                    <p className="mt-1 text-slate-600">{company.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-secondary/10 p-3 text-secondary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Enquiries</h3>
                    <p className="mt-1 text-slate-600">{company.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 p-8 text-white">
              <h3 className="font-semibold text-xl mb-2">Connect on WhatsApp</h3>
              <p className="text-slate-400 text-sm mb-4">Get quick answers from our support team.</p>
              <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full rounded-full bg-[#25D366] px-6 py-3 font-semibold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2">
                Chat with us
              </a>
              <a href={`https://instagram.com/${company.instagram}`} target="_blank" rel="noopener noreferrer" className="mt-3 w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                Follow on Instagram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x:  20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-x-10 translate-y-10"></div>
            
            <div className="relative">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Request Free Consultation</h2>
              <p className="text-slate-500 mb-8 text-sm">Fill out the form below and we will contact you within 24 hours.</p>
              <LeadCaptureForm />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
