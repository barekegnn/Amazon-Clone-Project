import React from 'react';
import { Link } from 'react-router-dom';

import { useProductCache } from '../../contexts/ProductCacheContext';

const HomeCard = ({ title, linkText, variant, data }) => {
    const { preloadProduct } = useProductCache();

    const createSafeProduct = (item) => ({
        id: item.id || '0',
        title: item.label || item.title || title || 'Product',
        image: item.image,
        price: item.price || 0,
        rating: item.rating || { rate: 0, count: 0 },
        category: item.category || 'General',
        description: item.description || '',
    });

    return (
        <div className="bg-white z-30 p-4 drop-shadow-lg flex flex-col h-[420px]">
            <h2 className="text-xl font-bold mb-3">{title}</h2>
            
            <div className="flex-grow">
                {variant === 'single' ? (
                    <Link 
                        to={data.id ? `/product/${data.id}` : '#'} 
                        state={{ product: createSafeProduct(data) }}
                        className="w-full h-full relative cursor-pointer block"
                        onClick={() => data.id && preloadProduct(createSafeProduct(data))}
                    >
                         <img 
                            src={data.image} 
                            alt={data.alt || title} 
                            className="w-full h-full object-cover"
                         />
                    </Link>
                ) : (
                    <div className="grid grid-cols-2 gap-3 h-full">
                        {data.map((item, index) => (
                            <Link 
                                to={item.id ? `/product/${item.id}` : '#'} 
                                state={{ product: createSafeProduct(item) }}
                                key={index} 
                                className="flex flex-col cursor-pointer"
                                onClick={() => item.id && preloadProduct(createSafeProduct(item))}
                            >
                                <div className="flex-grow relative overflow-hidden h-[110px] mb-1">
                                    <img 
                                        src={item.image} 
                                        alt={item.label}
                                        className="w-full h-full object-cover"
                                     />
                                </div>
                                <span className="text-xs font-medium text-gray-800">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Link to="#" className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm font-medium mt-4 block">
                {linkText}
            </Link>
        </div>
    );
};

export default HomeCard;
