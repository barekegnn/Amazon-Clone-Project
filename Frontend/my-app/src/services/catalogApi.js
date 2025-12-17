import { catalogHttpClient, createHttpClient } from "./httpClient.js";

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

  // Force numeric ID for fakestore, in case some alpha-string slipped in.
  // Fakestore only supports integer IDs (1-20). If we have "1-books", use "1".
  const numericId = stringId.replace(/\D/g, ""); 
  
  if (!numericId) {
       // If no numbers, let's just try the original string, but it will likely fail on fakestore.
       // Or we can default to '1' to always show SOMETHING.
       // Let's default to '1' if parsing failed, so the page doesn't crash/404 entirely 
       // for presentation demo purposes if the user demands "it works".
       // But better to try the fetch.
       return catalogHttpClient.get(`/products/${encodeURIComponent(id)}`);
  }

  // GET /products/:id -> Product
  return catalogHttpClient.get(`/products/${numericId}`);
};

// Search helper (DummyJSON) used by the header suggestions + /search page.
// Fakestoreapi does not expose a search endpoint, so we use DummyJSON here for a richer UX.
// The rest of the app treats these like regular products with a stable shape.
export const searchProviderProducts = async ({ query, limit = 8, skip = 0 }) => {
  const q = String(query ?? "").trim();

  if (!q) {
    return { products: [], total: 0, skip: 0, limit };
  }

  const payload = await booksHttpClient.get(
    `/products/search?q=${encodeURIComponent(q)}&limit=${encodeURIComponent(
      limit
    )}&skip=${encodeURIComponent(skip)}`
  );

  const products = payload?.products ?? [];

  return {
    total: payload?.total ?? products.length,
    skip: payload?.skip ?? skip,
    limit: payload?.limit ?? limit,
    products: products.map((product) => ({
      id: `dj-${product.id}`,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.thumbnail || product.images?.[0],
      rating: {
        rate: product.rating,
        count: product.stock,
      },
      category: product.category || "search",
      _provider: "dummyjson",
    })),
  };
};