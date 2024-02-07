import { body, validationResult } from 'express-validator';
import User from '../model/user.mode.js';

export const validateUserCreation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Valid email is required')
    .custom(async (value, { req }) => {
      // Check if email already exists
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      return true;
    }),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Valid gender is required if provided'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
