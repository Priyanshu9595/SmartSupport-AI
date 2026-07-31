import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { MessageSquare, Clock, User, Download, Plus, Bot, Users, Search } from 'lucide-react';

const ChatbotAdmin = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data } = await api.get('/chatbot/conversations');
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToTicket = async () => {
    if (!selectedConv) return;
    const email = prompt("Enter customer email for the ticket:");
    if (!email) return;
    try {
      await api.post('/tickets', {
        customerName: 'Chatbot User',
        customerEmail: email,
        issueDescription: `Converted from Chat Session ${selectedConv.sessionId}.\n\nTranscript:\n${selectedConv.messages.map(m => `${m.role}: ${m.text}`).join('\n')}`,
        category: 'General',
        priority: 'Medium'
      });
      alert('Ticket created successfully!');
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket.');
    }
  };

  const handleConvertToLead = async () => {
    if (!selectedConv) return;
    const name = prompt("Enter lead name:");
    const email = prompt("Enter lead email:");
    if (!name || !email) return;
    try {
      await api.post('/leads', {
        name,
        email,
        interestedService: 'General Inquiry',
        notes: `Captured from Chat Session ${selectedConv.sessionId}`,
        status: 'New'
      });
      alert('Lead created successfully!');
    } catch (error) {
      console.error('Error creating lead:', error);
      alert('Failed to create lead.');
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Chatbot Conversations</h2>
          <p className="text-[14px] text-text-secondary mt-1">Review transcripts and convert interactions into tickets or leads.</p>
        </div>
        <div className="bg-surface text-text-primary px-4 py-2 rounded-lg font-medium text-[13px] flex items-center border border-border shadow-sm">
          <MessageSquare size={18} className="mr-2 text-brand-600" />
          {conversations.length} Active Sessions
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-1/3 bg-surface rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border bg-subtle">
            <h3 className="font-semibold text-text-primary mb-2 text-[15px]">Session History</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search sessions..." 
                className="w-full pl-9 pr-3 py-1.5 bg-surface border border-border-strong rounded-lg focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none shadow-sm transition text-[13px] text-text-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="divide-y divide-border flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-text-secondary flex flex-col items-center">
                 <Bot size={32} className="mb-3 opacity-30" />
                 <p className="text-[13px] font-medium">No chat logs found.</p>
              </div>
            ) : (
              conversations
                .filter(c => c.sessionId.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(conv => (
                <div 
                  key={conv._id} 
                  onClick={() => setSelectedConv(conv)}
                  className={`p-4 cursor-pointer transition-all ${selectedConv?._id === conv._id ? 'bg-brand-50 border-l-4 border-brand-600' : 'border-l-4 border-transparent hover:bg-subtle'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[13px] font-semibold truncate pr-2 ${selectedConv?._id === conv._id ? 'text-brand-700' : 'text-text-primary'}`}>Session: {conv.sessionId.substring(0, 15)}...</span>
                  </div>
                  <div className="flex items-center text-[12px] font-medium text-text-muted mb-3">
                    <Clock size={12} className="mr-1.5" />
                    {new Date(conv.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </div>
                  <div className="text-[11px] font-medium text-text-secondary bg-surface px-2 py-0.5 rounded-md w-max border border-border uppercase tracking-wider flex items-center">
                    <MessageSquare size={10} className="mr-1.5" />
                    {conv.messages.length} messages
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Detail View */}
        <div className="flex-1 bg-surface rounded-xl border border-border shadow-sm flex flex-col overflow-hidden">
          {selectedConv ? (
            <>
              <div className="p-5 border-b border-border bg-surface flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shadow-sm">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mr-3 shadow-inner">
                     <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-[15px] tracking-tight">AI Chat Transcript</h3>
                    <p className="text-[12px] font-medium text-text-secondary mt-0.5">ID: {selectedConv.sessionId}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 items-center">
                  <div className="flex space-x-2">
                    <button onClick={handleConvertToTicket} className="text-[13px] font-medium bg-surface border border-border text-text-primary px-3 py-1.5 rounded-lg hover:bg-subtle transition flex items-center group shadow-sm">
                      <Plus size={14} className="mr-1.5 text-brand-600 group-hover:scale-110 transition-transform" />
                      Create Ticket
                    </button>
                    <button onClick={handleConvertToLead} className="text-[13px] font-medium bg-surface border border-border text-text-primary px-3 py-1.5 rounded-lg hover:bg-subtle transition flex items-center group shadow-sm">
                      <Users size={14} className="mr-1.5 text-brand-600 group-hover:scale-110 transition-transform" />
                      Save as Lead
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-bg-app">
                <div className="text-center mb-6">
                   <span className="bg-subtle text-text-secondary border border-border text-[11px] font-medium px-3 py-1 rounded-full">
                      Chat Started on {new Date(selectedConv.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                   </span>
                </div>

                {selectedConv.messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center mb-2 space-x-2 px-1 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {msg.role === 'user' ? (
                        <>
                           <div className="h-6 w-6 rounded-full bg-subtle flex items-center justify-center text-text-secondary"><User size={12}/></div>
                           <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">User</span>
                        </>
                      ) : (
                        <>
                           <div className="h-6 w-6 rounded-full bg-brand-50 flex items-center justify-center text-brand-600"><Bot size={12}/></div>
                           <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider">Support AI</span>
                        </>
                      )}
                    </div>
                    <div className={`max-w-[75%] px-4 py-3 text-[14px] leading-relaxed shadow-sm relative ${
                      msg.role === 'user' 
                        ? 'bg-brand-600 text-white rounded-xl rounded-tr-sm' 
                        : 'bg-surface border border-border text-text-primary rounded-xl rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-text-secondary bg-subtle">
              <div className="h-20 w-20 bg-surface rounded-full flex items-center justify-center shadow-sm mb-4 border border-border">
                <MessageSquare size={32} className="text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-1">No Transcript Selected</h3>
              <p className="text-[13px] font-medium text-text-secondary">Choose a chat session from the sidebar to view the full transcript and take actions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotAdmin;
