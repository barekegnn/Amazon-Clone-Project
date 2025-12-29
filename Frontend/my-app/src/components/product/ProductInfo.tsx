import React from 'react';
import { Product } from '../../types/product';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  product: Product;
}

// Function to create description points from a long string.
const formatDescription = (text: string): string[] => {
  // Split by sentences. A simple regex will do for this mock data.
  const sentences = text.split(/(?<=[.!?])\s+/);
  // Return the first few sentences as bullet points.
  return sentences.slice(0, 4);
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const descriptionPoints = formatDescription(product.description);

  return (
    <div className="font-amazonember">
      {/* Product Title */}
      <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
        {product.title}
      </h1>

      {/* Ratings */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-blue-600 text-sm hover:underline cursor-pointer">
          {product.rating?.count || 0} ratings
        </span>
        <span className="text-gray-300">|</span>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={`${i < Math.round(product.rating?.rate || 0) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="ml-2 text-sm text-gray-700">{product.rating?.rate.toFixed(1)} out of 5</span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Price Information */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-gray-600 text-sm">Price:</span>
        <span className="text-2xl font-bold text-red-700">
          ${(product.price || 0).toFixed(2)}
        </span>
        <span className="text-sm text-gray-500">
          List Price: <span className="line-through">${((product.price || 0) * 1.2).toFixed(2)}</span>
        </span>
      </div>

      {/* About this item */}
      <div>
        <h3 className="text-lg font-bold mb-2 text-gray-800">About this item</h3>
        <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
          {descriptionPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
