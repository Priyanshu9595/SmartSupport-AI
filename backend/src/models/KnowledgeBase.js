import mongoose from 'mongoose';

const knowledgeBaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'General' },
  tags: [{ type: String }],
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('KnowledgeBase', knowledgeBaseSchema);
