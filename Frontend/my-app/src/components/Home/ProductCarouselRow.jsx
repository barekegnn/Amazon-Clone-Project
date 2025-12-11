import React from 'react';

const ProductCarouselRow = ({ title, products }) => {
    return (
        <div className="bg-white p-4 drop-shadow-lg z-30">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-6 p-2">
                {products.map((product, index) => (
                    <div key={index} className="flex-none cursor-pointer">
                        <img 
                            src={product.image} 
                            alt={product.title || `Product ${index}`} 
                            className="h-48 w-auto object-contain hover:scale-105 transition-transform duration-200"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarouselRow;
