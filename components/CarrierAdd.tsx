
import React, { useState } from 'react';

interface CarrierAddProps {
  onClose: () => void;
}

export const CarrierAdd: React.FC<CarrierAddProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('货代维护');
  const [formData, setFormData] = useState({
    carrierNo: '',
    shortName: '',
    fullName: '',
    address: '',
    phone: '',
    website: '',
    businessScope: '',
    taxId: ''
  });

  const tabs = ["货代维护", "操作记录", "上传附件", "货代联系人表", "货代银行表"];

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-sm">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-indigo-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">新增承运商</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Carrier / Forwarder Onboarding</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={onClose}
            className="px-10 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            保存
          </button>
        </div>
      </header>

      {/* 标签页导航 */}
      <nav className="bg-white border-b border-slate-100 px-10 flex shrink-0 sticky top-[72px] z-30">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-5 text-sm font-black transition-all relative uppercase tracking-widest ${
              activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
        ))}
      </nav>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-12 space-y-10 pb-32">
          
          {activeTab === '货代维护' && (
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-300">
              <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">货代基础信息录入</h3>
              </div>
              <div className="p-10 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormItem label="货代编号" placeholder="请输入内容" required />
                <FormItem label="货代简称" placeholder="请输入内容" required />
                <FormItem label="货代名称" placeholder="请输入内容" isFull />
                <FormItem label="地址" placeholder="请输入内容" isFull />
                <FormItem label="电话" placeholder="请输入内容" />
                <FormItem label="网址" placeholder="请输入内容" />
                <FormItem label="经营范围" placeholder="请输入内容" isFull />
                <FormItem label="纳税人识别号" placeholder="请输入内容" />
              </div>
            </section>
          )}

          {activeTab === '操作记录' && (
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-300">
               <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">单据流转元数据</h3>
              </div>
              <div className="p-10 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                <FormItem label="更新时间" value="2026-01-13" isDisabled />
                <FormItem label="更新人代码" placeholder="请输入内容" />
                <FormItem label="更新人名称" placeholder="请输入内容" />
                <FormItem label="创建时间" value="2026-01-13" isDisabled />
                <FormItem label="创建人代码" placeholder="请输入内容" />
                <FormItem label="创建人名称" placeholder="请输入内容" />
                <FormItem label="模块编号" value="4" isDisabled />
              </div>
            </section>
          )}

          {activeTab === '上传附件' && (
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-300">
              <div className="p-10 space-y-10">
                <div className="border-4 border-dashed border-indigo-50 rounded-[2.5rem] bg-indigo-50/20 p-20 flex flex-col items-center justify-center space-y-6 group hover:bg-indigo-50/40 transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <p className="text-lg font-black text-slate-700 tracking-tight uppercase">将文件拖到此处，或点击上传</p>
                </div>

                <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/80 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-8 py-5">序号</th>
                        <th className="px-4 py-5">附件名称</th>
                        <th className="px-4 py-5 text-center">缩略图</th>
                        <th className="px-4 py-5">创建人</th>
                        <th className="px-4 py-5 text-center">创建时间</th>
                        <th className="px-8 py-5 text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={6} className="px-8 py-16 text-center text-slate-300 italic text-sm font-medium tracking-widest uppercase">暂无已上传数据 / Empty Data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeTab === '货代联系人表' && (
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-300">
               <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-slate-700">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-sm font-black uppercase tracking-widest">联系人清单</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center space-x-2">
                       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                       <span>新增</span>
                    </button>
                    <button className="px-5 py-2 bg-white border border-slate-200 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">批量删除</button>
                    <button className="px-5 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">取消筛选</button>
                  </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                     <tr>
                        <th className="px-8 py-5 w-12 text-center border-r border-slate-100">#</th>
                        <th className="px-4 py-5 w-12 text-center border-r border-slate-100"><input type="checkbox" className="rounded text-indigo-600" /></th>
                        <SortableHeader label="联系人" />
                        <SortableHeader label="电话" />
                        <SortableHeader label="传真" />
                        <SortableHeader label="邮箱" />
                        <SortableHeader label="性别" />
                        <SortableHeader label="生日" />
                        <th className="px-8 py-5 text-right">操作</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                        <td colSpan={9} className="px-8 py-24 text-center text-slate-300 italic text-sm font-medium tracking-widest uppercase">
                          尚未添加联系人信息 / No Contact Data
                        </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </section>
          )}

          {activeTab === '货代银行表' && (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-200 border-dashed animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <p className="text-sm font-black text-slate-300 uppercase tracking-[0.3em]">银行账户模块开发中...</p>
             </div>
          )}

        </div>
      </div>

      <footer className="bg-white border-t border-slate-100 px-10 py-5 flex justify-between items-center shrink-0 shadow-inner">
         <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest underline decoration-indigo-200 decoration-2">System Integrated Archive Management v3.1</span>
         <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[9px] font-black text-slate-400 uppercase">Input Buffer Ready</span>
         </div>
      </footer>
    </div>
  );
};

/* --- 内部辅助组件 --- */

const FormItem: React.FC<{ label: string; placeholder?: string; required?: boolean; isFull?: boolean; isDisabled?: boolean; value?: string }> = ({ label, placeholder, required, isFull, isDisabled, value }) => (
  <div className={`space-y-2 ${isFull ? 'md:col-span-2' : ''}`}>
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
      {label}
      {required && <span className="text-rose-500 ml-1 font-black">*</span>}
    </label>
    <input 
      type="text" 
      disabled={isDisabled}
      defaultValue={value}
      placeholder={placeholder}
      className={`w-full border rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none ${
        isDisabled 
          ? 'bg-slate-100 border-slate-100 text-slate-400 cursor-not-allowed italic' 
          : 'bg-slate-50 border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 text-slate-700'
      }`}
    />
  </div>
);

const SortableHeader: React.FC<{ label: string }> = ({ label }) => (
  <th className="px-4 py-5 whitespace-nowrap group cursor-pointer hover:bg-slate-100 transition-colors">
    <div className="flex items-center space-x-2">
      <span>{label}</span>
      <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-2 h-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3l-7 7h14l-7-7z" /></svg>
        <svg className="w-2 h-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 17l7-7H3l7 7z" /></svg>
      </div>
    </div>
  </th>
);
