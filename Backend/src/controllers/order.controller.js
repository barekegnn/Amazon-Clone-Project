import orderService from '../services/order.service.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Get all orders (Admin)
 * GET /api/orders
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const result = await orderService.getAllOrders();

  if (!result.success) {
    throw new ApiError(500, 'Failed to retrieve orders');
  }

  res.status(200).json({
    success: true,
    data: result.orders,
    count: result.count
  });
});

/**
 * Get order by ID (Admin)
 * GET /api/orders/:id
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const result = await orderService.getOrderById(id);

  if (!result.success) {
    throw new ApiError(404, 'Order not found');
  }

  res.status(200).json({
    success: true,
    data: result.order
  });
});

/**
 * Update order status (Admin)
 * PUT /api/orders/:id/status
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }
  
  const result = await orderService.updateOrderStatus(id, status);

  if (!result.success) {
    throw new ApiError(500, result.error || 'Failed to update order status');
  }

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully'
  });
});
