import React from 'react';
import { Link } from 'react-router-dom';
import ChatbotWidget from '../components/ChatbotWidget';
import { 
  MessageSquare, HelpCircle, Calendar, Users, Sparkles, Brain, Zap, 
  Rocket, Headphones, CheckCircle, Star, ArrowRight, ChevronDown 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans overflow-x-hidden relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-purple-400/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[150px]" />
      </div>

      <main className="flex-grow flex flex-col items-center w-full relative z-10">
        
        {/* HERO SECTION */}
        <section className="w-full max-w-6xl mx-auto px-4 pt-24 pb-20 md:pt-32 md:pb-32 flex flex-col items-center text-center">
          <div className="slide-in-up opacity-0 inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-300 shadow-sm hover:shadow-md transition-shadow cursor-default" style={{ animationDelay: '100ms' }}>
            <Sparkles size={16} className="text-blue-600" />
            <span>Meet your new AI Support Agent</span>
            <span className="bg-blue-100 text-blue-400 text-xs px-2 py-0.5 rounded-full ml-2">New</span>
          </div>
          
          <h1 className="slide-in-up opacity-0 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1] max-w-4xl mx-auto" style={{ animationDelay: '250ms' }}>
            Automate customer support with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">human-like AI</span>
          </h1>
          
          <p className="slide-in-up opacity-0 text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '400ms' }}>
            Instantly resolve FAQs, capture high-quality leads, and schedule appointments 24/7 without growing your headcount.
          </p>
          
          <div className="slide-in-up opacity-0 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto" style={{ animationDelay: '550ms' }}>
            <button 
              onClick={() => document.querySelector('.chatbot-trigger-btn')?.click()}
              className="group bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center w-full sm:w-auto"
            >
              See it in action
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <Link to="/book-demo" className="bg-slate-900 text-slate-300 border border-slate-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-sm hover:shadow-md hover:border-slate-300 hover:bg-slate-950 transition-all duration-200 flex items-center justify-center w-full sm:w-auto">
              <Calendar className="mr-2 text-slate-500" size={20} />
              Book a Demo
            </Link>
          </div>

          <div className="mt-16 fade-in opacity-0" style={{ animationDelay: '700ms' }}>
            <p className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-widest">Trusted by forward-thinking teams</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale">
              {/* Trust Badges - Generic SVG Placeholders */}
              <div className="flex items-center gap-2 font-bold text-xl text-slate-500"><div className="w-6 h-6 rounded-sm bg-slate-400"></div> Acme Corp</div>
              <div className="flex items-center gap-2 font-bold text-xl text-slate-500"><div className="w-6 h-6 rounded-full bg-slate-400"></div> GlobalTech</div>
              <div className="flex items-center gap-2 font-bold text-xl text-slate-500"><div className="w-6 h-6 rounded-tl-lg rounded-br-lg bg-slate-400"></div> InnovateIO</div>
              <div className="flex items-center gap-2 font-bold text-xl text-slate-500"><div className="w-6 h-6 rotate-45 bg-slate-400"></div> Zenith</div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="w-full bg-transparent py-24 border-y border-slate-800 relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Everything you need to support customers</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">A complete suite of tools designed to automate repetitive tasks and delight your users.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-900/30', title: 'Smart Chatbot', desc: 'AI-powered virtual assistant providing human-like answers 24/7.' },
                { icon: HelpCircle, color: 'text-emerald-600', bg: 'bg-emerald-900/30', title: 'Knowledge Base', desc: 'Centralized repository of articles synced directly with the AI.' },
                { icon: Users, color: 'text-purple-600', bg: 'bg-purple-900/30', title: 'Lead Management', desc: 'Automatically capture contact details and score prospect intent.' },
                { icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-900/30', title: 'Appointments', desc: 'Seamlessly schedule meetings and send automated email reminders.' }
              ].map((feat, i) => (
                <div key={i} className="group bg-slate-900 p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full">
                  <div className={`w-14 h-14 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feat.icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">{feat.title}</h3>
                  <p className="text-slate-500 leading-relaxed flex-grow">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="w-full max-w-7xl mx-auto px-4 py-24 relative z-10" id="how-it-works">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">How SupportFlow AI works</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">From a customer's first question to a complete resolution in seconds.</p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: 1, icon: MessageSquare, title: 'Customer asks a question', desc: 'User interacts with the friendly chat widget on your website.' },
                { step: 2, icon: Brain, title: 'AI analyzes intent', desc: 'Our engine searches your knowledge base and understands the context instantly.' },
                { step: 3, icon: Zap, title: 'Instant resolution', desc: 'AI provides the exact answer, captures a lead, or books an appointment.' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-slate-900 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-800 flex items-center justify-center mb-6 relative group hover:-translate-y-2 transition-transform duration-300">
                    <div className="absolute top-2 right-2 w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center shadow-sm">
                      {item.step}
                    </div>
                    <item.icon size={40} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="w-full bg-transparent text-white py-24 relative overflow-hidden" id="benefits">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/30/80 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/30/80 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight leading-tight text-white">Deliver exceptional support without the overhead</h2>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                  SupportFlow AI acts as your front-line defense, resolving up to 70% of routine customer queries automatically so your human team can focus on complex issues.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Available 24/7/365, no sleep required', 'Instant response times (under 1 second)', 'Reduces support ticket volume by 70%', 'Seamless human handoff when necessary'].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="text-blue-500 shrink-0" size={24} />
                      <span className="text-slate-300 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="inline-flex items-center text-blue-600 hover:text-blue-400 font-semibold text-lg transition-colors">
                  Get started for free <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
              <div className="relative">
                {/* Dashboard Mockup Placeholder */}
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-slate-950 rounded-xl overflow-hidden flex flex-col aspect-[4/3] border border-slate-800">
                    {/* Fake Header */}
                    <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    {/* Fake Content */}
                    <div className="flex-1 p-6 flex flex-col gap-4 bg-slate-950/50">
                      <div className="flex gap-4">
                        <div className="w-1/3 h-24 bg-slate-900 border border-slate-800 shadow-sm rounded-lg animate-pulse"></div>
                        <div className="w-1/3 h-24 bg-slate-900 border border-slate-800 shadow-sm rounded-lg animate-pulse" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1/3 h-24 bg-slate-900 border border-slate-800 shadow-sm rounded-lg animate-pulse" style={{animationDelay: '300ms'}}></div>
                      </div>
                      <div className="w-full h-40 bg-slate-900 border border-slate-800 shadow-sm rounded-lg mt-4 flex-grow animate-pulse" style={{animationDelay: '450ms'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* FAQ PREVIEW SECTION */}
        <section className="w-full bg-transparent pt-24 pb-12 border-t border-slate-800 relative z-10">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently asked questions</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "How long does it take to set up?", a: "Setup takes literally 5 minutes. You just upload your documents to the Knowledge Base, customize your widget colors, and paste a single line of code into your website." },
                { q: "Can the AI hand off to a human agent?", a: "Yes. If the AI cannot resolve the issue or if the user explicitly asks to speak to a human, it will automatically create a Support Ticket for your team." },
                { q: "Does it integrate with Google Meet?", a: "Absolutely. The appointment booking feature automatically generates Google Meet links and sends calendar invites to both parties." }
              ].map((faq, i) => (
                <div key={i} className="bg-slate-950 rounded-2xl p-6 border border-slate-800 hover:border-blue-200 transition-colors">
                  <h3 className="text-lg font-bold text-slate-100 mb-2 flex justify-between items-center">
                    {faq.q}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/help" className="text-blue-600 font-semibold hover:text-blue-400">View all FAQs &rarr;</Link>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="w-full px-4 py-20 mb-12 relative z-10 border-t border-slate-800">
          <div className="max-w-6xl mx-auto relative flex flex-col items-center text-center">
            
            {/* Subtle glow behind CTA */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Ready to transform your customer support?</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">Join businesses using SupportFlow AI to automate interactions, reduce costs, and delight customers 24/7.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all flex items-center justify-center w-full sm:w-auto">
                  <Rocket className="mr-2" size={20} />
                  Start your free trial
                </Link>
                <Link to="/inquiry" className="bg-slate-900 border border-slate-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center w-full sm:w-auto">
                  <Headphones className="mr-2" size={20} />
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chatbot Widget Wrapper */}
      <div className="chatbot-wrapper relative z-50">
        <ChatbotWidget />
      </div>
    </div>
  );
};

export default LandingPage;
