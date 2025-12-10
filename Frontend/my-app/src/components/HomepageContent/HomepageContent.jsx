import React from 'react';
import HolidaySpecials from '../HolidaySpecials/HolidaySpecials';
import BooksShowcase from '../BooksShowcase/BooksShowcase';
import DealsPromo from '../DealsPromo/DealsPromo';

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const createCardItems = (folder, labels, backgrounds, baseHref = `/collections/${folder}`) =>
  labels.map((label, index) => ({
    id: `${folder}-item-${index + 1}`,
    title: label,
    image: `/assets/${folder}/product_${String(index + 1).padStart(2, '0')}.jpg`,
    href: `${baseHref}/${slugify(label)}`,
    background: backgrounds[index % backgrounds.length],
  }));


const ACCENT_BACKGROUNDS = {
  amber: [
    'linear-gradient(135deg, #ffeeb3 0%, #ffc94d 100%)',
    'linear-gradient(135deg, #ffeeb3 0%, #ffc94d 100%)',
    'linear-gradient(135deg, #ffeeb3 0%, #ffc94d 100%)',
    'linear-gradient(135deg, #ffeeb3 0%, #ffc94d 100%)',
  ],
  violet: [
    'linear-gradient(135deg, #d9cffd 0%, #9174ff 100%)',
    'linear-gradient(135deg, #d9cffd 0%, #9174ff 100%)',
    'linear-gradient(135deg, #d9cffd 0%, #9174ff 100%)',
    'linear-gradient(135deg, #d9cffd 0%, #9174ff 100%)',
  ],
  sky: [
    'linear-gradient(135deg, #cfe9ff 0%, #6fb6ff 100%)',
    'linear-gradient(135deg, #cfe9ff 0%, #6fb6ff 100%)',
    'linear-gradient(135deg, #cfe9ff 0%, #6fb6ff 100%)',
    'linear-gradient(135deg, #cfe9ff 0%, #6fb6ff 100%)',
  ],
  evergreen: [
    'linear-gradient(135deg, #d8f2e2 0%, #6abf8a 100%)',
    'linear-gradient(135deg, #d8f2e2 0%, #6abf8a 100%)',
    'linear-gradient(135deg, #d8f2e2 0%, #6abf8a 100%)',
    'linear-gradient(135deg, #d8f2e2 0%, #6abf8a 100%)',
  ],
  pine: [
    'linear-gradient(135deg, #d9f0df 0%, #1f7f4c 100%)',
    'linear-gradient(135deg, #d9f0df 0%, #1f7f4c 100%)',
    'linear-gradient(135deg, #d9f0df 0%, #1f7f4c 100%)',
    'linear-gradient(135deg, #d9f0df 0%, #1f7f4c 100%)',
  ],
  ocean: [
    'linear-gradient(135deg, #dbe7ff 0%, #7f9dfc 100%)',
    'linear-gradient(135deg, #dbe7ff 0%, #7f9dfc 100%)',
    'linear-gradient(135deg, #dbe7ff 0%, #7f9dfc 100%)',
    'linear-gradient(135deg, #dbe7ff 0%, #7f9dfc 100%)',
  ],
  terracotta: [
    'linear-gradient(135deg, #ffe5d4 0%, #ffb088 100%)',
    'linear-gradient(135deg, #ffe5d4 0%, #ffb088 100%)',
    'linear-gradient(135deg, #ffe5d4 0%, #ffb088 100%)',
    'linear-gradient(135deg, #ffe5d4 0%, #ffb088 100%)',
  ],
};


const CARD_ROWS = [
  {
    id: 'top-row',
    cards: [
      {
        id: 'fashion-deals',
        title: 'Shop deals in Fashion',
        description: 'Activewear, accessories and more styles to love.',
        ctaLabel: 'Discover more',
        ctaHref: '/fashion',
        items: createCardItems(
          'deals-on-fashion',
          ['Clothing', 'Trackers', 'Equipment', 'Deals'],
          ACCENT_BACKGROUNDS.amber,
          '/fashion'
        ),
      },
      {
        id: 'gaming-latest',
        title: 'Shop the latest in gaming',
        description: 'Consoles and gear for every kind of player.',
        ctaLabel: 'Shop the latest in gaming',
        ctaHref: '/gaming',
        items: createCardItems(
          'gaming-merchandise',
          ['PC gaming', 'Xbox', 'PlayStation', 'Nintendo Switch'],
          ACCENT_BACKGROUNDS.violet,
          '/gaming'
        ),
      },
      {
        id: 'connected-tech',
        title: 'Connected tech upgrades',
        description: 'Stay connected with popular devices and wearables.',
        ctaLabel: 'Discover more',
        ctaHref: '/electronics',
        items: createCardItems(
          'elevate-your-electronics',
          ['Smartphones', 'Watches', 'Headphones', 'Tablets'],
          ACCENT_BACKGROUNDS.sky,
          '/electronics'
        ),
      },
      {
        id: 'travel-ready',
        title: 'Travel-ready bags & accessories',
        description: 'Pack more, stress less with ready-to-go picks.',
        ctaLabel: 'Discover more',
        ctaHref: '/travel',
        items: createCardItems(
          'most-loved-travel-essentials',
          ['Backpacks', 'Suitcases', 'Accessories', 'Handbags'],
          ACCENT_BACKGROUNDS.evergreen,
          '/travel'
        ),
      },
    ],
  },
  {
    id: 'bottom-row',
    cards: [
      {
        id: 'gift-by-price',
        title: 'Find gifts at any price',
        description: 'Thoughtful ideas for every budget on your list.',
        ctaLabel: 'Visit the Holiday Shop',
        ctaHref: '/gifts',
        items: createCardItems(
          'shop-gifts-by-price',
          ['Under $10', 'Under $25', 'Under $50', 'Under $75'],
          ACCENT_BACKGROUNDS.pine,
          '/gifts'
        ),
      },
      {
        id: 'explore-sports',
        title: 'Explore more in Sports',
        description: 'Gear to keep your routines and workouts on track.',
        ctaLabel: 'Explore more',
        ctaHref: '/sports',
        items: createCardItems(
          'shop-gifts-by-category',
          ['Cycling', 'Running', 'Exercise & Fitness', 'Golf'],
          ACCENT_BACKGROUNDS.ocean,
          '/sports'
        ),
      },
      {
        id: 'top-pcs-accessories',
        title: 'Score the top PCs & accessories',
        description: 'Setups that boost work, play and everything between.',
        ctaLabel: 'See more',
        ctaHref: '/computers',
        items: createCardItems(
          'upgrade-on-tech',
          ['Desktops', 'Laptops', 'Hard drives', 'PC accessories'],
          ACCENT_BACKGROUNDS.sky,
          '/computers'
        ),
      },
      {
        id: 'warm-decor',
        title: 'Warm & welcoming decor',
        description: 'Wreaths, throws and accents for a cozy refresh.',
        ctaLabel: 'Shop more fall finds',
        ctaHref: '/home-decor',
        items: createCardItems(
          'warm---welcoming-decor',
          ['Wreaths & garlands', 'Outdoor decor', 'Pillows & throws', 'Wall art & mirrors'],
          ACCENT_BACKGROUNDS.terracotta,
          '/home-decor'
        ),
      },
    ],
  },
];

const HomepageContent = () => {
  return (
    <section className="px-6 pb-12" aria-labelledby="homepage-content-heading">
      <h2 id="homepage-content-heading" className="sr-only">
        Featured Amazon collections
      </h2>

      <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
        {CARD_ROWS.map((row, index) => (
          <React.Fragment key={row.id}>
            <div className="grid grid-cols-4 gap-5 lg:grid-cols-2 sm:grid-cols-1">
              {row.cards.map((card) => (
                <article className="bg-white rounded-md shadow-md p-4 flex flex-col gap-4" key={card.id}>
                  <header className="">
                    <h3 className="m-0 mb-1.5 text-lg text-gray-900">{card.title}</h3>
                    {card.description && <p className="m-0 text-sm text-gray-700">{card.description}</p>}
                  </header>

                  <div className="grid grid-cols-2 gap-3.5">
                    {card.items.map((item) => (
                      <a className="flex flex-col gap-2 no-underline text-gray-900" href={item.href} key={item.id}>
                        <figure
                          className="m-0 rounded-md min-h-[120px] flex items-center justify-center overflow-hidden"
                          style={item.background ? { background: item.background } : undefined}
                        >
                          <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
                        </figure>
                        <span className="text-sm">{item.title}</span>
                      </a>
                    ))}
                  </div>

                  <a className="self-start text-blue-700 font-semibold no-underline hover:text-orange-700 hover:underline" href={card.ctaHref}>
                    {card.ctaLabel}
                  </a>
                </article>
              ))}
            </div>

            {index === 0 && (
              <>
                <HolidaySpecials />
                <DealsPromo />
              </>
            )}
          </React.Fragment>
        ))}

        <BooksShowcase />
      </div>
    </section>
  );
};

export default HomepageContent;
