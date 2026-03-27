import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-softWhite shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-darkBrown hover:text-accentPink transition">
          Soulful Scribble
        </Link>
        <div className="space-x-6 text-darkBrown">
          <button onClick={() => scrollToSection('about')} className="hover:text-accentPink">About</button>
          <button onClick={() => scrollToSection('products')} className="hover:text-accentPink">Products</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-accentPink">FAQ</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-accentPink">Contact</button>
          {admin ? (
            <>
              <Link to="/admin" className="hover:text-accentPink">Dashboard</Link>
              <button onClick={handleLogout} className="hover:text-accentPink">Logout</button>
            </>
          ) : (
            <Link to="/admin/login" className="hover:text-accentPink">Admin</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;