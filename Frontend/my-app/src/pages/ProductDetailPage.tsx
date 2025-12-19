import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductData } from '../hooks/useProductData';
import ProductDetailSkeleton from '../components/product/ProductDetailSkeleton';
import ProductDetail from '../components/product/ProductDetail';
import { Breadcrumb, BreadcrumbItem } from '../components/common/Breadcrumb';
import { ProductRecommendations } from '../components/product/ProductRecommendations';
import { RecentlyViewed } from '../components/product/RecentlyViewed';
import { addToRecentlyViewed } from '../utils/productTracking';
import { capitalizeWords } from '../utils/formatters';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = !isNaN(Number(id)) ? Number(id) : (id || '');
  
  const { product, isLoading, error, source } = useProductData(productId);
  
  // Track product view
  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category || 'products'
      });
    }
  }, [product]);
  
  // Debug mode logs
  useEffect(() => {
    if (product && source === 'api') {
      console.warn('⚠️ Product detail fetched fresh from API - cache miss');
    } else if (product && source === 'route') {
      console.log('✅ Product detail from route state - instant load');
    }
    if (source) {
       console.log(`Product loaded from: ${source}`);
    }
  }, [product, source]);

  if (isLoading) return <ProductDetailSkeleton />;
  if (error) return <div className="container mx-auto px-4 py-8">Error loading product</div>;
  if (!product) return <div className="container mx-auto px-4 py-8">Product not found</div>;
  
  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: capitalizeWords(product.category || 'Products'), href: `/category/${product.category || 'all'}` },
    { label: product.title, href: `/product/${product.id}` }
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      <div className="container mx-auto px-4 pb-8">
        <ProductDetail product={product} />
      </div>

      <div className="container mx-auto px-4 pb-8">
        <ProductRecommendations 
          currentProduct={product}
          category={product.category}
        />
      </div>

      <div className="container mx-auto px-4 pb-8">
        <RecentlyViewed />
      </div>
    </div>
  );
};

export default ProductDetailPage;
