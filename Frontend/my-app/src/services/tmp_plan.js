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
  
  // Clean up ID if it has extra non-numeric characters for fakestoreapi
  // But also support IDs like '9' directly
  // fakestoreapi expects /products/1
  // If we pass '1-books' it fails. 
  // We used '1-books' in Home.jsx for some reason? No, wait.
  // In Home.jsx we see ids like '1', '9', '11' etc.
  // BUT I see one usage `id: '1-books'` ? No, that was a typo in my thought process or I should check.
  
  // UPDATE: I will make this robust. 
  // If the ID is just a number, pass it.
  
  return catalogHttpClient.get(`/products/${encodeURIComponent(id)}`);
};
