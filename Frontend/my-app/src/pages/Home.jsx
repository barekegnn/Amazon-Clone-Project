import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../services/productApi';
import HeroCarousel from '../components/Home/HeroCarousel';
import HomeCard from '../components/Home/HomeCard';
import ProductCarouselRow from '../components/Home/ProductCarouselRow';
import { RecentlyViewed } from '../components/product/RecentlyViewed';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all products (limit 1000 to get everything)
        getProducts({ limit: 1000 })
            .then(data => {
                setAllProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setLoading(false);
            });
    }, []);

    // Helper to find specific products by EXACT title (or close match)
    const findProduct = (title) => {
        if (!allProducts.length) return null;
        return allProducts.find(p => p.title === title) || 
               allProducts.find(p => p.title.toLowerCase().includes(title.toLowerCase()));
    };

    // Helper to get multiple products for carousels
    const getCategoryProducts = (category) => {
        return allProducts.filter(p => p.category === category);
    };

    // --- ROW 1 DATA ---
    const row1Cards = useMemo(() => {
        if (!allProducts.length) return [];

        // Get actual products by category
        const electronics = getCategoryProducts('electronics');
        const garden = getCategoryProducts('garden');
        const toys = getCategoryProducts('toys');
        const home = getCategoryProducts('home');

        return [
            {
                id: 'r1-1', title: "Electronics", linkText: "See more", variant: "quad",
                data: electronics.slice(0, 4).map(p => ({ 
                    label: p.title.split(' ')[0] || "Electronics", 
                    image: p.image, 
                    id: p.id, 
                    price: p.price 
                }))
            },
            {
                id: 'r1-2', title: "Computers", linkText: "Shop now", variant: "single",
                data: (() => {
                    const laptop = findProduct("Laptop");
                    return laptop ? { image: laptop.image, id: laptop.id, price: laptop.price } : null;
                })()
            },
            {
                id: 'r1-3', title: "Home & Garden", linkText: "See more", variant: "quad",
                data: [...garden.slice(0, 2), ...home.slice(0, 2)].map(p => ({ 
                    label: p.title.split(' ')[0], 
                    image: p.image, 
                    id: p.id, 
                    price: p.price 
                }))
            },
            {
                id: 'r1-4', title: "Toys & Games", linkText: "Shop now", variant: "single",
                data: (() => {
                    const toy = toys[0];
                    return toy ? { image: toy.image, id: toy.id, price: toy.price } : null;
                })()
            }
        ];
    }, [allProducts]);

    // --- ROW 2 DATA ---
    const row2Cards = useMemo(() => {
         if (!allProducts.length) return [];

         // Get actual products by category
         const books = getCategoryProducts('books');
         const pets = getCategoryProducts('pets');
         const health = getCategoryProducts('health');
         const tools = getCategoryProducts('tools');

         return [
            {
                 id: 'r2-1', title: "Tools", linkText: "See more", variant: "single",
                 data: (() => {
                    const tool = tools[0];
                    return tool ? { image: tool.image, id: tool.id, price: tool.price } : null;
                 })()
            },
            {
                 id: 'r2-2', title: "Books", linkText: "See more", variant: "single",
                 data: (() => {
                    const book = books[0];
                    return book ? { image: book.image, id: book.id, price: book.price } : null;
                 })()
            },
            {
                 id: 'r2-3', title: "Home & Living", linkText: "Shop now", variant: "quad",
                 data: [
                    ...home.slice(0, 2),
                    ...health.slice(0, 2)
                 ].map(p => ({ label: p.title.split(' ')[0], image: p.image, id: p.id, price: p.price }))
            },
            {
                 id: 'r2-4', title: "Pet Supplies", linkText: "Shop now", variant: "single",
                 data: (() => {
                    const pet = pets[0];
                    return pet ? { image: pet.image, id: pet.id, price: pet.price } : null;
                 })()
            }
        ];
    }, [allProducts]);

    // --- ROW 4 DATA ---
    const row4Cards = useMemo(() => {
        if (!allProducts.length) return [];
        
        // Get actual products by category
        const computers = getCategoryProducts('computers');
        
        return [
            {
                 id: 'r4-1', title: "Health Care", linkText: "Learn more", variant: "single",
                 data: (() => {
                    const health = findProduct("Health Care Kit");
                    return health ? { image: health.image, id: health.id, price: health.price } : null;
                 })()
            },
            {
                 id: 'r4-2', title: "Books Collection", linkText: "See more", variant: "quad",
                 data: books.slice(0, 4).map(p => ({ 
                    label: p.title.split(' ')[0], 
                    image: p.image, 
                    id: p.id, 
                    price: p.price 
                }))
            },
            {
                 id: 'r4-3', title: "Garden Tools", linkText: "Shop now", variant: "single",
                 data: (() => {
                    const gardenTool = garden[0];
                    return gardenTool ? { image: gardenTool.image, id: gardenTool.id, price: gardenTool.price } : null;
                 })()
            },
            {
                 id: 'r4-4', title: "Computers", linkText: "Shop now", variant: "single",
                 data: (() => {
                    const computer = computers[0];
                    return computer ? { image: computer.image, id: computer.id, price: computer.price } : null;
                 })()
            }
        ];
    }, [allProducts]);

    // --- ROW 6 & 7 (Simplified for space, but dynamic) ---
     const row6Cards = useMemo(() => {
        if (!allProducts.length) return [];

        return [
            { id: 'r6-1', title: "Shop Laptops", linkText: "See more", variant: "single", 
              data: (() => { const p = findProduct("Laptop"); return p ? { image: p.image, id: p.id } : null; })() },
            { id: 'r6-2', title: "Health & Care", linkText: "Shop now", variant: "single", 
              data: (() => { const p = findProduct("Health Care Kit"); return p ? { image: p.image, id: p.id } : null; })() },
            { id: 'r6-3', title: "Deals on Tools", linkText: "Shop now", variant: "single", 
              data: (() => { const p = findProduct("Power Tools"); return p ? { image: p.image, id: p.id } : null; })() }, // Matched Power Tools
            { id: 'r6-4', title: "New Toys", linkText: "See more", variant: "quad",
                 data: [
                    findProduct("Action Figures"),
                    findProduct("Dolls"),
                    findProduct("Bikes & Ride-ons"),
                    findProduct("Arts & Crafts")
                 ].filter(Boolean).map(p => ({ label: p.title, image: p.image, id: p.id }))
            }
        ];
     }, [allProducts]);
     
    // Row 7 Cards
    const row7Cards = useMemo(() => {
        if (!allProducts.length) return [];
        return [
             { id: 'r7-1', title: "Pet Supplies", linkText: "Shop now", variant: "single",
                data: (() => { const p = findProduct("Pet Supplies"); return p ? { image: p.image, id: p.id } : null; })() },
             { id: 'r7-2', title: "Smartwatches", linkText: "Shop now", variant: "single",
                data: (() => { const p = findProduct("Smartwatch"); return p ? { image: p.image, id: p.id } : null; })() },
             { id: 'r7-3', title: "Strip Lights", linkText: "Shop now", variant: "single", // moved strip lights down
                data: (() => { const p = findProduct("Strip Lights"); return p ? { image: p.image, id: p.id } : null; })() },
             { id: 'r7-4', title: "Gardening", linkText: "See more", variant: "quad",
                 data: [
                    findProduct("Outdoor Decor"),
                    findProduct("Furniture"),
                    findProduct("Lawn Care"),
                    findProduct("Gardening Tools")
                 ].filter(Boolean).map(p => ({ label: p.title, image: p.image, id: p.id }))
             }
        ]
    }, [allProducts]);


    if (loading) {
        return <div className="min-h-screen bg-gray-200 flex items-center justify-center">Loading Products...</div>;
    }



    // Carousels (Filter by Category)
    const holidayData = getCategoryProducts('holiday');
    const booksData = getCategoryProducts('books');

    return (
        <div className="home bg-gray-200 pb-10">
            <HeroCarousel />
            
            <div className="max-w-[1500px] mx-auto z-10 relative -mt-60 px-4 space-y-6">
                
                {/* Row 1: Overlap Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {row1Cards.map(card => (
                       card.data && <HomeCard key={card.id} {...card} />
                    ))}
                </div>

                {/* Row 2: Standard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {row2Cards.map(card => (
                        card.data && <HomeCard key={card.id} {...card} />
                    ))}
                </div>

                {/* Row 3: Holiday Carousel */}
                {holidayData.length > 0 && (
                    <ProductCarouselRow title="Holiday Specials" products={holidayData} />
                )}

                {/* Row 4: Standard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {row4Cards.map(card => (
                        card.data && <HomeCard key={card.id} {...card} />
                    ))}
                </div>

                {/* Row 5: Books Carousel */}
                {booksData.length > 0 && (
                    <ProductCarouselRow title="Top Sellers in Books" products={booksData} />
                )}

                {/* Row 6: Standard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {row6Cards.map(card => (
                        card.data && <HomeCard key={card.id} {...card} />
                    ))}
                </div>
                
                 {/* Row 7: Standard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {row7Cards.map(card => (
                        card.data && <HomeCard key={card.id} {...card} />
                    ))}
                </div>

                {/* Recently Viewed Products */}
                <div className="px-4">
                    <RecentlyViewed />
                </div>

            </div>
        </div>
    );
};

export default Home;
