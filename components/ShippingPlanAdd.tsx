
import React, { useState } from 'react';

interface ShippingPlanAddProps {
  onClose: () => void;
}

export const ShippingPlanAdd: React.FC<ShippingPlanAddProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('出运计划');

  const tabs = ["出运计划", "提单信息", "唛头信息", "操作记录", "上传附件", "出运明细"];

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-10 duration-500">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20 shrink-0">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
          >
            <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-extrabold text-slate-800">出运计划-新增</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
              <span>调取历史模板</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            保存计划
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8">
          
          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            
            {/* Tab Bar */}
            <nav className="flex px-6 border-b border-slate-100 bg-white">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-5 text-sm font-bold transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
                </button>
              ))}
            </nav>

            {/* Form Sections */}
            <div className="p-8">
              {activeTab === '出运计划' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
                  <FormField label="出运单号" placeholder="请输入内容" />
                  <FormField label="出运日期" type="date" />
                  <FormField label="外销合同" placeholder="请输入内容 / 下拉选择" isSelect />
                  <FormField label="我方编号" placeholder="请输入内容" />
                  <FormField label="我方名称" placeholder="请输入内容" defaultValue="众成贸易有限公司" />
                  <FormField label="客户编号" placeholder="请输入内容" />
                  <FormField label="客户名称" placeholder="请输入内容" />
                  <FormField label="币别" placeholder="请输入内容" />
                  <FormField label="汇率" type="number" defaultValue="0.0000" />
                  <FormField label="成交方式" placeholder="FOB/CIF等" isSelect />
                  <FormField label="结汇方式" placeholder="电汇/信用证等" isSelect />
                  <FormField label="装船港" placeholder="请输入内容" />
                  <FormField label="目的港" placeholder="请输入内容" />
                  <FormField label="运输方式" placeholder="海运/空运等" isSelect />
                  <FormField label="交货日期" type="date" />
                  <FormField label="货代编号" placeholder="请输入内容" />
                  <FormField label="货代名称" placeholder="请输入内容" />
                  <FormField label="预计ETD" type="date" />
                  <FormField label="预计ETA" type="date" />
                  <FormField label="报关行编号" placeholder="请输入内容" />
                  <FormField label="报关公司" placeholder="请输入内容" />
                  <FormField label="船公司" placeholder="请输入内容" />
                </div>
              )}

              {activeTab === '提单信息' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300 max-w-4xl">
                  <FormField label="提单收货人" placeholder="请输入内容" isFull />
                  <FormField label="提单通知人" placeholder="请输入内容" isFull />
                  <FormField label="运费价格" type="number" defaultValue="0.00" />
                  <FormField label="提单加注" placeholder="请输入内容（如：感应配件需轻装轻卸）" />
                </div>
              )}

              {activeTab === '唛头信息' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">唛头信息</label>
                    <textarea 
                      rows={6}
                      placeholder="请输入内容（如：企业编码/货名/标识）"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none font-mono"
                    ></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">货物描述</label>
                    <textarea 
                      rows={4}
                      placeholder="请输入内容（如：感应XX配件/材质/等级）"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
              )}

              {activeTab === '操作记录' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12 animate-in fade-in duration-300 bg-slate-50 p-10 rounded-3xl border border-slate-100 border-dashed">
                  <DisplayField label="更新时间" value="自动填充" />
                  <DisplayField label="更新人员代码" value="自动填充" />
                  <DisplayField label="更新人员名称" value="自动填充" />
                  <DisplayField label="创建时间" value="自动填充" />
                  <DisplayField label="创建人员代码" value="自动填充" />
                  <DisplayField label="创建人员名称" value="自动填充" />
                </div>
              )}

              {activeTab === '上传附件' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 hover:bg-indigo-100 transition-all">新增</button>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-400 rounded-xl text-xs font-bold cursor-not-allowed">批量删除</button>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold">取消筛选</button>
                  </div>
                  
                  <div className="border-2 border-dashed border-indigo-100 rounded-3xl bg-indigo-50/20 p-16 flex flex-col items-center justify-center space-y-4 group hover:bg-indigo-50/40 hover:border-indigo-200 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-700">将文件拖到此处，或点击上传</p>
                      <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">支持 PDF, JPG, PNG, DOCX (最大 50MB)</p>
                    </div>
                  </div>

                  <div className="py-12 text-center text-slate-400 text-sm italic">
                    暂无已上传数据
                  </div>
                </div>
              )}

              {activeTab === '出运明细' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50">
                        <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          <th className="px-6 py-4 w-12 text-center">#</th>
                          <th className="px-4 py-4">外销合同</th>
                          <th className="px-4 py-4">商品编号</th>
                          <th className="px-4 py-4">客户货号</th>
                          <th className="px-4 py-4">工厂货号</th>
                          <th className="px-4 py-4">中文货名</th>
                          <th className="px-4 py-4 text-center">单位</th>
                          <th className="px-4 py-4 text-right">出运数量</th>
                          <th className="px-4 py-4 text-right">销售单价</th>
                          <th className="px-6 py-4 text-right">销售金额</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         <tr>
                           <td colSpan={10} className="px-6 py-12 text-center text-slate-300 text-sm italic bg-white">
                              尚未添加明细数据
                           </td>
                         </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer / Summary */}
                  <div className="bg-slate-900 rounded-2xl p-6 flex justify-end space-x-12">
                     <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">总出运数量</span>
                        <span className="text-2xl font-mono font-bold text-white">0.00</span>
                     </div>
                     <div className="flex flex-col items-end border-l border-slate-800 pl-12">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">销售总金额</span>
                        <span className="text-2xl font-mono font-bold text-indigo-400">¥ 0.00</span>
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
             <button 
                onClick={onClose}
                className="px-10 py-3 text-slate-400 font-bold hover:text-slate-600 transition-all"
             >
               取消
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField: React.FC<{ 
  label: string; 
  type?: string; 
  placeholder?: string; 
  isSelect?: boolean; 
  defaultValue?: string;
  isFull?: boolean;
}> = ({ label, type = 'text', placeholder, isSelect, defaultValue, isFull }) => (
  <div className={`space-y-1.5 ${isFull ? 'md:col-span-2' : ''}`}>
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
    <div className="relative group">
      {isSelect ? (
        <>
          <input 
            type="text" 
            placeholder={placeholder} 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer group-hover:border-indigo-300"
          />
          <div className="absolute right-3 top-3 text-slate-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </>
      ) : (
        <input 
          type={type} 
          placeholder={placeholder} 
          defaultValue={defaultValue}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all group-hover:border-indigo-300"
        />
      )}
    </div>
  </div>
);

const DisplayField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-bold text-slate-300 uppercase italic">{value}</p>
  </div>
);
