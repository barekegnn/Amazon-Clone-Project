import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import RelatedProducts from '../components/product/RelatedProducts';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // @ts-ignore
  const { product, loading, error } = useProduct(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazonclone-orange"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="mb-4">We couldn't find the product you're looking for.</p>
            <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
    );
  }

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

export default ProductDetailPage;
