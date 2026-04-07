import { validationResult, body } from 'express-validator';

export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const registerValidator = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['client', 'freelancer']).withMessage('Role must be either client or freelancer'),
  body('full_name').notEmpty().withMessage('Full name is required'),
  validateResult
];

export const loginValidator = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validateResult
];

export const gigValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('budget').isNumeric().withMessage('Budget must be a number'),
  body('deadline').isDate().withMessage('Provide a valid deadline date (YYYY-MM-DD)'),
  body('skills_required').isArray().withMessage('Skills required must be an array of strings'),
  validateResult
];

export const proposalValidator = [
  body('cover_letter').isLength({ min: 20 }).withMessage('Cover letter must be at least 20 characters'),
  body('bid_amount').isNumeric().withMessage('Bid amount must be a number'),
  body('delivery_days').isInt({ min: 1 }).withMessage('Delivery days must be at least 1'),
  validateResult
];
