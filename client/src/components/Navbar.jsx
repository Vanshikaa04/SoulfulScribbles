import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/products' },
    ...(admin
      ? [{ name: 'Dashboard', path: '/admin' }]
      : [{ name: 'Login', path: '/admin/login', icon: <FaUser className="inline mr-1" /> }]),
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/S.png" alt="Soulful Scribble" className="h-10 w-auto" />
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">Soulful Scribble</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative text-gray-600 hover:text-darkBrown transition-all duration-300 hover:scale-105 ${
                  location.pathname === item.path
                    ? 'text-darkBrown font-bold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-darkBrown'
                    : ''
                }`}
              >
                {item.icon && item.icon}
                {item.name}
              </Link>
            ))}
            {admin && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-600 hover:text-darkBrown transition-all duration-300 hover:scale-105"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 pb-4 space-y-3"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-2 text-gray-600 hover:text-darkBrown transition-all ${
                    location.pathname === item.path ? 'text-darkBrown font-bold' : ''
                  }`}
                >
                  {item.icon && item.icon}
                  {item.name}
                </Link>
              ))}
              {admin && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-600 hover:text-darkBrown transition-all"
                >
                  <FaSignOutAlt className="inline mr-1" />
                  Logout
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;