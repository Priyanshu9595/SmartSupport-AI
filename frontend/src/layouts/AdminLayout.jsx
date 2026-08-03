import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Ticket,
  BookOpen,
  Users,
  Calendar,
  Settings,
  LogOut,
  MessageSquare,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setIsDesktopCollapsed(!isDesktopCollapsed);
    } else {
      setIsMobileOpen(true);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tickets', path: '/dashboard/tickets', icon: Ticket },
    { name: 'Knowledge Base', path: '/dashboard/kb', icon: BookOpen },
    { name: 'Leads', path: '/dashboard/leads', icon: Users },
    { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
    { name: 'Chatbot', path: '/dashboard/chatbot', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen text-text-primary overflow-hidden bg-app">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 bg-sidebar-bg border-r border-sidebar-border flex flex-col z-40 transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isDesktopCollapsed ? 'md:w-20' : 'md:w-64'} w-64
        `}
      >
        <div className={`flex items-center border-b border-sidebar-border overflow-hidden transition-all duration-300 ${isDesktopCollapsed ? 'justify-center h-16' : 'h-16 justify-between px-4'}`}>
          <div className={`items-center overflow-hidden whitespace-nowrap ${isDesktopCollapsed ? 'hidden' : 'flex'}`}>
            <img src="/favicon.svg" alt="SupportFlow Logo" className="w-8 h-8 flex-shrink-0" />
            <span className="text-xl font-extrabold text-white tracking-tight ml-2">
              SupportFlow
            </span>
          </div>
          
          <button 
            onClick={toggleSidebar} 
            className="hidden md:flex text-sidebar-text hover:text-sidebar-text-hover p-1.5 rounded-lg hover:bg-sidebar-active-bg/50 transition-colors"
          >
            {isDesktopCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>

          <button onClick={() => setIsMobileOpen(false)} className={`md:hidden text-sidebar-text hover:text-sidebar-text-hover p-1.5 ${isDesktopCollapsed ? 'hidden' : ''}`}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 overflow-x-hidden">
          <nav className="space-y-2 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  title={isDesktopCollapsed ? item.name : undefined}
                  className={`flex items-center py-3 text-sm font-medium transition-all rounded-lg overflow-hidden whitespace-nowrap ${
                    isDesktopCollapsed ? 'px-0 justify-center' : 'px-4'
                  } ${
                    isActive
                      ? 'bg-sidebar-active-bg text-sidebar-active-text'
                      : 'text-sidebar-text hover:bg-sidebar-active-bg/50 hover:text-sidebar-text-hover'
                  }`}
                >
                  <Icon className={`flex-shrink-0 h-5 w-5 ${isActive ? 'text-sidebar-active-text' : 'text-sidebar-text'} ${isDesktopCollapsed ? '' : 'mr-3'}`} />
                  <span className={`transition-opacity duration-300 ${isDesktopCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border bg-sidebar-bg overflow-hidden whitespace-nowrap flex items-center justify-between">
          <div className={`flex items-center ${isDesktopCollapsed ? 'w-full justify-center' : ''}`}>
            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-brand-600 flex items-center justify-center text-white font-medium shadow-sm">
              {user?.name?.charAt(0)}
            </div>
            <div className={`ml-3 transition-opacity duration-300 ${isDesktopCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
              <p className="text-sm font-medium text-[#F1F5F9] truncate">{user?.name}</p>
              <p className="text-xs text-[#94A3B8] truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className={`text-sidebar-text hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors ${isDesktopCollapsed ? 'hidden' : 'block'}`}
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full relative z-10">
        <header className="h-16 bg-surface border-b border-border flex items-center px-4 md:px-8">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 mr-4 bg-surface border border-border rounded-lg text-text-secondary hover:bg-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600/12"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-text-primary tracking-tight">
            {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
