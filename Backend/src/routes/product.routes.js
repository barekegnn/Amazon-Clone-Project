import { Router } from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getCategories 
} from '../controllers/product.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories); // Specific path before :id
router.get('/:id', getProductById);

// Admin routes (require 'admin' role)
router.post('/', requireAuth, requireRole('admin'), createProduct);
router.put('/:id', requireAuth, requireRole('admin'), updateProduct);
router.delete('/:id', requireAuth, requireRole('admin'), deleteProduct);

export default router;
