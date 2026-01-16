
import React, { useState } from 'react';

interface SalesContractAddProps {
  onClose: () => void;
}

export const SalesContractAdd: React.FC<SalesContractAddProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('外箱合同');

  const tabs = [
    "外箱合同", "成本预估", "操作记录", "外箱条款", "上传附件", "外箱合同明细", "外箱费用明细"
  ];

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right-10 duration-500 overflow-hidden bg-slate-50">
      {/* Page Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-all group"
          >
            <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">外销合同-新增</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span>刷新</span>
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            保存合同
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1440px] mx-auto p-8">
          
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            
            {/* Tab Navigation */}
            <nav className="flex px-8 border-b border-slate-100 bg-white sticky top-0 z-20">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-6 text-sm font-bold transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
                </button>
              ))}
            </nav>

            {/* Tab Contents */}
            <div className="p-10">
              {activeTab === '外箱合同' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 animate-in fade-in duration-300">
                  <FormField label="外箱合同号" placeholder="请输入内容" required />
                  <FormField label="合同日期" type="date" defaultValue="2025-01-09" required />
                  <FormField label="报价单号" placeholder="请输入内容" />
                  <FormField label="订单类型" isSelect placeholder="请选择" />
                  <FormField label="我方名称" placeholder="请输入内容" defaultValue="众成贸易有限公司" />
                  <FormField label="客户编号" placeholder="请输入内容" />
                  <FormField label="客户名称" placeholder="请输入内容" />
                  <FormField label="客户联系人" placeholder="请输入内容" />
                  <FormField label="联系人邮箱" placeholder="请输入内容" />
                  <FormField label="币别" placeholder="请输入内容" />
                  <FormField label="汇率" type="number" defaultValue="0.0000" />
                  <FormField label="成交方式" isSelect placeholder="请选择" />
                  <FormField label="结汇方式" isSelect placeholder="请选择" />
                  <FormField label="装运港" isSelect placeholder="请选择" />
                  <FormField label="目的港" isSelect placeholder="请选择" />
                  <FormField label="运输方式" isSelect placeholder="请选择" />
                  <FormField label="运输条款" placeholder="请输入内容" />
                  <FormField label="交货日期" type="date" />
                  <FormField label="箱型" isSelect placeholder="请选择" />
                  <FormField label="退税装" placeholder="请输入内容" />
                  <FormField label="业务员编号" placeholder="请输入内容" />
                  <FormField label="业务员名称" placeholder="请输入内容" />
                  <FormField label="采购人员" placeholder="请输入内容" />
                  <FormField label="客户订单号" placeholder="请输入内容" />
                  <FormField label="海外公司" isSelect placeholder="请选择" />
                  <div className="lg:col-span-4">
                    <FormField label="外箱备注" placeholder="请输入内容" isTextArea />
                  </div>
                </div>
              )}

              {activeTab === '成本预估' && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
                  {[
                    { label: "销售收入", val: "0.00" },
                    { label: "销售收入CNY", val: "0.00" },
                    { label: "采购成本CNY", val: "0.00" },
                    { label: "费用合计CNY", val: "0.00" },
                    { label: "退税金额CNY", val: "0.00" },
                    { label: "折扣比例", val: "0.0000" },
                    { label: "折扣金额", val: "0.00" },
                    { label: "明佣比例", val: "0.0000" },
                    { label: "明佣金额", val: "0.00" },
                    { label: "暗佣比例", val: "0.0000" },
                    { label: "暗佣金额", val: "0.00" },
                    { label: "预估利润率%", val: "0.00", isHigh: true },
                    { label: "预估利润", val: "0.00", isHigh: true },
                  ].map((item, i) => (
                    <div key={i} className={`p-6 rounded-3xl border transition-all ${item.isHigh ? 'bg-indigo-50 border-indigo-100 ring-4 ring-indigo-50/50' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{item.label}</p>
                      <input 
                        type="text" 
                        defaultValue={item.val}
                        className={`w-full bg-transparent border-none p-0 text-xl font-mono font-black focus:ring-0 outline-none ${item.isHigh ? 'text-indigo-600' : 'text-slate-800'}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === '操作记录' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-16 animate-in fade-in duration-300 bg-slate-50/50 p-12 rounded-[2rem] border border-slate-100 border-dashed">
                  <DisplayField label="更新时间" value="自动填充" />
                  <DisplayField label="更新人员代码" value="自动填充" />
                  <DisplayField label="更新人员名称" value="自动填充" />
                  <DisplayField label="创建时间" value="自动填充" />
                  <DisplayField label="创建人员代码" value="自动填充" />
                  <DisplayField label="创建人员名称" value="自动填充" />
                </div>
              )}

              {activeTab === '外箱条款' && (
                <div className="max-w-2xl animate-in fade-in duration-300">
                  <FormField label="收款模板" placeholder="请输入内容" isTextArea />
                </div>
              )}

              {activeTab === '上传附件' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="border-4 border-dashed border-indigo-50 rounded-[2.5rem] bg-indigo-50/20 p-20 flex flex-col items-center justify-center space-y-6 group hover:bg-indigo-50/40 hover:border-indigo-100 transition-all cursor-pointer">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-black text-slate-700">将文件拖到此处，或点击上传</p>
                      <p className="text-xs text-slate-400 mt-2 uppercase tracking-[0.2em]">支持 PDF, JPG, PNG, DOCX (MAX 50MB)</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          <th className="px-8 py-5">序号</th>
                          <th className="px-4 py-5">附件名称</th>
                          <th className="px-4 py-5">缩略图</th>
                          <th className="px-4 py-5">创建人</th>
                          <th className="px-4 py-5">创建时间</th>
                          <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={6} className="px-8 py-16 text-center text-slate-300 italic text-sm">暂无已上传数据</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '外箱合同明细' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                        <span>新增商品</span>
                      </button>
                      <button className="px-5 py-2 bg-white border border-slate-200 text-slate-400 rounded-xl text-xs font-bold cursor-not-allowed">批量删除</button>
                      <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">取消筛选</button>
                    </div>
                  </div>
                  
                  <div className="border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-8 py-5 w-20 text-center">顺序号 ↑↓</th>
                          <th className="px-4 py-5">商品编号 √</th>
                          <th className="px-4 py-5">客户型号</th>
                          <th className="px-4 py-5">工厂货号</th>
                          <th className="px-4 py-5">中文品名</th>
                          <th className="px-4 py-5">中文描述</th>
                          <th className="px-4 py-5">英文货名</th>
                          <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={8} className="px-8 py-20 text-center text-slate-300 italic text-sm">暂无合同明细数据</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '外箱费用明细' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">费用筛选:</span>
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                      <option>全部费用</option>
                      <option>运输费</option>
                      <option>报关费</option>
                      <option>其它杂费</option>
                    </select>
                  </div>

                  {/* Accessory & Inventory Info Module */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center bg-slate-900 px-8 py-4 rounded-2xl">
                      <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest">外箱子配件与库存信息</h4>
                      <div className="flex space-x-3">
                         <button className="px-4 py-1.5 bg-white/10 text-white rounded-lg text-[10px] font-bold hover:bg-white/20 transition-all">新增配件</button>
                         <button className="px-4 py-1.5 bg-white/5 text-white/40 rounded-lg text-[10px] font-bold cursor-not-allowed">批量删除</button>
                      </div>
                    </div>
                    <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead className="bg-slate-50/80">
                          <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                            <th className="px-6 py-4 w-12">#</th>
                            <th className="px-4 py-4">单价</th>
                            <th className="px-4 py-4">损耗率</th>
                            <th className="px-4 py-4">单位</th>
                            <th className="px-4 py-4">金额</th>
                            <th className="px-4 py-4">采购数量</th>
                            <th className="px-4 py-4">供应商编号</th>
                            <th className="px-4 py-4">供应商名称</th>
                            <th className="px-6 py-4 text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={9} className="px-6 py-12 text-center text-slate-300 italic text-xs">暂无配件数据</td>
                          </tr>
                        </tbody>
                        <tfoot className="bg-slate-50/30">
                          <tr className="border-t border-slate-100 font-bold">
                             <td colSpan={4} className="px-6 py-4 text-right text-[10px] text-slate-400 uppercase">总计 (TOTAL)</td>
                             <td className="px-4 py-4 text-indigo-600 font-mono">¥ 0.00</td>
                             <td colSpan={4}></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 flex justify-end space-x-6">
             <button 
                onClick={onClose}
                className="px-12 py-3 text-slate-400 font-bold hover:text-slate-600 transition-all uppercase tracking-widest text-xs"
             >
               Discard Changes / 取消
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
  isTextArea?: boolean;
  required?: boolean;
}> = ({ label, type = 'text', placeholder, isSelect, defaultValue, isTextArea, required }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
      {label}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
    <div className="relative group">
      {isTextArea ? (
        <textarea 
          rows={4}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all group-hover:border-indigo-300 resize-none shadow-sm"
        />
      ) : isSelect ? (
        <>
          <div className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm text-slate-400 cursor-pointer group-hover:border-indigo-300 transition-all flex justify-between items-center shadow-sm">
            <span>{placeholder}</span>
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </>
      ) : (
        <input 
          type={type} 
          placeholder={placeholder} 
          defaultValue={defaultValue}
          className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all group-hover:border-indigo-300 shadow-sm font-medium text-slate-700"
        />
      )}
    </div>
  </div>
);

const DisplayField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-black text-slate-300 uppercase italic tracking-tighter">{value}</p>
  </div>
);
