import React, { useRef } from 'react';
import './BooksShowcase.css';

const createBookImagePath = (index) => `/assets/best-sellers-in-books/product_${String(index).padStart(2, '0')}.jpg`;

const attachLocalImages = (rows) =>
  rows.map(({ imageStart, ...row }) => ({
    ...row,
    items: row.items.map((item, idx) => ({
      ...item,
      image: createBookImagePath(imageStart + idx),
    })),
  }));

const BOOK_ROW_DEFINITIONS = [
  {
    id: 'best-sellers',
    title: 'Best Sellers in Books',
    imageStart: 1,
    items: [
      {
        id: 'how-to-draw-everything',
        title: 'How to Draw Everything',
        href: '/books/how-to-draw-everything',
      },
      {
        id: 'book-of-unusual-knowledge',
        title: 'The Book of Unusual Knowledge',
        href: '/books/book-of-unusual-knowledge',
      },
      {
        id: 'let-them-theory',
        title: 'The Let Them Theory',
        href: '/books/let-them-theory',
      },
      {
        id: 'dog-man-big-jim',
        title: 'Dog Man: The Scarlet Shedder',
        href: '/books/dog-man-scarlet-shedder',
      },
      {
        id: 'fart-party',
        title: 'Fart Part Night',
        href: '/books/fart-party',
      },
      {
        id: 'around-the-farm',
        title: 'Around the Farm',
        href: '/books/around-the-farm',
      },
      {
        id: 'knock-knock-jokes',
        title: 'Lots of Knock Knock Jokes for Kids',
        href: '/books/knock-knock-jokes',
      },
      {
        id: 'how-to-catch-a-snowman',
        title: 'How to Catch a Snowman',
        href: '/books/how-to-catch-a-snowman',
      },
      {
        id: 'magic-tree-house',
        title: 'Magic Tree House: Dinosaurs Before Dark',
        href: '/books/magic-tree-house-1',
      },
      {
        id: 'baby-sitters-club',
        title: 'Baby-Sitters Club',
        href: '/books/babysitters-club',
      },
      {
        id: 'harry-potter',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        href: '/books/harry-potter-1',
      },
      {
        id: 'wonder',
        title: 'Wonder',
        href: '/books/wonder',
      },
    ],
  },
  {
    id: 'top-sellers-for-you',
    title: 'Top Sellers in Books for you',
    imageStart: 13,
    items: [
      {
        id: 'princess-ball',
        title: 'Princesses Save the World',
        href: '/books/princesses-save-the-world',
      },
      {
        id: 'wellness-journal',
        title: 'Chronic Pain and Life Quality',
        href: '/books/chronic-pain-life-quality',
      },
      {
        id: 'medjugorje',
        title: 'Medjugorje',
        href: '/books/medjugorje',
      },
      {
        id: 'constelaciones',
        title: 'Constelaciones Cuánticas',
        href: '/books/constelaciones-cuanticas',
      },
      {
        id: 'una-persona',
        title: 'Quiero una persona que no me necesite',
        href: '/books/quiero-una-persona',
      },
      {
        id: 'i-can-breathe',
        title: 'I Can Breathe',
        href: '/books/i-can-breathe',
      },
      {
        id: 'a-love-letter',
        title: 'A Love Letter to Myself',
        href: '/books/a-love-letter-to-myself',
      },
      {
        id: 'how-things-travel',
        title: 'How Do Things Travel?',
        href: '/books/how-things-travel',
      },
      {
        id: 'enchanted-forest',
        title: 'Enchanted Forest Coloring Book',
        href: '/books/enchanted-forest-coloring-book',
      },
      {
        id: 'the-body-keep-score',
        title: 'The Body Keeps the Score',
        href: '/books/the-body-keeps-the-score',
      },
      {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        href: '/books/atomic-habits',
      },
      {
        id: 'the-four-agreements',
        title: 'The Four Agreements',
        href: '/books/the-four-agreements',
      },
    ],
  },
];

const BOOK_ROWS = attachLocalImages(BOOK_ROW_DEFINITIONS);

const BooksShowcase = () => {
  const railsRef = useRef({});

  const registerRailRef = (id) => (node) => {
    if (node) {
      railsRef.current[id] = node;
    } else {
      delete railsRef.current[id];
    }
  };

  const scrollRail = (id, direction) => {
    const node = railsRef.current[id];
    if (!node) return;

    const scrollAmount = node.clientWidth * 0.9;
    node.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="booksShowcase" aria-labelledby="books-showcase-heading">
      <h2 id="books-showcase-heading" className="visually-hidden">
        Book collections
      </h2>
      <div className="booksShowcase__inner">
        {BOOK_ROWS.map((row) => (
          <article className="booksShowcase__row" key={row.id} aria-labelledby={`${row.id}-title`}>
            <header className="booksShowcase__header">
              <h3 id={`${row.id}-title`}>{row.title}</h3>
            </header>
            <div className="booksShowcase__railWrapper">
              <button
                type="button"
                className="booksShowcase__control booksShowcase__control--prev"
                aria-label={`Scroll ${row.title} books backward`}
                onClick={() => scrollRail(row.id, 'prev')}
              >
                ❮
              </button>

              <ul className="booksShowcase__rail" ref={registerRailRef(row.id)}>
                {row.items.map((item) => (
                  <li className="booksShowcase__item" key={item.id}>
                    <a href={item.href} aria-label={item.title}>
                      <figure className="booksShowcase__cover">
                        <img src={item.image} alt={`${item.title} cover`} loading="lazy" />
                      </figure>
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="booksShowcase__control booksShowcase__control--next"
                aria-label={`Scroll ${row.title} books forward`}
                onClick={() => scrollRail(row.id, 'next')}
              >
                ❯
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BooksShowcase;
