import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PublicNavbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Inquiry', path: '/inquiry' },
    { name: 'Submit Ticket', path: '/submit-ticket' },
    { name: 'History', path: '/my-profile' },
    { name: 'FAQ', path: '/help' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <header className={`h-16 sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-border' : 'bg-white border-b border-border'}`}>
      <div className="max-w-6xl mx-auto px-6 h-full">
        <div className="flex justify-between h-full items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="/favicon.svg" alt="SupportFlow Logo" className="w-8 h-8 mr-3" />
            <span className="font-bold text-lg text-text-primary tracking-tight">SupportFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[14px] font-medium transition-colors duration-200 ${isActive(link.path)
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 pl-2 pr-4 py-1.5 rounded-full">
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
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-[14px] text-text-secondary hover:text-text-primary font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-[14px] font-medium transition-colors flex items-center"
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
          <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 md:hidden top-16" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="md:hidden bg-white border-b border-border px-4 pt-2 pb-6 space-y-2 shadow-lg absolute w-full left-0 z-50 top-16">
            {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                ? 'bg-brand-50 text-brand-600'
                : 'text-text-secondary hover:text-text-primary hover:bg-subtle'
                }`}
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="pt-4 pb-2 border-t border-border mt-4 flex flex-col space-y-3 px-2">
              <Link to="/login" className="block px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-subtle text-center transition-colors border border-transparent">Login</Link>
              <Link to="/register" className="block px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 text-center transition-colors">Start for free</Link>
            </div>
          )}
        </div>
        </>
      )}
    </header>
  );
};

export default PublicNavbar;
