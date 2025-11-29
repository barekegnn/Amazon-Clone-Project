import React from 'react';
import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';

const Home = () => {
  return (
    <div className="home">
      <HeroCarousel />
      <CategoryGrid />
    </div>
  );
};

export default Home;
