
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGlobal } from '../App';
import { StorageService } from '../storage';
import { Product } from '../types';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useGlobal();
  const [selectedTab, setSelectedTab] = useState('description');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const products = StorageService.getProducts();
    const found = products.find(p => p.id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) return <div className="text-center py-20 font-bold text-gray-500">Product not found.</div>;

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="animate-fade-in space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="md:w-1/2 space-y-4">
          <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center">
            <img src={product.image} className="max-w-full max-h-full object-contain p-8" alt={product.name} />
          </div>
          <div className="flex space-x-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition cursor-pointer bg-white">
                <img src={product.image} className="w-full h-full object-contain p-2 opacity-50 hover:opacity-100 transition" alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full">{product.category}</span>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-xs"></i>)}
              </div>
              <span className="text-gray-500 font-medium">({product.reviews} reviews)</span>
              <span className="text-gray-300">|</span>
              <span className={`font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex items-baseline space-x-3 p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
            {product.originalPrice && (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 py-4 bg-white border-2 border-gray-100 text-gray-900 font-bold rounded-2xl hover:border-blue-200 hover:text-blue-600 transition active:scale-95 flex items-center justify-center space-x-2 shadow-sm"
              >
                <i className="fas fa-shopping-cart"></i>
                <span>Add to Cart</span>
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-[1.5] py-4 gradient-bg text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition active:scale-95 flex items-center justify-center space-x-2"
              >
                <i className="fas fa-bolt"></i>
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex border-b border-gray-100 mb-6">
              {['description', 'specs', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-3 text-sm font-bold capitalize transition border-b-2 ${selectedTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-gray-600 text-sm leading-relaxed min-h-[120px]">
              {selectedTab === 'description' && product.description}
              {selectedTab === 'specs' && (
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400 font-medium">Brand</span> <span className="font-bold text-gray-800">{product.brand}</span></li>
                  <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400 font-medium">Model</span> <span className="font-bold text-gray-800">{product.name}</span></li>
                  <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400 font-medium">Authenticity</span> <span className="font-bold text-gray-800">100% Original</span></li>
                </ul>
              )}
              {selectedTab === 'reviews' && (
                <div className="space-y-4">
                  <p className="text-xs text-center text-gray-400">Showing 2 most recent reviews</p>
                  {[1, 2].map(r => (
                    <div key={r} className="bg-gray-50 p-4 rounded-2xl">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-gray-800 text-xs">Verified Village Buyer</span>
                        <div className="flex text-yellow-400 text-[8px]">
                          {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Perfect quality and original box. Shop owner is very helpful!</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
