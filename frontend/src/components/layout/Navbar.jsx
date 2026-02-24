import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Menu, X, Hospital, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin, isDoctor, isPatient } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    if (isAdmin) {
      return [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/doctors', label: 'Doctors' },
        { to: '/admin/users', label: 'Users' },
        { to: '/admin/appointments', label: 'Appointments' },
      ];
    }
    if (isDoctor) {
      return [
        { to: '/doctor', label: 'Dashboard' },
        { to: '/doctor/appointments', label: 'Appointments' },
      ];
    }
    if (isPatient) {
      return [
        { to: '/patient', label: 'Dashboard' },
        { to: '/patient/book', label: 'Book Appointment' },
        { to: '/patient/appointments', label: 'My Appointments' },
        { to: '/patient/prescriptions', label: 'Prescriptions' },
        { to: '/patient/profile', label: 'Profile' },
      ];
    }
    return [];
  };

  const navLinks = getNavLinks();

  const roleColors = {
    admin: 'bg-purple-600',
    doctor: 'bg-green-600',
    patient: 'bg-blue-600',
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-blue-600 text-xl">
            <Hospital className="h-7 w-7" />
            <span className="hidden sm:block">MediCare HMS</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full ${roleColors[user?.role]} flex items-center justify-center`}>
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="pt-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
