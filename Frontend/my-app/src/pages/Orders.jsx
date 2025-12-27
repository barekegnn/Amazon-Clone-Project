import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getUserOrders } from '../services/paymentApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const newOrder = location.state?.newOrder;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getUserOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {newOrder && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-bold">Order placed successfully!</p>
              <p className="text-sm">Thank you for shopping with us.</p>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-normal mb-6">Your Orders</h1>

        <div className="flex border-b mb-6 text-sm">
          <button className="py-2 px-4 border-b-2 border-amazonclone-orange font-bold text-black">
            Orders
          </button>
          <button className="py-2 px-4 text-gray-600 hover:text-amazonclone-orange">
            Buy Again
          </button>
          <button className="py-2 px-4 text-gray-600 hover:text-amazonclone-orange">
            Not Yet Shipped
          </button>
          <button className="py-2 px-4 text-gray-600 hover:text-amazonclone-orange">
            Cancelled
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        {orders.length === 0 ? (
          <div className="border rounded-md p-8 text-center">
            <p className="text-gray-600 mb-4">You have no orders yet.</p>
            <Link to="/" className="text-blue-600 hover:underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-md overflow-hidden">
                <div className="bg-gray-100 p-4 flex flex-col md:flex-row justify-between text-sm text-gray-600 border-b">
                  <div className="flex gap-8 mb-2 md:mb-0">
                    <div>
                      <span className="block text-xs uppercase">Order Placed</span>
                      <span className="text-gray-900">
                        {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase">Total</span>
                      <span className="text-gray-900">${order.total?.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase">Ship To</span>
                      <span className="text-blue-600 group relative cursor-pointer">
                        {order.userEmail}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs uppercase">Order # {order.id}</span>
                    <div className="flex gap-4 mt-1">
                      <Link to={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                        View order details
                      </Link>
                      <span className="text-gray-300">|</span>
                      <Link to="#" className="text-blue-600 hover:underline">
                        Invoice
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {order.status === 'processing' ? 'Preparing for Shipment' : 
                     order.status === 'pending' ? 'Pending Payment' : 
                     order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </h3>
                  
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex py-4 border-b last:border-b-0">
                      <div className="w-24 h-24 flex-shrink-0 mr-4">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} className="text-blue-600 font-medium hover:underline text-lg line-clamp-2">
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Return window closed on {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                        <div className="flex gap-3 mt-3">
                          <button className="bg-[#FFD814] hover:bg-[#F7CA00] text-black text-sm py-1 px-4 rounded-md border border-yellow-500 shadow-sm">
                            Buy it again
                          </button>
                          <button className="bg-white hover:bg-gray-50 text-black text-sm py-1 px-4 rounded-md border border-gray-300 shadow-sm">
                            View your item
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
