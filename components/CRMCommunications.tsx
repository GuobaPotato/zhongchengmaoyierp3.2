
import React, { useState } from 'react';

interface CommunicationRecord {
  id: string;
  type: string;
  content: string;
  module: string;
  name: string;
  createTime: string;
  creator: string;
  source: string;
  nextContact: string;
}

const MOCK_RECORDS: CommunicationRecord[] = [
  {
    id: "R1",
    type: "电话沟通",
    content: "客户咨询产品价格及交付周期，已详细解答，客户表示考虑后回复",
    module: "销售管理",
    name: "张三",
    createTime: "2024-05-20 14:30:00",
    creator: "李四",
    source: "手动添加",
    nextContact: "2024-05-23 10:00:00"
  }
];

export const CRMCommunications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const tabs = ["全部", "我添加的", "下属添加的"];

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-20">
      {/* 顶部标题栏 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto scrollbar-hide shrink-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all whitespace-nowrap uppercase tracking-widest ${
                activeTab === tab 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-3 shrink-0">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
            <span>操作</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </div>

      {/* 筛选区域 */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-shadow-sm">客户 (Customer)</label>
            <select 
              value={customerFilter}
              onChange={e => setCustomerFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">全部客户</option>
              <option value="众达卫浴">众达卫浴</option>
              <option value="恒洁制造">恒洁制造</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-shadow-sm">沟通类型 (Type)</label>
            <select 
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">请选择沟通类型</option>
              <option value="电话沟通">电话沟通</option>
              <option value="邮件联系">邮件联系</option>
              <option value="见面拜访">见面拜访</option>
              <option value="微信记录">微信记录</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-shadow-sm">部门/下属 (Org)</label>
            <select 
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">选择部门或下属</option>
              <option value="销售一部">销售一部</option>
              <option value="外贸团队">外贸团队</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-shadow-sm">日期区间 (Period)</label>
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={dateRange.start}
                onChange={e => setDateRange({...dateRange, start: e.target.value})}
              />
              <span className="text-slate-400 text-xs font-black">-</span>
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={dateRange.end}
                onChange={e => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-shadow-sm">搜索内容 (Keywords)</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索关键词"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* 表格容器 */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <table className="min-w-[1200px] text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                <th className="px-8 py-5">沟通类型</th>
                <th className="px-4 py-5 max-w-md">内容</th>
                <th className="px-4 py-5">相关模块</th>
                <th className="px-4 py-5">名称</th>
                <th className="px-4 py-5">创建时间</th>
                <th className="px-4 py-5">创建人</th>
                <th className="px-4 py-5">来源</th>
                <th className="px-8 py-5">下次联系时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_RECORDS.map((record) => (
                <tr key={record.id} className="hover:bg-indigo-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                       <div className={`w-2 h-2 rounded-full ${record.type === '电话沟通' ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`}></div>
                       <span className="text-[13px] font-black text-slate-800 uppercase tracking-tighter">{record.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6">
                    <p className="text-[13px] font-medium text-slate-600 leading-relaxed max-w-md truncate group-hover:whitespace-normal group-hover:bg-white group-hover:shadow-sm group-hover:rounded-lg group-hover:p-2 group-hover:z-50 group-hover:relative transition-all" title={record.content}>
                      {record.content}
                    </p>
                  </td>
                  <td className="px-4 py-6">
                     <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-lg uppercase tracking-widest border border-indigo-100">
                       {record.module}
                     </span>
                  </td>
                  <td className="px-4 py-6 text-[13px] font-bold text-slate-700">{record.name}</td>
                  <td className="px-4 py-6 text-[11px] font-mono text-slate-400 font-bold tracking-tight">{record.createTime}</td>
                  <td className="px-4 py-6">
                     <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-white font-black">{record.creator.charAt(0)}</div>
                        <span className="text-[13px] font-black text-slate-800">{record.creator}</span>
                     </div>
                  </td>
                  <td className="px-4 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">{record.source}</td>
                  <td className="px-8 py-6">
                    <span className="text-[12px] font-mono font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-xl ring-2 ring-rose-50">
                      {record.nextContact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页区域 */}
        <div className="px-10 py-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div className="flex items-center space-x-8">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              共 <span className="text-slate-800 text-sm">1</span> 条记录
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-2">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页显示:</span>
               <span className="text-xs font-black text-slate-700 px-3 py-1 bg-white rounded-lg border border-slate-200">20条/页</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">前往:</span>
              <input 
                type="number" 
                defaultValue={1} 
                className="w-16 bg-white border border-slate-200 rounded-xl py-2 text-xs text-center font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" 
              />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
