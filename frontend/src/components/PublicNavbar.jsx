import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PublicNavbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'FAQ', path: '/help' },
    { name: 'Inquiry', path: '/inquiry' },
    { name: 'Submit Ticket', path: '/submit-ticket' },
    { name: 'History', path: '/my-profile' },
  ];

  return (
    <header className="bg-slate-950/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">SupportFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path) 
                    ? 'bg-blue-900/40 text-blue-400 shadow-sm' 
                    : 'text-slate-300 hover:text-blue-600 hover:bg-slate-800'
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
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-800 pl-2 pr-4 py-1.5 rounded-full shadow-sm">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {(user?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-200">{(user?.name || 'User').split(' ')[0]}</span>
                </div>
                {user.role === 'Admin' || user.role === 'Support Agent' ? (
                  <Link to="/dashboard" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Dashboard</Link>
                ) : null}
                <button 
                  onClick={() => { logout(); navigate('/'); }} 
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/30 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
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
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-xl shadow-lg border border-slate-800 py-1 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <Link to="/login?type=client" className="block px-4 py-3 text-sm text-slate-200 hover:bg-blue-900/40 hover:text-blue-400 font-medium transition-colors">
                      Login as a Client
                    </Link>
                    <div className="border-t border-slate-800"></div>
                    <Link to="/login?type=admin" className="block px-4 py-3 text-sm text-slate-200 hover:bg-blue-900/40 hover:text-blue-400 font-medium transition-colors">
                      Login as an Admin
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-500 hover:text-slate-200">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl absolute w-full left-0 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-blue-900/40 text-blue-400'
                  : 'text-slate-200 hover:text-blue-600 hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {!user && (
            <div className="pt-4 pb-2 border-t border-slate-800 mt-2">
              <Link to="/login?type=client" className="block px-3 py-2 rounded-md text-base font-bold text-blue-600 hover:bg-blue-900/40">Login as Client</Link>
              <Link to="/login?type=admin" className="block px-3 py-2 rounded-md text-base font-bold text-blue-600 hover:bg-blue-900/40">Login as Admin</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
