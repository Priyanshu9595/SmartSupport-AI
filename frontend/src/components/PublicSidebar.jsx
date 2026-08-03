import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Zap, HelpCircle, MessageSquare, Ticket, History, LogOut, LayoutDashboard, X } from 'lucide-react';

const PublicSidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Inquiry', path: '/inquiry', icon: MessageSquare },
    { name: 'Submit Ticket', path: '/submit-ticket', icon: Ticket },
    { name: 'History', path: '/my-profile', icon: History },
    { name: 'FAQ', path: '/help', icon: HelpCircle },
    { name: 'Services', path: '/services', icon: Zap },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64 bg-sidebar-bg border-r border-sidebar-border flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/inquiry')}>
            <img src="/favicon.svg" alt="SupportFlow Logo" className="w-8 h-8 mr-2" />
            <span className="font-extrabold text-xl text-white tracking-tight">SupportFlow</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-sidebar-text hover:text-sidebar-text-hover">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-2 px-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-all ${isActive(link.path)
                    ? 'bg-sidebar-active-bg text-sidebar-active-text border-l-[3px] border-l-brand-600 pl-[13px]'
                    : 'text-sidebar-text hover:bg-sidebar-active-bg/50 hover:text-sidebar-text-hover pl-4'
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-colors ${isActive(link.path) ? 'text-sidebar-active-text' : 'text-sidebar-text'}`} />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border bg-sidebar-bg">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-lg bg-brand-600 flex items-center justify-center text-white font-medium shadow-sm">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-[#F1F5F9] truncate">{user?.name}</p>
              <p className="text-xs text-[#94A3B8] truncate">{user?.role}</p>
            </div>
          </div>
          {(user?.role === 'Admin' || user?.role === 'Support Agent') && (
            <Link to="/dashboard" className="flex items-center justify-center w-full px-4 py-2 mb-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-[rgba(37,99,235,0.1)] transition-colors">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          )}
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white/80 bg-transparent hover:bg-white/10 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default PublicSidebar;
