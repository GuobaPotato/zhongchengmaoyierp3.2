
import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../constants';
// Fix: InventoryItem is exported from types.ts, not constants.tsx
import { InventoryItem } from '../types';

interface ProductSelectorModalProps {
  onSelect: (items: InventoryItem[]) => void;
  onClose: () => void;
}

export const ProductSelectorModal: React.FC<ProductSelectorModalProps> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredItems = MOCK_INVENTORY.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map(item => item.id)));
    }
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedItems = MOCK_INVENTORY.filter(item => selectedIds.has(item.id));
    onSelect(selectedItems);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative flex flex-col overflow-hidden max-h-[85vh] animate-in zoom-in-95 duration-200 border border-slate-200">
        
        <header className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm shadow-indigo-100">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800">选择产品</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-slate-100 bg-white shrink-0">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索物料名称、编码或规格..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <svg className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* List area */}
        <div className="flex-1 overflow-y-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-3 w-16 text-center">
                   <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 w-4 h-4"
                    checked={filteredItems.length > 0 && selectedIds.size === filteredItems.length}
                    onChange={toggleAll}
                  />
                </th>
                <th className="px-4 py-3">产品名称/编码</th>
                <th className="px-4 py-3">规格</th>
                <th className="px-4 py-3 text-right">可退数</th>
                <th className="px-6 py-3 text-right">单价</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map(item => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-indigo-50/40 cursor-pointer group transition-colors ${selectedIds.has(item.id) ? 'bg-indigo-50/20' : ''}`}
                  onClick={() => toggleSelection(item.id)}
                >
                  <td className="px-6 py-4 text-center">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all mx-auto ${
                      selectedIds.has(item.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-400'
                    }`}>
                      {selectedIds.has(item.id) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{item.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 mt-0.5 tracking-tight">{item.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-500">
                    {item.type}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-mono text-indigo-600 font-bold">
                    {item.stock}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-mono text-slate-900">
                    ¥{item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                    没有找到符合条件的产品
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Footer - Fixed at bottom */}
        <footer className="px-8 py-5 bg-white border-t border-slate-100 flex justify-between items-center shrink-0 z-20">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">已选择</span>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{selectedIds.size}</span>
            <span className="text-xs text-slate-500">项产品</span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={onClose}
              className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              取消
            </button>
            <button 
              onClick={handleConfirm}
              disabled={selectedIds.size === 0}
              className={`px-10 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 ${
                selectedIds.size > 0 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none opacity-60'
              }`}
            >
              确定选择
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
