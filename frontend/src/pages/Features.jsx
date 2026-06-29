import React from 'react';
import ChatbotWidget from '../components/ChatbotWidget';
import { MessageSquare, HelpCircle, Calendar, Users, Zap, CheckCircle } from 'lucide-react';

const Features = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      <main className="flex-grow pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-4">
              Everything you need for <span className="text-blue-600">Smart Support</span>
            </h1>
            <p className="text-xl text-slate-300">
              Discover the powerful modules built into our platform to help you automate customer interactions, capture leads, and manage tickets.
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <MessageSquare size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Intelligent AI Chatbot</h2>
                <p className="text-lg text-slate-300 mb-6">
                  Provide instant, 24/7 support to your website visitors. Our conversational AI understands context, fetches answers from your Knowledge Base, and guides users automatically.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-blue-500 mr-3" size={20} /> Natural Language Processing</li>
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-blue-500 mr-3" size={20} /> Zero-setup widget integration</li>
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-blue-500 mr-3" size={20} /> Smart intent detection</li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col space-y-4">
                  <div className="bg-slate-800 self-end px-4 py-2 rounded-2xl rounded-tr-sm text-sm text-slate-100">Hi, what are your business hours?</div>
                  <div className="bg-blue-600 self-start px-4 py-2 rounded-2xl rounded-tl-sm text-sm text-white shadow-sm">We are open Monday to Friday, 9 AM to 6 PM EST.</div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <HelpCircle size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Self-updating AI FAQ</h2>
                <p className="text-lg text-slate-300 mb-6">
                  Build a Knowledge Base that grows itself. When your agents resolve a support ticket, the system asks if you want to save the answer. If yes, the AI immediately learns it for future visitors!
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-emerald-500 mr-3" size={20} /> Auto-suggested FAQs from tickets</li>
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-emerald-500 mr-3" size={20} /> Searchable public Help Center</li>
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-emerald-500 mr-3" size={20} /> Direct chatbot integration</li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                 <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                   <p className="text-sm font-bold text-emerald-800 mb-2">Did you know?</p>
                   <p className="text-xs text-emerald-600">Companies using our AI FAQ reduce manual support tickets by up to 60% within the first month.</p>
                 </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Zap size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Conversational Lead Capture</h2>
                <p className="text-lg text-slate-300 mb-6">
                  Turn visitors into customers effortlessly. If a user asks about pricing or demos, the AI automatically detects the sales intent and conversationally collects their contact details.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-amber-500 mr-3" size={20} /> No boring static forms</li>
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-amber-500 mr-3" size={20} /> Collects Name, Email, Phone seamlessly</li>
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-amber-500 mr-3" size={20} /> Syncs directly to your Admin Leads Dashboard</li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                 <div className="flex flex-col space-y-4">
                  <div className="bg-slate-800 self-end px-4 py-2 rounded-2xl rounded-tr-sm text-sm text-slate-100">I want to see a demo.</div>
                  <div className="bg-amber-500 self-start px-4 py-2 rounded-2xl rounded-tl-sm text-sm text-white shadow-sm">Sure! What's your name and email so our sales team can contact you?</div>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Calendar size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Automated Appointment Booking</h2>
                <p className="text-lg text-slate-300 mb-6">
                  Let the AI handle your calendar. Users can book appointments directly in the chat. The system schedules the meeting, generates a link, and sends automated email reminders!
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-rose-500 mr-3" size={20} /> 24-hour and 1-hour automated reminders</li>
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-rose-500 mr-3" size={20} /> Auto-generated Google Meet mock links</li>
                  <li className="flex items-center text-slate-200"><CheckCircle className="text-rose-500 mr-3" size={20} /> Dedicated Master Schedule for Admins</li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                 <div className="bg-rose-50 p-4 rounded-xl flex items-center justify-between border border-rose-100">
                   <div>
                     <p className="text-sm font-bold text-rose-900">Demo Call with Client</p>
                     <p className="text-xs text-rose-700">Tomorrow at 2:00 PM</p>
                   </div>
                   <div className="bg-slate-900 text-rose-600 px-3 py-1 rounded text-xs font-bold shadow-sm border border-rose-200">
                     Confirmed
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  );
};

export default Features;
