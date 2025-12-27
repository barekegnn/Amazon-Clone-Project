import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { resolveCategoryPath } from "../routing/categoryPathResolver";
import {
  getCategories,
  getProducts,
} from "../../../services/productApi";
import { categoryService } from "../../../services/CategoryService";

// Orchestrates category URL resolution + IO against the primary provider,
// with a deterministic fallback to the local category graph when the provider
// is unavailable (e.g., network restrictions, timeouts).
export const useCategoryRoute = () => {
  const params = useParams();
  const wildcardPath = params["*"] || "";

  const [state, setState] = useState({
    isLoading: true,
    isError: false,
    error: null,
    categoriesIndex: null,
    products: [],
    children: [],
  });

  const resolvedPath = useMemo(
    () => resolveCategoryPath({ slugPath: wildcardPath }),
    [wildcardPath]
  );

  useEffect(() => {
    let isCancelled = false;

    const run = async () => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        isError: false,
        error: null,
      }));

      try {
        // Index is used to drive navigation UIs (left rail, menus) and to validate slugs.
        const categoriesIndex = await getCategories();

        let products = [];

        if (resolvedPath.providerCategorySlug) {
          products = await getProducts({
            category: resolvedPath.providerCategorySlug,
            limit: 50
          });
        }

        if (isCancelled) return;

        setState({
          isLoading: false,
          isError: false,
          error: null,
          categoriesIndex,
          products,
          children: [],
        });
      } catch (error) {
        if (isCancelled) return;

        const message = error?.message?.toLowerCase() || "";
        const isTimeout =
          message.includes("timeout") || message.includes("failed to fetch");

        // When the external provider is unreachable, degrade gracefully onto the
        // in-memory catalog so portfolio demos remain navigable.
        if (isTimeout) {
          const legacy = categoryService.resolvePath(wildcardPath);

          if (legacy) {
            setState({
              isLoading: false,
              isError: false,
              error: null,
              categoriesIndex: categoryService.categories.map((c) => c.name),
              products: legacy.products ?? [],
              children: legacy.children ?? [],
            });
            return;
          }
        }

        setState({
          isLoading: false,
          isError: true,
          error,
          categoriesIndex: null,
          products: [],
          children: [],
        });
      }
    };

    run();

    return () => {
      isCancelled = true;
    };
  }, [resolvedPath.providerCategorySlug, wildcardPath]);

  return {
    wildcardPath,
    resolvedPath,
    ...state,
  };
};
