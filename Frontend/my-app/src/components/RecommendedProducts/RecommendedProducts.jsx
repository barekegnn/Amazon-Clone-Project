import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const recommendedProducts = [
  {
    id: "rec-1",
    title: "The Four Agreements: A Practical Guide to Personal Freedom (A Toltec Wisdom Book)",
    price: 7.67,
    image: "https://images-na.ssl-images-amazon.com/images/I/51j12+uMgtL._SX329_BO1,204,203,200_.jpg",
  },
  {
    id: "rec-2",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    price: 13.79,
    image: "https://images-na.ssl-images-amazon.com/images/I/51-nXsSR0mL._SX329_BO1,204,203,200_.jpg",
  },
  {
    id: "rec-3",
    title: "Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
    price: 9.99,
    image: "https://images-na.ssl-images-amazon.com/images/I/51wOOMQ+F3L._SX329_BO1,204,203,200_.jpg",
  },
];

const RecommendedProducts = () => {
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
