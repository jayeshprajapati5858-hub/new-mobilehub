
import React, { useState } from 'react';

const Recharge = () => {
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState('');
  const [plan, setPlan] = useState('');

  const plans = [
    { id: '1', amount: 299, desc: 'Unlimited 5G Data, 2GB/Day + Unlimited Calls, 28 Days' },
    { id: '2', amount: 749, desc: 'Cricket Pack: 3GB/Day, Disney+ Hotstar Mobile, 84 Days' },
    { id: '3', amount: 19, desc: 'Data Add-on: 1GB High speed data' },
    { id: '4', amount: 155, desc: 'Basic: Unlimited Calls, 1GB Total, 24 Days' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Instant Recharge</h1>
        <p className="text-gray-500 font-medium">Fast and reliable mobile recharge for all village operators</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Mobile Number</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-gray-400">+91</span>
              <input 
                type="tel" 
                maxLength={10}
                placeholder="98765 43210"
                className="w-full bg-gray-50 border border-gray-100 pl-14 pr-5 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition text-lg font-bold tracking-widest"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Select Operator</label>
            <div className="grid grid-cols-4 gap-4">
              {['Jio', 'Airtel', 'Vi', 'BSNL'].map(op => (
                <button 
                  key={op}
                  onClick={() => setOperator(op)}
                  className={`p-3 rounded-2xl border-2 transition font-bold text-xs ${operator === op ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 hover:border-gray-200 text-gray-500'}`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Best Offers for you</label>
             <div className="space-y-3">
               {plans.map(p => (
                 <label 
                   key={p.id}
                   className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${plan === p.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                 >
                   <div className="flex-1 pr-4">
                     <div className="text-lg font-extrabold text-gray-900">₹{p.amount}</div>
                     <p className="text-xs text-gray-500 font-medium leading-tight">{p.desc}</p>
                   </div>
                   <input 
                    type="radio" 
                    name="plan" 
                    checked={plan === p.id} 
                    onChange={() => setPlan(p.id)} 
                    className="w-5 h-5 text-blue-600 focus:ring-0 border-gray-300"
                  />
                 </label>
               ))}
             </div>
          </div>
        </div>

        <button 
          disabled={!phone || !operator || !plan}
          className="w-full py-5 gradient-bg text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Recharge
        </button>
      </div>

      <div className="flex items-center justify-center space-x-8 grayscale opacity-50">
        <i className="fab fa-cc-visa text-2xl"></i>
        <i className="fab fa-cc-mastercard text-2xl"></i>
        <i className="fas fa-money-bill-wave text-2xl"></i>
        <i className="fas fa-shield-alt text-2xl"></i>
      </div>
    </div>
  );
};

export default Recharge;
