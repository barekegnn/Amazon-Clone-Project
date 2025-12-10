import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const HeroCarousel = () => {
    return (
        <div className="relative w-full z-0 max-w-[1500px] mx-auto">
             <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
             >
                <div>
                     <img loading="lazy" src="/assets/carousel/10001.jpg" alt="Kitchen Favorites" />
                </div>
                <div>
                     <img loading="lazy" src="/assets/carousel/10002.jpg" alt="Shop Toys" />
                </div>
                <div>
                     <img loading="lazy" src="/assets/carousel/10003.jpg" alt="Beauty Picks" />
                </div>
                <div>
                    <img loading="lazy" src="/assets/carousel/10004.jpg" alt="New Arrivals" />
                </div>
             </Carousel>
             <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
        </div>
    );
};

export default HeroCarousel;
