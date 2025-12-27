import { getAuthToken } from './authApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Helper function to handle requests
 */
async function request(endpoint, method = 'GET', body = null, requireAuth = false) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (requireAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'An error occurred');
  }

  return data;
}

/**
 * Get all products
 * @param {object} params - { category, limit }
 */
export async function getProducts(params = {}) {
  const queryParams = new URLSearchParams();
  if (params.category) queryParams.append('category', params.category);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.search) queryParams.append('search', params.search);
  if (params.q) queryParams.append('q', params.q);

  const result = await request(`/api/products?${queryParams.toString()}`);
  return result.data;
}

/**
 * Get product by ID
 * @param {string} id 
 */
export async function getProductById(id) {
  const result = await request(`/api/products/${id}`);
  return result.data;
}

/**
 * Get categories
 */
export async function getCategories() {
  const result = await request(`/api/products/categories`);
  return result.data;
}

// --- Admin Operations ---

/**
 * Create product (Admin only)
 * @param {object} productData 
 */
export async function createProduct(productData) {
  const result = await request('/api/products', 'POST', productData, true);
  return result.data;
}

/**
 * Update product (Admin only)
 * @param {string} id 
 * @param {object} productData 
 */
export async function updateProduct(id, productData) {
  const result = await request(`/api/products/${id}`, 'PUT', productData, true);
  return result; // contains message
}

/**
 * Delete product (Admin only)
 * @param {string} id 
 */
export async function deleteProduct(id) {
  const result = await request(`/api/products/${id}`, 'DELETE', null, true);
  return result; // contains message
}
