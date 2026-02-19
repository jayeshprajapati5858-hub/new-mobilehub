
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Fixed: Changed useCart to useGlobal
import { useGlobal } from '../App';

const Cart = () => {
  // Fixed: useGlobal returns cartTotal instead of total
  const { cart, removeFromCart, updateQuantity, cartTotal: total } = useGlobal();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'VILLAGE10') {
      setAppliedDiscount(total * 0.1);
      alert('Coupon Applied! 10% Discount added.');
    } else {
      alert('Invalid coupon code.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-32 space-y-6">
        <div className="w-24 h-24 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto text-4xl">
          <i className="fas fa-shopping-bag"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        </div>
        <Link to="/shop" className="inline-block px-8 py-3 gradient-bg text-white font-bold rounded-full shadow-lg shadow-blue-500/20">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 flex items-center gap-6 shadow-sm">
              <img src={item.image} className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-2xl" alt={item.name} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 truncate pr-4">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <span className="text-lg font-bold text-blue-600">₹{item.price.toLocaleString()}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      <span className="w-12 text-center font-bold">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Order Summary</h3>
            
            <div className="space-y-4 text-sm font-medium text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">FREE</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{appliedDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-100 pt-4">
                <span>Total</span>
                <span className="gradient-text">₹{(total - appliedDiscount).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  className="flex-1 bg-gray-50 border border-gray-200 px-4 py-3 rounded-2xl focus:outline-none text-sm"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button onClick={applyCoupon} className="bg-gray-900 text-white px-6 rounded-2xl font-bold text-sm">Apply</button>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-4 gradient-bg text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition active:scale-95"
              >
                Checkout Now
              </button>
              <p className="text-[10px] text-center text-gray-400">Secure 256-bit SSL Encrypted Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
