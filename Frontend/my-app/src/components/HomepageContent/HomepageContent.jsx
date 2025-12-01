import React from 'react';
import HolidaySpecials from '../HolidaySpecials/HolidaySpecials';
import BooksShowcase from '../BooksShowcase/BooksShowcase';
import './HomepageContent.css';

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
    <section className="homepageContent" aria-labelledby="homepage-content-heading">
      <h2 id="homepage-content-heading" className="visually-hidden">
        Featured Amazon collections
      </h2>

      <div className="homepageContent__inner">
        {CARD_ROWS.map((row, index) => (
          <React.Fragment key={row.id}>
            <div className="homepageContent__grid">
              {row.cards.map((card) => (
                <article className="homepageContent__card" key={card.id}>
                  <header className="homepageContent__cardHeader">
                    <h3>{card.title}</h3>
                    {card.description && <p>{card.description}</p>}
                  </header>

                  <div className="homepageContent__itemGrid">
                    {card.items.map((item) => (
                      <a className="homepageContent__item" href={item.href} key={item.id}>
                        <figure
                          className="homepageContent__itemFigure"
                          style={item.background ? { background: item.background } : undefined}
                        >
                          <img src={item.image} alt={item.title} loading="lazy" />
                        </figure>
                        <span>{item.title}</span>
                      </a>
                    ))}
                  </div>

                  <a className="homepageContent__cta" href={card.ctaHref}>
                    {card.ctaLabel}
                  </a>
                </article>
              ))}
            </div>

            {index === 0 && <HolidaySpecials />}
          </React.Fragment>
        ))}

        <BooksShowcase />
      </div>
    </section>
  );
};

export default HomepageContent;
