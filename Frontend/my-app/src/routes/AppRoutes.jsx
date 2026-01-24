import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Placeholder from '../pages/Placeholder';
import ProductDetail from '../pages/ProductDetail'; // Import ProductDetail
import CategoryPage from '../pages/CategoryPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import ErrorBoundary from '../ErrorBoundary';
import App from '../App'; // Assuming App.jsx contains the overall layout

function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<App><Home /></App>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<App><Cart /></App>} />
          <Route path="/orders" element={<App><Placeholder pageTitle="Your Orders" /></App>} />
          <Route path="/account" element={<App><Placeholder pageTitle="Your Account" /></App>} />
          <Route path="/recommendations" element={<App><Placeholder pageTitle="Recommendations" /></App>} />
          <Route path="/watchlist" element={<App><Placeholder pageTitle="Watchlist" /></App>} />
          <Route path="/music" element={<App><Placeholder pageTitle="Music Library" /></App>} />
          <Route path="/deals" element={<App><Placeholder pageTitle="Today's Deals" /></App>} />
          <Route path="/prime-video" element={<App><Placeholder pageTitle="Prime Video" /></App>} />
          <Route path="/registry" element={<App><Placeholder pageTitle="Registry" /></App>} />
          <Route path="/gift-cards" element={<App><Placeholder pageTitle="Gift Cards" /></App>} />
          <Route path="/customer-service" element={<App><Placeholder pageTitle="Customer Service" /></App>} />
          <Route path="/sell" element={<App><Placeholder pageTitle="Sell on Zon-Clone" /></App>} />
          <Route path="/gp/delivery/ajax/address-change.html" element={<App><Placeholder pageTitle="Change Address" /></App>} />
          <Route path="/gp/customer-preferences/select-language" element={<App><Placeholder pageTitle="Select Language" /></App>} />
          <Route path="/category/*" element={<App><CategoryPage /></App>} />
          <Route path="/product/:id" element={<App><ProductDetail /></App>} /> {/* New ProductDetail route */}
          {/* Catch-all for undefined routes */}
          <Route path="*" element={<App><Placeholder pageTitle="Page Not Found" /></App>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRoutes;
