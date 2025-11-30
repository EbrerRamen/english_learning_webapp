import "./globals.css"; // import Tailwind
import ClientNavbar from "./components/ClientNavbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        <ClientNavbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
