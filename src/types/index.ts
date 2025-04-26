// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  featured: boolean;
  rating: number;
  stock: number;
  colors?: string[];
  sizes?: string[];
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
}