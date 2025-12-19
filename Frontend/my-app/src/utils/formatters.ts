/**
 * Utility functions for formatting data for display
 */

/**
 * Format a number as currency
 * @param price - The price to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale for formatting (default: en-US)
 */
export const formatPrice = (
  price: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Format a date for display
 * @param date - Date to format
 * @param format - Format type: 'short', 'medium', 'long', or custom format string
 */
export const formatDate = (
  date: Date | string | number,
  format: 'short' | 'medium' | 'long' | string = 'medium'
): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });
  } else if (format === 'medium') {
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } else if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }
  
  return dateObj.toLocaleDateString('en-US');
};

/**
 * Truncate text to a maximum length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Format a number with thousand separators
 * @param num - Number to format
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Calculate estimated delivery date
 * @param daysToAdd - Number of days to add to current date (default: 2-5 days)
 */
export const getEstimatedDeliveryDate = (daysToAdd: number = 3): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date;
};

/**
 * Format delivery date range
 * @param startDays - Minimum days for delivery
 * @param endDays - Maximum days for delivery
 */
export const formatDeliveryDateRange = (startDays: number = 2, endDays: number = 5): string => {
  const startDate = getEstimatedDeliveryDate(startDays);
  const endDate = getEstimatedDeliveryDate(endDays);
  
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  
  return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
};

/**
 * Convert string to URL-friendly slug
 * @param text - Text to convert
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 */
export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};
