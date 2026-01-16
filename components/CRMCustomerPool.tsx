
import React, { useState } from 'react';
import { CRMCustomerDetail } from './CRMCustomerDetail';

interface CustomerPoolItem {
  id: string;
  name: string;
  region: string;
  phone: string;
  followCount: string;
  intendedProduct: string;
  landline: string;
  website: string;
  address: string;
  remark: string;
  email: string;
  primaryContact: string;
  dealStatus: string;
  owner: string;
  ownerDept: string;
}

const MOCK_POOL_DATA: CustomerPoolItem[] = [
  {
    id: "P1",
    name: "王林",
    region: "中国",
    phone: "13727328733",
    followCount: "5",
    intendedProduct: "感应水龙头",
    landline: "021-58889999",
    website: "www.wanglin-tech.com",
    address: "上海市浦东新区张江高科技园区",
    remark: "老客户介绍，意向采购感应水龙头",
    email: "wanglin@tech.com",
    primaryContact: "王丽",
    dealStatus: "未成交",
    owner: "王丽",
    ownerDept: "全公司",
  }
];

export const CRMCustomerPool: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [viewingCustomerName, setViewingCustomerName] = useState<string | null>(null);

  const tabs = [
    "全部", "我负责的", "下属负责的", "今日待跟进", 
    "今日已联系客户", "跟进人", "从未跟进的", "从未添加沟通记录"
  ];

  if (viewingCustomerName) {
    return <CRMCustomerDetail customerName={viewingCustomerName} onClose={() => setViewingCustomerName(null)} />;
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === MOCK_POOL_DATA.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(MOCK_POOL_DATA.map(c => c.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-20">
      {/* 顶部标签与功能按钮 */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto scrollbar-hide shrink-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs font-black rounded-xl transition-all whitespace-nowrap uppercase tracking-widest ${
                activeTab === tab 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <div className="relative group px-3 py-2 cursor-pointer">
            <span className="text-indigo-600 text-xs font-black">自定义场景</span>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 p-2">
               {["添加场景", "管理场景"].map(s => (
                 <button key={s} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">{s}</button>
               ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 shrink-0">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-xl shadow-indigo-100 active:scale-95">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span>添加客户</span>
          </button>
          <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            <span>导出</span>
          </button>
        </div>
      </div>

      {/* 筛选搜索区 */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">地区筛选</label>
            <select 
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">全部地区</option>
              <option value="中国">中国</option>
              <option value="东南亚">东南亚</option>
              <option value="欧美">欧美</option>
            </select>
          </div>

          <div className="space-y-1.5 lg:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">创建时间</label>
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                value={dateRange.start}
                onChange={e => setDateRange({...dateRange, start: e.target.value})}
              />
              <span className="text-slate-400 text-[10px] font-black">至</span>
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                value={dateRange.end}
                onChange={e => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">负责人</label>
            <select 
              value={ownerFilter}
              onChange={e => setOwnerFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">请选择负责人</option>
              <option value="李销售">李销售</option>
              <option value="王销售">王销售</option>
            </select>
          </div>

          <div className="space-y-1.5 lg:col-span-1 xl:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">关键词检索</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索客户名称或手机号"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* 表格数据区 */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <table className="min-w-[2800px] text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                <th className="px-6 py-5 w-12 text-center sticky left-0 bg-slate-50 z-30 border-r border-slate-100">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                    checked={MOCK_POOL_DATA.length > 0 && selectedIds.size === MOCK_POOL_DATA.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-5 sticky left-12 bg-slate-50 z-30 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100 min-w-[240px]">客户名称</th>
                <th className="px-4 py-5">所在地区</th>
                <th className="px-4 py-5 font-mono">客户电话</th>
                <th className="px-4 py-5 text-center">跟进次数</th>
                <th className="px-4 py-5">意向产品</th>
                <th className="px-4 py-5 font-mono">座机</th>
                <th className="px-4 py-5">客户官网</th>
                <th className="px-4 py-5">地址</th>
                <th className="px-4 py-5">邮箱地址</th>
                <th className="px-4 py-5">首要联系人</th>
                <th className="px-4 py-5 text-center">成交状态</th>
                <th className="px-4 py-5">负责人</th>
                <th className="px-4 py-5">负责人部门</th>
                <th className="px-8 py-5">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_POOL_DATA.map((cust) => (
                <tr key={cust.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-5 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">
                    <input 
                      type="checkbox" 
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                      checked={selectedIds.has(cust.id)}
                      onChange={() => toggleSelect(cust.id)}
                    />
                  </td>
                  <td className="px-6 py-5 sticky left-12 bg-white group-hover:bg-slate-50 z-10 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100">
                    <span 
                      onClick={() => setViewingCustomerName(cust.name)}
                      className="text-[13px] font-black text-slate-800 hover:text-indigo-600 cursor-pointer underline decoration-indigo-100 underline-offset-4 decoration-2"
                    >
                      {cust.name}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-[13px] text-slate-500">{cust.region}</td>
                  <td className="px-4 py-5 text-[13px] font-mono text-slate-600">{cust.phone}</td>
                  <td className="px-4 py-5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 font-black text-[11px] border border-indigo-100">{cust.followCount}</span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black border border-amber-100 uppercase">{cust.intendedProduct}</span>
                  </td>
                  <td className="px-4 py-5 text-[13px] font-mono text-slate-400">{cust.landline}</td>
                  <td className="px-4 py-5 text-[13px] text-indigo-600 underline decoration-indigo-100 cursor-pointer">{cust.website}</td>
                  <td className="px-4 py-5 text-[13px] text-slate-500 max-w-sm truncate">{cust.address}</td>
                  <td className="px-4 py-5 text-[13px] text-slate-500 italic">{cust.email}</td>
                  <td className="px-4 py-5 text-[13px] font-bold text-slate-700">{cust.primaryContact}</td>
                  <td className="px-4 py-5 text-center">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                       cust.dealStatus === '未成交' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-700'
                     }`}>
                       {cust.dealStatus}
                     </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-white font-black">{cust.owner.charAt(0)}</div>
                      <span className="text-[13px] font-black text-slate-800">{cust.owner}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-tighter">{cust.ownerDept}</td>
                  <td className="px-8 py-5 text-[13px] text-slate-400 italic max-w-md truncate" title={cust.remark}>{cust.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 底部批量操作与分页 */}
        <div className="px-10 py-6 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6 bg-slate-50/50 shrink-0">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">公海批量操作:</span>
              <div className="flex space-x-2">
                <button 
                  disabled={selectedIds.size === 0}
                  className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    selectedIds.size > 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  领取到客户
                </button>
                <button 
                  disabled={selectedIds.size === 0}
                  className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                    selectedIds.size > 0 ? 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 active:scale-95' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  分配到客户
                </button>
              </div>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {MOCK_POOL_DATA.length > 0 ? `共 ${MOCK_POOL_DATA.length} 条数据 | 20条/页` : '暂无数据'}
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
