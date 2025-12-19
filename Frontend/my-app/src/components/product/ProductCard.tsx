import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useProductCache } from "../../contexts/ProductCacheContext";
import type { Product } from "../../services/fakeStoreAPI";
import { AddToCartButton } from "../../components/common/AddToCartButton";
import { OptimizedImage } from "../../components/common/OptimizedImage";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { preloadProduct } = useProductCache();
  
  // Preload this product's data when component mounts
  useEffect(() => {
    preloadProduct(product);
  }, [product, preloadProduct]);

  return (
    <div className="relative flex flex-col m-2.5 p-5 bg-white z-30 max-h-[400px] min-w-[250px] flex-1">
      {/* ... keeping existing UI structure ... */}
      <div className="absolute top-2 right-2 text-gray-400 text-xs italic">
         {product.category}
      </div>

      <Link 
        to={`/product/${product.id}`}
        state={{ product }} 
        onClick={() => preloadProduct(product)}
        className="contents"
      >
        <p className="font-bold text-sm lg:text-base line-clamp-2 min-h-[40px] mb-1 leading-snug hover:text-amazonclone-orange cursor-pointer">
          {product.title}
        </p>
      </Link>
      
      <div className="flex items-center mb-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${i < (product.rating?.rate || 0) ? "fill-[#F5C518] text-[#F5C518]" : "text-gray-300"}`}
            />
          ))}
         <span className="text-xs text-blue-600 ml-1 hover:underline cursor-pointer">{product.rating?.count || 0}</span>
      </div>

      <Link 
        to={`/product/${product.id}`}
        state={{ product }}
        onClick={() => preloadProduct(product)}
        className="contents block mb-3 h-[200px]"
      >
        <OptimizedImage
          src={product.image}
          alt={product.title}
          className="w-full h-full"
          placeholderHeight={200}
        />
      </Link>

      <div className="mt-auto">
         <div className="flex items-start items-baseline mb-2">
            <span className="text-xs align-top relative top-0.5">$</span>
            <span className="text-2xl font-semibold">{Math.floor(product.price)}</span>
            <span className="text-xs align-top relative top-0.5">{String(product.price).split('.')[1] || '00'}</span>
         </div>

         <AddToCartButton 
           product={product} 
           className="mt-2 w-full bg-[#fa8900] hover:bg-[#e87b00] text-white py-1 rounded-sm text-sm"
         />
      </div>
    </div>
  );
}

export default memo(ProductCard);


