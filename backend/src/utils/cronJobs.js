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

      // Find appointments that are exactly 1 hour from now
      const t1h = new Date(now.getTime() + 60 * 60 * 1000);
      const t1hStart = new Date(t1h.getTime() - 30000);
      const t1hEnd = new Date(t1h.getTime() + 30000);

      const appointments24h = await Appointment.find({
        dateTime: { $gte: t24hStart, $lte: t24hEnd },
        status: 'Confirmed'
      });

      const appointments1h = await Appointment.find({
        dateTime: { $gte: t1hStart, $lte: t1hEnd },
        status: 'Confirmed'
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
            from: process.env.EMAIL_USER,
            to: apt.email,
            subject: 'Reminder: Your Appointment is Tomorrow',
            text: `Hi ${apt.customerName},\n\nThis is a reminder for your upcoming appointment on ${new Date(apt.dateTime).toLocaleString()}.\n\nMeeting Link: ${apt.meetingLink}\n\nBest,\nSupportFlow AI Team`
          });
          console.log(`[CRON] Sent T-24h Email Reminder to ${apt.email}`);
        } catch (err) {
          console.log(`[CRON] Failed to send T-24h Email to ${apt.email}. Check credentials.`);
        }
      }

      for (const apt of appointments1h) {
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: apt.email,
            subject: 'Starting Soon: Your Appointment',
            text: `Hi ${apt.customerName},\n\nYour appointment starts in 1 hour!\n\nJoin here: ${apt.meetingLink}\n\nBest,\nSupportFlow AI Team`
          });
          console.log(`[CRON] Sent T-1h Email Reminder to ${apt.email}`);
        } catch (err) {
          console.log(`[CRON] Failed to send T-1h Email to ${apt.email}. Check credentials.`);
        }
      }

    } catch (error) {
      console.error('[CRON] Error running appointment checks:', error);
    }
  });

  console.log('Cron jobs and Email Reminders initialized.');
};
