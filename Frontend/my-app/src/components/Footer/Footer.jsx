import React from 'react';
import { Link } from 'react-router-dom';

const TOP_LINK_COLUMNS = [
  {
    heading: 'Get to Know Us',
    links: [
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
      { label: 'About Amazon', to: '/about' },
      { label: 'Investor Relations', to: '/investor-relations' },
      { label: 'Amazon Devices', to: '/devices' },
      { label: 'Amazon Science', to: '/science' },
    ],
  },
  {
    heading: 'Make Money with Us',
    links: [
      { label: 'Sell products on Amazon', to: '/sell' },
      { label: 'Sell on Amazon Business', to: '/sell-business' },
      { label: 'Sell apps on Amazon', to: '/sell-apps' },
      { label: 'Become an Affiliate', to: '/affiliate' },
      { label: 'Advertise Your Products', to: '/advertising' },
      { label: 'Self-Publish with Us', to: '/self-publish' },
      { label: 'Host an Amazon Hub', to: '/amazon-hub' },
      { label: '› See More Make Money with Us', to: '/make-money' },
    ],
  },
  {
    heading: 'Amazon Payment Products',
    links: [
      { label: 'Amazon Business Card', to: '/business-card' },
      { label: 'Shop with Points', to: '/points' },
      { label: 'Reload Your Balance', to: '/reload' },
      { label: 'Amazon Currency Converter', to: '/currency' },
    ],
  },
  {
    heading: 'Let Us Help You',
    links: [
      { label: 'Amazon and COVID-19', to: '/covid-19' },
      { label: 'Your Account', to: '/account' },
      { label: 'Your Orders', to: '/orders' },
      { label: 'Shipping Rates & Policies', to: '/shipping' },
      { label: 'Returns & Replacements', to: '/returns' },
      { label: 'Manage Your Content and Devices', to: '/content-devices' },
      { label: 'Help', to: '/help' },
    ],
  },
];

const SERVICES_GRID = [
  { label: 'Amazon Music', description: 'Stream millions of songs', to: '/music' },
  { label: 'Amazon Ads', description: 'Reach customers wherever they spend their time', to: '/advertising-services' },
  { label: '6pm', description: 'Score deals on fashion brands', to: '/6pm' },
  { label: 'AbeBooks', description: 'Books, art & collectibles', to: '/abebooks' },
  { label: 'ACX', description: 'Audiobook Publishing Made Easy', to: '/acx' },
  { label: 'Sell on Amazon', description: 'Start a Selling Account', to: '/sell' },
  { label: 'Veeqo', description: 'Shipping Software Inventory Management', to: '/veeqo' },
  { label: 'Amazon Business', description: 'Everything For Your Business', to: '/business' },
  { label: 'Amazon Fresh', description: 'Groceries & More Right To Your Door', to: '/fresh' },
  { label: 'AmazonGlobal', description: 'Ship Orders Internationally', to: '/global' },
  { label: 'Home Services', description: 'Experienced Pros Happiness Guarantee', to: '/home-services' },
  { label: 'Amazon Web Services', description: 'Scalable Cloud Computing Services', to: '/aws' },
  { label: 'Audible', description: 'Listen to Books & Original Audio Performances', to: '/audible' },
  { label: 'Box Office Mojo', description: 'Find Movie Box Office Data', to: '/box-office' },
  { label: 'Goodreads', description: 'Book reviews & recommendations', to: '/goodreads' },
  { label: 'IMDb', description: 'Movies, TV & Celebrities', to: '/imdb' },
  { label: 'IMDbPro', description: 'Get Info Entertainment Professionals Need', to: '/imdbpro' },
  { label: 'Kindle Direct Publishing', description: 'Indie Digital & Print Publishing Made Easy', to: '/kindle-dp' },
  { label: 'Prime Video Direct', description: 'Video Distribution Made Easy', to: '/prime-video-direct' },
  { label: 'Shopbop', description: 'Designer Fashion Brands', to: '/shopbop' },
  { label: 'Woot!', description: 'Deals and Shenanigans', to: '/woot' },
  { label: 'Zappos', description: 'Shoes & Clothing', to: '/zappos' },
  { label: 'Ring', description: 'Smart Home Security Systems', to: '/ring' },
  { label: 'eero WiFi', description: 'Stream 4K Video in Every Room', to: '/eero' },
  { label: 'Blink', description: 'Smart Security for Every Home', to: '/blink' },
  { label: 'Neighbors App', description: 'Real-Time Crime & Safety Alerts', to: '/neighbors' },
  { label: 'Amazon Subscription Boxes', description: 'Top subscription boxes – right to your door', to: '/subscription-boxes' },
  { label: 'PillPack', description: 'Pharmacy Simplified', to: '/pillpack' },
];

const LEGAL_LINKS = [
  { label: 'Conditions of Use', to: '/conditions-of-use' },
  { label: 'Privacy Notice', to: '/privacy' },
  { label: 'Consumer Health Data Privacy Disclosure', to: '/health-privacy' },
  { label: 'Your Ads Privacy Choices', to: '/ads-privacy' },
];

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#232F3E] text-white font-amazonember w-full mt-10" role="contentinfo">
      {/* Back to top button */}
      <button
        className="w-full bg-[#37475A] text-white text-xs font-bold py-3.5 cursor-pointer hover:bg-[#485769] transition-colors"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        Back to top
      </button>

      {/* Main links section */}
      <div className="bg-[#232F3E] px-10 py-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-8 lg:grid-cols-2 md:grid-cols-1">
          {TOP_LINK_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-white text-base font-bold mb-2">{column.heading}</h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.to} 
                      onClick={handleLinkClick} 
                      className="text-[#DDD] text-sm no-underline hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Logo and language/currency section */}
      <div className="border-t border-[#3a4553] bg-[#232F3E] py-6 px-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-10 flex-wrap">
          <Link 
            className="text-gray-300 no-underline" 
            to="/" 
            aria-label="Amazon home" 
            onClick={handleLinkClick}
          >
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="Amazon logo"
              className="w-[100px] object-contain"
            />
          </Link>
          
          <div className="flex items-center gap-4 flex-wrap">
            <button 
              className="bg-transparent text-white border border-[#848688] rounded-sm px-3 py-1.5 text-xs cursor-pointer hover:border-white transition-colors flex items-center gap-1.5" 
              type="button" 
              aria-label="Change language"
            >
              <span className="text-base">🌐</span>
              <span>English</span>
            </button>
            
            <button 
              className="bg-transparent text-white border border-[#848688] rounded-sm px-3 py-1.5 text-xs cursor-pointer hover:border-white transition-colors" 
              type="button" 
              aria-label="Change currency"
            >
              $ USD - U.S. Dollar
            </button>
            
            <button 
              className="bg-transparent text-white border border-[#848688] rounded-sm px-3 py-1.5 text-xs cursor-pointer hover:border-white transition-colors flex items-center gap-1.5" 
              type="button" 
              aria-label="Change country"
            >
              <img 
                src="https://flagcdn.com/16x12/us.png" 
                alt="United States flag" 
                className="w-4 h-3"
              />
              <span>United States</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services grid section */}
      <div className="bg-[#131A22] px-10 py-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-x-4 gap-y-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {SERVICES_GRID.map((service) => (
            <Link
              className="flex flex-col text-xs text-[#DDD] no-underline hover:underline"
              to={service.to}
              key={service.label}
              onClick={handleLinkClick}
            >
              <span className="text-white font-normal text-xs">{service.label}</span>
              <span className="text-[#999] text-xs leading-tight">{service.description}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Legal links and copyright */}
      <div className="bg-[#131A22] border-t border-[#3a4553] py-6 px-10 text-center">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-center flex-wrap gap-6 mb-3 text-xs">
            {LEGAL_LINKS.map((link) => (
              <Link 
                to={link.to} 
                key={link.label} 
                onClick={handleLinkClick} 
                className="text-[#DDD] no-underline hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="m-0 text-xs text-[#999]">
            © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
