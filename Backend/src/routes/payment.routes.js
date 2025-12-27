import { Router } from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  handleWebhook,
  getUserOrders,
  getOrderById,
} from '../controllers/payment.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

// Payment intent routes (require authentication)
router.post('/create-intent', requireAuth, createPaymentIntent);
router.post('/confirm', requireAuth, confirmPayment);

// Order routes (require authentication)
router.get('/orders', requireAuth, getUserOrders);
router.get('/orders/:orderId', requireAuth, getOrderById);

// Webhook route (no auth required, verified by Stripe signature)
router.post('/webhook', handleWebhook);

export default router;
