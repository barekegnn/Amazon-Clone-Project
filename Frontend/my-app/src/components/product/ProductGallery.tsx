import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  // State to hold the primary image URL.
  const [activeImage, setActiveImage] = useState(product.image);

  // Effect to update the image if the product prop changes.
  useEffect(() => {
    setActiveImage(product.image);
  }, [product.image]);

  // Array of images from the product. fakeStoreAPI only provides one.
  const images = [product.image].filter(Boolean);

  // Fallback handler in case an image fails to load.
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://placehold.co/600x600?text=Image+Not+Available";
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      {/* Thumbnails Column */}
      <div className="flex md:flex-col gap-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setActiveImage(img)}
            className={`w-16 h-16 border rounded-md p-1 cursor-pointer transition-all duration-200 ${
              activeImage === img
                ? 'border-amazonclone-yellow ring-2 ring-amazonclone-yellow/50'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <img 
                src={img} 
                alt={`Thumbnail ${idx + 1}`} 
                className="w-full h-full object-contain" 
                onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100?text=N/A"; }}
            />
          </div>
        ))}
      </div>

      {/* Main Image Display */}
      <div className="flex-1 h-[400px] md:h-auto border border-gray-200 rounded-lg flex items-center justify-center bg-white p-4">
        <img 
            src={activeImage} 
            alt={product.title} 
            onError={handleImageError}
            className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
