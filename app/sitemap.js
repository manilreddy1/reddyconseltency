import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function sitemap() {
  const base = "https://admitglobal.example.com";
  const pages = ["", "/about", "/services", "/courses", "/colleges", "/success-stories", "/blog", "/contact", "/login", "/admin"];
  
  const routes = pages.map(url => ({
    url: base + url,
    lastModified: new Date()
  }));

  try {
    // Safety check for DB initialization
    if (!db) {
      console.warn("Firebase DB not initialized. Skipping dynamic sitemap routes.");
      return routes;
    }

    const [coursesSnap, collegesSnap, blogsSnap] = await Promise.all([
      getDocs(collection(db, "courses")),
      getDocs(collection(db, "colleges")),
      getDocs(collection(db, "blogs")),
    ]);

    coursesSnap.forEach(doc => {
      const data = doc.data();
      if (data.slug) routes.push({ url: `${base}/courses/${data.slug}`, lastModified: new Date() });
    });
    
    collegesSnap.forEach(doc => {
      const data = doc.data();
      if (data.slug) routes.push({ url: `${base}/colleges/${data.slug}`, lastModified: new Date() });
    });
    
    blogsSnap.forEach(doc => {
      const data = doc.data();
      if (data.slug) {
        // Handle Firestore Timestamp or ISO string
        const date = data.createdAt?.toDate ? data.createdAt.toDate() : (data.publishedAt ? new Date(data.publishedAt) : new Date());
        routes.push({ url: `${base}/blog/${data.slug}`, lastModified: date });
      }
    });
  } catch (error) {
    console.warn("Failed to fetch dynamic routes for sitemap from Firebase", error);
  }

  return routes;
}
