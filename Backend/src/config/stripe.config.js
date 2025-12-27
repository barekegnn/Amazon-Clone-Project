import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY is missing in .env file! Payment features will not work.');
}

// Initialize Stripe
const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-12-18.acacia',
});

export default stripe;
