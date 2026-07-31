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
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/inquiry')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">SupportFlow</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white">
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
                  className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${isActive(link.path)
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 transition-colors ${isActive(link.path) ? 'text-blue-400' : 'text-slate-500'}`} />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/30">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-slate-100 truncate">{user?.name}</p>
              <p className="text-xs font-semibold text-slate-400 truncate">{user?.role}</p>
            </div>
          </div>
          {(user?.role === 'Admin' || user?.role === 'Support Agent') && (
            <Link to="/dashboard" className="flex items-center justify-center w-full px-4 py-2 mb-2 text-sm font-bold text-indigo-400 bg-indigo-900/20 rounded-xl hover:bg-indigo-900/40 border border-indigo-900/50 transition-colors">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          )}
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-bold text-rose-400 bg-rose-900/20 rounded-xl hover:bg-rose-900/40 border border-rose-900/50 transition-colors"
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
