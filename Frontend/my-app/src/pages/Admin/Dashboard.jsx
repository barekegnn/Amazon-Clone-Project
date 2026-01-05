import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StatCard = ({ title, value, icon, color, trend }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
          <span className="text-gray-500 ml-2">from last month</span>
        </div>
      )}
    </div>
  )
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    growth: 0
  });

  useEffect(() => {
    // Mock data fetching - In real app, create a stats endpoint
    setTimeout(() => {
      setStats({
        revenue: 12450.00,
        orders: 156,
        users: 890,
        growth: 12.5
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="flex justify-center p-12"><LoadingSpinner /></div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-green-500" 
          trend={12.5}
        />
        <StatCard 
          title="Total Orders" 
          value={stats.orders} 
          icon={ShoppingBag} 
          color="bg-blue-500" 
          trend={8.2}
        />
        <StatCard 
          title="Active Users" 
          value={stats.users} 
          icon={Users} 
          color="bg-purple-500" 
          trend={5.3}
        />
        <StatCard 
          title="Growth" 
          value={`${stats.growth}%`} 
          icon={TrendingUp} 
          color="bg-orange-500" 
          trend={2.1}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">#ORD-{1000 + i}</td>
                    <td className="px-4 py-3">Customer {i}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="px-4 py-3">$120.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Popular Products</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Product Name {i}</h4>
                  <p className="text-sm text-gray-500">Category</p>
                </div>
                <div className="font-bold text-gray-900">$99.99</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
