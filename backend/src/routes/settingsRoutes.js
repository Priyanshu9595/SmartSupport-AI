import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSettings); // Public access to settings (like business name, hours)
router.put('/', protect, adminOnly, updateSettings);

export default router;
