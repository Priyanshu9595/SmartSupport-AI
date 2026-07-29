import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdminLogin = searchParams.get('type') === 'admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'Customer') {
        navigate('/');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50 dark:bg-slate-950">
      {/* Left Panel - Hidden on small screens */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10 flex items-center">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 font-bold text-xl">S</div>
          <h1 className="text-2xl font-black tracking-tight text-white">SupportFlow</h1>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-[1.05] mb-6 tracking-tight text-white">
            UNIFIED<br />WORKSPACE.
          </h2>
          <p className="text-xl text-slate-400 max-w-md leading-relaxed font-medium">
            One intelligent portal for everyone. Customers get instant answers, while your support team gets the tools they need to succeed.
          </p>
        </div>
        
        <div className="relative z-10 text-slate-500 text-sm font-semibold tracking-widest uppercase">
          © {new Date().getFullYear()} SupportFlow AI
        </div>

        {/* Subtle gradient blob for depth */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col relative p-6 sm:p-12">
        {/* Back to Home Link */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-12">
          <Link to="/" className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest flex items-center transition-colors">
            <ArrowLeft size={16} className="mr-2" /> BACK TO HOME
          </Link>
        </div>

        {/* Login Form Container */}
        <div className="flex-grow flex flex-col justify-center max-w-md w-full mx-auto mt-12 sm:mt-0">
          <h2 className="text-4xl font-extrabold mb-3 tracking-tight text-slate-900 dark:text-white">LOG IN</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">Enter your credentials to access your role dashboard.</p>
          
          {error && <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-l-4 border-red-500 p-4 text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white px-4 py-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none placeholder-slate-400 dark:placeholder-slate-500 rounded-lg transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white px-4 py-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none placeholder-slate-400 dark:placeholder-slate-500 rounded-lg transition-all"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm uppercase tracking-widest py-4 px-4 flex justify-center items-center rounded-lg transition-colors mt-2"
            >
              SIGN IN <ArrowRight size={18} className="ml-2" strokeWidth={3} />
            </button>
          </form>

          {!isAdminLogin && (
            <div className="mt-6 text-center">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Don't have an account? <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-bold ml-1 hover:underline transition-all">Sign up</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
