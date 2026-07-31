import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PublicNavbar = () => {
  const { user, logout } = useAuth();
  // removed dropdownOpen state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Inquiry', path: '/inquiry' },
    { name: 'Submit Ticket', path: '/submit-ticket' },
    { name: 'History', path: '/my-profile' },
    { name: 'FAQ', path: '/help' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <header className="bg-surface shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-text-primary tracking-tight">SupportFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(link.path)
                  ? 'bg-brand-50 text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-subtle'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-surface border border-border pl-2 pr-4 py-1.5 rounded-full shadow-sm">
                  <div className="w-7 h-7 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 text-xs font-medium">
                    {(user?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-text-primary">{(user?.name || 'User').split(' ')[0]}</span>
                </div>
                {user.role === 'Admin' || user.role === 'Support Agent' ? (
                  <Link to="/dashboard" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">Dashboard</Link>
                ) : null}
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2 text-text-muted hover:text-danger-text hover:bg-danger-bg rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-text-secondary hover:text-text-primary px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm"
                >
                  Start for free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-text-secondary hover:text-text-primary">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="md:hidden bg-surface border-b border-border px-4 pt-2 pb-6 space-y-1 shadow-2xl absolute w-full left-0 z-50 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.path)
                ? 'bg-brand-50 text-brand-600'
                : 'text-text-secondary hover:text-brand-600 hover:bg-subtle'
                }`}
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="pt-4 pb-2 border-t border-border mt-2 flex flex-col space-y-2 px-2">
              <Link to="/login" className="block px-4 py-2 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-subtle text-center transition-colors">Login</Link>
              <Link to="/register" className="block px-4 py-2 rounded-lg text-base font-medium text-white bg-brand-600 hover:bg-brand-700 text-center shadow-sm transition-colors">Start for free</Link>
            </div>
          )}
        </div>
        </>
      )}
    </header>
  );
};

export default PublicNavbar;
