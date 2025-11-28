import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#0C2B4E] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-bold text-[#F4F4F4]">
          EnglishApp
        </Link>
        <div className="space-x-6">
          <Link href="/login" className="hover:text-[#1D546C] transition">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-[#1D546C] hover:bg-[#0C2B4E] px-4 py-2 rounded-full transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
