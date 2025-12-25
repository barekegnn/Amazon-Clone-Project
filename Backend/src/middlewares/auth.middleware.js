import { adminAuth } from '../config/firebaseAdmin.config.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const extractBearerToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && typeof authHeader === 'string') {
    const [scheme, value] = authHeader.split(' ');
    if (scheme?.toLowerCase() === 'bearer' && value) {
      return value.trim();
    }
  }
  return null;
};

export const decodeAuthToken = asyncHandler(async (req, res, next) => {
  const token = extractBearerToken(req);

  if (!token) {
    return next();
  }

  try {
    const decodedToken = await adminAuth().verifyIdToken(token, true);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email ?? null,
      role: decodedToken.role ?? decodedToken.customClaims?.role ?? 'user',
      claims: decodedToken
    };

    return next();
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired authentication token.');
  }
});

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Authentication required to access this resource.');
  }
  next();
};

export const requireRole = (requiredRole) => (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Authentication required to access this resource.');
  }

  const { role } = req.user;
  if (!role || (Array.isArray(requiredRole)
    ? !requiredRole.includes(role)
    : role !== requiredRole)) {
    throw new ApiError(403, 'You do not have permission to perform this action.');
  }

  next();
};
