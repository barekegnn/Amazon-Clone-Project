import React from 'react';
import { Link } from 'react-router-dom';

const CategoryNotFound = () => {
  return (
    <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Category Not Found</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        We're sorry, but the category you are looking for doesn't exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link 
          to="/" 
          className="px-6 py-2 bg-amazonclone-yellow text-amazonclone-background font-semibold rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors"
        >
          Return to Home
        </Link>
        <Link 
          to="/category" 
          className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 transition-colors"
        >
          Browse All Categories
        </Link>
      </div>
    </div>
  );
};

export default CategoryNotFound;
