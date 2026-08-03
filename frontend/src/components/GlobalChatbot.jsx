import React from 'react';
import { useAuth } from '../context/AuthContext';
import ChatbotWidget from './ChatbotWidget';

const GlobalChatbot = () => {
  const { user } = useAuth();
  
  // Chatbot is now available to all visitors (logged in or guests)
  return <ChatbotWidget user={user} />;
};

export default GlobalChatbot;
