"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SampleLessonPage() {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch("/api/lessons/sample");
        if (!response.ok) {
          throw new Error("Failed to fetch lesson");
        }
        const data = await response.json();
        setLesson(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3D64] mx-auto mb-4"></div>
          <p className="text-lg text-[#0C2B4E]">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error: {error}</p>
          <Link
            href="/"
            className="inline-block bg-[#1A3D64] text-white px-6 py-2 rounded-full hover:bg-[#0C2B4E] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#0C2B4E] mb-4">No lesson found</p>
          <Link
            href="/"
            className="inline-block bg-[#1A3D64] text-white px-6 py-2 rounded-full hover:bg-[#0C2B4E] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0C2B4E] to-[#1A3D64] text-white py-8 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link href="/" className="text-sm hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-lg opacity-90">{lesson.description}</p>
          <div className="flex gap-3 mt-4">
            <span className="inline-block bg-[#1D546C] px-3 py-1 rounded-full text-sm">
              {lesson.level}
            </span>
            <span className="inline-block bg-[#1D546C] px-3 py-1 rounded-full text-sm">
              {lesson.category}
            </span>
            <span className="inline-block bg-yellow-500 text-[#0C2B4E] px-3 py-1 rounded-full text-sm font-semibold">
              SAMPLE LESSON
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-3xl py-12 px-6">
        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#0C2B4E] mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {lesson.content?.introduction}
          </p>
        </section>

        {/* Main Content */}
        <section className="mb-8">
          {lesson.content?.mainContent?.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold text-[#1A3D64] mb-3">
                {section.heading}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">{section.text}</p>
              <div className="bg-[#F4F4F4] border-l-4 border-[#1D546C] p-4 rounded">
                <p className="text-gray-800 whitespace-pre-line font-mono text-sm">
                  {section.example}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Summary */}
        {lesson.content?.summary && (
          <section className="bg-blue-50 rounded-lg border-2 border-[#1A3D64] p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#0C2B4E] mb-4">Summary</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {lesson.content.summary}
            </p>
          </section>
        )}

        {/* Vocabulary */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#0C2B4E] mb-6">Key Vocabulary</h2>
            <div className="grid gap-4">
              {lesson.vocabulary.map((vocab, index) => (
                <div
                  key={index}
                  className="border-l-4 border-[#1D546C] bg-[#F4F4F4] p-4 rounded"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-[#0C2B4E]">
                      {vocab.word}
                    </h4>
                    <span className="text-sm bg-[#1A3D64] text-white px-3 py-1 rounded">
                      {vocab.bengaliMeaning}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">
                    <strong>Example:</strong> {vocab.example}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-8">
          <p className="text-gray-700 mb-6 text-lg">
            Ready to learn more? Sign up to access all our lessons!
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-[#1A3D64] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0C2B4E] transition"
            >
              Sign Up Now
            </Link>
            <Link
              href="/"
              className="bg-white text-[#1A3D64] border-2 border-[#1A3D64] px-8 py-3 rounded-full font-semibold hover:bg-[#F4F4F4] transition"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
