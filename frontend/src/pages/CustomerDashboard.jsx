import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, LogOut, ExternalLink, X, MessageSquare, Calendar, Video, Bell, Menu } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-bg-app font-sans text-text-primary">
      <main className="max-w-5xl mx-auto py-10 px-6">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Hello, {user?.name}</h1>
            <p className="text-text-secondary">Track the status of your support requests below.</p>
          </div>
          
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="bg-surface border border-border p-3 rounded-lg shadow-sm text-text-secondary hover:text-brand-600 transition relative">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 md:w-96 bg-surface rounded-xl shadow-lg border border-border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-text-primary">Notifications</h3>
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
                    <div className="p-8 text-center text-text-secondary text-sm">No notifications yet.</div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification._id} 
                        onClick={() => markNotificationRead(notification._id)}
                        className="p-4 border-b border-border hover:bg-subtle transition cursor-pointer flex flex-col gap-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${(notification.type || 'system') === 'appointment_update' ? 'bg-brand-50 text-brand-600' : 'bg-brand-50 text-brand-600'}`}>
                            {(notification.type || 'system').replace('_', ' ')}
                          </span>
                          <span className="w-2 h-2 bg-brand-600 rounded-full shadow-sm"></span>
                        </div>
                        <p className="text-sm leading-relaxed text-text-primary font-medium">
                          {notification.message}
                        </p>
                        <p className="text-[10px] font-semibold text-text-muted">{new Date(notification.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center">
            <Ticket className="text-brand-600 mr-2" size={20} />
            <h2 className="text-lg font-bold text-text-primary">My Ticket History</h2>
          </div>
          
          {loading ? (
            <div className="p-12 text-center text-text-secondary">Loading your history...</div>
          ) : tickets.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="text-text-muted" size={32} />
              </div>
              <p className="text-text-secondary font-medium">You haven't submitted any tickets yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-subtle">
                    <th className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Ticket ID</th>
                    <th className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Subject</th>
                    <th className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date Submitted</th>
                    <th className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tickets.map(ticket => (
                    <tr 
                      key={ticket._id} 
                      onClick={() => handleViewTicket(ticket)}
                      className="hover:bg-subtle transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6 font-medium text-text-primary text-sm">{ticket.ticketId || 'N/A'}</td>
                      <td className="py-4 px-6 text-text-secondary text-sm max-w-xs truncate">{ticket.subject}</td>
                      <td className="py-4 px-6 text-text-secondary text-sm">{new Date(ticket.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                          ${ticket.status === 'Resolved' ? 'bg-success-bg text-success-text' : 
                            ticket.status === 'Open' ? 'bg-warning-bg text-warning-text' : 
                            'bg-neutral-bg text-neutral-text'}`}>
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
        <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden mt-8">
          <div className="p-6 border-b border-border flex items-center">
            <Calendar className="text-brand-600 mr-2" size={20} />
            <h2 className="text-lg font-bold text-text-primary">My Appointments</h2>
          </div>
          
          {loadingAppointments ? (
            <div className="p-12 text-center text-text-secondary">Loading your appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-text-muted" size={32} />
              </div>
              <p className="text-text-secondary font-medium">You haven't booked any appointments yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-subtle">
                    <th className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Service</th>
                    <th className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date & Time</th>
                    <th className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Meeting Link</th>
                    <th className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {appointments.map(appt => (
                    <tr key={appt._id} className="hover:bg-subtle transition-colors">
                      <td className="py-4 px-6 font-medium text-text-primary text-sm">{appt.serviceType}</td>
                      <td className="py-4 px-6 text-text-secondary text-sm">{new Date(appt.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}</td>
                      <td className="py-4 px-6 text-text-secondary text-sm">
                        {appt.meetingLink ? (
                          <a href={appt.meetingLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-600 hover:text-brand-700 font-medium">
                            <Video size={16} className="mr-1" /> Join Meeting
                          </a>
                        ) : 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                          ${appt.status === 'Confirmed' || appt.status === 'Completed' ? 'bg-success-bg text-success-text' : 
                            appt.status === 'Cancelled' ? 'bg-danger-bg text-danger-text' : 
                            'bg-warning-bg text-warning-text'}`}>
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
        <div className="fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl shadow-xl border border-border w-full max-w-2xl max-h-[90vh] md:max-h-[80vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-transparent rounded-t-xl">
              <div>
                <h3 className="text-xl font-bold text-text-primary">{selectedTicket.subject}</h3>
                <div className="flex items-center space-x-3 mt-2 text-sm text-text-secondary">
                  <span>ID: {selectedTicket.ticketId}</span>
                  <span>•</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                    ${selectedTicket.status === 'Resolved' ? 'bg-success-bg text-success-text' : 
                      selectedTicket.status === 'Open' ? 'bg-warning-bg text-warning-text' : 
                      'bg-neutral-bg text-neutral-text'}`}>
                    {selectedTicket.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-text-secondary hover:text-text-primary bg-subtle hover:bg-border p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Messages */}
            <div className="p-6 overflow-y-auto flex-1 bg-transparent">
              {/* Original Ticket Description */}
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-sm font-semibold text-text-primary mb-2">Original Request</p>
                <div className="bg-subtle p-4 rounded-lg border border-border text-text-primary text-sm whitespace-pre-wrap">
                  {selectedTicket.description}
                </div>
              </div>

              {/* Conversation */}
              <p className="text-sm font-semibold text-text-primary mb-4 flex items-center">
                <MessageSquare size={16} className="mr-2 text-brand-600" /> Support Responses
              </p>
              
              {loadingMessages ? (
                <div className="text-center py-8 text-text-secondary text-sm">Loading responses...</div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8 text-text-secondary text-sm italic bg-surface border border-border rounded-lg shadow-sm">
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
                          ? 'bg-brand-600 text-white rounded-lg rounded-tr-sm shadow-sm' 
                          : msg.senderName === 'AI Support Bot'
                            ? 'bg-brand-50 border border-brand-50 text-text-primary rounded-lg rounded-tl-sm shadow-sm'
                            : 'bg-surface border border-border text-text-primary rounded-lg rounded-tl-sm shadow-sm'
                      }`}>
                        <div className="flex items-center justify-between mb-2 opacity-90 text-xs font-bold text-text-muted">
                          <span className={`${msg.senderName === 'AI Support Bot' ? 'text-brand-700' : msg.senderType === 'Customer' ? 'text-white/90' : 'text-text-secondary'}`}>
                            {msg.senderName} {msg.senderName === 'AI Support Bot' && '✨'}
                          </span>
                          <span className={`ml-4 ${msg.senderType === 'Customer' ? 'text-white/80' : 'text-text-muted'}`}>
                            {new Date(msg.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata',hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p className={`whitespace-pre-wrap leading-relaxed ${msg.senderType === 'Customer' ? 'text-white' : 'text-text-primary'}`}>{msg.message}</p>
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
