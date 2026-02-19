
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../App';
import { StorageService } from '../storage';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useGlobal();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState({ name: '', phone: '', street: '', village: '', pincode: '' });

  const handlePlaceOrder = () => {
    if (!address.name || !address.phone || !address.village) {
      alert("Please fill in basic delivery details!");
      return;
    }

    setIsProcessing(true);
    
    const newOrder = {
      id: 'MH-' + Math.floor(100000 + Math.random() * 900000),
      userId: 'guest',
      items: [...cart],
      total: cartTotal,
      status: 'pending' as const,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      address: `${address.name}, ${address.street}, ${address.village}, ${address.pincode}`,
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod.toUpperCase(),
      customerPhone: address.phone
    };

    setTimeout(() => {
      StorageService.saveOrder(newOrder);
      setIsProcessing(false);
      clearCart();
      alert('Order placed successfully! We will contact you soon.');
      navigate('/');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 font-bold mb-4">Your cart is empty.</p>
        <button onClick={() => navigate('/shop')} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <i className="fas fa-truck text-blue-500 mr-3"></i> Delivery Info
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Your Name" 
                className="w-full bg-gray-50 border border-transparent px-5 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                value={address.name} onChange={e => setAddress({...address, name: e.target.value})}
              />
              <input 
                type="tel" placeholder="Phone Number" 
                className="w-full bg-gray-50 border border-transparent px-5 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})}
              />
              <div className="md:col-span-2">
                <input 
                  type="text" placeholder="Street Address" 
                  className="w-full bg-gray-50 border border-transparent px-5 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                  value={address.street} onChange={e => setAddress({...address, street: e.target.value})}
                />
              </div>
              <input 
                type="text" placeholder="Village / Area" 
                className="w-full bg-gray-50 border border-transparent px-5 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                value={address.village} onChange={e => setAddress({...address, village: e.target.value})}
              />
              <input 
                type="text" placeholder="Pincode" 
                className="w-full bg-gray-50 border border-transparent px-5 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium"
                value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <i className="fas fa-credit-card text-blue-500 mr-3"></i> Payment
            </h3>
            <div className="space-y-3">
              {[
                { id: 'cod', name: 'Cash on Delivery', sub: 'Pay at your doorstep', icon: 'fa-money-bill-wave' },
                { id: 'upi', name: 'Digital UPI', sub: 'GPay, PhonePe, Paytm', icon: 'fa-qrcode' }
              ].map(method => (
                <label 
                  key={method.id}
                  className={`flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all cursor-pointer ${paymentMethod === method.id ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/5' : 'border-gray-50 hover:border-gray-100'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <i className={`fas ${method.icon} text-lg`}></i>
                    </div>
                    <div>
                      <span className={`font-bold text-sm block ${paymentMethod === method.id ? 'text-blue-900' : 'text-gray-700'}`}>{method.name}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{method.sub}</span>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === method.id} 
                    onChange={() => setPaymentMethod(method.id)} 
                    className="w-6 h-6 text-blue-600 focus:ring-0 border-gray-200"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm sticky top-24 space-y-6">
             <h3 className="text-xl font-black text-gray-900 border-b border-gray-50 pb-6">Summary</h3>
             <div className="space-y-4 max-h-60 overflow-y-auto pr-2 hide-scrollbar">
               {cart.map(item => (
                 <div key={item.id} className="flex justify-between items-center">
                   <div className="flex items-center space-x-4">
                     <div className="w-14 h-14 rounded-2xl bg-gray-50 p-2 flex-shrink-0">
                       <img src={item.image} className="w-full h-full object-contain" alt="" />
                     </div>
                     <div className="min-w-0">
                       <div className="text-xs font-black text-gray-800 truncate w-32">{item.name}</div>
                       <div className="text-[10px] text-gray-400 font-bold uppercase">Qty: {item.quantity}</div>
                     </div>
                   </div>
                   <span className="text-sm font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                 </div>
               ))}
             </div>
             <div className="border-t border-gray-50 pt-6 space-y-4">
               <div className="flex justify-between text-sm text-gray-500 font-bold">
                 <span>Subtotal</span>
                 <span className="text-gray-900">₹{cartTotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-sm text-gray-500 font-bold">
                 <span>Local Delivery</span>
                 <span className="text-green-600 uppercase tracking-widest text-[10px] font-black">FREE</span>
               </div>
               <div className="flex justify-between text-2xl font-black text-gray-900 pt-4">
                 <span>Total</span>
                 <span className="gradient-text">₹{cartTotal.toLocaleString()}</span>
               </div>
             </div>

             <button 
               disabled={isProcessing}
               onClick={handlePlaceOrder}
               className={`w-full py-5 rounded-2xl font-black text-white shadow-2xl shadow-blue-500/20 transition-all flex items-center justify-center space-x-3 uppercase tracking-widest text-sm ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'gradient-bg hover:scale-[1.02] active:scale-95'}`}
             >
               {isProcessing ? (
                 <>
                   <i className="fas fa-circle-notch fa-spin"></i>
                   <span>Processing...</span>
                 </>
               ) : (
                 <>
                   <i className="fas fa-check-circle"></i>
                   <span>Place Order</span>
                 </>
               )}
             </button>
             <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">Instant Village Confirmation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
