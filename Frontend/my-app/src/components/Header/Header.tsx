import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useDebounce } from "../../hooks/useDebounce";
import { getProducts } from "../../services/productApi";
import { ThemeToggle } from "../common/ThemeToggle";
import { useAuth } from "../../context/AuthContextAPI"; // Using Backend API

interface HeaderProps {
    // definedprops
}

type SearchSuggestionKind = "product" | "category" | "query";

interface SearchSuggestion {
  id: string;
  label: string;
  kind: SearchSuggestionKind;
  href: string;
}

const DEPARTMENTS = [
  "Books",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Toys & Games",
  "Sports & Outdoors",
  "Health & Beauty",
  "Automotive",
  "Grocery",
];

function departmentToPath(department: string) {
  return `/category/${department.toLowerCase().replace(/ & /g, "-")}`;
}

function buildQueryHref(query: string) {
  return `/search?q=${encodeURIComponent(query)}`;
}

function Header(_props: HeaderProps) {
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isDepartmentsDropdownOpen, setDepartmentsDropdownOpen] =
    useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 250);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSuggestionsOpen, setSuggestionsOpen] = useState(false);
  const [isSuggestionsLoading, setSuggestionsLoading] = useState(false);

  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  
  const dropdownRootRef = useRef<HTMLDivElement | null>(null);
  const lastRequestedQueryRef = useRef<string>("");

  const departmentSuggestions = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];

    return DEPARTMENTS.filter((d) => d.toLowerCase().includes(q))
      .slice(0, 4)
      .map<SearchSuggestion>((d) => ({
        id: `dept-${d}`,
        label: d,
        kind: "category",
        href: departmentToPath(d),
      }));
  }, [debouncedQuery]);

  useEffect(() => {
    const onScroll = () => {
      setHasShadow(window.scrollY > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const root = dropdownRootRef.current;
      if (!root) return;
      if (e.target instanceof Node && !root.contains(e.target)) {
        setSuggestionsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    const q = debouncedQuery.trim();

    if (!q) {
      setSuggestions([]);
      setSuggestionsLoading(false);
      return;
    }

    let isActive = true;
    lastRequestedQueryRef.current = q;

    async function run() {
      setSuggestionsLoading(true);
      try {
        const products = await getProducts({ search: q, limit: 6 });
        if (!isActive) return;
        // Ignore out-of-order responses.
        if (lastRequestedQueryRef.current !== q) return;

        const productSuggestions: SearchSuggestion[] = (products ?? [])
          .slice(0, 6)
          .map((p) => ({
            id: String(p.id),
            label: String(p.title ?? ""),
            kind: "product",
            href: `/product/${encodeURIComponent(String(p.id))}`,
          }))
          .filter((s) => s.label);

        const querySuggestion: SearchSuggestion = {
          id: `q-${q}`,
          label: `Search for "${q}"`,
          kind: "query",
          href: buildQueryHref(q),
        };

        // Combine: query action + departments + products.
        setSuggestions([querySuggestion, ...departmentSuggestions, ...productSuggestions]);
      } catch {
        if (!isActive) return;
        // If provider search fails, keep category suggestions so UX still works.
        const qSuggestion: SearchSuggestion = {
          id: `q-${q}`,
          label: `Search for "${q}"`,
          kind: "query",
          href: buildQueryHref(q),
        };
        setSuggestions([qSuggestion, ...departmentSuggestions]);
      } finally {
        if (!isActive) return;
        setSuggestionsLoading(false);
      }
    }

    run();

    return () => {
      isActive = false;
    };
  }, [debouncedQuery, departmentSuggestions]);

  function openSuggestionsIfUseful(next: string) {
    const q = next.trim();
    setSuggestionsOpen(Boolean(q));
  }

  function submitSearch(queryOverride?: string) {
    const q = String(queryOverride ?? searchQuery).trim();
    if (!q) return;
    setSuggestionsOpen(false);
    setMobileSearchOpen(false);
    navigate(buildQueryHref(q));
  }

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-amazonclone-header text-white font-amazonember w-full",
        hasShadow ? "shadow-lg shadow-black/30" : "",
      ].join(" ")}
      role="banner"
    >
      {/* Top Header Row */}
      <div className="max-w-[1500px] mx-auto h-[60px] flex items-center px-3 gap-2 md:gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 border border-transparent hover:border-white focus:border-white rounded-sm"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => {
            setMobileMenuOpen((v) => !v);
            setDepartmentsDropdownOpen(false);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            to="/"
            className="flex items-center p-1.5 border border-transparent hover:border-white focus:outline-none focus:border-white rounded-sm"
            aria-label="Amazon home"
          >
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="Amazon"
              className="h-6 sm:h-7 md:h-7 pt-1 object-contain"
            />
          </Link>

          {/* Location Delivery - Hidden on mobile */}
          <Link
            to="/gp/delivery/ajax/address-change.html"
            className="flex items-center gap-1 p-2 border border-transparent hover:border-white focus:border-white rounded-sm leading-tight min-w-[100px] hidden md:flex"
            aria-label="Choose your delivery location"
          >
            <span className="block mt-1" aria-hidden>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M12 2a7.5 7.5 0 00-7.5 7.5c0 5.6 7.5 12.5 7.5 12.5s7.5-6.9 7.5-12.5A7.5 7.5 0 0012 2zm0 10.5a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-300 leading-3">Deliver to</span>
              <span className="text-sm font-bold leading-4">Ethiopia</span>
            </div>
          </Link>
        </div>

        {/* Desktop search */}
        <div className="flex-1 hidden md:block" ref={dropdownRootRef}>
          <form
            className="relative flex items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-3 focus-within:ring-amazonclone-orange"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch();
            }}
          >
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
              value={searchQuery}
              onChange={(e) => {
                const next = e.target.value;
                setSearchQuery(next);
                openSuggestionsIfUseful(next);
              }}
              onFocus={() => openSuggestionsIfUseful(searchQuery)}
              autoComplete="off"
            />
            <button
              className="bg-amazonclone-orange hover:bg-[#f3a847] h-full w-12 flex items-center justify-center border-none cursor-pointer focus:outline-none"
              type="submit"
              aria-label="Search"
            >
              <Search size={22} className="text-[#333333]" aria-hidden />
            </button>

            {/* Suggestions dropdown */}
            {isSuggestionsOpen && (suggestions.length > 0 || isSuggestionsLoading) && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white text-gray-900 border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                {isSuggestionsLoading && (
                  <div className="px-3 py-2 text-xs text-gray-500">Searching…</div>
                )}
                <ul className="max-h-80 overflow-auto">
                  {suggestions.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center justify-between gap-3"
                        onClick={() => {
                          setSuggestionsOpen(false);
                          setMobileSearchOpen(false);
                          navigate(s.href);
                        }}
                      >
                        <span className="line-clamp-1">{s.label}</span>
                        <span className="text-[11px] text-gray-400 shrink-0">
                          {s.kind === "product"
                            ? "Product"
                            : s.kind === "category"
                              ? "Department"
                              : "Search"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>

        {/* Mobile search button */}
        <button
          type="button"
          className="md:hidden p-2 border border-transparent hover:border-white focus:border-white rounded-sm"
          aria-label={isMobileSearchOpen ? "Close search" : "Open search"}
          aria-expanded={isMobileSearchOpen}
          onClick={() => {
            setMobileSearchOpen((v) => !v);
            setSuggestionsOpen(false);
          }}
        >
          {isMobileSearchOpen ? <X size={20} aria-hidden /> : <Search size={20} aria-hidden />}
        </button>

        {/* Right Side Nav Items */}
        <nav className="flex items-center gap-1 ml-auto" aria-label="Account and shopping options">
          {/* Language Selector */}
          <Link
            to="/gp/customer-preferences/select-language"
            className="flex items-end gap-1 p-2 border border-transparent hover:border-white focus:border-white rounded-sm hidden sm:flex"
          >
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
            <Link
              to={user ? "/account" : "/login"}
              className="flex flex-col p-2 border border-transparent hover:border-white focus:border-white rounded-sm leading-tight"
            >
              <span className="text-xs text-gray-200">
                Hello, {user ? user.displayName || 'User' : 'sign in'}
              </span>
              <div className="flex items-center gap-0.5">
                <span className="text-sm font-bold">Account &amp; Lists</span>
                <span className="text-[10px] text-gray-400 mt-1">▾</span>
              </div>
            </Link>

            {isAccountDropdownOpen && (
              <div className="absolute top-full right-0 bg-white shadow-lg rounded-sm w-60 py-2 border border-gray-200 z-20 text-gray-900 mt-1">
                <div className="absolute -top-1.5 right-8 w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-45" />
                
                {!user ? (
                  <div className="flex flex-col items-center p-3 bg-gray-50 border-b border-gray-200">
                    <Link
                      to="/login"
                      className="bg-[#FFD814] w-48 py-1.5 rounded-md text-sm font-normal text-center shadow-sm hover:bg-[#F7CA00]"
                    >
                      Sign in
                    </Link>
                    <p className="text-[11px] mt-1.5 text-gray-600">
                      New customer?{" "}
                      <Link
                        to="/register"
                        className="text-blue-600 hover:text-orange-700 hover:underline"
                      >
                        Start here.
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-3 bg-gray-50 border-b border-gray-200">
                    <p className="text-sm font-semibold mb-2">
                      {user.displayName || user.email}
                    </p>
                    <button
                      onClick={async () => {
                        await logout();
                        setAccountDropdownOpen(false);
                        navigate('/');
                      }}
                      className="bg-[#FFD814] w-48 py-1.5 rounded-md text-sm font-normal text-center shadow-sm hover:bg-[#F7CA00]"
                    >
                      Sign out
                    </button>
                  </div>
                )}

                <div className="flex p-3">
                  <div className="w-1/2 pr-2 border-r border-gray-200">
                    <h3 className="text-base font-bold mb-1">Your Lists</h3>
                    <Link
                      to="#"
                      className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline"
                    >
                      Create a List
                    </Link>
                    <Link
                      to="#"
                      className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline"
                    >
                      Find a List or Registry
                    </Link>
                  </div>
                  <div className="w-1/2 pl-3">
                    <h3 className="text-base font-bold mb-1">Your Account</h3>
                    <Link
                      to="/account"
                      className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline"
                    >
                      Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/recommendations"
                      className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline"
                    >
                      Recommendations
                    </Link>
                    <Link
                      to="/watchlist"
                      className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline"
                    >
                      Watchlist
                    </Link>
                    <Link
                      to="/music"
                      className="block py-1 text-xs text-gray-700 hover:text-amazonclone-orange hover:underline"
                    >
                      Music Library
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders - hide on smallest widths */}
          <Link
            to="/orders"
            className="hidden sm:flex flex-col p-2 border border-transparent hover:border-white focus:border-white rounded-sm leading-tight"
          >
            <span className="text-xs text-gray-200">Returns</span>
            <span className="text-sm font-bold">&amp; Orders</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link
            to="/checkout"
            className="flex items-end p-2 border border-transparent hover:border-white focus:border-white rounded-sm relative"
          >
            <div className="relative">
              <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-[#f08804] font-bold text-base w-4 text-center">
                {totalItems}
              </span>
              <svg
                className="h-8 w-8 text-white"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="font-bold text-sm text-white mt-3 leading-none hidden sm:inline">
              Cart
            </span>
          </Link>
        </nav>
      </div>

      {/* Mobile search input (collapsed by default) */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-3 pb-3" ref={dropdownRootRef}>
          <form
            className="relative flex items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-3 focus-within:ring-amazonclone-orange"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch();
            }}
          >
            <label className="sr-only" htmlFor="header-search-input-mobile">
              Search Amazon
            </label>
            <input
              id="header-search-input-mobile"
              className="flex-1 h-full px-3 text-base text-gray-900 border-none outline-none placeholder-gray-600 bg-white"
              type="text"
              placeholder="Search Amazon"
              value={searchQuery}
              onChange={(e) => {
                const next = e.target.value;
                setSearchQuery(next);
                openSuggestionsIfUseful(next);
              }}
              onFocus={() => openSuggestionsIfUseful(searchQuery)}
              autoComplete="off"
            />
            <button
              className="bg-amazonclone-orange hover:bg-[#f3a847] h-full w-12 flex items-center justify-center border-none cursor-pointer focus:outline-none"
              type="submit"
              aria-label="Search"
            >
              <Search size={22} className="text-[#333333]" aria-hidden />
            </button>

            {isSuggestionsOpen && (suggestions.length > 0 || isSuggestionsLoading) && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white text-gray-900 border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                {isSuggestionsLoading && (
                  <div className="px-3 py-2 text-xs text-gray-500">Searching…</div>
                )}
                <ul className="max-h-80 overflow-auto">
                  {suggestions.map((s) => (
                    <li key={`${s.id}-m`}>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center justify-between gap-3"
                        onClick={() => {
                          setSuggestionsOpen(false);
                          setMobileSearchOpen(false);
                          navigate(s.href);
                        }}
                      >
                        <span className="line-clamp-1">{s.label}</span>
                        <span className="text-[11px] text-gray-400 shrink-0">
                          {s.kind === "product"
                            ? "Product"
                            : s.kind === "category"
                              ? "Department"
                              : "Search"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Bottom Header Row - Navigation */}
      <div className="bg-amazonclone-lightgray h-[39px] flex items-center text-white px-3 text-sm font-medium">
        <div className="flex items-center h-full overflow-x-auto whitespace-nowrap scrollbar-hide gap-1">
          <Link
            to="#"
            className="hidden md:flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white rounded-sm focus:outline-none"
            onMouseEnter={() => setDepartmentsDropdownOpen(true)}
            onMouseLeave={() => setDepartmentsDropdownOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
            <span className="font-bold">All</span>
          </Link>

          <Link
            to="/deals"
            className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm"
          >
            Today&apos;s Deals
          </Link>
          <Link
            to="/prime-video"
            className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm"
          >
            Prime Video
          </Link>
          <Link
            to="/registry"
            className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm"
          >
            Registry
          </Link>
          <Link
            to="/gift-cards"
            className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm"
          >
            Gift Cards
          </Link>
          <Link
            to="/customer-service"
            className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm"
          >
            Customer Service
          </Link>
          <Link
            to="/sell"
            className="h-8 px-2 flex items-center border border-transparent hover:border-white rounded-sm"
          >
            Sell
          </Link>
        </div>
        <div className="ml-auto flex items-center h-8 px-2 border border-transparent hover:border-white rounded-sm hidden lg:flex font-bold">
          Shop deals in Electronics
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-amazonclone-lightgray text-white border-t border-white/10">
          <div className="max-w-[1500px] mx-auto px-3 py-3 grid grid-cols-1 gap-2">
            <Link
              to="/deals"
              className="px-2 py-2 rounded-sm hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Today&apos;s Deals
            </Link>
            <Link
              to="/prime-video"
              className="px-2 py-2 rounded-sm hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Prime Video
            </Link>
            <Link
              to="/registry"
              className="px-2 py-2 rounded-sm hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Registry
            </Link>
            <Link
              to="/gift-cards"
              className="px-2 py-2 rounded-sm hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gift Cards
            </Link>
            <Link
              to="/customer-service"
              className="px-2 py-2 rounded-sm hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Customer Service
            </Link>
            <Link
              to="/sell"
              className="px-2 py-2 rounded-sm hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sell
            </Link>
            <div className="border-t border-white/10 pt-2 mt-1">
              <div className="text-xs text-gray-200 mb-1">Departments</div>
              <div className="grid grid-cols-2 gap-2">
                {DEPARTMENTS.slice(0, 8).map((d) => (
                  <Link
                    key={d}
                    to={departmentToPath(d)}
                    className="px-2 py-2 rounded-sm hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {d}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Departments Dropdown (Desktop) */}
      {isDepartmentsDropdownOpen && (
        <div
          className="absolute top-[99px] left-2 bg-white shadow-lg rounded-sm w-72 text-gray-900 z-50 animate-fadeIn border border-gray-300 hidden md:block"
          onMouseEnter={() => setDepartmentsDropdownOpen(true)}
          onMouseLeave={() => setDepartmentsDropdownOpen(false)}
        >
          <div className="p-0">
            <div className="bg-amazonclone-lightgray text-white p-3 font-bold text-lg flex items-center gap-2">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
              Hello, Sign in
            </div>
            <h3 className="text-lg font-bold px-4 pt-4 pb-2">
              Digital Content &amp; Devices
            </h3>
            {DEPARTMENTS.slice(0, 3).map((department) => (
              <Link
                key={department}
                to={departmentToPath(department)}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center group"
              >
                {department}
                <span className="text-gray-400 group-hover:text-gray-900">›</span>
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2" />
            <h3 className="text-lg font-bold px-4 pt-2 pb-2">
              Shop By Department
            </h3>
            {DEPARTMENTS.slice(3).map((department) => (
              <Link
                key={department}
                to={departmentToPath(department)}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center group"
              >
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




