
import React, { useState, useMemo } from 'react';
import { ProductSelectorModal } from './ProductSelectorModal';
import { SupplierSelectorModal } from './SupplierSelectorModal';
import { InventoryItem } from '../types';
import { SupplierItem } from '../constants';

interface PurchaseOrderAddModalProps {
  onClose: () => void;
}

interface PurchaseItem {
  product: InventoryItem;
  supplier?: SupplierItem;
  quantity: number;
  price: number;
}

export const PurchaseOrderAddModal: React.FC<PurchaseOrderAddModalProps> = ({ onClose }) => {
  const [orderNo] = useState(`PO-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [isProductPickerOpen, setIsProductPickerOpen] = useState(false);
  const [activeSupplierPickingIndex, setActiveSupplierPickingIndex] = useState<number | null>(null);

  const handleProductsSelect = (selectedProducts: InventoryItem[]) => {
    const newItems: PurchaseItem[] = selectedProducts.map(p => ({
      product: p,
      quantity: 1,
      price: p.price
    }));
    setItems(prev => [...prev, ...newItems]);
    setIsProductPickerOpen(false);
  };

  const handleSupplierSelect = (supplier: SupplierItem) => {
    if (activeSupplierPickingIndex !== null) {
      setItems(prev => prev.map((item, idx) => 
        idx === activeSupplierPickingIndex ? { ...item, supplier } : item
      ));
    }
    setActiveSupplierPickingIndex(null);
  };

  const updateQuantity = (index: number, qty: number) => {
    setItems(prev => prev.map((item, idx) => 
      idx === index ? { ...item, quantity: qty > 0 ? qty : 1 } : item
    ));
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }, [items]);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative flex flex-col overflow-hidden max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <header className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-800">添加采购订单</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-all">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          
          {/* Section 1: Basic Information */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold text-slate-800 bg-indigo-50 px-3 py-1 rounded-lg inline-block">基本信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">采购单编号</label>
                <input type="text" readOnly className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-500 cursor-not-allowed" value={orderNo} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center"><span className="text-rose-500 mr-1">*</span>联系人</label>
                <input type="text" placeholder="输入采购联系人" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={contact} onChange={e => setContact(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center"><span className="text-rose-500 mr-1">*</span>联系方式</label>
                <input type="text" placeholder="输入手机号或座机" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
          </section>

          {/* Section 2: Material Selection & Allocation */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 bg-indigo-50 px-3 py-1 rounded-lg">采购物料分配</h3>
              <button 
                onClick={() => setIsProductPickerOpen(true)}
                className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-xl transition-all border border-indigo-200 flex items-center space-x-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span>选择产品</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-slate-50">
                  <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-4">产品名称/编号</th>
                    <th className="px-4 py-4 w-64">分配供应商</th>
                    <th className="px-4 py-4 text-center">采购单价</th>
                    <th className="px-4 py-4 w-32">采购数量</th>
                    <th className="px-4 py-4 text-right">小计</th>
                    <th className="px-6 py-4 w-16">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.length > 0 ? items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800">{item.product.name}</span>
                          <span className="text-xs text-slate-400 font-mono mt-0.5">{item.product.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <button 
                          onClick={() => setActiveSupplierPickingIndex(idx)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                            item.supplier ? 'bg-white border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-indigo-300'
                          }`}
                        >
                          <span className="truncate">{item.supplier ? item.supplier.name : '点击选择供应商'}</span>
                          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="text-sm font-mono text-slate-600">¥{item.price.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-5">
                        <input 
                          type="number" 
                          className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                          value={item.quantity}
                          onChange={e => updateQuantity(idx, parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td className="px-4 py-5 text-right font-mono font-bold text-slate-900">
                        ¥{(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button onClick={() => removeItem(idx)} className="text-slate-300 hover:text-rose-500 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                        尚未选择任何产品，请点击上方「选择产品」开始分配
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Total Calculation Area */}
            <div className="flex justify-end p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl shadow-slate-200 animate-in slide-in-from-right-4">
              <div className="flex items-baseline space-x-4">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">整体采购总金额 (元):</span>
                <span className="text-3xl font-mono font-bold text-white">¥{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </section>

        </div>

        {/* Modal Footer */}
        <footer className="px-8 py-6 border-t border-slate-100 flex justify-end items-center space-x-4 bg-white shrink-0">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">取消</button>
          <button 
            onClick={onClose}
            disabled={items.length === 0 || !contact || !phone || items.some(i => !i.supplier)}
            className={`px-12 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 ${
              items.length > 0 && contact && phone && !items.some(i => !i.supplier)
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            确认创建采购单
          </button>
        </footer>

        {/* Nested Modals */}
        {isProductPickerOpen && (
          <ProductSelectorModal onSelect={handleProductsSelect} onClose={() => setIsProductPickerOpen(false)} />
        )}
        {activeSupplierPickingIndex !== null && (
          <SupplierSelectorModal onSelect={handleSupplierSelect} onClose={() => setActiveSupplierPickingIndex(null)} />
        )}
      </div>
    </div>
  );
};
