import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Ticket, 
  Users, 
  Book, 
  Calendar, 
  BarChart3,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-surface border border-border rounded-xl p-6 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:shadow-[0_4px_8px_-2px_rgba(16,24,40,0.08)] transition-shadow">
    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-5">
      <Icon size={20} className="text-brand-600" />
    </div>
    <h3 className="text-[18px] font-semibold text-text-primary mb-2 leading-tight">{title}</h3>
    <p className="text-[14px] text-text-secondary leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    if (user.role === 'Admin' || user.role === 'Support Agent') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/my-profile" replace />;
  }

  return (
    <div className="min-h-screen bg-app flex flex-col font-sans selection:bg-brand-100 selection:text-brand-700">

      <main className="flex-grow w-full">
        
        {/* HERO SECTION */}
        <section className="relative w-full max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center text-center animate-in fade-in duration-500">
          
          {/* Subtle radial tint */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-brand-600 opacity-5 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center bg-brand-50 text-brand-700 text-[12px] font-medium px-3 py-1 rounded-full mb-6">
              AI-powered support desk
            </div>
            
            {/* H1 */}
            <h1 className="text-[32px] md:text-[52px] font-semibold text-text-primary tracking-[-0.02em] leading-[1.1] mb-6 max-w-4xl">
              Automate customer support with <span className="text-brand-600">human-like AI</span>
            </h1>
            
            {/* Sub */}
            <p className="text-[18px] text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Instantly resolve FAQs, capture high-quality leads, and schedule appointments 24/7. Scale your support without growing your headcount.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-6">
              <Link to="/register" className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg text-[14px] font-medium transition-colors">
                Start for free
              </Link>
              <Link to="/inquiry" className="w-full sm:w-auto bg-surface border border-border text-text-primary px-6 py-3 rounded-lg text-[14px] font-medium hover:bg-subtle transition-colors shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                Book a demo
              </Link>
            </div>
            
            {/* Trust line */}
            <p className="text-[13px] text-text-muted">
              No credit card required · Setup in under 5 minutes
            </p>
          </div>
        </section>



        {/* LOGO STRIP */}
        <section className="w-full max-w-6xl mx-auto px-6 py-12 md:py-20 border-t border-border flex flex-col items-center">
          <p className="text-[13px] text-text-muted mb-8 text-center font-medium">Trusted by support teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale">
            <div className="font-bold text-xl text-text-primary flex items-center gap-2"><div className="w-6 h-6 rounded bg-text-secondary" /> Acme Corp</div>
            <div className="font-bold text-xl text-text-primary flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-text-secondary" /> GlobalTech</div>
            <div className="font-bold text-xl text-text-primary flex items-center gap-2"><div className="w-6 h-6 rounded-tl-xl rounded-br-xl bg-text-secondary" /> InnovateIO</div>
            <div className="font-bold text-xl text-text-primary hidden sm:flex items-center gap-2"><div className="w-6 h-6 rounded-tr-xl bg-text-secondary" /> CloudSync</div>
            <div className="font-bold text-xl text-text-primary hidden md:flex items-center gap-2"><div className="w-6 h-6 rounded bg-text-secondary rotate-45" /> Nexus</div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="w-full py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-[28px] md:text-[36px] font-semibold text-text-primary mb-4 tracking-[-0.01em]">Everything you need to support customers</h2>
              <p className="text-[16px] text-text-secondary">A complete suite of tools designed to automate repetitive tasks and delight your users.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard icon={MessageSquare} title="AI Chatbot" description="Deploy an intelligent virtual assistant that answers questions accurately using your own data." />
              <FeatureCard icon={Ticket} title="Ticket Management" description="Centralize and organize all customer inquiries with intuitive tools for human agents." />
              <FeatureCard icon={Users} title="Lead Capture" description="Automatically gather contact information and qualify prospects while they chat." />
              <FeatureCard icon={Book} title="Knowledge Base" description="Create self-serve articles that sync directly with your AI to provide instant answers." />
              <FeatureCard icon={Calendar} title="Appointment Scheduling" description="Let customers book meetings with your team without any back-and-forth emails." />
              <FeatureCard icon={BarChart3} title="Analytics Dashboard" description="Track ticket volume, resolution times, and AI performance with clear reporting." />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="w-full py-16 md:py-20 bg-subtle border-y border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-[28px] md:text-[36px] font-semibold text-text-primary mb-4 tracking-[-0.01em]">How it works</h2>
              <p className="text-[16px] text-text-secondary">From a customer's first question to a complete resolution in seconds.</p>
            </div>

            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[40px] left-[16%] right-[16%] h-[1px] border-t border-dashed border-border" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {[
                  { step: '1', title: 'Connect your data', desc: 'Import your FAQs, website content, or previous tickets to train the AI instantly.' },
                  { step: '2', title: 'AI analyzes intent', desc: 'When a customer asks a question, the engine understands context and finds the right answer.' },
                  { step: '3', title: 'Instant resolution', desc: 'The AI replies accurately, captures a lead, or routes complex issues to a human.' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-surface rounded-full border border-border shadow-[0_1px_2px_rgba(16,24,40,0.05)] flex items-center justify-center mb-6 relative">
                      <span className="text-[24px] font-semibold text-brand-600">{item.step}</span>
                    </div>
                    <h3 className="text-[18px] font-semibold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-[14px] text-text-secondary leading-relaxed max-w-[260px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAND */}
        <section className="w-full py-16 md:py-20 bg-surface border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '60%', label: 'fewer tickets' },
                { number: '24/7', label: 'coverage' },
                { number: '<2min', label: 'first response' },
                { number: '50+', label: 'integrations' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-[32px] font-semibold text-brand-600 mb-1">{stat.number}</div>
                  <div className="text-[14px] text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="w-full py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-surface border border-border rounded-xl p-8 md:p-12 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[20px] md:text-[24px] font-medium text-text-primary leading-snug mb-8">
                "SupportFlow completely changed how we handle customer inquiries. Our small team now operates like a 24/7 enterprise support desk."
              </blockquote>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-subtle rounded-full border border-border mb-3 overflow-hidden">
                   <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <div className="text-[14px] font-semibold text-text-primary">Sarah Jenkins</div>
                <div className="text-[13px] text-text-secondary">Head of Customer Success, TechStart</div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="w-full py-16 md:py-24 px-6 mb-12">
          <div className="max-w-5xl mx-auto bg-brand-600 rounded-2xl py-16 px-6 md:px-12 text-center">
            <h2 className="text-[28px] md:text-[36px] font-semibold text-white mb-4 tracking-[-0.01em]">
              Ready to automate your support?
            </h2>
            <p className="text-[16px] text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses using SupportFlow to resolve tickets faster and delight customers 24/7.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/register" className="w-full sm:w-auto bg-white text-brand-700 px-6 py-3 rounded-lg text-[14px] font-medium transition-colors shadow-sm">
                Start your free trial
              </Link>
              <Link to="/inquiry" className="w-full sm:w-auto bg-transparent border border-white text-white px-6 py-3 rounded-lg text-[14px] font-medium hover:bg-white/10 transition-colors">
                Contact sales
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default LandingPage;
