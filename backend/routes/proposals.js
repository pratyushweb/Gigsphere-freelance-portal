import express from 'express';
import { submitProposal, getGigProposals, getMyProposals } from '../controllers/proposal.controller.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';
import { proposalValidator } from '../middleware/validators.js';

const router = express.Router();

router.use(authenticate);

// Freelancer
router.post('/', authorizeRoles('freelancer'), proposalValidator, submitProposal);
router.get('/my', authorizeRoles('freelancer'), getMyProposals);

// Client
router.get('/:gigId', authorizeRoles('client'), getGigProposals);

export default router;
