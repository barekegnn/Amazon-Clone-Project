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

        return [
            {
                id: 'r1-1', title: "Gaming Accessories", linkText: "See more", variant: "quad",
                data: [
                    findProduct("Gaming Headsets"),
                    findProduct("Gaming Keyboards"),
                    findProduct("Gaming Mice"),
                    findProduct("Gaming Chairs")
                ].filter(Boolean).map(p => ({ label: p.title.split(' ')[1] || "Gaming", image: p.image, id: p.id, price: p.price }))
            },
            {
                id: 'r1-2', title: "Deals in PCs", linkText: "Shop now", variant: "single",
                data: (() => {
                    const p = findProduct("Gaming Desktop PC");
                    return p ? { image: p.image, id: p.id, price: p.price } : null;
                })()
            },
            {
                id: 'r1-3', title: "Refresh your space", linkText: "See more", variant: "quad",
                data: [
                    findProduct("Dining Sets"),
                    findProduct("Home Decor"),
                    findProduct("Kitchen Essentials"),
                    findProduct("Health & Wellness")
                ].filter(Boolean).map(p => ({ label: p.title.split(' ')[0], image: p.image, id: p.id, price: p.price }))
            },
            {
                id: 'r1-4', title: "Toys & Games", linkText: "Shop now", variant: "single",
                data: (() => {
                    const p = findProduct("Toys & Games Box");
                    return p ? { image: p.image, id: p.id, price: p.price } : null;
                })()
            }
        ];
    }, [allProducts]);

    // --- ROW 2 DATA ---
    const row2Cards = useMemo(() => {
         if (!allProducts.length) return [];

         return [
            {
                 id: 'r2-1', title: "Amazon Basics", linkText: "See more", variant: "single",
                 data: (() => {
                    const p = findProduct("Amazon Basics Item");
                    return p ? { image: p.image, id: p.id, price: p.price } : null;
                 })()
            },
            {
                 id: 'r2-2', title: "Electronics", linkText: "See more", variant: "single",
                 data: (() => {
                    const p = findProduct("Electronics Bundle");
                    return p ? { image: p.image, id: p.id, price: p.price } : null;
                 })()
            },
            {
                 id: 'r2-3', title: "Home & Kitchen", linkText: "Shop now", variant: "quad",
                 data: [
                    findProduct("Kitchen Essentials"), // Repeats allowed
                    findProduct("Home Decor 2"),
                    findProduct("Bedding"),
                    findProduct("Towers")
                 ].filter(Boolean).map(p => ({ label: p.title.split(' ')[0], image: p.image, id: p.id, price: p.price }))
            },
            {
                 id: 'r2-4', title: "Beauty Picks", linkText: "Shop now", variant: "single",
                 data: (() => {
                    const p = findProduct("Beauty Selection");
                    return p ? { image: p.image, id: p.id, price: p.price } : null;
                 })()
            }
        ];
    }, [allProducts]);

    // --- ROW 4 DATA ---
    const row4Cards = useMemo(() => {
        if (!allProducts.length) return [];
        
        return [
            {
                 id: 'r4-1', title: "Easy Returns", linkText: "Learn more", variant: "single",
                 data: (() => {
                    const p = findProduct("Easy Returns");
                    return p ? { image: p.image, id: p.id, price: p.price } : null;
                 })()
            },
            {
                 id: 'r4-2', title: "Discover Fashion", linkText: "See more", variant: "quad",
                 data: [
                    findProduct("Jeans"),
                    findProduct("Tops"),
                    findProduct("Dresses"),
                    findProduct("Shoes")
                 ].filter(Boolean).map(p => ({ label: p.title, image: p.image, id: p.id, price: p.price }))
            },
            {
                 id: 'r4-3', title: "Fitness Needs", linkText: "Shop now", variant: "single",
                 data: (() => {
                    const p = findProduct("Fitness Equipment");
                    return p ? { image: p.image, id: p.id, price: p.price } : null;
                 })()
            },
            {
                 id: 'r4-4', title: "Kindle E-readers", linkText: "Shop now", variant: "single",
                 data: (() => {
                    const p = findProduct("Kindle E-reader");
                    return p ? { image: p.image, id: p.id, price: p.price } : null;
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
