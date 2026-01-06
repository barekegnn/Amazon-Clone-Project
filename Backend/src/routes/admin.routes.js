import { Router } from 'express';
import { getAdminStats } from '../controllers/admin.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Protect all admin routes
router.use(requireAuth, requireRole('admin'));

router.get('/stats', getAdminStats);

export default router;
