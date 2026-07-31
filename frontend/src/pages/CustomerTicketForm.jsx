import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const CustomerTicketForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    subject: '',
    description: '',
    priority: 'Medium'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, customerName: user.name, customerEmail: user.email }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/tickets', { ...formData, source: 'website' });
      setSuccess(true);
      setFormData({ customerName: '', customerEmail: '', subject: '', description: '', priority: 'Medium' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit ticket');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center p-4">
        <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border max-w-md w-full text-center">
          <div className="w-16 h-16 bg-success-bg text-success-text rounded-full flex items-center justify-center mx-auto mb-4 border border-success-text/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Ticket Submitted!</h2>
          <p className="text-[14px] text-text-secondary mb-6">Our support team will review your request and get back to you shortly.</p>
          <button onClick={() => navigate('/')} className="bg-brand-600 text-white px-6 py-2.5 rounded-lg hover:bg-brand-700 w-full font-medium transition-colors shadow-sm">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-app py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-2xl w-full bg-surface p-6 sm:p-8 rounded-2xl shadow-sm border border-border">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Submit a Request</h2>
          <p className="text-[14px] text-text-secondary mt-1">Please provide the details of your issue below.</p>
        </div>
        
        {error && <div className="mb-6 p-4 bg-danger-bg border border-danger-text/20 text-danger-text rounded-lg text-[13px] font-medium">{error}</div>}
        {!user && (
          <div className="mb-6 p-4 bg-brand-50 border border-brand-200 text-brand-700 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
            <span className="text-[13px] font-medium">You must be logged in to submit a support ticket.</span>
            <button onClick={() => navigate('/login?type=client')} className="px-5 py-2 bg-brand-600 text-white rounded-lg text-[13px] font-medium hover:bg-brand-700 transition-colors whitespace-nowrap shadow-sm">
              Login Now
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Your Name</label>
              <input type="text" required disabled={!user} value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} className={`w-full px-4 py-2.5 bg-subtle border border-border-strong text-[13px] text-text-primary placeholder:text-text-muted rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm ${!user ? 'opacity-50 cursor-not-allowed' : ''}`} placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Email Address</label>
              <input type="email" required readOnly disabled={!user} value={formData.customerEmail} onChange={(e) => setFormData({...formData, customerEmail: e.target.value})} className={`w-full px-4 py-2.5 bg-subtle border border-border-strong text-[13px] text-text-muted placeholder:text-text-muted rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm cursor-not-allowed opacity-70`} placeholder="john@example.com" />
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Subject</label>
            <input type="text" required disabled={!user} value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className={`w-full px-4 py-2.5 bg-subtle border border-border-strong text-[13px] text-text-primary placeholder:text-text-muted rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm ${!user ? 'opacity-50 cursor-not-allowed' : ''}`} placeholder="Brief summary of your issue" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Description</label>
            <textarea required disabled={!user} rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className={`w-full px-4 py-2.5 bg-subtle border border-border-strong text-[13px] text-text-primary placeholder:text-text-muted rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all resize-none shadow-sm ${!user ? 'opacity-50 cursor-not-allowed' : ''}`} placeholder="Provide as much detail as possible..." />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Priority (Optional)</label>
            <select disabled={!user} value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className={`w-full px-4 py-2.5 bg-subtle border border-border-strong text-[13px] text-text-primary placeholder:text-text-muted rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="pt-6 border-t border-border flex justify-end space-x-3">
            <button type="button" onClick={() => navigate('/')} className="px-5 py-2.5 border border-border bg-surface text-text-primary rounded-lg hover:bg-subtle font-medium transition-colors text-[13px] shadow-sm">Cancel</button>
            {!user ? (
              <button type="button" onClick={() => navigate('/login?type=client')} className="px-5 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium transition-colors text-[13px] shadow-sm">
                Login to Submit
              </button>
            ) : (
              <button type="submit" disabled={loading} className="px-5 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium disabled:opacity-50 transition-colors text-[13px] shadow-sm">
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerTicketForm;
