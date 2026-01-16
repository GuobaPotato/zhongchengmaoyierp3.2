
import React, { useState } from 'react';
import { ProductSelectorModal } from './ProductSelectorModal';
import { InventoryItem } from '../types';

interface ProductProcessAddProps {
  onClose?: () => void;
}

export const ProductProcessAdd: React.FC<ProductProcessAddProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    processName: '',
    team: '',
    leader: '',
    teamSize: '',
    inspector: ''
  });

  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleSave = () => {
    if (!selectedProduct || !formData.processName) {
      alert("请完整填写必填项（关联产品与工序名称）");
      return;
    }
    // 模拟保存逻辑
    console.log('Saving routing for product:', selectedProduct.name, 'Process:', formData);
    if (onClose) onClose();
  };

  const handleProductSelect = (items: InventoryItem[]) => {
    // 既然是新增工艺路线，通常针对单个产品，这里取第一个选中的
    if (items.length > 0) {
      setSelectedProduct(items[0]);
    }
    setIsProductModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="flex items-center space-x-6">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">新增工艺路线</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Add Production Process Routing</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            重置
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            保存工艺路线
          </button>
        </div>
      </header>

      {/* 主体内容区 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-12">
          
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden p-12 lg:p-16 space-y-12">
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
               <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest flex items-center">
                  <div className="w-1.5 h-5 bg-indigo-500 rounded-full mr-3"></div>
                  生产工序 (Production Process)
               </h2>
               <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-3 py-1 rounded-full">Section 01</span>
            </div>

            <div className="space-y-12">
              {/* 行序号 1: 产品选择、工序名称与技术附件 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <FormItem label="选择产品">
                  <button 
                    onClick={() => setIsProductModalOpen(true)}
                    className={`w-full flex items-center justify-between px-4 py-3 border rounded-xl text-sm transition-all group ${
                      selectedProduct 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-black' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-indigo-300 font-bold'
                    }`}
                  >
                    <span className="truncate">
                      {selectedProduct ? `${selectedProduct.name} (${selectedProduct.id})` : '点击选择产品'}
                    </span>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" />
                    </svg>
                  </button>
                </FormItem>
                <FormItem label="工序名称">
                  <input 
                    type="text" 
                    placeholder="请输入工序名称" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                    value={formData.processName}
                    onChange={e => setFormData({...formData, processName: e.target.value})}
                  />
                </FormItem>
                <FormItem label="工序技术附件">
                  <FileUploadZone tips="选择 拖拽或单击后粘贴文件，单个20MB以内" />
                </FormItem>
              </div>

              {/* 行序号 2: 班组与人力分配 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <FormItem label="生产班组">
                  <div className="relative group">
                    <select 
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all cursor-pointer"
                      value={formData.team}
                      onChange={e => setFormData({...formData, team: e.target.value})}
                    >
                      <option value="">请选择班组</option>
                      <option value="A">生产A组</option>
                      <option value="B">生产B组</option>
                      <option value="C">组装C组</option>
                    </select>
                    <svg className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </FormItem>
                <FormItem label="班长">
                  <MemberSelector 
                    placeholder="+ 选择成员" 
                    selected={formData.leader} 
                    onSelect={v => setFormData({...formData, leader: v})} 
                  />
                </FormItem>
                <FormItem label="班组人数">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="请输入人数" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                      value={formData.teamSize}
                      onChange={e => setFormData({...formData, teamSize: e.target.value})}
                    />
                    <span className="absolute right-4 top-3.5 text-[10px] font-black text-slate-300 uppercase">Persons</span>
                  </div>
                </FormItem>
              </div>

              {/* 行序号 3: 质量监控 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <FormItem label="质检员">
                  <MemberSelector 
                    placeholder="+ 选择成员" 
                    selected={formData.inspector} 
                    onSelect={v => setFormData({...formData, inspector: v})} 
                  />
                </FormItem>
                <div className="hidden lg:block lg:col-span-2"></div>
              </div>
            </div>
          </div>

          {/* 辅助操作贴士 */}
          <div className="mt-12 bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200 animate-in zoom-in-95 duration-700">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
             <div className="relative z-10 flex items-center space-x-6">
                <div className="bg-white/10 p-3 rounded-2xl">
                   <svg className="w-8 h-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <div className="space-y-1">
                   <h4 className="text-sm font-black uppercase tracking-widest">录入指南</h4>
                   <p className="text-xs text-indigo-100 leading-relaxed max-w-2xl font-medium">
                      工艺路线是生产执行的核心，请确保首先【选择产品】，再定义该产品的工序流程。系统将根据此处配置自动生成该产品的生产派工单与工序质检任务。
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* 产品选择弹窗 */}
      {isProductModalOpen && (
        <ProductSelectorModal 
          onSelect={handleProductSelect}
          onClose={() => setIsProductModalOpen(false)}
        />
      )}

      <footer className="bg-white border-t border-slate-100 px-10 py-6 flex justify-end shrink-0 z-40 shadow-inner">
         <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">ERP v3.1 Production Module © Sensor Tech</span>
      </footer>
    </div>
  );
};

/* --- 辅助子组件 --- */

const FormItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    {children}
  </div>
);

const FileUploadZone: React.FC<{ tips: string }> = ({ tips }) => (
  <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-all group min-h-[46px] bg-slate-50/30">
    <div className="flex items-center space-x-3 text-slate-400 group-hover:text-indigo-600 transition-colors">
       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
       <span className="text-[10px] font-bold tracking-tight">{tips}</span>
    </div>
  </div>
);

const MemberSelector: React.FC<{ placeholder: string; selected?: string; onSelect: (v: string) => void }> = ({ placeholder, selected, onSelect }) => {
  return (
    <button 
      onClick={() => onSelect('王明(M001)')} // 模拟选择行为
      className={`w-full flex items-center justify-between px-4 py-3 border rounded-xl text-sm transition-all ${
        selected 
          ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-black' 
          : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-indigo-300 font-bold'
      }`}
    >
      <span className="truncate">{selected || placeholder}</span>
      <svg className="w-4 h-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
    </button>
  );
};
