import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContextAPI';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [localError, setLocalError] = useState('');
  
  const { resetPassword, loading, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');
    clearError();

    if (!email) {
      setLocalError('Please enter your email address');
      return;
    }

    const result = await resetPassword(email);
    
    if (result.success) {
      setSuccessMessage('Password reset email sent! Check your inbox.');
      setEmail('');
    } else {
      setLocalError(result.error || 'Failed to send reset email');
    }
  };

  const displayError = error || localError;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <Link to="/" className="mb-6">
        <img
          className="h-8 object-contain"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMwIiB2aWV3Qm94PSIwIDAgMTAwIDMwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8dGV4dCB4PSI1IiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI0ZGRjkwMCI+Wm9uLUNsb25lPC90ZXh0Pgo8L3N2Zz4K"
          alt="Zon-Clone Logo"
        />
      </Link>

      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h1 className="text-2xl font-semibold mb-2">Password assistance</h1>
        <p className="text-sm text-gray-600 mb-4">
          Enter the email address associated with your Zon-Clone account.
        </p>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="text-sm">{successMessage}</p>
          </div>
        )}

        <ErrorMessage 
          message={displayError} 
          onClose={() => {
            setLocalError('');
            clearError();
          }} 
        />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amazonclone-orange focus:border-amazonclone-orange"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Continue'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Has your email address changed?</p>
          <p className="text-xs text-gray-500 mb-4">
            If you no longer use the email address associated with your Zon-Clone account, you may contact Customer Service for help restoring access to your account.
          </p>
          
          <Link 
            to="/login" 
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Sign-In
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-blue-600">
          <Link to="/customer-service" className="hover:underline">Conditions of Use</Link>
          <span className="text-gray-400">|</span>
          <Link to="/customer-service" className="hover:underline">Privacy Notice</Link>
          <span className="text-gray-400">|</span>
          <Link to="/customer-service" className="hover:underline">Help</Link>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          © 2024 Zon-Clone - Portfolio Project
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
