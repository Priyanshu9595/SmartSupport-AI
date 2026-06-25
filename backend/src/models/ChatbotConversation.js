import mongoose from 'mongoose';

const chatbotConversationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true }, // unique session id for anonymous users
  customerName: { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  messages: [
    {
      role: { type: String, enum: ['user', 'model'], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }
}, { timestamps: true });

export default mongoose.model('ChatbotConversation', chatbotConversationSchema);
