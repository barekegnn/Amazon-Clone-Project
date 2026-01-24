import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContextAPI'; // Using Backend API
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  const signIn = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    const result = await login(email, password);
    
    if (result.success) {
      // Redirect to the page user was trying to access, or home
      navigate(from, { replace: true });
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

      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border-2 border-red-200">
        <div className="bg-red-100 border-2 border-red-400 text-red-800 px-4 py-3 rounded mb-4 text-center">
          <p className="font-bold text-lg">⚠️ DEMO LOGIN ⚠️</p>
          <p className="text-sm mt-1">Use any email/password to continue</p>
          <p className="text-xs mt-2">This is NOT a real login system</p>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Sign-In</h1>

        <ErrorMessage 
          message={displayError} 
          onClose={() => {
            setLocalError('');
            clearError();
          }} 
        />

        <form onSubmit={signIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email or mobile phone number
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amazonclone-orange focus:border-amazonclone-orange"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amazonclone-orange focus:border-amazonclone-orange"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Sign-In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          By signing-in you agree to Zon-Clone's demo Conditions of Use & Sale. This is a portfolio project - no real transactions are processed.
        </p>

        <div className="mt-4 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">New to Zon-Clone?</p>
          <Link 
            to="/register" 
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-md transition-colors duration-200"
          >
            Create your Zon-Clone account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
