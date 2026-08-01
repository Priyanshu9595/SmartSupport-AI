import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Calendar as CalendarIcon, Clock, Video, CheckCircle, XCircle, BellRing, RefreshCw, Mail, Phone, ExternalLink } from 'lucide-react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      // Sort by soonest
      const sorted = data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      setAppointments(sorted);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      setAppointments(appointments.map(a => a._id === id ? { ...a, status } : a));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSendReminder = async (id) => {
    try {
      await api.post(`/appointments/${id}/remind`);
      alert('Manual reminder sent successfully!');
    } catch (error) {
      console.error('Error sending reminder:', error);
      const errorMsg = error.response?.data?.message || error.message;
      alert(`Failed to send reminder: ${errorMsg}. (Check your Render environment variables if in production!)`);
    }
  };

  const handleReschedule = async (id, newDate, newTime) => {
    if (!newDate || !newTime) return alert('Please select date and time.');
    try {
      const dateTime = new Date(`${newDate}T${newTime}`);
      await api.put(`/appointments/${id}`, { dateTime });
      setAppointments(appointments.map(a => a._id === id ? { ...a, dateTime } : a));
      alert('Appointment rescheduled successfully!');
    } catch (error) {
      console.error('Error rescheduling:', error);
      alert('Failed to reschedule.');
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
    </div>
  );

  const upcoming = appointments.filter(a => ['Pending', 'Confirmed', 'Rescheduled'].includes(a.status));
  const past = appointments.filter(a => ['Completed', 'Cancelled'].includes(a.status));

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Master Schedule</h2>
          <p className="text-[14px] text-text-secondary mt-1">Manage your team's upcoming video calls and client bookings.</p>
        </div>
        <div className="bg-surface text-text-primary px-4 py-2 rounded-lg font-medium flex items-center border border-border shadow-sm text-[13px]">
          <CalendarIcon size={18} className="mr-2 text-brand-600" />
          {upcoming.length} Upcoming Calls
        </div>
      </div>

      <div className="bg-bg-app rounded-2xl border border-border p-6 sm:p-8 space-y-10 shadow-sm">
        
        {/* Upcoming Section */}
        <div>
          <div className="flex items-center mb-6">
            <h3 className="text-lg font-bold text-text-primary tracking-tight">Upcoming Appointments</h3>
            <div className="h-px bg-border flex-1 ml-6"></div>
          </div>
          
          {upcoming.length === 0 ? (
            <div className="text-center py-16 bg-surface rounded-2xl border border-border border-dashed">
              <CalendarIcon size={48} className="mx-auto mb-4 text-text-muted" />
              <p className="text-[14px] font-bold text-text-primary">No upcoming appointments.</p>
              <p className="text-text-secondary text-[13px] mt-1">Your schedule is clear for now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcoming.map(apt => {
                const dateObj = new Date(apt.dateTime);
                const isToday = dateObj.toDateString() === new Date().toDateString();
                return (
                  <div key={apt._id} className={`bg-surface p-6 rounded-2xl shadow-sm border transition-all hover:shadow-md hover:-translate-y-1 ${isToday ? 'border-2 border-brand-400' : 'border-border'}`}>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-start">
                        <div className={`p-3 rounded-xl mr-4 flex-shrink-0 ${isToday ? 'bg-brand-50 text-brand-700' : 'bg-subtle text-text-secondary'}`}>
                           <Clock size={24} />
                        </div>
                        <div>
                          <div className={`font-bold text-xl tracking-tight mb-1 ${isToday ? 'text-brand-700' : 'text-text-primary'}`}>
                            {dateObj.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-[13px] font-semibold text-text-secondary">
                             {dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', month: 'short', day: 'numeric' })}
                             {isToday && <span className="ml-2 inline-block px-2 py-0.5 bg-brand-50 text-brand-700 text-[10px] font-bold uppercase rounded-md tracking-wider">Today</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-subtle p-4 rounded-xl border border-border mb-5 text-[14px] space-y-3">
                      <div className="flex justify-between items-center border-b border-border pb-3">
                         <span className="text-text-secondary font-medium text-[13px]">Service Type</span>
                         <span className="font-semibold text-text-primary bg-surface px-3 py-1 rounded-lg border border-border text-[13px]">{apt.serviceType}</span>
                      </div>
                      
                      <div className="pt-1">
                        <div className="font-bold text-text-primary mb-2 flex items-center"><UserIcon className="mr-2 text-text-muted" size={16}/> {apt.customerName}</div>
                        <div className="text-text-secondary text-[13px] flex items-center mb-1"><Mail size={14} className="mr-2"/> {apt.email}</div>
                        {apt.phone && <div className="text-text-secondary text-[13px] flex items-center"><Phone size={14} className="mr-2"/> {apt.phone}</div>}
                      </div>

                      {apt.message && (
                        <div className="pt-3 border-t border-border">
                           <p className="text-[13px] text-text-secondary italic">"{apt.message}"</p>
                        </div>
                      )}
                      
                      <div className="pt-3 border-t border-border mt-4">
                        <div className="flex items-center font-bold text-text-primary mb-2 text-[11px] uppercase tracking-wider">
                          <Video size={14} className="mr-2 text-text-muted" /> Google Meet Link
                        </div>
                        <a href={apt.meetingLink} target="_blank" rel="noreferrer" className="text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-2 rounded-lg font-medium text-[13px] flex items-center justify-between group transition">
                           <span className="truncate pr-4">{apt.meetingLink.replace('https://','')}</span>
                           <ExternalLink size={14} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="border-t border-border pt-5 flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Status</span>
                        <select
                          value={apt.status}
                          onChange={(e) => updateStatus(apt._id, e.target.value)}
                          className={`text-[13px] font-semibold rounded-lg focus:ring-3 focus:ring-brand-600/12 outline-none block px-3 py-1.5 cursor-pointer transition-colors border-2 ${
                             apt.status === 'Confirmed' ? 'bg-success-bg text-success-text border-success-text/20 focus:border-success-text' :
                             apt.status === 'Pending' ? 'bg-warning-bg text-warning-text border-warning-text/20 focus:border-warning-text' :
                             'bg-surface text-text-primary border-border focus:border-brand-600'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Rescheduled">Rescheduled</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-1">
                        <button onClick={() => {
                          const d = prompt('Enter new date (YYYY-MM-DD):', dateObj.toISOString().split('T')[0]);
                          const t = prompt('Enter new time (HH:MM):', dateObj.toTimeString().substring(0,5));
                          if(d && t) handleReschedule(apt._id, d, t);
                        }} className="flex-1 bg-surface border-2 border-border text-text-secondary hover:text-text-primary hover:border-border-strong hover:bg-subtle px-3 py-2 rounded-xl text-[13px] font-semibold transition flex items-center justify-center">
                          <RefreshCw size={14} className="mr-2" />
                          Reschedule
                        </button>
                        <button onClick={() => handleSendReminder(apt._id)} className="flex-1 bg-brand-50 text-brand-600 hover:bg-brand-100 border-2 border-brand-100 px-3 py-2 rounded-xl text-[13px] font-semibold transition flex items-center justify-center">
                          <BellRing size={14} className="mr-2" />
                          Remind
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Past/Completed Section */}
        {past.length > 0 && (
          <div>
            <div className="flex items-center mb-6">
              <h3 className="text-lg font-bold text-text-primary tracking-tight">Past & Cancelled</h3>
              <div className="h-px bg-border flex-1 ml-6"></div>
            </div>
            
            <div className="bg-surface rounded-xl border border-border overflow-x-auto shadow-sm">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-subtle">
                  <tr>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                  {past.map(apt => (
                    <tr key={apt._id} className="hover:bg-subtle transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-text-secondary">
                        {new Date(apt.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',dateStyle: 'medium', timeStyle: 'short'})}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[13px] font-semibold text-text-primary">
                        {apt.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[13px] text-text-secondary">
                        {apt.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-[11px] font-semibold rounded-md border uppercase tracking-wider ${apt.status === 'Completed' ? 'bg-success-bg text-success-text border-success-text/20' : 'bg-danger-bg text-danger-text border-danger-text/20'}`}>
                          {apt.status === 'Completed' ? <CheckCircle size={14} className="mr-1.5"/> : <XCircle size={14} className="mr-1.5"/>}
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component since we didn't import User from lucide-react initially to avoid conflict with User context if it existed, but we can just make a small icon
const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default Appointments;
