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
  ArrowRight,
  Check,
  Star,
  BookOpen,
  Search,
  Mail,
  MessageCircle,
  Hash
} from 'lucide-react';
import { motion } from 'framer-motion';

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

  const HeroMockup = () => (
    <div className="w-full flex justify-center items-center py-12 md:py-16" style={{ perspective: '1600px' }}>
      <div className="relative w-full max-w-[500px] aspect-[4/3] bg-white rounded-xl border border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col z-10" style={{ transform: 'rotateY(-6deg) rotateX(2deg)' }}>
        <div className="h-10 border-b border-border flex items-center px-4 gap-2 bg-surface">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-4 h-5 flex-1 max-w-[200px] rounded bg-white border border-border shadow-sm flex items-center px-3">
            <span className="text-[10px] text-text-muted font-medium">app.supportflow.com</span>
          </div>
        </div>
        <div className="flex-1 flex bg-white">
          <div className="w-16 border-r border-border flex flex-col items-center py-4 gap-6 bg-surface">
            <div className="w-8 h-8 rounded bg-brand-50 flex items-center justify-center text-brand-600"><MessageSquare className="w-4 h-4" /></div>
            <div className="w-8 h-8 rounded flex items-center justify-center text-text-muted"><Ticket className="w-4 h-4" /></div>
            <div className="w-8 h-8 rounded flex items-center justify-center text-text-muted"><Users className="w-4 h-4" /></div>
          </div>
          <div className="flex-1 flex flex-col bg-white">
            <div className="p-5 border-b border-border">
              <div className="text-[14px] font-semibold text-text-primary mb-1">Issue with API integration</div>
              <div className="text-[12px] text-text-secondary">Sarah Jenkins • Enterprise Plan</div>
            </div>
            <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden relative bg-app">
              <div className="self-start max-w-[80%] bg-white border border-border shadow-sm p-3 rounded-xl rounded-tl-sm text-[13px] text-text-primary">
                Hi, I'm getting a 401 error when trying to use the new endpoints.
              </div>
              <div className="self-end max-w-[80%] bg-white border border-brand-600/30 shadow-[0_2px_10px_rgba(194,112,61,0.05)] p-3 rounded-xl rounded-tr-sm text-[13px] text-text-primary">
                <div className="flex items-center gap-2 mb-2 text-[11px] text-brand-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" /> AI Agent
                </div>
                I see you're using an older API key format. Let me generate a new v2 key for your workspace.
              </div>
            </div>
            <div className="p-3 border-t border-border bg-white flex items-center m-4 rounded-lg shadow-sm border">
              <span className="text-[12px] text-text-muted">Type a message...</span>
            </div>
          </div>
        </div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 top-1/4 bg-white/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl flex items-center gap-3 z-20">
          <div className="w-8 h-8 rounded-full bg-success-bg flex items-center justify-center"><Check className="w-4 h-4 text-success-text" /></div>
          <div><div className="text-[11px] text-text-secondary uppercase tracking-wider font-bold">Resolved in</div><div className="text-[15px] font-bold text-text-primary">8 seconds</div></div>
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -left-10 bottom-1/4 bg-white/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-xl flex items-center gap-3 z-20">
          <div className="w-8 h-8 rounded-full bg-warning-bg flex items-center justify-center"><Star className="w-4 h-4 text-warning-text fill-warning-text" /></div>
          <div><div className="text-[11px] text-text-secondary uppercase tracking-wider font-bold">CSAT Score</div><div className="text-[15px] font-bold text-text-primary">4.9/5.0</div></div>
        </motion.div>
      </div>
    </div>
  );

  const BentoGrid = () => (
    <div className="max-w-6xl mx-auto px-6 pb-16 md:pb-20">
      <div className="text-center mb-16 max-w-3xl mx-auto pt-16 md:pt-20">
        <h2 className="text-[28px] md:text-[36px] font-semibold text-text-primary mb-4 tracking-[-0.01em]">Everything you need to support customers</h2>
        <p className="text-[16px] text-text-secondary">A complete suite of tools designed to automate repetitive tasks and delight your users.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
        <div className="md:col-span-2 bg-white border border-border rounded-2xl p-8 relative group overflow-hidden transition-all shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-600/20 flex items-center justify-center mb-6 relative z-10"><MessageSquare className="w-5 h-5 text-brand-600" /></div>
          <h3 className="text-xl font-bold text-text-primary mb-2 relative z-10">AI-Powered Inbox</h3>
          <p className="text-text-secondary text-[15px] max-w-sm relative z-10">Automatically route, tag, and draft responses to common queries before your agents even see them.</p>
          <div className="absolute right-0 bottom-0 w-[85%] md:w-[70%] bg-app border-t border-l border-border rounded-tl-2xl p-4 md:p-6 shadow-sm flex flex-col gap-3">
            <div className="h-2 w-1/4 bg-border-strong rounded mb-2" />
            <div className="p-3 bg-white rounded-xl rounded-tl-sm text-[11px] md:text-[12px] text-text-secondary border border-border shadow-sm font-medium self-start w-fit max-w-[85%] leading-relaxed">
              Where is my order? I haven't received it yet.
            </div>
            <div className="p-3 bg-brand-50 border border-brand-600/20 rounded-xl rounded-tr-sm text-[11px] md:text-[12px] text-brand-600 font-semibold flex items-center gap-2 self-end w-fit max-w-[85%]">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse flex-shrink-0" />
              <span className="truncate">Drafting response based on tracking ID...</span>
            </div>
          </div>
        </div>
        <div className="md:row-span-2 bg-white border border-border rounded-2xl p-8 relative group overflow-hidden transition-all shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-600/20 flex items-center justify-center mb-6 relative z-10"><Ticket className="w-5 h-5 text-brand-600" /></div>
          <h3 className="text-xl font-bold text-text-primary mb-2 relative z-10">Unified Queue</h3>
          <p className="text-text-secondary text-[15px] relative z-10 mb-8">Email, chat, social — all in one seamless stream.</p>
          <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-app to-transparent pt-12 px-6 pb-6 flex flex-col justify-end gap-3 z-0">
            <div className="bg-white p-3 rounded-lg border border-border flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-[#E35D5D] flex items-center justify-center text-white"><Mail size={12}/></div><div className="w-20 h-2 bg-border-strong rounded" /></div>
              <div className="w-4 h-4 rounded-full bg-border-strong" />
            </div>
            <div className="bg-white p-3 rounded-lg border border-border flex items-center justify-between shadow-sm border-l-2 border-l-brand-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-50/50" />
              <div className="flex items-center gap-3 relative z-10"><div className="w-6 h-6 rounded bg-[#25D366] flex items-center justify-center text-white"><MessageCircle size={12}/></div><div className="w-24 h-2 bg-brand-600/40 rounded" /></div>
              <div className="w-4 h-4 rounded-full bg-brand-600 relative z-10" />
            </div>
            <div className="bg-white p-3 rounded-lg border border-border flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-[#1DA1F2] flex items-center justify-center text-white"><Hash size={12}/></div><div className="w-16 h-2 bg-border-strong rounded" /></div>
              <div className="w-4 h-4 rounded-full bg-border-strong" />
            </div>
            <div className="bg-white p-3 rounded-lg border border-border flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-brand-600 flex items-center justify-center text-white"><MessageSquare size={12}/></div><div className="w-24 h-2 bg-border-strong rounded" /></div>
              <div className="w-4 h-4 rounded-full bg-border-strong" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 relative group overflow-hidden transition-all shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-600/20 flex items-center justify-center mb-6 relative z-10"><Users className="w-5 h-5 text-brand-600" /></div>
          <h3 className="text-xl font-bold text-text-primary mb-2 relative z-10">Team Collab</h3>
          <p className="text-text-secondary text-[15px] relative z-10">Private notes & mentions.</p>
          <div className="absolute right-0 bottom-0 w-[75%] bg-warning-bg/40 border-t border-l border-warning-border rounded-tl-xl p-4 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
               <div className="w-5 h-5 rounded bg-brand-600 text-white flex items-center justify-center text-[9px] font-bold">You</div>
               <span className="text-[10px] text-text-secondary font-medium">Internal Note</span>
            </div>
            <div className="text-[12px] text-text-primary leading-tight"><span className="font-bold text-brand-600 bg-brand-50 px-1 rounded">@sarah</span> can you check the refund status for this order?</div>
          </div>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 relative group overflow-hidden transition-all shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-600/20 flex items-center justify-center mb-6 relative z-10"><BookOpen className="w-5 h-5 text-brand-600" /></div>
          <h3 className="text-xl font-bold text-text-primary mb-2 relative z-10">Knowledge Base</h3>
          <p className="text-text-secondary text-[15px] relative z-10">Self-serve articles.</p>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[85%] h-[55%] bg-app border-t border-x border-border rounded-t-xl p-4 shadow-sm flex flex-col gap-3">
            <div className="w-full bg-white border border-border rounded-md p-2.5 flex items-center gap-2 shadow-sm">
              <Search size={12} className="text-text-muted" />
              <div className="h-1.5 w-1/3 bg-border-strong rounded" />
            </div>
            <div className="w-full bg-white border border-border rounded-md p-3 flex items-center gap-3 shadow-sm">
              <div className="w-6 h-6 rounded bg-brand-50 flex items-center justify-center text-brand-600"><BookOpen size={10} /></div>
              <div className="flex flex-col gap-1.5 w-full"><div className="h-2 w-1/2 bg-border-strong rounded" /><div className="h-1.5 w-1/3 bg-border-strong/50 rounded" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-app flex flex-col font-sans selection:bg-brand-100 selection:text-brand-700">

      <main className="flex-grow w-full">

        {/* HERO SECTION */}
        <section className="relative w-full max-w-6xl mx-auto px-6 py-12 md:py-24 animate-in fade-in duration-500 overflow-hidden md:overflow-visible">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-brand-600 opacity-5 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-[1fr_1.1fr] gap-8 md:gap-12 items-center">
            {/* Text Details */}
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center bg-brand-50 text-brand-700 text-[12px] font-medium px-3 py-1 rounded-full mb-6">
                AI-powered support desk
              </div>
              
              <h1 className="text-[32px] md:text-[52px] font-semibold text-text-primary tracking-[-0.02em] leading-[1.1] mb-6 max-w-xl">
                Automate customer support with <span className="text-brand-600">human-like AI</span>
              </h1>
              
              <p className="text-[18px] text-text-secondary mb-10 leading-relaxed max-w-lg">
                Instantly resolve FAQs, capture high-quality leads, and schedule appointments 24/7. Scale your support without growing your headcount.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-6">
                <Link to="/register" className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg text-[14px] font-medium transition-colors text-center">
                  Start for free
                </Link>
                <Link to="/inquiry" className="w-full sm:w-auto bg-surface border border-border text-text-primary px-6 py-3 rounded-lg text-[14px] font-medium hover:bg-subtle transition-colors shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-center">
                  Book a demo
                </Link>
              </div>
              <p className="text-[13px] text-text-muted">
                No credit card required · Setup in under 5 minutes
              </p>
            </div>
            
            {/* 3D Mockup */}
            <HeroMockup />
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
        <section className="w-full bg-app">
          <BentoGrid />
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
