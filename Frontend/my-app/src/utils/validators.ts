/**
 * Form validation utility functions
 */

/**
 * Validate email address format
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (US format)
 * @param phone - Phone number to validate
 * @returns true if valid, false otherwise
 */
export const validatePhone = (phone: string): boolean => {
  // Accepts formats: (123) 456-7890, 123-456-7890, 1234567890
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate US zip code
 * @param zip - Zip code to validate
 * @returns true if valid, false otherwise
 */
export const validateZipCode = (zip: string): boolean => {
  // Accepts 5-digit or 5+4 format
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
};

/**
 * Validate credit card number using Luhn algorithm
 * @param cardNumber - Credit card number to validate
 * @returns true if valid, false otherwise
 */
export const validateCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(cleaned)) return false;
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate CVV code
 * @param cvv - CVV code to validate
 * @returns true if valid, false otherwise
 */
export const validateCVV = (cvv: string): boolean => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

/**
 * Validate required field (not empty)
 * @param value - Value to validate
 * @returns true if not empty, false otherwise
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate minimum length
 * @param value - Value to validate
 * @param minLength - Minimum required length
 * @returns true if meets minimum, false otherwise
 */
export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Validate maximum length
 * @param value - Value to validate
 * @param maxLength - Maximum allowed length
 * @returns true if within maximum, false otherwise
 */
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with validation results
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns true if valid, false otherwise
 */
export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
