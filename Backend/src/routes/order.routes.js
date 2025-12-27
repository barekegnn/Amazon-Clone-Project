import { Router } from 'express';
import { 
  getAllOrders, 
  getOrderById, 
  updateOrderStatus 
} from '../controllers/order.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Apply admin protection to all routes
router.use(requireAuth, requireRole('admin'));

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

export default router;
