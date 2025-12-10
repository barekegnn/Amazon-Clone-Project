import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getCartTotal } from '../../context/cartReducer';

const DEPARTMENTS = [
  'Books', 'Electronics', 'Fashion', 'Home & Garden', 'Toys & Games',
  'Sports & Outdoors', 'Health & Beauty', 'Automotive', 'Grocery'
];

function Header() {
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isDepartmentsDropdownOpen, setDepartmentsDropdownOpen] = useState(false);
  const { state } = useCart();
  const { basket /*, user */ } = state;

  return (
    <header className="sticky top-0 z-50 bg-amazonclone-header text-white font-amazonember w-full" role="banner">
      {/* Top Header Row - Dark Blue */}
      <div className="max-w-[1500px] mx-auto h-[60px] flex items-center px-3 gap-3">
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <Link to="/" className="flex items-center p-1.5 border border-transparent hover:border-white focus:outline-none focus:border-white rounded-sm" aria-label="Amazon home">
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="Amazon"
              className="h-7 pt-1 object-contain"
            />
          </Link>
          
          {/* Location Delivery - Hidden on mobile */}
          <Link
            to="/gp/delivery/ajax/address-change.html"
            className="flex items-center gap-1 p-2 border border-transparent hover:border-white focus:border-white rounded-sm leading-tight min-w-[100px] hidden md:flex"
            aria-label="Choose your delivery location"
          >
            <span className="block mt-1" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 2a7.5 7.5 0 00-7.5 7.5c0 5.6 7.5 12.5 7.5 12.5s7.5-6.9 7.5-12.5A7.5 7.5 0 0012 2zm0 10.5a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-300 leading-3">Deliver to</span>
              <span className="text-sm font-bold leading-4">Ethiopia</span>
            </div>
          </Link>
        </div>

        {/* Search Bar - Centered and Large */}
        <form className="flex-1 flex items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-3 focus-within:ring-amazonclone-orange" role="search">
          <label className="sr-only" htmlFor="header-search-input">
            Search Amazon
          </label>
          <div className="relative h-full flex-shrink-0"> 
             <select
              className="h-full bg-gray-100 hover:bg-gray-200 border-r border-gray-300 text-xs text-gray-700 px-3 cursor-pointer rounded-l-md focus:outline-none"
              aria-label="Search category"
              defaultValue="all"
            >
              <option value="all">All</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="computers">Computers</option>
              <option value="deals">Deals</option>
            </select>
          </div>
         
          <input
            id="header-search-input"
            className="flex-1 h-full px-3 text-base text-gray-900 border-none outline-none placeholder-gray-600 bg-white"
            type="text"
            placeholder="Search Amazon"
          />
          <button 
            className="bg-amazonclone-orange hover:bg-[#f3a847] h-full w-12 flex items-center justify-center border-none cursor-pointer focus:outline-none" 
            type="submit" 
            aria-label="Go"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#333333" aria-hidden>
              <path d="M10.5 3a7.5 7.5 0 015.96 12.1l4.22 4.2-1.4 1.42-4.22-4.22A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
            </svg>
          </button>
        </form>

        {/* Right Side Nav Items */}
        <nav className="flex items-center gap-1 ml-1" aria-label="Account and shopping options">
          {/* Language Selector */}
          <Link to="/gp/customer-preferences/select-language" className="flex items-end gap-1 p-2 border border-transparent hover:border-white focus:border-white rounded-sm hidden sm:flex">
            <img
              className="w-5 h-4 object-cover mb-0.5"
              src="https://flagcdn.com/us.svg"
              alt="United States flag"
            />
            <span className="text-sm font-bold">EN</span>
            <span className="text-[10px] text-gray-400 mb-1">▾</span>
          </Link>

          {/* Account & Lists */}
          <div
            className="relative trigger-dropdown"
            onMouseEnter={() => setAccountDropdownOpen(true)}
            onMouseLeave={() => setAccountDropdownOpen(false)}
          >
            <Link to="/login" className="flex flex-col p-2 border border-transparent hover:border-white focus:border-white rounded-sm leading-tight">
              <span className="text-xs text-gray-200">Hello, sign in</span>
              <div className="flex items-center gap-0.5">
                <span className="text-sm font-bold">Account &amp; Lists</span>
                <span className="text-[10px] text-gray-400 mt-1">▾</span>
              </div>
            </Link>
            
            {isAccountDropdownOpen && (
              <div className="absolute top-full right-0 bg-white shadow-lg rounded-sm w-60 py-2 border border-gray-200 z-20 text-gray-900 mt-1">
                 {/* Dropdown Arrow */}
                 <div className="absolute -top-1.5 right-8 w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                 
                 <div className="flex flex-col items-center p-3 bg-gray-50 border-b border-gray-200">
                    <Link to="/login" className="bg-[#FFD814] w-48 py-1.5 rounded-md text-sm font-normal text-center shadow-sm hover:bg-[#F7CA00]">Sign in</Link>
                    <p className="text-[11px] mt-1.5 text-gray-600">New customer? <Link to="/register" className="text-blue-600 hover:text-orange-700 hover:underline">Start here.</Link></p>
                 </div>

                <div className="flex p-3">
                  <div className="w-1/2 pr-2 border-r border-gray-200">
                     <h3 className="text-base font-bold mb-1">Your Lists</h3>
                     <a href="#" className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline">Create a List</a>
                     <a href="#" className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline">Find a List or Registry</a>
                  </div>
                  <div className="w-1/2 pl-3">
                    <h3 className="text-base font-bold mb-1">Your Account</h3>
                    <Link to="/account" className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline">Account</Link>
                    <Link to="/orders" className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline">Orders</Link>
                    <Link to="/recommendations" className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline">Recommendations</Link>
                    <Link to="/watchlist" className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline">Watchlist</Link>
                    <Link to="/music" className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline">Music Library</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <Link to="/orders" className="flex flex-col p-2 border border-transparent hover:border-white focus:border-white rounded-sm leading-tight">
            <span className="text-xs text-gray-200">Returns</span>
            <span className="text-sm font-bold">&amp; Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex items-end p-2 border border-transparent hover:border-white focus:border-white rounded-sm relative">
            <div className="relative">
              <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-[#f08804] font-bold text-base w-4 text-center">
                {basket?.length}
              </span>
              <svg width="38" height="26" viewBox="0 0 50 35" className="fill-white">
                <path d="M22.05 27.99l-13.04.01L1.13 6.32h47.74l-7.9 21.67H22.05zm5.54-5.34l7.98-13.2H14.43l7.98 13.2h5.18zM0 6.32h50L39.73 34H10.27L0 6.32z" fill="none" />
                <path d="M38.5 35H11.5L0 3H50L38.5 35zM12.9 32h24.2l9.9-27H3.01l9.89 27z" />
                <circle cx="15" cy="42" r="4" />
                <circle cx="35" cy="42" r="4" />
                 {/* Simple cart icon using generic path or similar */}
                <path d="M10 0h30v5l-4 15h-22l-4-15v-5z" fill="none"/>
              </svg>
              {/* Better SVG for cart */}
               <svg className="h-8 w-8 text-white" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            </div>
            <span className="font-bold text-sm text-white mt-3 leading-none">Cart</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Header Row - Navigation - Lighter Blue/Gray */}
      <div className="bg-amazonclone-lightgray h-[39px] flex items-center text-white px-3 text-sm font-medium">
        <div className="flex items-center h-full overflow-x-auto whitespace-nowrap scrollbar-hide gap-1">
            <Link
                to="#"
                className="flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white rounded-sm focus:outline-none"
                onMouseEnter={() => setDepartmentsDropdownOpen(true)}
                onMouseLeave={() => setDepartmentsDropdownOpen(false)}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
                </svg>
                <span className="font-bold">All</span>
            </Link>

            <Link to="/deals" className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm">Today's Deals</Link>
            <Link to="/prime-video" className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm">Prime Video</Link>
            <Link to="/registry" className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm">Registry</Link>
            <Link to="/gift-cards" className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm">Gift Cards</Link>
            <Link to="/customer-service" className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm">Customer Service</Link>
            <Link to="/sell" className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm">Sell</Link>
        </div>
         <div className="ml-auto flex items-center h-8 px-2 border border-transparent hover:border-white rounded-sm hidden lg:flex font-bold">
            Shop deals in Electronics
         </div>
      </div>
      
       {/* Departments Dropdown (Rendered outside for correct stacking) */}
        {isDepartmentsDropdownOpen && (
              <div 
                className="absolute top-[99px] left-2 bg-white shadow-lg rounded-sm w-72 text-gray-900 z-50 animate-fadeIn border border-gray-300"
                onMouseEnter={() => setDepartmentsDropdownOpen(true)}
                onMouseLeave={() => setDepartmentsDropdownOpen(false)}
              >
                <div className="p-0">
                  <div className="bg-amazonclone-lightgray text-white p-3 font-bold text-lg flex items-center gap-2">
                       <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg> 
                       Hello, Sign in
                  </div>
                  <h3 className="text-lg font-bold px-4 pt-4 pb-2">Digital Content & Devices</h3>
                   {DEPARTMENTS.slice(0, 3).map((department) => (
                    <Link key={department} to={`/department/${department.toLowerCase().replace(/ & /g, '-')}`} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center group">
                      {department}
                      <span className="text-gray-400 group-hover:text-gray-900">›</span>
                    </Link>
                  ))}
                   <div className="border-t border-gray-200 my-2"></div>
                   <h3 className="text-lg font-bold px-4 pt-2 pb-2">Shop By Department</h3>
                   {DEPARTMENTS.slice(3).map((department) => (
                    <Link key={department} to={`/department/${department.toLowerCase().replace(/ & /g, '-')}`} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center group">
                      {department}
                      <span className="text-gray-400 group-hover:text-gray-900">›</span>
                    </Link>
                  ))}
                </div>
              </div>
        )}
    </header>
  );
}

export default Header;
