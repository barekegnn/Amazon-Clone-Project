import React from 'react';
import { Link } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';
import { Product } from '../../services/fakeStoreAPI';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="bg-white min-h-screen font-amazonember">
        {/* Breadcrumb */}
        <div className="bg-[#f0f2f2] px-4 py-2 text-xs text-[#565959] mb-4">
            <div className="max-w-7xl mx-auto flex items-center gap-1">
                <Link to="/" className="hover:underline hover:text-[#C7511F]">Home</Link>
                <span>›</span>
                <Link to={`/category/${product.category}`} className="hover:underline hover:text-[#C7511F] capitalize">
                    {product.category}
                </Link>
                <span>›</span>
                <span className="text-[#C7511F] font-bold line-clamp-1 max-w-[200px]">{product.title}</span>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column - Product images */}
                <ProductGallery product={product} />
                
                {/* Right column - Product info */}
                <ProductInfo product={product} />
            </div>
            
            {/* Product tabs */}
            <ProductTabs product={product} />
            
            {/* Related products */}
            <RelatedProducts category={product.category} currentProductId={product.id} />
        </div>
    </div>
  );
};

export default ProductDetail;
