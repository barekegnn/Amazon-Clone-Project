import { getItem, setItem } from './storage';
import { PRODUCT_CONFIG } from './constants';

export interface RecentlyViewedProduct {
  id: number | string;
  title: string;
  price: number;
  image: string;
  category: string;
  viewedAt: number;
}

/**
 * Add a product to recently viewed list
 * @param product - Product to add
 */
export const addToRecentlyViewed = (product: Omit<RecentlyViewedProduct, 'viewedAt'>): void => {
  const recentlyViewed = getItem<RecentlyViewedProduct[]>(PRODUCT_CONFIG.recentlyViewedKey) || [];
  
  // Remove if already exists
  const filtered = recentlyViewed.filter(p => p.id !== product.id);
  
  // Add to beginning with timestamp
  const updated = [
    { ...product, viewedAt: Date.now() },
    ...filtered
  ].slice(0, PRODUCT_CONFIG.recentlyViewedLimit);
  
  setItem(PRODUCT_CONFIG.recentlyViewedKey, updated);
};

/**
 * Get recently viewed products
 * @returns Array of recently viewed products
 */
export const getRecentlyViewed = (): RecentlyViewedProduct[] => {
  return getItem<RecentlyViewedProduct[]>(PRODUCT_CONFIG.recentlyViewedKey) || [];
};

/**
 * Clear recently viewed products
 */
export const clearRecentlyViewed = (): void => {
  setItem(PRODUCT_CONFIG.recentlyViewedKey, []);
};

/**
 * Add product to wishlist
 * @param product - Product to add
 */
export const addToWishlist = (product: Omit<RecentlyViewedProduct, 'viewedAt'>): void => {
  const wishlist = getItem<RecentlyViewedProduct[]>(PRODUCT_CONFIG.wishlistKey) || [];
  
  // Check if already in wishlist
  if (wishlist.some(p => p.id === product.id)) {
    return;
  }
  
  const updated = [{ ...product, viewedAt: Date.now() }, ...wishlist];
  setItem(PRODUCT_CONFIG.wishlistKey, updated);
};

/**
 * Remove product from wishlist
 * @param productId - Product ID to remove
 */
export const removeFromWishlist = (productId: number | string): void => {
  const wishlist = getItem<RecentlyViewedProduct[]>(PRODUCT_CONFIG.wishlistKey) || [];
  const updated = wishlist.filter(p => p.id !== productId);
  setItem(PRODUCT_CONFIG.wishlistKey, updated);
};

/**
 * Get wishlist products
 * @returns Array of wishlist products
 */
export const getWishlist = (): RecentlyViewedProduct[] => {
  return getItem<RecentlyViewedProduct[]>(PRODUCT_CONFIG.wishlistKey) || [];
};

/**
 * Check if product is in wishlist
 * @param productId - Product ID to check
 * @returns true if in wishlist
 */
export const isInWishlist = (productId: number | string): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(p => p.id === productId);
};
