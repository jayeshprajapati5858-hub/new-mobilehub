
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BANNERS } from '../mockData';
import { Category, Product } from '../types';
import { useGlobal } from '../App';
import { StorageService } from '../storage';

interface ProductCardProps {
  product: any;
  dark?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, dark = false }) => {
  const { addToCart } = useGlobal();
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className={`group rounded-[2.5rem] overflow-hidden transition-all duration-500 transform hover:-translate-y-2 ${dark ? 'bg-white/10 backdrop-blur-xl border border-white/10' : 'bg-white border border-gray-100 shadow-sm hover:shadow-2xl shadow-blue-500/10'}`}>
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/5] bg-gray-50 flex items-center justify-center">
        <img src={product.image} alt={product.name} className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-700" />
        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-red-500/30">
            {discount}% OFF
          </span>
        )}
      </Link>
      <div className="p-6 space-y-3">
        <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${dark ? 'text-blue-300' : 'text-blue-600'}`}>{product.category}</div>
        <Link to={`/product/${product.id}`} className={`font-bold block truncate text-lg group-hover:text-blue-600 transition-colors ${dark ? 'text-white' : 'text-gray-900'}`}>
          {product.name}
        </Link>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className={`text-xl font-black ${dark ? 'text-white' : 'text-gray-900'}`}>₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className={`text-xs line-through font-medium ${dark ? 'text-white/40' : 'text-gray-400'}`}>₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${dark ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-gray-900 text-white hover:bg-blue-600 shadow-xl shadow-gray-200'}`}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(StorageService.getProducts());
  }, []);

  const categories = [
    { name: Category.MOBILES, icon: 'fa-mobile-screen-button', color: 'bg-blue-50 text-blue-600', sub: 'Latest Flagships' },
    { name: Category.ACCESSORIES, icon: 'fa-headphones-simple', color: 'bg-purple-50 text-purple-600', sub: 'Original Gear' },
    { name: Category.GADGETS, icon: 'fa-microchip', color: 'bg-indigo-50 text-indigo-600', sub: 'Smart Tech' },
  ];

  const featuredProducts = products.filter(p => p.isFeatured);
  const hotDeals = products.filter(p => p.isDeal);

  return (
    <div className="space-y-16 animate-fade-in pb-12">
      {/* Hero Banner Slider */}
      <div className="relative overflow-hidden rounded-[3rem] shadow-2xl bg-gray-900 aspect-[16/9] md:aspect-[21/7]">
        <img 
          src={MOCK_BANNERS[0].image} 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" 
          alt="Banner" 
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 space-y-6">
          <div className="w-fit px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full">
            <span className="text-blue-200 font-black tracking-widest text-[10px] uppercase">Exclusive Release</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
            Next-Gen Tech <br/> in <span className="gradient-text">MobileHub.</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-lg font-medium leading-relaxed">
            The most curated collection of flagship smartphones and authentic accessories, delivered right to your village.
          </p>
          <div className="flex gap-4 pt-2">
            <Link to="/shop" className="w-fit px-10 py-4 bg-white text-blue-600 font-black rounded-2xl shadow-2xl hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 text-sm uppercase tracking-widest">
              Explore Now
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Featured Categories */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Top Collections</h2>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em] text-[10px]">What are you looking for?</p>
          </div>
          <Link to="/shop" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={`/shop?category=${cat.name}`}
              className="group flex items-center p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all"
            >
              <div className={`w-16 h-16 rounded-3xl ${cat.color} flex items-center justify-center text-2xl mr-6 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                <i className={`fas ${cat.icon}`}></i>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-gray-900 text-lg leading-tight">{cat.name}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.sub}</span>
              </div>
              <div className="ml-auto w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className="fas fa-chevron-right text-xs"></i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
           <div className="space-y-1">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Handpicked Premiums</h2>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em] text-[10px]">Our best recommendations</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="relative bg-gray-900 rounded-[3rem] p-12 overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
             <div className="flex items-center space-x-2 text-amber-400">
               <i className="fas fa-bolt text-lg"></i>
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Flash Deal Live</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
               Don't miss the <br/> <span className="gradient-text">Limited Time</span> offers.
             </h2>
             <p className="text-gray-400 font-medium max-w-sm">Exclusive village-only pricing on select premium accessories and audio gear.</p>
             <button className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-500 hover:scale-105 transition-all text-xs uppercase tracking-widest">
               Shop Deals
             </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {hotDeals.slice(0, 2).map(product => (
               <div key={product.id} className="bg-white/5 backdrop-blur-md rounded-[2rem] p-4 border border-white/5 space-y-4">
                 <img src={product.image} className="w-full aspect-square object-contain p-4" alt="" />
                 <div className="text-center">
                   <div className="text-white font-bold text-sm truncate px-2">{product.name}</div>
                   <div className="text-blue-400 font-black">₹{product.price.toLocaleString()}</div>
                 </div>
               </div>
             ))}
          </div>
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
      </section>

      {/* Customer Trust */}
      <section className="py-12 bg-white rounded-[4rem] border border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-12 px-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Village Favorite</h2>
            <p className="text-gray-400 font-medium italic">"Real stories from our local neighbors and happy tech owners."</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-3xl overflow-hidden shadow-xl ring-4 ring-gray-50">
                  <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?auto=format&fit=crop&q=80&w=100`} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex text-amber-400 text-[8px] space-x-1">
                  {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                </div>
                <p className="text-gray-600 text-xs leading-relaxed font-medium">"Amazing service, got my iPhone delivered right to my farm gate within hours!"</p>
                <span className="font-black text-gray-900 text-[10px] uppercase tracking-widest">Karan S.</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
