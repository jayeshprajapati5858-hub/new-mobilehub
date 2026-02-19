
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../App';

const AdminLogin = () => {
  const { adminLogin, isAdmin } = useGlobal();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin-portal');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (adminLogin(email, password)) {
      navigate('/admin-portal');
    } else {
      setError('Access Denied. Check your admin credentials.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 animate-fade-in bg-gray-50/50">
      <div className="w-full max-w-md space-y-10">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 gradient-bg rounded-[2.5rem] flex items-center justify-center text-white text-4xl mx-auto shadow-2xl shadow-blue-500/20 mb-6 transform hover:rotate-6 transition-transform cursor-default">
              <i className="fas fa-lock-open"></i>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-2xl flex items-center justify-center text-white text-xs border-4 border-white shadow-lg animate-pulse">
              <i className="fas fa-shield"></i>
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">MobileHub Admin</h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Secure Authentication Portal</p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-blue-500/5 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Administrator Email</label>
              <div className="relative">
                <i className="fas fa-at absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"></i>
                <input 
                  type="email" 
                  required
                  placeholder="admin@mobilehub.com"
                  className="w-full bg-gray-50 border border-gray-100 pl-14 pr-6 py-5 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-semibold text-gray-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Secure Passphrase</label>
              <div className="relative">
                <i className="fas fa-key absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"></i>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 pl-14 pr-6 py-5 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-semibold text-gray-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center space-x-3 animate-bounce">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-5 gradient-bg text-white font-black rounded-[1.5rem] shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest mt-4 flex items-center justify-center space-x-3"
            >
              <span>Verify & Access</span>
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
          </form>
        </div>
        
        <div className="flex justify-center items-center space-x-6">
          <div className="h-[1px] w-12 bg-gray-200"></div>
          <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">
            Authorized Personnel Only
          </p>
          <div className="h-[1px] w-12 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
