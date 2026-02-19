
import React from 'react';
import { StorageService } from '../storage';

const AdminUsers = () => {
  const users = StorageService.getUsers();

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">User Management</h1>
          <p className="text-gray-500 font-medium">Viewing {users.length} registered customers</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Customer Name</th>
                <th className="px-8 py-5">Email Address</th>
                <th className="px-8 py-5">User ID</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.email} className="hover:bg-blue-50/30 transition">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                        {u.name[0]}
                      </div>
                      <span className="font-bold text-gray-900 text-sm">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500 font-medium">{u.email}</td>
                  <td className="px-8 py-5 font-mono text-[10px] text-gray-400">{u.id}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-lg">ACTIVE</span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-20 text-gray-400 font-medium italic">No customers registered yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
