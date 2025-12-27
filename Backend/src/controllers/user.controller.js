import userService from '../services/user.service.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Get all users
 * GET /api/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const result = await userService.getAllUsers();

  if (!result.success) {
    throw new ApiError(500, result.error || 'Failed to retrieve users');
  }

  res.status(200).json({
    success: true,
    data: result.users,
    pageToken: result.pageToken
  });
});

/**
 * Update user role
 * PUT /api/users/:id/role
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) {
    throw new ApiError(400, 'Role is required');
  }

  if (!['user', 'admin'].includes(role)) {
    throw new ApiError(400, 'Invalid role');
  }

  const result = await userService.updateUserRole(id, role);

  if (!result.success) {
    throw new ApiError(500, result.error || 'Failed to update user role');
  }

  res.status(200).json({
    success: true,
    message: result.message
  });
});

/**
 * Get user by ID
 * GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await userService.getUserById(id);

    if (!result.success) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200).json({
        success: true,
        data: result.user
    });
});
