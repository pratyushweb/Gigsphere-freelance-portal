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

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const isUrlDefined = !!process.env.DATABASE_URL;
    const urlSnip = isUrlDefined ? process.env.DATABASE_URL.substring(0, 15) : 'MISSING';
    const sslConfig = (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost')) ? 'enabled' : 'disabled';
    
    const { query } = await import('./config/db.js');
    const result = await query('SELECT NOW()');
    res.json({ success: true, timestamp: result.rows[0], env: process.env.NODE_ENV, url: urlSnip, ssl: sslConfig });
  } catch (err) {
    const isUrlDefined = !!process.env.DATABASE_URL;
    const urlSnip = isUrlDefined ? process.env.DATABASE_URL.substring(0, 15) : 'MISSING';
    res.status(500).json({ success: false, error: err.message, stack: err.stack, url: urlSnip });
  }
});

// Base route
app.get('/api', (req, res) => {
  res.json({ message: 'GigSphere API is running' });
});

// 404 and Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
