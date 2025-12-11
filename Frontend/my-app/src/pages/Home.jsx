import React from 'react';
import HeroCarousel from '../components/Home/HeroCarousel';
import HomeCard from '../components/Home/HomeCard';
import ProductCarouselRow from '../components/Home/ProductCarouselRow';

const Home = () => {
    // Row 1 Data (Overlap Grid)
    const row1Cards = [
        {
            id: 'r1-1', title: "Gaming Accessories", linkText: "See more", variant: "quad",
            data: [
                { label: "Headsets", image: "https://placehold.co/400x400?text=Headsets" },
                { label: "Keyboards", image: "https://placehold.co/400x400?text=Keyboards" },
                { label: "Mice", image: "https://placehold.co/400x400?text=Mice" },
                { label: "Chairs", image: "https://placehold.co/400x400?text=Chairs" }
            ]
        },
        {
            id: 'r1-2', title: "Deals in PCs", linkText: "Shop now", variant: "single",
            data: { image: "https://placehold.co/400x400?text=Deals+in+PCs" }
        },
        {
            id: 'r1-3', title: "Refresh your space", linkText: "See more", variant: "quad",
            data: [
                { label: "Dining", image: "https://placehold.co/400x400?text=Dining" },
                { label: "Home", image: "https://placehold.co/400x400?text=Home" },
                { label: "Kitchen", image: "https://placehold.co/400x400?text=Kitchen" },
                { label: "Health", image: "https://placehold.co/400x400?text=Health" }
            ]
        },
        {
            id: 'r1-4', title: "Toys & Games", linkText: "Shop now", variant: "single",
            data: { image: "https://placehold.co/400x400?text=Toys+%26+Games" }
        }
    ];

    // Row 2 Data (Standard Grid)
    const row2Cards = [
        {
             id: 'r2-1', title: "Amazon Basics", linkText: "See more", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Amazon+Basics" }
        },
        {
             id: 'r2-2', title: "Electronics", linkText: "See more", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Electronics" }
        },
        {
             id: 'r2-3', title: "Home & Kitchen", linkText: "Shop now", variant: "quad",
             data: [
                { label: "Kitchen", image: "https://placehold.co/400x400?text=Kitchen" },
                { label: "Decor", image: "https://placehold.co/400x400?text=Decor" },
                { label: "Bedding", image: "https://placehold.co/400x400?text=Bedding" },
                { label: "Towers", image: "https://placehold.co/400x400?text=Towers" }
             ]
        },
        {
             id: 'r2-4', title: "Beauty Picks", linkText: "Shop now", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Beauty+Picks" }
        }
    ];

    // Row 3 Data (Product Carousel - Holiday)
    const holidayData = [
        { id: 'h-1', title: 'Holiday 1', image: 'https://placehold.co/200x200?text=Holiday+1' },
        { id: 'h-2', title: 'Holiday 2', image: 'https://placehold.co/200x200?text=Holiday+2' },
        { id: 'h-3', title: 'Holiday 3', image: 'https://placehold.co/200x200?text=Holiday+3' },
        { id: 'h-4', title: 'Holiday 4', image: 'https://placehold.co/200x200?text=Holiday+4' },
        { id: 'h-5', title: 'Holiday 5', image: 'https://placehold.co/200x200?text=Holiday+5' },
        { id: 'h-6', title: 'Holiday 6', image: 'https://placehold.co/200x200?text=Holiday+6' },
        { id: 'h-7', title: 'Holiday 7', image: 'https://placehold.co/200x200?text=Holiday+7' },
        { id: 'h-8', title: 'Holiday 8', image: 'https://placehold.co/200x200?text=Holiday+8' },
        { id: 'h-9', title: 'Holiday 9', image: 'https://placehold.co/200x200?text=Holiday+9' },
        { id: 'h-10', title: 'Holiday 10', image: 'https://placehold.co/200x200?text=Holiday+10' },
    ];

     // Row 4 Data (Standard Grid)
     const row4Cards = [
        {
             id: 'r4-1', title: "Easy Returns", linkText: "Learn more", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Easy+Returns" }
        },
        {
             id: 'r4-2', title: "Discover Fashion", linkText: "See more", variant: "quad",
             data: [
                { label: "Jeans", image: "https://placehold.co/400x400?text=Jeans" },
                { label: "Tops", image: "https://placehold.co/400x400?text=Tops" },
                { label: "Dresses", image: "https://placehold.co/400x400?text=Dresses" },
                { label: "Shoes", image: "https://placehold.co/400x400?text=Shoes" }
             ]
        },
        {
             id: 'r4-3', title: "Fitness Needs", linkText: "Shop now", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Fitness" }
        },
        {
             id: 'r4-4', title: "Kindle E-readers", linkText: "Shop now", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Kindle" }
        }
    ];

    // Row 5 Data (Product Carousel - Books)
    const booksData = [
        { id: 'b-1', title: 'Book 1', image: 'https://placehold.co/200x200?text=Book+1' },
        { id: 'b-2', title: 'Book 2', image: 'https://placehold.co/200x200?text=Book+2' },
        { id: 'b-3', title: 'Book 3', image: 'https://placehold.co/200x200?text=Book+3' },
        { id: 'b-4', title: 'Book 4', image: 'https://placehold.co/200x200?text=Book+4' },
        { id: 'b-5', title: 'Book 5', image: 'https://placehold.co/200x200?text=Book+5' },
        { id: 'b-6', title: 'Book 6', image: 'https://placehold.co/200x200?text=Book+6' },
        { id: 'b-7', title: 'Book 7', image: 'https://placehold.co/200x200?text=Book+7' },
        { id: 'b-8', title: 'Book 8', image: 'https://placehold.co/200x200?text=Book+8' },
        { id: 'b-9', title: 'Book 9', image: 'https://placehold.co/200x200?text=Book+9' },
        { id: 'b-10', title: 'Book 10', image: 'https://placehold.co/200x200?text=Book+10' },
    ];

    // Row 6 Data (Standard Grid)
    const row6Cards = [
        {
             id: 'r6-1', title: "Shop Laptops", linkText: "See more", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Laptops" }
        },
        {
             id: 'r6-2', title: "Health & Care", linkText: "Shop now", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Health+Care" }
        },
        {
             id: 'r6-3', title: "Strip Lights", linkText: "Shop now", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Strip+Lights" }
        },
        {
             id: 'r6-4', title: "New Toys", linkText: "See more", variant: "quad",
             data: [
                { label: "Action Figures", image: "https://placehold.co/400x400?text=Figures" },
                { label: "Dolls", image: "https://placehold.co/400x400?text=Dolls" },
                { label: "Bikes & Ride-ons", image: "https://placehold.co/400x400?text=Bikes" },
                { label: "Arts & Crafts", image: "https://placehold.co/400x400?text=Arts" }
             ]
        }
    ];

    // Row 7 Data (Standard Grid)
    const row7Cards = [
        {
             id: 'r7-1', title: "Pet Supplies", linkText: "Shop now", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Pet+Supplies" }
        },
        {
             id: 'r7-2', title: "Smartwatches", linkText: "Shop now", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Smartwatches" }
        },
        {
             id: 'r7-3', title: "Deals on Tools", linkText: "Shop now", variant: "single",
             data: { image: "https://placehold.co/400x400?text=Tools" }
        },
        {
             id: 'r7-4', title: "Gardening", linkText: "See more", variant: "quad",
             data: [
                { label: "Outdoor Decor", image: "https://placehold.co/400x400?text=Outdoor" },
                { label: "Furniture", image: "https://placehold.co/400x400?text=Furniture" },
                { label: "Lawn Care", image: "https://placehold.co/400x400?text=Lawn" },
                { label: "Gardening", image: "https://placehold.co/400x400?text=Garden" }
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

      </div>
    </div>
  );
};

export default Home;
