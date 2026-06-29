import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'system',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
