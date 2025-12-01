import React from 'react';
import './PromoCollections.css';

const PROMO_COLLECTIONS = [
  {
    id: 'active-style',
    title: 'Clothing, trackers & more',
    ctaLabel: 'Discover more',
    href: '/discover/active-style',
    items: [
      {
        label: 'Clothing',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
        href: '/clothing',
        background: 'linear-gradient(135deg, #ffe671 0%, #f8ad19 100%)',
      },
      {
        label: 'Trackers',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
        href: '/electronics/fitness-trackers',
        background: 'linear-gradient(135deg, #ffe671 0%, #f8ad19 100%)',
      },
      {
        label: 'Equipment',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80',
        href: '/fitness/equipment',
        background: 'linear-gradient(135deg, #ffe671 0%, #f8ad19 100%)',
      },
      {
        label: 'Deals',
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
        href: '/deals',
        background: 'linear-gradient(135deg, #ffe671 0%, #f8ad19 100%)',
      },
    ],
  },
  {
    id: 'gaming-favorites',
    title: 'Level up your gaming',
    ctaLabel: 'Shop the latest in gaming',
    href: '/gaming',
    items: [
      {
        label: 'PC gaming',
        image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80',
        href: '/gaming/pc',
        background: 'linear-gradient(135deg, #c7a3ff 0%, #7057ff 100%)',
      },
      {
        label: 'Xbox',
        image: 'https://images.unsplash.com/photo-1587202372775-98927f0a7723?auto=format&fit=crop&w=400&q=80',
        href: '/gaming/xbox',
        background: 'linear-gradient(135deg, #c7a3ff 0%, #7057ff 100%)',
      },
      {
        label: 'PlayStation',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&q=80',
        href: '/gaming/playstation',
        background: 'linear-gradient(135deg, #c7a3ff 0%, #7057ff 100%)',
      },
      {
        label: 'Nintendo Switch',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80',
        href: '/gaming/nintendo-switch',
        background: 'linear-gradient(135deg, #c7a3ff 0%, #7057ff 100%)',
      },
    ],
  },
  {
    id: 'connected-tech',
    title: 'Connected tech upgrades',
    ctaLabel: 'Discover more',
    href: '/electronics',
    items: [
      {
        label: 'Smartphones',
        image: 'https://images.unsplash.com/photo-1510552776732-03e61cf4b144?auto=format&fit=crop&w=400&q=80',
        href: '/electronics/smartphones',
        background: 'linear-gradient(135deg, #7dd4ff 0%, #2a7de1 100%)',
      },
      {
        label: 'Watches',
        image: 'https://images.unsplash.com/photo-1524594154900-35aa3d59f1c1?auto=format&fit=crop&w=400&q=80',
        href: '/electronics/wearables',
        background: 'linear-gradient(135deg, #7dd4ff 0%, #2a7de1 100%)',
      },
      {
        label: 'Headphones',
        image: 'https://images.unsplash.com/photo-1513116476489-7635e79feb27?auto=format&fit=crop&w=400&q=80',
        href: '/electronics/headphones',
        background: 'linear-gradient(135deg, #7dd4ff 0%, #2a7de1 100%)',
      },
      {
        label: 'Tablets',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        href: '/electronics/tablets',
        background: 'linear-gradient(135deg, #7dd4ff 0%, #2a7de1 100%)',
      },
    ],
  },
  {
    id: 'travel-essentials',
    title: 'Travel-ready bags & accessories',
    ctaLabel: 'Discover more',
    href: '/travel',
    items: [
      {
        label: 'Backpacks',
        image: 'https://images.unsplash.com/photo-1514477917009-389c76a86b7e?auto=format&fit=crop&w=400&q=80',
        href: '/travel/backpacks',
        background: 'linear-gradient(135deg, #cde8d5 0%, #8bc1a5 100%)',
      },
      {
        label: 'Suitcases',
        image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80',
        href: '/travel/suitcases',
        background: 'linear-gradient(135deg, #cde8d5 0%, #8bc1a5 100%)',
      },
      {
        label: 'Accessories',
        image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80',
        href: '/travel/accessories',
        background: 'linear-gradient(135deg, #cde8d5 0%, #8bc1a5 100%)',
      },
      {
        label: 'Handbags',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
        href: '/travel/handbags',
        background: 'linear-gradient(135deg, #cde8d5 0%, #8bc1a5 100%)',
      },
    ],
  },
  {
    id: 'gift-price-points',
    title: 'Find gifts at any price',
    ctaLabel: 'Visit the Holiday Shop',
    href: '/holiday/gifts',
    items: [
      {
        label: 'Under $10',
        image: 'https://images.unsplash.com/photo-1521579971123-1192931a1452?auto=format&fit=crop&w=400&q=80',
        href: '/holiday/gifts-under-10',
        background: 'linear-gradient(135deg, #0c6b37 0%, #1aac5b 100%)',
      },
      {
        label: 'Under $25',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
        href: '/holiday/gifts-under-25',
        background: 'linear-gradient(135deg, #0c6b37 0%, #1aac5b 100%)',
      },
      {
        label: 'Under $50',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80',
        href: '/holiday/gifts-under-50',
        background: 'linear-gradient(135deg, #0c6b37 0%, #1aac5b 100%)',
      },
      {
        label: 'Under $75',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        href: '/holiday/gifts-under-75',
        background: 'linear-gradient(135deg, #0c6b37 0%, #1aac5b 100%)',
      },
    ],
  },
  {
    id: 'sports-explore',
    title: 'Explore more in Sports',
    ctaLabel: 'Explore more',
    href: '/sports',
    items: [
      {
        label: 'Cycling',
        image: 'https://images.unsplash.com/photo-1525104885116-6c67e184d05b?auto=format&fit=crop&w=400&q=80',
        href: '/sports/cycling',
        background: 'linear-gradient(135deg, #e1ecff 0%, #9fc0ff 100%)',
      },
      {
        label: 'Running',
        image: 'https://images.unsplash.com/photo-1517964106626-460c4a781c9e?auto=format&fit=crop&w=400&q=80',
        href: '/sports/running',
        background: 'linear-gradient(135deg, #e1ecff 0%, #9fc0ff 100%)',
      },
      {
        label: 'Exercise & Fitness',
        image: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&w=400&q=80',
        href: '/sports/fitness',
        background: 'linear-gradient(135deg, #e1ecff 0%, #9fc0ff 100%)',
      },
      {
        label: 'Golf',
        image: 'https://images.unsplash.com/photo-1504600770771-fb03a6961d48?auto=format&fit=crop&w=400&q=80',
        href: '/sports/golf',
        background: 'linear-gradient(135deg, #e1ecff 0%, #9fc0ff 100%)',
      },
    ],
  },
  {
    id: 'pc-accessories',
    title: 'Score the top PCs & Accessories',
    ctaLabel: 'See more',
    href: '/computers',
    items: [
      {
        label: 'Desktops',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        href: '/computers/desktops',
        background: 'linear-gradient(135deg, #d6e4ff 0%, #84a6ff 100%)',
      },
      {
        label: 'Laptops',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
        href: '/computers/laptops',
        background: 'linear-gradient(135deg, #d6e4ff 0%, #84a6ff 100%)',
      },
      {
        label: 'Hard Drives',
        image: 'https://images.unsplash.com/photo-1508898578281-774ac4893c0f?auto=format&fit=crop&w=400&q=80',
        href: '/computers/hard-drives',
        background: 'linear-gradient(135deg, #d6e4ff 0%, #84a6ff 100%)',
      },
      {
        label: 'PC Accessories',
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de1d43c?auto=format&fit=crop&w=400&q=80',
        href: '/computers/accessories',
        background: 'linear-gradient(135deg, #d6e4ff 0%, #84a6ff 100%)',
      },
    ],
  },
  {
    id: 'warm-decor',
    title: 'Warm & welcoming decor',
    ctaLabel: 'Shop more fall finds',
    href: '/home/warm-decor',
    items: [
      {
        label: 'Wreaths & garlands',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
        href: '/home/wreaths',
        background: 'linear-gradient(135deg, #ffe7d4 0%, #ffb585 100%)',
      },
      {
        label: 'Outdoor decor',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80',
        href: '/home/outdoor-decor',
        background: 'linear-gradient(135deg, #ffe7d4 0%, #ffb585 100%)',
      },
      {
        label: 'Pillows & throws',
        image: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?auto=format&fit=crop&w=400&q=80',
        href: '/home/pillows-throws',
        background: 'linear-gradient(135deg, #ffe7d4 0%, #ffb585 100%)',
      },
      {
        label: 'Wall art & mirrors',
        image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80',
        href: '/home/wall-art',
        background: 'linear-gradient(135deg, #ffe7d4 0%, #ffb585 100%)',
      },
    ],
  },
];

const PromoCollections = () => {
  return (
    <section className="promoCollections" aria-labelledby="promo-collections-heading">
      <div className="promoCollections__inner">
        <header className="promoCollections__header">
          <h2 id="promo-collections-heading">More to explore</h2>
        </header>

        <div className="promoCollections__grid">
          {PROMO_COLLECTIONS.map((collection) => (
            <article className="promoCollections__card" key={collection.id}>
              {collection.title && <h3 className="promoCollections__title">{collection.title}</h3>}

              <div className="promoCollections__items">
                {collection.items.map((item) => (
                  <a className="promoCollections__item" href={item.href} key={item.label}>
                    <figure
                      className="promoCollections__figure"
                      style={item.background ? { background: item.background } : undefined}
                    >
                      <img src={item.image} alt={item.label} loading="lazy" />
                    </figure>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>

              {collection.ctaLabel && collection.href && (
                <a className="promoCollections__cta" href={collection.href}>
                  {collection.ctaLabel}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCollections;
