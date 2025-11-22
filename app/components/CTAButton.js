import Link from "next/link";

export default function CTAButton({ href, text }) {
  return (
    <Link
      href={href}
      className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 font-medium"
    >
      {text}
    </Link>
  );
}
