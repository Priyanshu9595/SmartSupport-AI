import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import { Zap } from 'lucide-react';

const PublicLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-950">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Simple Dark Footer */}
      <footer className="bg-slate-950 py-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Zap size={18} className="text-white" fill="currentColor" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">SupportFlow</span>
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/services" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Features</Link>
              <Link to="/pricing" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Pricing</Link>
              <Link to="/help" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">FAQ</Link>
              <Link to="/inquiry" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Contact</Link>
            </div>
            
            {/* Copyright */}
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} SupportFlow. All rights reserved.
            </p>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
