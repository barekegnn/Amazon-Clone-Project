import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';

interface Product {
  id: number | string;
  title: string;
  price: number;
  image: string;
  category?: string;
}

interface ProductRecommendationsProps {
  currentProduct?: Product;
  category?: string;
  title?: string;
}

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProduct,
  category,
  title = 'Customers who viewed this item also viewed'
}) => {
  // Mock recommendations - in a real app, this would come from an API
  const mockRecommendations: Product[] = [
    {
      id: 1,
      title: 'Wireless Bluetooth Headphones',
      price: 49.99,
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      category: 'electronics'
    },
    {
      id: 2,
      title: 'Smart Watch Fitness Tracker',
      price: 79.99,
      image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      category: 'electronics'
    },
    {
      id: 3,
      title: 'Portable Charger Power Bank',
      price: 29.99,
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      category: 'electronics'
    },
    {
      id: 4,
      title: 'USB-C Cable 6ft',
      price: 12.99,
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      category: 'electronics'
    }
  ];

  // Filter out current product if provided
  const recommendations = currentProduct
    ? mockRecommendations.filter(p => p.id !== currentProduct.id)
    : mockRecommendations;

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 my-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.slice(0, 4).map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="aspect-square mb-3 flex items-center justify-center bg-gray-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-sm font-medium line-clamp-2 mb-2 group-hover:text-[#C7511F]">
                {product.title}
              </h3>
              <p className="text-lg font-bold text-[#B12704]">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
