 import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Placeholder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;