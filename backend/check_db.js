import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ChatbotConversation from './src/models/ChatbotConversation.js';

dotenv.config();

const check = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const conv = await ChatbotConversation.findOne({ sessionId: 'test-booking-session-999' });
  console.log(JSON.stringify(conv, null, 2));
  process.exit(0);
};

check();
