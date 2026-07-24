import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './src/models/Appointment.js';
import { sendEmail } from './src/utils/email.js';

dotenv.config();

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    const appointment = await Appointment.findOne();
    if (!appointment) {
      console.log('No appointments found');
      process.exit(0);
    }
    
    console.log('Found appointment:', appointment);

    const emailSubject = 'Reminder: Your Appointment with SmartSupport AI';
    const emailBody = `Hi ${appointment.customerName},\n\nThis is a manual reminder for your upcoming appointment.\n\nDate & Time: ${new Date(appointment.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}\nMeeting Link: ${appointment.meetingLink}\n\nBest,\nSupportFlow AI Team`;
    
    console.log('Email Body:', emailBody);
    await sendEmail(appointment.email, emailSubject, emailBody);
    
    console.log('Reminder sent successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

test();
