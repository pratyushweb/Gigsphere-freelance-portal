import express from 'express';
import { handleStripeWebhook } from '../controllers/payment.controller.js';

const router = express.Router();

// Stripe requires the raw body to construct the event mathematically
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
