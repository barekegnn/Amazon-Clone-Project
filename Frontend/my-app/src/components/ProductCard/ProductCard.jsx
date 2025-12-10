import React from 'react';
import { Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

function ProductCard({ id, title, image, price, rating }) {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className="relative flex flex-col m-2.5 p-5 bg-white z-30 max-h-[400px] min-w-[250px] flex-1">
      <div className="absolute top-2 right-2 text-gray-400 text-xs italic">
         {/* Optional category or badge */}
      </div>

      <Link to={`/product/${id}`} className="contents">
        <p className="font-bold text-sm lg:text-base line-clamp-2 min-h-[40px] mb-1 leading-snug hover:text-amazonclone-orange cursor-pointer">
          {title}
        </p>
      </Link>
      
      <div className="flex items-center mb-1">
        {Array(5)
          .fill()
          .map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${i < rating ? "fill-[#F5C518] text-[#F5C518]" : "text-gray-300"}`}
            />
          ))}
         <span className="text-xs text-blue-600 ml-1 hover:underline cursor-pointer">1,234</span>
      </div>

      <Link to={`/product/${id}`} className="contents">
        <img
          src={image}
          alt={title}
          className="max-h-[200px] w-full object-contain mb-3 cursor-pointer"
        />
      </Link>

      <div className="mt-auto">
         <div className="flex items-start items-baseline mb-2">
            <span className="text-xs align-top relative top-0.5">$</span>
            <span className="text-2xl font-semibold">{Math.floor(price)}</span>
            <span className="text-xs align-top relative top-0.5">{String(price).split('.')[1] || '00'}</span>
         </div>

        <button 
            onClick={addToCart}
            className="w-full bg-amazonclone-yellow hover:bg-amazonclone-yellow-dark border border-yellow-500 rounded-md py-1 text-xs md:text-sm text-[#111] shadow-sm font-normal focus:outline-none focus:ring-2 focus:ring-yellow-400 active:from-yellow-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
