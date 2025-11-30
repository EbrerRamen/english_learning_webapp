"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { useState } from "react";

export default function ClientNavbar() {
  const { user, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0C2B4E] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-bold text-[#F4F4F4]">
          EnglishApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {loading ? (
            <div className="text-sm">Loading...</div>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-[#1D546C] transition font-medium"
              >
                Dashboard
              </Link>
              <span className="text-sm text-gray-300">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[#1D546C] transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#1D546C] hover:bg-[#0C2B4E] px-4 py-2 rounded-full transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a1f35] px-6 py-4 space-y-3">
          {loading ? (
            <div className="text-sm">Loading...</div>
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="block hover:text-[#1D546C] transition"
              >
                Dashboard
              </Link>
              <div className="text-sm text-gray-300">{user.name}</div>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block hover:text-[#1D546C] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block bg-[#1D546C] hover:bg-[#0C2B4E] px-4 py-2 rounded transition text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
