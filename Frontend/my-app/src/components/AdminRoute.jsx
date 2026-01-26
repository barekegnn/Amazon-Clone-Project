import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContextAPI';
import LoadingSpinner from './common/LoadingSpinner';

/**
 * AdminRoute Component
 * Wraps routes that require admin privileges
 * Redirects to home if user is not an admin
 * 
 * Usage:
 * <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
 * 
 * Note: Requires user object to have a 'role' field set to 'admin'
 * This should be set in Firebase custom claims or user document
 */
const AdminRoute = ({ children }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has admin role using the centralized isAdmin function
  if (!isAdmin()) {
    return (
      <Navigate 
        to="/" 
        state={{ 
          error: 'You do not have permission to access this page.',
          from: location 
        }} 
        replace 
      />
    );
  }

  // User is admin, render the protected component
  return children;
};

export default AdminRoute;
