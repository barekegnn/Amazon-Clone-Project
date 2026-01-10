import orderService from "../services/order.service.js";
import userService from "../services/user.service.js";
import productService from "../services/product.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Get Admin Dashboard Stats
 * GET /api/admin/stats
 */
export const getAdminStats = asyncHandler(async (req, res) => {
  // Get counts and totals
  const ordersResult = await orderService.getAllOrders(1000); // Get more for accuracy
  const usersResult = await userService.getAllUsers(1000);
  const productsResult = await productService.getAllProducts({ limit: 1000 });

  const orders = ordersResult.orders || [];
  console.log("Admin Stats - Orders fetched:", orders.length);
  if (orders.length > 0) {
    console.log("Sample Order Status:", orders[0].status);
    console.log("Sample Payment Status:", orders[0].paymentStatus);
    console.log("Sample Order Total:", orders[0].total);
  }

  const usersCount = usersResult.users?.length || 0;
  const productsCount = productsResult.products?.length || 0;

  // Calculate revenue from paid orders
  const paidOrders = orders.filter(
    (order) => order.paymentStatus?.toLowerCase() === "paid"
  );
  const totalRevenue = paidOrders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );

  // Calculate Average Order Value (AOV)
  const averageOrderValue =
    paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  // Calculate Order Status Counts
  const pendingOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "pending"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status?.toLowerCase() === "cancelled"
  ).length;

  // Get recent orders (top 5)
  const recentOrders = orders.slice(0, 5).map((order) => ({
    id: order.id,
    userEmail: order.userEmail,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt,
  }));

  res.status(200).json({
    success: true,
    data: {
      stats: {
        revenue: totalRevenue,
        orders: orders.length,
        users: usersCount,
        products: productsCount,
        averageOrderValue,
        pendingOrders,
        deliveredOrders,
        cancelledOrders,
      },
      recentOrders,
    },
  });
});
