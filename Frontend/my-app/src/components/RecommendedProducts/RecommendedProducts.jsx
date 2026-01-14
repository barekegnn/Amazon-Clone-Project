import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../../services/productApi';
import ProductCard from '../product/ProductCard';
import { useCart } from '../../contexts/CartContext';

const RecommendedProducts = () => {
  const { items = [] } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products to get recommendations
    getProducts({ limit: 1000 })
      .then(data => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products for recommendations:", err);
        setLoading(false);
      });
  }, []);

  // Get recommended products based on cart items
  const recommendedProducts = useMemo(() => {
    if (!allProducts.length || !items.length) return [];

    // Get categories of items in cart
    const cartCategories = [...new Set(items.map(item => item.category).filter(Boolean))];
    
    // Get products that are similar to cart items but not already in cart
    const cartItemIds = new Set(items.map(item => item.id));
    
    let recommendations = [];
    
    // First, try to find products from same categories as cart items
    if (cartCategories.length > 0) {
      recommendations = allProducts.filter(product => 
        cartCategories.includes(product.category) && 
        !cartItemIds.has(product.id)
      );
    }
    
    // If not enough category matches, add popular/high-rated products
    if (recommendations.length < 3) {
      const popularProducts = allProducts
        .filter(product => !cartItemIds.has(product.id) && product.rating?.rate >= 4.0)
        .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      
      // Add unique popular products
      popularProducts.forEach(product => {
        if (!recommendations.find(rec => rec.id === product.id) && recommendations.length < 6) {
          recommendations.push(product);
        }
      });
    }
    
    // If still not enough, add any other products not in cart
    if (recommendations.length < 3) {
      allProducts.forEach(product => {
        if (!cartItemIds.has(product.id) && !recommendations.find(rec => rec.id === product.id) && recommendations.length < 6) {
          recommendations.push(product);
        }
      });
    }
    
    // Return only first 3 recommendations
    return recommendations.slice(0, 3);
  }, [allProducts, items]);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Customers who bought items in your cart also bought</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Don't show the section if no recommendations or cart is empty
  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customers who bought items in your cart also bought</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
