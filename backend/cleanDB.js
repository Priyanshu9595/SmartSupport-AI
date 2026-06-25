import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import KnowledgeBase from './src/models/KnowledgeBase.js';
import FaqSuggestion from './src/models/FaqSuggestion.js';

const cleanDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Delete all existing KB articles and AI Drafts to remove the old generic answers
    await KnowledgeBase.deleteMany({});
    await FaqSuggestion.deleteMany({});
    
    console.log("Successfully cleared old Knowledge Base articles and AI Drafts!");
    process.exit(0);
  } catch (error) {
    console.error("Error cleaning DB:", error);
    process.exit(1);
  }
};

cleanDB();
