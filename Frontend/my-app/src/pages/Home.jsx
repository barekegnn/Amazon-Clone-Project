import React from 'react';
import HeroCarousel from '../components/HeroCarousel/HeroCarousel';
import HomepageContent from '../components/HomepageContent/HomepageContent';

const Home = () => {
  return (
    <div className="home">
      <HeroCarousel />
      <HomepageContent />
    </div>
  );
};

export default Home;
