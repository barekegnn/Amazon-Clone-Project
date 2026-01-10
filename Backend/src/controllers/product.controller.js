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

/**
 * Seed database with demo products
 * POST /api/products/seed
 */
export const seedProducts = asyncHandler(async (req, res) => {
    // EXACT Data Match from original Home.jsx
    const demoProducts = [
        // --- ROW 1: Gaming Accessories ---
        { title: "Gaming Headsets", price: 49.99, category: "gaming", image: "/assets/products/gaming/headset.jpg", rating: { rate: 4.5, count: 120 } },
        { title: "Gaming Keyboards", price: 65.00, category: "gaming", image: "/assets/products/gaming/keyboard.jpg", rating: { rate: 4.6, count: 200 } },
        { title: "Gaming Mice", price: 29.50, category: "gaming", image: "/assets/products/gaming/mouse.jpg", rating: { rate: 4.7, count: 350 } },
        { title: "Gaming Chairs", price: 189.99, category: "gaming", image: "/assets/products/gaming/chair.jpg", rating: { rate: 4.4, count: 80 } },
        
        // --- ROW 1: Deals in PCs ---
        { title: "Gaming Desktop PC", price: 849.99, category: "computers", image: "/assets/products/pc/desktop.jpg", rating: { rate: 4.3, count: 45 }, isDeal: true },

        // --- ROW 1: Refresh your space ---
        { title: "Dining Sets", price: 120.00, category: "home", image: "/assets/products/home/dining.jpg", rating: { rate: 4.2, count: 60 } },
        { title: "Home Decor", price: 45.99, category: "home", image: "/assets/products/home/decor.jpg", rating: { rate: 4.5, count: 150 } },
        { title: "Kitchen Essentials", price: 89.00, category: "home", image: "/assets/products/home/kitchen.jpg", rating: { rate: 4.8, count: 320 } },
        { title: "Health & Wellness", price: 34.50, category: "health", image: "/assets/products/home/health.jpg", rating: { rate: 4.6, count: 90 } },

        // --- ROW 1: Toys & Games (Single) ---
        { title: "Toys & Games Box", price: 24.99, category: "toys", image: "/assets/products/toys/toys-games.jpg", rating: { rate: 4.7, count: 500 } },

        // --- ROW 2: Amazon Basics ---
        { title: "Amazon Basics Item", price: 15.99, category: "basics", image: "/assets/products/misc/amazon-basics.jpg", rating: { rate: 4.4, count: 12000 } },
        
        // --- ROW 2: Electronics ---
        { title: "Electronics Bundle", price: 299.00, category: "electronics", image: "/assets/products/electronics/electronics.jpg", rating: { rate: 4.5, count: 560 } },

        // --- ROW 2: Home & Kitchen (Quad) uses repeats of Row 1 + new ---
        { title: "Home Decor 2", price: 29.50, category: "home", image: "/assets/products/home/decor2.jpg", rating: { rate: 4.3, count: 70 } },
        { title: "Bedding", price: 54.00, category: "home", image: "/assets/products/home/bedding.jpg", rating: { rate: 4.6, count: 210 } },
        { title: "Towers", price: 18.99, category: "home", image: "/assets/products/home/towers.jpg", rating: { rate: 4.1, count: 30 } },

        // --- ROW 2: Beauty Picks ---
        { title: "Beauty Selection", price: 42.00, category: "beauty", image: "/assets/products/misc/beauty.jpg", rating: { rate: 4.7, count: 400 } },

        // --- HOLIDAY CAROUSEL ---
        { title: "Holiday Ornaments", price: 12.99, category: "holiday", image: "/assets/products/holiday/ornaments.jpg", rating: { rate: 4.8, count: 150 } },
        { title: "Gift Sets", price: 34.50, category: "holiday", image: "/assets/products/holiday/gift-sets.jpg", rating: { rate: 4.9, count: 200 } },
        { title: "Holiday Lights", price: 19.99, category: "holiday", image: "/assets/products/holiday/lights.jpg", rating: { rate: 4.6, count: 300 } },
        { title: "Wreaths", price: 25.00, category: "holiday", image: "/assets/products/holiday/wreaths.jpg", rating: { rate: 4.5, count: 80 } },
        { title: "Holiday Candles", price: 15.75, category: "holiday", image: "/assets/products/holiday/candles.jpg", rating: { rate: 4.7, count: 120 } },
        { title: "Gift Wrap", price: 8.99, category: "holiday", image: "/assets/products/holiday/gift-wrap.jpg", rating: { rate: 4.4, count: 500 } },
        { title: "Stockings", price: 14.25, category: "holiday", image: "/assets/products/holiday/stockings.jpg", rating: { rate: 4.6, count: 180 } },
        { title: "Holiday Mugs", price: 10.50, category: "holiday", image: "/assets/products/holiday/mugs.jpg", rating: { rate: 4.8, count: 220 } },
        { title: "Snow Globes", price: 22.00, category: "holiday", image: "/assets/products/holiday/snow-globes.jpg", rating: { rate: 4.5, count: 90 } },
        { title: "Holiday Treats", price: 18.50, category: "holiday", image: "/assets/products/holiday/treats.jpg", rating: { rate: 4.7, count: 300 } },

        // --- ROW 4: Easy Returns & Fashion ---
        { title: "Easy Returns", price: 0.00, category: "services", image: "/assets/products/misc/returns.jpg", rating: { rate: 5.0, count: 1000 } },
        { title: "Jeans", price: 39.99, category: "fashion", image: "/assets/products/fashion/jeans.jpg", rating: { rate: 4.4, count: 500 } },
        { title: "Tops", price: 24.50, category: "fashion", image: "/assets/products/fashion/tops.jpg", rating: { rate: 4.3, count: 600 } },
        { title: "Dresses", price: 49.00, category: "fashion", image: "/assets/products/fashion/dresses.jpg", rating: { rate: 4.5, count: 300 } },
        { title: "Shoes", price: 59.99, category: "fashion", image: "/assets/products/fashion/shoes.jpg", rating: { rate: 4.6, count: 400 } },
        { title: "Fitness Equipment", price: 129.00, category: "sports", image: "/assets/products/fitness/fitness.jpg", rating: { rate: 4.7, count: 250 } },
        { title: "Kindle E-reader", price: 99.99, category: "electronics", image: "/assets/products/electronics/kindle.jpg", rating: { rate: 4.8, count: 8000 } },

        // --- BOOKS CAROUSEL ---
        { title: "Fiction Bestseller", price: 14.99, category: "books", image: "/assets/products/books/fiction.jpg", rating: { rate: 4.7, count: 2000 } },
        { title: "Mystery Novel", price: 12.50, category: "books", image: "/assets/products/books/mystery.jpg", rating: { rate: 4.6, count: 1500 } },
        { title: "Self Help Book", price: 15.99, category: "books", image: "/assets/products/books/self-help.jpg", rating: { rate: 4.8, count: 3000 } },
        { title: "Cookbook", price: 24.00, category: "books", image: "/assets/products/books/cookbook.jpg", rating: { rate: 4.9, count: 1200 } },
        { title: "Biography", price: 18.75, category: "books", image: "/assets/products/books/biography.jpg", rating: { rate: 4.7, count: 800 } },
        { title: "Sci-Fi Novel", price: 16.99, category: "books", image: "/assets/products/books/scifi.jpg", rating: { rate: 4.8, count: 2500 } },
        { title: "Travel Guide", price: 22.25, category: "books", image: "/assets/products/books/travel.jpg", rating: { rate: 4.5, count: 600 } },
        { title: "Business Book", price: 19.50, category: "books", image: "/assets/products/books/business.jpg", rating: { rate: 4.6, count: 1800 } },
        { title: "Art Book", price: 35.00, category: "books", image: "/assets/products/books/art.jpg", rating: { rate: 4.8, count: 400 } },
        { title: "Children's Book", price: 10.99, category: "books", image: "/assets/products/books/children.jpg", rating: { rate: 4.9, count: 4000 } },

        // --- ROW 6 & 7: Laptops, Tools, Toys Quad, Gardening Quad ---
        { title: "Laptop", price: 999.00, category: "computers", image: "/assets/products/electronics/laptop.jpg", rating: { rate: 4.6, count: 200 } },
        { title: "Health Care Kit", price: 24.99, category: "health", image: "/assets/products/misc/health-care.jpg", rating: { rate: 4.5, count: 150 } },
        { title: "Strip Lights", price: 15.50, category: "home", image: "/assets/products/electronics/strip-lights.jpg", rating: { rate: 4.4, count: 800 } },
        
        { title: "Action Figures", price: 18.99, category: "toys", image: "/assets/products/toys/action-figures.jpg", rating: { rate: 4.7, count: 120 } },
        { title: "Dolls", price: 22.50, category: "toys", image: "/assets/products/toys/dolls.jpg", rating: { rate: 4.6, count: 300 } },
        { title: "Bikes & Ride-ons", price: 145.00, category: "toys", image: "/assets/products/toys/bikes.jpg", rating: { rate: 4.8, count: 90 } },
        { title: "Arts & Crafts", price: 12.99, category: "toys", image: "/assets/products/toys/arts-crafts.jpg", rating: { rate: 4.5, count: 400 } },

        { title: "Pet Supplies", price: 25.99, category: "pets", image: "/assets/products/misc/pet-supplies.jpg", rating: { rate: 4.6, count: 600 } },
        { title: "Smartwatch", price: 199.00, category: "electronics", image: "/assets/products/electronics/smartwatch.jpg", rating: { rate: 4.5, count: 350 } },
        { title: "Power Tools", price: 85.00, category: "tools", image: "/assets/products/misc/tools.jpg", rating: { rate: 4.7, count: 200 } },

        { title: "Outdoor Decor", price: 45.00, category: "garden", image: "/assets/products/home/outdoor-decor.jpg", rating: { rate: 4.6, count: 120 } },
        { title: "Furniture", price: 299.00, category: "garden", image: "/assets/products/home/furniture.jpg", rating: { rate: 4.5, count: 80 } },
        { title: "Lawn Care", price: 34.99, category: "garden", image: "/assets/products/home/lawn-care.jpg", rating: { rate: 4.4, count: 150 } },
        { title: "Gardening Tools", price: 15.50, category: "garden", image: "/assets/products/home/gardening.jpg", rating: { rate: 4.7, count: 220 } }
    ];

    let createdCount = 0;
    for (const product of demoProducts) {
        await productService.createProduct(product);
        createdCount++;
    }

    res.status(201).json({
        success: true,
        message: `Successfully seeded ${createdCount} products`,
        count: createdCount
    });
});
