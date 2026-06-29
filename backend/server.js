import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

import authRoutes from './src/routes/authRoutes.js';
import ticketRoutes from './src/routes/ticketRoutes.js';
import kbRoutes from './src/routes/kbRoutes.js';
import faqRoutes from './src/routes/faqRoutes.js';
import leadRoutes from './src/routes/leadRoutes.js';
import appointmentRoutes from './src/routes/appointmentRoutes.js';
import settingsRoutes from './src/routes/settingsRoutes.js';
import chatbotRoutes from './src/routes/chatbotRoutes.js';
import notificationRoutes from './src/routes/notificationRoutes.js';
import { initCronJobs } from './src/utils/cronJobs.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import User from './src/models/User.js';

// Database Connection
connectDB();

// Ensure Default Admin Exists
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@admin.co.in' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@admin.co.in',
        password: 'admin123',
        role: 'Admin'
      });
      console.log('Default Admin user (admin@admin.co.in) created successfully.');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};
seedAdmin();
// Test Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'SupportFlow AI Backend is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/kb', kbRoutes);
app.use('/api/faq-suggestions', faqRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/notifications', notificationRoutes);

// Start Background Jobs
initCronJobs();

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
