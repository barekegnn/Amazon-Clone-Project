import { ZodError, z } from 'zod';

import { ApiError } from '../utils/apiError.js';

const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long');

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: passwordSchema,
  displayName: z
    .string()
    .trim()
    .min(2, 'Display name must be at least 2 characters long')
    .max(50, 'Display name must be at most 50 characters long')
    .optional()
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: passwordSchema
});

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
});

export const validate = (schema) => (req, res, next) => {
  try {
    req.validatedBody = schema.parse(req.body);
    next();
  } catch (error) {
    let errors = error;
    if (error instanceof ZodError) {
      const { fieldErrors } = error.flatten();
      errors = fieldErrors;
    }
    next(new ApiError(400, 'Validation failed', { errors }));
  }
};
