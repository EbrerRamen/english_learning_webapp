"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#0C2B4E] mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Log in to continue learning.
        </p>

        {/* Error */}
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-[#1A3D64]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-[#1A3D64]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A3D64] hover:bg-[#0C2B4E] 
            text-white py-3 rounded-lg font-semibold transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link href="/register" className="text-[#1A3D64] font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
