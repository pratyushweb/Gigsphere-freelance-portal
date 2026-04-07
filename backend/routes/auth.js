import express from 'express';
import { register, login, refresh } from '../controllers/auth.controller.js';
import { registerValidator, loginValidator } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/refresh', refresh);

export default router;
