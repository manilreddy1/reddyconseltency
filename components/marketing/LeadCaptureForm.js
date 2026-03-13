"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  courseInterested: z.string().min(2, "Course is required"),
  preferredLocation: z.string().optional(),
  message: z.string().max(500).optional(),
});

export function LeadCaptureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        reset();
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl bg-emerald-50 p-8 text-center border border-emerald-100">
        <h3 className="font-heading text-2xl font-semibold text-emerald-800">Thank You!</h3>
        <p className="mt-2 text-emerald-600">Your details have been submitted. Our counselor will contact you shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-6 rounded-full bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 transition"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
          <input
            {...register("name")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
          <input
            {...register("phone")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
        <input
          {...register("email")}
          type="email"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Course Interested</label>
          <select
            {...register("courseInterested")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          >
            <option value="">Select a course...</option>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech ECE">B.Tech ECE</option>
            <option value="B.Tech EEE">B.Tech EEE</option>
            <option value="B.Tech Mechanical">B.Tech Mechanical</option>
            <option value="B.Tech Civil">B.Tech Civil</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="B.Tech AI & ML">B.Tech AI & ML</option>
            <option value="B.Tech Data Science">B.Tech Data Science</option>
            <option value="B.Tech Cyber Security">B.Tech Cyber Security</option>
          </select>
          {errors.courseInterested && <p className="mt-1 text-xs text-red-500">{errors.courseInterested.message}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Preferred Location</label>
          <input
            {...register("preferredLocation")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            placeholder="e.g. Hyderabad, Telangana"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Message (Optional)</label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-900 px-4 py-3 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-primary px-6 py-4 font-semibold text-white hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Get Free Consultation"}
      </button>
    </form>
  );
}
