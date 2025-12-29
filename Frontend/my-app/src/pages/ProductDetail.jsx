import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Check, ShieldCheck, Truck } from 'lucide-react';
import { fetchProduct } from '../services/fakeStoreAPI';
import BuyBox from '../components/ProductDetail/BuyBox'; // Assuming BuyBox is styled appropriately

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const data = await fetchProduct(id);
                setProduct(data);
                setActiveImage(data.image); // Set the main image on load
            } catch (err) {
                setError('Failed to fetch product details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getProduct();
        }
    }, [id]);

    // Main image gallery component
    const renderImageGallery = () => (
        <div className="lg:col-span-3 flex flex-col items-center sticky top-28 h-fit">
            <div className="w-full h-[400px] flex items-center justify-center mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <img 
                    src={activeImage} 
                    alt={product.title} 
                    className="max-h-full max-w-full object-contain p-4"
                />
            </div>
            {/* Thumbnails - Can be expanded if API provides more images */}
            {/* <div className="flex gap-2">
                {[product.image, ...].map(img => (
                    <div 
                        key={img} 
                        className={`w-16 h-16 border rounded-md p-1 cursor-pointer ${activeImage === img ? 'border-amazonclone-yellow' : 'border-gray-300'}`}
                        onMouseEnter={() => setActiveImage(img)}
                    >
                        <img src={img} className="max-h-full max-w-full object-contain" />
                    </div>
                ))}
            </div> */}
        </div>
    );

    // Product information component
    const renderProductInfo = () => (
        <div className="lg:col-span-5">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-700 mr-2">{product.rating.rate}</span>
                    <div className="flex text-yellow-400">
                        {Array(5).fill().map((_, i) => (
                            <Star 
                                key={i} 
                                size={18} 
                                className={`${i < Math.round(product.rating.rate) ? "fill-current" : "text-gray-300"}`} 
                            />
                        ))}
                    </div>
                </div>
                <span className="text-blue-600 hover:underline text-sm cursor-pointer">{product.rating.count} ratings</span>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="text-3xl font-bold text-red-700">${product.price.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                    Typical price: <span className="line-through">${(product.price * 1.15).toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Product Description</h3>
                <p className="text-base leading-relaxed text-gray-700">{product.description}</p>
            </div>
        </div>
    );
    
    // Right-side BuyBox column
    const renderBuyBox = () => (
        <div className="lg:col-span-2">
            <BuyBox product={product} />
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amazonclone-yellow"></div>
            </div>
        );
    }

    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-10">Product not found.</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
             <div className="border-b bg-white shadow-sm">
                 <div className="max-w-7xl mx-auto py-2 px-4 text-sm text-gray-500">
                     <Link to="/" className="hover:text-red-700 hover:underline">Back to results</Link>
                     <span className="mx-2">|</span>
                     <span className="font-semibold text-gray-700 capitalize">{product.category}</span>
                 </div>
             </div>

             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                    {renderImageGallery()}
                    {renderProductInfo()}
                    {renderBuyBox()}
                </div>
             </main>
        </div>
    );
};

export default ProductDetail;
