import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Calendar, Clock, Video } from 'lucide-react';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Demo Call',
    message: '',
    date: '',
    time: ''
  });
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Combine date and time
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      const { data } = await api.post('/appointments', {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        message: formData.message,
        dateTime,
        status: 'Pending'
      });
      
      setSuccessData(data);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book appointment.');
    } finally {
      setLoading(false);
    }
  };

  // Get next 14 days for date picker (simple HTML native picker)
  const today = new Date().toISOString().split('T')[0];
  const nextTwoWeeks = new Date();
  nextTwoWeeks.setDate(nextTwoWeeks.getDate() + 14);
  const maxDate = nextTwoWeeks.toISOString().split('T')[0];

  if (successData) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center p-4">
        <div className="bg-surface p-8 rounded-2xl shadow-sm border border-border max-w-md w-full text-center">
          <div className="w-16 h-16 bg-success-bg text-success-text border border-success-text/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={28} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Booking Confirmed!</h2>
          <p className="text-[14px] text-text-secondary mb-6">We've scheduled your meeting.</p>
          
          <div className="bg-subtle p-4 rounded-xl border border-border text-left mb-6 space-y-3">
            <div className="flex items-center text-[13px] text-text-primary">
              <Clock size={16} className="text-brand-600 mr-3" />
              <span className="font-semibold">{new Date(successData.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
            <div className="flex items-center text-[13px] text-text-primary">
              <Video size={16} className="text-brand-600 mr-3" />
              <a href={successData.meetingLink} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline font-semibold truncate">{successData.meetingLink}</a>
            </div>
          </div>
          
          <p className="text-[12px] text-text-muted mb-6">You will receive an email reminder 24 hours and 15 minutes before the meeting.</p>

          <button onClick={() => navigate('/')} className="bg-brand-600 text-white px-6 py-2.5 rounded-xl hover:bg-brand-700 w-full font-bold transition-colors shadow-sm">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-app flex flex-col items-center py-16 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-4 tracking-tight">Book an Expert Call</h1>
        <p className="text-[15px] text-text-secondary max-w-xl mx-auto">Select a date and time that works for you. Our team is available Monday through Friday.</p>
      </div>

      <div className="bg-surface max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-sm border border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Full Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border border-border-strong bg-subtle text-[13px] text-text-primary placeholder:text-text-muted rounded-xl focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm" placeholder="Jane Doe" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Email Address</label>
                <input type="email" required readOnly={!!user} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full px-4 py-2.5 border border-border-strong bg-subtle text-[13px] text-text-primary placeholder:text-text-muted rounded-xl focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm ${user ? 'opacity-70 cursor-not-allowed' : ''}`} placeholder="jane@company.com" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Phone Number</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 border border-border-strong bg-subtle text-[13px] text-text-primary placeholder:text-text-muted rounded-xl focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm" placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Service Type</label>
              <select required value={formData.serviceType} onChange={(e) => setFormData({...formData, serviceType: e.target.value})} className="w-full px-4 py-2.5 border border-border-strong bg-subtle text-[13px] text-text-primary placeholder:text-text-muted rounded-xl focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm">
                <option value="Demo Call">Demo Call</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Consultation">Consultation</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-text-muted" size={18} />
                  <input type="date" min={today} max={maxDate} required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border border-border-strong bg-subtle text-[13px] text-text-primary placeholder:text-text-muted rounded-xl focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 text-text-muted" size={18} />
                  <input type="time" min="09:00" max="17:00" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border border-border-strong bg-subtle text-[13px] text-text-primary placeholder:text-text-muted rounded-xl focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-text-muted -mt-2">Available 9:00 AM to 5:00 PM local time.</p>
            
            <div>
              <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Additional Message</label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2.5 border border-border-strong bg-subtle text-[13px] text-text-primary placeholder:text-text-muted rounded-xl focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none transition-all shadow-sm resize-none" rows="3" placeholder="Tell us what you'd like to discuss..."></textarea>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-brand-600 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors shadow-sm text-[13px]">
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
