
import React, { useState } from 'react';
import { ProductSelectorModal } from './ProductSelectorModal';
import { InventoryItem } from '../types';

interface InventoryCountAddProps {
  onClose: () => void;
}

interface SelectedInventoryItem {
  id: string;
  name: string;
  bookStock: number;
  actualStock: number;
  status: string;
  remark: string;
}

export const InventoryCountAdd: React.FC<InventoryCountAddProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    planDate: '2025-10-07',
    responsible: '李总监(全公司)',
    remark: ''
  });

  const [products, setProducts] = useState<SelectedInventoryItem[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleAddProducts = (items: InventoryItem[]) => {
    const newItems: SelectedInventoryItem[] = items.map(item => ({
      id: item.id,
      name: item.name,
      bookStock: item.stock,
      actualStock: item.stock, // Default to book stock
      status: '无差异',
      remark: ''
    }));
    
    // Simple deduplication logic
    const existingIds = new Set(products.map(p => p.id));
    const filteredNewItems = newItems.filter(item => !existingIds.has(item.id));
    
    setProducts(prev => [...prev, ...filteredNewItems]);
    setIsProductModalOpen(false);
  };

  const updateActualStock = (id: string, value: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const diff = value - p.bookStock;
        const status = diff === 0 ? '无差异' : diff > 0 ? '盘盈' : '盘亏';
        return { ...p, actualStock: value, status };
      }
      return p;
    }));
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Page Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-indigo-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">添加</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            确定
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8 space-y-8">
          
          {/* Section: Basic Information */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">基本信息</h3>
            </div>
            <div className="p-10 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                      标题 <span className="text-rose-500 ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="请输入盘点单标题"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                      计划盘点时间 <span className="text-rose-500 ml-1">*</span>
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                      value={formData.planDate}
                      onChange={e => setFormData({...formData, planDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                      盘点负责人 <span className="text-rose-500 ml-1">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      value={formData.responsible}
                      onChange={e => setFormData({...formData, responsible: e.target.value})}
                    />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                    备注
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="请输入盘点备注信息..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none shadow-inner"
                    value={formData.remark}
                    onChange={e => setFormData({...formData, remark: e.target.value})}
                  />
               </div>
            </div>
          </section>

          {/* Section: Product Information */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">产品信息</h3>
                </div>
                <button 
                  onClick={() => setIsProductModalOpen(true)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                  <span>添加</span>
                </button>
             </div>
             
             <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <th className="px-10 py-4">产品名称</th>
                       <th className="px-4 py-4 text-right">原仓库库存</th>
                       <th className="px-4 py-4 text-right w-40">实际库存</th>
                       <th className="px-4 py-4 text-center">盘点状态</th>
                       <th className="px-4 py-4">备注</th>
                       <th className="px-10 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {products.length > 0 ? products.map((p) => (
                      <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-10 py-6">
                           <div className="flex flex-col">
                              <span className="text-sm font-black text-slate-800 tracking-tight">{p.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-tighter">{p.id}</span>
                           </div>
                        </td>
                        <td className="px-4 py-6 text-right font-mono font-bold text-slate-500">
                           {p.bookStock}
                        </td>
                        <td className="px-4 py-6 text-right">
                           <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                              <input 
                                type="number" 
                                value={p.actualStock}
                                onChange={e => updateActualStock(p.id, parseInt(e.target.value) || 0)}
                                className="bg-transparent border-none p-0 w-20 text-right text-sm font-black text-slate-800 focus:ring-0 outline-none"
                              />
                           </div>
                        </td>
                        <td className="px-4 py-6 text-center">
                           <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                             p.status === '无差异' ? 'bg-slate-100 text-slate-500' : 
                             p.status === '盘盈' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                           }`}>
                             {p.status}
                           </span>
                        </td>
                        <td className="px-4 py-6">
                           <input 
                              type="text" 
                              placeholder="备注说明"
                              className="w-full bg-transparent border-none text-xs text-slate-500 focus:ring-0 outline-none italic"
                              value={p.remark}
                              onChange={e => setProducts(prev => prev.map(item => item.id === p.id ? {...item, remark: e.target.value} : item))}
                           />
                        </td>
                        <td className="px-10 py-6 text-right">
                           <button 
                             onClick={() => removeProduct(p.id)}
                             className="text-slate-300 hover:text-rose-500 transition-colors p-2"
                           >
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                           </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                         <td colSpan={6} className="px-10 py-24 text-center">
                            <div className="flex flex-col items-center justify-center space-y-4">
                               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                               </div>
                               <p className="text-sm font-black text-slate-300 uppercase tracking-widest">暂无数据</p>
                               <button 
                                 onClick={() => setIsProductModalOpen(true)}
                                 className="text-xs font-black text-indigo-600 underline underline-offset-4 hover:text-indigo-800 transition-colors"
                               >
                                 点击此处选择产品加入盘点
                               </button>
                            </div>
                         </td>
                      </tr>
                    )}
                  </tbody>
                </table>
             </div>
          </section>
        </div>
      </div>

      {/* Product Selector Modal Integration */}
      {isProductModalOpen && (
        <ProductSelectorModal 
          onSelect={handleAddProducts}
          onClose={() => setIsProductModalOpen(false)}
        />
      )}
    </div>
  );
};
