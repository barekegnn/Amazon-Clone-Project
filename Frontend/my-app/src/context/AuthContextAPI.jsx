import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as authApi from '../services/authApi';

// Initial state
const initialState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

// Action types
const AUTH_ACTIONS = {
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGOUT: 'LOGOUT',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: !!action.payload,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
};

// Create context
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = authApi.getAuthToken();
      
      if (!token) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return;
      }

      // Verify token with backend
      const result = await authApi.verifyToken();
      
      if (result.success && result.user) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: result.user,
        });
      } else {
        // Invalid token, clear it
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    };

    initializeAuth();
  }, []);

  // Register new user
  const register = async (email, password, displayName) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const result = await authApi.registerUser(email, password, displayName);
      
      if (result.success) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: result.user,
        });
        return { success: true };
      } else {
        const errorMessage = result.error || 'Registration failed';
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during registration';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const result = await authApi.loginUser(email, password);
      
      if (result.success) {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: result.user,
        });
        return { success: true };
      } else {
        const errorMessage = result.error || 'Login failed';
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred during login';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = async () => {
    await authApi.logoutUser();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    return { success: true };
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const result = await authApi.resetPassword(email);
      
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        const errorMessage = result.error || 'Failed to send reset email';
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.message || 'An error occurred';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    register,
    login,
    logout,
    resetPassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
