import { db } from '../config/firebase.config.js';
import { collection, addDoc, getDoc, getDocs, doc, query, where, orderBy, updateDoc, Timestamp } from 'firebase/firestore';

/**
 * Order Service
 * Handles order creation and management in Firestore
 */

const orderService = {
  /**
   * Create a new order
   * @param {object} orderData - Order information
   * @returns {Promise<object>} Created order with ID
   */
  async createOrder(orderData) {
    try {
      const {
        userId,
        userEmail,
        items,
        total,
        paymentIntentId,
        shippingAddress,
        billingAddress,
      } = orderData;

      const order = {
        userId,
        userEmail,
        items,
        total,
        paymentIntentId,
        shippingAddress: shippingAddress || null,
        billingAddress: billingAddress || null,
        status: 'pending', // pending, processing, shipped, delivered, cancelled
        paymentStatus: 'pending', // pending, paid, failed, refunded
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const ordersRef = collection(db, 'orders');
      const docRef = await addDoc(ordersRef, order);

      return {
        success: true,
        orderId: docRef.id,
        order: {
          id: docRef.id,
          ...order,
        },
      };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise<object>} Order data
   */
  async getOrderById(orderId) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      const orderSnap = await getDoc(orderRef);

      if (!orderSnap.exists()) {
        return {
          success: false,
          error: 'Order not found',
        };
      }

      return {
        success: true,
        order: {
          id: orderSnap.id,
          ...orderSnap.data(),
        },
      };
    } catch (error) {
      console.error('Error getting order:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Get all orders for a user
   * @param {string} userId - User ID
   * @param {number} limit - Maximum number of orders to return
   * @returns {Promise<object>} Array of orders
   */
  async getUserOrders(userId, limit = 50) {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return {
        success: true,
        orders,
        count: orders.length,
      };
    } catch (error) {
      console.error('Error getting user orders:', error);
      return {
        success: false,
        error: error.message,
        orders: [],
      };
    }
  },

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   * @returns {Promise<object>} Updated order
   */
  async updateOrderStatus(orderId, status) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      
      await updateDoc(orderRef, {
        status,
        updatedAt: Timestamp.now(),
      });

      return {
        success: true,
        message: 'Order status updated',
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Update payment status
   * @param {string} orderId - Order ID
   * @param {string} paymentStatus - New payment status
   * @returns {Promise<object>} Updated order
   */
  async updatePaymentStatus(orderId, paymentStatus) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      
      await updateDoc(orderRef, {
        paymentStatus,
        updatedAt: Timestamp.now(),
      });

      return {
        success: true,
        message: 'Payment status updated',
      };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Get all orders (admin only)
   * @param {number} limit - Maximum number of orders to return
   * @returns {Promise<object>} Array of all orders
   */
  async getAllOrders(limit = 100) {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, orderBy('createdAt', 'desc'));

      const querySnapshot = await getDocs(q);
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return {
        success: true,
        orders,
        count: orders.length,
      };
    } catch (error) {
      console.error('Error getting all orders:', error);
      return {
        success: false,
        error: error.message,
        orders: [],
      };
    }
  },
};

export const {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getAllOrders,
} = orderService;

export default orderService;
