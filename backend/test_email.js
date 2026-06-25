import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const testEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log("Sending test email using Brevo...");
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Test: AI Appointment Reminder Bot is Working! 🚀',
      text: 'Hello!\n\nIf you are reading this, your Brevo SMTP is perfectly configured and working.\nThe background AI Reminder Bot will now be able to send appointment reminders successfully!\n\nBest,\nSupportFlow AI Team'
    });

    console.log("SUCCESS! Test email sent successfully to", process.env.EMAIL_USER);
    process.exit(0);
  } catch (error) {
    console.error("FAILED! Error details:", error.message);
    process.exit(1);
  }
};

testEmail();
