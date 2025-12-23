// Firestore Database Service
// Handles database operations for products and other collections

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from '../config/firebase.config.js';

// ============================================
// PRODUCT OPERATIONS
// ============================================

/**
 * Get all products from Firestore
 * @param {number} limitCount - Maximum number of products to fetch
 * @returns {Promise<Array>} Array of products
 */
export const getAllProducts = async (limitCount = 50) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, limit(limitCount));
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      products,
      count: products.length
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      error: error.message,
      products: []
    };
  }
};

/**
 * Get a single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Product data
 */
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productDoc = await getDoc(productRef);
    
    if (productDoc.exists()) {
      return {
        success: true,
        product: {
          id: productDoc.id,
          ...productDoc.data()
        }
      };
    } else {
      return {
        success: false,
        error: 'Product not found',
        product: null
      };
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      success: false,
      error: error.message,
      product: null
    };
  }
};

/**
 * Add a new product to Firestore
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Created product with ID
 */
export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, 'products');
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return {
      success: true,
      productId: docRef.id,
      message: 'Product added successfully'
    };
  } catch (error) {
    console.error('Error adding product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update an existing product
 * @param {string} productId - Product ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Success status
 */
export const updateProduct = async (productId, updates) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    
    return {
      success: true,
      message: 'Product updated successfully'
    };
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete a product
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Success status
 */
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    
    return {
      success: true,
      message: 'Product deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Search products by category
 * @param {string} category - Product category
 * @param {number} limitCount - Maximum results
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByCategory = async (category, limitCount = 20) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      where('category', '==', category),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      products,
      count: products.length
    };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return {
      success: false,
      error: error.message,
      products: []
    };
  }
};

/**
 * Search products by price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Promise<Array>} Array of products
 */
export const getProductsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      where('price', '>=', minPrice),
      where('price', '<=', maxPrice),
      orderBy('price', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      products,
      count: products.length
    };
  } catch (error) {
    console.error('Error fetching products by price range:', error);
    return {
      success: false,
      error: error.message,
      products: []
    };
  }
};

// ============================================
// GENERIC COLLECTION OPERATIONS
// ============================================

/**
 * Get all documents from a collection
 * @param {string} collectionName - Collection name
 * @returns {Promise<Array>} Array of documents
 */
export const getCollection = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      documents,
      count: documents.length
    };
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      documents: []
    };
  }
};

/**
 * Add a document to a collection
 * @param {string} collectionName - Collection name
 * @param {Object} data - Document data
 * @returns {Promise<Object>} Created document ID
 */
export const addDocument = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: new Date().toISOString()
    });
    
    return {
      success: true,
      documentId: docRef.id,
      message: 'Document added successfully'
    };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    return {
      success: false,
      error: error.message
    };
  }
};
