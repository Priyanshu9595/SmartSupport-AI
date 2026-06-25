import express from 'express';
import { 
  createKbArticle, 
  getKbArticles, 
  getPublicKbArticles, 
  updateKbArticle, 
  deleteKbArticle 
} from '../controllers/kbController.js';
import { protect, agentOrAdmin, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/public', getPublicKbArticles);
router.route('/')
  .post(protect, agentOrAdmin, createKbArticle)
  .get(protect, agentOrAdmin, getKbArticles);
  
router.route('/:id')
  .put(protect, agentOrAdmin, updateKbArticle)
  .delete(protect, adminOnly, deleteKbArticle);

export default router;
