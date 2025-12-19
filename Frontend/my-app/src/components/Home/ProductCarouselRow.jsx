import React from 'react';
import { Link } from 'react-router-dom';

import { useProductCache } from '../../contexts/ProductCacheContext';

const ProductCarouselRow = ({ title, products }) => {
    const { preloadProduct } = useProductCache();

    const handlePreload = (item) => {
        preloadProduct({
            id: item.id,
            title: item.title || `Product ${item.id}`,
            image: item.image,
            price: 0,
            rating: { rate: 0, count: 0 },
            category: 'General',
            description: '',
        });
    };

    return (
        <div className="bg-white p-4 drop-shadow-lg z-30">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-6 p-2">
                {products.map((product, index) => (
                    // Logic to prioritize product.id if available, but fallback to index/mock ID for now if needed.
                    // The data in Home.jsx uses string IDs like 'h-1'.
                    <Link 
                        to={`/product/${product.id}`} 
                        state={{ product: {
                            id: product.id,
                            title: product.title || `Product ${product.id}`,
                            image: product.image,
                            price: 0,
                            rating: { rate: 0, count: 0 },
                            category: 'General',
                            description: '',
                        }}}
                        key={product.id || index} 
                        className="flex-none cursor-pointer"
                        onClick={() => handlePreload(product)}
                    >
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
