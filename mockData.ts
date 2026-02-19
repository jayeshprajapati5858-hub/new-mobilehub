
import { Product, Category, Banner } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Titanium design, A17 Pro chip, customizable Action button, and a more versatile Pro camera system.',
    price: 99900,
    originalPrice: 109900,
    category: Category.MOBILES,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: 124,
    stock: 15,
    brand: 'Apple',
    isFeatured: true,
    isDeal: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'The most powerful Galaxy smartphone yet, with Galaxy AI, S Pen support, and ultimate zoom.',
    price: 112000,
    originalPrice: 129000,
    category: Category.MOBILES,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: 89,
    stock: 8,
    brand: 'Samsung',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with exceptional sound and call quality.',
    price: 24900,
    originalPrice: 29900,
    category: Category.ACCESSORIES,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 210,
    stock: 25,
    brand: 'Sony',
    isDeal: true
  },
  {
    id: '5',
    name: 'Anker PowerCore 20K',
    description: 'High-speed 20000mAh power bank for all your mobile devices.',
    price: 3500,
    originalPrice: 4500,
    category: Category.ACCESSORIES,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3bd931980f?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: 450,
    stock: 40,
    brand: 'Anker'
  },
  {
    id: '6',
    name: 'OnePlus 12',
    description: 'Smooth Beyond Belief. Fast charging, flagship performance, Hasselblad camera.',
    price: 64999,
    category: Category.MOBILES,
    image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 67,
    stock: 12,
    brand: 'OnePlus'
  }
];

export const MOCK_BANNERS: Banner[] = [
  {
    id: 'b1',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1200&h=400',
    title: 'Festive Season Sale',
    subtitle: 'Up to 40% Off on Premium Accessories',
    link: '/shop'
  },
  {
    id: 'b2',
    image: 'https://images.unsplash.com/photo-1556656793-062ff9878220?auto=format&fit=crop&q=80&w=1200&h=400',
    title: 'New Launch: Galaxy S24',
    subtitle: 'Now Available at MobileHub with Exclusive Gifts',
    link: '/product/2'
  }
];
