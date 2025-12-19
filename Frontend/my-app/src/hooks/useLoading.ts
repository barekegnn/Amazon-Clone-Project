import { useState, useEffect } from 'react';

export const useLoading = (isLoading: boolean, delay = 300) => {
  const [showLoading, setShowLoading] = useState(false);
  
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoading(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [isLoading, delay]);
  
  return showLoading;
};
