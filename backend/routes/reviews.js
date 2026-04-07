import express from 'express';
import { createReview, getUserReviews } from '../controllers/review.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', getUserReviews);

router.use(authenticate);
router.post('/', createReview);

export default router;
