import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Settings from '../models/Settings.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/supportflow_ai');
    console.log('MongoDB Connected for Seeding');

    await User.deleteMany();
    await Settings.deleteMany();

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@supportflow.ai',
      password: 'password123',
      role: 'Admin'
    });

    const agent = await User.create({
      name: 'Support Agent',
      email: 'agent@supportflow.ai',
      password: 'password123',
      role: 'Support Agent'
    });

    const customer = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      role: 'Customer'
    });

    await Settings.create({
      businessName: 'SupportFlow AI Demo',
      businessEmail: 'hello@supportflow.ai',
      servicesList: ['Standard Support', 'Premium Support', 'Enterprise Setup']
    });

    console.log('Seed Data Inserted Successfully!');
    console.log('Admin Email: admin@supportflow.ai | Password: password123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
