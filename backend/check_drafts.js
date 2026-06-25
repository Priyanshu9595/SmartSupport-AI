import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FaqSuggestion from './src/models/FaqSuggestion.js';

dotenv.config();

const checkDrafts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const drafts = await FaqSuggestion.find({});
    console.log("DRAFTS IN DB:", JSON.stringify(drafts, null, 2));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkDrafts();
