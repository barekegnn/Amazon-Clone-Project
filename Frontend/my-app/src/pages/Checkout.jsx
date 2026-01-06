import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import RecommendedProducts from '../components/RecommendedProducts/RecommendedProducts';
import { EmptyState } from '../components/common/EmptyState';
import { CheckoutProgress } from '../components/checkout/CheckoutProgress';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/Payment/PaymentForm';

// Initialize Stripe outside value to avoid recreating object on renders
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { 
    items = [], 
    savedForLater = [], 
    totalItems = 0, 
    totalPrice = 0, 
    removeFromCart, 
    updateQuantity, 
    saveForLater: saveForLaterAction, 
    moveToBasket: moveToBasketAction,
    toggleGift: toggleGiftAction,
    removeFromSaved
  } = useCart();

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [step, setStep] = useState('cart'); // 'cart' or 'payment'

  const handleApplyPromoCode = () => {
    // Basic promo code logic (client-side for demo)
    if (promoCodeInput.toLowerCase() === 'save10') {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };
  
  const handleToggleGift = (id) => {
     toggleGiftAction(id);
  };

  const calculateTotal = () => {
      return (totalPrice || 0) * (1 - discount);
  };
  
  const calculateDiscountAmount = () => {
      return (totalPrice || 0) * discount;
  };

  if (step === 'payment') {
    return (
      <>
        <CheckoutProgress currentStep={3} />
        <div className="bg-gray-100 min-h-screen py-6">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
                
                <button
                  onClick={() => setStep('cart')}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  ← Back to Cart
                </button>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Items ({totalItems || 0}):</span>
                      <span>${(totalPrice || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping & handling:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total before tax:</span>
                      <span>${(totalPrice || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated tax to be collected:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t pt-2 mt-2 font-bold text-lg text-[#B12704] flex justify-between">
                      <span>Order Total:</span>
                      <span>${(totalPrice || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CheckoutProgress currentStep={1} />
      <div className="cart-page bg-gray-100 min-h-screen py-6">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

          {items.length === 0 ? (
            <EmptyState type="cart" />
          ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Items in your cart</h2>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">Price: ${item.price?.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id={`gift-${item.id}`}
                          checked={item.gift || false}
                          onChange={() => handleToggleGift(item.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`gift-${item.id}`} className="text-sm text-gray-600">This is a gift</label>
                      </div>
                      <div className="flex items-center mt-2">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity || 1}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-amazonclone-orange"
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              Qty: {x + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 text-sm ml-4 hover:underline focus:outline-none"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => saveForLaterAction(item.id)}
                          className="text-blue-600 text-sm ml-4 hover:underline focus:outline-none"
                        >
                          Save for Later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mb-2 mt-4">
                  <span className="text-gray-700">Subtotal ({totalItems || 0} items):</span>
                  <span className="font-semibold">${(totalPrice || 0).toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Discount:</span>
                    <span className="font-semibold">-${calculateDiscountAmount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="border border-gray-300 rounded-md py-1 px-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-amazonclone-orange"
                  />
                  <button
                    onClick={handleApplyPromoCode}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-md ml-2"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="contains-gift" className="mr-2" />
                  <label htmlFor="contains-gift" className="text-sm text-gray-600">This order contains a gift</label>
                </div>
                <button 
                  onClick={() => setStep('payment')}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {savedForLater?.length > 0 && (
          <div className="mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved for Later</h2>
              {savedForLater.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">Price: ${item.price?.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => moveToBasketAction(item.id)}
                        className="text-blue-600 text-sm hover:underline focus:outline-none"
                      >
                        Move to Basket
                      </button>
                      <button
                        onClick={() => removeFromSaved(item.id)}
                        className="text-red-600 text-sm ml-4 hover:underline focus:outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <RecommendedProducts />
      </div>
    </div>
    </>
  );
};

export default Checkout;