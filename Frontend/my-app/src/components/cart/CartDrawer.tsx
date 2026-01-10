import React, { useEffect, useRef } from 'react';
import { useCart } from '../../contexts/CartContext';
import { X, ShoppingCart, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, totalPrice, totalItems, updateQuantity, removeFromCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeCart();
      }
    }
    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scrolling when drawer is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn" />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col transform transition-transform duration-300 animate-slideInRight"
      >
        {/* Header */}
        <div className="p-4 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-lg">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({totalItems})</span>
            </div>
            <button 
                onClick={closeCart}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close cart"
            >
                <X className="w-6 h-6 text-gray-600" />
            </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                    <ShoppingCart className="w-16 h-16 opacity-20" />
                    <p>Your cart is empty</p>
                    <button 
                        onClick={closeCart}
                        className="text-amazonclone-blue hover:underline"
                    >
                        Start shopping
                    </button>
                </div>
            ) : (
                items.map(item => (
                    <div key={item.id} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
                        <div className="w-20 h-20 shrink-0 bg-gray-50 flex items-center justify-center rounded-md overflow-hidden p-1">
                            <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <Link 
                                to={`/product/${item.id}`} 
                                className="text-sm font-medium line-clamp-2 hover:text-amazonclone-orange leading-tight"
                                onClick={closeCart}
                            >
                                {item.title}
                            </Link>
                            <div className="flex justify-between items-end mt-2">
                                <div className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</div>
                                <div className="flex items-center gap-2">
                                    <select 
                                        className="text-xs bg-gray-100 border border-gray-300 rounded px-1 py-1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                    >
                                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>Qty: {n}</option>)}
                                    </select>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-xs text-red-600 hover:text-red-800 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
            <div className="bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-xl font-bold text-red-700">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                    onClick={() => {
                        closeCart();
                        navigate('/checkout');
                    }}
                    className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-3 rounded-full shadow-sm mb-2 transition-colors flex items-center justify-center gap-2"
                >
                    Proceed to Checkout ({totalItems} items)
                </button>
                <button
                    onClick={() => {
                        closeCart();
                        navigate('/checkout');
                    }}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-black py-2 rounded-full shadow-sm transition-colors text-sm"
                >
                    View Cart
                </button>
                <div className="flex justify-center items-center gap-2 mt-3 text-xs text-gray-500">
                    <Lock className="w-3 h-3" />
                    <span>Secure transaction</span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
