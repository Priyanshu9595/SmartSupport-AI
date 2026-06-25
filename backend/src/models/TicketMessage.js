import mongoose from 'mongoose';

const ticketMessageSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Null if sent by unauthenticated customer/chatbot
  senderName: { type: String, required: true },
  senderType: { type: String, enum: ['Customer', 'Agent', 'Admin', 'System', 'Chatbot'], required: true },
  message: { type: String, required: true },
  isInternalNote: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('TicketMessage', ticketMessageSchema);
