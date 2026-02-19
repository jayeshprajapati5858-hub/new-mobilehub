
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { CartItem, Product, Category } from './types';

// --- Pages ---
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';

// --- Contexts ---
interface GlobalContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isAdmin: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  refreshData: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// --- Shared Hooks ---

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within its Provider");
  return context;
};

// --- Shared Components ---

const Navbar = () => {
  const { cart, isAdmin } = useGlobal();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50 px-4 py-4 flex justify-between items-center transition-all">
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="w-11 h-11 gradient-bg rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 group-hover:scale-105 transition-transform">
          <i className="fas fa-mobile-alt text-xl"></i>
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-xl font-black tracking-tighter text-gray-900">Mobile<span className="gradient-text">Hub</span></span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Store</span>
        </div>
      </Link>
      
      <div className="flex items-center space-x-2 md:space-x-6">
        <div className="hidden md:flex space-x-8 mr-4 text-xs font-bold uppercase tracking-widest text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/shop" className="hover:text-blue-600 transition">Shop</Link>
          {isAdmin && <Link to="/admin-portal" className="text-purple-600 font-black hover:text-purple-800 transition">Dashboard</Link>}
        </div>
        
        <button onClick={() => navigate('/cart')} className="relative p-3 bg-gray-50 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-95">
          <i className="fas fa-shopping-bag text-lg"></i>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

const MobileBottomNav = () => {
  const location = useLocation();
  const { isAdmin } = useGlobal();
  
  const navItems = [
    { path: '/', icon: 'fa-house', label: 'Home' },
    { path: '/shop', icon: 'fa-bag-shopping', label: 'Shop' },
    { path: '/cart', icon: 'fa-shopping-cart', label: 'Cart' },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin-portal', icon: 'fa-shield-halved', label: 'Admin' });
  }

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-2xl border border-white shadow-2xl shadow-gray-200/50 px-8 py-3 flex justify-between items-center z-50 rounded-[2.5rem]">
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path) && (item.path !== '/' || location.pathname === '/');
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center space-y-1 transition-all ${isActive ? 'text-blue-600 scale-110' : 'text-gray-400 opacity-60'}`}
          >
            <i className={`fas ${item.icon} text-lg`}></i>
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

// --- Route Protection ---

const AdminRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAdmin } = useGlobal();
  return isAdmin ? <>{children}</> : <Navigate to="/admin" />;
};

// --- Root Application Component ---

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('mh_admin_token') === 'true');
  const [tick, setTick] = useState(0);

  const refreshData = () => setTick(t => t + 1);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  const clearCart = () => setCart([]);

  const adminLogin = (email: string, pass: string) => {
    if (email === 'admin@mobilehub.com' && pass === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('mh_admin_token', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('mh_admin_token');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <GlobalContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
      isAdmin, adminLogin, adminLogout, refreshData
    }}>
      <Router>
        <div className="pb-32 md:pb-0 min-h-screen bg-gray-50 flex flex-col selection:bg-blue-100 selection:text-blue-600">
          <Navbar />
          <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              
              {/* Admin Protected Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin-portal" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin-portal/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
              <Route path="/admin-portal/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
              <Route path="/admin-portal/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <MobileBottomNav />
          
          <footer className="hidden md:block py-12 border-t border-gray-100 bg-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="space-y-4">
                <span className="text-lg font-black tracking-tighter text-gray-900">Mobile<span className="gradient-text">Hub</span></span>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">The premier destination for the latest mobile technology in our local community.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Quick Access</h4>
                <div className="flex flex-col space-y-2 text-sm text-gray-500 font-medium">
                  <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                  <Link to="/shop" className="hover:text-blue-600 transition">Browse Products</Link>
                  <Link to="/admin" className="hover:text-blue-600 font-bold transition">Admin Portal</Link>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Stay Connected</h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"><i className="fab fa-instagram"></i></div>
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"><i className="fab fa-whatsapp"></i></div>
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"><i className="fas fa-envelope"></i></div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </GlobalContext.Provider>
  );
};

export default App;
