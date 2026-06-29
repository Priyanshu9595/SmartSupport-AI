import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatbotWidget from '../components/ChatbotWidget';
import api from '../utils/api';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      <main className="flex-grow pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-4">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-xl text-slate-300">
              Have questions about our platform? Send us a message and our support team will get back to you shortly.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
            
            {/* Contact Information */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg">
                <h3 className="text-xl font-bold text-slate-100 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-blue-600 mt-1 mr-4" size={24} />
                    <div>
                      <p className="font-bold text-slate-200">Email</p>
                      <p className="text-slate-300">support@supportflow.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-blue-600 mt-1 mr-4" size={24} />
                    <div>
                      <p className="font-bold text-slate-200">Phone</p>
                      <p className="text-slate-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-blue-600 mt-1 mr-4" size={24} />
                    <div>
                      <p className="font-bold text-slate-200">Office</p>
                      <p className="text-slate-300">123 AI Boulevard<br/>Tech District, CA 94043</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 bg-slate-900/60 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/50 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-100 mb-6">Send an Inquiry</h3>
              
              {status === 'success' && (
                <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 flex items-center">
                  <span className="font-bold">Thank you!</span> &nbsp;Your inquiry has been submitted successfully.
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-xl border border-red-200 flex items-center">
                  <span className="font-bold">Error:</span> &nbsp;Failed to submit your inquiry. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-2">Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-900/50 border border-white/60 backdrop-blur-sm rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      readOnly={!!user}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full bg-slate-900/50 border border-white/60 backdrop-blur-sm rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner ${user ? 'cursor-not-allowed opacity-70 text-slate-500' : ''}`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/60 backdrop-blur-sm rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-2">Message</label>
                  <textarea 
                    required 
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/60 backdrop-blur-sm rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all flex justify-center items-center disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Sending...' : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  );
};

export default Contact;
