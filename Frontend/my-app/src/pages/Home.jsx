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
                { label: "Headsets", image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop" },
                { label: "Keyboards", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop" },
                { label: "Mice", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop" },
                { label: "Chairs", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop" }
            ]
        },
        {
            id: 'r1-2', title: "Deals in PCs", linkText: "Shop now", variant: "single",
            data: { image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop" }
        },
        {
            id: 'r1-3', title: "Refresh your space", linkText: "See more", variant: "quad",
            data: [
                { label: "Dining", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop" },
                { label: "Home", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop" },
                { label: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop" },
                { label: "Health", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=400&fit=crop" }
            ]
        },
        {
            id: 'r1-4', title: "Toys & Games", linkText: "Shop now", variant: "single",
            data: { image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop" }
        }
    ];

    // Row 2 Data (Standard Grid)
    const row2Cards = [
        {
             id: 'r2-1', title: "Amazon Basics", linkText: "See more", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop" }
        },
        {
             id: 'r2-2', title: "Electronics", linkText: "See more", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop" }
        },
        {
             id: 'r2-3', title: "Home & Kitchen", linkText: "Shop now", variant: "quad",
             data: [
                { label: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop" },
                { label: "Decor", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop" },
                { label: "Bedding", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop" },
                { label: "Towers", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop" }
             ]
        },
        {
             id: 'r2-4', title: "Beauty Picks", linkText: "Shop now", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" }
        }
    ];

    // Row 3 Data (Product Carousel - Holiday)
    const holidayData = [
        { id: 'h-1', title: 'Holiday Ornaments', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=200&h=200&fit=crop' },
        { id: 'h-2', title: 'Gift Sets', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop' },
        { id: 'h-3', title: 'Holiday Lights', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=200&h=200&fit=crop' },
        { id: 'h-4', title: 'Wreaths', image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=200&h=200&fit=crop' },
        { id: 'h-5', title: 'Holiday Candles', image: 'https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=200&h=200&fit=crop' },
        { id: 'h-6', title: 'Gift Wrap', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&h=200&fit=crop' },
        { id: 'h-7', title: 'Stockings', image: 'https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?w=200&h=200&fit=crop' },
        { id: 'h-8', title: 'Holiday Mugs', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop' },
        { id: 'h-9', title: 'Snow Globes', image: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=200&h=200&fit=crop' },
        { id: 'h-10', title: 'Holiday Treats', image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=200&h=200&fit=crop' },
    ];

     // Row 4 Data (Standard Grid)
     const row4Cards = [
        {
             id: 'r4-1', title: "Easy Returns", linkText: "Learn more", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=400&fit=crop" }
        },
        {
             id: 'r4-2', title: "Discover Fashion", linkText: "See more", variant: "quad",
             data: [
                { label: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop" },
                { label: "Tops", image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=400&fit=crop" },
                { label: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop" },
                { label: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop" }
             ]
        },
        {
             id: 'r4-3', title: "Fitness Needs", linkText: "Shop now", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop" }
        },
        {
             id: 'r4-4', title: "Kindle E-readers", linkText: "Shop now", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=400&fit=crop" }
        }
    ];

    // Row 5 Data (Product Carousel - Books)
    const booksData = [
        { id: 'b-1', title: 'Fiction Bestseller', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop' },
        { id: 'b-2', title: 'Mystery Novel', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop' },
        { id: 'b-3', title: 'Self Help', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=200&fit=crop' },
        { id: 'b-4', title: 'Cookbook', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop' },
        { id: 'b-5', title: 'Biography', image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=200&h=200&fit=crop' },
        { id: 'b-6', title: 'Science Fiction', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=200&fit=crop' },
        { id: 'b-7', title: 'Travel Guide', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop' },
        { id: 'b-8', title: 'Business Book', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=200&h=200&fit=crop' },
        { id: 'b-9', title: 'Art Book', image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=200&h=200&fit=crop' },
        { id: 'b-10', title: 'Children\'s Book', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop' },
    ];

    // Row 6 Data (Standard Grid)
    const row6Cards = [
        {
             id: 'r6-1', title: "Shop Laptops", linkText: "See more", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop" }
        },
        {
             id: 'r6-2', title: "Health & Care", linkText: "Shop now", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop" }
        },
        {
             id: 'r6-3', title: "Strip Lights", linkText: "Shop now", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&h=400&fit=crop" }
        },
        {
             id: 'r6-4', title: "New Toys", linkText: "See more", variant: "quad",
             data: [
                { label: "Action Figures", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop" },
                { label: "Dolls", image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop" },
                { label: "Bikes & Ride-ons", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
                { label: "Arts & Crafts", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop" }
             ]
        }
    ];

    // Row 7 Data (Standard Grid)
    const row7Cards = [
        {
             id: 'r7-1', title: "Pet Supplies", linkText: "Shop now", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop" }
        },
        {
             id: 'r7-2', title: "Smartwatches", linkText: "Shop now", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop" }
        },
        {
             id: 'r7-3', title: "Deals on Tools", linkText: "Shop now", variant: "single",
             data: { image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop" }
        },
        {
             id: 'r7-4', title: "Gardening", linkText: "See more", variant: "quad",
             data: [
                { label: "Outdoor Decor", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop" },
                { label: "Furniture", image: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=400&h=400&fit=crop" },
                { label: "Lawn Care", image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=400&fit=crop" },
                { label: "Gardening", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop" }
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
