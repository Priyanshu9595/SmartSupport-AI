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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-6">We've scheduled your meeting.</p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left mb-6 space-y-3">
            <div className="flex items-center text-sm text-slate-700">
              <Clock size={16} className="text-blue-600 mr-3" />
              <span className="font-semibold">{new Date(successData.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
            <div className="flex items-center text-sm text-slate-700">
              <Video size={16} className="text-blue-600 mr-3" />
              <a href={successData.meetingLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">{successData.meetingLink}</a>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 mb-6">You will receive an email reminder 24 hours and 15 minutes before the meeting.</p>

          <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 w-full font-bold transition-colors">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-16 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Book an Expert Call</h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">Select a date and time that works for you. Our team is available Monday through Friday.</p>
      </div>

      <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Jane Doe" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" required readOnly={!!user} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${user ? 'bg-slate-100 cursor-not-allowed text-slate-500' : ''}`} placeholder="jane@company.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Service Type</label>
              <select required value={formData.serviceType} onChange={(e) => setFormData({...formData, serviceType: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                <option value="Demo Call">Demo Call</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Consultation">Consultation</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input type="date" min={today} max={maxDate} required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input type="time" min="09:00" max="17:00" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 bg-white" />
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 -mt-2">Available 9:00 AM to 5:00 PM local time.</p>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Additional Message</label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" rows="3" placeholder="Tell us what you'd like to discuss..."></textarea>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
