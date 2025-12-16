import React from "react";
import CategoryNotFound from "../components/Category/CategoryNotFound";
import { useCategoryRoute } from "../features/catalog/hooks/useCategoryRoute";
import CategoryPageLayout from "../features/catalog/components/CategoryPageLayout";

const CategoryPage = () => {
  const {
    resolvedPath,
    isLoading,
    isError,
    error,
    categoriesIndex,
    products,
    children,
  } = useCategoryRoute();

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amazonclone-orange" />
          <span className="text-sm text-gray-600">Loading category...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    // Explicit error state keeps provider failures from leaking raw errors into the UI.
    return (
      <div className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center border border-red-200 bg-red-50 rounded-md p-6">
          <h1 className="text-lg font-semibold text-red-700 mb-2">
            We couldn&apos;t load this category
          </h1>
          <p className="text-sm text-red-600 mb-2">
            {error?.message || "The catalog service is currently unavailable."}
          </p>
          <p className="text-xs text-red-500">
            Please refresh the page or try again in a few minutes.
          </p>
        </div>
      </div>
    );
  }

  if (!resolvedPath) {
    return <CategoryNotFound />;
  }

  return (
    <CategoryPageLayout
      title={resolvedPath.displayName}
      description={
        resolvedPath.description ||
        `Browse our selection in ${resolvedPath.displayName}.`
      }
      breadcrumbs={resolvedPath.breadcrumbs}
      products={products}
      categoriesIndex={categoriesIndex}
      childrenCategories={children}
    />
  );
};

export default CategoryPage;
