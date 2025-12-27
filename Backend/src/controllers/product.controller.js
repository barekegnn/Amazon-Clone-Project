import productService from '../services/product.service.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Get all products
 * GET /api/products
 */
export const getProducts = asyncHandler(async (req, res) => {
  const { category, limit, search, q } = req.query;
  
  const result = await productService.getAllProducts({ 
    category, 
    search: search || q,
    limit: limit ? parseInt(limit) : 20 
  });

  if (!result.success) {
    throw new ApiError(500, 'Failed to retrieve products');
  }

  res.status(200).json({
    success: true,
    data: result.products,
    count: result.count
  });
});

/**
 * Get product by ID
 * GET /api/products/:id
 */
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const result = await productService.getProductById(id);

  if (!result.success) {
    throw new ApiError(404, 'Product not found');
  }

  res.status(200).json({
    success: true,
    data: result.product
  });
});

/**
 * Create product (Admin only)
 * POST /api/products
 */
export const createProduct = asyncHandler(async (req, res) => {
  const productData = req.body;
  
  // Basic validation
  if (!productData.title || !productData.price || !productData.category) {
    throw new ApiError(400, 'Title, price, and category are required');
  }

  const result = await productService.createProduct(productData);

  if (!result.success) {
    throw new ApiError(500, result.error || 'Failed to create product');
  }

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: result.product
  });
});

/**
 * Update product (Admin only)
 * PUT /api/products/:id
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  const result = await productService.updateProduct(id, updateData);

  if (!result.success) {
    throw new ApiError(500, result.error || 'Failed to update product');
  }

  res.status(200).json({
    success: true,
    message: 'Product updated successfully'
  });
});

/**
 * Delete product (Admin only)
 * DELETE /api/products/:id
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const result = await productService.deleteProduct(id);

  if (!result.success) {
    throw new ApiError(500, result.error || 'Failed to delete product');
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

/**
 * Get categories
 * GET /api/products/categories
 */
export const getCategories = asyncHandler(async (req, res) => {
  const result = await productService.getCategories();
  
  if (!result.success) {
    throw new ApiError(500, 'Failed to retrieve categories');
  }

  res.status(200).json({
    success: true,
    data: result.categories
  });
});
