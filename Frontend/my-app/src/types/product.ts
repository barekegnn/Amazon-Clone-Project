export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: string | number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
  _provider?: string;
}