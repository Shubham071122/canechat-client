import { Link } from 'react-router-dom';
import Logo from '../assets/ce-logo.png';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2 group-hover:scale-105 transition-transform duration-200">
              <img src={Logo} alt="Can-e-Chat Logo" className="w-full h-full" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Can-e-Chat
            </span>
          </Link>

          {/* Navigation Links */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors">
                Contact
              </a>
            </div>
          )}

          {/* Auth Buttons */}
          {!isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
