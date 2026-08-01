import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-surface">
      {/* Left Panel - Hidden on small screens */}
      <div className="hidden lg:flex w-1/2 bg-sidebar-bg text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10 flex items-center">
          <img src="/favicon.svg" alt="SupportFlow Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-extrabold tracking-tight text-white">SupportFlow</h1>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-[1.05] mb-6 tracking-tight text-white">
            GET<br />STARTED.
          </h2>
          <p className="text-xl text-[#94A3B8] max-w-md leading-relaxed font-medium">
            Join SupportFlow today to experience AI-powered ticket resolution and seamless agent handoffs.
          </p>
        </div>
        
        <div className="relative z-10 text-text-muted text-sm">
          © {new Date().getFullYear()} SupportFlow AI
        </div>

        {/* Subtle gradient blob for depth */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-surface text-text-primary flex flex-col relative p-6 sm:p-12">
        {/* Back to Home Link */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-12">
          <Link to="/" className="text-sm font-medium text-text-secondary hover:text-text-primary flex items-center transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to home
          </Link>
        </div>

        {/* Register Form Container */}
        <div className="flex-grow flex flex-col justify-center max-w-md w-full mx-auto mt-12 sm:mt-0">
          <h2 className="text-[30px] font-semibold mb-3 tracking-tight text-text-primary">Create account</h2>
          <p className="text-text-secondary mb-10 text-[16px]">Sign up to get started.</p>
          
          {error && <div className="mb-6 bg-danger-bg text-danger-text border-l-4 border-danger-text p-4 text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[14px] font-medium text-text-primary mb-2">Full name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface border border-border-strong text-text-primary px-3 py-2 h-10 outline-none rounded-lg transition-all focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-text-primary mb-2">Work email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-border-strong text-text-primary px-3 py-2 h-10 outline-none rounded-lg transition-all focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-text-primary mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-border-strong text-text-primary px-3 py-2 h-10 outline-none rounded-lg transition-all focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm py-2.5 px-4 flex justify-center items-center rounded-lg transition-colors shadow-sm mt-2"
            >
              Create account <ArrowRight size={18} className="ml-2" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-text-secondary">
              Already have an account? <Link to="/login" className="text-brand-600 hover:text-brand-700 font-semibold ml-1 hover:underline transition-all">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
