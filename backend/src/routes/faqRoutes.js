import express from 'express';
import { getFaqSuggestions, approveFaqSuggestion, rejectFaqSuggestion } from '../controllers/faqController.js';
import { protect, agentOrAdmin, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, agentOrAdmin, getFaqSuggestions);
router.post('/:id/approve', protect, adminOnly, approveFaqSuggestion);
router.post('/:id/reject', protect, adminOnly, rejectFaqSuggestion);

export default router;
