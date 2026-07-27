import React from 'react';
import { useAuth } from '../context/AuthContext';
import ChatbotWidget from './ChatbotWidget';

const GlobalChatbot = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null; // Only show when logged in
  }
  
  return <ChatbotWidget user={user} />;
};

export default GlobalChatbot;
