import express from 'express';
import { getProfile, updateProfile, getUserById } from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.get('/:id', getUserById);

export default router;
