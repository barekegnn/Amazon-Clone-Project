import paymentService from '../services/payment.service.js';
import orderService from '../services/order.service.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Create payment intent
 * POST /api/payment/create-intent
 */
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { amount, items, shippingAddress, billingAddress } = req.body;
  const user = req.user; // Set by auth middleware

  if (!amount || amount <= 0) {
    throw new ApiError(400, 'Invalid payment amount');
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, 'Cart items are required');
  }

  // Create payment intent with Stripe
  const result = await paymentService.createPaymentIntent(
    amount,
    'usd',
    {
      userId: user.uid,
      userEmail: user.email,
      itemCount: items.length,
    }
  );

  if (!result.success) {
    throw new ApiError(500, result.error || 'Failed to create payment intent');
  }

  // Create order in database with pending status
  const orderResult = await orderService.createOrder({
    userId: user.uid,
    userEmail: user.email,
    items,
    total: amount / 100, // Convert cents to dollars
    paymentIntentId: result.paymentIntentId,
    shippingAddress,
    billingAddress,
  });

  if (!orderResult.success) {
    console.error('Failed to create order:', orderResult.error);
    // Continue anyway, order can be created later via webhook
  }

  res.status(200).json({
    success: true,
    message: 'Payment intent created',
    data: {
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
      orderId: orderResult.orderId,
    },
  });
});

/**
 * Confirm payment
 * POST /api/payment/confirm
 */
export const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId, orderId } = req.body;

  if (!paymentIntentId) {
    throw new ApiError(400, 'Payment intent ID is required');
  }

  // Get payment intent from Stripe
  const paymentResult = await paymentService.getPaymentIntent(paymentIntentId);

  if (!paymentResult.success) {
    throw new ApiError(500, 'Failed to retrieve payment status');
  }

  const { paymentIntent } = paymentResult;

  // Update order payment status
  if (orderId) {
    if (paymentIntent.status === 'succeeded') {
      await orderService.updatePaymentStatus(orderId, 'paid');
      await orderService.updateOrderStatus(orderId, 'processing');
    } else if (paymentIntent.status === 'canceled') {
      await orderService.updatePaymentStatus(orderId, 'failed');
    }
  }

  res.status(200).json({
    success: true,
    message: 'Payment status retrieved',
    data: {
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    },
  });
});

/**
 * Handle Stripe webhooks
 * POST /api/payment/webhook
 */
export const handleWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const payload = req.rawBody; // Need raw body for signature verification

  if (!signature) {
    throw new ApiError(400, 'Missing Stripe signature');
  }

  // Verify webhook signature
  const verificationResult = paymentService.verifyWebhookSignature(payload, signature);

  if (!verificationResult.success) {
    throw new ApiError(400, 'Invalid webhook signature');
  }

  const { event } = verificationResult;

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);

      const orderResult = await orderService.getOrderByPaymentIntentId(paymentIntent.id);

      if (orderResult.success) {
        const orderId = orderResult.order.id;
        await orderService.updatePaymentStatus(orderId, 'paid');
        await orderService.updateOrderStatus(orderId, 'processing');
        console.log(`Order ${orderId} updated to processing.`);
      } else {
        console.error(`Order not found for payment intent ${paymentIntent.id}`);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      console.log('Payment failed:', paymentIntent.id);

      const orderResult = await orderService.getOrderByPaymentIntentId(paymentIntent.id);

      if (orderResult.success) {
        const orderId = orderResult.order.id;
        await orderService.updatePaymentStatus(orderId, 'failed');
        await orderService.updateOrderStatus(orderId, 'cancelled');
        console.log(`Order ${orderId} marked as failed.`);
      } else {
        console.error(`Order not found for payment intent ${paymentIntent.id}`);
      }
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object;
      console.log('Charge refunded:', charge.id);

      const orderResult = await orderService.getOrderByPaymentIntentId(charge.payment_intent);

      if (orderResult.success) {
        const orderId = orderResult.order.id;
        await orderService.updatePaymentStatus(orderId, 'refunded');
        await orderService.updateOrderStatus(orderId, 'cancelled');
        console.log(`Order ${orderId} marked as refunded.`);
      } else {
        console.error(`Order not found for payment intent ${charge.payment_intent}`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
});

/**
 * Get user's orders
 * GET /api/payment/orders
 */
export const getUserOrders = asyncHandler(async (req, res) => {
  const user = req.user;

  const result = await orderService.getUserOrders(user.uid);

  if (!result.success) {
    throw new ApiError(500, 'Failed to retrieve orders');
  }

  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    data: {
      orders: result.orders,
      count: result.count,
    },
  });
});

/**
 * Get order by ID
 * GET /api/payment/orders/:orderId
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const user = req.user;

  const result = await orderService.getOrderById(orderId);

  if (!result.success) {
    throw new ApiError(404, 'Order not found');
  }

  // Verify user owns this order
  if (result.order.userId !== user.uid) {
    throw new ApiError(403, 'You do not have permission to view this order');
  }

  res.status(200).json({
    success: true,
    message: 'Order retrieved successfully',
    data: {
      order: result.order,
    },
  });
});
