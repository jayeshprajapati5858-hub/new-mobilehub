
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useGlobal } from '../App';
import { StorageService } from '../storage';
import { analyzeSalesData } from '../geminiService';

const AdminDashboard = () => {
  const { isAdmin, adminLogout, refreshData } = useGlobal();
  const navigate = useNavigate();
  const [aiInsights, setAiInsights] = useState('Generating smart insights for your shop...');
  
  const orders = StorageService.getOrders();
  const users = StorageService.getUsers();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  useEffect(() => {
    const fetchInsights = async () => {
      const insights = await analyzeSalesData(orders);
      setAiInsights(insights);
    };
    if (orders.length > 0) fetchInsights();
  }, [orders]);

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: 'fa-wallet', color: 'bg-blue-600', link: '/admin-portal/orders' },
    { label: 'Total Orders', value: orders.length, icon: 'fa-shopping-bag', color: 'bg-purple-600', link: '/admin-portal/orders' },
    { label: 'Customers', value: users.length, icon: 'fa-users', color: 'bg-indigo-600', link: '/admin-portal/users' },
    { label: 'Pending', value: pendingOrders, icon: 'fa-clock', color: 'bg-amber-600', link: '/admin-portal/orders' }
  ];

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Shop Console</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Monitoring MobileHub Activity</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin-portal/products" className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-gray-800 transition">
            Inventory
          </Link>
          <button 
            onClick={handleLogout}
            className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Link to={s.link} key={s.label} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all space-y-4">
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-white text-xl shadow-lg`}>
              <i className={`fas ${s.icon}`}></i>
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">{s.value}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-gray-900">Revenue Flow</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-purple-800 p-8 rounded-[2.5rem] text-white shadow-xl space-y-6">
          <div className="flex items-center space-x-3">
            <i className="fas fa-microchip text-indigo-200"></i>
            <h3 className="text-lg font-bold">Smart Insights</h3>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-xs leading-relaxed font-medium italic">
            "{aiInsights}"
          </div>
          <p className="text-[10px] text-indigo-100/70">Calculated based on village shop trends and AI analysis.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
