import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import Placeholder from './pages/Placeholder';
import SearchResults from './pages/SearchResults';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="app__main">
        <Outlet />
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
          <Route path="*" element={<Placeholder pageTitle="Page Not Found" />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
