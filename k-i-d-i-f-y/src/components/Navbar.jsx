import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiMusic } from 'react-icons/fi';

export default function Navbar() {
  const location = useLocation();

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
        >
          <FiMusic className="text-purple-600 text-2xl group-hover:animate-bounce" />
          <span className="text-xl font-bold text-purple-600">
            K I D I F Y
          </span>
        </Link>

        {/* Tagline - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-2 text-gray-600">
          <FiMusic className="text-purple-400" />
          <span className="font-medium">Where music comes alive!</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`flex items-center gap-1 transition-colors ${
              isActive('/') 
                ? 'text-purple-600 font-semibold' 
                : 'text-gray-600 hover:text-purple-500'
            }`}
          >
            <FiHome className="text-lg" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          
          <Link 
            to="/search" 
            className={`flex items-center gap-1 transition-colors ${
              isActive('/search')
                ? 'text-purple-600 font-semibold'
                : 'text-gray-600 hover:text-purple-500'
            }`}
          >
            <FiSearch className="text-lg" />
            <span className="hidden sm:inline">Search</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}