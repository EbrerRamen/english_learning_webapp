import Link from "next/link";

export default function CTAButton({ href, text, className }) {
  return (
    <Link
      href={href}
      className={`inline-block ${className}`}
    >
      {text}
    </Link>
  );
}
