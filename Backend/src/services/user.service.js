import { adminAuth } from '../config/firebaseAdmin.config.js';

/**
 * User Service (Admin)
 */
const userService = {
  /**
   * Get all users
   * @param {number} limit - Max number of users
   * @param {string} nextPageToken - Token for next page
   * @returns {Promise<object>} List of users
   */
  async getAllUsers(limit = 100, nextPageToken) {
    try {
      const listUsersResult = await adminAuth().listUsers(limit, nextPageToken);
      
      const users = listUsersResult.users.map(userRecord => ({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        role: userRecord.customClaims?.role || 'user',
        disabled: userRecord.disabled,
        metadata: userRecord.metadata,
      }));

      return {
        success: true,
        users,
        pageToken: listUsersResult.pageToken
      };
    } catch (error) {
      console.error('Error listing users:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Update user role
   * @param {string} uid - User ID
   * @param {string} role - New role (e.g. 'admin', 'user')
   * @returns {Promise<object>} Result
   */
  async updateUserRole(uid, role) {
    try {
      await adminAuth().setCustomUserClaims(uid, { role });
      return {
        success: true,
        message: `User role updated to ${role}`
      };
    } catch (error) {
      console.error('Error updating user role:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Get user by ID
   * @param {string} uid 
   */
  async getUserById(uid) {
    try {
      const userRecord = await adminAuth().getUser(uid);
      return {
        success: true,
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          role: userRecord.customClaims?.role || 'user',
          metadata: userRecord.metadata,
        }
      };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
  }
};

export default userService;
