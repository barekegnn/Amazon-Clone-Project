import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import { searchProviderProducts } from "../services/catalogApi";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const title = useMemo(() => {
    if (!query) return "Search";
    return `Results for "${query}"`;
  }, [query]);

  useEffect(() => {
    let isActive = true;

    async function run() {
      if (!query) {
        setResults([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const payload = await searchProviderProducts({ query, limit: 24 });
        if (!isActive) return;
        setResults(payload.products ?? []);
      } catch (err) {
        if (!isActive) return;
        setError(err);
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    }

    run();

    return () => {
      isActive = false;
    };
  }, [query]);

  return (
    <div className="bg-white min-h-screen pb-10">
      <div className="bg-gray-100 py-2 border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4">
          <nav className="text-xs text-gray-600" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link
                  to="/"
                  className="text-blue-600 hover:text-amazonclone-orange hover:underline"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <span>/</span>
                <span className="text-gray-900 font-semibold" aria-current="page">
                  Search
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 pt-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        {query ? (
          <p className="text-gray-600 mb-6">
            Browse matching items. Try refining your query if you don&apos;t see what
            you want.
          </p>
        ) : (
          <p className="text-gray-600 mb-6">
            Type something in the search box to see results.
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amazonclone-orange" />
              <span className="text-sm text-gray-600">Searching...</span>
            </div>
          </div>
        ) : error ? (
          <div className="border border-red-200 bg-red-50 rounded-md p-6">
            <h2 className="text-lg font-semibold text-red-700 mb-2">
              We couldn&apos;t complete your search
            </h2>
            <p className="text-sm text-red-600">
              {error?.message || "Please try again."}
            </p>
          </div>
        ) : results.length === 0 && query ? (
          <section className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-500 mt-4">
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p>Try a different search term.</p>
          </section>
        ) : results.length > 0 ? (
          <section>
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((product) => (
                <article
                  key={product.id}
                  className="border border-gray-200 rounded-md p-4 flex flex-col bg-white"
                >
                  <div className="relative pt-[100%] mb-4 bg-gray-100 rounded-sm overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-base font-medium text-gray-900 hover:text-amazonclone-orange hover:underline line-clamp-3 mb-1"
                  >
                    {product.title}
                  </Link>
                  <div className="flex items-center mb-1">
                    <div className="flex items-center text-yellow-500 text-sm">
                      <span className="font-bold text-gray-700 mr-1">
                        {product.rating?.rate ?? product.rating ?? 0}
                      </span>
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i <
                              Math.floor(
                                product.rating?.rate ?? product.rating ?? 0
                              )
                                ? "fill-[#F5C518] text-[#F5C518]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <span className="text-xs text-blue-600 ml-1">
                      ({product.rating?.count ?? "—"})
                    </span>
                  </div>
                  <div className="mt-auto">
                    <div className="text-xl font-bold text-gray-900">
                      <span className="text-xs align-top">$</span>
                      {Math.floor(product.price)}
                      <span className="text-xs align-top">
                        {Number(product.price % 1).toFixed(2).substring(2)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Delivery by{" "}
                      <span className="font-bold text-gray-800">Tomorrow</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default SearchResults;

