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
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Chatbot Conversations</h2>
          <p className="text-slate-500 mt-2">Review transcripts and convert interactions into tickets or leads.</p>
        </div>
        <div className="bg-white text-slate-700 px-5 py-3 rounded-xl font-bold flex items-center border border-slate-200 shadow-sm">
          <MessageSquare size={20} className="mr-3 text-fuchsia-600" />
          {conversations.length} Active Sessions
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-1/3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-extrabold text-slate-800 mb-3 text-lg">Session History</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search sessions..." 
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                 <Bot size={32} className="mb-3 opacity-30" />
                 <p className="text-sm font-semibold">No chat logs found.</p>
              </div>
            ) : (
              conversations
                .filter(c => c.sessionId.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(conv => (
                <div 
                  key={conv._id} 
                  onClick={() => setSelectedConv(conv)}
                  className={`p-5 cursor-pointer transition-all ${selectedConv?._id === conv._id ? 'bg-fuchsia-50/50 border-l-4 border-fuchsia-500' : 'border-l-4 border-transparent hover:bg-slate-50'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-bold truncate pr-2 ${selectedConv?._id === conv._id ? 'text-fuchsia-900' : 'text-slate-800'}`}>Session: {conv.sessionId.substring(0, 15)}...</span>
                  </div>
                  <div className="flex items-center text-xs font-medium text-slate-500 mb-3">
                    <Clock size={12} className="mr-1.5" />
                    {new Date(conv.updatedAt).toLocaleString()}
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 flex items-center bg-slate-100/80 px-2.5 py-1 rounded-md w-max border border-slate-200/60 uppercase tracking-wider">
                    <MessageSquare size={10} className="mr-1.5" />
                    {conv.messages.length} messages
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Detail View */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {selectedConv ? (
            <>
              <div className="p-6 border-b border-slate-100 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shadow-sm">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center mr-4 shadow-inner">
                     <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">AI Chat Transcript</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">ID: {selectedConv.sessionId}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 items-center">
                  <div className="flex space-x-3">
                    <button onClick={handleConvertToTicket} className="text-sm font-bold bg-white border-2 border-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition flex items-center group">
                      <Plus size={16} className="mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
                      Create Ticket
                    </button>
                    <button onClick={handleConvertToLead} className="text-sm font-bold bg-white border-2 border-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition flex items-center group">
                      <Users size={16} className="mr-2 text-indigo-500 group-hover:scale-110 transition-transform" />
                      Save as Lead
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-50/80">
                <div className="text-center mb-8">
                   <span className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                      Chat Started on {new Date(selectedConv.createdAt).toLocaleString()}
                   </span>
                </div>

                {selectedConv.messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center mb-2 space-x-2 px-1 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {msg.role === 'user' ? (
                        <>
                           <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500"><User size={12}/></div>
                           <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">User</span>
                        </>
                      ) : (
                        <>
                           <div className="h-6 w-6 rounded-full bg-fuchsia-100 flex items-center justify-center text-fuchsia-600"><Bot size={12}/></div>
                           <span className="text-xs font-extrabold text-fuchsia-600 uppercase tracking-wider">Support AI</span>
                        </>
                      )}
                    </div>
                    <div className={`max-w-[75%] px-5 py-4 text-[15px] leading-relaxed shadow-sm relative ${
                      msg.role === 'user' 
                        ? 'bg-slate-800 text-white rounded-2xl rounded-tr-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
              <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-slate-100">
                <MessageSquare size={48} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-600 mb-2">No Transcript Selected</h3>
              <p className="text-sm font-medium">Choose a chat session from the sidebar to view the full transcript and take actions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotAdmin;
