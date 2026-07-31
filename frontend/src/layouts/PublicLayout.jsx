import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicSidebar from '../components/PublicSidebar';
import { useAuth } from '../context/AuthContext';
import { Zap, Menu } from 'lucide-react';

const PublicLayout = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`flex flex-col min-h-screen font-sans bg-app ${user ? 'md:flex-row' : ''}`}>
      
      {user ? (
        <>
          <PublicSidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
          {/* Mobile Header for Sidebar Mode */}
          <div className="md:hidden flex items-center justify-between h-16 bg-surface px-4 border-b border-border sticky top-0 z-30">
            <Link to="/inquiry" className="flex items-center cursor-pointer">
               <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-2">
                 <span className="text-white font-bold text-lg">S</span>
               </div>
               <span className="font-bold text-xl text-text-primary tracking-tight">SupportFlow</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(true)} className="text-text-secondary hover:text-brand-600 transition-colors">
               <Menu size={24} />
            </button>
          </div>
        </>
      ) : (
        <PublicNavbar />
      )}

      <div className={`flex-grow flex flex-col w-full ${user ? 'md:pl-64' : ''}`}>
        <main className="flex-grow">
          <Outlet />
        </main>
        
        {/* Simple Footer */}
        {!user && (
          <footer className="bg-surface py-8 border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Logo */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-3">
                    <Zap size={18} className="text-white" fill="currentColor" />
                  </div>
                  <span className="font-bold text-xl text-text-primary tracking-tight">SupportFlow</span>
                </div>
                
                {/* Links */}
                <div className="flex flex-wrap justify-center gap-8">
                  <Link to="/services" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-text-secondary hover:text-brand-600 text-sm font-medium transition-colors">Features</Link>
                  <Link to="/pricing" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-text-secondary hover:text-brand-600 text-sm font-medium transition-colors">Pricing</Link>
                  <Link to="/help" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-text-secondary hover:text-brand-600 text-sm font-medium transition-colors">FAQ</Link>
                  <Link to="/inquiry" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-text-secondary hover:text-brand-600 text-sm font-medium transition-colors">Contact</Link>
                </div>
                
                {/* Copyright */}
                <p className="text-text-muted text-sm">
                  © {new Date().getFullYear()} SupportFlow. All rights reserved.
                </p>

              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default PublicLayout;
