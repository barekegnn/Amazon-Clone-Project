import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContextAPI';

const AdminLayout = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/users', label: 'Users', icon: Users },
  ];

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'A';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">Admin<span className="text-yellow-500">Panel</span></span>
          </Link>
          <p className="text-xs text-gray-500 mt-1">Management Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path) && (item.path !== '/admin' || location.pathname === '/admin');
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          {/* Back to Store Link */}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 w-full rounded-lg transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-medium">Back to Store</span>
          </Link>
          
          {/* Sign Out Button */}
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {location.pathname === '/admin' 
                  ? 'Welcome to your admin dashboard' 
                  : `Manage your ${(navItems.find(item => item.path === location.pathname)?.label || '').toLowerCase()}`
                }
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.displayName || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || ''}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {getUserInitials()}
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-6">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
