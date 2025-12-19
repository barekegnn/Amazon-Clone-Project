import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="relative -mt-16">
            <img
              src="https://m.media-amazon.com/images/G/01/error/title._TTD_.png"
              alt="Dogs looking"
              className="mx-auto w-64 h-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Sorry, we couldn't find that page
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg font-medium transition-colors"
          >
            <Home size={20} />
            Go to Homepage
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium transition-colors"
          >
            <Search size={20} />
            Search Products
          </Link>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">You might also want to:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/deals" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Today's Deals
            </Link>
            <Link to="/orders" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Your Orders
            </Link>
            <Link to="/customer-service" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Customer Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
