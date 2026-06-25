import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true },
  keywordTags: [{ type: String }],
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'General' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Medium' },
  status: { type: String, enum: ['Open', 'In Progress', 'Waiting for Customer', 'Resolved', 'Closed'], default: 'Open' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  source: { type: String, enum: ['chatbot', 'manual', 'email', 'website'], default: 'manual' },
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
