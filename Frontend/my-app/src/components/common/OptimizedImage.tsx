import React, { useState } from 'react';
import { Skeleton } from './Skeleton';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderHeight?: number | string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  placeholderHeight = 200,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {(!isLoaded && !hasError) && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={placeholderHeight} 
          className="absolute inset-0 z-10"
        />
      )}
      
      <img
        src={hasError ? 'https://placehold.co/300x300?text=No+Image' : src}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
            setHasError(true);
            setIsLoaded(true); // Stop showing skeleton on error
        }}
        loading="lazy"
        {...props}
      />
    </div>
  );
};
