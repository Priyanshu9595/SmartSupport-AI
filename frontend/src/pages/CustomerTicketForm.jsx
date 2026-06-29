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
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/50 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Ticket Submitted!</h2>
          <p className="text-slate-600 mb-6">Our support team will review your request and get back to you shortly.</p>
          <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full font-medium transition-colors">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-lg border border-white/50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Submit a Request</h2>
          <p className="text-slate-500 mt-1">Please provide the details of your issue below.</p>
        </div>
        
        {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
              <input type="text" required value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} className="w-full px-4 py-2 bg-white/50 border border-white/60 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" required readOnly={!!user} value={formData.customerEmail} onChange={(e) => setFormData({...formData, customerEmail: e.target.value})} className={`w-full px-4 py-2 bg-white/50 border border-white/60 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner ${user ? 'cursor-not-allowed opacity-70 text-slate-500' : ''}`} placeholder="john@example.com" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 bg-white/50 border border-white/60 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner" placeholder="Brief summary of your issue" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea required rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-white/50 border border-white/60 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all resize-none shadow-inner" placeholder="Provide as much detail as possible..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority (Optional)</label>
            <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-2 bg-white/50 border border-white/60 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-inner">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/')} className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 transition-colors">
              {loading ? 'Submitting...' : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerTicketForm;
