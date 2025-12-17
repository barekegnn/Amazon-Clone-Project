import React from 'react';
import { Link } from 'react-router-dom';

const ProductCarouselRow = ({ title, products }) => {
    return (
        <div className="bg-white p-4 drop-shadow-lg z-30">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-6 p-2">
                {products.map((product, index) => (
                    // Logic to prioritize product.id if available, but fallback to index/mock ID for now if needed.
                    // The data in Home.jsx uses string IDs like 'h-1'.
                    <Link to={`/product/${product.id}`} key={product.id || index} className="flex-none cursor-pointer">
                        <img 
                            src={product.image} 
                            alt={product.title || `Product ${index}`} 
                            className="h-48 w-auto object-contain hover:scale-105 transition-transform duration-200"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductCarouselRow;
