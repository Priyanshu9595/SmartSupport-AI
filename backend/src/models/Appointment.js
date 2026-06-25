import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  serviceType: { type: String, default: 'General Consultation' },
  message: { type: String },
  dateTime: { type: Date, required: true },
  meetingLink: { type: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Rescheduled', 'Cancelled', 'Completed'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
