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
 * Seed database with real e-commerce products
 * POST /api/products/seed
 */
export const seedProducts = asyncHandler(async (req, res) => {
    // FIRST: Clear existing products (optional - controlled by query param)
    const clearFirst = req.query.clear === 'true';
    
    if (clearFirst) {
        console.log('🗑️  Clearing existing products...');
        const deleteResult = await productService.deleteAllProducts();
        console.log(`✅ Cleared ${deleteResult.count || 0} products`);
    }

    // Real, appropriate e-commerce products across 5+ categories
    const realProducts = [
        // ELECTRONICS CATEGORY
        { 
            title: "Wireless Bluetooth Headphones", 
            price: 79.99, 
            category: "electronics", 
            image: "/assets/products/electronics/headphones.jpg",
            description: "Premium wireless headphones with active noise cancellation and 30-hour battery life",
            rating: { rate: 4.5, count: 1250 },
            inStock: true
        },
        { 
            title: "4K Smart TV 55 inch", 
            price: 499.99, 
            category: "electronics", 
            image: "/assets/products/electronics/tv.jpg",
            description: "Ultra HD 4K Smart TV with HDR, built-in streaming apps, and voice control",
            rating: { rate: 4.7, count: 890 },
            inStock: true
        },
        { 
            title: "Laptop Computer 15.6 inch", 
            price: 899.00, 
            category: "electronics", 
            image: "/assets/products/electronics/laptop.jpg",
            description: "Powerful laptop with Intel i7 processor, 16GB RAM, 512GB SSD for work and entertainment",
            rating: { rate: 4.6, count: 567 },
            inStock: true
        },
        { 
            title: "Wireless Gaming Mouse", 
            price: 49.99, 
            category: "electronics", 
            image: "/assets/products/gaming/mouse.jpg",
            description: "High-precision wireless gaming mouse with customizable RGB lighting and 6 programmable buttons",
            rating: { rate: 4.8, count: 2340 },
            inStock: true
        },
        { 
            title: "Mechanical Gaming Keyboard", 
            price: 89.99, 
            category: "electronics", 
            image: "/assets/products/gaming/keyboard.jpg",
            description: "RGB mechanical keyboard with tactile switches, perfect for gaming and typing",
            rating: { rate: 4.7, count: 1890 },
            inStock: true
        },
        { 
            title: "Smartwatch Fitness Tracker", 
            price: 199.00, 
            category: "electronics", 
            image: "/assets/products/electronics/smartwatch.jpg",
            description: "Advanced smartwatch with heart rate monitor, GPS, and 7-day battery life",
            rating: { rate: 4.5, count: 3450 },
            inStock: true
        },
        { 
            title: "Portable Bluetooth Speaker", 
            price: 59.99, 
            category: "electronics", 
            image: "/assets/products/electronics/speaker.jpg",
            description: "Waterproof portable speaker with 360-degree sound and 12-hour playtime",
            rating: { rate: 4.6, count: 2100 },
            inStock: true
        },
        { 
            title: "USB-C Hub Adapter", 
            price: 34.99, 
            category: "electronics", 
            image: "/assets/products/electronics/usb-hub.jpg",
            description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery",
            rating: { rate: 4.4, count: 890 },
            inStock: true
        },

        // FASHION CATEGORY
        { 
            title: "Men's Classic Denim Jeans", 
            price: 49.99, 
            category: "fashion", 
            image: "/assets/products/fashion/jeans.jpg",
            description: "Comfortable slim-fit denim jeans with stretch fabric, available in multiple sizes",
            rating: { rate: 4.3, count: 1560 },
            inStock: true
        },
        { 
            title: "Women's Summer Dress", 
            price: 39.99, 
            category: "fashion", 
            image: "/assets/products/fashion/dresses.jpg",
            description: "Elegant floral print dress perfect for casual and semi-formal occasions",
            rating: { rate: 4.5, count: 980 },
            inStock: true
        },
        { 
            title: "Casual Cotton T-Shirt", 
            price: 19.99, 
            category: "fashion", 
            image: "/assets/products/fashion/tops.jpg",
            description: "Soft cotton t-shirt in various colors, comfortable for everyday wear",
            rating: { rate: 4.4, count: 2340 },
            inStock: true
        },
        { 
            title: "Running Sneakers", 
            price: 79.99, 
            category: "fashion", 
            image: "/assets/products/fashion/shoes.jpg",
            description: "Lightweight running shoes with cushioned sole and breathable mesh upper",
            rating: { rate: 4.6, count: 1780 },
            inStock: true
        },
        { 
            title: "Leather Crossbody Bag", 
            price: 69.99, 
            category: "fashion", 
            image: "/assets/products/fashion/bag.jpg",
            description: "Stylish genuine leather crossbody bag with adjustable strap and multiple compartments",
            rating: { rate: 4.7, count: 890 },
            inStock: true
        },
        { 
            title: "Winter Wool Coat", 
            price: 129.99, 
            category: "fashion", 
            image: "/assets/products/fashion/coat.jpg",
            description: "Warm wool blend coat with classic design, perfect for cold weather",
            rating: { rate: 4.5, count: 670 },
            inStock: true
        },

        // HOME & KITCHEN CATEGORY
        { 
            title: "Stainless Steel Cookware Set", 
            price: 149.99, 
            category: "home", 
            image: "/assets/products/home/kitchen.jpg",
            description: "10-piece professional cookware set with non-stick coating and heat-resistant handles",
            rating: { rate: 4.8, count: 1230 },
            inStock: true
        },
        { 
            title: "Memory Foam Pillow Set", 
            price: 44.99, 
            category: "home", 
            image: "/assets/products/home/bedding.jpg",
            description: "Set of 2 ergonomic memory foam pillows for better sleep and neck support",
            rating: { rate: 4.6, count: 2890 },
            inStock: true
        },
        { 
            title: "Modern Table Lamp", 
            price: 39.99, 
            category: "home", 
            image: "/assets/products/home/decor.jpg",
            description: "Elegant LED table lamp with adjustable brightness and USB charging port",
            rating: { rate: 4.5, count: 1120 },
            inStock: true
        },
        { 
            title: "Dining Table Set", 
            price: 299.99, 
            category: "home", 
            image: "/assets/products/home/dining.jpg",
            description: "5-piece dining set with solid wood table and 4 comfortable chairs",
            rating: { rate: 4.4, count: 450 },
            inStock: true
        },
        { 
            title: "Vacuum Cleaner Robot", 
            price: 249.99, 
            category: "home", 
            image: "/assets/products/home/vacuum.jpg",
            description: "Smart robot vacuum with app control, automatic charging, and HEPA filter",
            rating: { rate: 4.7, count: 3450 },
            inStock: true
        },
        { 
            title: "Coffee Maker Machine", 
            price: 89.99, 
            category: "home", 
            image: "/assets/products/home/coffee.jpg",
            description: "Programmable coffee maker with thermal carafe and auto-brew feature",
            rating: { rate: 4.5, count: 1890 },
            inStock: true
        },
        { 
            title: "Wall Art Canvas Set", 
            price: 54.99, 
            category: "home", 
            image: "/assets/products/home/decor2.jpg",
            description: "3-piece modern abstract canvas wall art for living room decoration",
            rating: { rate: 4.3, count: 780 },
            inStock: true
        },
        { 
            title: "Storage Ottoman Bench", 
            price: 79.99, 
            category: "home", 
            image: "/assets/products/home/furniture.jpg",
            description: "Multi-functional storage ottoman with soft cushion top and spacious interior",
            rating: { rate: 4.6, count: 1230 },
            inStock: true
        },

        // BOOKS CATEGORY
        { 
            title: "The Midnight Library - Fiction", 
            price: 16.99, 
            category: "books", 
            image: "/assets/products/books/fiction.jpg",
            description: "Bestselling fiction novel about life, choices, and infinite possibilities",
            rating: { rate: 4.8, count: 5670 },
            inStock: true
        },
        { 
            title: "Atomic Habits - Self Help", 
            price: 18.99, 
            category: "books", 
            image: "/assets/products/books/self-help.jpg",
            description: "Practical guide to building good habits and breaking bad ones",
            rating: { rate: 4.9, count: 12340 },
            inStock: true
        },
        { 
            title: "The Silent Patient - Mystery", 
            price: 14.99, 
            category: "books", 
            image: "/assets/products/books/mystery.jpg",
            description: "Gripping psychological thriller that will keep you guessing until the end",
            rating: { rate: 4.7, count: 8900 },
            inStock: true
        },
        { 
            title: "Salt, Fat, Acid, Heat - Cookbook", 
            price: 24.99, 
            category: "books", 
            image: "/assets/products/books/cookbook.jpg",
            description: "Master the four elements of good cooking with this award-winning cookbook",
            rating: { rate: 4.8, count: 3450 },
            inStock: true
        },
        { 
            title: "Educated - Biography", 
            price: 17.99, 
            category: "books", 
            image: "/assets/products/books/biography.jpg",
            description: "Powerful memoir about education, family, and the quest for knowledge",
            rating: { rate: 4.9, count: 6780 },
            inStock: true
        },
        { 
            title: "Project Hail Mary - Sci-Fi", 
            price: 19.99, 
            category: "books", 
            image: "/assets/products/books/scifi.jpg",
            description: "Thrilling space adventure from the author of The Martian",
            rating: { rate: 4.8, count: 4560 },
            inStock: true
        },
        { 
            title: "Lonely Planet Europe Guide", 
            price: 22.99, 
            category: "books", 
            image: "/assets/products/books/travel.jpg",
            description: "Comprehensive travel guide to Europe's top destinations and hidden gems",
            rating: { rate: 4.6, count: 1230 },
            inStock: true
        },
        { 
            title: "Think and Grow Rich - Business", 
            price: 15.99, 
            category: "books", 
            image: "/assets/products/books/business.jpg",
            description: "Classic business book on success principles and wealth building",
            rating: { rate: 4.7, count: 3890 },
            inStock: true
        },
        { 
            title: "The Art Book - Art History", 
            price: 29.99, 
            category: "books", 
            image: "/assets/products/books/art.jpg",
            description: "Comprehensive guide to art history with beautiful illustrations",
            rating: { rate: 4.8, count: 890 },
            inStock: true
        },
        { 
            title: "Where the Wild Things Are - Children", 
            price: 12.99, 
            category: "books", 
            image: "/assets/products/books/children.jpg",
            description: "Classic children's picture book loved by generations",
            rating: { rate: 4.9, count: 8900 },
            inStock: true
        },

        // SPORTS & FITNESS CATEGORY
        { 
            title: "Yoga Mat with Carrying Strap", 
            price: 29.99, 
            category: "sports", 
            image: "/assets/products/fitness/yoga-mat.jpg",
            description: "Non-slip yoga mat with extra cushioning for comfortable workouts",
            rating: { rate: 4.6, count: 2340 },
            inStock: true
        },
        { 
            title: "Adjustable Dumbbell Set", 
            price: 149.99, 
            category: "sports", 
            image: "/assets/products/fitness/fitness.jpg",
            description: "Space-saving adjustable dumbbells from 5 to 52.5 lbs per hand",
            rating: { rate: 4.7, count: 1560 },
            inStock: true
        },
        { 
            title: "Resistance Bands Set", 
            price: 24.99, 
            category: "sports", 
            image: "/assets/products/fitness/bands.jpg",
            description: "5-piece resistance band set for strength training and stretching",
            rating: { rate: 4.5, count: 3450 },
            inStock: true
        },
        { 
            title: "Foam Roller for Muscle Recovery", 
            price: 19.99, 
            category: "sports", 
            image: "/assets/products/fitness/roller.jpg",
            description: "High-density foam roller for deep tissue massage and muscle recovery",
            rating: { rate: 4.6, count: 1890 },
            inStock: true
        },
        { 
            title: "Jump Rope Speed Rope", 
            price: 14.99, 
            category: "sports", 
            image: "/assets/products/fitness/jump-rope.jpg",
            description: "Adjustable speed jump rope for cardio workouts and fitness training",
            rating: { rate: 4.4, count: 2100 },
            inStock: true
        },
        { 
            title: "Water Bottle 32oz", 
            price: 19.99, 
            category: "sports", 
            image: "/assets/products/fitness/water-bottle.jpg",
            description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours",
            rating: { rate: 4.7, count: 4560 },
            inStock: true
        },

        // TOYS & GAMES CATEGORY
        { 
            title: "Building Blocks Set 500 Pieces", 
            price: 34.99, 
            category: "toys", 
            image: "/assets/products/toys/toys-games.jpg",
            description: "Creative building blocks set for kids ages 4+, promotes STEM learning",
            rating: { rate: 4.7, count: 2340 },
            inStock: true
        },
        { 
            title: "Board Game Family Edition", 
            price: 29.99, 
            category: "toys", 
            image: "/assets/products/toys/board-game.jpg",
            description: "Fun family board game for 2-6 players, ages 8 and up",
            rating: { rate: 4.6, count: 1890 },
            inStock: true
        },
        { 
            title: "Remote Control Car", 
            price: 44.99, 
            category: "toys", 
            image: "/assets/products/toys/rc-car.jpg",
            description: "High-speed RC car with rechargeable battery and durable design",
            rating: { rate: 4.5, count: 1230 },
            inStock: true
        },
        { 
            title: "Art Supplies Kit for Kids", 
            price: 24.99, 
            category: "toys", 
            image: "/assets/products/toys/arts-crafts.jpg",
            description: "Complete art set with crayons, markers, colored pencils, and paper",
            rating: { rate: 4.8, count: 3450 },
            inStock: true
        },
        { 
            title: "Puzzle 1000 Pieces", 
            price: 19.99, 
            category: "toys", 
            image: "/assets/products/toys/puzzle.jpg",
            description: "Challenging jigsaw puzzle with beautiful landscape image",
            rating: { rate: 4.6, count: 890 },
            inStock: true
        },
        { 
            title: "Educational Science Kit", 
            price: 39.99, 
            category: "toys", 
            image: "/assets/products/toys/science-kit.jpg",
            description: "Hands-on science experiments kit for curious young minds",
            rating: { rate: 4.7, count: 1560 },
            inStock: true
        }
    ];

    let createdCount = 0;
    const errors = [];
    
    for (const product of realProducts) {
        const result = await productService.createProduct(product);
        if (result.success) {
            createdCount++;
        } else {
            errors.push({ product: product.title, error: result.error });
        }
    }

    res.status(201).json({
        success: true,
        message: `Successfully seeded ${createdCount} products`,
        count: createdCount,
        total: realProducts.length,
        errors: errors.length > 0 ? errors : undefined
    });
});
