
import React, { useState } from 'react';

interface CRMLeadDetailProps {
  leadId: string;
  onClose: () => void;
}

export const CRMLeadDetail: React.FC<CRMLeadDetailProps> = ({ leadId, onClose }) => {
  const [activeTab, setActiveTab] = useState('沟通记录');

  const tabs = ["沟通记录", "详细信息", "企业信息", "附件", "操作记录"];

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* 顶部基础信息栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">众达卫浴有限公司</h1>
            <div className="flex items-center space-x-4 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>创建时间: 2020-05-25 14:40</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>最近更新: 2020-06-02 09:50</span>
            </div>
          </div>
          <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
          <div className="hidden md:flex space-x-8">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">线索名称</p>
              <p className="text-sm font-bold text-slate-700">众达卫浴有限公司</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">联系人</p>
              <p className="text-sm font-bold text-slate-700">楼经理</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">线索来源</p>
              <p className="text-sm font-bold text-slate-700">其它</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">编辑</button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">转为客户</button>
          <div className="relative group">
            <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold flex items-center space-x-2">
              <span>操作</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8">
          
          {activeTab === '沟通记录' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* 沟通记录发布区 */}
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">沟通类型</span>
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none">
                      <option>请选择</option>
                      <option>打电话</option>
                      <option>见面沟通</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 border-l border-slate-200 pl-4 ml-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">下次联系时间</span>
                    <input type="datetime-local" className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none" />
                  </div>
                  <div className="flex-1"></div>
                  <div className="flex items-center space-x-3">
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-500 outline-none">
                      <option>选择销售记录模板</option>
                    </select>
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <textarea 
                    className="w-full min-h-[120px] bg-slate-50 rounded-2xl p-6 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none border border-slate-100"
                    placeholder="发布一条销售记录(使用ctrl+v可直接粘贴图片)..."
                  ></textarea>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </button>
                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">存为记录模板</span>
                      </label>
                    </div>
                    <button className="px-10 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
                      发布
                    </button>
                  </div>
                </div>
              </div>

              {/* 沟通记录列表区 */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">沟通记录 (1)</h3>
                </div>
                
                <div className="bg-white rounded-3xl border border-slate-200 p-8 hover:border-indigo-200 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-100">陈</div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-black text-slate-800 uppercase">陈晓</span>
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase tracking-widest">打电话</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono mt-1">2024-06-15 10:30</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">下次联系</span>
                      <span className="text-xs font-mono font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">2024-06-18 09:00</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                       <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                       <h4 className="text-sm font-black text-slate-800">合同条款确认</h4>
                    </div>
                    <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                      与李明（XX 智能科技）沟通合同采购清单细节，对方确认智能办公设备型号及数量无异议，约定 18 日签订合同
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center space-x-6">
                       <span>记录模板: <span className="text-slate-600">合同签约沟通</span></span>
                       <span>附件: <span className="text-slate-300">--</span></span>
                    </div>
                    <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="text-indigo-600 hover:underline">编辑</button>
                       <button className="text-rose-500 hover:underline">删除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === '详细信息' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              {/* 基本信息区块 */}
              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/30 flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">基本信息</h3>
                </div>
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-20">
                  {[
                    { label: "线索名称", value: "众达卫浴有限公司", isBold: true },
                    { label: "联系人", value: "楼经理" },
                    { label: "所在地区", value: "中国" },
                    { label: "跟进次数", value: "5", isBadge: true },
                    { label: "线索来源", value: "其它" },
                    { label: "联系电话", value: "13462589965", isMono: true },
                    { label: "座机", value: "--" },
                    { label: "邮箱", value: "--" },
                    { label: "尊称", value: "先生" },
                    { label: "负责人", value: "王丽", isOwner: true },
                    { label: "地址", value: "河南省,周口市" },
                    { label: "备注", value: "--", isItalic: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col space-y-1.5 min-w-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{item.label}</span>
                      <div className="flex items-center min-w-0">
                        {item.isOwner && <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white font-black mr-2">王</div>}
                        <span className={`text-sm truncate ${item.isBold ? 'font-black text-slate-800' : 'font-bold text-slate-600'} ${item.isMono ? 'font-mono tracking-tight' : ''} ${item.isItalic ? 'italic text-slate-300' : ''}`}>
                          {item.value}
                        </span>
                        {item.isBadge && <span className="ml-2 px-1.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded">{item.value}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 系统信息区块 */}
              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/30 flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">系统信息</h3>
                </div>
                <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                  {[
                    { label: "下次跟进时间", value: "2020-05-25 14:40" },
                    { label: "下次联系时间", value: "--" },
                    { label: "负责人部门", value: "全公司" },
                    { label: "创建时间", value: "2020-05-25 14:40" },
                    { label: "最近更新时间", value: "2020-06-02 09:50" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col space-y-1.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{item.label}</span>
                      <span className="text-sm font-bold text-slate-500 font-mono tracking-tight">{item.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === '企业信息' && (
            <div className="animate-in fade-in duration-500">
               <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                      { label: "企业简称", value: "众林外贸有限公司", isBold: true },
                      { label: "统一社会信用代码", value: "231451235", isMono: true },
                      { label: "注册地址", value: "北京菜市头" },
                      { label: "办公地址", value: "北京菜市头" },
                      { label: "成立年限", value: "3年" },
                      { label: "注册资本", value: "123万", isCurrency: true },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                        <p className={`text-sm ${item.isBold ? 'font-black text-slate-900' : 'font-bold text-slate-600'} ${item.isMono ? 'font-mono' : ''}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 p-8 bg-indigo-50/50 rounded-3xl border border-dashed border-indigo-100 flex items-center justify-between">
                     <div className="flex items-center space-x-4 text-indigo-600">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-sm font-bold">该企业信息已与“企查查”实时同步，确保背景合规。</p>
                     </div>
                     <button className="text-xs font-black text-indigo-600 uppercase underline decoration-2 underline-offset-4">查看完整报告</button>
                  </div>
               </div>
            </div>
          )}

          {activeTab === '附件' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center">
                    附件
                    <span className="ml-2 text-slate-400 font-medium normal-case tracking-normal">（点击标题可预览）</span>
                  </h3>
                </div>
                <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4-4m4 4v12" /></svg>
                  <span>上传附件</span>
                </button>
              </div>

              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-8 py-5">附件名称</th>
                      <th className="px-4 py-5">上传人</th>
                      <th className="px-4 py-5">上传时间</th>
                      <th className="px-4 py-5">文件大小</th>
                      <th className="px-4 py-5">关联业务</th>
                      <th className="px-4 py-5">文件类型</th>
                      <th className="px-8 py-5 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-indigo-50/20 transition-colors group">
                      <td className="px-8 py-5">
                         <div className="flex items-center space-x-3">
                            <div className="bg-rose-50 p-2 rounded-lg">
                               <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors cursor-pointer">跨境电汇凭证截图.png</span>
                         </div>
                      </td>
                      <td className="px-4 py-5 text-xs font-bold text-slate-600">吴敏</td>
                      <td className="px-4 py-5 text-xs font-mono text-slate-400">2024-08-08 16:00:11</td>
                      <td className="px-4 py-5 text-xs font-bold text-slate-500">520KB</td>
                      <td className="px-4 py-5 text-xs text-slate-400">回款单（HKD-2024-ZL-0001）</td>
                      <td className="px-4 py-5">
                         <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase tracking-tighter">图片</span>
                      </td>
                      <td className="px-8 py-5 text-right whitespace-nowrap">
                         <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="text-[11px] font-black text-indigo-600 hover:underline uppercase">预览</button>
                            <button className="text-[11px] font-black text-slate-400 hover:underline uppercase">下载</button>
                            <button className="text-[11px] font-black text-rose-500 hover:underline uppercase">删除</button>
                         </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between px-6 py-4 bg-slate-100/50 rounded-2xl border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <div className="flex space-x-6">
                    <span>附件总数: <span className="text-slate-800 font-bold ml-1">6</span></span>
                    <span>累计文件大小: <span className="text-slate-800 font-bold ml-1">7.16MB</span></span>
                 </div>
                 <div className="flex space-x-6">
                    <span>图片类: <span className="text-slate-800 font-bold ml-1">2 个</span></span>
                    <span>文档类: <span className="text-slate-800 font-bold ml-1">4 个</span></span>
                 </div>
              </div>
            </div>
          )}

          {activeTab === '操作记录' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div className="flex items-center justify-between px-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">全量操作审计</h3>
               </div>
               
               <div className="relative space-y-1 ml-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                 {[
                   { time: "2020年06月02日 09:50", user: "王丽", action: "编辑 线索" },
                   { time: "2020年05月25日 14:40", user: "王丽", action: "添加 线索" },
                 ].map((log, i) => (
                   <div key={i} className="relative flex items-center space-x-8 group pb-8">
                     <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white border-2 border-slate-200 shrink-0 z-10 group-hover:border-indigo-500 transition-all">
                        <div className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300'}`}></div>
                     </div>
                     <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 group-hover:border-indigo-100 group-hover:shadow-md transition-all flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-sm font-bold text-slate-700">{log.action}</p>
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{log.time}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                           <div className="text-right">
                              <p className="text-xs font-black text-slate-800">{log.user}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase">操作人</p>
                           </div>
                           <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-black">
                              {log.user.charAt(0)}
                           </div>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="text-center py-12">
                  <p className="text-xs font-black text-slate-300 uppercase tracking-[0.3em]">已走到底了 / BOTTOM REACHED</p>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* 底部悬浮操作栏 */}
      <footer className="bg-white border-t border-slate-200 px-8 py-5 flex justify-between items-center shrink-0 shadow-inner z-40">
        <div className="flex items-center space-x-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <div className="flex items-center space-x-2">
              <span>线索阶段:</span>
              <span className="text-indigo-600 font-black bg-indigo-50 px-2 py-0.5 rounded">潜在意向</span>
           </div>
           <div className="flex items-center space-x-2 border-l border-slate-100 pl-6">
              <span>重要程度:</span>
              <div className="flex space-x-0.5 text-amber-400">
                 {[1, 2, 3].map(i => <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
           </div>
        </div>
        <div className="flex items-center space-x-4">
           <span className="text-[10px] font-black text-slate-300 uppercase italic">© Sensor ERP v3.1 CRM Module</span>
           <button 
             onClick={onClose}
             className="px-8 py-2.5 bg-slate-100 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all uppercase tracking-widest"
           >
             关闭详情
           </button>
        </div>
      </footer>
    </div>
  );
};
