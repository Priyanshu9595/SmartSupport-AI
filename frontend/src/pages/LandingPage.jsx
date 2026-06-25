import React from 'react';
import { Link } from 'react-router-dom';
import ChatbotWidget from '../components/ChatbotWidget';
import { MessageSquare, HelpCircle, Calendar, Users, Sparkles, Brain, Zap, Rocket, Headphones } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans overflow-x-hidden">
      <main className="flex-grow flex flex-col items-center text-center w-full relative">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 pt-28 pb-20 relative z-10 w-full flex flex-col items-center mt-10">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs md:text-sm tracking-widest uppercase shadow-sm">
            <Sparkles size={16} className="text-purple-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">Customer Support Automation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1a202c] tracking-tight mb-6 leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">AI Support</span> for your business
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-3xl mx-auto leading-relaxed">
            Automate FAQs, capture leads, book appointments, and provide 24/7 intelligent support with our all-in-one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => document.querySelector('.chatbot-trigger-btn')?.click()}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-[0_8px_25px_-8px_rgba(79,70,229,0.5)] hover:shadow-[0_15px_35px_-10px_rgba(79,70,229,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              <MessageSquare className="mr-2 group-hover:animate-pulse" size={20} />
              Start Chat
            </button>
            <Link to="/book-demo" className="bg-white text-purple-500 border border-slate-200 px-8 py-4 rounded-full text-lg font-semibold shadow-sm hover:shadow-md hover:border-purple-200 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
              <Calendar className="mr-2 text-purple-500" size={20} />
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Features Cards Section (Horizontal layout) */}
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 text-left flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-14 h-14 bg-purple-50 border border-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">Smart Chatbot</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">AI-powered answers to customer queries 24/7.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 text-left flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-14 h-14 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <HelpCircle size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">Knowledge Base</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Instant access to articles and solved solutions.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 text-left flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-14 h-14 bg-orange-50 border border-orange-100 text-orange-500 rounded-2xl flex items-center justify-center">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">Lead Management</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Capture and manage leads efficiently.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 text-left flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-14 h-14 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">Appointments</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Schedule and manage calls or meetings seamlessly.</p>
            </div>
            
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto px-4 w-full relative z-10 mb-32">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
              How <span className="text-blue-600">SupportFlow</span> <span className="text-purple-600">AI</span> Works
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">A seamless experience from the first greeting to final resolution.</p>
          </div>
          
          <div className="relative">
            {/* Dotted connecting line */}
            <div className="hidden md:block absolute top-[50%] left-[5%] right-[5%] h-0 border-t-2 border-dashed border-slate-300 z-0 translate-y-[-50%]"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 relative">
              
              {/* Step 1 */}
              <div className="relative flex flex-col items-center">
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 text-left relative z-10 w-full hover:-translate-y-2 transition-transform duration-300">
                  {/* Indicator connecting to line */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 md:top-[50%] md:left-[-15px] md:-translate-x-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md z-20 md:-translate-y-1/2">
                    1
                  </div>
                  <div className="ml-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                      <MessageSquare size={28} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-3">User Asks a Question</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">The customer interacts with our intelligent chatbot widget on your website at any time of day.</p>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex flex-col items-center">
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 text-left relative z-10 w-full hover:-translate-y-2 transition-transform duration-300">
                  {/* Indicator connecting to line */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 md:top-[50%] md:left-[-15px] md:-translate-x-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md z-20 md:-translate-y-1/2">
                    2
                  </div>
                  <div className="ml-4">
                    <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-6">
                      <Brain size={28} className="text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-600 mb-3">AI Analyzes Intent</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Our NLP engine understands if it's an FAQ, a lead generation opportunity, or if it needs human help.</p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex flex-col items-center">
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 text-left relative z-10 w-full hover:-translate-y-2 transition-transform duration-300">
                  {/* Indicator connecting to line */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 md:top-[50%] md:left-[-15px] md:-translate-x-0 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-md z-20 md:-translate-y-1/2">
                    3
                  </div>
                  <div className="ml-4">
                    <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-6">
                      <Zap size={28} className="text-pink-500" />
                    </div>
                    <h3 className="text-xl font-bold text-pink-500 mb-3">Instant Resolution</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">The AI provides the exact answer, creates a support ticket, or books an appointment instantly.</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full px-4 mb-20 relative z-10">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 py-20 px-8 rounded-[3rem] shadow-2xl max-w-6xl mx-auto relative overflow-hidden">
            
            {/* Decorative background for CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full filter blur-[40px]"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-10 rounded-full filter blur-[50px]"></div>
            
            <div className="max-w-4xl mx-auto text-left relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left md:w-3/5">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">Ready to transform your customer support?</h2>
                <p className="text-blue-100 text-lg mb-0 leading-relaxed">Join forward-thinking businesses using SupportFlow AI to automate interactions, reduce costs, and delight customers 24/7.</p>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto shrink-0">
                <Link to="/register" className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center w-full">
                  <Rocket className="mr-2" size={20} />
                  Get Started for Free
                </Link>
                <Link to="/inquiry" className="bg-transparent border border-white/40 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 hover:border-white transition-all flex items-center justify-center w-full">
                  <Headphones className="mr-2" size={20} />
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chatbot Widget needs a class to be triggered by the CTA */}
      <div className="chatbot-wrapper relative z-50">
        <ChatbotWidget />
      </div>
    </div>
  );
};

export default LandingPage;
