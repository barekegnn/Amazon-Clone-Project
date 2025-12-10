import React from 'react';

const DEALS_PROMO_CARDS = [
  {
    id: 'deals-on-fashion',
    title: 'Deals on Fashion',
    href: '/deals-on-fashion',
    items: [
      {
        label: 'Up to 50% off',
        image: '/assets/deals-on-fashion/product_01.jpg',
        href: '/deals-on-fashion-store',
      },
      {
        label: 'Up to 40% off',
        image: '/assets/deals-on-fashion/product_02.jpg',
        href: '/deals-on-fashion-store',
      },
      {
        label: 'Up to 30% off',
        image: '/assets/deals-on-fashion/product_03.jpg',
        href: '/deals-on-fashion-store',
      },
      {
        label: 'Up to 60% off',
        image: '/assets/deals-on-fashion/product_04.jpg',
        href: '/deals-on-fashion-store',
      },
    ],
  },
  {
    id: 'new-home-arrivals',
    title: 'New home arrivals under $50',
    href: '/new-home-arrivals-under-50',
    items: [
      {
        label: 'Kitchen',
        image: '/assets/new-home-arrivals-under--50/product_01.jpg',
        href: '/new-home-arrivals-under-50-store',
      },
      {
        label: 'Home décor',
        image: '/assets/new-home-arrivals-under--50/product_02.jpg',
        href: '/new-home-arrivals-under-50-store',
      },
      {
        label: 'Home improvement',
        image: '/assets/new-home-arrivals-under--50/product_03.jpg',
        href: '/new-home-arrivals-under-50-store',
      },
      {
        label: 'Patio, lawn & garden',
        image: '/assets/new-home-arrivals-under--50/product_04.jpg',
        href: '/new-home-arrivals-under-50-store',
      },
    ],
  },
  {
    id: 'save-more-on-deals',
    title: 'Save more on deals',
    href: '/save-more-on-deals',
    items: [
      {
        label: 'Up to 40% off',
        image: '/assets/save-more-on-deals/product_01.jpg',
        href: '/save-more-on-deals-store',
      },
      {
        label: 'Up to 30% off',
        image: '/assets/save-more-on-deals/product_02.jpg',
        href: '/save-more-on-deals-store',
      },
      {
        label: 'Up to 50% off',
        image: '/assets/save-more-on-deals/product_03.jpg',
        href: '/save-more-on-deals-store',
      },
      {
        label: 'Up to 25% off',
        image: '/assets/save-more-on-deals/product_04.jpg',
        href: '/save-more-on-deals-store',
      },
    ],
  },
  {
    id: 'elevate-your-electronics',
    title: 'Elevate your electronics',
    href: '/elevate-your-electronics',
    items: [
      {
        label: 'Up to 35% off',
        image: '/assets/elevate-your-electronics/product_01.jpg',
        href: '/elevate-your-electronics-store',
      },
      {
        label: 'Up to 20% off',
        image: '/assets/elevate-your-electronics/product_02.jpg',
        href: '/elevate-your-electronics-store',
      },
      {
        label: 'Up to 45% off',
        image: '/assets/elevate-your-electronics/product_03.jpg',
        href: '/elevate-your-electronics-store',
      },
      {
        label: 'Up to 50% off',
        image: '/assets/elevate-your-electronics/product_04.jpg',
        href: '/elevate-your-electronics-store',
      },
    ],
  },
];

const DealsPromo = () => {
  return (
    <section className="p-8" aria-labelledby="deals-promo-heading">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-auto-fit-300 gap-6">
          {DEALS_PROMO_CARDS.map((card) => (
            <article className="bg-white p-6 rounded-md" key={card.id}>
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {card.items.map((item) => (
                  <a className="no-underline text-gray-900" href={item.href} key={item.label}>
                    <figure className="m-0 overflow-hidden rounded-md">
                      <img src={item.image} alt={item.label} className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
                    </figure>
                    <span className="block mt-2 text-sm">{item.label}</span>
                  </a>
                ))}
              </div>
              <a className="inline-block mt-4 text-sm text-blue-700 no-underline hover:underline" href={card.href}>
                See more
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsPromo;
