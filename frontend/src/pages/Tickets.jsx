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
      case 'Open': return <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">Open</span>;
      case 'In Progress': return <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100">In Progress</span>;
      case 'Waiting for Customer': return <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100">Waiting on Cust</span>;
      case 'Resolved': return <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">Resolved</span>;
      case 'Closed': return <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200">Closed</span>;
      default: return <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg border border-gray-200">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
      case 'Urgent': return <span className="text-rose-600 font-bold text-xs flex items-center bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 w-max"><AlertCircle size={14} className="mr-1.5"/> {priority}</span>;
      case 'Medium': return <span className="text-amber-600 font-bold text-xs flex items-center bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 w-max">{priority}</span>;
      case 'Low': return <span className="text-emerald-600 font-bold text-xs flex items-center bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 w-max">{priority}</span>;
      default: return <span className="text-slate-600 font-bold text-xs bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 w-max">{priority}</span>;
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
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Helpdesk Tickets</h2>
              <p className="text-slate-500 mt-2">Manage and respond to customer issues and inquiries.</p>
            </div>
            <div className="bg-white text-slate-700 px-5 py-3 rounded-xl font-bold flex items-center border border-slate-200 shadow-sm">
              <MessageSquare size={20} className="mr-3 text-blue-600" />
              {tickets.length} Total Tickets
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tickets by ID, name, or email..." 
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  className="pl-9 pr-8 py-3 bg-white border border-slate-200 rounded-xl outline-none shadow-sm font-semibold text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500"
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
              <div className="relative">
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  className="pl-9 pr-8 py-3 bg-white border border-slate-200 rounded-xl outline-none shadow-sm font-semibold text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500"
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

          <div className="flex-1 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-50">
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
                        <div className="flex flex-col items-center text-slate-400">
                          <MessageSquare size={48} className="mb-4 opacity-20" />
                          <p className="text-lg font-semibold text-slate-600">No tickets found.</p>
                          <p className="text-sm">Try adjusting your search or filters.</p>
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
                      <tr key={ticket._id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group" onClick={() => handleSelectTicket(ticket)}>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-slate-900">{ticket.ticketId || 'TCK-000'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mr-3">
                              {ticket.customerName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900">{ticket.customerName}</div>
                              <div className="text-xs text-slate-500">{ticket.customerEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-600 flex items-center h-full pt-6"><Bookmark size={14} className="mr-2 text-slate-400"/> {ticket.category || 'General'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getPriorityBadge(ticket.priority)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ticket.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 font-bold hover:text-blue-700 bg-blue-50 opacity-0 group-hover:opacity-100 px-4 py-2 rounded-lg transition-all">
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
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full">
          {/* Header */}
          <div className="bg-white p-6 border-b border-slate-100 flex items-center justify-between z-10">
            <div className="flex items-center">
              <button 
                onClick={() => setViewMode('list')}
                className="mr-5 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{selectedTicket.subject}</h2>
                  <span className="text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg">{selectedTicket.ticketId}</span>
                </div>
                <div className="flex items-center text-sm text-slate-500 space-x-6 font-medium">
                  <span className="flex items-center"><User size={16} className="mr-2 text-slate-400"/> {selectedTicket.customerName}</span>
                  <span className="flex items-center"><Clock size={16} className="mr-2 text-slate-400"/> {new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  <span className="flex items-center"><Bookmark size={16} className="mr-2 text-slate-400"/> {selectedTicket.category || 'General'}</span>
                  <span className="flex items-center">{getPriorityBadge(selectedTicket.priority)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Update Status</span>
                <select 
                  value={selectedTicket.status} 
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  className="bg-white border-2 border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 block px-4 py-2 font-bold cursor-pointer outline-none transition-all hover:border-slate-300"
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
                className="flex items-center bg-slate-900 text-white px-5 py-3.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-sm disabled:opacity-70 mt-4 group"
              >
                <Save size={18} className="mr-2 group-hover:scale-110 transition-transform"/> 
                {savingFaq ? 'Generating...' : 'Save as FAQ'}
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Left Column: Conversation */}
            <div className="w-2/3 flex flex-col border-r border-slate-100 bg-slate-50/50 relative">
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Initial Issue */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-3xl rounded-tl-sm p-6 shadow-sm bg-white border border-slate-200 relative">
                    <div className="absolute -left-3 -top-3 h-8 w-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-indigo-700 font-bold text-xs z-10 shadow-sm">
                      {selectedTicket.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex justify-between items-center mb-4 pl-4">
                      <span className="text-sm font-bold text-slate-900">{selectedTicket.customerName}</span>
                      <span className="text-xs font-semibold text-slate-400">{new Date(selectedTicket.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="text-[15px] text-slate-700 whitespace-pre-wrap leading-relaxed pl-4">{selectedTicket.description}</div>
                  </div>
                </div>

                {/* Messages */}
                {messages.map((msg, idx) => (
                  <div key={msg._id} className={`flex ${msg.senderType === 'Customer' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] rounded-3xl p-6 shadow-sm relative ${msg.senderType === 'Customer' ? 'rounded-tl-sm bg-white border border-slate-200' : 'rounded-tr-sm ' + (msg.isInternalNote ? 'bg-amber-50 border border-amber-200' : 'bg-blue-600 text-white border border-blue-700')}`}>
                      
                      {msg.senderType === 'Customer' && (
                        <div className="absolute -left-3 -top-3 h-8 w-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-indigo-700 font-bold text-xs z-10 shadow-sm">
                          {msg.senderName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className={`flex justify-between items-center mb-4 ${msg.senderType === 'Customer' ? 'pl-4' : ''}`}>
                        <span className="text-sm font-bold flex items-center">
                          {msg.senderName} 
                          {msg.isInternalNote && <span className="ml-3 text-[10px] bg-amber-200/50 border border-amber-300 text-amber-800 px-2 py-1 rounded-lg uppercase tracking-wider">Internal Note</span>}
                        </span>
                        <span className={`text-xs font-semibold ${msg.senderType === 'Customer' || msg.isInternalNote ? 'text-slate-400' : 'text-blue-200'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className={`text-[15px] whitespace-pre-wrap leading-relaxed ${msg.senderType === 'Customer' ? 'pl-4 text-slate-700' : (msg.isInternalNote ? 'text-slate-700' : 'text-blue-50')}`}>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="p-6 bg-white border-t border-slate-100">
                <form onSubmit={handleReply} className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-6 p-1 bg-slate-100 rounded-xl w-max">
                      <label className={`flex items-center px-4 py-2 text-sm font-bold rounded-lg cursor-pointer transition-all ${!isInternal ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                        <input type="radio" name="replyType" checked={!isInternal} onChange={() => setIsInternal(false)} className="sr-only" />
                        Public Reply
                      </label>
                      <label className={`flex items-center px-4 py-2 text-sm font-bold rounded-lg cursor-pointer transition-all ${isInternal ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}>
                        <input type="radio" name="replyType" checked={isInternal} onChange={() => setIsInternal(true)} className="sr-only" />
                        Internal Note
                      </label>
                    </div>
                  </div>
                  <div className="flex items-end space-x-4">
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={isInternal ? "Type a private note for your team (not visible to customer)..." : "Type your reply to the customer (they will receive an email)..."}
                      className={`flex-1 p-4 border-2 rounded-2xl focus:ring-4 focus:outline-none resize-none shadow-sm transition-all text-[15px] ${isInternal ? 'border-amber-200 focus:ring-amber-100 focus:border-amber-400 bg-amber-50/30 placeholder-amber-400/70' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500 bg-white placeholder-slate-400'}`}
                      rows={3}
                    />
                    <button 
                      type="submit" 
                      disabled={!replyText.trim()} 
                      className={`px-6 py-4 rounded-2xl text-white font-bold shadow-sm transition-all flex items-center h-full mt-auto ${isInternal ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:-translate-y-0.5`}
                    >
                      Send <Send size={18} className="ml-3" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Context */}
            <div className="w-1/3 bg-white p-8 overflow-y-auto">
              <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider mb-6">Customer Profile</h3>
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                  {selectedTicket.customerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{selectedTicket.customerName}</h4>
                  <a href={`mailto:${selectedTicket.customerEmail}`} className="font-medium text-slate-500 hover:text-blue-600 transition flex items-center mt-1 text-sm">
                    <Mail size={14} className="mr-1.5" /> {selectedTicket.customerEmail}
                  </a>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100 my-8"></div>

              <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider mb-6">Ticket Details</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-2">Ticket Source</p>
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-lg capitalize inline-flex items-center">
                    {selectedTicket.source === 'chatbot' ? <MessageSquare size={12} className="mr-1.5"/> : <AlertCircle size={12} className="mr-1.5"/>}
                    {selectedTicket.source || 'Manual'}
                  </span>
                </div>
                {selectedTicket.keywordTags && selectedTicket.keywordTags.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-3">AI Auto-Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.keywordTags.map(tag => (
                        <span key={tag} className="text-xs bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold flex items-center">
                          <Tag size={12} className="mr-1.5 opacity-70" /> {tag}
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
