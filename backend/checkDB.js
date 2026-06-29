import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './src/models/Appointment.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://user:pass@cluster.mongodb.net/test').then(async () => {
  const apps = await Appointment.find().sort({ createdAt: -1 }).limit(3);
  console.log("RECENT APPOINTMENTS:", JSON.stringify(apps, null, 2));
  process.exit();
}).catch(console.error);
