import { Router } from 'express';

import { login, logout, register, sendPasswordReset } from '../controllers/auth.controller.js';
import { validate, registerSchema, loginSchema, resetPasswordSchema } from '../validators/auth.validators.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.post('/forgot-password', validate(resetPasswordSchema), sendPasswordReset);

export default router;
