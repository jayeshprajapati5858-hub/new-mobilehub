
import React, { useState } from 'react';
import { StorageService } from '../storage';

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const orders = StorageService.getOrders();

  const filteredOrders = orders.filter(o => activeTab === 'all' || o.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-600';
      case 'shipped': return 'bg-blue-100 text-blue-600';
      case 'delivered': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleUpdateStatus = (id: string, current: string) => {
    const nextStatus = current === 'pending' ? 'shipped' : current === 'shipped' ? 'delivered' : 'pending';
    StorageService.updateOrderStatus(id, nextStatus as any);
    window.location.reload(); // Quick refresh for demo
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Order Management</h1>
          <p className="text-gray-500 font-medium">Tracking {orders.length} local orders</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto hide-scrollbar">
          {['all', 'pending', 'shipped', 'delivered'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition whitespace-nowrap ${activeTab === tab ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.length > 0 ? filteredOrders.map(order => (
          <div key={order.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:border-blue-200 transition">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="text-lg font-black text-gray-900">{order.id}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.date}</div>
                </div>
                <button 
                  onClick={() => handleUpdateStatus(order.id, order.status)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-extrabold uppercase shadow-sm ${getStatusColor(order.status)} transition hover:scale-105 active:scale-95`}
                >
                  {order.status}
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-gray-50">
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Village Customer</div>
                  <div className="text-sm font-extrabold text-gray-800">{(order as any).address?.split(',')[0] || 'Unknown'}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Contact Phone</div>
                  <div className="text-sm font-extrabold text-gray-800 text-blue-600">{(order as any).customerPhone || 'No Phone'}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Order Total</div>
                  <div className="text-sm font-extrabold text-gray-900">₹{order.total.toLocaleString()}</div>
                </div>
                <div className="flex space-x-3 lg:justify-end">
                   <button className="px-6 py-3 rounded-xl bg-gray-900 text-white text-[10px] font-bold shadow-lg hover:bg-blue-600 transition">Print Label</button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
             <i className="fas fa-box-open text-gray-200 text-6xl mb-6"></i>
             <p className="text-gray-400 font-bold">No orders match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
