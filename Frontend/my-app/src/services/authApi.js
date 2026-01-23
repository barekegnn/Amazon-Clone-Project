/**
 * Authentication API Service
 * Handles all authentication-related API calls to the backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://amazon-clone-project-kv7m.onrender.com';

/**
 * Helper function to handle API responses
 */
async function handleResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    // Extract error message from response
    const error = data.message || data.error || 'An error occurred';
    throw new Error(error);
  }
  
  return data;
}

/**
 * Register a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} displayName - User's display name
 * @returns {Promise<Object>} Response with user data and token
 */
export async function registerUser(email, password, displayName) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        displayName,
      }),
    });

    const data = await handleResponse(response);
    
    // Store the token in localStorage
    if (data.data?.token) {
      localStorage.setItem('authToken', data.data.token);
    }
    
    return {
      success: true,
      user: data.data?.user,
      token: data.data?.token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Login an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} Response with user data and token
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await handleResponse(response);
    
    // Store the token in localStorage
    if (data.data?.token) {
      localStorage.setItem('authToken', data.data.token);
    }
    
    return {
      success: true,
      user: data.data?.user,
      token: data.data?.token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Logout the current user
 * @returns {Promise<Object>} Response indicating success
 */
export async function logoutUser() {
  const token = localStorage.getItem('authToken');
  localStorage.removeItem('authToken');

  if (!token) {
    return { success: true };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.warn('Server logout failed, but local token cleared');
    }
  } catch (error) {
    console.warn('Error during server logout:', error);
  }

  return { success: true };
}

/**
 * Send password reset email
 * @param {string} email - User's email
 * @returns {Promise<Object>} Response indicating success
 */
export async function resetPassword(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    await handleResponse(response);
    
    return {
      success: true,
      message: 'Password reset email sent',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Verify the current auth token
 * @returns {Promise<Object>} Response with user data if token is valid
 */
export async function verifyToken() {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await handleResponse(response);
    
    return {
      success: true,
      user: data.data?.user,
    };
  } catch (error) {
    // Invalid token, clear it
    localStorage.removeItem('authToken');
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get the current auth token from localStorage
 * @returns {string|null} The auth token or null
 */
export function getAuthToken() {
  return localStorage.getItem('authToken');
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a token
 */
export function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}
