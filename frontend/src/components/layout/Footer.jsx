import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a2342] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1abc9c] to-[#0d3060] flex items-center justify-center text-xl">🏥</div>
            <span className="text-2xl font-extrabold">Medi<span className="text-[#1abc9c]">Care</span></span>
          </Link>
          <p className="text-blue-300 text-sm leading-relaxed mb-6">
            Your trusted partner in healthcare management. Connecting patients, doctors, and hospitals seamlessly.
          </p>
          <div className="flex gap-3">
            {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#1abc9c] flex items-center justify-center text-sm font-bold transition-colors duration-200">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-[#1abc9c]">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { label: 'Home', to: '/' },
              { label: 'About Us', to: '/about' },
              { label: 'Our Services', to: '/#services' },
              { label: 'Contact', to: '/contact' },
              { label: 'Sign In', to: '/login' },
              { label: 'Register', to: '/register' },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-blue-300 hover:text-[#1abc9c] text-sm transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-4 h-0.5 bg-[#1abc9c] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Departments */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-[#1abc9c]">Departments</h4>
          <ul className="space-y-3">
            {['Cardiology', 'Neurology', 'Orthopedics', 'Ophthalmology', 'Pediatrics', 'General Medicine'].map((dep) => (
              <li key={dep}>
                <span className="text-blue-300 text-sm">{dep}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-[#1abc9c]">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="text-xl mt-0.5">📍</span>
              <span className="text-blue-300 text-sm">123 Medical Drive, Healthcare City, MH 440001</span>
            </li>
            <li className="flex gap-3 items-center">
              <span className="text-xl">📞</span>
              <span className="text-blue-300 text-sm">+91 98765 43210</span>
            </li>
            <li className="flex gap-3 items-center">
              <span className="text-xl">✉️</span>
              <span className="text-blue-300 text-sm">hello@medicare.care</span>
            </li>
            <li className="flex gap-3 items-center">
              <span className="text-xl">🕐</span>
              <span className="text-blue-300 text-sm">Emergency: 24/7</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-blue-400 text-sm">© {new Date().getFullYear()} MediCare. All rights reserved. Made with ❤️ by Tikesh</p>
          <div className="flex gap-6">
            <a href="#" className="text-blue-400 text-sm hover:text-[#1abc9c] transition-colors">Privacy Policy</a>
            <a href="#" className="text-blue-400 text-sm hover:text-[#1abc9c] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
