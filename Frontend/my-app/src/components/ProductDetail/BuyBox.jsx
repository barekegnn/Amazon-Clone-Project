import React from 'react';
import { useCart } from '../../context/CartContext';

const BuyBox = ({ product }) => {
    const { dispatch } = useCart();
    
    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                rating: product.rating,
            },
        });
    };

    return (
        <div className="border border-gray-300 rounded-lg p-5 bg-white sticky top-24 h-fit max-w-[300px] w-full ml-auto">
            <div className="mb-2">
                 <sup className="text-sm">$</sup>
                 <span className="text-3xl font-medium">{Math.floor(product.price)}</span>
                 <sup className="text-sm">{String(product.price).split('.')[1] || '00'}</sup>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
                FREE Returns
            </div>
            
             <div className="text-sm text-gray-600 mb-2">
                FREE delivery <span className="font-bold text-black">Monday, Dec 15</span>
             </div>
             
             <div className="text-lg text-[#007600] font-medium mb-4">
                In Stock.
             </div>

             <div className="mb-4">
                 <label className="text-xs font-bold block mb-1">Qty:</label>
                 <select className="bg-gray-100 border border-gray-300 rounded-md p-1 shadow-sm focus:ring-amazonclone-orange">
                     {[1,2,3,4,5,6,7,8,9,10].map(num => (
                         <option key={num} value={num}>{num}</option>
                     ))}
                 </select>
             </div>

            <button 
                onClick={addToCart}
                className="w-full bg-[#f7ca00] hover:bg-[#f0c14b] border border-[#fcd200] rounded-full py-1.5 text-sm shadow-sm cursor-pointer mb-2"
            >
                Add to Cart
            </button>
            <button className="w-full bg-[#fa8900] hover:bg-[#e37b00] border border-[#e37b00] rounded-full py-1.5 text-sm shadow-sm cursor-pointer">
                Buy Now
            </button>

            <div className="mt-4 text-xs text-gray-500">
                <div className="grid grid-cols-2 gap-x-2">
                    <span>Ships from</span> <span>Amazon</span>
                    <span>Sold by</span> <span>Amazon</span>
                </div>
            </div>
        </div>
    );
};

export default BuyBox;
