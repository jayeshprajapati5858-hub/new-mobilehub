
import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { generateProductDescription } from '../geminiService';
import { StorageService } from '../storage';

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setProducts(StorageService.getProducts());
  }, []);

  const handleAICompose = async () => {
    if (!editingProduct?.name) return alert('Enter a product name first');
    setIsGenerating(true);
    const desc = await generateProductDescription(editingProduct.name, editingProduct.category || Category.MOBILES);
    setEditingProduct({ ...editingProduct, description: desc });
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (!editingProduct?.name || !editingProduct?.price) return alert('Name and Price are required');
    
    const newProduct = {
      ...editingProduct,
      id: editingProduct.id || Date.now().toString(),
      rating: editingProduct.rating || 0,
      reviews: editingProduct.reviews || 0,
      brand: editingProduct.brand || 'Generic',
      image: editingProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
    };

    StorageService.saveProduct(newProduct);
    setProducts(StorageService.getProducts());
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      StorageService.deleteProduct(id);
      setProducts(StorageService.getProducts());
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct({ ...editingProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 text-sm font-medium">{products.length} Products in Catalog</p>
        </div>
        <button 
          onClick={() => { setEditingProduct({ name: '', price: 0, category: Category.MOBILES }); setIsModalOpen(true); }}
          className="px-6 py-3 gradient-bg text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-105 transition flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Add New Product</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                      <span className="font-bold text-sm text-gray-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">{p.category}</td>
                  <td className="px-6 py-4 font-bold text-sm">₹{p.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3 text-gray-400">
                      <button onClick={() => { setEditingProduct(p); setIsModalOpen(true); }} className="hover:text-blue-600"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleDelete(p.id)} className="hover:text-red-500"><i className="fas fa-trash-alt"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times text-xl"></i></button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <div>
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                     <input 
                       className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl focus:outline-none"
                       value={editingProduct?.name}
                       onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Price (₹)</label>
                     <input 
                       type="number"
                       className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl focus:outline-none"
                       value={editingProduct?.price}
                       onChange={e => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
                     />
                   </div>
                   <div>
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
                     <select 
                       className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl focus:outline-none"
                       value={editingProduct?.category}
                       onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                     >
                       {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                   </div>
                   <div>
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Stock Level</label>
                     <input 
                        type="number"
                        className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl focus:outline-none"
                        value={editingProduct?.stock}
                        onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                     />
                   </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                      <button 
                        onClick={handleAICompose}
                        disabled={isGenerating}
                        className="text-[10px] font-bold text-purple-600 hover:underline flex items-center"
                      >
                        {isGenerating ? <i className="fas fa-circle-notch fa-spin mr-1"></i> : <i className="fas fa-magic mr-1"></i>}
                        AI Write
                      </button>
                    </div>
                    <textarea 
                      rows={6}
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl focus:outline-none text-sm"
                      value={editingProduct?.description}
                      onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div>
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Product Image</label>
                     <div className="mt-2 flex items-center space-x-4">
                       {editingProduct?.image && (
                         <img src={editingProduct.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-gray-200" />
                       )}
                       <div className="flex-1">
                         <input 
                           type="file"
                           accept="image/*"
                           onChange={handleImageUpload}
                           className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition"
                         />
                         <div className="mt-2 flex items-center space-x-2">
                           <span className="text-[10px] text-gray-400 font-bold uppercase">OR URL:</span>
                           <input 
                              className="flex-1 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl focus:outline-none text-[10px]"
                              placeholder="https://..."
                              value={editingProduct?.image || ''}
                              onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                           />
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border border-gray-100 font-bold rounded-2xl hover:bg-gray-50 transition">Cancel</button>
                <button onClick={handleSave} className="flex-[2] py-4 gradient-bg text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition">Save Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
