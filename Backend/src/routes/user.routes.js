import { Router } from 'express';
import { 
  getAllUsers, 
  updateUserRole,
  getUserById
} from '../controllers/user.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Apply admin protection to all routes
router.use(requireAuth, requireRole('admin'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id/role', updateUserRole);

export default router;
