import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCode,
  faBook,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Header component hiển thị logo, tên thương hiệu và điều hướng chính.
 * Bao gồm menu di động đáp ứng.
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = (
    <>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 
                     flex items-center gap-2 text-sm font-medium lg:text-base"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <FontAwesomeIcon icon={faHome} className="text-blue-400" />
        Home
      </Link>
      <Link
        href="/dev-tools"
        className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 
                     flex items-center gap-2 text-sm font-medium lg:text-base"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <FontAwesomeIcon icon={faCode} className="text-purple-400" />
        Developer Tools
      </Link>
      <Link
        href="/optimization"
        className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 
                     flex items-center gap-2 text-sm font-medium lg:text-base"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <FontAwesomeIcon icon={faBook} className="text-pink-400" />
        Optimization Guide
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/90 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            {/* Logo Image */}
            <div
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 
                           flex items-center justify-center shadow-lg overflow-hidden relative"
            >
              <Link href="/" className="block w-full h-full">
                <Image
                  src="/lappyicon.png"
                  alt="Lappy Lab Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </Link>
            </div>
            {/* Brand Name */}
            <div>
              <div
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                             bg-clip-text text-transparent whitespace-nowrap"
              >
                Lappy Lab
              </div>
              <div className="hidden sm:block text-xs text-gray-400">
                Developer Tools & Tutorials
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Toggle mobile menu"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800/95 pb-4">
          <nav className="flex flex-col px-4 space-y-2">
            {navLinks}
          </nav>
        </div>
      )}
    </header>
  );
}
