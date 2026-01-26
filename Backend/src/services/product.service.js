import { db } from '../config/firebase.config.js';
import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  updateDoc, 
  deleteDoc, 
  Timestamp 
} from 'firebase/firestore';

/**
 * Product Service
 * Handles product management in Firestore
 */

const productService = {
  /**
   * Create a new product
   * @param {object} productData - Product information
   * @returns {Promise<object>} Created product with ID
   */
  async createProduct(productData) {
    try {
      const product = {
        ...productData,
        price: parseFloat(productData.price),
        rating: productData.rating || { rate: 0, count: 0 },
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        description: productData.description || '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const productsRef = collection(db, 'products');
      const docRef = await addDoc(productsRef, product);

      return {
        success: true,
        product: {
          id: docRef.id,
          ...product,
        },
      };
    } catch (error) {
      console.error('Error creating product:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Get all products with pagination and filtering
   * @param {object} options - Filter and pagination options
   * @returns {Promise<object>} Array of products and metadata
   */
  async getAllProducts(options = {}) {
    try {
      const { category, search, limit: limitCount = 20, lastId = null } = options;
      
      const productsRef = collection(db, 'products');
      
      // If searching, we fetch more to filter in memory (Firestore limitation workaround)
      // Otherwise we use the requested limit
      const fetchLimit = search ? 100 : limitCount;
      
      let q = query(productsRef, orderBy('createdAt', 'desc'));

      if (category) {
        q = query(q, where('category', '==', category));
      }

      q = query(q, limit(fetchLimit));

      const querySnapshot = await getDocs(q);
      let products = [];

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // Client-side filtering for Search
      if (search) {
        const lowerSearch = search.toLowerCase();
        products = products.filter(p => 
          p.title?.toLowerCase().includes(lowerSearch) || 
          p.description?.toLowerCase().includes(lowerSearch)
        );
      }

      return {
        success: true,
        products,
        count: products.length,
      };
    } catch (error) {
      console.error('Error getting products:', error);
      return {
        success: false,
        error: error.message,
        products: [],
      };
    }
  },

  /**
   * Get product by ID
   * @param {string} productId - Product ID
   * @returns {Promise<object>} Product data
   */
  async getProductById(productId) {
    try {
      const productRef = doc(db, 'products', productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        return {
          success: false,
          error: 'Product not found',
        };
      }

      return {
        success: true,
        product: {
          id: productSnap.id,
          ...productSnap.data(),
        },
      };
    } catch (error) {
      console.error('Error getting product:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Update product
   * @param {string} productId - Product ID
   * @param {object} updateData - Data to update
   * @returns {Promise<object>} Result
   */
  async updateProduct(productId, updateData) {
    try {
      const productRef = doc(db, 'products', productId);
      
      const updates = {
        ...updateData,
        updatedAt: Timestamp.now(),
      };
      
      if (updates.price) {
        updates.price = parseFloat(updates.price);
      }

      await updateDoc(productRef, updates);

      return {
        success: true,
        message: 'Product updated successfully',
      };
    } catch (error) {
      console.error('Error updating product:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Delete product
   * @param {string} productId - Product ID
   * @returns {Promise<object>} Result
   */
  async deleteProduct(productId) {
    try {
      await deleteDoc(doc(db, 'products', productId));
      
      return {
        success: true,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  },
  
  /**
   * Get categories
   * @returns {Promise<object>} List of categories
   */
  async getCategories() {
     try {
       // Since Firestore doesn't support grouping natively efficiently without aggregation queries,
       // we might just return the fixed list or scan.
       // For now, we'll return a static list combined with a dynamic scan if needed.
       // This is a simplified approach.
       const productsRef = collection(db, 'products');
       const querySnapshot = await getDocs(productsRef);
       const categories = new Set();
       
       querySnapshot.forEach(doc => {
         const data = doc.data();
         if (data.category) categories.add(data.category);
       });
       
       return {
         success: true,
         categories: Array.from(categories)
       };
     } catch (error) {
       console.error('Error getting categories:', error);
       return {
         success: false,
         error: error.message
       }
     }
  },

  /**
   * Delete all products (for seeding/testing)
   * @returns {Promise<object>} Result with count
   */
  async deleteAllProducts() {
    try {
      const productsRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsRef);
      
      let deleteCount = 0;
      const deletePromises = [];
      
      querySnapshot.forEach((docSnapshot) => {
        deletePromises.push(deleteDoc(doc(db, 'products', docSnapshot.id)));
        deleteCount++;
      });
      
      await Promise.all(deletePromises);
      
      return {
        success: true,
        count: deleteCount,
        message: `Deleted ${deleteCount} products`
      };
    } catch (error) {
      console.error('Error deleting all products:', error);
      return {
        success: false,
        error: error.message,
        count: 0
      };
    }
  }
};

export const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getCategories,
  deleteAllProducts
} = productService;

export default productService;
