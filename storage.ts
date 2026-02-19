
import { Product, User, Order } from './types';
import { MOCK_PRODUCTS } from './mockData';

const KEYS = {
  PRODUCTS: 'mh_products',
  USERS: 'mh_users',
  ORDERS: 'mh_orders',
  CURRENT_USER: 'mh_current_user'
};

export const StorageService = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(MOCK_PRODUCTS));
      return MOCK_PRODUCTS;
    }
    return JSON.parse(data);
  },

  saveProduct: (product: Product) => {
    const products = StorageService.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index > -1) {
      products[index] = product;
    } else {
      products.push({ ...product, id: Date.now().toString() });
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct: (id: string) => {
    const products = StorageService.getProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  getUsers: (): User[] => {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = StorageService.getUsers();
    if (!users.find(u => u.email === user.email)) {
      users.push(user);
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
  },

  getOrders: (): Order[] => {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  saveOrder: (order: Order) => {
    const orders = StorageService.getOrders();
    orders.unshift(order);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const orders = StorageService.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index > -1) {
      orders[index].status = status;
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    }
  }
};
