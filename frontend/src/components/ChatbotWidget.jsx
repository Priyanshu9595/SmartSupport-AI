import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import api from '../utils/api';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: 'Hi! How can I help you today?', intent: 'support' }]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');
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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

    try {
      const { data } = await api.post('/chatbot/message', { sessionId, message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: data.reply, intent: data.intent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.', intent: 'support' }]);
    }
  };



  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[550px] mb-4 transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div>
              <h3 className="font-bold text-lg tracking-tight">Support AI</h3>
              <p className="text-blue-100 text-xs">Typically replies instantly</p>
            </div>
            <button onClick={toggleChat} className="text-blue-100 hover:text-white transition bg-white/10 p-1.5 rounded-full hover:bg-white/20">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'}`}>
                  {msg.text}
                </div>



                {/* Show initial options if it's the very first message */}
                {i === 0 && messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 mt-3 pl-2">
                    {initialOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInput(opt);
                          // We need to use a slight delay so setInput registers before submitting, or just call sendMessage directly
                          setTimeout(() => {
                            document.querySelector('.chatbot-submit-btn')?.click();
                          }, 10);
                        }}
                        className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full px-4 py-2.5 text-sm text-slate-800 transition-all outline-none"
            />
            <button type="submit" className="chatbot-submit-btn ml-2 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`chatbot-trigger-btn bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-110 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default ChatbotWidget;
