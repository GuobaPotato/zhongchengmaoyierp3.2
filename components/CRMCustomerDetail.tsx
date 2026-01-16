
import React, { useState } from 'react';

interface CRMCustomerDetailProps {
  customerName: string;
  onClose: () => void;
}

export const CRMCustomerDetail: React.FC<CRMCustomerDetailProps> = ({ customerName, onClose }) => {
  const [activeTab, setActiveTab] = useState('沟通记录');

  const tabs = [
    "沟通记录", "详细信息", "企业信息", "联系人", 
    "报价单", "合同", "回款计划", "回款单", "发票", 
    "跟进人", "附件", "操作记录"
  ];

  const unreadBadges = ["联系人", "操作记录"];

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* 顶部信息栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{customerName}</h1>
            <div className="flex items-center space-x-4 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>创建时间: 2026-01-09 17:10</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>最近跟进: 2026-01-09 17:10</span>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
          <div className="hidden md:flex space-x-8">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">负责人</p>
              <div className="flex items-center space-x-2">
                 <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-white text-[10px] font-black">王</div>
                 <p className="text-sm font-bold text-slate-700">王丽</p>
              </div>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">标签</p>
              <div className="flex items-center space-x-1.5">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase border border-indigo-100">核心大客</span>
                <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all uppercase tracking-widest">编辑</button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all uppercase tracking-widest">导出</button>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </header>

      {/* 标签页导航栏 */}
      <nav className="bg-white border-b border-slate-100 px-8 flex shrink-0 sticky top-[72px] z-30 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-5 text-sm font-black transition-all relative uppercase tracking-widest whitespace-nowrap flex items-center ${
              activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {unreadBadges.includes(tab) && <span className="ml-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
        ))}
      </nav>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 pb-32">
          
          {activeTab === '沟通记录' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               {/* 发布区 */}
               <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
                  <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center gap-6">
                    <div className="flex items-center space-x-3">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">沟通记录类型</span>
                       <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer pr-10">
                          <option>请选择</option>
                          <option>打电话</option>
                          <option>见面沟通</option>
                       </select>
                    </div>
                    <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">下次联系时间</span>
                       <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black">
                          <input type="datetime-local" className="bg-transparent outline-none mr-2" />
                          <button className="text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest text-[9px]">选择时间</button>
                       </div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex items-center space-x-4">
                       <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-500 outline-none">
                          <option>选择销售记录模板</option>
                       </select>
                       <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <textarea 
                      className="w-full min-h-[160px] bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-sm focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-200 outline-none transition-all resize-none shadow-inner"
                      placeholder="发布一条销售记录(使用ctrl+v可直接粘贴图片)..."
                    ></textarea>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                          <button className="p-3 bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all shadow-sm"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></button>
                          <button className="p-3 bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all shadow-sm"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></button>
                          <div className="h-6 w-px bg-slate-100 mx-2"></div>
                          <label className="flex items-center space-x-2 cursor-pointer group">
                             <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                             <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-widest">存为记录模板</span>
                          </label>
                       </div>
                       <button className="px-12 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">发布</button>
                    </div>
                  </div>
               </div>

               {/* 列表区 */}
               <div className="space-y-6">
                  <div className="flex items-center px-4">
                     <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">沟通记录 (1)</h3>
                  </div>
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:border-indigo-200 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-10 -mr-12 -mt-12 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="relative flex justify-between items-start mb-8">
                        <div className="flex items-center space-x-5">
                           <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">陈</div>
                           <div>
                              <div className="flex items-center space-x-3">
                                 <span className="text-sm font-black text-slate-800">陈晓</span>
                                 <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase tracking-widest">打电话</span>
                              </div>
                              <p className="text-[11px] text-slate-400 font-mono mt-1 font-bold">2024-06-15 10:30</p>
                           </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">下次联系</span>
                           <span className="text-xs font-mono font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-xl ring-4 ring-rose-50/50">2024-06-18 09:00</span>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                           <div className="w-1 h-5 bg-indigo-500 rounded-full"></div>
                           <h4 className="text-sm font-black text-slate-800">合同条款确认</h4>
                        </div>
                        <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 italic text-slate-600 text-sm leading-relaxed font-medium">
                           “ 与李明（XX 智能科技）沟通合同采购清单细节，对方确认智能办公设备型号及数量无异议，约定 18 日签订合同 ”
                        </div>
                     </div>
                     <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex space-x-8">
                           <p>记录模板: <span className="text-indigo-600 ml-1">合同签约沟通</span></p>
                           <p>相关附件: <span className="text-slate-300 ml-1 italic">暂无附件</span></p>
                        </div>
                        <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                           <button className="text-indigo-600 hover:underline">编辑记录</button>
                           <button className="text-rose-500 hover:underline">删除记录</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === '详细信息' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
               <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">基本信息 (Basic Info)</h3>
                    </div>
                  </div>
                  <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20">
                     <DetailItem label="客户名称" value="众林卫浴有限公司" isBold />
                     <DetailItem label="客户电话" value="13727328733" isMono />
                     <DetailItem label="座机" value="--" isItalic />
                     <DetailItem label="所在地区" value="中国" />
                     <DetailItem label="客户来源" value="老客户介绍" />
                     <DetailItem label="客户官网" value="--" isItalic />
                     <DetailItem label="地址" value="--" isItalic />
                     <DetailItem label="备注" value="--" isItalic />
                     <DetailItem label="邮箱地址" value="--" isItalic />
                  </div>
               </section>

               <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/30 flex items-center space-x-3">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">系统信息 (System Meta)</h3>
                  </div>
                  <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12">
                     <DetailItem label="创建方式" value="新建" />
                     <DetailItem label="跟进人" value="--" isItalic />
                     <DetailItem label="跟进次数" value="5" isBadge />
                     <DetailItem label="意向产品" value="--" isItalic />
                     <DetailItem label="最近跟进时间" value="2026-01-09 17:10" isMono />
                     <DetailItem label="下次联系时间" value="--" isItalic />
                     <DetailItem label="首要联系人" value="王丽" />
                     <DetailItem label="客户成交状态" value="未成交" isBadge color="bg-slate-100 text-slate-500" />
                     <DetailItem label="负责人" value="王丽" isOwner />
                     <DetailItem label="负责人部门" value="全公司" />
                     <DetailItem label="创建时间" value="2026-01-09 17:10" isMono />
                     <DetailItem label="更新时间" value="2026-01-09 17:10" isMono />
                  </div>
               </section>
            </div>
          )}

          {activeTab === '企业信息' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex justify-between items-center px-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">企业官方档案 (Official Profile)</h3>
                  <button className="px-5 py-2 bg-white border border-slate-200 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">编辑企业信息</button>
               </div>
               <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr>
                           <th className="px-8 py-5">企业简称</th>
                           <th className="px-6 py-5">统一社会信用代码</th>
                           <th className="px-6 py-5">注册地址</th>
                           <th className="px-6 py-5">办公地址</th>
                           <th className="px-6 py-5 text-center">成立年限</th>
                           <th className="px-8 py-5 text-right">注册资本</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-6 text-sm font-black text-slate-800">众林外贸有限公司</td>
                           <td className="px-6 py-6 text-sm font-mono text-slate-500">231451235</td>
                           <td className="px-6 py-6 text-sm text-slate-600">北京菜市头</td>
                           <td className="px-6 py-6 text-sm text-slate-600">北京菜市头</td>
                           <td className="px-6 py-6 text-sm text-center font-bold text-slate-700">3年</td>
                           <td className="px-8 py-6 text-sm text-right font-black text-indigo-600">123万</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === '联系人' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex justify-between items-center px-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">关键联系人 (Key Contacts)</h3>
                  <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">添加联系人</button>
               </div>
               <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
                  <table className="min-w-full text-left">
                     <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr className="whitespace-nowrap">
                           <th className="px-8 py-5">姓名</th>
                           <th className="px-6 py-5">职务</th>
                           <th className="px-6 py-5">手机</th>
                           <th className="px-6 py-5">电子邮件</th>
                           <th className="px-6 py-5 text-center">尊称</th>
                           <th className="px-6 py-5">出生日期</th>
                           <th className="px-6 py-5">微信/QQ</th>
                           <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-8 py-6">
                              <p className="text-sm font-black text-slate-800">王丽</p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">众林卫浴有限公司</p>
                           </td>
                           <td className="px-6 py-6 text-xs font-bold text-slate-600">总经理</td>
                           <td className="px-6 py-6 text-sm font-mono font-black text-slate-700">15888737884</td>
                           <td className="px-6 py-6 text-xs text-indigo-600 underline">2438299617@qq.com</td>
                           <td className="px-6 py-6 text-xs text-center text-slate-500">先生</td>
                           <td className="px-6 py-6 text-xs font-mono text-slate-400">2025-12-30</td>
                           <td className="px-6 py-6">
                              <p className="text-xs text-slate-500"><span className="text-[9px] uppercase font-bold text-slate-300 mr-2">WX</span>驱蚊</p>
                              <p className="text-xs text-slate-500 mt-1"><span className="text-[9px] uppercase font-bold text-slate-300 mr-2">QQ</span>155888771447</p>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="p-2 text-slate-300 hover:text-indigo-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === '报价单' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex justify-between items-center px-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">报价单历史 (Quotations)</h3>
                  <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100">添加报价单</button>
               </div>
               <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
                  <table className="min-w-full text-left">
                     <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr>
                           <th className="px-8 py-5">报价名称</th>
                           <th className="px-6 py-5">报价单编号</th>
                           <th className="px-6 py-5 text-center">状态</th>
                           <th className="px-6 py-5 text-center">审核状态</th>
                           <th className="px-6 py-5 text-right">报价金额 (元)</th>
                           <th className="px-6 py-5">有效期至</th>
                           <th className="px-6 py-5">负责人</th>
                           <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-6 text-sm font-black text-slate-800">010 智能水龙头 20160112</td>
                           <td className="px-6 py-6 text-sm font-mono text-slate-500">BQ-2025-ZL-0001</td>
                           <td className="px-6 py-6 text-center">
                              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded uppercase tracking-tighter">跟进中</span>
                           </td>
                           <td className="px-6 py-6 text-center">
                              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase tracking-tighter">未审核</span>
                           </td>
                           <td className="px-6 py-6 text-sm text-right font-black text-slate-800">1,350,000.00</td>
                           <td className="px-6 py-6 text-xs font-mono text-slate-400">2025-02-01</td>
                           <td className="px-6 py-6 text-xs font-bold text-slate-600">王丽</td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="text-[10px] font-black text-indigo-600 hover:underline">编辑</button>
                                 <button className="text-[10px] font-black text-slate-400 hover:underline">查看</button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="px-10 py-5 bg-slate-100/50 rounded-2xl border border-slate-200 flex justify-end items-center space-x-12">
                   <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black text-slate-400 uppercase">报价单总数</span>
                      <span className="text-lg font-black text-slate-800">3</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black text-slate-400 uppercase">累计报价金额 (元)</span>
                      <span className="text-lg font-black text-indigo-600 font-mono">5,490,000.00</span>
                   </div>
               </div>
            </div>
          )}

          {activeTab === '合同' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex justify-between items-center px-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">销售合同明细 (Contracts)</h3>
                  <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100">添加销售合同</button>
               </div>
               <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
                  <table className="min-w-[1800px] text-left">
                     <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr className="whitespace-nowrap">
                           <th className="px-8 py-5">合同名称</th>
                           <th className="px-6 py-5">合同编号</th>
                           <th className="px-6 py-5">来源报价单</th>
                           <th className="px-6 py-5">签约时间</th>
                           <th className="px-6 py-5 text-right">合同金额 (元)</th>
                           <th className="px-6 py-5 text-center">合同状态</th>
                           <th className="px-6 py-5 text-center">审核状态</th>
                           <th className="px-6 py-5">已回/剩余 (元)</th>
                           <th className="px-6 py-5">负责人</th>
                           <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-6 text-sm font-black text-slate-800">2025年度众林采购合同</td>
                           <td className="px-6 py-6 text-sm font-mono text-indigo-600 font-black">HT-2025-ZL-0001</td>
                           <td className="px-6 py-6 text-xs text-slate-500 font-mono">BQ-2025-ZL-0001</td>
                           <td className="px-6 py-6 text-xs font-mono text-slate-400">2025-01-15</td>
                           <td className="px-6 py-6 text-sm text-right font-black text-slate-800 font-mono">1,323,000.00</td>
                           <td className="px-6 py-6 text-center">
                              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded uppercase tracking-tighter">执行中</span>
                           </td>
                           <td className="px-6 py-6 text-center">
                              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase tracking-tighter">已审核通过</span>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex flex-col text-[11px] font-black space-y-1">
                                 <span className="text-emerald-600 font-mono">已回: 661,500.00</span>
                                 <span className="text-rose-500 font-mono">剩: 661,500.00</span>
                              </div>
                           </td>
                           <td className="px-6 py-6 text-xs font-bold text-slate-600">王丽</td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="text-[11px] font-black text-indigo-600 hover:underline">查看详情</button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="px-10 py-5 bg-slate-900 rounded-3xl flex justify-between items-center text-white">
                   <div className="flex space-x-12">
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">合同总数</span>
                         <span className="text-lg font-black font-mono">3</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">累计合同金额 (元)</span>
                         <span className="text-lg font-black font-mono text-indigo-400">5,360,400.00</span>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">当前执行中金额</span>
                      <p className="text-2xl font-black font-mono text-emerald-400">4,537,400.00</p>
                   </div>
               </div>
            </div>
          )}

          {activeTab === '回款计划' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex justify-between items-center px-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">回款计划 (Payment Schedule)</h3>
               </div>
               <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                     <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr>
                           <th className="px-8 py-5">计划编号</th>
                           <th className="px-6 py-5">计划收款日期</th>
                           <th className="px-6 py-5 text-right">金额 (元)</th>
                           <th className="px-6 py-5">发票申请编号</th>
                           <th className="px-6 py-5">收款方式</th>
                           <th className="px-6 py-5 text-center">状态</th>
                           <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 font-medium">
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-6 text-sm font-mono text-slate-500">HKJH-2024-0086-01</td>
                           <td className="px-6 py-6 text-sm font-mono text-slate-700">2024-06-20</td>
                           <td className="px-6 py-6 text-sm text-right font-black text-slate-800 font-mono">643,250.00</td>
                           <td className="px-6 py-6 text-xs text-slate-400 font-mono underline">FP-2024-0086-01</td>
                           <td className="px-6 py-6 text-xs text-slate-600">银行转账</td>
                           <td className="px-6 py-6 text-center">
                              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">已收款</span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="text-slate-300 hover:text-indigo-600 transition-colors"><svg className="w-5 h-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === '发票' && (
            <div className="space-y-10 animate-in fade-in duration-300">
               {/* 开票记录 */}
               <section className="space-y-6">
                  <div className="flex justify-between items-center px-4">
                     <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">开票明细记录 (Invoice Records)</h3>
                     <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">添加开票记录</button>
                  </div>
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
                     <table className="min-w-[1600px] text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                           <tr>
                              <th className="px-8 py-5">发票编号</th>
                              <th className="px-6 py-5">抬头类型</th>
                              <th className="px-6 py-5">开票抬头</th>
                              <th className="px-6 py-5">纳税识别号</th>
                              <th className="px-6 py-5 text-center">状态</th>
                              <th className="px-6 py-5">开票时间</th>
                              <th className="px-6 py-5 text-right">金额 (元)</th>
                              <th className="px-8 py-5 text-right">操作</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           <tr className="hover:bg-slate-50/50 transition-colors group">
                              <td className="px-8 py-6 text-sm font-mono text-indigo-600 font-bold">FP-2025-ZL-0001</td>
                              <td className="px-6 py-6 text-xs text-slate-500">企业抬头</td>
                              <td className="px-6 py-6 text-sm font-bold text-slate-700">众林配件有限公司</td>
                              <td className="px-6 py-6 text-xs font-mono text-slate-400">91310105MA1G8F3X7C</td>
                              <td className="px-6 py-6 text-center">
                                 <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">已开具</span>
                              </td>
                              <td className="px-6 py-6 text-xs font-mono text-slate-400">2025-01-16</td>
                              <td className="px-6 py-6 text-sm text-right font-black text-slate-800 font-mono">1,323,000.00</td>
                              <td className="px-8 py-6 text-right whitespace-nowrap">
                                 <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-[10px] font-black text-indigo-600 hover:underline">下载</button>
                                    <button className="text-[10px] font-black text-rose-500 hover:underline">作废</button>
                                 </div>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <div className="px-10 py-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex justify-between items-center text-indigo-700">
                     <div className="flex space-x-12">
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-indigo-400 uppercase">开票总数</span>
                           <span className="text-lg font-black font-mono">4</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-indigo-400 uppercase">已开具总金额</span>
                           <span className="text-lg font-black font-mono">5,360,400.00</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-[9px] font-black text-indigo-400 uppercase">待开具金额预估</span>
                        <p className="text-xl font-black font-mono text-indigo-600">450,000.00</p>
                     </div>
                  </div>
               </section>
            </div>
          )}

          {activeTab === '附件' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex justify-between items-center px-4">
                  <div className="space-y-1">
                     <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">文档附件 (Attachments)</h3>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">点击标题可预览文档内容</p>
                  </div>
                  <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center space-x-2">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4-4m4 4v12" /></svg>
                     <span>上传</span>
                  </button>
               </div>
               <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
                  <table className="min-w-full text-left">
                     <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr>
                           <th className="px-8 py-5">附件名称</th>
                           <th className="px-6 py-5">关联业务</th>
                           <th className="px-6 py-5">上传人</th>
                           <th className="px-6 py-5">上传时间</th>
                           <th className="px-6 py-5">文件大小</th>
                           <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex items-center space-x-3">
                                 <div className="bg-rose-50 p-2 rounded-lg">
                                    <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                 </div>
                                 <span className="text-sm font-black text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer">跨境电汇凭证截图.png</span>
                              </div>
                           </td>
                           <td className="px-6 py-6 text-xs font-bold text-slate-400">回款单 (HKD-2024-ZL-0001)</td>
                           <td className="px-6 py-6 text-xs font-bold text-slate-600">吴敏</td>
                           <td className="px-6 py-6 text-xs font-mono text-slate-400">2024-08-08 16:00:11</td>
                           <td className="px-6 py-6 text-xs font-black text-slate-400">520KB</td>
                           <td className="px-8 py-6 text-right whitespace-nowrap">
                              <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                                 <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest">预览</button>
                                 <button className="text-[10px] font-black text-slate-400 hover:underline uppercase tracking-widest">下载</button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="px-10 py-5 bg-slate-900 rounded-[2rem] flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <div className="flex space-x-10">
                     <span>附件总数: <span className="text-white ml-1">6</span></span>
                     <span>累计文件大小: <span className="text-indigo-400 ml-1">7.16MB</span></span>
                  </div>
                  <div className="flex space-x-10">
                     <span>图片类: <span className="text-white ml-1">2 个</span></span>
                     <span>文档类: <span className="text-white ml-1">4 个</span></span>
                  </div>
               </div>
            </div>
          )}

          {activeTab === '操作记录' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="flex items-center space-x-3 px-4">
                  {["全部", "操作记录", "跟进记录"].map(chip => (
                    <button key={chip} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${chip === '全部' ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' : 'bg-white text-slate-400 hover:bg-slate-100'}`}>{chip}</button>
                  ))}
               </div>
               <div className="relative space-y-2 ml-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                  {[
                    { time: "01月09日 17:10", user: "林瑞敏", action: "添加 客户", detail: "执行系统首单录入" },
                    { time: "01月09日 17:05", user: "系统", action: "同步 企业信息", detail: "匹配企查查官方档案" },
                  ].map((log, i) => (
                    <div key={i} className="relative flex items-center space-x-8 group pb-8">
                       <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white border-2 border-slate-200 shrink-0 z-10 group-hover:border-indigo-600 transition-all">
                          <div className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300'}`}></div>
                       </div>
                       <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-200 group-hover:border-indigo-100 group-hover:shadow-md transition-all flex items-center justify-between">
                          <div className="space-y-1">
                             <div className="flex items-center space-x-3">
                                <p className="text-sm font-black text-slate-800">{log.action}</p>
                                <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-bold rounded uppercase tracking-tighter">{log.detail}</span>
                             </div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.time}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                             <p className="text-xs font-black text-slate-600">{log.user}</p>
                             <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">{log.user.charAt(0)}</div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="text-center py-12">
                  <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.4em]">已经到底了 / BOTTOM REACHED</p>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* 底部悬浮操作栏 */}
      <footer className="bg-white border-t border-slate-200 px-10 py-6 flex justify-between items-center shrink-0 shadow-inner z-50">
        <div className="flex items-center space-x-12">
           <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">当前客户池</span>
              <span className="text-xs font-black text-slate-800">上海公海池 / 待分配资产</span>
           </div>
           <div className="h-8 w-px bg-slate-100"></div>
           <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Live Status: Monitoring</span>
           </div>
        </div>
        <div className="flex items-center space-x-4">
           <button 
             onClick={onClose}
             className="px-12 py-3 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
           >
             关闭详情
           </button>
        </div>
      </footer>
    </div>
  );
};

const DetailItem: React.FC<{ 
  label: string; 
  value: string; 
  isMono?: boolean; 
  isBold?: boolean; 
  required?: boolean;
  isTextArea?: boolean;
  isItalic?: boolean;
  color?: string;
  isBadge?: boolean;
  isOwner?: boolean;
}> = ({ label, value, isMono, isBold, required, isTextArea, isItalic, color, isBadge, isOwner }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center">
      {label}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
    <div className="flex items-center min-w-0">
      {isOwner && <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white font-black mr-2">王</div>}
      <div className={`text-sm truncate ${color || 'text-slate-800'} ${isBold ? 'font-black' : 'font-bold'} ${isMono ? 'font-mono' : ''} ${isItalic ? 'italic text-slate-300' : ''} ${isBadge ? 'px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-black uppercase tracking-tighter' : ''} ${isTextArea ? 'bg-slate-50/50 p-4 rounded-2xl border border-slate-100 leading-relaxed' : ''}`}>
        {value || '--'}
      </div>
    </div>
  </div>
);
