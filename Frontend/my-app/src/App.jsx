import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Placeholder from './pages/Placeholder';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;