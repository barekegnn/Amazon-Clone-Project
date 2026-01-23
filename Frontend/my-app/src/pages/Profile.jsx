import React from 'react';
import { useAuth } from '../context/AuthContextAPI';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Calendar, LogOut, Settings, ChevronRight } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user.roles?.includes('admin');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{user.displayName || 'User'}</h2>
              <p className="text-gray-600">Member since {new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Account Created</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium text-gray-900">
                    {isAdmin ? 'Administrator' : 'Customer'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Access Card - Only for Admin Users */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Admin Dashboard</h3>
                </div>
                <p className="text-indigo-100">Manage products, orders, and users</p>
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors flex items-center space-x-2"
              >
                <span>Go to Admin</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-900">Account Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-3 text-left border border-red-200 rounded-md hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="font-medium text-red-600">Sign Out</span>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
