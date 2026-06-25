import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  businessName: { type: String, default: 'SupportFlow AI' },
  businessEmail: { type: String, default: 'support@example.com' },
  businessPhone: { type: String, default: '+1234567890' },
  businessAddress: { type: String, default: '123 Main St, Tech City' },
  openingHours: { type: String, default: 'Mon-Fri 9AM-5PM' },
  servicesList: [{ type: String }],
  emailSmtpStatus: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
