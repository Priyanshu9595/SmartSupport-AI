import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { faqs } from '../constants/faqs';
import {
  MessageSquare, HelpCircle, Calendar, Users, Sparkles, Brain, Zap,
  Rocket, Headphones, CheckCircle, Star, ArrowRight, ChevronDown, Bot
} from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Redirect if already logged in
  if (user) {
    if (user.role === 'Admin' || user.role === 'Support Agent') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/my-profile" replace />;
  }

  // Intersection Observer for scroll animations could be added here, 
  // but we'll use pure CSS animations for simplicity

  return (
    <div className="min-h-screen bg-bg-app flex flex-col font-sans overflow-x-hidden relative selection:bg-brand-100 selection:text-brand-700">

      {/* Decorative Background Effects - Premium Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-600/5 blur-[120px] mix-blend-multiply" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/5 blur-[120px] mix-blend-multiply" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-600/5 blur-[150px] mix-blend-multiply" />
      </div>

      <main className="flex-grow flex flex-col items-center w-full relative z-10">

        {/* HERO SECTION */}
        <section className="w-full max-w-7xl mx-auto px-4 pt-24 pb-20 md:pt-36 md:pb-32 flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-surface border border-border backdrop-blur-md text-[13px] font-bold text-text-primary shadow-sm hover:border-brand-500/30 transition-all cursor-default">
            <Sparkles size={16} className="text-brand-600 animate-pulse" />
            <span>Meet your new AI Support Agent</span>
            <span className="bg-brand-50 text-brand-700 text-[10px] px-2.5 py-0.5 rounded-full ml-2 font-extrabold tracking-wide uppercase">New</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up animation-delay-100 text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-text-primary tracking-tight mb-8 leading-[1.1] max-w-5xl mx-auto">
            Automate customer support with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 whitespace-nowrap drop-shadow-sm">
              human-like AI
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up animation-delay-200 text-[16px] md:text-[18px] text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Instantly resolve FAQs, capture high-quality leads, and schedule appointments 24/7. Scale your support without growing your headcount.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto relative">
            <Link
              to="/login"
              className="relative group bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-2xl text-[14px] font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              See it in action
              <ArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform" size={18} />
            </Link>
            <Link to="/login" className="relative group bg-surface backdrop-blur-md text-text-primary border border-border-strong px-8 py-3.5 rounded-2xl text-[14px] font-bold hover:bg-subtle hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full sm:w-auto shadow-sm">
              <Calendar className="mr-2 text-text-muted group-hover:text-brand-600 transition-colors" size={18} />
              Book a Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-in-up animation-delay-400 mt-20">
            <p className="text-[12px] font-bold text-text-muted mb-6 uppercase tracking-[0.2em]">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-3 font-bold text-2xl text-text-primary"><div className="w-8 h-8 rounded bg-gradient-to-br from-slate-300 to-slate-400"></div> Acme Corp</div>
              <div className="flex items-center gap-3 font-bold text-2xl text-text-primary"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400"></div> GlobalTech</div>
              <div className="flex items-center gap-3 font-bold text-2xl text-text-primary"><div className="w-8 h-8 rounded-tl-xl rounded-br-xl bg-gradient-to-br from-slate-300 to-slate-400"></div> InnovateIO</div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION - Glassmorphism Cards */}
        <section className="w-full py-24 relative z-10 border-t border-border bg-subtle/30 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">Everything you need to support customers</h2>
              <p className="text-[15px] md:text-[16px] text-text-secondary">A complete suite of tools designed to automate repetitive tasks and delight your users.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MessageSquare, color: 'text-brand-600', glow: 'shadow-brand-500/20', bg: 'bg-brand-50', title: 'Smart Chatbot', desc: 'AI-powered virtual assistant providing human-like answers 24/7.' },
                { icon: HelpCircle, color: 'text-emerald-600', glow: 'shadow-emerald-500/20', bg: 'bg-emerald-50', title: 'Knowledge Base', desc: 'Centralized repository of articles synced directly with the AI.' },
                { icon: Users, color: 'text-purple-600', glow: 'shadow-purple-500/20', bg: 'bg-purple-50', title: 'Lead Management', desc: 'Automatically capture contact details and score prospect intent.' },
                { icon: Calendar, color: 'text-orange-600', glow: 'shadow-orange-500/20', bg: 'bg-orange-50', title: 'Appointments', desc: 'Seamlessly schedule meetings and send automated email reminders.' }
              ].map((feat, i) => (
                <div key={i} className="group relative bg-surface p-8 rounded-3xl border border-border hover:border-brand-300 hover:shadow-md hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-subtle rounded-bl-full -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100`}></div>
                  <div className={`w-14 h-14 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg ${feat.glow} transition-all duration-300 relative z-10`}>
                    <feat.icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-[16px] font-bold text-text-primary mb-3 relative z-10">{feat.title}</h3>
                  <p className="text-[14px] text-text-secondary leading-relaxed flex-grow relative z-10">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="w-full py-24 relative z-10" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">How SupportFlow AI works</h2>
              <p className="text-[15px] md:text-[16px] text-text-secondary">From a customer's first question to a complete resolution in seconds.</p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-600/20 via-indigo-600/20 to-purple-600/20 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {[
                  { step: 1, icon: MessageSquare, title: 'Customer asks a question', desc: 'User interacts with the friendly chat widget on your website.' },
                  { step: 2, icon: Brain, title: 'AI analyzes intent', desc: 'Our engine searches your knowledge base and understands the context instantly.' },
                  { step: 3, icon: Zap, title: 'Instant resolution', desc: 'AI provides the exact answer, captures a lead, or books an appointment.' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-xl group-hover:bg-brand-500/30 transition-colors"></div>
                      <div className="w-24 h-24 bg-surface rounded-full shadow-md border border-border flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-600 text-white font-bold rounded-full flex items-center justify-center shadow-md border-2 border-surface">
                          {item.step}
                        </div>
                        <item.icon size={36} className="text-text-secondary group-hover:text-brand-600 transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-[16px] font-bold text-text-primary mb-3">{item.title}</h3>
                    <p className="text-[14px] text-text-secondary leading-relaxed max-w-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION - Modern Layout */}
        <section className="w-full py-24 relative overflow-hidden bg-brand-50 border-y border-brand-100" id="benefits">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1] text-brand-900">
                  Deliver exceptional support without the overhead
                </h2>
                <p className="text-brand-700 text-[16px] md:text-[18px] mb-10 leading-relaxed">
                  SupportFlow AI acts as your front-line defense, resolving up to 70% of routine customer queries automatically so your human team can focus on complex issues.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    'Available 24/7/365, no sleep required', 
                    'Instant response times (under 1 second)', 
                    'Reduces support ticket volume by 70%', 
                    'Seamless human handoff when necessary'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-4 bg-white border border-brand-100 rounded-2xl p-4 shadow-sm">
                      <div className="bg-brand-100 p-2 rounded-full">
                        <CheckCircle className="text-brand-600 shrink-0" size={20} />
                      </div>
                      <span className="text-brand-900 font-semibold text-[15px]">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-xl text-[14px] font-bold transition-all shadow-md hover:shadow-lg">
                  Get started for free <ArrowRight className="ml-2" size={18} />
                </Link>
              </div>
              
              <div className="relative lg:ml-auto w-full max-w-lg">
                {/* Dashboard Mockup - Glassmorphism */}
                <div className="bg-white/80 backdrop-blur-xl border border-border shadow-xl rounded-3xl p-4 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-bg-app rounded-2xl overflow-hidden flex flex-col border border-border">
                    {/* Header */}
                    <div className="h-12 bg-surface border-b border-border flex items-center px-5 gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      </div>
                      <div className="text-[12px] font-bold text-text-muted tracking-wide mx-auto">Dashboard Overview</div>
                    </div>
                    {/* Body */}
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Stat Cards */}
                      <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Total Tickets</div>
                        <div className="text-2xl font-extrabold text-text-primary">1,284</div>
                        <div className="text-[11px] text-success-text mt-2 font-bold flex items-center gap-1">
                          <span className="bg-success-bg px-1.5 py-0.5 rounded text-success-text">+12%</span> this week
                        </div>
                      </div>
                      <div className="bg-brand-50 border border-brand-100 p-4 rounded-2xl shadow-sm relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-10 text-brand-600"><Bot size={80} /></div>
                        <div className="text-[10px] font-bold text-brand-700 uppercase tracking-wider mb-2 relative z-10">AI Resolution</div>
                        <div className="text-2xl font-extrabold text-brand-900 relative z-10">73.5%</div>
                        <div className="text-[11px] text-brand-700 mt-2 font-semibold relative z-10">Automated successfully</div>
                      </div>

                      {/* Recent list */}
                      <div className="col-span-1 sm:grid-cols-2 sm:col-span-2 bg-surface p-4 rounded-2xl border border-border shadow-sm mt-2">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">Recent AI Actions</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-subtle border border-border rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="bg-success-bg p-1.5 rounded-lg text-success-text"><CheckCircle size={16} /></div>
                              <span className="font-semibold text-text-primary text-[13px]">Resolved login issue</span>
                            </div>
                            <span className="bg-success-bg text-success-text border border-success-text/20 px-2 py-1 rounded-md font-bold text-[10px] uppercase tracking-wide">Automated</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-subtle border border-border rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="bg-purple-50 p-1.5 rounded-lg text-purple-600"><Calendar size={16} /></div>
                              <span className="font-semibold text-text-primary text-[13px]">Booked Demo: Acme Corp</span>
                            </div>
                            <span className="bg-purple-50 text-purple-600 border border-purple-200 px-2 py-1 rounded-md font-bold text-[10px] uppercase tracking-wide">Scheduled</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="w-full py-24 relative z-10 bg-bg-app">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">Frequently asked questions</h2>
              <p className="text-[15px] md:text-[16px] text-text-secondary">Everything you need to know about the product and billing.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`bg-surface border ${expandedFaq === i ? 'border-brand-500 shadow-md' : 'border-border'} rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer`}
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <div className="px-6 py-5 flex justify-between items-center">
                    <h3 className={`text-[15px] font-bold transition-colors ${expandedFaq === i ? 'text-brand-600' : 'text-text-primary'}`}>
                      {faq.question}
                    </h3>
                    <div className={`p-1.5 rounded-full transition-colors ${expandedFaq === i ? 'bg-brand-50 text-brand-600' : 'bg-subtle text-text-muted'}`}>
                      <ChevronDown className={`transition-transform duration-300 ${expandedFaq === i ? 'rotate-180' : ''}`} size={16} />
                    </div>
                  </div>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${expandedFaq === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-text-secondary text-[14px] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/help" className="inline-flex items-center text-brand-600 font-bold hover:text-brand-700 transition-colors text-[14px]">
                View all FAQs <ArrowRight className="ml-1" size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION - Glow & Gradient */}
        <section className="w-full px-4 py-16 relative z-10 bg-bg-app">
          <div className="max-w-5xl mx-auto relative flex flex-col items-center text-center bg-brand-700 rounded-2xl py-16 px-6 overflow-hidden shadow-2xl">
            
            {/* Background effects for CTA */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-[36px] font-bold text-white mb-6 leading-tight tracking-tight">
                Ready to transform your customer support?
              </h2>
              <p className="text-[16px] text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join businesses using SupportFlow AI to automate interactions, reduce costs, and delight customers 24/7.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                <Link to="/register" className="bg-surface text-brand-700 px-8 py-3.5 rounded-xl text-[14px] font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                  <Rocket className="mr-2" size={18} />
                  Start your free trial
                </Link>
                <Link to="/inquiry" className="bg-transparent border border-white text-white px-8 py-3.5 rounded-xl text-[14px] font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                  <Headphones className="mr-2" size={18} />
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
