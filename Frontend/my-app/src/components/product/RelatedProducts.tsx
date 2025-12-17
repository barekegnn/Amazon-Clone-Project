import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProviderCategoryProducts } from '../../services/catalogApi';
import { Product } from '../../types/product';
import { Star } from 'lucide-react';

// Import local assets for reliability
import electronicsImg from '../../assets/products/electronics/electronics.jpg';
import laptopImg from '../../assets/products/electronics/laptop.jpg';
import monitorImg from '../../assets/products/pc/desktop.jpg'; 
import smartwatchImg from '../../assets/products/electronics/smartwatch.jpg';

interface RelatedProductsProps {
  category: string;
  currentProductId: string | number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, currentProductId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback mock using LOCAL images
  const mockRelated: Product[] = [
      { 
          id: 10, title: "SanDisk SSD PLUS 1TB Internal SSD", price: 109, description: "", category: "electronics", 
          image: electronicsImg, 
          rating: { rate: 2.9, count: 470 } 
      },
      { 
          id: 12, title: "WD 4TB Gaming Drive Works with Playstation 4", price: 114, description: "", category: "electronics", 
          image: laptopImg, // Using available assets
          rating: { rate: 4.8, count: 400 } 
      },
      { 
          id: 14, title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor", price: 999.99, description: "", category: "electronics", 
          image: monitorImg, 
          rating: { rate: 2.2, count: 140 } 
      },
       { 
          id: 15, title: "Smart Watch for Men Women", price: 49.99, description: "", category: "electronics", 
          image: smartwatchImg, 
          rating: { rate: 4.2, count: 1040 } 
      },
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProviderCategoryProducts({ providerCategorySlug: category })
      .then((data: Product[]) => { 
         if (isMounted) {
             const filtered = data
                .filter(p => String(p.id) !== String(currentProductId))
                .slice(0, 4);
             setProducts(filtered);
             setLoading(false);
         }
      })
      .catch((err) => {
          console.error("Failed to load related products", err);
          if (isMounted) {
               // Use mock if API fails
              const filtered = mockRelated
                .filter(p => true) // Just return the static list for demo
                .slice(0, 4);
              setProducts(filtered);
              setLoading(false);
          }
      });

      return () => { isMounted = false; };
  }, [category, currentProductId]);

  if (loading) {
      return <div className="mt-8 text-center text-sm text-gray-500">Loading related items...</div>;
  }

  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">Products related to this item</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
             <div key={product.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                 <Link to={`/product/${product.id}`}>
                     <div className="h-40 flex items-center justify-center mb-4">
                         <img 
                            src={product.image} 
                            alt={product.title} 
                            className="max-h-full max-w-full object-contain"
                            // If local image somehow fails (unlikely), placeholder
                            onError={(e) => { e.currentTarget.src = "https://placehold.co/150x150?text=No+Image"; }}
                         />
                     </div>
                 </Link>
                 <Link to={`/product/${product.id}`} className="block mb-2 hover:text-[#C7511F] hover:underline">
                     <h3 className="text-sm font-medium line-clamp-3 leading-snug text-[#007185]">{product.title}</h3>
                 </Link>
                 <div className="flex items-center gap-1 mb-1">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                             <Star 
                                 key={i} 
                                 size={14} 
                                 className={`${i < Math.round(product.rating?.rate || 0) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`} 
                             />
                        ))}
                    </div>
                    <span className="text-xs text-[#007185]">{product.rating?.count}</span>
                 </div>
                 <div className="font-medium text-lg text-[#B12704]">${product.price.toFixed(2)}</div>
             </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
