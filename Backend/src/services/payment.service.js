import stripe from '../config/stripe.config.js';

/**
 * Payment Service
 * Handles all Stripe payment operations
 */

const paymentService = {
  /**
   * Create a payment intent
   * @param {number} amount - Amount in cents (e.g., 2000 = $20.00)
   * @param {string} currency - Currency code (e.g., 'usd')
   * @param {object} metadata - Additional data to attach to payment
   * @returns {Promise<object>} Payment intent object
   */
  async createPaymentIntent(amount, currency = 'usd', metadata = {}) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount), // Ensure integer
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return {
        success: false,
        error: error.message,
        code: error.code,
      };
    }
  },

  /**
   * Retrieve a payment intent
   * @param {string} paymentIntentId - Payment intent ID
   * @returns {Promise<object>} Payment intent object
   */
  async getPaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      return {
        success: true,
        paymentIntent,
      };
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Confirm a payment intent
   * @param {string} paymentIntentId - Payment intent ID
   * @returns {Promise<object>} Confirmed payment intent
   */
  async confirmPaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
      
      return {
        success: true,
        paymentIntent,
      };
    } catch (error) {
      console.error('Error confirming payment intent:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Cancel a payment intent
   * @param {string} paymentIntentId - Payment intent ID
   * @returns {Promise<object>} Cancelled payment intent
   */
  async cancelPaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
      
      return {
        success: true,
        paymentIntent,
      };
    } catch (error) {
      console.error('Error cancelling payment intent:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Create a refund
   * @param {string} paymentIntentId - Payment intent ID
   * @param {number} amount - Amount to refund in cents (optional, defaults to full refund)
   * @returns {Promise<object>} Refund object
   */
  async createRefund(paymentIntentId, amount = null) {
    try {
      const refundData = { payment_intent: paymentIntentId };
      if (amount) {
        refundData.amount = Math.round(amount);
      }

      const refund = await stripe.refunds.create(refundData);
      
      return {
        success: true,
        refund,
      };
    } catch (error) {
      console.error('Error creating refund:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Verify webhook signature
   * @param {string} payload - Raw request body
   * @param {string} signature - Stripe signature header
   * @returns {object} Verified event object or error
   */
  verifyWebhookSignature(payload, signature) {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      
      return {
        success: true,
        event,
      };
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

export const {
  createPaymentIntent,
  getPaymentIntent,
  confirmPaymentIntent,
  cancelPaymentIntent,
  createRefund,
  verifyWebhookSignature,
} = paymentService;

export default paymentService;
