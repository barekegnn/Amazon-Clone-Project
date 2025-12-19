import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { DemoBanner } from './components/debug/DemoBanner';

// Eager load critical pages
import Home from './pages/Home';

// Lazy load other pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Placeholder = lazy(() => import('./pages/Placeholder'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Features = lazy(() => import('./pages/Features'));

import { Skeleton } from './components/common/Skeleton';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const FullPageLoader = () => (
  <div className="p-8 max-w-[1500px] mx-auto">
    <Skeleton variant="text" width="60%" height={40} className="mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       <Skeleton variant="rectangular" height={300} />
       <Skeleton variant="rectangular" height={300} />
       <Skeleton variant="rectangular" height={300} />
       <Skeleton variant="rectangular" height={300} />
    </div>
  </div>
);

const Layout = () => {
  return (
    <>
      <DemoBanner />
      <Header />
      <main className="app__main min-h-screen">
        <ErrorBoundary>
            <Suspense fallback={<FullPageLoader />}>
                <Outlet />
            </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="register" element={<Register />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="category/*" element={<CategoryPage />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="features" element={<Features />} />
          
          {/* Specific Placeholder Routes for Header/Nav Links */}
          <Route path="orders" element={<Placeholder pageTitle="Your Orders" />} />
          <Route path="account" element={<Placeholder pageTitle="Your Account" />} />
          <Route path="recommendations" element={<Placeholder pageTitle="Recommendations" />} />
          <Route path="watchlist" element={<Placeholder pageTitle="Watchlist" />} />
          <Route path="music" element={<Placeholder pageTitle="Music Library" />} />
          <Route path="deals" element={<Placeholder pageTitle="Today's Deals" />} />
          <Route path="prime-video" element={<Placeholder pageTitle="Prime Video" />} />
          <Route path="registry" element={<Placeholder pageTitle="Registry" />} />
          <Route path="gift-cards" element={<Placeholder pageTitle="Gift Cards" />} />
          <Route path="customer-service" element={<Placeholder pageTitle="Customer Service" />} />
          <Route path="sell" element={<Placeholder pageTitle="Sell on Amazon" />} />
          <Route path="gp/delivery/ajax/address-change.html" element={<Placeholder pageTitle="Change Address" />} />
          <Route path="gp/customer-preferences/select-language" element={<Placeholder pageTitle="Select Language" />} />
          <Route path="department/:id" element={<Placeholder pageTitle="Department" />} />

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={
          <Suspense fallback={<div className="p-10 flex justify-center">Loading...</div>}>
            <Login />
          </Suspense>
        } />
      </Routes>
    </div>
  );
};

export default App;
