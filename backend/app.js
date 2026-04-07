import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import gigRoutes from './routes/gigs.js';
import proposalRoutes from './routes/proposals.js';
import contractRoutes from './routes/contracts.js';
import reviewRoutes from './routes/reviews.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(morgan('dev'));

// Webhook route needs raw body parser (defined inside the payment routes before express.json is applied globally)
app.use('/api/payments', paymentRoutes);

// Global body parser
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/reviews', reviewRoutes);

// Base route
app.get('/api', (req, res) => {
  res.json({ message: 'GigSphere API is running' });
});

// 404 and Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
