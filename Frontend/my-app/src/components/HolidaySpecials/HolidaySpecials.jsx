import React, { useRef } from 'react';
import './HolidaySpecials.css';

const createHolidayImagePath = (fileName) => `/assets/holiday-specials/${encodeURIComponent(fileName)}`;

const HOLIDAY_DEALS = [
  {
    id: 'holiday-deals',
    label: 'Holiday deals',
    image: createHolidayImagePath('holiday deals.png'),
    href: '/holiday/deals',
  },
  {
    id: 'most-loved',
    label: 'Most loved deals',
    image: createHolidayImagePath('most loved.png'),
    href: '/holiday/most-loved',
  },
  {
    id: 'deals-under-50',
    label: 'Deals under $50',
    image: createHolidayImagePath('deals under $50.png'),
    href: '/holiday/under-50',
  },
  {
    id: 'deals-on-computer',
    label: 'Deals on Computer',
    image: createHolidayImagePath('Deals on computer.png'),
    href: '/holiday/computer-deals',
  },
  {
    id: 'deals-on-fashion',
    label: 'Deals on Fashion',
    image: createHolidayImagePath('deals on fashion.png'),
    href: '/holiday/fashion-deals',
  },
  {
    id: 'deals-on-toys',
    label: 'Deals on Toys & Games',
    image: createHolidayImagePath('deals on Toys.png'),
    href: '/holiday/toys-games',
  },
  {
    id: 'gift-guides',
    label: 'Gift guides',
    image: createHolidayImagePath('gift guides.png'),
    href: '/holiday/gift-guides',
  },
  {
    id: 'electronics-gift-guide',
    label: 'Electronics gift guide',
    image: createHolidayImagePath('electronics gift guide.png'),
    href: '/holiday/electronics-gift-guide',
  },
  {
    id: 'holiday-home-decor',
    label: 'Holiday home décor',
    image: createHolidayImagePath('holiday home decore.png'),
    href: '/holiday/home-decor',
  },
];

const HolidaySpecials = () => {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    if (!railRef.current) return;
    const scrollAmount = railRef.current.clientWidth * 0.75;
    railRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="holidaySpecials" aria-labelledby="holiday-specials-heading">
      <div className="holidaySpecials__inner">
        <header className="holidaySpecials__header">
          <h2 id="holiday-specials-heading">Here come Holiday Specials</h2>
          <a href="/holiday" className="holidaySpecials__cta">
            Explore now
          </a>
        </header>

        <div className="holidaySpecials__railWrapper">
          <button
            type="button"
            className="holidaySpecials__control holidaySpecials__control--prev"
            aria-label="Scroll holiday deals backward"
            onClick={() => scrollRail('prev')}
          >
            ❮
          </button>

          <ul className="holidaySpecials__rail" ref={railRef}>
            {HOLIDAY_DEALS.map((deal) => (
              <li className="holidaySpecials__item" key={deal.id}>
                <a href={deal.href}>
                  <figure className="holidaySpecials__avatar">
                    <img src={deal.image} alt={deal.label} loading="lazy" />
                  </figure>
                  <span>{deal.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="holidaySpecials__control holidaySpecials__control--next"
            aria-label="Scroll holiday deals forward"
            onClick={() => scrollRail('next')}
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default HolidaySpecials;
