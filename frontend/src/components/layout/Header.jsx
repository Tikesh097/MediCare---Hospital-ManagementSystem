import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const getDashboardLink = () => {
    if (!user) return '/login';
    const map = { admin: '/admin', doctor: '/doctor', patient: '/patient' };
    return map[user.role] || '/login';
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/#services' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled || !isHome
        ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1abc9c] to-[#0d3060] flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
            🏥
          </div>
          <span className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
            scrolled || !isHome ? 'text-[#0a2342]' : 'text-white'
          }`}>
            Medi<span className="text-[#1abc9c]">Care</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#1abc9c] relative group ${
                scrolled || !isHome ? 'text-gray-600' : 'text-white/90'
              } ${location.pathname === link.to ? 'text-[#1abc9c]' : ''}`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1abc9c] group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to={getDashboardLink()}
                className="px-5 py-2 bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-semibold rounded-xl text-sm hover:shadow-md hover:shadow-[#1abc9c]/30 hover:scale-105 transition-all duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                  scrolled || !isHome
                    ? 'border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500'
                    : 'border-white/30 text-white hover:border-red-400 hover:text-red-400'
                }`}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-5 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                  scrolled || !isHome
                    ? 'border-gray-200 text-gray-700 hover:border-[#1abc9c] hover:text-[#1abc9c]'
                    : 'border-white/30 text-white hover:border-white/60'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-semibold rounded-xl text-sm hover:shadow-md hover:shadow-[#1abc9c]/30 hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors ${
            scrolled || !isHome ? 'text-[#0a2342]' : 'text-white'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-3 px-4 rounded-xl text-gray-700 font-medium hover:bg-[#e8f8f5] hover:text-[#1abc9c] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="py-3 text-center bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-bold rounded-xl">
                  Dashboard
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} className="py-3 text-center border-2 border-gray-200 text-red-500 font-semibold rounded-xl">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-3 text-center border-2 border-gray-200 text-gray-700 font-semibold rounded-xl">
                  Sign In
                </Link>
                <Link to="/register" className="py-3 text-center bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-bold rounded-xl">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
