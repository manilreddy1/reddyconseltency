import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import {
  stats,
  services,
  courses,
  colleges,
  testimonials,
  blogPosts
} from "../lib/site-data.js";

async function seedData() {
  console.log("Starting database seed...");

  // Seed Stats
  console.log("Seeding Stats...");
  const statsRef = collection(db, "stats");
  for (const item of stats) {
    await addDoc(statsRef, item);
  }

  // Seed Services
  console.log("Seeding Services...");
  const servicesRef = collection(db, "services");
  for (const item of services) {
    await addDoc(servicesRef, item);
  }

  // Seed Courses
  console.log("Seeding Courses...");
  for (const item of courses) {
    await setDoc(doc(db, "courses", item.slug), item);
  }

  // Seed Colleges
  console.log("Seeding Colleges...");
  for (const item of colleges) {
    await setDoc(doc(db, "colleges", item.slug), item);
  }

  // Seed Testimonials
  console.log("Seeding Testimonials...");
  const testimonialsRef = collection(db, "testimonials");
  for (const item of testimonials) {
    await addDoc(testimonialsRef, item);
  }

  // Seed Blog Posts
  console.log("Seeding Blogs...");
  for (const item of blogPosts) {
    await setDoc(doc(db, "blogs", item.slug), item);
  }

  console.log("Database seed complete! 🎉");
  process.exit(0);
}

seedData().catch(console.error);
