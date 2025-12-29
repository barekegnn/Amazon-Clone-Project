import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';
import { Product, fetchAllProducts } from '../../services/fakeStoreAPI';
import { Skeleton } from '../common/Skeleton';

interface ProductRecommendationsProps {
  currentProduct?: Product;
  category?: string;
  title?: string;
}

const RecommendationCard: React.FC<{ product: Product }> = ({ product }) => (
  <Link to={`/product/${product.id}`} className="group block">
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="aspect-square mb-4 flex items-center justify-center bg-white rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/400x400?text=Image+Error"; }}
        />
      </div>
      <div className="flex-grow flex flex-col">
        <h3 className="text-sm font-medium line-clamp-2 mb-2 group-hover:text-amazonclone-orange">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-red-700 mt-auto">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  </Link>
);

const RecommendationSkeleton: React.FC = () => (
    <div className="flex flex-col">
        <Skeleton variant="rectangular" height={180} className="mb-3" />
        <Skeleton variant="text" width="80%" height={20} className="mb-2" />
        <Skeleton variant="text" width="50%" height={24} />
    </div>
);


export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProduct,
  category,
  title = 'Customers who viewed this item also viewed'
}) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const allProducts = await fetchAllProducts();
        let categoryProducts = category 
            ? allProducts.filter(p => p.category === category)
            : allProducts;

        // Filter out the current product
        if (currentProduct) {
            categoryProducts = categoryProducts.filter(p => p.id !== currentProduct.id);
        }

        // Shuffle and take the first few
        setRecommendations(categoryProducts.sort(() => 0.5 - Math.random()).slice(0, 4));

      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [category, currentProduct]);

  if (loading) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 my-6">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => <RecommendationSkeleton key={i} />)}
            </div>
        </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show the section if there are no recommendations
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 my-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <RecommendationCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
