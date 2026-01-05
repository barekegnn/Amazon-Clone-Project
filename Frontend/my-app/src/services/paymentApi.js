/**
 * Payment API Service
 * Handles all payment-related API calls to the backend
 */

import { getAuthToken } from './authApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Helper function to handle authenticated requests
 */
async function authenticatedRequest(endpoint, method = 'GET', body = null) {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'An error occurred');
  }

  return data;
}

/**
 * Create a payment intent
 * @param {object} paymentData - Payment details (amount, items, address)
 * @returns {Promise<object>} Payment intent client secret and order ID
 */
export async function createPaymentIntent(paymentData) {
  const result = await authenticatedRequest('/api/payment/create-intent', 'POST', paymentData);
  return result.data;
}

/**
 * Confirm payment status with backend
 * @param {string} paymentIntentId - Stripe Payment Intent ID
 * @param {string} orderId - Order ID to update
 * @returns {Promise<object>} Payment status
 */
export async function confirmPayment(paymentIntentId, orderId) {
  const result = await authenticatedRequest('/api/payment/confirm', 'POST', {
    paymentIntentId,
    orderId,
  });
  return result.data;
}

/**
 * Get user's orders
 * @returns {Promise<array>} List of orders
 */
export async function getUserOrders() {
  const result = await authenticatedRequest('/api/payment/orders');
  return result.data.orders;
}

/**
 * Get single order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<object>} Order details
 */
export async function getOrderById(orderId) {
  const result = await authenticatedRequest(`/api/payment/orders/${orderId}`);
  return result.data.order;
}
