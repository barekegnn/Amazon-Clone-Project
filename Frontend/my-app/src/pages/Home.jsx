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
                setAllProducts(data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setAllProducts([]);
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

    // --- ROW 1 DATA - Use actual products from database ---
    const row1Cards = useMemo(() => {
        if (!allProducts.length) return [];

        // Get first 4 products for featured section
        const featuredProducts = allProducts.slice(0, 4);
        
        // Find products by category for specific sections
        const toolsProducts = allProducts.filter(p => p.category === 'tools');
        const gardenProducts = allProducts.filter(p => p.category === 'garden');

        return [
            {
                id: 'r1-1', title: "Featured Products", linkText: "See more", variant: "quad",
                data: featuredProducts.map(p => ({ 
                    label: p.title.split(' ')[0] || "Product", 
                    image: p.image, 
                    id: p.id, 
                    price: p.price 
                }))
            },
            {
                id: 'r1-2', title: "Tools & Equipment", linkText: "Shop now", variant: "single",
                data: toolsProducts.length > 0 ? { 
                    image: toolsProducts[0].image, 
                    id: toolsProducts[0].id, 
                    price: toolsProducts[0].price 
                } : null
            },
            {
                id: 'r1-3', title: "Garden Essentials", linkText: "See more", variant: "quad",
                data: gardenProducts.slice(0, 4).map(p => ({ 
                    label: p.title.split(' ')[0], 
                    image: p.image, 
                    id: p.id, 
                    price: p.price 
                }))
            },
            {
                id: 'r1-4', title: "Best Sellers", linkText: "Shop now", variant: "single",
                data: allProducts.length > 4 ? { 
                    image: allProducts[4].image, 
                    id: allProducts[4].id, 
                    price: allProducts[4].price 
                } : null
            }
        ];
    }, [allProducts]);

    // --- ROW 2 DATA - Use actual products from database ---
    const row2Cards = useMemo(() => {
         if (!allProducts.length) return [];

         const remainingProducts = allProducts.slice(5, 9); // Next 4 products

         return [
            {
                id: 'r2-1', title: "Zon-Clone Basics", linkText: "See more", variant: "single",
                data: remainingProducts.length > 0 ? { 
                    image: remainingProducts[0]?.image, 
                    id: remainingProducts[0]?.id, 
                    price: remainingProducts[0]?.price 
                } : null
            },
            {
                 id: 'r2-2', title: "Electronics", linkText: "See more", variant: "single",
                 data: remainingProducts.length > 1 ? { 
                    image: remainingProducts[1]?.image, 
                    id: remainingProducts[1]?.id, 
                    price: remainingProducts[1]?.price 
                 } : null
            },
            {
                 id: 'r2-3', title: "Home & Kitchen", linkText: "Shop now", variant: "quad",
                 data: remainingProducts.slice(2, 6).map(p => ({ 
                    label: p.title.split(' ')[0], 
                    image: p.image, 
                    id: p.id, 
                    price: p.price 
                 }))
            },
            {
                 id: 'r2-4', title: "Beauty Picks", linkText: "Shop now", variant: "single",
                 data: remainingProducts.length > 6 ? { 
                    image: remainingProducts[6]?.image, 
                    id: remainingProducts[6]?.id, 
                    price: remainingProducts[6]?.price 
                 } : null
            }
        ];
    }, [allProducts]);

    // --- ROW 4 DATA - Use actual products from database ---
    const row4Cards = useMemo(() => {
        if (!allProducts.length) return [];
        
        const moreProducts = allProducts.slice(9, 13); // Next 4 products
        
        return [
            {
                 id: 'r4-1', title: "Easy Returns", linkText: "Learn more", variant: "single",
                 data: moreProducts.length > 0 ? { 
                    image: moreProducts[0]?.image, 
                    id: moreProducts[0]?.id, 
                    price: moreProducts[0]?.price 
                 } : null
            },
            {
                 id: 'r4-2', title: "Discover Fashion", linkText: "See more", variant: "quad",
                 data: moreProducts.slice(1, 5).map(p => ({ 
                    label: p.title, 
                    image: p.image, 
                    id: p.id, 
                    price: p.price 
                 }))
            },
            {
                 id: 'r4-3', title: "Fitness Needs", linkText: "Shop now", variant: "single",
                 data: moreProducts.length > 5 ? { 
                    image: moreProducts[5]?.image, 
                    id: moreProducts[5]?.id, 
                    price: moreProducts[5]?.price 
                 } : null
            },
            {
                 id: 'r4-4', title: "Tech Accessories", linkText: "Shop now", variant: "single",
                 data: moreProducts.length > 6 ? { 
                    image: moreProducts[6]?.image, 
                    id: moreProducts[6]?.id, 
                    price: moreProducts[6]?.price 
                 } : null
            }
        ];
    }, [allProducts]);

    // --- ROW 6 & 7 - Use actual products from database ---
     const row6Cards = useMemo(() => {
        if (!allProducts.length) return [];

        const evenMoreProducts = allProducts.slice(13, 17); // Next 4 products

        return [
            { id: 'r6-1', title: "Shop Laptops", linkText: "See more", variant: "single", 
              data: evenMoreProducts.length > 0 ? { image: evenMoreProducts[0]?.image, id: evenMoreProducts[0]?.id } : null },
            { id: 'r6-2', title: "Health & Care", linkText: "Shop now", variant: "single", 
              data: evenMoreProducts.length > 1 ? { image: evenMoreProducts[1]?.image, id: evenMoreProducts[1]?.id } : null },
            { id: 'r6-3', title: "Deals on Tools", linkText: "Shop now", variant: "single", 
              data: evenMoreProducts.length > 2 ? { image: evenMoreProducts[2]?.image, id: evenMoreProducts[2]?.id } : null },
            { id: 'r6-4', title: "New Toys", linkText: "See more", variant: "quad",
                 data: evenMoreProducts.slice(3, 7).map(p => ({ label: p.title, image: p.image, id: p.id }))
            }
        ];
     }, [allProducts]);
     
    // Row 7 Cards - Use actual products from database
    const row7Cards = useMemo(() => {
        if (!allProducts.length) return [];
        
        const finalProducts = allProducts.slice(17, 21); // Next 4 products
        
        return [
             { id: 'r7-1', title: "Pet Supplies", linkText: "Shop now", variant: "single",
                data: finalProducts.length > 0 ? { image: finalProducts[0]?.image, id: finalProducts[0]?.id } : null },
             { id: 'r7-2', title: "Smartwatches", linkText: "Shop now", variant: "single",
                data: finalProducts.length > 1 ? { image: finalProducts[1]?.image, id: finalProducts[1]?.id } : null },
             { id: 'r7-3', title: "Strip Lights", linkText: "Shop now", variant: "single",
                data: finalProducts.length > 2 ? { image: finalProducts[2]?.image, id: finalProducts[2]?.id } : null },
             { id: 'r7-4', title: "Gardening", linkText: "See more", variant: "quad",
                 data: finalProducts.slice(3, 7).map(p => ({ label: p.title, image: p.image, id: p.id }))
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
