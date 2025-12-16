import { catalogHttpClient, createHttpClient } from "./httpClient";

// Provider-facing catalog API.
// Hides third‑party specifics behind a stable interface that the rest of the app can rely on.

// fakestoreapi exposes flat category slugs (e.g., "electronics", "jewelery").
// The routing layer is responsible for turning deep paths into a concrete provider category.

// Dedicated client for book data; DummyJSON exposes a real books catalog.
const booksHttpClient = createHttpClient({
  baseUrl: "https://dummyjson.com",
});
export const fetchProviderCategories = async () => {
  // GET /products/categories -> string[]
  return catalogHttpClient.get("/products/categories");
};

export const fetchProviderCategoryProducts = async ({
  providerCategorySlug,
}) => {
  if (!providerCategorySlug) {
    throw new Error(
      "fetchProviderCategoryProducts: providerCategorySlug is required"
    );
  }

  if (providerCategorySlug === "books") {
    const payload = await booksHttpClient.get("/products/category/books");
    const products = payload?.products ?? [];

    return products.map((product) => ({
      id: `book-${product.id}`,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.thumbnail || product.images?.[0],
      rating: {
        rate: product.rating,
        count: product.stock,
      },
      category: "books",
      _provider: "dummyjson",
    }));
  }

  // GET /products/category/:slug -> Product[]
  return catalogHttpClient.get(
    `/products/category/${encodeURIComponent(providerCategorySlug)}`
  );
};

export const fetchProviderProductById = async ({ id }) => {
  if (!id) {
    throw new Error("fetchProviderProductById: id is required");
  }

  const stringId = String(id);

  if (stringId.startsWith("book-")) {
    const bookId = stringId.replace("book-", "");
    const product = await booksHttpClient.get(
      `/products/${encodeURIComponent(bookId)}`
    );

    return {
      id: `book-${product.id}`,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.thumbnail || product.images?.[0],
      rating: {
        rate: product.rating,
        count: product.stock,
      },
      category: "books",
      _provider: "dummyjson",
    };
  }

  // GET /products/:id -> Product
  return catalogHttpClient.get(`/products/${encodeURIComponent(id)}`);
};
