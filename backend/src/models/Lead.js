import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  interestedService: { type: String },
  message: { type: String },
  source: { type: String, enum: ['chatbot', 'website', 'manual'], default: 'chatbot' },
  status: { type: String, enum: ['New', 'Contacted', 'Interested', 'Converted', 'Not Interested'], default: 'New' },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
