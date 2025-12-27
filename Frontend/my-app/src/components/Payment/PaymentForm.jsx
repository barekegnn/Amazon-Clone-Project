import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../context/AuthContextAPI';
import { createPaymentIntent, confirmPayment } from '../../services/paymentApi';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Currency } from 'lucide-react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  
  // Create PaymentIntent as soon as the page loads
  useEffect(() => {
    if (cart.length > 0 && total > 0) {
      const initializePayment = async () => {
        try {
          const data = await createPaymentIntent({
            amount: Math.round(total * 100), // Convert to cents
            items: cart.map(item => ({
              id: item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            })),
            shippingAddress: {
              line1: '123 Test St', // Placeholder - should come from form
              city: 'Test City',
              state: 'TS',
              postal_code: '12345',
              country: 'US',
            }
          });
          
          setClientSecret(data.clientSecret);
          setOrderId(data.orderId);
        } catch (err) {
          setError('Failed to initialize payment. Please try again.');
          console.error(err);
        }
      };
      
      initializePayment();
    }
  }, [cart, total]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName || 'Amazon Customer',
          email: user?.email,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      
      // Confirm with backend
      try {
        await confirmPayment(payload.paymentIntent.id, orderId);
        
        // Clear cart and redirect
        clearCart();
        setProcessing(false);
        navigate('/orders', { state: { newOrder: true } });
      } catch (err) {
        console.error('Error confirming payment with backend:', err);
        // Even if backend update fails, payment succeeded
        setProcessing(false);
        navigate('/orders');
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-bold mb-4 border-b pb-2">Payment Method</h3>
      
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Credit or Debit Card
          </label>
          <div className="p-3 border border-gray-300 rounded-md shadow-sm">
            <CardElement id="card-element" options={cardStyle} />
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <input
            id="billing-same"
            type="checkbox"
            checked={billingSameAsShipping}
            onChange={(e) => setBillingSameAsShipping(e.target.checked)}
            className="h-4 w-4 text-amazonclone-orange focus:ring-amazonclone-orange border-gray-300 rounded"
          />
          <label htmlFor="billing-same" className="ml-2 block text-sm text-gray-900">
            Billing address same as shipping
          </label>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-red-700">Order Total:</span>
            <span className="text-xl font-bold text-red-700">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          disabled={processing || succeeded || !clientSecret || !stripe}
          id="submit"
          className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {processing ? (
            <LoadingSpinner size="sm" />
          ) : (
            "Place your order"
          )}
        </button>
        
        <p className="mt-4 text-xs text-center text-gray-500">
          By placing your order, you agree to Amazon's privacy notice and conditions of use.
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;
