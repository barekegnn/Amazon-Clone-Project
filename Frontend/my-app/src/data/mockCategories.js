/*
Senior-Level E-Commerce Mock Data

This data structure is designed to simulate a realistic, enterprise-level
e-commerce category hierarchy.

Key Architectural Decisions:
- ID/Slug Convention: IDs are human-readable and map to slugs for simplicity in this mock setup.
  In a real system, IDs would be UUIDs or integers, and slugs would be unique but mutable.
- Deep Nesting: The hierarchy goes multiple levels deep to test recursive resolution and breadcrumb generation.
- Asymmetric Structure: The depth and breadth of categories are intentionally uneven, mirroring real-world catalog complexity.
- Content-Rich & Content-Poor Nodes: Some categories have extensive products and children, while others are empty.
  This is crucial for testing edge cases in the UI.
- Products at Multiple Levels: Products can exist at any level of the hierarchy, not just on leaf nodes.
  A user might browse "Laptops" (parent) and see general products, or "Gaming Laptops" (child) for specifics.
- Descriptive Metadata: `description` and `hero` fields simulate the need for category-specific content management,
  allowing the Category page to be data-driven and dynamic.
- Future-Proofing: The structure can easily accommodate additional fields like `brandFilters`, `featuredLinks`, etc.
  without requiring a schema migration.
*/
export const MOCK_CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Discover the latest in tech, from state-of-the-art home electronics to essential mobile accessories. Shop cameras, computers, video games, and more.',
    hero: {
      title: 'Cutting-Edge Electronics',
      imageUrl: '/public/assets/categories/electronics-hero.jpg',
      cta: 'Explore All Electronics'
    },
    children: [
      {
        id: 'computers-accessories',
        name: 'Computers & Accessories',
        slug: 'computers',
        description: 'Build your workstation or upgrade your setup with the latest laptops, desktops, monitors, and computer accessories.',
        children: [
          {
            id: 'laptops',
            name: 'Laptops',
            slug: 'laptops',
            description: 'Powerful and portable solutions for work, gaming, and creativity.',
            products: [
              { id: 'p201', title: 'Flagship Ultrabook Pro', price: 1399.99, image: '/assets/products/laptops/ultrabook-pro.jpg', rating: 4.8, reviews: 350 },
              { id: 'p202', title: 'Creator Series 16-inch', price: 2199.00, image: '/assets/products/laptops/creator-16.jpg', rating: 4.7, reviews: 210 }
            ],
            children: [
              {
                id: 'gaming-laptops',
                name: 'Gaming Laptops',
                slug: 'gaming',
                description: 'Experience high-performance gaming on the go with top-of-the-line graphics and processing power.',
                products: [
                  { id: 'p1', title: 'Alienware m15 R7', price: 1499.99, image: '/assets/products/laptops/alienware-m15.jpg', rating: 4.5, reviews: 120 },
                  { id: 'p2', title: 'ASUS ROG Zephyrus G14', price: 1299.99, image: '/assets/products/laptops/asus-rog.jpg', rating: 4.8, reviews: 85 }
                ]
              },
              {
                id: 'ultrabooks',
                name: 'Ultrabooks',
                slug: 'ultrabooks',
                description: 'Sleek, lightweight, and powerful laptops perfect for professionals and students.',
                products: [
                  { id: 'p3', title: 'Dell XPS 13', price: 999.99, image: '/assets/products/laptops/dell-xps.jpg', rating: 4.7, reviews: 200 },
                  { id: 'p4', title: 'MacBook Air M2', price: 1199.00, image: '/assets/products/laptops/macbook-air.jpg', rating: 4.9, reviews: 500 }
                ]
              },
               {
                id: 'business-laptops',
                name: 'Business Laptops',
                slug: 'business',
                description: 'Reliable and secure laptops designed for productivity and enterprise environments.',
                children: [] // No products directly, but could have further sub-categories
              }
            ]
          },
          {
            id: 'desktops',
            name: 'Desktops',
            slug: 'desktops',
            description: 'Power your work or play with our range of desktops, from all-in-ones to gaming towers.',
            children: [
                 {
                    id: 'all-in-one',
                    name: 'All-in-One PCs',
                    slug: 'all-in-one',
                    description: 'Streamlined desktops with integrated displays.',
                    products: [
                        { id: 'p301', title: 'HP Pavilion 27"', price: 899.99, image: '/assets/products/desktops/hp-pavilion.jpg', rating: 4.4, reviews: 95 }
                    ] 
                 },
                 {
                    id: 'gaming-desktops',
                    name: 'Gaming Desktops',
                    slug: 'gaming-towers',
                    description: 'The ultimate performance for esports and AAA titles.',
                    products: [
                        { id: 'p302', title: 'CyberPowerPC Gamer Xtreme', price: 1199.99, image: '/assets/products/desktops/cyberpower.jpg', rating: 4.6, reviews: 1800 }
                    ]
                 }
            ]
          },
          {
            id: 'monitors',
            name: 'Monitors',
            slug: 'monitors',
            description: 'Upgrade your view with our selection of 4K, ultrawide, and high-refresh-rate monitors.',
            products: [
               { id: 'p5', title: 'LG 27GP850-B UltraGear', price: 399.99, image: '/assets/products/monitors/lg-ultragear.jpg', rating: 4.6, reviews: 150 },
               { id: 'p6', title: 'Dell UltraSharp U2723QE', price: 579.99, image: '/assets/products/monitors/dell-ultrasharp.jpg', rating: 4.9, reviews: 450 }
            ]
          }
        ]
      },
      {
        id: 'cameras-photo',
        name: 'Camera & Photo',
        slug: 'cameras',
        description: 'Capture life\'s moments with our selection of DSLR, mirrorless, and point-and-shoot cameras.',
        children: [
            {
                id: 'dslr-cameras',
                name: 'DSLR Cameras',
                slug: 'dslr',
                description: 'Professional-grade cameras with interchangeable lenses.',
                children: []
            },
            {
                id: 'mirrorless-cameras',
                name: 'Mirrorless Cameras',
                slug: 'mirrorless',
                description: 'Compact size with the power of a DSLR.',
                products: [
                    { id: 'p401', title: 'Sony a7 IV', price: 2498.00, image: '/assets/products/cameras/sony-a7.jpg', rating: 4.9, reviews: 780 }
                ]
            },
        ]
      },
      // An empty category to test edge cases
      {
        id: 'wearable-tech',
        name: 'Wearable Technology',
        slug: 'wearables',
        description: 'Smartwatches, fitness trackers, and other wearable gadgets to keep you connected.',
        children: [] // Intentionally empty to test UI states
      }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Explore the latest trends in clothing, shoes, and accessories for men, women, and kids.',
    hero: {
      title: 'Styles for Every Season',
      imageUrl: '/public/assets/categories/fashion-hero.jpg',
      cta: 'Shop New Arrivals'
    },
    children: [
      {
        id: 'womens-fashion',
        name: 'Women\'s Fashion',
        slug: 'womens',
        description: 'Find your look with our collection of dresses, tops, shoes, and accessories.',
        children: [
          {
             id: 'womens-clothing',
             name: 'Clothing',
             slug: 'clothing',
             description: 'From casual wear to formal attire.',
             children: [
                {
                    id: 'dresses',
                    name: 'Dresses',
                    slug: 'dresses',
                    description: 'Shop a wide range of styles for any occasion.',
                    products: [
                        { id: 'p501', title: 'Elegant Maxi Dress', price: 79.99, image: '/assets/products/clothing/maxi-dress.jpg', rating: 4.5, reviews: 320 }
                    ]
                }
             ]
          },
          {
             id: 'womens-shoes',
             name: 'Shoes',
             slug: 'shoes',
             description: 'Step out in style with boots, heels, sneakers, and more.',
             children: []
          }
        ]
      },
       {
        id: 'mens-fashion',
        name: 'Men\'s Fashion',
        slug: 'mens',
        description: 'Upgrade your wardrobe with our selection of men\'s apparel, footwear, and accessories.',
        children: [] // Another sparsely populated category
      }
    ]
  },
   // A top-level category with no children, only products
  {
    id: 'books',
    name: 'Books',
    slug: 'books',
    description: 'Get lost in a new story. Explore bestsellers, new releases, and classics across all genres.',
    products: [
        { id: 'p601', title: 'The Midnight Library', price: 14.99, image: '/assets/products/books/midnight-library.jpg', rating: 4.6, reviews: 150000 },
        { id: 'p602', title: 'Atomic Habits', price: 11.98, image: '/assets/products/books/atomic-habits.jpg', rating: 4.8, reviews: 85000 }
    ],
    children: []
  }
];

// Helper to flatten categories for easier debugging if needed
export const getAllCategories = () => {
    // Implementation not needed for simple mock export
};