import cron from 'node-cron';
import Appointment from '../models/Appointment.js';
import nodemailer from 'nodemailer';

export const initCronJobs = () => {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      
      // Find appointments that are exactly 24 hours from now
      const t24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const t24hStart = new Date(t24h.getTime() - 30000); // 30 sec buffer
      const t24hEnd = new Date(t24h.getTime() + 30000);

      // Find appointments that are exactly 15 minutes from now
      const t15m = new Date(now.getTime() + 15 * 60 * 1000);
      const t15mStart = new Date(t15m.getTime() - 30000);
      const t15mEnd = new Date(t15m.getTime() + 30000);

      const appointments24h = await Appointment.find({
        dateTime: { $gte: t24hStart, $lte: t24hEnd },
        status: { $in: ['Confirmed', 'Pending', 'Rescheduled'] }
      });

      const appointments15m = await Appointment.find({
        dateTime: { $gte: t15mStart, $lte: t15mEnd },
        status: { $in: ['Confirmed', 'Pending', 'Rescheduled'] }
      });

      // Actual Email Sending
      // Actual Email Sending
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      for (const apt of appointments24h) {
        try {
          await transporter.sendMail({
            from: process.env.SENDER_EMAIL || 'priyanshuraj9595@gmail.com',
            to: apt.email,
            subject: 'Reminder: Your Appointment is Tomorrow',
            text: `Hi ${apt.customerName},\n\nThis is a reminder for your upcoming appointment on ${new Date(apt.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}.\n\nMeeting Link: ${apt.meetingLink}\n\nBest,\nSupportFlow AI Team`
          });
          console.log(`[CRON] Sent T-24h Email Reminder to ${apt.email}`);
        } catch (err) {
          console.log(`[CRON] Failed to send T-24h Email to ${apt.email}. Check credentials.`);
        }
      }

      for (const apt of appointments15m) {
        try {
          await transporter.sendMail({
            from: process.env.SENDER_EMAIL || 'priyanshuraj9595@gmail.com',
            to: apt.email,
            subject: 'Starting Soon: Your Appointment in 15 Minutes',
            text: `Hi ${apt.customerName},\n\nYour appointment starts in exactly 15 minutes!\n\nJoin here: ${apt.meetingLink}\n\nBest,\nSupportFlow AI Team`
          });
          console.log(`[CRON] Sent T-15m Email Reminder to ${apt.email}`);
        } catch (err) {
          console.log(`[CRON] Failed to send T-15m Email to ${apt.email}. Check credentials.`);
        }
      }

    } catch (error) {
      console.error('[CRON] Error running appointment checks:', error);
    }
  });

  console.log('Cron jobs and Email Reminders initialized.');
};
