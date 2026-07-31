import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.post('/leads', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: 'website'
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      <main className="flex-grow pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {!user && (
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-extrabold text-text-primary tracking-tight sm:text-5xl mb-4">
                Get in <span className="text-brand-600">Touch</span>
              </h1>
              <p className="text-xl text-text-secondary">
                Have questions about our platform? Send us a message and our support team will get back to you shortly.
              </p>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
            
            {/* Contact Information */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-surface p-8 rounded-xl border border-border shadow-sm">
                <h3 className="text-xl font-bold text-text-primary mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-brand-600 mt-1 mr-4" size={24} />
                    <div>
                      <p className="font-semibold text-text-primary">Email</p>
                      <p className="text-text-secondary">support@supportflow.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-brand-600 mt-1 mr-4" size={24} />
                    <div>
                      <p className="font-semibold text-text-primary">Phone</p>
                      <p className="text-text-secondary">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-brand-600 mt-1 mr-4" size={24} />
                    <div>
                      <p className="font-semibold text-text-primary">Office</p>
                      <p className="text-text-secondary">123 AI Boulevard<br/>Tech District, CA 94043</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 bg-surface p-6 md:p-10 rounded-xl border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Send an Inquiry</h3>
              
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
              {!user && (
                <div className="mb-6 p-4 bg-brand-50 border border-brand-600/20 text-brand-700 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
                  <span>You must be logged in to submit an inquiry.</span>
                  <button onClick={() => navigate('/login?type=client')} className="px-4 py-2 bg-brand-600 text-white rounded-md text-sm font-medium hover:bg-brand-700 transition-colors whitespace-nowrap">
                    Login Now
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Name</label>
                    <input 
                      type="text" 
                      required 
                      disabled={!user}
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      readOnly
                      disabled={!user}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full ${!user ? 'cursor-not-allowed opacity-70 text-text-muted' : ''}`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    disabled={!user}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Message</label>
                  <textarea 
                    required 
                    disabled={!user}
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full resize-none ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                {!user ? (
                  <button 
                    type="button" 
                    onClick={() => navigate('/login?type=client')}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-lg shadow-sm transition-all flex justify-center items-center"
                  >
                    Login to Submit
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-lg shadow-sm transition-all flex justify-center items-center disabled:opacity-70"
                  >
                    {status === 'submitting' ? 'Sending...' : (
                      <>
                        Send Message
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
