import mongoose from 'mongoose';
import dotenv from 'dotenv';
import KnowledgeBase from './src/models/KnowledgeBase.js';
import FaqSuggestion from './src/models/FaqSuggestion.js';

dotenv.config();

const clearDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await KnowledgeBase.deleteMany({});
    await FaqSuggestion.deleteMany({});
    console.log("SUCCESSFULLY CLEARED KB AND DRAFTS!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

clearDb();
