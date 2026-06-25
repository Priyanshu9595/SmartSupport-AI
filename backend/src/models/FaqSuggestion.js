import mongoose from 'mongoose';

const faqSuggestionSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  suggestedQuestion: { type: String, required: true },
  suggestedAnswer: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('FaqSuggestion', faqSuggestionSchema);
