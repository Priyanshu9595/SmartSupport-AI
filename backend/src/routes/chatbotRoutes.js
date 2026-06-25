import express from 'express';
import { handleChatbotMessage, getConversations } from '../controllers/chatbotController.js';
import { protect, agentOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/message', handleChatbotMessage);
router.get('/conversations', protect, agentOrAdmin, getConversations);

export default router;
