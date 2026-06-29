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
      alert('Failed to send reminder.');
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
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  const upcoming = appointments.filter(a => ['Pending', 'Confirmed', 'Rescheduled'].includes(a.status));
  const past = appointments.filter(a => ['Completed', 'Cancelled'].includes(a.status));

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Master Schedule</h2>
          <p className="text-slate-400 mt-2">Manage your team's upcoming video calls and client bookings.</p>
        </div>
        <div className="bg-slate-900 text-slate-200 px-5 py-3 rounded-xl font-bold flex items-center border border-slate-800 shadow-sm">
          <CalendarIcon size={20} className="mr-3 text-purple-600" />
          {upcoming.length} Upcoming Calls
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-950/50 rounded-2xl border border-slate-800 p-8 space-y-10 shadow-inner">
        
        {/* Upcoming Section */}
        <div>
          <div className="flex items-center mb-6">
            <h3 className="text-xl font-extrabold text-white tracking-tight">Upcoming Appointments</h3>
            <div className="h-px bg-slate-200 flex-1 ml-6"></div>
          </div>
          
          {upcoming.length === 0 ? (
            <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800 border-dashed">
              <CalendarIcon size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-bold text-slate-300">No upcoming appointments.</p>
              <p className="text-slate-400 text-sm mt-1">Your schedule is clear for now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcoming.map(apt => {
                const dateObj = new Date(apt.dateTime);
                const isToday = dateObj.toDateString() === new Date().toDateString();
                return (
                  <div key={apt._id} className={`bg-slate-900 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${isToday ? 'border-2 border-blue-400' : 'border border-slate-800'}`}>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-start">
                        <div className={`p-3 rounded-xl mr-4 flex-shrink-0 ${isToday ? 'bg-blue-100 text-blue-700' : 'bg-slate-800 text-slate-300'}`}>
                           <Clock size={24} />
                        </div>
                        <div>
                          <div className={`font-extrabold text-xl tracking-tight mb-1 ${isToday ? 'text-blue-700' : 'text-white'}`}>
                            {dateObj.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-sm font-semibold text-slate-400">
                             {dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', month: 'short', day: 'numeric' })}
                             {isToday && <span className="ml-2 inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md tracking-wider">Today</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 mb-5 text-[15px] space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                         <span className="text-slate-400 font-medium text-sm">Service Type</span>
                         <span className="font-bold text-slate-100 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-sm">{apt.serviceType}</span>
                      </div>
                      
                      <div className="pt-1">
                        <div className="font-bold text-white mb-2 flex items-center"><UserIcon className="mr-2 text-slate-400" size={16}/> {apt.customerName}</div>
                        <div className="text-slate-400 text-sm flex items-center mb-1"><Mail size={14} className="mr-2"/> {apt.email}</div>
                        {apt.phone && <div className="text-slate-400 text-sm flex items-center"><Phone size={14} className="mr-2"/> {apt.phone}</div>}
                      </div>

                      {apt.message && (
                        <div className="pt-3 border-t border-slate-800/60">
                           <p className="text-sm text-slate-300 italic">"{apt.message}"</p>
                        </div>
                      )}
                      
                      <div className="pt-3 border-t border-slate-800/60 mt-4">
                        <div className="flex items-center font-bold text-slate-200 mb-2 text-xs uppercase tracking-wider">
                          <Video size={14} className="mr-2 text-slate-400" /> Google Meet Link
                        </div>
                        <a href={apt.meetingLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-between group transition">
                           <span className="truncate pr-4">{apt.meetingLink.replace('https://','')}</span>
                           <ExternalLink size={14} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                        </a>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-5 flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
                        <select
                          value={apt.status}
                          onChange={(e) => updateStatus(apt._id, e.target.value)}
                          className={`text-sm font-bold rounded-lg focus:ring-4 focus:ring-blue-100 outline-none block px-3 py-1.5 cursor-pointer transition-colors border-2 ${
                             apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 focus:border-emerald-500' :
                             apt.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100 focus:border-amber-500' :
                             'bg-slate-950 text-slate-200 border-slate-800 focus:border-slate-500'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Rescheduled">Rescheduled</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      
                      <div className="flex space-x-3 pt-1">
                        <button onClick={() => {
                          const d = prompt('Enter new date (YYYY-MM-DD):', dateObj.toISOString().split('T')[0]);
                          const t = prompt('Enter new time (HH:MM):', dateObj.toTimeString().substring(0,5));
                          if(d && t) handleReschedule(apt._id, d, t);
                        }} className="flex-1 bg-slate-900 border-2 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-950 px-3 py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center">
                          <RefreshCw size={14} className="mr-2" />
                          Reschedule
                        </button>
                        <button onClick={() => handleSendReminder(apt._id)} className="flex-1 bg-blue-900/40 text-blue-400 hover:bg-blue-100 px-3 py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center">
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
              <h3 className="text-xl font-extrabold text-white tracking-tight">Past & Cancelled</h3>
              <div className="h-px bg-slate-200 flex-1 ml-6"></div>
            </div>
            
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-950/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-900 divide-y divide-slate-50">
                  {past.map(apt => (
                    <tr key={apt._id} className="hover:bg-slate-950/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">
                        {new Date(apt.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',dateStyle: 'medium', timeStyle: 'short'})}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                        {apt.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {apt.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-lg border ${apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
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
