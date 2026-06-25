import Lead from '../models/Lead.js';
import { sendEmail } from '../utils/email.js';

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    
    // Send confirmation email
    if (req.body.email) {
      const emailSubject = 'Thank you for your inquiry - SupportFlow AI';
      const emailBody = `Hi ${req.body.name || 'there'},\n\nThank you for reaching out to us. We have received your inquiry and our team will get back to you shortly.\n\nBest,\nSupportFlow AI Team`;
      sendEmail(req.body.email, emailSubject, emailBody).catch(e => console.error('Failed to send inquiry email:', e));
    }

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort('-createdAt');
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
