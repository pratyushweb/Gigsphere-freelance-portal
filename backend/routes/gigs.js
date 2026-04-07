import express from 'express';
import { createGig, getGigs, getGigById } from '../controllers/gig.controller.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import { gigValidator } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getGigs);
router.get('/:id', getGigById);

// Protected routes (Clients only)
router.use(authenticate);
router.post('/', authorizeRoles('client'), gigValidator, createGig);

export default router;
