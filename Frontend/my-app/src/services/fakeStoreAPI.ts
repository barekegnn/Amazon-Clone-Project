import { fetchProviderProductById } from './catalogApi';
import { catalogHttpClient } from './httpClient';

export interface Product {
    id: number | string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const fetchAllProducts = async (): Promise<Product[]> => {
    // Using catalogHttpClient to fetch all products
    // Verify endpoint - usually /products for fakestore
    const response = await catalogHttpClient.get('/products');
    return response;
};

export const fetchProduct = async (id: number | string): Promise<Product> => {
    // Transforming the response to match Product interface if needed
    // catalogApi.fetchProviderProductById returns the product with id, title, etc.
    // We pass { id } object as expected by fetchProviderProductById
    return fetchProviderProductById({ id });
};
