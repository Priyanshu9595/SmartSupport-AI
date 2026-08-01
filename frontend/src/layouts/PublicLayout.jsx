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
          <footer className="bg-subtle border-t border-border mt-auto pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-4">
                    <img src="/favicon.svg" alt="SupportFlow Logo" className="w-8 h-8 mr-3" />
                    <span className="font-bold text-xl text-text-primary tracking-tight">SupportFlow</span>
                  </div>
                  <p className="text-text-secondary text-sm max-w-sm mb-6">
                    AI-powered support desk that helps you resolve tickets faster, capture leads, and book appointments 24/7.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-4 text-sm">Product</h4>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li><Link to="/services" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand-600 transition-colors">Features</Link></li>
                    <li><Link to="/pricing" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand-600 transition-colors">Pricing</Link></li>
                    <li><Link to="/integrations" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand-600 transition-colors">Integrations</Link></li>
                    <li><Link to="/help" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand-600 transition-colors">FAQ</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-4 text-sm">Company</h4>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li><Link to="/about" className="hover:text-brand-600 transition-colors">About Us</Link></li>
                    <li><Link to="/careers" className="hover:text-brand-600 transition-colors">Careers</Link></li>
                    <li><Link to="/blog" className="hover:text-brand-600 transition-colors">Blog</Link></li>
                    <li><Link to="/inquiry" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-brand-600 transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-4 text-sm">Legal</h4>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li><Link to="/terms" className="hover:text-brand-600 transition-colors">Terms of Service</Link></li>
                    <li><Link to="/privacy" className="hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
                    <li><Link to="/security" className="hover:text-brand-600 transition-colors">Security</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
