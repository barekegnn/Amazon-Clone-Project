import React, { useState } from 'react';
import { Product } from '../../types/product';
import { AddToCartButton } from '../common/AddToCartButton';
import { Lock } from 'lucide-react';

interface BuyBoxProps {
  product: Product;
}

const BuyBox: React.FC<BuyBoxProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // Estimated delivery date (e.g., 2 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };

  return (
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-4 h-fit sticky top-28">
      {/* Price */}
      <div>
        <span className="text-2xl font-bold text-red-700">
          ${(product.price || 0).toFixed(2)}
        </span>
      </div>

      {/* Delivery Info */}
      <div className="text-sm">
        <p>
          Delivery <span className="font-bold">{deliveryDate.toLocaleDateString('en-US', dateOptions)}</span>
        </p>
        <p className="text-gray-500">
          Ships from <span className="text-gray-700">Amazon.com</span>
        </p>
      </div>
      
      {/* Stock Status */}
      <div className="text-lg text-green-700 font-semibold">
        In Stock
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="font-medium">Quantity:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="p-1 border border-gray-400 rounded-md bg-gray-100 shadow-sm focus:ring-2 focus:ring-amazonclone-yellow focus:border-amazonclone-orange"
        >
          {[...Array(10).keys()].map(n => (
            <option key={n + 1} value={n + 1}>{n + 1}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <AddToCartButton 
          product={product} 
          quantity={quantity}
          className="w-full py-2.5 rounded-full bg-[#FFD814] hover:bg-yellow-400 border border-yellow-500 text-sm text-black shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazonclone-yellow"
        />
        <button className="w-full py-2.5 rounded-full bg-[#FFA41C] hover:bg-orange-400 border border-orange-500 text-sm text-black shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazonclone-orange">
          Buy Now
        </button>
      </div>

      {/* Secure Transaction */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Lock size={16} />
        <span>Secure transaction</span>
      </div>

      <div className="border-t border-gray-200 pt-3 text-sm">
        <div className="flex justify-between">
            <span className="text-gray-500">Sold by</span>
            <span>Amazon.com</span>
        </div>
      </div>
      
      <button className="w-full text-sm text-center border border-gray-300 rounded-lg py-1 mt-2 hover:bg-gray-100">
        Add to list
      </button>
    </div>
  );
};

export default BuyBox;
