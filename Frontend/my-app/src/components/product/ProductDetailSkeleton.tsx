import React from 'react';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="bg-gray-200 h-[400px] rounded-lg"></div>
        
        {/* Info skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
