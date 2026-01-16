
import React, { useState } from 'react';

interface ProductInfoAddProps {
  onClose?: () => void;
}

export const ProductInfoAdd: React.FC<ProductInfoAddProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    unit: '件',
    costPrice: '',
    vatRate: '13',
    diameter: '',
    color: '',
    length: '',
    weight: ''
  });

  const handleSave = () => {
    if (!formData.category || !formData.name) {
      alert("请填写必填项：产品分类与名称");
      return;
    }
    console.log('Saving product info:', formData);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
      {/* 顶部固定标题栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="flex items-center space-x-5">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-100">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">新增产品信息</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Define Basic Product Profiles</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            提交产品
          </button>
        </div>
      </header>

      {/* 表单主体 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-12 space-y-10 pb-32">
          
          {/* 区块 1: 产品基础信息 */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">产品基础信息 (Core Data)</h3>
            </div>
            
            <div className="p-10 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormItem label="产品编码" tips="自动生成无需填写">
                  <input 
                    type="text" 
                    readOnly 
                    placeholder="自动生成无需填写" 
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-400 cursor-not-allowed outline-none italic"
                  />
                </FormItem>

                <FormItem label="产品分类" required>
                  <CustomSelect 
                    value={formData.category} 
                    onChange={v => setFormData({...formData, category: v})} 
                    options={["成品", "半成品"]}
                    placeholder="请选择产品分类"
                  />
                </FormItem>

                <FormItem label="产品名称" required>
                  <input 
                    type="text" 
                    placeholder="请输入产品官方名称" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </FormItem>

                <FormItem label="生产单位" required>
                  <CustomSelect 
                    value={formData.unit} 
                    onChange={v => setFormData({...formData, unit: v})} 
                    options={["件", "套"]}
                  />
                </FormItem>

                <FormItem label="成本单价/元">
                  <div className="relative group">
                    <span className="absolute left-4 top-3 text-slate-400 text-sm font-bold">¥</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-mono font-black text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                      value={formData.costPrice}
                      onChange={e => setFormData({...formData, costPrice: e.target.value})}
                    />
                  </div>
                </FormItem>

                <FormItem label="增值税税率%">
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-700 outline-none"
                      value={formData.vatRate}
                      onChange={e => setFormData({...formData, vatRate: e.target.value})}
                    />
                    <span className="absolute right-4 top-3 text-[10px] font-black text-slate-400 uppercase">% VAT</span>
                  </div>
                </FormItem>

                <div className="md:col-span-2">
                  <FormItem label="产品图片">
                    <ImageUploadZone />
                  </FormItem>
                </div>
              </div>
            </div>
          </section>

          {/* 区块 2: 规格参数 */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">规格参数 (Specifications)</h3>
            </div>
            <div className="p-10 lg:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <FormItem label="直径/mm">
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.diameter}
                  onChange={e => setFormData({...formData, diameter: e.target.value})}
                />
              </FormItem>
              <FormItem label="颜色">
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.color}
                  onChange={e => setFormData({...formData, color: e.target.value})}
                />
              </FormItem>
              <FormItem label="长度规格/m">
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.length}
                  onChange={e => setFormData({...formData, length: e.target.value})}
                />
              </FormItem>
              <FormItem label="重量/kg">
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.weight}
                  onChange={e => setFormData({...formData, weight: e.target.value})}
                />
              </FormItem>
            </div>
          </section>

          {/* 底部按钮 (非固定) */}
          <div className="flex justify-end items-center space-x-4">
             <button 
                onClick={onClose}
                className="px-10 py-3 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
             >
                保存为草稿
             </button>
             <button 
                onClick={handleSave}
                className="px-12 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
             >
                提交产品信息
             </button>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-slate-100 px-10 py-4 flex justify-between items-center shrink-0 shadow-inner">
         <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-[0.2em]">Product Lifecycle Management v3.1</span>
         <span className="text-[10px] font-bold text-slate-300">眾林感應技術中心 © 2026</span>
      </footer>
    </div>
  );
};

/* --- 内部辅助组件 --- */

const FormItem: React.FC<{ label: string; required?: boolean; tips?: string; children: React.ReactNode }> = ({ label, required, tips, children }) => (
  <div className="space-y-2.5">
    <div className="flex justify-between items-center px-1">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center">
        {label}
        {required && <span className="text-rose-500 ml-1 font-black">*</span>}
      </label>
      {tips && <span className="text-[9px] text-slate-300 italic font-medium">{tips}</span>}
    </div>
    {children}
  </div>
);

const CustomSelect: React.FC<{ value: string; options: string[]; onChange: (v: string) => void; placeholder?: string }> = ({ value, options, onChange, placeholder = "请选择" }) => (
  <div className="relative group">
    <select 
      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all cursor-pointer"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <div className="absolute right-4 top-3.5 text-slate-300 pointer-events-none group-hover:text-indigo-500 transition-colors">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
    </div>
  </div>
);

const ImageUploadZone: React.FC = () => (
  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all cursor-pointer group group/dropzone">
    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-all">
       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    </div>
    <div className="text-center">
       <p className="text-sm font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">选择 拖拽或点击后粘贴图片</p>
       <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter mt-1">Single image up to 20MB</p>
    </div>
  </div>
);
