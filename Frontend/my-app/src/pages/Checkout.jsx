import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getCartTotal } from '../context/cartReducer';
import RecommendedProducts from '../components/RecommendedProducts/RecommendedProducts';
// import ProductCard from '../components/ProductCard/ProductCard'; // ProductCard is not used here

const Checkout = () => {
  const { state, dispatch } = useCart();
  const { basket, savedForLater, promoCode, discount } = state;
  const [promoCodeInput, setPromoCodeInput] = useState("");

  const handleApplyPromoCode = () => {
    dispatch({
      type: "APPLY_PROMO_CODE",
      promoCode: promoCodeInput,
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch({
      type: "ADJUST_QUANTITY",
      id: id,
      quantity: quantity,
    });
  };

  const saveForLater = (id) => {
    dispatch({
      type: "SAVE_FOR_LATER",
      id: id,
    });
  };

  const moveToBasket = (id) => {
    dispatch({
      type: "MOVE_TO_BASKET",
      id: id,
    });
  };

  const handleToggleGift = (id) => {
    dispatch({
      type: "TOGGLE_GIFT",
      id: id,
    });
  };

  return (
    <div className="cart-page bg-gray-100 min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {basket?.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800">Your Amazon Cart is empty.</h2>
            <p className="text-gray-600 mt-2">Check your Saved for later items below or <a href="/" className="text-blue-600 hover:underline">continue shopping</a>.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Items in your cart</h2>
                {basket.map((item) => (
                  <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">Price: ${item.price?.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id={`gift-${item.id}`}
                          checked={item.gift}
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
                          onClick={() => saveForLater(item.id)}
                          className="text-blue-600 text-sm ml-4 hover:underline focus:outline-none"
                        >
                          Save for Later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mb-2 mt-4">
                  <span className="text-gray-700">Subtotal ({basket.length} items):</span>
                  <span className="font-semibold">${getCartTotal(basket).toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Discount:</span>
                    <span className="font-semibold">-${(getCartTotal(basket) * discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>${(getCartTotal(basket) * (1 - discount)).toFixed(2)}</span>
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
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {state.savedForLater?.length > 0 && (
          <div className="mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Saved for Later</h2>
              {state.savedForLater.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-contain mr-4" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">Price: ${item.price?.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => moveToBasket(item.id)}
                        className="text-blue-600 text-sm hover:underline focus:outline-none"
                      >
                        Move to Basket
                      </button>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_FROM_SAVED', id: item.id })}
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
  );
};

export default Checkout;