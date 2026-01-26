import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../services/productApi';
import HeroCarousel from '../components/Home/HeroCarousel';
import HomeCard from '../components/Home/HomeCard';
import ProductCarouselRow from '../components/Home/ProductCarouselRow';
import { RecentlyViewed } from '../components/product/RecentlyViewed';

console.log('🚀 Home.jsx loaded - Version 2.0 with debugging');

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all products from backend with cache-busting
        const timestamp = new Date().getTime();
        getProducts({ limit: 100, _t: timestamp })
            .then(data => {
                console.log('📦 Products fetched from API:', data?.length || 0);
                setAllProducts(data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products. Please try again later.");
                setAllProducts([]);
                setLoading(false);
            });
    }, []);

    // Helper to get products by category
    const getCategoryProducts = (category) => {
        return allProducts.filter(p => p.category === category);
    };

    // Build all card rows with STRICT uniqueness and proper allocation
    const { row1Cards, row2Cards, row3Cards } = useMemo(() => {
        if (!allProducts.length) return { row1Cards: [], row2Cards: [], row3Cards: [] };

        console.log('🔍 Total products loaded:', allProducts.length);
        console.log('📊 Products by category:', {
            electronics: allProducts.filter(p => p.category === 'electronics').length,
            fashion: allProducts.filter(p => p.category === 'fashion').length,
            home: allProducts.filter(p => p.category === 'home').length,
            sports: allProducts.filter(p => p.category === 'sports').length,
            toys: allProducts.filter(p => p.category === 'toys').length,
            books: allProducts.filter(p => p.category === 'books').length,
        });

        // Track used product IDs globally
        const usedProductIds = new Set();

        // Helper to get unique products
        const getUniqueProducts = (products, count, debugLabel) => {
            const uniqueProducts = [];
            for (const product of products) {
                if (!usedProductIds.has(product.id) && uniqueProducts.length < count) {
                    uniqueProducts.push(product);
                    usedProductIds.add(product.id);
                }
            }
            console.log(`✅ ${debugLabel}: Got ${uniqueProducts.length}/${count} products`, 
                uniqueProducts.map(p => ({ id: p.id, title: p.title.substring(0, 30), category: p.category }))
            );
            return uniqueProducts;
        };

        // Get products by category
        const electronicsProducts = getCategoryProducts('electronics');
        const fashionProducts = getCategoryProducts('fashion');
        const homeProducts = getCategoryProducts('home');
        const sportsProducts = getCategoryProducts('sports');
        const toysProducts = getCategoryProducts('toys');
        const booksProducts = getCategoryProducts('books');

        // --- ROW 1: 4 Cards ---
        const row1 = [];

        // Card 1: Electronics (4 products)
        const electronics1 = getUniqueProducts(electronicsProducts, 4, 'R1C1-Electronics');
        if (electronics1.length === 4) {
            row1.push({
                id: 'r1-1',
                title: "Electronics & Gadgets",
                linkText: "See more",
                variant: "quad",
                data: electronics1.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        // Card 2: Fashion (4 products)
        const fashion1 = getUniqueProducts(fashionProducts, 4, 'R1C2-Fashion');
        if (fashion1.length === 4) {
            row1.push({
                id: 'r1-2',
                title: "Fashion Trends",
                linkText: "Shop now",
                variant: "quad",
                data: fashion1.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        // Card 3: Home (4 products)
        const home1 = getUniqueProducts(homeProducts, 4, 'R1C3-Home');
        if (home1.length === 4) {
            row1.push({
                id: 'r1-3',
                title: "Home Essentials",
                linkText: "Discover more",
                variant: "quad",
                data: home1.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        // Card 4: Sports (1 product - SINGLE CARD)
        const sports1 = getUniqueProducts(sportsProducts, 1, 'R1C4-Sports');
        if (sports1.length === 1) {
            row1.push({
                id: 'r1-4',
                title: "Sports & Fitness",
                linkText: "Explore",
                variant: "single",
                data: {
                    image: sports1[0].image,
                    id: sports1[0].id,
                    price: sports1[0].price,
                    title: sports1[0].title,
                    alt: sports1[0].title
                }
            });
        }

        // --- ROW 2: 4 Cards ---
        const row2 = [];

        // Card 1: Toys (4 products)
        const toys1 = getUniqueProducts(toysProducts, 4, 'R2C1-Toys');
        if (toys1.length === 4) {
            row2.push({
                id: 'r2-1',
                title: "Toys & Games",
                linkText: "Shop now",
                variant: "quad",
                data: toys1.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        // Card 2: Books (4 products)
        const books1 = getUniqueProducts(booksProducts, 4, 'R2C2-Books');
        if (books1.length === 4) {
            row2.push({
                id: 'r2-2',
                title: "Best Sellers in Books",
                linkText: "See more",
                variant: "quad",
                data: books1.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        // Card 3: Electronics (1 UNIQUE product - SINGLE CARD) - FIX FOR MISMATCH
        const electronics2 = getUniqueProducts(electronicsProducts, 1, 'R2C3-Electronics');
        if (electronics2.length === 1) {
            row2.push({
                id: 'r2-3',
                title: "Top Electronics",
                linkText: "Shop deals",
                variant: "single",
                data: {
                    image: electronics2[0].image,
                    id: electronics2[0].id,
                    price: electronics2[0].price,
                    title: electronics2[0].title,
                    alt: electronics2[0].title
                }
            });
        }

        // Card 4: Home (4 UNIQUE products)
        const home2 = getUniqueProducts(homeProducts, 4, 'R2C4-Home');
        if (home2.length === 4) {
            row2.push({
                id: 'r2-4',
                title: "Home Upgrades",
                linkText: "Discover",
                variant: "quad",
                data: home2.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        // --- ROW 3: 4 Cards (NO EMPTY COLUMNS) ---
        const row3 = [];

        // Card 1: Fashion (4 UNIQUE products)
        const fashion2 = getUniqueProducts(fashionProducts, 4, 'R3C1-Fashion');
        if (fashion2.length === 4) {
            row3.push({
                id: 'r3-1',
                title: "Fashion for Everyone",
                linkText: "See all styles",
                variant: "quad",
                data: fashion2.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        // Card 2: Sports (1 UNIQUE product - SINGLE CARD)
        const sports2 = getUniqueProducts(sportsProducts, 1, 'R3C2-Sports');
        if (sports2.length === 1) {
            row3.push({
                id: 'r3-2',
                title: "Fitness Equipment",
                linkText: "Shop now",
                variant: "single",
                data: {
                    image: sports2[0].image,
                    id: sports2[0].id,
                    price: sports2[0].price,
                    title: sports2[0].title,
                    alt: sports2[0].title
                }
            });
        }

        // Card 3: Electronics (4 UNIQUE products)
        const electronics3 = getUniqueProducts(electronicsProducts, 4, 'R3C3-Electronics');
        if (electronics3.length === 4) {
            row3.push({
                id: 'r3-3',
                title: "Tech Accessories",
                linkText: "Explore",
                variant: "quad",
                data: electronics3.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        // Card 4: Toys (4 UNIQUE products) - FIX FOR EMPTY COLUMNS
        const toys2 = getUniqueProducts(toysProducts, 4, 'R3C4-Toys');
        if (toys2.length === 4) {
            row3.push({
                id: 'r3-4',
                title: "Kids' Favorites",
                linkText: "See more",
                variant: "quad",
                data: toys2.map(p => ({
                    label: p.title,
                    image: p.image,
                    id: p.id,
                    price: p.price,
                    title: p.title
                }))
            });
        }

        return {
            row1Cards: row1,
            row2Cards: row2,
            row3Cards: row3
        };
    }, [allProducts]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-700">Loading Products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-amazonclone-yellow hover:bg-amazonclone-yellow-dark px-6 py-2 rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (allProducts.length === 0) {
        return (
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="bg-white p-12 rounded-lg shadow-md text-center max-w-md">
                    <h2 className="text-2xl font-bold mb-4">No Products Available</h2>
                    <p className="text-gray-600 mb-4">
                        The product catalog is empty. Please seed the database first.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Run: <code className="bg-gray-100 px-2 py-1 rounded">node Backend/scripts/seedDatabase.js</code>
                    </p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-amazonclone-yellow hover:bg-amazonclone-yellow-dark px-6 py-2 rounded"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    // Get products for carousels
    const booksData = getCategoryProducts('books');
    const sportsData = getCategoryProducts('sports');

    return (
        <div className="home bg-gray-200 pb-10">
            <HeroCarousel />
            
            <div className="max-w-[1500px] mx-auto z-10 relative -mt-60 px-4 space-y-6">
                
                {/* Row 1: Card Grid - ALWAYS 4 CARDS */}
                {row1Cards.length === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {row1Cards.map(card => (
                            <HomeCard key={card.id} {...card} />
                        ))}
                    </div>
                )}

                {/* Row 2: Card Grid - ALWAYS 4 CARDS */}
                {row2Cards.length === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {row2Cards.map(card => (
                            <HomeCard key={card.id} {...card} />
                        ))}
                    </div>
                )}

                {/* Carousel 1: Books */}
                {booksData.length > 0 && (
                    <ProductCarouselRow 
                        title="Best Sellers in Books" 
                        products={booksData} 
                    />
                )}

                {/* Row 3: Card Grid - ALWAYS 4 CARDS (NO EMPTY COLUMNS) */}
                {row3Cards.length === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {row3Cards.map(card => (
                            <HomeCard key={card.id} {...card} />
                        ))}
                    </div>
                )}

                {/* Carousel 2: Sports & Fitness */}
                {sportsData.length > 0 && (
                    <ProductCarouselRow 
                        title="Sports & Fitness Equipment" 
                        products={sportsData} 
                    />
                )}

                {/* Recently Viewed Products */}
                <div className="px-4">
                    <RecentlyViewed />
                </div>

            </div>
        </div>
    );
};

export default Home;
