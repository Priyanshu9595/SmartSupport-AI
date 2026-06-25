import express from 'express';
import { 
  createTicket, 
  getTickets, 
  getMyTickets,
  getTicketById, 
  updateTicket, 
  deleteTicket, 
  addTicketMessage, 
  resolveTicket,
  saveToFaq
} from '../controllers/ticketController.js';
import { protect, agentOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createTicket); // Public or authenticated
router.get('/', protect, agentOrAdmin, getTickets);
router.get('/my-tickets', protect, getMyTickets);
router.get('/:id', getTicketById); // Could be accessed via public link or protect
router.put('/:id', protect, agentOrAdmin, updateTicket);
router.delete('/:id', protect, agentOrAdmin, deleteTicket);
router.post('/:id/messages', addTicketMessage);
router.put('/:id/resolve', protect, agentOrAdmin, resolveTicket);
router.post('/:id/save-faq', protect, agentOrAdmin, saveToFaq);

export default router;
