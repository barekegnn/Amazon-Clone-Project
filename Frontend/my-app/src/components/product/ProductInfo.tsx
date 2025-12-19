
import React, { useState } from 'react';
import { Product } from '../../types/product';
import { Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { AddToCartButton } from "../common/AddToCartButton";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  
  // Fake delivery date
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };

  return (
    <div className="flex flex-col gap-4 text-gray-900">
      {/* Title & Rating */}
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">{product.title}</h1>
        <div className="flex items-center gap-2 mb-2">
           <div className="flex items-center">
             {[...Array(5)].map((_, i) => (
                <Star 
                    key={i} 
                    size={16} 
                    className={`${i < Math.round(product.rating?.rate || 0) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`} 
                />
             ))}
           </div>
           <span className="text-blue-600 text-sm hover:underline cursor-pointer">
               {product.rating?.count || 0} ratings
           </span>
        </div>
      </div>

      <div className="border-t border-gray-200 my-1"></div>

      {/* Price */}
      <div>
          <div className="text-sm text-gray-500">List Price: <span className="line-through">${((product.price || 0) * 1.2).toFixed(2)}</span></div>
          <div className="flex items-baseline gap-2">
             <span className="text-2xl font-medium text-gray-900">${(product.price || 0).toFixed(2)}</span>
             <span className="text-sm font-semibold text-red-700">-20%</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
             or low monthly payments with <span className="text-blue-600 hover:underline cursor-pointer">Amazon Visa</span>
          </div>
      </div>

      {/* Feature Icons */}
       <div className="grid grid-cols-3 gap-2 text-center text-xs text-amazonclone-lightblue my-2">
           <div className="flex flex-col items-center gap-1 group cursor-pointer hover:text-amazonclone-orange">
               <Truck size={24} className="text-gray-700" />
               <span>Fast Delivery</span>
           </div>
           <div className="flex flex-col items-center gap-1 group cursor-pointer hover:text-amazonclone-orange">
               <RefreshCw size={24} className="text-gray-700" />
               <span>Free Returns</span>
           </div>
           <div className="flex flex-col items-center gap-1 group cursor-pointer hover:text-amazonclone-orange">
               <ShieldCheck size={24} className="text-gray-700" />
               <span>Warranty</span>
           </div>
       </div>

      <div className="border-t border-gray-200 my-1"></div>

      {/* About this item (Description snippet) */}
      <div>
          <h3 className="font-bold mb-2">About this item</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
              <li>{product.description}</li>
              <li>High quality material and design.</li>
              <li>Official {product.category} merchandise.</li>
          </ul>
      </div>

      {/* Buying Controls (Right sidebar style usually, but inline here for simplicity as requested) */}
      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 max-w-sm">
          <div className="text-xl font-bold text-[#B12704] mb-2">${(product.price || 0).toFixed(2)}</div>
          <div className="text-sm text-gray-600 mb-2">
              <span className="text-[#007600] font-bold">In Stock</span>
          </div>
           <div className="text-sm mb-4">
              Delivery by <span className="font-bold">{deliveryDate.toLocaleDateString('en-US', dateOptions)}</span>
          </div>

          <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                  <label htmlFor="qty" className="text-sm">Qty:</label>
                  <select 
                    id="qty" 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="p-1 border border-gray-300 rounded bg-white shadow-sm focus:ring-amazonclone-orange"
                  >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                          <option key={n} value={n}>{n}</option>
                      ))}
                  </select>
              </div>

              <AddToCartButton 
                product={product} 
                quantity={quantity}
                className="w-full py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-sm text-black shadow-sm"
              />

              <button className="w-full py-2 rounded-full bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] text-sm text-black shadow-sm">
                  Buy Now
              </button>
          </div>
          
          <div className="text-xs text-gray-500 mt-4">
              <div className="flex justify-between">
                  <span>Ships from</span>
                  <span>Amazon.com</span>
              </div>
              <div className="flex justify-between">
                  <span>Sold by</span>
                  <span>Amazon.com</span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProductInfo;
