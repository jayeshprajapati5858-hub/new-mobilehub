
import React, { useState } from 'react';
// Fixed: Changed useAuth to useGlobal
import { useGlobal } from '../App';
import { StorageService } from '../storage';

const Account = () => {
  // Fixed: Changed useAuth to useGlobal
  const { user, login, logout } = useGlobal();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  
  const allOrders = StorageService.getOrders();
  const userOrders = allOrders.filter(o => o.userId === user?.id);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 space-y-10 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-blue-600 text-4xl mx-auto shadow-2xl shadow-blue-500/10 border border-gray-100">
            <i className="fas fa-user-astronaut"></i>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Village Login</h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Welcome back to MobileHub</p>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-blue-500/5 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Email Identity</label>
            <input 
              type="text" 
              placeholder="rahul@village.com"
              className="w-full bg-gray-50 border border-transparent px-8 py-5 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Access Key</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-transparent px-8 py-5 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button 
            onClick={() => login(email, pass)}
            className="w-full py-5 gradient-bg text-white font-black rounded-[1.5rem] shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest mt-4"
          >
            Enter Dashboard
          </button>
        </div>
        
        <div className="bg-gray-100/50 p-8 rounded-[2.5rem] text-[11px] text-gray-500 font-medium text-center space-y-4 border border-gray-200/50">
           <p className="font-black uppercase tracking-[0.3em] opacity-60">Admin Credentials</p>
           <div className="flex justify-center space-x-4">
             <div className="bg-white px-4 py-2 rounded-xl border border-gray-100"><span className="opacity-40">User:</span> <span className="font-bold text-gray-800">admin@mobilehub.com</span></div>
             <div className="bg-white px-4 py-2 rounded-xl border border-gray-100"><span className="opacity-40">Key:</span> <span className="font-bold text-gray-800">admin123</span></div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in pb-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-12 rounded-[4rem] border border-gray-100 shadow-xl shadow-blue-500/5">
        <div className="w-32 h-32 gradient-bg rounded-[2.5rem] flex items-center justify-center text-white text-5xl shadow-2xl border-4 border-white transform rotate-3">
          {user.name[0].toUpperCase()}
        </div>
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-col md:flex-row items-center gap-4">
             <h2 className="text-4xl font-black text-gray-900 tracking-tighter">{user.name}</h2>
             <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                {user.role} Status
             </span>
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{user.email}</p>
        </div>
        <button onClick={logout} className="px-10 py-4 bg-red-50 text-red-600 font-black rounded-2xl hover:bg-red-100 transition-all shadow-sm text-xs uppercase tracking-widest">
          Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Purchase History</h3>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{userOrders.length} Completed</span>
          </div>
          <div className="space-y-6">
            {userOrders.map(order => (
              <div key={order.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all space-y-8 group">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-sm font-black text-gray-900 tracking-tight">Order {order.id}</div>
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{order.date}</div>
                  </div>
                  <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-6 pt-6 border-t border-gray-50">
                  <div className="flex -space-x-4">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="w-14 h-14 rounded-2xl border-4 border-white bg-gray-50 overflow-hidden shadow-xl group-hover:scale-110 transition-transform">
                        <img src={item.image} className="w-full h-full object-contain p-2" alt="" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-14 h-14 rounded-2xl border-4 border-white bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xl">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-black text-gray-800">{order.items.length} Product(s)</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Value: <span className="text-gray-900">₹{order.total.toLocaleString()}</span></div>
                  </div>
                  <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Track Bundle</button>
                </div>
              </div>
            ))}
            {userOrders.length === 0 && (
              <div className="bg-white p-24 rounded-[4rem] border border-dashed border-gray-200 text-center space-y-6">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200 text-3xl">
                   <i className="fas fa-shopping-bag"></i>
                 </div>
                 <div className="space-y-2">
                   <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">No activity yet</p>
                   <p className="text-gray-300 text-sm italic">"Time to upgrade your tech collection."</p>
                 </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Preferences</h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Address Archive', icon: 'fa-map-pin', color: 'bg-blue-50 text-blue-600' },
              { label: 'Village Support', icon: 'fa-headset', color: 'bg-indigo-50 text-indigo-600' },
              { label: 'Auth Keys', icon: 'fa-key', color: 'bg-purple-50 text-purple-600' }
            ].map(item => (
              <button key={item.label} className="flex items-center space-x-6 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group text-left shadow-sm">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner text-xl`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <span className="font-black text-sm text-gray-700 uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="p-8 gradient-bg rounded-[2.5rem] text-white space-y-4 shadow-2xl shadow-blue-500/20">
            <h4 className="font-black uppercase tracking-widest text-xs">MobileHub Rewards</h4>
            <p className="text-xs leading-relaxed opacity-80 font-medium italic">"Earn village points on every purchase and unlock exclusive flagship discounts."</p>
            <div className="flex justify-between items-end pt-2">
               <div className="text-3xl font-black">250 <span className="text-[10px] uppercase opacity-60">Pts</span></div>
               <button className="px-4 py-2 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest">Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
