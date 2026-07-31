import React, { useState } from 'react';
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
  X
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tickets', path: '/dashboard/tickets', icon: Ticket },
    { name: 'Knowledge Base', path: '/dashboard/kb', icon: BookOpen },
    { name: 'Leads', path: '/dashboard/leads', icon: Users },
    { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar },
    { name: 'Chatbot', path: '/dashboard/chatbot', icon: MessageSquare },
  ];

  // Settings route removed as per request
  return (
    <div className="flex h-screen text-text-primary relative overflow-hidden bg-app">

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-sidebar-bg border-r border-sidebar-border flex flex-col z-30 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-brand-600 text-white flex items-center justify-center font-bold text-lg rounded mr-2 shadow-sm">S</div>
            <span className="text-xl font-extrabold text-white tracking-tight">SupportFlow</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="text-sidebar-text hover:text-sidebar-text-hover">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-all ${isActive
                      ? 'bg-sidebar-active-bg text-sidebar-active-text border-l-[3px] border-l-brand-600 pl-[13px]'
                      : 'text-sidebar-text hover:bg-sidebar-active-bg/50 hover:text-sidebar-text-hover pl-4'
                    }`}
                >
                  <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-sidebar-active-text' : 'text-sidebar-text'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border bg-sidebar-bg">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-lg bg-brand-600 flex items-center justify-center text-white font-medium shadow-sm">
              {user?.name?.charAt(0)}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-[#F1F5F9] truncate">{user?.name}</p>
              <p className="text-xs text-[#64748B] truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-danger-text bg-transparent hover:bg-[rgba(248,113,113,0.1)] rounded-lg transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden z-10 w-full">
        <header className="h-16 bg-surface border-b border-border flex items-center px-4 md:px-8">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 mr-4 bg-surface border border-border rounded-lg text-text-secondary hover:bg-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-brand-600/12"
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
