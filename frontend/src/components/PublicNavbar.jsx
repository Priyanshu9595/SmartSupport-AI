import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PublicNavbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">SupportFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
            <Link to="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Services</Link>
            <Link to="/help" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">FAQ</Link>
            <Link to="/inquiry" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Inquiry</Link>
            <Link to="/submit-ticket" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Submit Ticket</Link>
            <Link to="/my-profile" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">History</Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">Hi, {user.name}</span>
                {user.role === 'Admin' || user.role === 'Support Agent' ? (
                  <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">Dashboard</Link>
                ) : null}
                <button onClick={() => { logout(); navigate('/'); }} className="text-slate-500 hover:text-red-600 font-medium transition-colors">Logout</button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm"
                >
                  Start <ChevronDown size={16} className="ml-1" />
                </button>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <Link to="/login" className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
                      Login as a Client
                    </Link>
                    <div className="border-t border-slate-100"></div>
                    <Link to="/login" className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
                      Login as an Admin
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-500 hover:text-slate-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Home</Link>
          <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Services</Link>
          <Link to="/help" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">FAQ</Link>
          <Link to="/inquiry" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Inquiry</Link>
          <Link to="/submit-ticket" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">Submit Ticket</Link>
          <Link to="/my-profile" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50">History</Link>
          
          {!user && (
            <div className="pt-4 pb-2 border-t border-slate-100 mt-2">
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-bold text-blue-600 hover:bg-blue-50">Login as Client</Link>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-bold text-blue-600 hover:bg-blue-50">Login as Admin</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
