/**
 * Utility functions for localStorage and sessionStorage operations
 * with error handling and type safety
 */

/**
 * Get an item from localStorage with type safety
 * @param key - Storage key
 * @returns Parsed value or null if not found or error
 */
export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return null;
  }
};

/**
 * Set an item in localStorage with error handling
 * @param key - Storage key
 * @param value - Value to store
 */
export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
};

/**
 * Remove an item from localStorage
 * @param key - Storage key
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
};

/**
 * Clear all items from localStorage
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get an item from sessionStorage with type safety
 * @param key - Storage key
 * @returns Parsed value or null if not found or error
 */
export const getSessionItem = <T>(key: string): T | null => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from sessionStorage key "${key}":`, error);
    return null;
  }
};

/**
 * Set an item in sessionStorage with error handling
 * @param key - Storage key
 * @param value - Value to store
 */
export const setSessionItem = <T>(key: string, value: T): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to sessionStorage key "${key}":`, error);
  }
};

/**
 * Remove an item from sessionStorage
 * @param key - Storage key
 */
export const removeSessionItem = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from sessionStorage key "${key}":`, error);
  }
};
