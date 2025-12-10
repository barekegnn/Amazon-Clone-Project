import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import BuyBox from '../components/ProductDetail/BuyBox';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API Fetch
        setLoading(true);
        const timer = setTimeout(() => {
            // Mock data - in real app, fetch based on ID
            setProduct({
                id: id,
                title: "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
                price: 11.96,
                rating: 5,
                image: "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
                description: "Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched. Eric Ries defines a startup as an organization dedicated to creating something new under conditions of extreme uncertainty. This is just as true for one person in a garage or a group of seasoned professionals in a Fortune 500 boardroom. What they have in common is a mission to penetrate that fog of uncertainty to discover a successful path to a sustainable business. The Lean Startup approach fosters companies that are both more capital efficient and that leverage human creativity more effectively. Inspired by lessons from lean manufacturing, it relies on 'validated learning,' rapid scientific experimentation, as well as a number of counter-intuitive practices that shorten product development cycles, measure actual progress without resorting to vanity metrics, and learn what customers really want. It enables a company to shift directions with agility, altering plans inch by inch, minute by minute. Rather than wasting time creating elaborate business plans, The Lean Startup offers entrepreneurs-in-companies of all sizes a way to test their vision continuously, to adapt and adjust before it's too late. Ries provides a scientific approach to creating and managing successful startups in a age when companies need to innovate more than ever.",
                author: "Eric Ries",
                ratings_count: "12,492",
            });
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazonclone-orange"></div>
            </div>
        );
    }

    if (!product) return <div>Product not found</div>;

    return (
        <div className="bg-white min-h-screen pb-10">
             {/* Breadcrumb / Top Bar placeholder */}
             <div className="bg-gray-100 py-1 px-4 text-xs text-gray-500 mb-4">
                 Back to results
             </div>

             <div className="max-w-[1500px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-8">
                
                {/* Col 1: Images (Left - 4 cols wide on large) */}
                <div className="lg:col-span-4 flex gap-4 sticky top-24 h-fit">
                    <div className="flex flex-col gap-2">
                         {/* Thumbnails */}
                         {[1,2,3].map(i => (
                             <div key={i} className="border border-gray-300 rounded-md p-1 hover:shadow-md cursor-pointer w-10 h-14 flex items-center justify-center">
                                 <img src={product.image} className="max-h-full max-w-full object-contain" />
                             </div>
                         ))}
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img src={product.image} alt={product.title} className="max-h-[500px] object-contain" />
                    </div>
                </div>

                {/* Col 2: Info (Middle - 4 cols wide on large) */}
                <div className="lg:col-span-4">
                    <h1 className="text-2xl font-medium text-gray-900 mb-1">{product.title}</h1>
                    <div className="text-sm text-gray-600 mb-2">by <a href="#" className="text-blue-600 hover:underline">{product.author}</a></div>
                    
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-500">
                           {Array(5).fill().map((_, i) => (
                               <Star key={i} size={16} className={`${i < product.rating ? "fill-[#F5C518] text-[#F5C518]" : "text-gray-300"}`} />
                           ))}
                        </div>
                        <span className="text-blue-600 hover:underline text-sm">{product.ratings_count} ratings</span>
                    </div>

                    <div className="border-t border-b border-gray-200 py-4 my-4">
                         <span className="text-sm font-bold text-gray-700">Paperback</span>
                         <div className="text-lg font-bold text-[#B12704]">$ {product.price}</div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold mb-2">About this item</h3>
                        <p className="text-sm leading-relaxed text-gray-800">{product.description}</p>
                    </div>
                </div>

                {/* Col 3: Buy Box (Right - 2 cols wide on large) */}
                <div className="lg:col-span-2">
                    <BuyBox product={product} />
                </div>

             </div>
        </div>
    );
};

export default ProductDetail;
