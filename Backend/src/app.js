import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { decodeAuthToken } from './middlewares/auth.middleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Global middlewares
app.use(helmet());
// CORS configuration - allow both local development and production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://barekegn-amazon-frontend.netlify.app',
  process.env.CLIENT_ORIGIN
].filter(Boolean);

app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Stripe webhook needs raw body for signature verification
// Use JSON parser for all routes EXCEPT webhook
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payment/webhook') {
    next();
  } else {
    express.json({ limit: '10mb' })(req, res, next);
  }
});

// Use raw body buffer for webhook
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
// Custom middleware to save rawBody for webhook verification
app.use('/api/payment/webhook', (req, res, next) => {
  req.rawBody = req.body;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Decode Firebase ID tokens when provided
app.use(decodeAuthToken);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
