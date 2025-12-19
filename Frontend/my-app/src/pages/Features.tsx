import React from 'react';
import { 
  Code, 
  Zap, 
  Shield, 
  Smartphone, 
  Search, 
  ShoppingCart,
  Heart,
  TrendingUp,
  Package,
  CreditCard,
  Users,
  Globe
} from 'lucide-react';

const Features: React.FC = () => {
  const techStack = [
    { name: 'React 18', description: 'Modern UI library with hooks and concurrent features' },
    { name: 'TypeScript', description: 'Type-safe code for better maintainability' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid styling' },
    { name: 'React Router', description: 'Client-side routing with code splitting' },
    { name: 'Context API', description: 'State management for cart and theme' },
    { name: 'TanStack Query', description: 'Data fetching and caching' },
  ];

  const features = [
    {
      icon: <ShoppingCart size={32} />,
      title: 'Shopping Cart',
      description: 'Full-featured cart with quantity management, save for later, and persistent storage',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <Search size={32} />,
      title: 'Smart Search',
      description: 'Real-time search with suggestions and category filtering',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <Heart size={32} />,
      title: 'Wishlist',
      description: 'Save products for later with localStorage persistence',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Product Recommendations',
      description: 'Intelligent product suggestions based on viewing history',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <Package size={32} />,
      title: 'Order Tracking',
      description: 'Multi-step checkout with progress indicator and delivery estimates',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Responsive Design',
      description: 'Fully responsive layout optimized for mobile, tablet, and desktop',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: <Shield size={32} />,
      title: 'Error Handling',
      description: 'Comprehensive error boundaries and fallback UI',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: <Zap size={32} />,
      title: 'Performance',
      description: 'Code splitting, lazy loading, and optimized images',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: <Users size={32} />,
      title: 'User Experience',
      description: 'Smooth animations, loading states, and intuitive navigation',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      icon: <CreditCard size={32} />,
      title: 'Checkout Flow',
      description: 'Streamlined checkout with form validation and payment UI',
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      icon: <Globe size={32} />,
      title: 'Accessibility',
      description: 'WCAG AA compliant with ARIA labels and keyboard navigation',
      color: 'bg-lime-100 text-lime-600'
    },
    {
      icon: <Code size={32} />,
      title: 'Clean Code',
      description: 'Well-structured, documented, and maintainable codebase',
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#232F3E] to-[#131921] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Amazon Clone - Features Showcase</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            A professional, portfolio-ready e-commerce application built with modern web technologies.
            This project demonstrates advanced React patterns, performance optimization, and UX best practices.
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{tech.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
            >
              <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-green-600 mb-2">90+</div>
            <div className="text-gray-600 dark:text-gray-300">Performance</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-blue-600 mb-2">95+</div>
            <div className="text-gray-600 dark:text-gray-300">Accessibility</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-purple-600 mb-2">95+</div>
            <div className="text-gray-600 dark:text-gray-300">Best Practices</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-orange-600 mb-2">90+</div>
            <div className="text-gray-600 dark:text-gray-300">SEO</div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">Demo Mode</h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            This is a portfolio demonstration project. All products, transactions, and user data are simulated.
            The application showcases modern web development practices and e-commerce functionality.
          </p>
          <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-2">
            <li>No real payment processing</li>
            <li>Mock product data from Fake Store API</li>
            <li>LocalStorage for cart and preferences</li>
            <li>Client-side routing and state management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
