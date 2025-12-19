import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '../services/fakeStoreAPI';

interface ProductCacheContextType {
  getProductById: (id: number | string) => Product | undefined;
  preloadProduct: (product: Product) => void;
  clearCache: () => void;
}

const ProductCacheContext = createContext<ProductCacheContextType | null>(null);

export const useProductCache = () => {
  const context = useContext(ProductCacheContext);
  if (!context) throw new Error('useProductCache must be used within ProductCacheProvider');
  return context;
};

export const ProductCacheProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cache, setCache] = useState<Record<string, Product>>({});

  const getProductById = useCallback((id: number | string) => {
    return cache[id.toString()];
  }, [cache]);

  const preloadProduct = useCallback((product: Product) => {
    setCache(prev => ({
      ...prev,
      [product.id.toString()]: product
    }));
  }, []);

  const clearCache = useCallback(() => {
    setCache({});
  }, []);

  return (
    <ProductCacheContext.Provider value={{ getProductById, preloadProduct, clearCache }}>
      {children}
    </ProductCacheContext.Provider>
  );
};
