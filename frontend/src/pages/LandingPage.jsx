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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans overflow-x-hidden relative selection:bg-blue-500/30 selection:text-blue-200">

      {/* Decorative Background Effects - Premium Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] dark:bg-blue-600/20 mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] dark:bg-indigo-600/20 mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[150px] dark:bg-purple-600/20 mix-blend-screen" />
      </div>

      <main className="flex-grow flex flex-col items-center w-full relative z-10">

        {/* HERO SECTION */}
        <section className="w-full max-w-7xl mx-auto px-4 pt-24 pb-20 md:pt-36 md:pb-32 flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm hover:border-blue-500/30 transition-all cursor-default">
            <Sparkles size={16} className="text-blue-500 animate-pulse" />
            <span>Meet your new AI Support Agent</span>
            <span className="bg-blue-500/10 text-blue-500 dark:text-blue-400 text-xs px-2.5 py-0.5 rounded-full ml-2 font-bold tracking-wide">NEW</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up animation-delay-100 text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1] max-w-5xl mx-auto">
            Automate customer support with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 whitespace-nowrap drop-shadow-sm">
              human-like AI
            </span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up animation-delay-200 text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Instantly resolve FAQs, capture high-quality leads, and schedule appointments 24/7. Scale your support without growing your headcount.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-110 opacity-0 sm:group-hover:opacity-100 transition-opacity"></div>
            <Link
              to="/login"
              className="relative group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full sm:w-auto border border-blue-400/20"
            >
              See it in action
              <ArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform" size={20} />
            </Link>
            <Link to="/login" className="relative group bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-slate-700/50 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full sm:w-auto shadow-sm">
              <Calendar className="mr-2 text-slate-500 group-hover:text-blue-500 transition-colors" size={20} />
              Book a Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-in-up animation-delay-400 mt-20">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-[0.2em]">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-3 font-bold text-2xl text-slate-800 dark:text-slate-200"><div className="w-8 h-8 rounded bg-gradient-to-br from-slate-400 to-slate-600"></div> Acme Corp</div>
              <div className="flex items-center gap-3 font-bold text-2xl text-slate-800 dark:text-slate-200"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600"></div> GlobalTech</div>
              <div className="flex items-center gap-3 font-bold text-2xl text-slate-800 dark:text-slate-200"><div className="w-8 h-8 rounded-tl-xl rounded-br-xl bg-gradient-to-br from-slate-400 to-slate-600"></div> InnovateIO</div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION - Glassmorphism Cards */}
        <section className="w-full py-24 relative z-10 border-t border-slate-200/20 dark:border-slate-800/20 bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Everything you need to support customers</h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">A complete suite of tools designed to automate repetitive tasks and delight your users.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MessageSquare, color: 'text-blue-500', glow: 'shadow-blue-500/20', bg: 'bg-blue-500/10', title: 'Smart Chatbot', desc: 'AI-powered virtual assistant providing human-like answers 24/7.' },
                { icon: HelpCircle, color: 'text-emerald-500', glow: 'shadow-emerald-500/20', bg: 'bg-emerald-500/10', title: 'Knowledge Base', desc: 'Centralized repository of articles synced directly with the AI.' },
                { icon: Users, color: 'text-purple-500', glow: 'shadow-purple-500/20', bg: 'bg-purple-500/10', title: 'Lead Management', desc: 'Automatically capture contact details and score prospect intent.' },
                { icon: Calendar, color: 'text-orange-500', glow: 'shadow-orange-500/20', bg: 'bg-orange-500/10', title: 'Appointments', desc: 'Seamlessly schedule meetings and send automated email reminders.' }
              ].map((feat, i) => (
                <div key={i} className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800/80 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-white/0 dark:from-white/5 dark:to-transparent rounded-bl-full -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100`}></div>
                  <div className={`w-14 h-14 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg ${feat.glow} transition-all duration-300 relative z-10`}>
                    <feat.icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 relative z-10">{feat.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-grow relative z-10">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="w-full py-24 relative z-10" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">How SupportFlow AI works</h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">From a customer's first question to a complete resolution in seconds.</p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {[
                  { step: 1, icon: MessageSquare, title: 'Customer asks a question', desc: 'User interacts with the friendly chat widget on your website.' },
                  { step: 2, icon: Brain, title: 'AI analyzes intent', desc: 'Our engine searches your knowledge base and understands the context instantly.' },
                  { step: 3, icon: Zap, title: 'Instant resolution', desc: 'AI provides the exact answer, captures a lead, or books an appointment.' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors"></div>
                      <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-full shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                          {item.step}
                        </div>
                        <item.icon size={36} className="text-slate-700 dark:text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION - Modern Layout */}
        <section className="w-full py-24 relative overflow-hidden bg-slate-900 text-white" id="benefits">
          {/* Dark section background effects */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950 pointer-events-none"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1] text-white">
                  Deliver exceptional support without the overhead
                </h2>
                <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
                  SupportFlow AI acts as your front-line defense, resolving up to 70% of routine customer queries automatically so your human team can focus on complex issues.
                </p>
                <ul className="space-y-5 mb-10">
                  {[
                    'Available 24/7/365, no sleep required', 
                    'Instant response times (under 1 second)', 
                    'Reduces support ticket volume by 70%', 
                    'Seamless human handoff when necessary'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <CheckCircle className="text-blue-400 shrink-0" size={24} />
                      </div>
                      <span className="text-slate-200 font-medium text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                  Get started for free <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
              
              <div className="relative lg:ml-auto w-full max-w-lg">
                {/* Dashboard Mockup - Glassmorphism */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-4 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col border border-slate-800 shadow-inner">
                    {/* Header */}
                    <div className="h-12 bg-slate-800/80 border-b border-slate-700/50 flex items-center px-5 gap-4">
                      <div className="flex gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80"></div>
                      </div>
                      <div className="text-sm font-semibold text-slate-300 tracking-wide mx-auto">Dashboard Overview</div>
                    </div>
                    {/* Body */}
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Stat Cards */}
                      <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Tickets</div>
                        <div className="text-3xl font-extrabold text-white">1,284</div>
                        <div className="text-xs text-emerald-400 mt-2 font-semibold flex items-center gap-1">
                          <span className="bg-emerald-400/10 px-1.5 py-0.5 rounded text-emerald-400">+12%</span> this week
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-20"><Bot size={80} /></div>
                        <div className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-2 relative z-10">AI Resolution</div>
                        <div className="text-3xl font-extrabold text-white relative z-10">73.5%</div>
                        <div className="text-xs text-blue-100 mt-2 font-semibold relative z-10">Automated successfully</div>
                      </div>

                      {/* Recent list */}
                      <div className="col-span-1 sm:grid-cols-2 sm:col-span-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 mt-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent AI Actions</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="bg-emerald-500/20 p-1.5 rounded-lg text-emerald-400"><CheckCircle size={16} /></div>
                              <span className="font-semibold text-slate-200 text-sm">Resolved login issue</span>
                            </div>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md font-bold text-[10px] uppercase">Automated</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="bg-purple-500/20 p-1.5 rounded-lg text-purple-400"><Calendar size={16} /></div>
                              <span className="font-semibold text-slate-200 text-sm">Booked Demo: Acme Corp</span>
                            </div>
                            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded-md font-bold text-[10px] uppercase">Scheduled</span>
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
        <section className="w-full py-24 relative z-10 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Frequently asked questions</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need to know about the product and billing.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`bg-white dark:bg-slate-900 border ${expandedFaq === i ? 'border-blue-500/50 shadow-md' : 'border-slate-200 dark:border-slate-800'} rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer`}
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                >
                  <div className="px-6 py-5 flex justify-between items-center">
                    <h3 className={`text-lg font-bold transition-colors ${expandedFaq === i ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {faq.question}
                    </h3>
                    <div className={`p-1 rounded-full transition-colors ${expandedFaq === i ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      <ChevronDown className={`transition-transform duration-300 ${expandedFaq === i ? 'rotate-180' : ''}`} size={20} />
                    </div>
                  </div>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${expandedFaq === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/help" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold hover:text-blue-500 transition-colors">
                View all FAQs <ArrowRight className="ml-1" size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION - Glow & Gradient */}
        <section className="w-full px-4 py-24 relative z-10">
          <div className="max-w-5xl mx-auto relative flex flex-col items-center text-center bg-gradient-to-br from-blue-600 to-purple-700 rounded-[3rem] p-12 md:p-20 overflow-hidden shadow-2xl">
            
            {/* Background effects for CTA */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Ready to transform your customer support?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Join businesses using SupportFlow AI to automate interactions, reduce costs, and delight customers 24/7.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                <Link to="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                  <Rocket className="mr-2" size={20} />
                  Start your free trial
                </Link>
                <Link to="/inquiry" className="bg-blue-700/50 hover:bg-blue-700/70 backdrop-blur-sm border border-blue-400/30 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                  <Headphones className="mr-2" size={20} />
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
