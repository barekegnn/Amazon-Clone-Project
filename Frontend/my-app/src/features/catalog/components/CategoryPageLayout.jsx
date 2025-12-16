import { Link } from "react-router-dom";
import { Star } from "lucide-react";

// Stateless layout for category results.
// All branching (loading / error / empty) is handled by the caller.
const CategoryPageLayout = ({
  title,
  description,
  breadcrumbs,
  products,
  categoriesIndex,
  childrenCategories,
}) => {
  const hasChildren =
    Array.isArray(childrenCategories) && childrenCategories.length > 0;
  const isEmpty = !products || products.length === 0;

  return (
    <div className="bg-white min-h-screen pb-10">
      <div className="bg-gray-100 py-2 border-b border-gray-200">
        <div className="max-w-[1500px] mx-auto px-4">
          <nav className="text-xs text-gray-600" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              {breadcrumbs.map((crumb, idx) => (
                <li key={crumb.href || idx} className="flex items-center gap-1">
                  {idx > 0 && <span>/</span>}
                  {crumb.isCurrent ? (
                    <span
                      className="text-gray-900 font-semibold"
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.href}
                      className="text-blue-600 hover:text-amazonclone-orange hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 pt-4 flex gap-6">
        <aside className="hidden lg:block w-[240px] shrink-0 border-r border-gray-200 pr-4">
          <h3 className="font-bold text-sm mb-2">Departments</h3>
          <ul className="pl-2 space-y-1 mb-6">
            {categoriesIndex?.length ? (
              categoriesIndex.map((raw) => (
                <li key={raw}>
                  <Link
                    to={`/category/${encodeURIComponent(raw)}`}
                    className="text-sm text-gray-700 hover:text-amazonclone-orange hover:underline"
                  >
                    {raw}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic">
                No provider categories available
              </li>
            )}
          </ul>
        </aside>

        <main className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600 mb-6 max-w-prose">{description}</p>
          )}

          {hasChildren && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Shop by category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {childrenCategories.map((child) => (
                  <Link
                    key={child.id}
                    to={child.fullPath || child.path || "#"}
                    className="bg-gray-50 border border-gray-200 p-4 rounded-md hover:shadow-lg transition-shadow flex flex-col items-center text-center h-full justify-center"
                  >
                    <div className="font-semibold text-gray-900">
                      {child.name}
                    </div>
                    {child.description && (
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {child.description}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {isEmpty && !hasChildren ? (
            <section className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-500 mt-4">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p>Try a different department or refine your selection.</p>
            </section>
          ) : !isEmpty ? (
            <section>
              <h2 className="text-xl font-bold mb-4">Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="border border-gray-200 rounded-md p-4 flex flex-col bg-white"
                  >
                    <div className="relative pt-[100%] mb-4 bg-gray-100 rounded-sm overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-contain p-2"
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
                              // lucide-react icons are pure SVG; safe to use as visual-only here.
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
                          {Number(product.price % 1)
                            .toFixed(2)
                            .substring(2)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Delivery by{" "}
                        <span className="font-bold text-gray-800">
                          Tomorrow
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default CategoryPageLayout;
