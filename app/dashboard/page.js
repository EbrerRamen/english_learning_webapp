"use client";

import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [lessonsLoading, setLessonsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // TODO: Create an endpoint to get all lessons
        // For now, we'll just fetch the sample lesson
        const res = await fetch("/api/lessons/sample");
        if (res.ok) {
          const lesson = await res.json();
          setLessons([lesson]);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLessonsLoading(false);
      }
    };

    if (user) {
      fetchLessons();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3D64] mx-auto mb-4"></div>
          <p className="text-lg text-[#0C2B4E]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-[#0C2B4E] to-[#1A3D64] text-white rounded-lg p-8 mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-lg opacity-90">
            Continue your English learning journey with our interactive lessons.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-[#1A3D64] mb-2">0</div>
            <p className="text-gray-600">Lessons Completed</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-[#1A3D64] mb-2">0</div>
            <p className="text-gray-600">Current Streak</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-[#1A3D64] mb-2">0</div>
            <p className="text-gray-600">Points Earned</p>
          </div>
        </section>

        {/* Available Lessons */}
        <section>
          <h2 className="text-3xl font-bold text-[#0C2B4E] mb-6">Available Lessons</h2>
          
          {lessonsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3D64] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading lessons...</p>
            </div>
          ) : lessons.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">No lessons available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="bg-gradient-to-r from-[#1A3D64] to-[#1D546C] text-white p-6">
                    <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                    <p className="text-sm opacity-90">{lesson.description}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {lesson.level}
                      </span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                        {lesson.category}
                      </span>
                    </div>
                    <Link
                      href={`/lessons/${lesson._id}`}
                      className="block text-center bg-[#1A3D64] hover:bg-[#0C2B4E] text-white py-2 rounded-lg font-semibold transition"
                    >
                      Start Lesson
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
