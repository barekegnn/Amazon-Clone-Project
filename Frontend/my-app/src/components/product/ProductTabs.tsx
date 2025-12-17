import React, { useState } from 'react';
import { Product } from '../../types/product';
import { Star } from 'lucide-react';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('description')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${
            activeTab === 'description' 
              ? 'border-amazonclone-orange text-amazonclone-orange' 
              : 'border-transparent text-gray-600 hover:text-amazonclone-orange hover:border-gray-300'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${
            activeTab === 'specs' 
              ? 'border-amazonclone-orange text-amazonclone-orange' 
              : 'border-transparent text-gray-600 hover:text-amazonclone-orange hover:border-gray-300'
          }`}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${
            activeTab === 'reviews' 
              ? 'border-amazonclone-orange text-amazonclone-orange' 
              : 'border-transparent text-gray-600 hover:text-amazonclone-orange hover:border-gray-300'
          }`}
        >
          Reviews ({product.rating?.count || 0})
        </button>
      </div>

      <div className="prose max-w-none text-gray-800">
        {activeTab === 'description' && (
          <div>
            <h3 className="text-lg font-bold mb-4">Product Description</h3>
            <p className="leading-relaxed">{product.description}</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div>
            <h3 className="text-lg font-bold mb-4">Technical Specifications</h3>
            <div className="border border-gray-200 rounded-md overflow-hidden max-w-2xl">
              <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
                <div className="p-3 font-medium text-gray-600">Category</div>
                <div className="p-3 bg-white">{product.category}</div>
              </div>
              <div className="grid grid-cols-2 border-b border-gray-200">
                <div className="p-3 font-medium text-gray-600">Manufacturer</div>
                <div className="p-3 bg-white">Generic Brand</div>
              </div>
              <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
                <div className="p-3 font-medium text-gray-600">Model Number</div>
                <div className="p-3 bg-white">GEN-{product.id}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="p-3 font-medium text-gray-600">Warranty</div>
                <div className="p-3 bg-white">1 Year Limited</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
             <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
             <div className="flex items-center gap-4 mb-8">
                 <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                     <span className="text-4xl font-bold text-gray-900">{product.rating?.rate}</span>
                     <div className="flex my-2">
                         {[...Array(5)].map((_, i) => (
                             <Star 
                                 key={i} 
                                 size={20} 
                                 className={`${i < Math.round(product.rating?.rate || 0) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`} 
                             />
                         ))}
                     </div>
                     <span className="text-sm text-gray-500">Based on {product.rating?.count} reviews</span>
                 </div>
                 
                 <div className="flex-1 max-w-xs">
                     {[5,4,3,2,1].map((star) => (
                         <div key={star} className="flex items-center gap-3 text-sm mb-1">
                             <span className="w-8 text-right underline text-blue-600">{star} star</span>
                             <div className="flex-1 h-5 bg-gray-200 rounded-sm overflow-hidden">
                                 <div 
                                    className="h-full bg-[#FFA41C]" 
                                    style={{ width: star === 5 ? '60%' : star === 4 ? '20%' : '5%' }} 
                                 />
                             </div>
                             <span className="w-8 text-gray-500">
                                 {star === 5 ? '60%' : star === 4 ? '20%' : '5%'}
                             </span>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Mock Reviews */}
             <div className="space-y-6">
                 {[1, 2, 3].map((r) => (
                     <div key={r} className="pb-4 border-b border-gray-100">
                         <div className="flex items-center gap-2 mb-1">
                             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                 <span className="text-xs font-bold text-gray-500">U{r}</span>
                             </div>
                             <span className="font-medium text-sm">Amazon Customer</span>
                         </div>
                         <div className="flex items-center gap-2 mb-2">
                             <div className="flex">
                                 {[...Array(5)].map((_, i) => (
                                     <Star key={i} size={14} className="fill-[#FFA41C] text-[#FFA41C]" />
                                 ))}
                             </div>
                             <span className="text-sm font-bold">Great product!</span>
                         </div>
                         <div className="text-xs text-gray-500 mb-2">Reviewed on {new Date().toLocaleDateString()}</div>
                         <p className="text-sm text-gray-700">
                             Exactly what I was looking for. The description is accurate and fast shipping.
                         </p>
                     </div>
                 ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
