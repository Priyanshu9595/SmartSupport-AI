import express from 'express';
import { createAppointment, getAppointments, getMyAppointments, updateAppointment, deleteAppointment, sendManualReminder } from '../controllers/appointmentController.js';
import { protect, agentOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createAppointment); // Public/Chatbot
router.get('/my-appointments', protect, getMyAppointments); // Customer
router.get('/', protect, agentOrAdmin, getAppointments);
router.put('/:id', protect, agentOrAdmin, updateAppointment);
router.post('/:id/remind', protect, agentOrAdmin, sendManualReminder);
router.delete('/:id', protect, agentOrAdmin, deleteAppointment);

export default router;
