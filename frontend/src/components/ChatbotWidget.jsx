import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, RefreshCw } from 'lucide-react';
import api from '../utils/api';

const ChatbotWidget = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: "Hi there! 👋 I'm Sarah from SupportFlow. How can I help you today?", intent: 'support' }]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);



  // Quick reply options based on spec
  const initialOptions = [
    "Pricing",
    "Appointment",
    "Support",
    "Contact",
    "Talk to human"
  ];

  useEffect(() => {
    if (!localStorage.getItem('chatbotSessionId')) {
      localStorage.setItem('chatbotSessionId', 'session_' + Math.random().toString(36).substr(2, 9));
    }
    setSessionId(localStorage.getItem('chatbotSessionId'));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const startNewChat = () => {
    const newSessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chatbotSessionId', newSessionId);
    setSessionId(newSessionId);
    setMessages([{ role: 'model', text: "Hi there! 👋 I'm Sarah from SupportFlow. How can I help you today?", intent: 'support' }]);
    setInput('');
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const { data } = await api.post('/chatbot/message', { 
        sessionId, 
        message: userMessage,
        userName: user?.name,
        userEmail: user?.email
      });
      setMessages(prev => [...prev, { role: 'model', text: data.reply, intent: data.intent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.', intent: 'support' }]);
    } finally {
      setIsTyping(false);
    }
  };



  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {isOpen && (
        <div className="bg-surface w-[calc(100vw-2rem)] sm:w-96 rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col h-[80vh] max-h-[550px] mb-4 transition-all duration-300">
          {/* Header */}
          <div className="bg-brand-600 text-white p-4 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src="https://i.pravatar.cc/150?img=47" alt="Sarah" className="w-10 h-10 rounded-full border-2 border-brand-600 object-cover shadow-sm" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-text border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="font-semibold text-lg tracking-tight leading-tight text-white">Sarah</h3>
                <p className="text-brand-50 text-[11px] font-medium flex items-center"><span className="w-1.5 h-1.5 bg-success-text rounded-full mr-1.5 animate-pulse"></span> Online - Replies instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={startNewChat} title="New Chat" className="text-brand-50 hover:text-white transition bg-white/10 p-1.5 rounded-full hover:bg-white/20">
                <RefreshCw size={18} />
              </button>
              <button onClick={toggleChat} className="text-brand-50 hover:text-white transition bg-white/10 p-1.5 rounded-full hover:bg-white/20">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-bg-app flex flex-col space-y-5">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col w-full">
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <img src="https://i.pravatar.cc/150?img=47" alt="Sarah" className="w-7 h-7 rounded-full mr-2 self-end mb-1 shadow-sm object-cover" />
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-surface border border-border text-text-primary rounded-bl-sm'}`}>
                    {msg.text}
                  </div>
                </div>

                {/* Show initial options if it's the very first message */}
                {i === 0 && messages.length === 1 && !isTyping && (
                  <div className="flex flex-wrap gap-2 mt-3 pl-9 self-start">
                    {initialOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInput(opt);
                          setTimeout(() => {
                            document.querySelector('.chatbot-submit-btn')?.click();
                          }, 10);
                        }}
                        className="bg-surface border border-border-strong text-brand-600 hover:bg-brand-50 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors shadow-sm cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start items-center">
                <img src="https://i.pravatar.cc/150?img=47" alt="Sarah" className="w-7 h-7 rounded-full mr-2 shadow-sm object-cover" />
                <div className="bg-surface border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex space-x-1.5 items-center h-9">
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 bg-surface border-t border-border flex items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-subtle border-transparent focus:bg-surface focus:ring-2 focus:ring-brand-600 focus:border-transparent rounded-full px-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-muted transition-all outline-none"
            />
            <button type="submit" className="chatbot-submit-btn ml-2 bg-brand-600 text-white p-2.5 rounded-full hover:bg-brand-700 disabled:opacity-50 transition-colors shadow-sm">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button with Pulse Effect */}
      <div className={`relative ${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-300`}>
        <div className="absolute inset-0 bg-brand-600 rounded-full animate-ping opacity-75"></div>
        <button
          onClick={toggleChat}
          className="chatbot-trigger-btn relative bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center z-10"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
