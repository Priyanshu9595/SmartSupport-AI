import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Clock, Tag, User, CheckCircle, Send, ChevronLeft, Save, Mail, AlertCircle, Bookmark, Search, Filter } from 'lucide-react';
import api from '../utils/api';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'detail'
  const [savingFaq, setSavingFaq] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get('/tickets');
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setViewMode('detail');
    try {
      const { data } = await api.get(`/tickets/${ticket._id}`);
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    try {
      const { data } = await api.post(`/tickets/${selectedTicket._id}/messages`, {
        message: replyText,
        senderName: user.name,
        senderType: 'Admin',
        isInternalNote: isInternal
      });
      setMessages([...messages, data]);
      setReplyText('');

      if (!isInternal) {
        const updatedTickets = tickets.map(t => t._id === selectedTicket._id ? { ...t, status: 'Resolved' } : t);
        setTickets(updatedTickets);
        setSelectedTicket({ ...selectedTicket, status: 'Resolved' });
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await api.put(`/tickets/${selectedTicket._id}`, { status: newStatus });
      const updatedTickets = tickets.map(t => t._id === selectedTicket._id ? { ...t, status: newStatus } : t);
      setTickets(updatedTickets);
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSaveToFaq = async () => {
    setSavingFaq(true);
    try {
      await api.post(`/tickets/${selectedTicket._id}/save-faq`);
      alert('Successfully analyzed conversation and saved to FAQ Drafts!');
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Failed to generate FAQ. Check console.');
    } finally {
      setSavingFaq(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open': return <span className="px-2 py-0.5 bg-brand-50 text-brand-600 text-[11px] font-semibold rounded-md border border-brand-200 uppercase tracking-wider">Open</span>;
      case 'In Progress': return <span className="px-2 py-0.5 bg-warning-bg text-warning-text text-[11px] font-semibold rounded-md border border-warning-text/20 uppercase tracking-wider">In Progress</span>;
      case 'Waiting for Customer': return <span className="px-2 py-0.5 bg-brand-50 text-brand-600 text-[11px] font-semibold rounded-md border border-brand-200 uppercase tracking-wider">Waiting on Cust</span>;
      case 'Resolved': return <span className="px-2 py-0.5 bg-success-bg text-success-text text-[11px] font-semibold rounded-md border border-success-text/20 uppercase tracking-wider">Resolved</span>;
      case 'Closed': return <span className="px-2 py-0.5 bg-subtle text-text-secondary text-[11px] font-semibold rounded-md border border-border uppercase tracking-wider">Closed</span>;
      default: return <span className="px-2 py-0.5 bg-subtle text-text-secondary text-[11px] font-semibold rounded-md border border-border uppercase tracking-wider">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
      case 'Urgent': return <span className="text-danger-text font-semibold text-[11px] flex items-center bg-danger-bg px-2 py-0.5 rounded-md border border-danger-text/20 w-max uppercase tracking-wider"><AlertCircle size={12} className="mr-1"/> {priority}</span>;
      case 'Medium': return <span className="text-warning-text font-semibold text-[11px] flex items-center bg-warning-bg px-2 py-0.5 rounded-md border border-warning-text/20 w-max uppercase tracking-wider">{priority}</span>;
      case 'Low': return <span className="text-success-text font-semibold text-[11px] flex items-center bg-success-bg px-2 py-0.5 rounded-md border border-success-text/20 w-max uppercase tracking-wider">{priority}</span>;
      default: return <span className="text-text-secondary font-semibold text-[11px] bg-subtle px-2 py-0.5 rounded-md border border-border w-max uppercase tracking-wider">{priority}</span>;
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {viewMode === 'list' ? (
        <>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-primary tracking-tight">Helpdesk Tickets</h2>
              <p className="text-[14px] text-text-secondary mt-1">Manage and respond to customer issues and inquiries.</p>
            </div>
            <div className="bg-surface text-text-primary px-4 py-2 rounded-lg font-medium flex items-center border border-border shadow-sm text-[13px]">
              <MessageSquare size={18} className="mr-2 text-brand-600" />
              {tickets.length} Total Tickets
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search tickets by ID, name, or email..." 
                className="w-full pl-9 pr-4 py-2 bg-surface border border-border-strong rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none shadow-sm transition text-[13px] text-text-primary placeholder:text-text-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-auto">
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <select 
                  className="pl-9 pr-8 py-2 bg-surface border border-border-strong rounded-lg outline-none shadow-sm font-medium text-text-primary text-[13px] appearance-none focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting for Customer">Waiting for Customer</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="relative w-full sm:w-auto">
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <select 
                  className="pl-9 pr-8 py-2 bg-surface border border-border-strong rounded-lg outline-none shadow-sm font-medium text-text-primary text-[13px] appearance-none focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="All">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-border shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-subtle sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Ticket ID</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Customer Name</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border">
                  {tickets
                    .filter(t => statusFilter === 'All' || t.status === statusFilter)
                    .filter(t => priorityFilter === 'All' || t.priority === priorityFilter)
                    .filter(t => 
                      (t.ticketId?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                      (t.customerName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                      (t.customerEmail?.toLowerCase() || '').includes(searchQuery.toLowerCase())
                    ).length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center text-text-secondary">
                          <MessageSquare size={48} className="mb-4 opacity-20" />
                          <p className="text-[14px] font-semibold text-text-primary">No tickets found.</p>
                          <p className="text-[12px]">Try adjusting your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    tickets
                      .filter(t => statusFilter === 'All' || t.status === statusFilter)
                      .filter(t => priorityFilter === 'All' || t.priority === priorityFilter)
                      .filter(t => 
                        (t.ticketId?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                        (t.customerName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                        (t.customerEmail?.toLowerCase() || '').includes(searchQuery.toLowerCase())
                      ).map(ticket => (
                      <tr key={ticket._id} className="hover:bg-subtle transition-colors cursor-pointer group" onClick={() => handleSelectTicket(ticket)}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-[13px] text-text-primary">{ticket.ticketId || 'TCK-000'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-[12px] mr-3">
                              {ticket.customerName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-[13px] font-semibold text-text-primary">{ticket.customerName}</div>
                              <div className="text-[12px] text-text-secondary">{ticket.customerEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-text-secondary flex items-center h-full pt-6"><Bookmark size={14} className="mr-2 opacity-70"/> {ticket.category || 'General'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getPriorityBadge(ticket.priority)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ticket.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-text-secondary">{new Date(ticket.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-[13px] font-medium">
                          <button className="text-brand-600 font-medium hover:text-brand-700 bg-brand-50 opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg transition-all">
                            View Ticket
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        // Detail View
        <div className="flex-1 flex flex-col bg-surface rounded-xl shadow-sm border border-border overflow-hidden h-full">
          {/* Header */}
          <div className="bg-surface p-5 border-b border-border flex items-center justify-between z-10 shadow-sm">
            <div className="flex items-center">
              <button 
                onClick={() => setViewMode('list')}
                className="mr-4 p-2 text-text-secondary hover:text-text-primary hover:bg-subtle rounded-lg transition-colors border border-transparent"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h2 className="text-xl font-bold text-text-primary tracking-tight">{selectedTicket.subject}</h2>
                  <span className="text-[12px] font-semibold bg-subtle border border-border text-text-secondary px-2 py-0.5 rounded-md">{selectedTicket.ticketId}</span>
                </div>
                <div className="flex items-center text-[13px] text-text-secondary space-x-5 font-medium">
                  <span className="flex items-center"><User size={14} className="mr-1.5 opacity-70"/> {selectedTicket.customerName}</span>
                  <span className="flex items-center"><Clock size={14} className="mr-1.5 opacity-70"/> {new Date(selectedTicket.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                  <span className="flex items-center"><Bookmark size={14} className="mr-1.5 opacity-70"/> {selectedTicket.category || 'General'}</span>
                  <span className="flex items-center">{getPriorityBadge(selectedTicket.priority)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1">Update Status</span>
                <select 
                  value={selectedTicket.status} 
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  className="bg-surface border border-border-strong text-text-primary text-[13px] rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 block px-3 py-1.5 font-medium cursor-pointer outline-none transition-all shadow-sm"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting for Customer">Waiting for Customer</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <button 
                onClick={handleSaveToFaq}
                disabled={savingFaq}
                className="flex items-center bg-surface border border-border text-text-primary px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-subtle transition shadow-sm disabled:opacity-70 mt-4 group"
              >
                <Save size={16} className="mr-2 group-hover:scale-110 transition-transform"/> 
                {savingFaq ? 'Generating...' : 'Save as FAQ'}
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
            {/* Left Column: Conversation */}
            <div className="w-full lg:w-2/3 flex flex-col border-b lg:border-b-0 lg:border-r border-border bg-bg-app relative min-h-[500px] lg:min-h-0">
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Initial Issue */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm p-5 shadow-sm bg-surface border border-border relative mt-3">
                    <div className="absolute -left-3 -top-3 h-8 w-8 rounded-full bg-brand-50 border border-brand-50 flex items-center justify-center text-brand-600 font-bold text-[12px] z-10 shadow-sm">
                      {selectedTicket.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex justify-between items-center mb-3 pl-4">
                      <span className="text-[13px] font-semibold text-text-primary">{selectedTicket.customerName}</span>
                      <span className="text-[12px] font-medium text-text-secondary">{new Date(selectedTicket.createdAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata',hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="text-[14px] text-text-primary whitespace-pre-wrap leading-relaxed pl-4">{selectedTicket.description}</div>
                  </div>
                </div>

                {/* Messages */}
                {messages.map((msg, idx) => (
                  <div key={msg._id} className={`flex ${msg.senderType === 'Customer' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm relative mt-3 ${msg.senderType === 'Customer' ? 'rounded-tl-sm bg-surface border border-border' : 'rounded-tr-sm ' + (msg.isInternalNote ? 'bg-warning-bg border border-warning-text/20' : 'bg-brand-600 text-white border border-brand-700')}`}>
                      
                      {msg.senderType === 'Customer' && (
                        <div className="absolute -left-3 -top-3 h-8 w-8 rounded-full bg-brand-50 border border-brand-50 flex items-center justify-center text-brand-600 font-bold text-[12px] z-10 shadow-sm">
                          {msg.senderName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className={`flex justify-between items-center mb-3 ${msg.senderType === 'Customer' ? 'pl-4' : ''}`}>
                        <span className="text-[13px] font-semibold flex items-center">
                          {msg.senderName} 
                          {msg.isInternalNote && <span className="ml-2 text-[10px] bg-warning-bg border border-warning-text/30 text-warning-text px-2 py-0.5 rounded-md uppercase tracking-wider">Internal Note</span>}
                        </span>
                        <span className={`text-[12px] font-medium ${msg.senderType === 'Customer' || msg.isInternalNote ? 'text-text-secondary' : 'text-brand-100'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata',hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className={`text-[14px] whitespace-pre-wrap leading-relaxed ${msg.senderType === 'Customer' ? 'pl-4 text-text-primary' : (msg.isInternalNote ? 'text-text-primary' : 'text-white')}`}>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="p-5 bg-surface border-t border-border">
                <form onSubmit={handleReply} className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center p-1 bg-subtle rounded-lg w-max">
                      <label className={`flex items-center px-3 py-1.5 text-[12px] font-semibold rounded-md cursor-pointer transition-all ${!isInternal ? 'bg-surface shadow-sm text-brand-600' : 'text-text-secondary hover:text-text-primary'}`}>
                        <input type="radio" name="replyType" checked={!isInternal} onChange={() => setIsInternal(false)} className="sr-only" />
                        Public Reply
                      </label>
                      <label className={`flex items-center px-3 py-1.5 text-[12px] font-semibold rounded-md cursor-pointer transition-all ${isInternal ? 'bg-surface shadow-sm text-warning-text' : 'text-text-secondary hover:text-text-primary'}`}>
                        <input type="radio" name="replyType" checked={isInternal} onChange={() => setIsInternal(true)} className="sr-only" />
                        Internal Note
                      </label>
                    </div>
                  </div>
                  <div className="flex items-end space-x-3">
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={isInternal ? "Type a private note for your team (not visible to customer)..." : "Type your reply to the customer (they will receive an email)..."}
                      className={`flex-1 p-3 border rounded-xl focus:outline-none resize-none shadow-sm transition-all text-[13px] ${isInternal ? 'border-warning-text/30 focus:ring-3 focus:ring-warning-text/10 focus:border-warning-text bg-warning-bg/30 placeholder-warning-text/60' : 'border-border-strong focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 bg-surface text-text-primary placeholder:text-text-muted'}`}
                      rows={3}
                    />
                    <button 
                      type="submit" 
                      disabled={!replyText.trim()} 
                      className={`px-5 py-3.5 rounded-xl text-white font-medium shadow-sm transition-all flex items-center h-full mt-auto ${isInternal ? 'bg-warning-text hover:opacity-90' : 'bg-brand-600 hover:bg-brand-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Send <Send size={16} className="ml-2" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Context */}
            <div className="w-full lg:w-1/3 bg-surface p-6 lg:overflow-y-auto border-l border-border">
              <h3 className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-5">Customer Profile</h3>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center text-lg font-bold">
                  {selectedTicket.customerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-[15px]">{selectedTicket.customerName}</h4>
                  <a href={`mailto:${selectedTicket.customerEmail}`} className="font-medium text-text-secondary hover:text-brand-600 transition flex items-center mt-0.5 text-[12px]">
                    <Mail size={12} className="mr-1.5" /> {selectedTicket.customerEmail}
                  </a>
                </div>
              </div>

              <div className="h-px w-full bg-border my-6"></div>

              <h3 className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-5">Ticket Details</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold text-text-secondary mb-1.5">Ticket Source</p>
                  <span className="px-2.5 py-1 bg-subtle text-text-primary border border-border text-[11px] font-semibold rounded-md capitalize inline-flex items-center shadow-sm">
                    {selectedTicket.source === 'chatbot' ? <MessageSquare size={12} className="mr-1.5 opacity-70"/> : <AlertCircle size={12} className="mr-1.5 opacity-70"/>}
                    {selectedTicket.source || 'Manual'}
                  </span>
                </div>
                {selectedTicket.keywordTags && selectedTicket.keywordTags.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold text-text-secondary mb-2">AI Auto-Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTicket.keywordTags.map(tag => (
                        <span key={tag} className="text-[11px] bg-brand-50 border border-brand-100 text-brand-600 px-2 py-0.5 rounded-md font-semibold flex items-center shadow-sm">
                          <Tag size={10} className="mr-1 opacity-70" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
