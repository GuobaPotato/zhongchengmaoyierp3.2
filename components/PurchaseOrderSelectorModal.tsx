
import React, { useState } from 'react';
import { MOCK_PURCHASE_ORDERS, PurchaseOrderItem } from '../constants';

interface PurchaseOrderSelectorModalProps {
  onSelect: (order: PurchaseOrderItem) => void;
  onClose: () => void;
}

export const PurchaseOrderSelectorModal: React.FC<PurchaseOrderSelectorModalProps> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = MOCK_PURCHASE_ORDERS.filter(order => 
    order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      {/* Darker backdrop for nested modal feel */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative flex flex-col overflow-hidden max-h-[80vh] animate-in zoom-in-95 duration-200 border border-slate-200">
        
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-bold text-slate-800">选择采购单</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索单号、名称或供应商..."
              className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* List area */}
        <div className="flex-1 overflow-y-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 sticky top-0 z-10">
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-3">单号/名称</th>
                <th className="px-4 py-3">供应商</th>
                <th className="px-4 py-3 text-right">金额</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map(order => (
                <tr 
                  key={order.id} 
                  className="hover:bg-indigo-50/40 cursor-pointer group transition-colors"
                  onClick={() => onSelect(order)}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-bold text-indigo-600 group-hover:underline">{order.orderNo}</span>
                      <span className="text-sm font-medium text-slate-800 mt-0.5">{order.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-700 font-bold">{order.supplier}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm font-mono font-bold text-slate-900">¥{order.totalAmount.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                    没有找到符合条件的采购单
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            取消
          </button>
        </footer>
      </div>
    </div>
  );
};
