
import React, { useState } from 'react';
import { ProductSelectorModal } from './ProductSelectorModal';
import { InventoryItem } from '../types';

interface QCRule {
  id: string;
  type: 'quantitative' | 'qualitative';
  fieldName: string;
  supplementary: string;
  qualifiedValue: string;
}

interface ProductQCRuleAddProps {
  onClose: () => void;
}

export const ProductQCRuleAdd: React.FC<ProductQCRuleAddProps> = ({ onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [rules, setRules] = useState<QCRule[]>([
    {
      id: '1',
      type: 'quantitative',
      fieldName: '外壳厚度',
      supplementary: 'mm',
      qualifiedValue: '2-3'
    }
  ]);

  const addRule = () => {
    const newRule: QCRule = {
      id: Date.now().toString(),
      type: 'quantitative',
      fieldName: '',
      supplementary: '',
      qualifiedValue: ''
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id: string, updates: Partial<QCRule>) => {
    setRules(rules.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const handleProductSelect = (items: InventoryItem[]) => {
    if (items.length > 0) {
      setSelectedProduct(items[0]);
    }
    setIsProductModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="flex items-center space-x-5">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-100">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">产品质检规则-新增</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Product QC Standard Configuration</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            返回
          </button>
          <button 
            onClick={() => { alert('质检规则已保存'); onClose(); }}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            保存规则
          </button>
        </div>
      </header>

      {/* 主体内容区 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-12 space-y-10 pb-32">
          
          {/* 产品选择板块 */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">产品选择</h3>
            </div>
            <div className="p-10">
              <div className="max-w-md space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">目标产品 <span className="text-rose-500">*</span></label>
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setIsProductModalOpen(true)}
                >
                  <input 
                    type="text" 
                    readOnly
                    placeholder="输入产品名称/编号模糊查询 / 下拉选择"
                    className={`w-full border rounded-xl px-4 py-3 text-sm transition-all outline-none ${
                      selectedProduct 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-black' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-indigo-300'
                    }`}
                    value={selectedProduct ? `${selectedProduct.name} (${selectedProduct.id})` : ''}
                  />
                  <div className="absolute right-4 top-3.5 text-slate-300 group-hover:text-indigo-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 质检规则配置板块 */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">质检规则配置</h3>
              </div>
              <button 
                onClick={addRule}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                <span>新增质检规则</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-10 py-5 w-16 text-center">序号</th>
                    <th className="px-4 py-5 w-48">规则类型</th>
                    <th className="px-4 py-5">字段名</th>
                    <th className="px-4 py-5">补充字段 (单位)</th>
                    <th className="px-4 py-5">合格值/可选数据</th>
                    <th className="px-10 py-5 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rules.map((rule, idx) => (
                    <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-10 py-6 text-center text-xs font-mono font-bold text-slate-300">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-6">
                        <div className="flex space-x-4">
                          {[
                            { label: '定量', value: 'quantitative' },
                            { label: '定性', value: 'qualitative' }
                          ].map(opt => (
                            <label key={opt.value} className="flex items-center space-x-2 cursor-pointer group">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${rule.type === opt.value ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'}`}>
                                {rule.type === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                              </div>
                              <input 
                                type="radio" 
                                className="hidden" 
                                checked={rule.type === opt.value} 
                                onChange={() => updateRule(rule.id, { type: opt.value as any })} 
                              />
                              <span className={`text-xs font-black ${rule.type === opt.value ? 'text-indigo-600' : 'text-slate-400'}`}>{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <input 
                          type="text" 
                          placeholder="如直径、外壳光滑度"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                          value={rule.fieldName}
                          onChange={e => updateRule(rule.id, { fieldName: e.target.value })}
                        />
                      </td>
                      <td className="px-4 py-6">
                        <div className="relative group">
                          <input 
                            type="text" 
                            disabled={rule.type === 'qualitative'}
                            placeholder={rule.type === 'quantitative' ? "如 mm/g" : "定性留空"}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all disabled:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            value={rule.supplementary}
                            onChange={e => updateRule(rule.id, { supplementary: e.target.value })}
                          />
                          {rule.type === 'quantitative' && <span className="absolute right-3 top-2.5 text-[9px] font-black text-slate-300 uppercase">Unit</span>}
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <div className="space-y-1">
                          <input 
                            type="text" 
                            placeholder={rule.type === 'quantitative' ? "如 2-3" : "如 是/否"}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                            value={rule.qualifiedValue}
                            onChange={e => updateRule(rule.id, { qualifiedValue: e.target.value })}
                          />
                          <p className="text-[9px] text-slate-300 italic font-medium ml-1">
                            {rule.type === 'quantitative' ? "填写合格范围数值" : "示例：是/否；优秀/良好"}
                          </p>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button 
                          onClick={() => removeRule(rule.id)}
                          className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline hover:text-rose-700 transition-all"
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                  {rules.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center text-slate-300 italic text-sm">
                        尚未配置质检规则，请点击右上方按钮添加
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-start space-x-4">
              <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-500 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-black text-indigo-700 uppercase tracking-widest">配置说明</h4>
                <p className="text-xs text-indigo-600/70 leading-relaxed font-medium">
                  定量规则用于测量数值判定（如厚度、电压），支持范围设定；定性规则用于感官判定（如颜色、表面瑕疵），由检测员勾选预设选项。
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 产品选择弹窗 */}
      {isProductModalOpen && (
        <ProductSelectorModal 
          onSelect={handleProductSelect}
          onClose={() => setIsProductModalOpen(false)}
        />
      )}

      <footer className="bg-white border-t border-slate-100 px-10 py-5 flex justify-between items-center shrink-0 shadow-inner">
         <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">System QC Management Engine v3.1</span>
         <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-emerald-600 uppercase">Buffer Validated</span>
         </div>
      </footer>
    </div>
  );
};
