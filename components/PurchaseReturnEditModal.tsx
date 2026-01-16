
import React, { useState } from 'react';
import { PurchaseOrderSelectorModal } from './PurchaseOrderSelectorModal';
import { ProductSelectorModal } from './ProductSelectorModal';
import { PurchaseOrderItem } from '../constants';
// Fix: InventoryItem is exported from types.ts, not constants.tsx
import { InventoryItem } from '../types';

interface PurchaseReturnEditModalProps {
  onClose: () => void;
}

interface ReturnProduct {
  name: string;
  specs: string;
  purchaseQty: number;
  returnableQty: number;
  returnPrice: number;
  returnQty: number;
  notes: string;
}

export const PurchaseReturnEditModal: React.FC<PurchaseReturnEditModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '红外感应器瑕疵退货',
    purchaseOrder: '25121000红外感应器采购',
    supplier: '众林感应洁具配件厂',
    returnDate: '2026-01-05',
    returnAmount: '1800.00',
    owner: '王朔(全公司)',
    returnType: '退款退货',
    notes: '--'
  });

  const [isOrderSelectorOpen, setIsOrderSelectorOpen] = useState(false);
  const [isProductSelectorOpen, setIsProductSelectorOpen] = useState(false);

  const [products, setProducts] = useState<ReturnProduct[]>([
    {
      name: '2512100红外感应器',
      specs: '',
      purchaseQty: 1200,
      returnableQty: 1200,
      returnPrice: 12,
      returnQty: 800,
      notes: ''
    }
  ]);

  const handleOrderSelect = (order: PurchaseOrderItem) => {
    setFormData(prev => ({
      ...prev,
      purchaseOrder: `${order.orderNo} ${order.name}`,
      supplier: order.supplier
    }));
    setIsOrderSelectorOpen(false);
  };

  const handleProductsSelect = (selectedItems: InventoryItem[]) => {
    const newProducts: ReturnProduct[] = selectedItems.map(item => ({
      name: item.name,
      specs: item.type,
      purchaseQty: item.stock, // Mocking purchase qty as stock
      returnableQty: item.stock,
      returnPrice: item.price,
      returnQty: 1, // Default to 1
      notes: ''
    }));

    setProducts(prev => [...prev, ...newProducts]);
    setIsProductSelectorOpen(false);
  };

  const handleQtyChange = (index: number, val: string) => {
    const next = [...products];
    next[index].returnQty = Number(val) || 0;
    setProducts(next);
  };

  const removeProduct = (index: number) => {
    setProducts(prev => prev.filter((_, i) => i !== index));
  };

  const totalCalculated = products.reduce((sum, p) => sum + (p.returnQty * p.returnPrice), 0);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative flex flex-col overflow-hidden max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <header className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-800">编辑</h2>
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

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          
          {/* Section 1: Basic Information */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
               <h3 className="text-sm font-bold text-slate-800 bg-indigo-50 px-3 py-1 rounded-lg">板块1：基本信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                  <span className="text-rose-500 mr-1">*</span>标题
                </label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                  <span className="text-rose-500 mr-1">*</span>采购单
                </label>
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setIsOrderSelectorOpen(true)}
                >
                  <input 
                    type="text" 
                    readOnly
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 group-hover:border-indigo-300 outline-none transition-all pr-10 cursor-pointer"
                    value={formData.purchaseOrder}
                    placeholder="请选择采购单"
                  />
                  <div className="absolute right-3 top-2.5">
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">供应商</label>
                <input 
                  type="text" 
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                  value={formData.supplier}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                  <span className="text-rose-500 mr-1">*</span>退货时间
                </label>
                <input 
                  type="date" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                  <span className="text-rose-500 mr-1">*</span>退货金额
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-2.5 text-slate-400 text-sm">¥</span>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                    value={formData.returnAmount}
                    onChange={(e) => setFormData({...formData, returnAmount: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                  <span className="text-rose-500 mr-1">*</span>负责人
                </label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                  value={formData.owner}
                  onChange={(e) => setFormData({...formData, owner: e.target.value})}
                >
                  <option>王朔(全公司)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase">退换货</label>
                <div className="flex space-x-6">
                  {['退款退货', '换货'].map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.returnType === type ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'
                      }`}>
                        {formData.returnType === type && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <input 
                        type="radio" 
                        className="hidden" 
                        name="returnType" 
                        checked={formData.returnType === type}
                        onChange={() => setFormData({...formData, returnType: type})}
                      />
                      <span className={`text-sm ${formData.returnType === type ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase">备注</label>
                <textarea 
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none"
                  placeholder="填写备注信息..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Product Information */}
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 bg-indigo-50 px-3 py-1 rounded-lg">板块2：产品信息</h3>
              <button 
                onClick={() => setIsProductSelectorOpen(true)}
                className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded transition-all flex items-center space-x-1 border border-indigo-200"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                <span>添加产品项</span>
              </button>
            </div>
            
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80">
                  <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-4">产品名称</th>
                    <th className="px-4 py-4">规格</th>
                    <th className="px-4 py-4 text-center">采购数量</th>
                    <th className="px-4 py-4 text-center">可退货数</th>
                    <th className="px-4 py-4 text-center">退货单价</th>
                    <th className="px-4 py-4 w-32">退货数量</th>
                    <th className="px-4 py-4">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-slate-800">{p.name}</span>
                      </td>
                      <td className="px-4 py-5 text-sm text-slate-400">
                        {p.specs || '--'}
                      </td>
                      <td className="px-4 py-5 text-center text-sm text-slate-600 font-mono">
                        {p.purchaseQty}
                      </td>
                      <td className="px-4 py-5 text-center text-sm font-bold text-indigo-600 font-mono">
                        {p.returnableQty}
                      </td>
                      <td className="px-4 py-5 text-center text-sm font-mono text-slate-700">
                        ¥{p.returnPrice}
                      </td>
                      <td className="px-4 py-5">
                        <input 
                          type="number" 
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                          value={p.returnQty}
                          onChange={(e) => handleQtyChange(idx, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-5">
                        <button 
                          onClick={() => removeProduct(idx)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Calculation Area */}
            <div className="flex justify-end p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="flex items-baseline space-x-3">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">合计 (元):</span>
                <span className="text-2xl font-mono font-bold text-indigo-700">¥{totalCalculated.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </section>

        </div>

        {/* Modal Footer */}
        <footer className="px-8 py-6 border-t border-slate-100 flex justify-end items-center space-x-4 bg-white shrink-0">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-12 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            确定
          </button>
        </footer>

        {/* Purchase Order Selector Modal */}
        {isOrderSelectorOpen && (
          <PurchaseOrderSelectorModal 
            onSelect={handleOrderSelect}
            onClose={() => setIsOrderSelectorOpen(false)}
          />
        )}

        {/* Product Selector Modal */}
        {isProductSelectorOpen && (
          <ProductSelectorModal 
            onSelect={handleProductsSelect}
            onClose={() => setIsProductSelectorOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
