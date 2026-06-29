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

  if (user?.role === 'Admin') {
    navItems.push({ name: 'Settings', path: '/dashboard/settings', icon: Settings });
  }

  return (
    <div className="flex h-screen text-white relative overflow-hidden bg-slate-950">

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/50 flex flex-col z-30 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/50">
          <span className="text-xl font-extrabold text-blue-400 tracking-tight">SupportFlow AI</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-slate-300">
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
                  className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                      : 'text-slate-300 hover:bg-slate-900 hover:shadow-sm hover:text-white'
                  }`}
                >
                  <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-xl bg-blue-900/40 flex items-center justify-center text-blue-400 font-bold shadow-inner">
              {user?.name?.charAt(0)}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-slate-100 truncate">{user?.name}</p>
              <p className="text-xs font-semibold text-slate-400 truncate">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-bold text-rose-400 bg-rose-900/30 rounded-xl hover:bg-rose-900/50 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden z-10 w-full">
        <header className="h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/50 flex items-center px-4 md:px-8 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 mr-4 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:bg-slate-950 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-extrabold text-slate-100 tracking-tight">
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
