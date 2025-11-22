"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">EnglishApp</h1>
      <div className="space-x-4">
        <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
