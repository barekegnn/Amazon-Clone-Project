import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import { decodeAuthToken } from './middlewares/auth.middleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Global middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Decode Firebase ID tokens when provided
app.use(decodeAuthToken);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
