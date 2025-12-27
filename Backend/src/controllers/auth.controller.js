import authService from '../services/auth.service.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const mapFirebaseAuthError = (code, fallbackMessage) => {
  const normalizedCode = typeof code === 'string' ? code.toLowerCase() : '';

  switch (normalizedCode) {
    case 'auth/email-already-in-use':
      return { status: 409, message: 'Email is already registered.' };
    case 'auth/invalid-email':
      return { status: 400, message: 'Invalid email address.' };
    case 'auth/weak-password':
      return { status: 400, message: 'Password does not meet strength requirements.' };
    case 'auth/user-not-found':
      return { status: 404, message: 'User not found.' };
    case 'auth/wrong-password':
      return { status: 401, message: 'Incorrect password.' };
    case 'auth/too-many-requests':
      return { status: 429, message: 'Too many attempts. Please try again later.' };
    default:
      return { status: 400, message: fallbackMessage ?? 'Authentication error.' };
  }
};

export const register = asyncHandler(async (req, res) => {
  const { email, password, displayName } = req.validatedBody ?? req.body;

  const result = await authService.registerUser(email, password, displayName);

  if (!result.success) {
    const { status, message } = mapFirebaseAuthError(result.code, result.error);
    throw new ApiError(status, message, {
      errors: { email: [message] }
    });
  }

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: result.user,
      token: result.token
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedBody ?? req.body;

  const result = await authService.loginUser(email, password);

  if (!result.success) {
    const { status, message } = mapFirebaseAuthError(result.code, result.error);
    throw new ApiError(status, message, {
      errors: { email: [message] }
    });
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: result.user,
      token: result.token
    }
  });
});

export const logout = asyncHandler(async (req, res) => {
  const result = await authService.logoutUser();

  if (!result.success) {
    throw new ApiError(500, result.error ?? 'Failed to sign out.');
  }

  res.status(200).json({
    success: true,
    message: result.message
  });
});

export const sendPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.validatedBody ?? req.body;

  const result = await authService.resetPassword(email);

  if (!result.success) {
    const { status, message } = mapFirebaseAuthError(result.code, result.error);
    throw new ApiError(status, message, {
      errors: { email: [message] }
    });
  }

  res.status(200).json({
    success: true,
    message: result.message
  });
});

/**
 * Verify the current auth token and return user info
 * This endpoint is protected by the decodeAuthToken middleware
 */
export const verify = asyncHandler(async (req, res) => {
  // req.user is set by decodeAuthToken middleware
  if (!req.user) {
    throw new ApiError(401, 'Invalid or missing authentication token');
  }

  res.status(200).json({
    success: true,
    message: 'Token is valid',
    data: {
      user: {
        uid: req.user.uid,
        email: req.user.email,
        displayName: req.user.displayName || null,
      }
    }
  });
});
