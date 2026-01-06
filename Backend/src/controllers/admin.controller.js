import orderService from '../services/order.service.js';
import userService from '../services/user.service.js';
import productService from '../services/product.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Get Admin Dashboard Stats
 * GET /api/admin/stats
 */
export const getAdminStats = asyncHandler(async (req, res) => {
  // Get counts and totals
  const ordersResult = await orderService.getAllOrders(1000); // Get more for accuracy
  const usersResult = await userService.getAllUsers(1000);
  const productsResult = await productService.getProducts({ limit: 1000 });

  const orders = ordersResult.orders || [];
  const usersCount = usersResult.users?.length || 0;
  const productsCount = productsResult.length || 0;

  // Calculate revenue from paid orders
  const totalRevenue = orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + (order.total || 0), 0);

  // Get recent orders (top 5)
  const recentOrders = orders.slice(0, 5).map(order => ({
    id: order.id,
    userEmail: order.userEmail,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt
  }));

  res.status(200).json({
    success: true,
    data: {
      stats: {
        revenue: totalRevenue,
        orders: orders.length,
        users: usersCount,
        products: productsCount
      },
      recentOrders
    }
  });
});
