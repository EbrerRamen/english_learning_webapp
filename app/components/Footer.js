export default function Footer() {
  return (
    <footer className="bg-[#0C2B4E] text-[#F4F4F4] py-8">
      <div className="container mx-auto text-center">
        <p>© 2025 EnglishApp. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-[#1D546C] transition">Privacy Policy</a>
          <a href="#" className="hover:text-[#1D546C] transition">Terms of Service</a>
          <a href="#" className="hover:text-[#1D546C] transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
