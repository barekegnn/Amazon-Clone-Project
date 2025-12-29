import React from 'react';
import { Product } from '../../types/product';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import BuyBox from './BuyBox'; // Import the new BuyBox component

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-10 xl:grid-cols-12 gap-8">
        
        {/* Left column - Product Gallery */}
        <div className="lg:col-span-4 xl:col-span-5">
          <ProductGallery product={product} />
        </div>
        
        {/* Middle column - Product Info */}
        <div className="lg:col-span-6 xl:col-span-4">
          <ProductInfo product={product} />
        </div>

        {/* Right column - Buy Box */}
        <div className="lg:col-span-10 lg:col-start-5 xl:col-span-3 xl:col-start-auto">
          <BuyBox product={product} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
