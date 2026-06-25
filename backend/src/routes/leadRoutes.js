import express from 'express';
import { createLead, getLeads, updateLead, deleteLead } from '../controllers/leadController.js';
import { protect, agentOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createLead); // Public/Chatbot
router.get('/', protect, agentOrAdmin, getLeads);
router.put('/:id', protect, agentOrAdmin, updateLead);
router.delete('/:id', protect, agentOrAdmin, deleteLead);

export default router;
