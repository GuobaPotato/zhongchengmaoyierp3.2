
import React, { useState } from 'react';
import { MOCK_SUPPLIERS, SupplierItem } from '../constants';

interface SupplierSelectorModalProps {
  onSelect: (supplier: SupplierItem) => void;
  onClose: () => void;
}

export const SupplierSelectorModal: React.FC<SupplierSelectorModalProps> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = MOCK_SUPPLIERS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={onClose}></div>

      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative flex flex-col overflow-hidden max-h-[70vh] animate-in zoom-in-95 duration-200 border border-slate-200">
        
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <h3 className="text-lg font-bold text-slate-800">选择供应商</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="px-6 py-4 border-b border-slate-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索供应商名称或分类..."
              className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoFocus
            />
            <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 sticky top-0 z-10 border-b border-slate-100">
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-3">公司名称</th>
                <th className="px-4 py-3">分类</th>
                <th className="px-4 py-3 text-center">评分</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredSuppliers.map(s => (
                <tr 
                  key={s.id} 
                  className="hover:bg-indigo-50/40 cursor-pointer group transition-colors"
                  onClick={() => onSelect(s)}
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{s.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{s.contact}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{s.category}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.rating === 'A' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {s.rating}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredSuppliers.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400 text-sm italic">没有找到符合条件的供应商</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">取消</button>
        </footer>
      </div>
    </div>
  );
};
