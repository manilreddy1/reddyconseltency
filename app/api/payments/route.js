import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, "payments"), {
      ...body,
      createdAt: serverTimestamp()
    });
    return NextResponse.json({ message: "Payment recorded", id: docRef.id, provider: body.provider ? body.provider : "stripe", data: body });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
