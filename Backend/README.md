# Amazon Clone - Backend

Backend server for the Amazon Clone project using Firebase for authentication and data storage.

## 🚀 Features

- **Firebase Authentication**: User registration, login, and session management
- **Firestore Database**: Product storage and management
- **Express Server**: RESTful API endpoints
- **Environment Variables**: Secure configuration management

## 📋 Prerequisites

- Node.js (v14 or higher)
- Firebase account and project
- npm or yarn

## 🔧 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration values from the Firebase Console

   ```bash
   cp .env.example .env
   ```

3. **Update `.env` file** with your Firebase credentials:
   ```env
   FIREBASE_API_KEY=your_api_key_here
   FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   FIREBASE_PROJECT_ID=your_project_id_here
   # ... etc
   ```

## 🔥 Firebase Setup

### Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click on the gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps" section
5. Click on the Web app icon `</>`
6. Copy the configuration values to your `.env` file

### Enable Firebase Services

1. **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password" provider

2. **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location

## 📁 Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── firebase.config.js        # Firebase client SDK initialization
│   │   └── firebaseAdmin.config.js   # Firebase Admin SDK initialization
│   ├── controllers/
│   │   └── auth.controller.js        # Auth route handlers
│   ├── routes/
│   │   └── auth.routes.js            # /api/auth endpoints
│   ├── middlewares/
│   │   ├── auth.middleware.js        # Token decoding & RBAC helpers
│   │   └── error.middleware.js       # 404 & error handling
│   ├── services/
│   │   ├── auth.service.js           # Firebase authentication operations
│   │   └── firestore.service.js      # Firestore data helpers
│   ├── utils/
│   │   ├── apiError.js               # Custom error class
│   │   └── asyncHandler.js           # Async wrapper for controllers
│   ├── app.js                        # Express app configuration
│   └── server.js                     # HTTP server bootstrap
├── tests/
│   └── auth.routes.test.js           # Supertest coverage for auth routes
├── .env                              # Environment variables (DO NOT COMMIT)
├── .env.example                      # Environment template
└── package.json
```

### Environment variables

In addition to the Firebase client configuration, the backend now requires a service-account credential for Firebase Admin. Update `.env` with the following keys (already demonstrated in `.env.example`):

```
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

> ⚠️ When copying the private key, ensure newline characters are escaped as `\n`.

## 🔐 Firebase Services

### Authentication Service

Located in `src/services/auth.service.js`:

```javascript
import { registerUser, loginUser, logoutUser } from './services/auth.service.js';

// Register a new user
const result = await registerUser('user@example.com', 'password123', 'John Doe');

// Login
const loginResult = await loginUser('user@example.com', 'password123');

// Logout
await logoutUser();
```

### Firestore Service

Located in `src/services/firestore.service.js`:

```javascript
import { getAllProducts, getProductById, addProduct } from './services/firestore.service.js';

// Get all products
const { products } = await getAllProducts();

// Get product by ID
const { product } = await getProductById('product-id');

// Add new product
await addProduct({
  name: 'Product Name',
  price: 29.99,
  category: 'Electronics',
  description: 'Product description'
});
```

## 🛠️ Available Functions

### Authentication (`auth.service.js`)
- `registerUser(email, password, displayName)` - Register new user
- `loginUser(email, password)` - Sign in user
- `logoutUser()` - Sign out current user
- `resetPassword(email)` - Send password reset email
- `getCurrentUser()` - Get current authenticated user
- `getAuthToken()` - Get user authentication token

### Firestore (`firestore.service.js`)
- `getAllProducts(limit)` - Get all products
- `getProductById(id)` - Get single product
- `addProduct(data)` - Add new product
- `updateProduct(id, updates)` - Update product
- `deleteProduct(id)` - Delete product
- `getProductsByCategory(category)` - Filter by category
- `getProductsByPriceRange(min, max)` - Filter by price

## 🚦 Running the Server

```bash
# install dependencies
npm install

# run the development server
npm start

# execute automated tests
npm test
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`).

## ⚠️ Security Notes

- **Never commit `.env` file** to version control
- Keep your Firebase API keys secure
- Use Firebase Security Rules in production
- Enable Firebase App Check for additional security

## 🔐 Authentication API

Base path: `/api/auth`

| Method | Path             | Description                          | Auth required |
|--------|------------------|--------------------------------------|---------------|
| POST   | `/register`       | Register a user (email, password, optional displayName) | No |
| POST   | `/login`          | Login with email/password            | No |
| POST   | `/logout`         | Sign out current user                | Yes (Firebase ID token) |
| POST   | `/forgot-password`| Send password reset email            | No |

All endpoints return JSON with the shape `{ success, message, data? }`. Validation errors respond with `{ success: false, message: 'Validation failed', errors }`.

## 📝 Next Steps

1. Implement product and order API endpoints.
2. Extend route protection with role-based authorization for admin features.
3. Configure Firebase Security Rules and deployment pipeline.

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Database](https://firebase.google.com/docs/firestore)
- [Express.js](https://expressjs.com/)
