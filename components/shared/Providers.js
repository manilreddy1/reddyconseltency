"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export function Providers({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Only fetch if db exists
          if (db) {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            const userData = userDoc.exists() ? userDoc.data() : { role: "STUDENT", name: firebaseUser.email.split("@")[0] };
            
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.name,
              role: userData.role,
            });
          } else {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              role: "STUDENT",
              name: firebaseUser.email.split("@")[0],
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            role: "STUDENT",
            name: firebaseUser.email.split("@")[0],
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}
