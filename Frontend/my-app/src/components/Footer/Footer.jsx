import React from 'react';
import { Link } from 'react-router-dom';

const TOP_LINK_COLUMNS = [
  {
    heading: 'Get to Know Us',
    links: [
      { label: 'Careers', to: '/careers' },
      { label: 'Amazon Newsletter', to: '/newsletter' },
      { label: 'About Amazon', to: '/about' },
      { label: 'Accessibility', to: '/accessibility' },
      { label: 'Sustainability', to: '/sustainability' },
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
    ],
  },
  {
    heading: 'Amazon Payment Products',
    links: [
      { label: 'Amazon Visa', to: '/visa' },
      { label: 'Amazon Store Card', to: '/store-card' },
      { label: 'Amazon Secured Card', to: '/secured-card' },
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
  { label: 'Amazon Advertising', description: 'Find, attract, and engage customers', to: '/advertising-services' },
  { label: 'Amazon Business', description: 'Everything for your business', to: '/business' },
  { label: 'AmazonGlobal', description: 'Ship Orders Internationally', to: '/global' },
  { label: 'Home Services', description: 'Experienced pros Happiness Guarantee', to: '/home-services' },
  { label: 'Amazon Web Services', description: 'Scalable Cloud Computing Services', to: '/aws' },
  { label: 'Audible', description: 'Listen to Books & Original Audio Performances', to: '/audible' },
  { label: 'Box Office Mojo', description: 'Find Movie Box Office Data', to: '/box-office' },
  { label: 'Goodreads', description: 'Book reviews & recommendations', to: '/goodreads' },
  { label: 'IMDb', description: 'Movies, TV & Celebrities', to: '/imdb' },
  { label: 'IMDbPro', description: 'Get Info Entertainment Professionals Need', to: '/imdbpro' },
  { label: 'Kindle Direct Publishing', description: 'Indie Digital & Print Publishing Made Easy', to: '/kindle-dp' },
  { label: 'Amazon Photos', description: 'Unlimited Photo Storage Free With Prime', to: '/photos' },
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
    <footer className="bg-amazonclone-header text-gray-300 font-amazonember w-full mt-10" role="contentinfo">
      <button
        className="w-full bg-amazonclone-lightgray text-white border-none py-3.5 text-sm cursor-pointer hover:bg-amazonclone-lightgray-darker"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        Back to top
      </button>

      <div className="grid grid-cols-4 gap-5 px-15 py-12 lg:grid-cols-2 lg:px-8 lg:py-10 sm:grid-cols-1">
        {TOP_LINK_COLUMNS.map((column) => (
          <div className="" key={column.heading}>
            <h3 className="text-white text-base mb-3">{column.heading}</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} onClick={handleLinkClick} className="text-gray-300 no-underline hover:underline hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-b border-gray-700 py-4.5 px-15 flex items-center gap-5 lg:px-8 sm:flex-col sm:items-start sm:gap-3">
        <Link className="text-gray-300 no-underline hover:underline hover:text-white" to="/" aria-label="Amazon home" onClick={handleLinkClick}>
          <img
            src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
            alt="Amazon logo"
            className="w-[90px] object-contain"
          />
        </Link>
        <button className="bg-transparent text-gray-300 border border-gray-600 rounded-sm p-1.5 text-sm cursor-pointer hover:border-white hover:text-white" type="button" aria-label="Change language">
          <span>🌐</span>
          English
        </button>
        <button className="bg-transparent text-gray-300 border border-gray-600 rounded-sm p-1.5 text-sm cursor-pointer hover:border-white hover:text-white" type="button" aria-label="Change currency">
          $ USD - U.S. Dollar
        </button>
        <button className="bg-transparent text-gray-300 border border-gray-600 rounded-sm p-1.5 text-sm cursor-pointer hover:border-white hover:text-white" type="button" aria-label="Change country">
          🇺🇸 United States
        </button>
      </div>

      <div className="bg-amazonclone-darkblue grid grid-cols-auto-fit-140 gap-x-3.5 gap-y-4 px-15 py-9 lg:px-8">
        {SERVICES_GRID.map((service) => (
          <Link
            className="flex flex-col gap-1 text-xs text-gray-300 no-underline hover:underline hover:text-white"
            to={service.to}
            key={service.label}
            onClick={handleLinkClick}
          >
            <span className="text-white font-semibold">{service.label}</span>
            <span className="text-gray-500 leading-tight">{service.description}</span>
          </Link>
        ))}
      </div>

      <div className="bg-amazonclone-darkblue border-t border-gray-700 py-4.5 px-15 text-center text-xs text-gray-500 lg:px-8">
        <div className="flex justify-center flex-wrap gap-4 mb-2.5">
          {LEGAL_LINKS.map((link) => (
            <Link to={link.to} key={link.label} onClick={handleLinkClick} className="text-gray-300 no-underline hover:underline hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <p className="m-0">
          © {new Date().getFullYear()} Amazon Clone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
