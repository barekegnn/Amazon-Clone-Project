import React from 'react';
import './CategoryGrid.css';

const CATEGORY_CARDS = [
  {
    id: 'gaming',
    title: 'Gaming accessories',
    href: '/gaming-accessories',
    items: [
      {
        label: 'Headsets',
        image: '/assets/categories/gaming/PlayStation.png',
        href: '/gaming-headsets',
      },
      {
        label: 'Keyboards',
        image: '/assets/categories/gaming/pcGaming.png',
        href: '/gaming-keyboards',
      },
      {
        label: 'Computer mice',
        image: '/assets/categories/gaming/Toys.png',
        href: '/gaming-mice',
      },
      {
        label: 'Chairs',
        image: '/assets/categories/gaming/xbox.png',
        href: '/gaming-chairs',
      },
    ],
  },
  {
    id: 'refresh-space',
    title: 'Refresh your space',
    href: '/home-refresh',
    items: [
      {
        label: 'Dining',
        image: '/assets/categories/refresh/dining.png',
        href: '/home-dining',
      },
      {
        label: 'Home',
        image: '/assets/categories/refresh/home.png',
        href: '/home-decor',
      },
      {
        label: 'Kitchen',
        image: '/assets/categories/refresh/Kitchen.png',
        href: '/kitchen',
      },
      {
        label: 'Beauty',
        image: '/assets/categories/refresh/beauty.png',
        href: '/beauty',
      },
    ],
  },
  {
    id: 'fashion',
    title: 'Shop deals in Fashion',
    href: '/fashion_deals',
    items: [
      {
        label: 'Jeans under $50',
        image: '/assets/categories/fashion/jewelry.png',
        href: '/fashion-jeans',
      },
      {
        label: 'Tops under $25',
        image: '/assets/categories/fashion/Knites.png',
        href: '/fashion-tops',
      },
      {
        label: 'Dresses under $30',
        image: '/assets/categories/fashion/Dresses.png',
        href: '/fashion-dresses',
      },
      {
        label: 'Shoes under $50',
        image: '/assets/categories/fashion/shoes.png',
        href: '/fashion-shoes',
      },
    ],
  },
  {
    id: 'smart-home',
    title: 'Create with strip lights',
    href: '/strip-lights',
    items: [
      {
        label: 'For bedrooms',
        image: '/assets/categories/strip-lights/Decore.png',
        href: '/strip-lights-bedroom',
      },
      {
        label: 'For gaming spaces',
        image: '/assets/categories/strip-lights/SmartHome.png',
        href: '/strip-lights-gaming',
      },
      {
        label: 'For living rooms',
        image: '/assets/categories/strip-lights/paint.png',
        href: '/strip-lights-living',
      },
      {
        label: 'For kitchens',
        image: '/assets/categories/strip-lights/Kitchen.png',
        href: '/strip-lights-kitchen',
      },
    ],
  },
];

const CategoryGrid = () => {
  return (
    <section className="categories" aria-labelledby="categories-heading">
      <div className="categories__inner">
        <header className="categories__header">
          <h2 id="categories-heading">Shop by category</h2>
          <a className="categories__seeMore" href="/gp/site-directory">
            Shop all categories
          </a>
        </header>

        <div className="categories__grid">
          {CATEGORY_CARDS.map((category) => (
            <article className="categories__card" key={category.id}>
              <h3 className="categories__title">{category.title}</h3>
              <div className="categories__items">
                {category.items.map((item) => (
                  <a className="categories__item" href={item.href} key={item.label}>
                    <figure>
                      <img src={item.image} alt={item.label} />
                    </figure>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
              <a className="categories__cta" href={category.href}>
                Shop {category.title.toLowerCase()}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
