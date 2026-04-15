import Link from "next/link";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">KeenKeeper</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Keep your friendships alive and never lose touch again.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <Link href="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <Link href="/timeline" className="text-gray-400 hover:text-white">
            Timeline
          </Link>
          <Link href="/stats" className="text-gray-400 hover:text-white">
            Stats
          </Link>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} KeenKeeper. All rights reserved.
      </div>
    </footer>
  );
}