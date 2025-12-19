# Amazon Clone - Professional E-Commerce Application

![Amazon Clone](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)

A professional, portfolio-ready Amazon clone built with modern web technologies. This project demonstrates advanced React patterns, performance optimization, and UX best practices for e-commerce applications.

## 🌟 Live Demo

**[View Live Demo](#)** | **[Features Showcase](/features)**

> **Note:** This is a portfolio demonstration project. All products, transactions, and user data are simulated. No real payment processing occurs.

## ✨ Key Features

### 🛒 Shopping Experience
- **Smart Shopping Cart** - Persistent cart with quantity management and save-for-later
- **Product Discovery** - Recently viewed products and intelligent recommendations
- **Advanced Search** - Real-time search with suggestions and category filtering
- **Wishlist** - Save favorite products with localStorage persistence

### 🎨 User Interface
- **Responsive Design** - Optimized for mobile, tablet, and desktop (320px - 1920px+)
- **Dark Mode** - Full light/dark theme support with system preference detection
- **Smooth Animations** - Micro-interactions and page transitions
- **Loading States** - Skeleton loaders and progressive loading

### 🚀 Performance
- **Code Splitting** - Route-based lazy loading for optimal bundle size
- **Image Optimization** - Lazy loading with blur-up placeholders
- **Caching Strategy** - TanStack Query for efficient data fetching
- **Memoization** - React.memo and useMemo for expensive components

### ♿ Accessibility
- **WCAG AA Compliant** - 4.5:1 color contrast ratio
- **Keyboard Navigation** - Full keyboard support (Tab, Enter, Escape)
- **ARIA Labels** - Proper semantic HTML and screen reader support
- **Focus Management** - Visible focus indicators and focus trapping in modals

### 🛡️ Error Handling
- **Error Boundaries** - Graceful error recovery with fallback UI
- **404 Page** - Professional not-found page with helpful navigation
- **Empty States** - Contextual empty states for cart, wishlist, and search
- **Toast Notifications** - User feedback for actions (add to cart, errors, etc.)

## 🛠️ Tech Stack

### Core
- **React 18.3** - Modern UI library with hooks and concurrent features
- **TypeScript 5.5** - Type-safe code for better maintainability
- **Vite 5.4** - Lightning-fast build tool and dev server

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom Animations** - Smooth transitions and micro-interactions
- **Dark Mode** - Class-based dark mode strategy

### State Management
- **Context API** - Global state for cart, theme, and toast notifications
- **TanStack Query** - Server state management and caching
- **localStorage** - Persistent storage for cart and preferences

### Routing
- **React Router 6** - Client-side routing with code splitting
- **Lazy Loading** - Route-based code splitting for performance

### Development
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm 9+
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone/Frontend/my-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── cart/              # Cart-related components
│   ├── checkout/          # Checkout flow components
│   ├── common/            # Reusable UI components
│   ├── debug/             # Development/demo components
│   ├── error/             # Error handling components
│   ├── Header/            # Header and navigation
│   ├── Home/              # Home page components
│   └── product/           # Product-related components
├── contexts/              # React Context providers
│   ├── CartContext.tsx    # Shopping cart state
│   ├── ThemeContext.tsx   # Theme (light/dark) state
│   └── ProductCacheContext.tsx
├── hooks/                 # Custom React hooks
├── pages/                 # Route pages
├── services/              # API services
├── utils/                 # Utility functions
│   ├── constants.ts       # App-wide constants
│   ├── formatters.ts      # Data formatting
│   ├── storage.ts         # localStorage helpers
│   ├── validators.ts      # Form validation
│   └── productTracking.ts # Product tracking
└── App.jsx               # Main app component
```

## 🎯 Core Functionality

### Shopping Cart
- Add/remove products
- Update quantities (1-10)
- Save items for later
- Gift wrapping options
- Persistent storage across sessions
- Real-time total calculations

### Product Features
- Product detail pages with breadcrumbs
- Image galleries with zoom
- Star ratings and reviews
- Related product recommendations
- Recently viewed products carousel

### Checkout Process
- Multi-step progress indicator
- Cart → Shipping → Payment → Review
- Estimated delivery dates
- Order summary with tax calculations
- Promo code support

### User Experience
- Responsive navigation with mobile menu
- Search with autocomplete suggestions
- Category browsing
- Empty states with helpful CTAs
- Loading skeletons for better perceived performance

## 🎨 Design System

### Colors
- **Primary:** `#FF9900` (Amazon Orange)
- **Header:** `#131921` (Dark Navy)
- **Accent:** `#FFD814` (Amazon Yellow)
- **Success:** `#067D62` (Green)
- **Error:** `#B12704` (Red)

### Typography
- **Font Family:** Amazon Ember, Arial, sans-serif
- **Headings:** Bold, 24px-48px
- **Body:** Regular, 14px-16px

### Spacing
- Based on 4px increments (Tailwind spacing scale)
- Consistent padding: 16px (p-4), 24px (p-6), 32px (p-8)

## 🧪 Testing Checklist

### Manual Testing
- ✅ Homepage loads with product grid
- ✅ Product cards link to detail pages
- ✅ Add to cart functionality works
- ✅ Cart persists across page refreshes
- ✅ Search returns relevant results
- ✅ Theme toggle switches between light/dark
- ✅ Responsive on mobile (375px), tablet (768px), desktop (1440px)
- ✅ Keyboard navigation works throughout
- ✅ Error boundaries catch and display errors gracefully

### Performance Targets
- **Lighthouse Performance:** 90+
- **Lighthouse Accessibility:** 95+
- **Lighthouse Best Practices:** 95+
- **Lighthouse SEO:** 90+

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Platforms
- **Vercel** - Recommended for React apps
- **Netlify** - Easy deployment with continuous integration
- **GitHub Pages** - Free hosting for static sites

### Environment Variables
Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

## 📊 Performance Optimizations

1. **Code Splitting** - Routes are lazy-loaded to reduce initial bundle size
2. **Image Optimization** - Lazy loading with intersection observer
3. **Memoization** - React.memo for ProductCard and other expensive components
4. **Debouncing** - Search input debounced to 300ms
5. **Caching** - TanStack Query caches API responses
6. **Tree Shaking** - Unused code eliminated in production build

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is for educational and portfolio purposes. Amazon and its logo are trademarks of Amazon.com, Inc.

## 👨‍💻 Author

**Your Name**
- Portfolio: [yourportfolio.com](#)
- LinkedIn: [linkedin.com/in/yourname](#)
- GitHub: [@yourusername](#)

## 🙏 Acknowledgments

- Product data from [Fake Store API](https://fakestoreapi.com)
- Icons from [Lucide React](https://lucide.dev)
- Design inspiration from [Amazon.com](https://amazon.com)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
