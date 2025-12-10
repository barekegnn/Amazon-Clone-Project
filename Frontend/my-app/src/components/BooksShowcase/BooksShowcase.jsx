import React, { useRef } from 'react';

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
    <section className="px-6 pb-10 md:px-4 md:pb-9" aria-labelledby="books-showcase-heading">
      <h2 id="books-showcase-heading" className="sr-only">
        Book collections
      </h2>
      <div className="max-w-[1500px] mx-auto flex flex-col gap-6">
        {BOOK_ROWS.map((row) => (
          <article className="p-4 pt-5 pb-2 bg-white rounded-md shadow-md" key={row.id} aria-labelledby={`${row.id}-title`}>
            <header className="flex items-center justify-between mb-2.5">
              <h3 id={`${row.id}-title`} className="m-0 text-xl text-gray-900">{row.title}</h3>
            </header>
            <div className="relative flex items-center gap-3 md:mx-7">
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 w-12 h-12 border-none bg-white shadow-lg cursor-pointer flex items-center justify-center rounded-full text-2xl text-gray-900 transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-amazonclone-orange z-10 left-0 md:w-10 md:h-10 md:text-xl"
                aria-label={`Scroll ${row.title} books backward`}
                onClick={() => scrollRail(row.id, 'prev')}
              >
                ❮
              </button>

              <ul className="grid auto-cols-[120px] grid-flow-col gap-3 overflow-x-auto py-1.5 pb-3 scroll-smooth scrollbar-hide" ref={registerRailRef(row.id)}>
                {row.items.map((item) => (
                  <li className="list-none" key={item.id}>
                    <a href={item.href} aria-label={item.title} className="block rounded-md overflow-hidden bg-gradient-to-b from-white to-gray-100 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg">
                      <figure className="m-0 flex items-center justify-center bg-white h-52">
                        <img src={item.image} alt={`${item.title} cover`} loading="lazy" className="w-auto max-w-full h-full object-contain" />
                      </figure>
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 w-12 h-12 border-none bg-white shadow-lg cursor-pointer flex items-center justify-center rounded-full text-2xl text-gray-900 transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-amazonclone-orange z-10 right-0 md:w-10 md:h-10 md:text-xl"
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
