import React, { useRef } from 'react';

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
    <section className="px-6 pb-10 md:px-4 md:pb-9" aria-labelledby="holiday-specials-heading">
      <div className="max-w-[1500px] mx-auto bg-white rounded-md p-4 pb-7 shadow-md">
        <header className="flex items-baseline justify-between gap-4 mb-4">
          <h2 id="holiday-specials-heading" className="m-0 text-xl text-gray-900">Here come Holiday Specials</h2>
          <a href="/holiday" className="text-blue-700 text-sm no-underline font-semibold hover:text-amazonclone-orange hover:underline">
            Explore now
          </a>
        </header>

        <div className="relative flex items-center">
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 border-none bg-white shadow-lg cursor-pointer flex items-center justify-center rounded-full text-2xl text-gray-900 transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-amazonclone-orange z-10 left-0 md:w-10 md:h-10 md:text-xl"
            aria-label="Scroll holiday deals backward"
            onClick={() => scrollRail('prev')}
          >
            ❮
          </button>

          <ul className="grid auto-cols-[150px] grid-flow-col gap-4 overflow-x-auto py-2 pb-3 scroll-smooth scrollbar-hide" ref={railRef}>
            {HOLIDAY_DEALS.map((deal) => (
              <li className="list-none text-center" key={deal.id}>
                <a href={deal.href} className="flex flex-col items-center gap-2 no-underline text-gray-900 text-sm font-medium hover:text-amazonclone-orange">
                  <figure className="m-0 w-[130px] h-[130px] rounded-full bg-amazonclone-green flex items-center justify-center overflow-hidden">
                    <img src={deal.image} alt={deal.label} loading="lazy" className="w-[82%] h-[82%] object-contain" />
                  </figure>
                  <span>{deal.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 border-none bg-white shadow-lg cursor-pointer flex items-center justify-center rounded-full text-2xl text-gray-900 transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-amazonclone-orange z-10 right-0 md:w-10 md:h-10 md:text-xl"
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
