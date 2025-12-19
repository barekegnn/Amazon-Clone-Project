import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useProductCache } from '../contexts/ProductCacheContext';
import { fetchProduct } from '../services/fakeStoreAPI';

export const useProductData = (productId: number | string) => {
  const location = useLocation();
  const { getProductById } = useProductCache();
  
  // 1. First check if product data was passed in route state
  const routeProduct = location.state?.product;
  
  // 2. Check cache
  const cachedProduct = getProductById(productId);
  
  // 3. Fallback to API call
  const { data: apiProduct, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    enabled: !routeProduct && !cachedProduct, // Only fetch if we don't have data
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  
  // Determine which product data to use (priority order)
  const product = routeProduct || cachedProduct || apiProduct;
  
  return {
    product,
    isLoading: isLoading && !routeProduct && !cachedProduct,
    error: error && !routeProduct && !cachedProduct ? error : null,
    source: routeProduct ? 'route' : cachedProduct ? 'cache' : 'api',
  };
};
