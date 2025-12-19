// Application-wide constants for consistent styling and configuration

export const COLORS = {
  // Amazon brand colors
  primary: '#FF9900',
  primaryHover: '#FA8900',
  primaryDark: '#E87B00',
  
  // Header colors
  headerDark: '#131921',
  headerLight: '#232F3E',
  
  // Accent colors
  orange: '#FF9900',
  orangeHover: '#F3A847',
  yellow: '#FFD814',
  yellowHover: '#F7CA00',
  
  // Text colors
  textPrimary: '#0F1111',
  textSecondary: '#565959',
  textLink: '#007185',
  textLinkHover: '#C7511F',
  
  // Status colors
  success: '#067D62',
  error: '#B12704',
  warning: '#F08804',
  info: '#007185',
  
  // Background colors
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F0F2F2',
  bgTertiary: '#EAEDED',
  
  // Border colors
  borderLight: '#D5D9D9',
  borderMedium: '#888C8C',
  borderDark: '#565959',
} as const;

export const BREAKPOINTS = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1280px',
  desktopXL: '1536px',
} as const;

export const SPACING = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
} as const;

export const FONT_SIZES = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
} as const;

export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

export const ANIMATION = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const API_CONFIG = {
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  retryAttempts: 3,
} as const;

export const CART_CONFIG = {
  maxQuantity: 10,
  storageKey: 'amazonCloneCartTS',
  savedForLaterKey: 'amazonCloneSavedForLater',
} as const;

export const PRODUCT_CONFIG = {
  recentlyViewedKey: 'amazonCloneRecentlyViewed',
  recentlyViewedLimit: 10,
  wishlistKey: 'amazonCloneWishlist',
} as const;

export const USER_PREFERENCES = {
  themeKey: 'amazonCloneTheme',
  languageKey: 'amazonCloneLanguage',
  currencyKey: 'amazonCloneCurrency',
} as const;

export const DEMO_MODE = {
  enabled: true,
  bannerDismissedKey: 'amazonCloneDemoBannerDismissed',
} as const;
