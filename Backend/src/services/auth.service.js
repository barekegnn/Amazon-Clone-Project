// Firebase Authentication Service
// Handles user authentication operations

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase.config.js';

const authService = {
  /**
   * Register a new user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} displayName - User's display name (optional)
   * @returns {Promise<Object>} User credentials
   */
  async registerUser(email, password, displayName = null) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName
        }
      };
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  /**
   * Sign in an existing user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} User credentials
   */
  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      return {
        success: true,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName
        }
      };
    } catch (error) {
      console.error('Error logging in:', error);
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  /**
   * Sign out the current user
   * @returns {Promise<Object>} Success status
   */
  async logoutUser() {
    try {
      await signOut(auth);
      return {
        success: true,
        message: 'User signed out successfully'
      };
    } catch (error) {
      console.error('Error signing out:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Send password reset email
   * @param {string} email - User's email
   * @returns {Promise<Object>} Success status
   */
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Password reset email sent'
      };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  /**
   * Get the current authenticated user
   * @returns {Object|null} Current user or null
   */
  getCurrentUser() {
    return auth.currentUser;
  },

  /**
   * Listen to authentication state changes
   * @param {Function} callback - Callback function to handle auth state changes
   * @returns {Function} Unsubscribe function
   */
  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Verify user token (for API authentication)
   * @returns {Promise<string|null>} ID token or null
   */
  async getAuthToken() {
    try {
      const user = auth.currentUser;
      if (user) {
        return await user.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }
};

export const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getCurrentUser,
  onAuthChange,
  getAuthToken
} = authService;

export default authService;
