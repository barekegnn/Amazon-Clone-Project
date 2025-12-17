import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({ title, linkText, variant, data }) => {
    return (
        <div className="bg-white z-30 p-4 drop-shadow-lg flex flex-col h-[420px]">
            <h2 className="text-xl font-bold mb-3">{title}</h2>
            
            <div className="flex-grow">
                {variant === 'single' ? (
                    <Link to={data.id ? `/product/${data.id}` : '#'} className="w-full h-full relative cursor-pointer block">
                         <img 
                            src={data.image} 
                            alt={data.alt || title} 
                            className="w-full h-full object-cover"
                         />
                    </Link>
                ) : (
                    <div className="grid grid-cols-2 gap-3 h-full">
                        {data.map((item, index) => (
                            <Link to={item.id ? `/product/${item.id}` : '#'} key={index} className="flex flex-col cursor-pointer">
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
