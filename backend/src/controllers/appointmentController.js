import Appointment from '../models/Appointment.js';
import Notification from '../models/Notification.js';
import { sendEmail } from '../utils/email.js';
import { createGoogleMeetEvent } from '../utils/googleMeet.js';

export const createAppointment = async (req, res) => {
  try {
    let meetingLink = await createGoogleMeetEvent(req.body);

    if (!meetingLink) {
      // Fallback: Using Jitsi Meet if Google credentials are missing or fail
      const uniqueRoomId = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
      meetingLink = `https://meet.jit.si/SmartSupport-${uniqueRoomId}`;
    }
    
    const appointment = await Appointment.create({
      ...req.body,
      meetingLink,
      status: req.body.status || 'Pending'
    });

    // Send instant confirmation email
    const emailSubject = 'Booking Confirmation - SmartSupport AI';
    const emailBody = `Hi ${appointment.customerName},\n\nWe have received your booking request for a ${appointment.serviceType || 'Service'}.\n\nDate & Time: ${new Date(appointment.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}\nMeeting Link: ${appointment.meetingLink}\n\nOur team will review this and confirm shortly. You will receive a reminder 24 hours before the meeting.\n\nBest,\nSupportFlow AI Team`;
    
    sendEmail(appointment.email, emailSubject, emailBody).catch(e => console.error('Failed to send booking email:', e));

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort('date time');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ email: req.user.email }).sort({ dateTime: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.status) updateData.status = req.body.status;
    if (req.body.dateTime) updateData.dateTime = req.body.dateTime;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // Send email notification about the update
    const emailSubject = 'Update on your Appointment - SmartSupport AI';
    const emailBody = `Hi ${appointment.customerName},\n\nYour appointment details have been updated by our team.\n\nNew Status: ${appointment.status}\nDate & Time: ${new Date(appointment.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}\nMeeting Link: ${appointment.meetingLink}\n\nPlease reach out if you have any questions.\n\nBest,\nSupportFlow AI Team`;
    sendEmail(appointment.email, emailSubject, emailBody).catch(e => console.error('Failed to send update email:', e));

    // Create In-App Notification
    await Notification.create({
      email: appointment.email,
      message: `Your appointment for ${appointment.serviceType || 'a Service'} has been updated to ${appointment.status}. Time: ${new Date(appointment.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}`,
      type: 'appointment_update'
    });

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const sendManualReminder = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    
    const emailSubject = 'Reminder: Your Appointment with SmartSupport AI';
    const emailBody = `Hi ${appointment.customerName},\n\nThis is a manual reminder for your upcoming appointment.\n\nDate & Time: ${new Date(appointment.dateTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}\nMeeting Link: ${appointment.meetingLink}\n\nBest,\nSupportFlow AI Team`;
    
    await sendEmail(appointment.email, emailSubject, emailBody);
    
    res.json({ message: 'Reminder sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
