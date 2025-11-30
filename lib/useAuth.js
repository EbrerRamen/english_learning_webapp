"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifyToken = async (token) => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem("authToken");
        setUser(null);
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial token check
    const token = localStorage.getItem("authToken");
    verifyToken(token);

    // Listen for custom auth event (same page token change)
    const handleAuthChange = () => {
      const newToken = localStorage.getItem("authToken");
      if (newToken) {
        setLoading(true);
        verifyToken(newToken);
      }
    };

    // Listen for storage changes (token added from another tab)
    const handleStorageChange = (e) => {
      if (e.key === "authToken") {
        const newToken = localStorage.getItem("authToken");
        if (newToken) {
          setLoading(true);
          verifyToken(newToken);
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("authTokenChanged", handleAuthChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("authTokenChanged", handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    router.push("/");
  };

  return { user, loading, logout };
}
