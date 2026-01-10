import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrderById } from '../services/paymentApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError('Failed to load order details');
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

  if (error || !order) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <ErrorMessage message={error || 'Order not found'} />
        <Link to="/orders" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link to="/orders" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to orders
        </Link>

        {/* Order Header */}
        <div className="border rounded-md mb-6">
          <div className="bg-gray-100 p-4 border-b">
            <h1 className="text-2xl font-normal mb-2">Order Details</h1>
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div>
                <span className="block text-xs uppercase">Order Number</span>
                <span className="text-gray-900 font-medium">{order.id}</span>
              </div>
              <div>
                <span className="block text-xs uppercase">Order Placed</span>
                <span className="text-gray-900">
                  {new Date(order.createdAt?.seconds * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase">Total</span>
                <span className="text-gray-900 font-medium">${order.total?.toFixed(2)}</span>
              </div>
              <div>
                <span className="block text-xs uppercase">Status</span>
                <span className={`font-medium ${
                  order.status === 'processing' ? 'text-blue-600' :
                  order.status === 'shipped' ? 'text-green-600' :
                  order.status === 'delivered' ? 'text-green-700' :
                  order.status === 'cancelled' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {order.status === 'processing' ? 'Preparing for Shipment' : 
                   order.status === 'pending' ? 'Pending Payment' : 
                   order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg mb-2">Shipping Address</h2>
            <div className="text-sm text-gray-700">
              <p>{order.userEmail}</p>
              {order.shippingAddress && (
                <>
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  <p>{order.shippingAddress.country}</p>
                </>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">Payment Method</h2>
            <div className="text-sm text-gray-700">
              <p>{order.paymentMethod || 'Card'}</p>
              {order.paymentDetails && (
                <p className="text-gray-500">****{order.paymentDetails.last4 || '****'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="border rounded-md">
          <div className="bg-gray-100 p-4 border-b">
            <h2 className="font-bold text-lg">Order Items</h2>
          </div>
          <div className="p-4">
            {order.items?.map((item, index) => (
              <div key={index} className="flex py-4 border-b last:border-b-0">
                <div className="w-32 h-32 flex-shrink-0 mr-6">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <Link 
                    to={`/product/${item.id}`} 
                    className="text-blue-600 font-medium hover:underline text-lg line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-2">
                    Price: <span className="font-medium">${item.price?.toFixed(2)}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Subtotal: <span className="font-medium">${(item.price * item.quantity)?.toFixed(2)}</span>
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="bg-[#FFD814] hover:bg-[#F7CA00] text-black text-sm py-2 px-4 rounded-md border border-yellow-500 shadow-sm"
                    >
                      Buy it again
                    </button>
                    <button 
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="bg-white hover:bg-gray-50 text-black text-sm py-2 px-4 rounded-md border border-gray-300 shadow-sm"
                    >
                      View your item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-md mt-6 p-4">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items ({order.items?.length}):</span>
              <span>${order.subtotal?.toFixed(2) || order.total?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & handling:</span>
              <span>${order.shipping?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${order.tax?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Order Total:</span>
              <span className="text-amazonclone-orange">${order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => window.print()}
            className="bg-white hover:bg-gray-50 text-black py-2 px-6 rounded-md border border-gray-300 shadow-sm"
          >
            Print order details
          </button>
          <Link 
            to="/customer-service"
            className="bg-white hover:bg-gray-50 text-black py-2 px-6 rounded-md border border-gray-300 shadow-sm inline-block"
          >
            Get help with order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
