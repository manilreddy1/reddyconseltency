import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email, courseInterested, preferredLocation, message } = body;

    // Expert Security: Server-side validation
    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "leads"), {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      courseInterested,
      preferredLocation: preferredLocation || null,
      message: message || null,
      status: "NEW",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
