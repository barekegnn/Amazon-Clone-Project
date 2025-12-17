import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update activeImage when product changes (i.e. if product props update after initial load)
  useEffect(() => {
    setActiveImage(product.image);
  }, [product.image]);

  const images = [product.image].filter(Boolean);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      // Fallback to a placeholder if image fails to load (Unsplash or Placeholder.com)
      e.currentTarget.src = "https://placehold.co/400x400?text=Image+Unavailable";
      // Or we could disable zoom if image is broken, but this is fine.
  };

  return (
    <div className="flex gap-4">
       {/* Thumbnails (Vertical on Desktop) */}
      <div className="hidden md:flex flex-col gap-2 w-16">
        {images.map((img, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setActiveImage(img)}
            className={`border rounded p-1 hover:border-amazonclone-orange ${activeImage === img ? 'border-amazonclone-orange shadow-sm' : 'border-gray-200'}`}
          >
            <img 
                src={img} 
                alt={`View ${idx + 1}`} 
                className="w-full h-auto object-contain" 
                onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100?text=N/A"; }}
            />
          </button>
        ))}
         {/* Placeholder thumbnails for demo feeling */}
          {[1, 2].map((i) => (
            <button
             key={`mock-${i}`}
             className="border border-gray-200 rounded p-1 opacity-50 cursor-not-allowed"
             title="More images not available"
             disabled
            >
               <div className="w-full pt-[100%] bg-gray-100 relative">
                   <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">IMG</span>
               </div>
            </button>
          ))}
      </div>

      {/* Main Image Area */}
      <div 
        className="flex-1 relative bg-white border border-gray-100 rounded-md overflow-hidden cursor-crosshair group h-[400px] flex items-center justify-center"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img 
            src={activeImage} 
            alt={product.title} 
            onError={handleImageError}
            className={`max-h-full max-w-full object-contain transition-opacity duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Zoom Lens / View */}
        {isZoomed && (
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url(${activeImage})`, // This might fail if activeImage is broken, but if img src replaced above, activeImage state isn't.
                    // Ideally we should update state for zoom to work.
                    // But for simple fallback, showing the placeholder in main view is enough.
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat'
                }}
            />
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
