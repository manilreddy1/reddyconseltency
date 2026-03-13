export const company = {
 name: "Reddy Consultancy",
 phone: "+91 6309959539",
 email: "reddyconsultancy999@gmail.com",
 address: "Hyderabad, Telangana, India",
 instagram: "Reddy.consultancy",
 whatsapp: "916309959539"
};

export const navLinks = [
 { href: "/about", label: "About" },
 { href: "/services", label: "Services" },
 { href: "/courses", label: "Courses" },
 { href: "/colleges", label: "Colleges" },
 { href: "/success-stories", label: "Success Stories" },
 { href: "/blog", label: "Blog" },
 { href: "/contact", label: "Contact" }
];

// All static data arrays (stats, services, courses, colleges, testimonials, blogPosts) 
// have been successfully migrated to Firebase Firestore.
// The Next.js components now fetch this data dynamically.

export const analyticsMetrics = [
 { label: "Total Leads", value: "843", change: "+12.8%" },
 { label: "Leads Today", value: "18", change: "+8.4%" },
 { label: "Conversions", value: "124", change: "+5.1%" },
 { label: "Revenue", value: "Rs. 6.2L", change: "+14.2%" },
 { label: "Appointments", value: "56", change: "+18.6%" }
];

export const leadPipeline = [
 { name: "Kiran Reddy", course: "B.Tech CSE", location: "Hyderabad", status: "New" },
 { name: "Sneha Rao", course: "B.Tech ECE", location: "Warangal", status: "Interested" },
 { name: "Vamshi Kumar", course: "B.Tech Mechanical", location: "Karimnagar", status: "Converted" }
];

export const appointments = [
 { student: "Kiran Reddy", counselor: "Srinivas Reddy", date: "14 Mar 2026", time: "4:00 PM", status: "Confirmed" },
 { student: "Sneha Rao", counselor: "Srinivas Reddy", date: "15 Mar 2026", time: "11:00 AM", status: "Pending" }
];

export const studentApplications = [
 { college: "IARE", program: "B.Tech CSE", status: "Under Review", progress: 70 },
 { college: "CMR College of Engineering & Technology", program: "B.Tech ECE", status: "Submitted", progress: 55 }
];

export const paymentPackages = [
 { name: "Basic Consultation", price: "Rs. 2,999", description: "One-on-one counseling session with college shortlisting and seat availability check." },
 { name: "Premium Admission Support", price: "Rs. 14,999", description: "End-to-end admission support including documentation, seat booking, and fee payment guidance." },
 { name: "Complete B.Tech Package", price: "Rs. 24,999", description: "Full admission management across multiple colleges with scholarship assistance and priority support." }
];
