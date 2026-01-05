import React, { useState, useEffect, useCallback } from 'react';

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
    id: 'holiday-deals',
    title: 'Holiday Deals',
    image: '/assets/holiday-specials/holiday deals.png',
    imageAlt: 'Amazon holiday deals',
    ctaLabel: 'Shop all deals',
    href: '/holiday-deals',
    variant: 'link',
  },
  {
    id: 'toys-list',
    title: 'Holiday Toy List',
    image: '/assets/holiday-specials/holiday toys list.png',
    imageAlt: 'Amazon holiday toy list',
    ctaLabel: 'Shop now',
    href: '/toys',
    variant: 'link',
  },
  {
    id: 'fashion-deals',
    title: 'Deals on Fashion',
    image: '/assets/holiday-specials/deals on fashion.png',
    imageAlt: 'Fashion deals on Amazon',
    ctaLabel: 'See more',
    href: '/fashion-deals',
    variant: 'link',
  },
  {
    id: 'gifts-under-50',
    title: 'Gifts under $50',
    image: '/assets/holiday-specials/deals under $50.png',
    imageAlt: 'Gifts under $50 on Amazon',
    ctaLabel: 'Shop all',
    href: '/gifts-under-50',
    variant: 'link',
  },
  {
    id: 'sign-in-experience',
    title: 'Sign in for the best experience',
    image: '/assets/promos/promo1.png',
    imageAlt: 'Customer signing in on Amazon',
    ctaLabel: 'Sign in securely',
    href: '/login',
    variant: 'button',
  },
  {
    id: 'electronics-gift-guide',
    title: 'Electronics Gift Guide',
    image: '/assets/holiday-specials/electronics gift guide.png',
    imageAlt: 'Amazon electronics gift guide',
    ctaLabel: 'Find your gifts',
    href: '/electronics-gift-guide',
    variant: 'link',
  },
  {
    id: 'holiday-fashion',
    title: 'Holiday Fashion',
    image: '/assets/holiday-specials/hodiday fashion.png',
    imageAlt: 'Holiday fashion on Amazon',
    ctaLabel: 'Discover now',
    href: '/holiday-fashion',
    variant: 'link',
  },
  {
    id: 'most-loved',
    title: 'Most loved gifts',
    image: '/assets/holiday-specials/most loved.png',
    imageAlt: 'Most loved gifts on Amazon',
    ctaLabel: 'Shop now',
    href: '/most-loved',
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
    <section className="relative bg-gray-200 overflow-hidden flex flex-col pb-8" aria-label="Featured promotions">
      <div className="relative w-full max-w-[1500px] mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-600 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <article
              className="min-w-full relative"
              key={slide.id}
              aria-hidden={index !== activeIndex}
            >
              <img src={slide.image} alt={slide.alt} className="w-full block h-[600px] object-cover pointer-events-none md:h-[480px] sm:h-[360px] xs:h-[260px]" />
              <span className="sr-only">{slide.alt}</span>
            </article>
          ))}
        </div>

        <div className="absolute top-0 bottom-0 w-[12%] max-w-[160px] pointer-events-none z-20 left-0 bg-gradient-to-r from-gray-200 to-transparent" aria-hidden />
        <div className="absolute top-0 bottom-0 w-[12%] max-w-[160px] pointer-events-none z-20 right-0 bg-gradient-to-l from-gray-200 to-transparent" aria-hidden />

        <button
          className="absolute top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm border border-white/40 w-15 h-24 cursor-pointer flex items-center justify-center text-white z-30 transition-colors duration-200 hover:bg-black/35 sm:hidden left-10"
          type="button"
          aria-label="Previous slide"
          onClick={goToPrev}
        >
          <span aria-hidden className="text-4xl leading-none">❮</span>
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-sm border border-white/40 w-15 h-24 cursor-pointer flex items-center justify-center text-white z-30 transition-colors duration-200 hover:bg-black/35 sm:hidden right-10"
          type="button"
          aria-label="Next slide"
          onClick={goToNext}
        >
          <span aria-hidden className="text-4xl leading-none">❯</span>
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-30" role="tablist" aria-label="Featured promotions">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`w-2.5 h-2.5 rounded-full bg-white/50 border border-black/20 cursor-pointer ${index === activeIndex ? 'bg-amazonclone-yellow border-amazonclone-orange' : ''}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-gray-200 via-gray-200/20 to-transparent z-20" aria-hidden />

      <div className="relative -mt-55 z-40 grid grid-cols-auto-fit-260 gap-4.5 px-8 md:mt-[-120px] sm:mt-4 sm:px-4 xs:grid-cols-1">
        {PROMO_CARDS.slice(0, 4).map((promo) => (
          <div className="bg-white p-4 min-h-[340px] shadow-lg rounded-md flex flex-col gap-3" key={promo.id}>
            <figure className="m-0 flex-1 flex items-center justify-center">
              <img src={promo.image} alt={promo.imageAlt} className="max-w-full h-auto object-contain" />
            </figure>
            <h3 className="m-0 text-xl text-gray-900">{promo.title}</h3>
            {promo.variant === 'button' ? (
              <a className="inline-block bg-gradient-to-b from-yellow-200 to-yellow-500 border border-yellow-700 rounded-md py-2 text-center font-semibold text-gray-900 no-underline hover:from-yellow-300 hover:to-yellow-600" href={promo.href}>
                {promo.ctaLabel}
              </a>
            ) : (
              <a href={promo.href} className="text-blue-700 no-underline font-semibold hover:text-orange-700 hover:underline">
                {promo.ctaLabel}
              </a>
            )}
          </div>
        ))}
      </div>
      <div className="relative -mt-55 z-40 grid grid-cols-auto-fit-260 gap-4.5 px-8 md:mt-[-120px] sm:mt-4 sm:px-4 xs:grid-cols-1 mt-5">
        {PROMO_CARDS.slice(4, 8).map((promo) => (
          <div className="bg-white p-4 min-h-[340px] shadow-lg rounded-md flex flex-col gap-3" key={promo.id}>
            <figure className="m-0 flex-1 flex items-center justify-center">
              <img src={promo.image} alt={promo.imageAlt} className="max-w-full h-auto object-contain" />
            </figure>
            <h3 className="m-0 text-xl text-gray-900">{promo.title}</h3>
            {promo.variant === 'button' ? (
              <a className="inline-block bg-gradient-to-b from-yellow-200 to-yellow-500 border border-yellow-700 rounded-md py-2 text-center font-semibold text-gray-900 no-underline hover:from-yellow-300 hover:to-yellow-600" href={promo.href}>
                {promo.ctaLabel}
              </a>
            ) : (
              <a href={promo.href} className="text-blue-700 no-underline font-semibold hover:text-orange-700 hover:underline">
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
