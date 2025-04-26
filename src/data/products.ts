import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience premium sound quality with our wireless headphones. Perfect for music lovers who demand the best audio experience.',
    price: 299.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Audio',
    featured: true,
    rating: 4.8,
    stock: 10,
    colors: ['Black', 'White', 'Blue'],
    sizes: [],
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Stay connected and track your fitness with our latest smartwatch. Features include heart rate monitoring, GPS, and water resistance.',
    price: 249.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Wearables',
    featured: true,
    rating: 4.5,
    stock: 15,
    colors: ['Black', 'Silver', 'Rose Gold'],
    sizes: [],
  },
  {
    id: '3',
    name: 'Ultra-Slim Laptop',
    description: 'Powerful yet lightweight laptop for professionals. Features latest processor, ample storage, and all-day battery life.',
    price: 1299.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Computers',
    featured: false,
    rating: 4.9,
    stock: 5,
    colors: ['Silver', 'Space Gray'],
    sizes: [],
  },
  {
    id: '4',
    name: 'Designer Backpack',
    description: 'Stylish and functional backpack with multiple compartments. Perfect for work, school, or travel.',
    price: 89.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Accessories',
    featured: false,
    rating: 4.4,
    stock: 20,
    colors: ['Black', 'Navy', 'Olive'],
    sizes: [],
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with amazing sound quality. Water-resistant and perfect for outdoor adventures.',
    price: 79.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Audio',
    featured: true,
    rating: 4.3,
    stock: 25,
    colors: ['Black', 'Blue', 'Red'],
    sizes: [],
  },
  {
    id: '6',
    name: 'Premium Sunglasses',
    description: 'Designer sunglasses with UV protection. Stylish frames and premium lenses.',
    price: 149.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Accessories',
    featured: false,
    rating: 4.6,
    stock: 12,
    colors: ['Black', 'Tortoise', 'Clear'],
    sizes: [],
  },
  {
    id: '7',
    name: 'Smart Home Hub',
    description: 'Control your entire smart home with this hub. Compatible with all major smart devices.',
    price: 129.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Smart Home',
    featured: false,
    rating: 4.2,
    stock: 8,
    colors: ['White', 'Black'],
    sizes: [],
  },
  {
    id: '8',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with noise cancellation and superior sound quality.',
    price: 159.99,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/7173096/pexels-photo-7173096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Audio',
    featured: true,
    rating: 4.7,
    stock: 18,
    colors: ['Black', 'White'],
    sizes: [],
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};