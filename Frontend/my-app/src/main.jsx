import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/common/Toast';
import { AuthProvider } from './context/AuthContextAPI'; // Using Backend API
import ErrorBoundary from './ErrorBoundary';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductCacheProvider } from './contexts/ProductCacheContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <QueryClientProvider client={queryClient}>
                <ProductCacheProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </ProductCacheProvider>
              </QueryClientProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);

