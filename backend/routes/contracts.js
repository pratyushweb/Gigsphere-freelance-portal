import express from 'express';
import { hireFreelancer, updateContractStatus } from '../controllers/contract.controller.js';
import { authenticate, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles('client')); // Usually clients manage the contract logic

router.post('/hire', hireFreelancer);
router.patch('/:id/status', updateContractStatus);

export default router;
