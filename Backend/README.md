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
│   │   └── firebase.config.js    # Firebase initialization
│   ├── services/
│   │   ├── auth.service.js       # Authentication operations
│   │   └── firestore.service.js  # Database operations
│   ├── controllers/              # Route controllers
│   ├── routes/                   # API routes
│   ├── middlewares/              # Custom middlewares
│   └── app.js                    # Express app setup
├── .env                          # Environment variables (DO NOT COMMIT)
├── .env.example                  # Environment template
└── package.json
```

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
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`)

## ⚠️ Security Notes

- **Never commit `.env` file** to version control
- Keep your Firebase API keys secure
- Use Firebase Security Rules in production
- Enable Firebase App Check for additional security

## 📝 Next Steps

1. Create Express routes that use the Firebase services
2. Add authentication middleware for protected routes
3. Implement product API endpoints
4. Add error handling and validation
5. Set up Firebase Security Rules
6. Deploy to Firebase Functions or your preferred hosting

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Database](https://firebase.google.com/docs/firestore)
- [Express.js](https://expressjs.com/)
