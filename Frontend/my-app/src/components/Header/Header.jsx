import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header" role="banner">
      <div className="header__container">
        <div className="header__left">
          <a className="header__logo" href="/" aria-label="Amazon home">
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="Amazon"
            />
          </a>

          <a
            className="header__deliver"
            href="/gp/delivery/ajax/address-change.html"
            aria-label="Choose your delivery location"
          >
            <span className="header__deliverIcon" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a7.5 7.5 0 00-7.5 7.5c0 5.6 7.5 12.5 7.5 12.5s7.5-6.9 7.5-12.5A7.5 7.5 0 0012 2zm0 10.5a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
            </span>
            <span className="header__deliverText">
              <span className="header__optionLineOne">Deliver to</span>
              <span className="header__optionLineTwo header__deliverLocation">Ethiopia</span>
            </span>
          </a>
        </div>

        <form className="header__search" role="search">
          <label className="visually-hidden" htmlFor="header-search-input">
            Search Amazon
          </label>
          <select
            className="header__searchSelect"
            aria-label="Search category"
            defaultValue="all"
          >
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="beauty">Beauty</option>
          </select>
          <input
            id="header-search-input"
            className="header__searchInput"
            type="text"
            placeholder="Search Amazon"
          />
          <button className="header__searchButton" type="submit" aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M10.5 3a7.5 7.5 0 015.96 12.1l4.22 4.2-1.4 1.42-4.22-4.22A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
            </svg>
          </button>
        </form>

        <nav className="header__nav" aria-label="Account and shopping options">
          <a className="header__option header__option--language" href="/gp/customer-preferences/select-language">
            <img
              className="header__flag"
              src="https://flagcdn.com/us.svg"
              alt="United States flag"
            />
            <span className="header__optionLineTwo">EN</span>
            <span className="header__arrow" aria-hidden>▾</span>
          </a>

          <a className="header__option header__option--account" href="/login">
            <span>
              <span className="header__optionLineOne">Hello, sign in</span>
              <span className="header__optionLineTwo">Account &amp; Lists</span>
            </span>
            <span className="header__arrow" aria-hidden>▾</span>
          </a>

          <a className="header__option" href="/orders">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">&amp; Orders</span>
          </a>

          <a className="header__option header__option--cart" href="/cart">
            <span className="header__cartIcon" aria-hidden>
              <svg width="44" height="40" viewBox="0 0 512 512" fill="currentColor">
                <path d="M160 400a32 32 0 1032 32 32 32 0 00-32-32zm224 0a32 32 0 1032 32 32 32 0 00-32-32zM152.3 320l-9.6-48h246.2a32 32 0 0029.7-21.1l48.3-128a16 16 0 00-15-21.9H138.5l-9.7-48H32v32h78.2l48 240H408v-32z" />
              </svg>
            </span>
            <span className="header__cartCount">0</span>
            <span className="header__optionLineTwo header__cartLabel">Cart</span>
          </a>
        </nav>
      </div>

      <div className="header__bottomNav" aria-label="Secondary navigation">
        <div className="header__bottomInner">
          <a className="header__bottomItem header__bottomItem--menu" href="/gp/site-directory">
            <span className="header__hamburger" aria-hidden>
              <span />
              <span />
              <span />
            </span>
            All
          </a>
          <a className="header__bottomItem" href="/deals">Today's Deals</a>
          <a className="header__bottomItem" href="/prime">Prime</a>
          <a className="header__bottomItem" href="/video">Prime Video</a>
          <a className="header__bottomItem" href="/customer-service">Customer Service</a>
          <a className="header__bottomItem" href="/registry">Registry</a>
          <a className="header__bottomItem" href="/gift-cards">Gift Cards</a>
          <a className="header__bottomItem" href="/sell">Sell</a>
        </div>
        <div className="header__bottomPromo">Shop deals in Electronics</div>
      </div>
    </header>
  );
}

export default Header;
