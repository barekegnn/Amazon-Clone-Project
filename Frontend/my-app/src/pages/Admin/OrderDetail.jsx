import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { getOrderById, updateOrderStatus } from '../../services/adminOrderApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
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

  const handleStatusChange = async (newStatus) => {
    if (!window.confirm(`Are you sure you want to change status to "${newStatus}"?`)) return;
    
    try {
      setUpdating(true);
      await updateOrderStatus(id, newStatus);
      setOrder(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><LoadingSpinner /></div>;
  if (!order) return <ErrorMessage message="Order not found" />;

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/orders" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-2xl font-bold flex-1">Order #{id}</h2>
        <div className="flex items-center gap-2">
           <span className="text-sm font-medium text-gray-700">Status:</span>
           <select 
             value={order.status} 
             onChange={(e) => handleStatusChange(e.target.value)}
             disabled={updating}
             className="border rounded-md px-3 py-1 bg-white focus:ring-2 focus:ring-blue-500 capitalize"
           >
             {statusOptions.map(status => (
               <option key={status} value={status}>{status}</option>
             ))}
           </select>
           {updating && <LoadingSpinner size="sm" />}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex gap-4 border-b last:border-0 pb-4 last:pb-0">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                     <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 line-clamp-2">{item.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <div className="font-medium">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>${order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Customer</h3>
             <p className="font-medium text-gray-900">{order.userEmail}</p>
             <p className="text-xs text-gray-400 mt-1">ID: {order.userId}</p>
           </div>

           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Shipping Address</h3>
             {order.shippingAddress ? (
               <div className="text-sm text-gray-700">
                 <p>{order.shippingAddress.line1}</p>
                 {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                 <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postal_code}</p>
                 <p>{order.shippingAddress.country}</p>
               </div>
             ) : (
               <p className="text-sm text-gray-400 italic">No shipping address provided</p>
             )}
           </div>
           
           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Payment Info</h3>
             <div className="flex justify-between text-sm mb-2">
               <span>Status:</span>
               <span className={`font-semibold capitalize ${
                 order.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'
               }`}>
                 {order.paymentStatus}
               </span>
             </div>
             <p className="text-xs text-gray-400 break-all">ID: {order.paymentIntentId}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
