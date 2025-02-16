import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCode, faBook } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Developer Tools', href: '/dev-tools' },
    { name: 'Optimization Guide', href: '/optimization' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/90 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 
                           flex items-center justify-center shadow-lg overflow-hidden"
            >
              <Link href="/" className="w-full h-full">
                <img
                  src="/lappyicon.png"
                  alt="Lappy Lab Logo"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            <div>
              <div
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                             bg-clip-text text-transparent whitespace-nowrap"
              >
                Lappy Lab
              </div>
              <div className="text-xs text-gray-400">
                Developer Tools & Tutorials
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 
                         flex items-center gap-2 text-sm font-medium"
            >
              <FontAwesomeIcon icon={faHome} className="text-blue-400" />
              Home
            </Link>
            <Link
              href="/dev-tools"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 
                         flex items-center gap-2 text-sm font-medium"
            >
              <FontAwesomeIcon icon={faCode} className="text-purple-400" />
              Developer Tools
            </Link>
            <Link
              href="/optimization"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 
                         flex items-center gap-2 text-sm font-medium"
            >
              <FontAwesomeIcon icon={faBook} className="text-pink-400" />
              Optimization Guide
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
