import React, { useState, useEffect, useCallback } from 'react';
import './HeroCarousel.css';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/assets/carousel/10001.jpg',
    alt: 'Amazon hero banner one',
  },
  {
    id: 2,
    image: '/assets/carousel/10002.jpg',
    alt: 'Amazon hero banner two',
  },
  {
    id: 3,
    image: '/assets/carousel/10003.jpg',
    alt: 'Amazon hero banner three',
  },
  {
    id: 4,
    image: '/assets/carousel/10004.jpg',
    alt: 'Amazon hero banner four',
  },
  {
    id: 5,
    image: '/assets/carousel/10005.jpg',
    alt: 'Amazon hero banner five',
  },
];

const PROMO_CARDS = [
  {
    id: 'sign-in',
    title: 'Sign in for the best experience',
    image: '/assets/promos/promo1.png',
    imageAlt: 'Customer signing in on Amazon',
    ctaLabel: 'Sign in securely',
    href: '/login',
    variant: 'button',
  },
  {
    id: 'deals',
    title: 'Deals under $25',
    image: '/assets/promos/promo2.png',
    imageAlt: 'Selection of Amazon deals under $25',
    ctaLabel: 'Shop now',
    href: '/deals',
    variant: 'link',
  },
  {
    id: 'home',
    title: 'Home essentials',
    image: '/assets/promos/promo3.png',
    imageAlt: 'Collection of home essentials on Amazon',
    ctaLabel: 'Explore home',
    href: '/home',
    variant: 'link',
  },
  {
    id: 'electronics',
    title: 'Electronics for you',
    image: '/assets/promos/promo4.png',
    imageAlt: 'Curated electronics picks on Amazon',
    ctaLabel: 'Discover more',
    href: '/electronics',
    variant: 'link',
  },
];

const slideCount = HERO_SLIDES.length;

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % slideCount),
    [],
  );

  const goToPrev = useCallback(
    () => setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount),
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(goToNext, 6000);
    return () => window.clearInterval(timer);
  }, [goToNext]);

  return (
    <section className="hero" aria-label="Featured promotions">
      <div className="hero__carousel">
        <div
          className="hero__track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <article
              className="hero__slide"
              key={slide.id}
              aria-hidden={index !== activeIndex}
            >
              <img src={slide.image} alt={slide.alt} />
              <span className="visually-hidden">{slide.alt}</span>
            </article>
          ))}
        </div>

        <div className="hero__edge hero__edge--left" aria-hidden />
        <div className="hero__edge hero__edge--right" aria-hidden />

        <button
          className="hero__control hero__control--prev"
          type="button"
          aria-label="Previous slide"
          onClick={goToPrev}
        >
          <span aria-hidden className="hero__controlIcon">❮</span>
        </button>
        <button
          className="hero__control hero__control--next"
          type="button"
          aria-label="Next slide"
          onClick={goToNext}
        >
          <span aria-hidden className="hero__controlIcon">❯</span>
        </button>

        <div className="hero__dots" role="tablist" aria-label="Featured promotions">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero__dot${index === activeIndex ? ' hero__dot--active' : ''}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="hero__fadeBottom" aria-hidden />

      <div className="hero__promos">
        {PROMO_CARDS.map((promo) => (
          <div className="hero__promoCard" key={promo.id}>
            <figure className="hero__promoImage">
              <img src={promo.image} alt={promo.imageAlt} />
            </figure>
            <h3>{promo.title}</h3>
            {promo.variant === 'button' ? (
              <a className="hero__promoButton" href={promo.href}>
                {promo.ctaLabel}
              </a>
            ) : (
              <a href={promo.href} className="hero__promoLink">
                {promo.ctaLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
