import React from 'react';
import HeroCarousel from '../components/Home/HeroCarousel';
import ProductCard from '../components/ProductCard/ProductCard';

const Home = () => {
    // Dummy Data
    const products = [
        {
            id: "12321341",
            title: "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
            price: 11.96,
            rating: 5,
            image: "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
        },
        {
            id: "49538094",
            title: "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
            price: 239.00,
            rating: 4,
            image: "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
        }
    ];

  return (
    <div className="home bg-gray-100">
      <HeroCarousel />
      
      <div className="max-w-[1500px] mx-auto z-10 relative -mt-32 px-2.5">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(item => (
                <ProductCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    image={item.image}
                />
            ))}
         </div>
         <div className="h-10"></div>
      </div>
    </div>
  );
};

export default Home;
