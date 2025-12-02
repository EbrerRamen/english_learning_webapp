"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeatureCard from "./components/FeatureCard";
import CTAButton from "./components/CTAButton";

export default function HomePage() {
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return; // not logged in

      setVerifying(true);
      try {
        const res = await fetch("/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          // valid token — redirect to dashboard
          router.replace("/dashboard");
        } else {
          // invalid token — remove it
          localStorage.removeItem("authToken");
        }
      } catch (err) {
        localStorage.removeItem("authToken");
      } finally {
        setVerifying(false);
      }
    };

    checkAuth();
  }, [router]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3D64] mx-auto mb-4"></div>
          <p className="text-lg text-[#0C2B4E]">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-[#0C2B4E] to-[#1A3D64] text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Learn English Effortlessly</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Interactive lessons, quizzes, and flashcards designed for Bengali speakers.</p>
        <CTAButton
          href="/register"
          text="Get Started for Free"
          className="bg-[#1D546C] hover:bg-[#0C2B4E] text-white px-8 py-3 rounded-full font-semibold shadow-lg transition"
        />
      </section>
      {/* Feature Section */}
      <section className="container mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <FeatureCard icon="📚" color="#1A3D64" title="Vocabulary" description="Learn thousands of English words with Bangla meanings." />
        <FeatureCard icon="📝" color="#0C2B4E" title="Grammar" description="Understand English grammar with simple examples." />
        <FeatureCard icon="🎧" color="#1D546C" title="Listening & Speaking" description="Practice pronunciation and listening with interactive exercises." />
      </section>

      {/* Preview Lesson / Demo */}
      <section className="text-center py-20 px-6 bg-[#1A3D64] text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Try a Free Sample Lesson</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">Get a taste of our lessons without signing up.</p>
        <CTAButton href="/lessons/sample" text="View Sample Lesson" className="bg-[#1D546C] hover:bg-[#0C2B4E] text-white px-8 py-3 rounded-full font-semibold shadow-lg transition" />
      </section>
    </div>
  );
}
