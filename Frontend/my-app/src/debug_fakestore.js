import { fetchProviderProductById } from './services/catalogApi.js';

console.log("Testing FakeStoreAPI...");

try {
    const id = 1;
    console.log(`Fetching product ${id}...`);
    const product = await fetchProviderProductById({ id });
    console.log("Success! Product fetched:");
    console.log(product);
} catch (error) {
    console.error("Error fetching product:", error);
}

try {
    const id = 9;
    console.log(`Fetching product ${id}...`);
    const product = await fetchProviderProductById({ id });
    console.log("Success! Product 9 fetched:");
    console.log(product.title);
} catch (error) {
    console.error("Error fetching product 9:", error);
}
