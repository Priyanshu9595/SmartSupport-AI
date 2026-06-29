import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, LogOut, ExternalLink, X, MessageSquare, Calendar, Video, Bell } from 'lucide-react';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state for viewing a specific ticket's conversation
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await api.get('/tickets/my-tickets');
        setTickets(data);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get('/appointments/my-appointments');
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
    };
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/notifications');
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };
    fetchTickets();
    fetchAppointments();
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleViewTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setLoadingMessages(true);
    try {
      const { data } = await api.get(`/tickets/${ticket._id}`);
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to fetch ticket messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const markNotificationRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/mark-all-read');
      setNotifications([]);
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="min-h-screen bg-transparent font-sans text-slate-800">
      <nav className="relative z-50 bg-white/60 backdrop-blur-md border-b border-white/50 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <Link to="/" className="text-xl font-bold text-blue-600">SupportFlow AI</Link>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium text-sm">Home</Link>
          <Link to="/submit-ticket" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 shadow-sm transition">
            Submit Ticket
          </Link>
          
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="text-slate-600 hover:text-blue-600 transition relative p-1 mt-1">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-800">Notifications</h3>
                    {unreadCount > 0 && <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">{unreadCount} New</span>}
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">No notifications yet.</div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification._id} 
                        onClick={() => markNotificationRead(notification._id)}
                        className="p-4 border-b border-slate-50 hover:bg-slate-50 transition cursor-pointer flex flex-col gap-2 bg-blue-50/30"
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${(notification.type || 'system') === 'appointment_update' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {(notification.type || 'system').replace('_', ' ')}
                          </span>
                          <span className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-800 font-medium">
                          {notification.message}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400">{new Date(notification.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center">
            <LogOut size={16} className="mr-1" /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-10 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Hello, {user?.name}</h1>
          <p className="text-slate-500">Track the status of your support requests below.</p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden">
          <div className="p-6 border-b border-white/50 bg-transparent flex items-center">
            <Ticket className="text-blue-600 mr-2" size={20} />
            <h2 className="text-lg font-bold text-slate-800">My Ticket History</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-slate-500">Loading your history...</div>
          ) : tickets.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500 font-medium">You haven't submitted any tickets yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-white/40">
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Submitted</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map(ticket => (
                    <tr 
                      key={ticket._id} 
                      onClick={() => handleViewTicket(ticket)}
                      className="hover:bg-white/40 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6 font-medium text-slate-900 text-sm">{ticket.ticketId || 'N/A'}</td>
                      <td className="py-4 px-6 text-slate-700 text-sm max-w-xs truncate">{ticket.subject}</td>
                      <td className="py-4 px-6 text-slate-500 text-sm">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                          ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                            ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' : 
                            'bg-slate-100 text-slate-700'}`}>
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Appointments Section */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 overflow-hidden mt-8">
          <div className="p-6 border-b border-white/50 bg-transparent flex items-center">
            <Calendar className="text-blue-600 mr-2" size={20} />
            <h2 className="text-lg font-bold text-slate-800">My Appointments</h2>
          </div>
          
          {loadingAppointments ? (
            <div className="p-12 text-center text-slate-500">Loading your appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500 font-medium">You haven't booked any appointments yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-white/40">
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Meeting Link</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map(appt => (
                    <tr key={appt._id} className="hover:bg-white/40 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900 text-sm">{appt.serviceType}</td>
                      <td className="py-4 px-6 text-slate-700 text-sm">{new Date(appt.dateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                      <td className="py-4 px-6 text-slate-700 text-sm">
                        {appt.meetingLink ? (
                          <a href={appt.meetingLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                            <Video size={16} className="mr-1" /> Join Meeting
                          </a>
                        ) : 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                          ${appt.status === 'Confirmed' || appt.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                            appt.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                            'bg-amber-100 text-amber-700'}`}>
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 w-full max-w-2xl max-h-[80vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/50 flex justify-between items-center bg-transparent rounded-t-3xl">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{selectedTicket.subject}</h3>
                <div className="flex items-center space-x-3 mt-2 text-sm text-slate-500">
                  <span>ID: {selectedTicket.ticketId}</span>
                  <span>•</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                    ${selectedTicket.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                      selectedTicket.status === 'Open' ? 'bg-amber-100 text-amber-700' : 
                      'bg-slate-100 text-slate-700'}`}>
                    {selectedTicket.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-600 bg-slate-200/50 hover:bg-slate-200 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Messages */}
            <div className="p-6 overflow-y-auto flex-1 bg-transparent">
              {/* Original Ticket Description */}
              <div className="mb-6 pb-6 border-b border-white/50">
                <p className="text-sm font-semibold text-slate-800 mb-2">Original Request</p>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-white/60 shadow-inner text-slate-700 text-sm whitespace-pre-wrap">
                  {selectedTicket.description}
                </div>
              </div>

              {/* Conversation */}
              <p className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
                <MessageSquare size={16} className="mr-2 text-blue-600" /> Support Responses
              </p>
              
              {loadingMessages ? (
                <div className="text-center py-8 text-slate-500 text-sm">Loading responses...</div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm italic bg-white border border-slate-100 rounded-lg shadow-sm">
                  {selectedTicket.status === 'Resolved' 
                    ? 'This ticket has been marked as resolved.' 
                    : 'No replies yet. We will get back to you soon!'}
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.senderType === 'Customer' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] p-4 text-sm ${
                        msg.senderType === 'Customer' 
                          ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-sm' 
                          : msg.senderName === 'AI Support Bot'
                            ? 'bg-gradient-to-r from-violet-50 to-purple-50 border border-purple-100 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm'
                      }`}>
                        <div className="flex items-center justify-between mb-2 opacity-90 text-xs font-bold text-slate-500">
                          <span className={`${msg.senderName === 'AI Support Bot' ? 'text-purple-700' : msg.senderType === 'Customer' ? 'text-blue-100' : 'text-slate-600'}`}>
                            {msg.senderName} {msg.senderName === 'AI Support Bot' && '✨'}
                          </span>
                          <span className={`ml-4 ${msg.senderType === 'Customer' ? 'text-blue-200' : 'text-slate-400'}`}>
                            {new Date(msg.createdAt).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p className={`whitespace-pre-wrap leading-relaxed ${msg.senderType === 'Customer' ? 'text-white' : 'text-slate-700'}`}>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerDashboard;
