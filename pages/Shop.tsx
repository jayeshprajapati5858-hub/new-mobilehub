
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category } from '../types';
// Fixed: Changed useCart to useGlobal
import { useGlobal } from '../App';
import { Link } from 'react-router-dom';
import { StorageService } from '../storage';

// Using React.FC to properly handle special props like 'key' in lists and resolve TS errors
const ProductGridItem: React.FC<{ product: any }> = ({ product }) => {
  const { addToCart } = useGlobal();
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="group relative rounded-2xl border bg-white p-4 transition-shadow hover:shadow-lg border-gray-100">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-[80%] max-h-[80%] object-contain p-4 transition-transform group-hover:scale-105" 
          />
          {discount > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-widest shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>
      </Link>
      
      <div className="mt-4 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="line-clamp-1 font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through font-medium text-gray-400">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center transition-all active:scale-95 hover:bg-blue-600 shadow-md"
          >
            <i className="fas fa-shopping-cart text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setProducts(StorageService.getProducts());
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // newest/default
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const categories = ['All', ...Object.values(Category)];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Discover Products</h1>
        <div className="relative flex-1 max-w-md">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search for phones, chargers, and more..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-gray-600 border border-gray-100 hover:border-blue-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">{filteredProducts.length} items found</span>
        <div className="flex space-x-2">
          <select 
            className="text-sm border-none bg-transparent focus:ring-0 font-semibold text-gray-700"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Sort: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map(product => (
            <ProductGridItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <i className="fas fa-box-open text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 font-medium">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
