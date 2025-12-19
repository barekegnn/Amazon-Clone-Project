import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'cart' | 'wishlist' | 'search' | 'orders';
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  message,
  actionLabel,
  actionHref = '/'
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'cart':
        return {
          icon: <ShoppingCart size={64} className="text-gray-300" />,
          title: title || 'Your Amazon Cart is empty',
          message: message || 'Shop today\'s deals and discover great products.',
          actionLabel: actionLabel || 'Start Shopping',
        };
      case 'wishlist':
        return {
          icon: <Heart size={64} className="text-gray-300" />,
          title: title || 'Your Wishlist is empty',
          message: message || 'Save items you love for later.',
          actionLabel: actionLabel || 'Browse Products',
        };
      case 'search':
        return {
          icon: <Search size={64} className="text-gray-300" />,
          title: title || 'No results found',
          message: message || 'Try different keywords or browse our categories.',
          actionLabel: actionLabel || 'Browse Categories',
        };
      case 'orders':
        return {
          icon: <ShoppingCart size={64} className="text-gray-300" />,
          title: title || 'No orders yet',
          message: message || 'Start shopping to see your orders here.',
          actionLabel: actionLabel || 'Start Shopping',
        };
      default:
        return {
          icon: <ShoppingCart size={64} className="text-gray-300" />,
          title: title || 'Nothing here yet',
          message: message || 'Start exploring our products.',
          actionLabel: actionLabel || 'Browse Products',
        };
    }
  };

  const content = getDefaultContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">
        {content.icon}
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {content.title}
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {content.message}
      </p>
      
      <Link
        to={actionHref}
        className="inline-block px-8 py-3 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg font-medium transition-colors"
      >
        {content.actionLabel}
      </Link>

      {type === 'cart' && (
        <div className="mt-8 pt-8 border-t border-gray-200 w-full max-w-md">
          <p className="text-sm text-gray-600 mb-4">You might also like:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/deals" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Today's Deals
            </Link>
            <Link to="/category/electronics" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Electronics
            </Link>
            <Link to="/category/fashion" className="text-[#007185] hover:text-[#C7511F] hover:underline">
              Fashion
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
