import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productApi';
import HeroCarousel from '../components/Home/HeroCarousel';
import HomeCard from '../components/Home/HomeCard';
import ProductCarouselRow from '../components/Home/ProductCarouselRow';
import { RecentlyViewed } from '../components/product/RecentlyViewed';

// Import all product images
import headsetImg from '../assets/products/gaming/headset.jpg';
import keyboardImg from '../assets/products/gaming/keyboard.jpg';
import mouseImg from '../assets/products/gaming/mouse.jpg';
import chairImg from '../assets/products/gaming/chair.jpg';
import desktopImg from '../assets/products/pc/desktop.jpg';
import diningImg from '../assets/products/home/dining.jpg';
import decorImg from '../assets/products/home/decor.jpg';
import kitchenImg from '../assets/products/home/kitchen.jpg';
import healthImg from '../assets/products/home/health.jpg';
import toysGamesImg from '../assets/products/toys/toys-games.jpg';
import amazonBasicsImg from '../assets/products/misc/amazon-basics.jpg';
import electronicsImg from '../assets/products/electronics/electronics.jpg';
import decor2Img from '../assets/products/home/decor2.jpg';
import beddingImg from '../assets/products/home/bedding.jpg';
import towersImg from '../assets/products/home/towers.jpg';
import beautyImg from '../assets/products/misc/beauty.jpg';
import ornamentsImg from '../assets/products/holiday/ornaments.jpg';
import giftSetsImg from '../assets/products/holiday/gift-sets.jpg';
import lightsImg from '../assets/products/holiday/lights.jpg';
import wreathsImg from '../assets/products/holiday/wreaths.jpg';
import candlesImg from '../assets/products/holiday/candles.jpg';
import giftWrapImg from '../assets/products/holiday/gift-wrap.jpg';
import stockingsImg from '../assets/products/holiday/stockings.jpg';
import mugsImg from '../assets/products/holiday/mugs.jpg';
import snowGlobesImg from '../assets/products/holiday/snow-globes.jpg';
import treatsImg from '../assets/products/holiday/treats.jpg';
import returnsImg from '../assets/products/misc/returns.jpg';
import jeansImg from '../assets/products/fashion/jeans.jpg';
import topsImg from '../assets/products/fashion/tops.jpg';
import dressesImg from '../assets/products/fashion/dresses.jpg';
import shoesImg from '../assets/products/fashion/shoes.jpg';
import fitnessImg from '../assets/products/fitness/fitness.jpg';
import kindleImg from '../assets/products/electronics/kindle.jpg';
import fictionImg from '../assets/products/books/fiction.jpg';
import mysteryImg from '../assets/products/books/mystery.jpg';
import selfHelpImg from '../assets/products/books/self-help.jpg';
import cookbookImg from '../assets/products/books/cookbook.jpg';
import biographyImg from '../assets/products/books/biography.jpg';
import scifiImg from '../assets/products/books/scifi.jpg';
import travelImg from '../assets/products/books/travel.jpg';
import businessImg from '../assets/products/books/business.jpg';
import artImg from '../assets/products/books/art.jpg';
import childrenImg from '../assets/products/books/children.jpg';
import laptopImg from '../assets/products/electronics/laptop.jpg';
import healthCareImg from '../assets/products/misc/health-care.jpg';
import stripLightsImg from '../assets/products/electronics/strip-lights.jpg';
import actionFiguresImg from '../assets/products/toys/action-figures.jpg';
import dollsImg from '../assets/products/toys/dolls.jpg';
import bikesImg from '../assets/products/toys/bikes.jpg';
import artsCraftsImg from '../assets/products/toys/arts-crafts.jpg';
import petSuppliesImg from '../assets/products/misc/pet-supplies.jpg';
import smartwatchImg from '../assets/products/electronics/smartwatch.jpg';
import toolsImg from '../assets/products/misc/tools.jpg';
import outdoorDecorImg from '../assets/products/home/outdoor-decor.jpg';
import furnitureImg from '../assets/products/home/furniture.jpg';
import lawnCareImg from '../assets/products/home/lawn-care.jpg';
import gardeningImg from '../assets/products/home/gardening.jpg';

const Home = () => {
    const [realProducts, setRealProducts] = useState([]);

    useEffect(() => {
        getProducts({ limit: 10 }).then(setRealProducts).catch(err => console.error("Failed to fetch products:", err));
    }, []);

    // Row 1 Data (Overlap Grid)
    const row1Cards = [
        {
            id: 'r1-1', title: "Gaming Accessories", linkText: "See more", variant: "quad",
            data: [
                { label: "Headsets", image: headsetImg, id: '9', price: 49.99 },
                { label: "Keyboards", image: keyboardImg, id: '11', price: 65.00 },
                { label: "Mice", image: mouseImg, id: '12', price: 29.50 },
                { label: "Chairs", image: chairImg, id: '10', price: 189.99 }
            ]
        },
        {
            id: 'r1-2', title: "Deals in PCs", linkText: "Shop now", variant: "single",
            data: { image: desktopImg, id: '13', price: 849.99 }
        },
        {
            id: 'r1-3', title: "Refresh your space", linkText: "See more", variant: "quad",
            data: [
                { label: "Dining", image: diningImg, id: '6', price: 120.00 },
                { label: "Home", image: decorImg, id: '7', price: 45.99 },
                { label: "Kitchen", image: kitchenImg, id: '8', price: 89.00 },
                { label: "Health", image: healthImg, id: '5', price: 34.50 }
            ]
        },
        {
            id: 'r1-4', title: "Toys & Games", linkText: "Shop now", variant: "single",
            data: { image: toysGamesImg, id: '1-books', price: 24.99 }
        }
    ];

    // Row 2 Data (Standard Grid)
    const row2Cards = [
        {
             id: 'r2-1', title: "Amazon Basics", linkText: "See more", variant: "single",
             data: { image: amazonBasicsImg, id: '2', price: 15.99 }
        },
        {
             id: 'r2-2', title: "Electronics", linkText: "See more", variant: "single",
             data: { image: electronicsImg, id: '14', price: 299.00 }
        },
        {
             id: 'r2-3', title: "Home & Kitchen", linkText: "Shop now", variant: "quad",
             data: [
                { label: "Kitchen", image: kitchenImg, id: '8', price: 79.99 },
                { label: "Decor", image: decor2Img, id: '7', price: 29.50 },
                { label: "Bedding", image: beddingImg, id: '6', price: 54.00 },
                { label: "Towers", image: towersImg, id: '5', price: 18.99 }
             ]
        },
        {
             id: 'r2-4', title: "Beauty Picks", linkText: "Shop now", variant: "single",
             data: { image: beautyImg, id: '15', price: 42.00 }
        }
    ];

    // Row 3 Data (Product Carousel - Holiday)
    const holidayData = [
        { id: '16', title: 'Holiday Ornaments', image: ornamentsImg, price: 12.99 },
        { id: '17', title: 'Gift Sets', image: giftSetsImg, price: 34.50 },
        { id: '18', title: 'Holiday Lights', image: lightsImg, price: 19.99 },
        { id: '19', title: 'Wreaths', image: wreathsImg, price: 25.00 },
        { id: '20', title: 'Holiday Candles', image: candlesImg, price: 15.75 },
        { id: '15', title: 'Gift Wrap', image: giftWrapImg, price: 8.99 },
        { id: '14', title: 'Stockings', image: stockingsImg, price: 14.25 },
        { id: '13', title: 'Holiday Mugs', image: mugsImg, price: 10.50 },
        { id: '12', title: 'Snow Globes', image: snowGlobesImg, price: 22.00 },
        { id: '11', title: 'Holiday Treats', image: treatsImg, price: 18.50 },
    ];

     // Row 4 Data (Standard Grid)
     const row4Cards = [
        {
             id: 'r4-1', title: "Easy Returns", linkText: "Learn more", variant: "single",
             data: { image: returnsImg, id: '1', price: 0.00 }
        },
        {
             id: 'r4-2', title: "Discover Fashion", linkText: "See more", variant: "quad",
             data: [
                { label: "Jeans", image: jeansImg, id: '3', price: 39.99 },
                { label: "Tops", image: topsImg, id: '2', price: 24.50 },
                { label: "Dresses", image: dressesImg, id: '4', price: 49.00 },
                { label: "Shoes", image: shoesImg, id: '1', price: 59.99 }
             ]
        },
        {
             id: 'r4-3', title: "Fitness Needs", linkText: "Shop now", variant: "single",
             data: { image: fitnessImg, id: '9', price: 129.00 }
        },
        {
             id: 'r4-4', title: "Kindle E-readers", linkText: "Shop now", variant: "single",
             data: { image: kindleImg, id: '11', price: 99.99 }
        }
    ];

    // Row 5 Data (Product Carousel - Books)
    const booksData = [
        { id: 'book-1', title: 'Fiction Bestseller', image: fictionImg, price: 14.99 },
        { id: 'book-2', title: 'Mystery Novel', image: mysteryImg, price: 12.50 },
        { id: 'book-3', title: 'Self Help', image: selfHelpImg, price: 15.99 },
        { id: 'book-4', title: 'Cookbook', image: cookbookImg, price: 24.00 },
        { id: 'book-5', title: 'Biography', image: biographyImg, price: 18.75 },
        { id: 'book-6', title: 'Science Fiction', image: scifiImg, price: 16.99 },
        { id: 'book-7', title: 'Travel Guide', image: travelImg, price: 22.25 },
        { id: 'book-8', title: 'Business Book', image: businessImg, price: 19.50 },
        { id: 'book-9', title: 'Art Book', image: artImg, price: 35.00 },
        { id: 'book-10', title: 'Children\'s Book', image: childrenImg, price: 10.99 },
    ];

    // Row 6 Data (Standard Grid)
    const row6Cards = [
        {
             id: 'r6-1', title: "Shop Laptops", linkText: "See more", variant: "single",
             data: { image: laptopImg, id: '12', price: 999.00 }
        },
        {
             id: 'r6-2', title: "Health & Care", linkText: "Shop now", variant: "single",
             data: { image: healthCareImg, id: '19', price: 24.99 }
        },
        {
             id: 'r6-3', title: "Strip Lights", linkText: "Shop now", variant: "single",
             data: { image: stripLightsImg, id: '11', price: 15.50 }
        },
        {
             id: 'r6-4', title: "New Toys", linkText: "See more", variant: "quad",
             data: [
                { label: "Action Figures", image: actionFiguresImg, id: '12', price: 18.99 },
                { label: "Dolls", image: dollsImg, id: '15', price: 22.50 },
                { label: "Bikes & Ride-ons", image: bikesImg, id: '5', price: 145.00 },
                { label: "Arts & Crafts", image: artsCraftsImg, id: '7', price: 12.99 }
             ]
        }
    ];

    // Row 7 Data (Standard Grid)
    const row7Cards = [
        {
             id: 'r7-1', title: "Pet Supplies", linkText: "Shop now", variant: "single",
             data: { image: petSuppliesImg, id: '1', price: 25.99 }
        },
        {
             id: 'r7-2', title: "Smartwatches", linkText: "Shop now", variant: "single",
             data: { image: smartwatchImg, id: '10', price: 199.00 }
        },
        {
             id: 'r7-3', title: "Deals on Tools", linkText: "Shop now", variant: "single",
             data: { image: toolsImg, id: '9', price: 85.00 }
        },
        {
             id: 'r7-4', title: "Gardening", linkText: "See more", variant: "quad",
             data: [
                { label: "Outdoor Decor", image: outdoorDecorImg, id: '6', price: 45.00 },
                { label: "Furniture", image: furnitureImg, id: '7', price: 299.00 },
                { label: "Lawn Care", image: lawnCareImg, id: '8', price: 34.99 },
                { label: "Gardening", image: gardeningImg, id: '5', price: 15.50 }
             ]
        }
    ];

  return (
    <div className="home bg-gray-200 pb-10">
      <HeroCarousel />
      
      <div className="max-w-[1500px] mx-auto z-10 relative -mt-60 px-4 space-y-6">
         
         {/* Row 1: Overlap Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {row1Cards.map(card => (
                <HomeCard key={card.id} {...card} />
            ))}
         </div>

         {/* New Arrivals - Real Data from Admin Panel */}
         {realProducts.length > 0 && (
            <ProductCarouselRow title="New Arrivals" products={realProducts} />
         )}

         {/* Row 2: Standard Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {row2Cards.map(card => (
                <HomeCard key={card.id} {...card} />
            ))}
         </div>

         {/* Row 3: Holiday Carousel */}
         <ProductCarouselRow title="Holiday Specials" products={holidayData} />

         {/* Row 4: Standard Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {row4Cards.map(card => (
                <HomeCard key={card.id} {...card} />
            ))}
         </div>

         {/* Row 5: Books Carousel */}
         <ProductCarouselRow title="Top Sellers in Books" products={booksData} />

         {/* Row 6: Standard Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {row6Cards.map(card => (
                <HomeCard key={card.id} {...card} />
            ))}
         </div>

         {/* Row 7: Standard Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {row7Cards.map(card => (
                <HomeCard key={card.id} {...card} />
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
