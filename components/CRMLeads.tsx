
import React, { useState } from 'react';
import { CRMLeadDetail } from './CRMLeadDetail';

interface LeadItem {
  id: string;
  name: string;
  contact: string;
  region: string;
  honorific: string;
  source: string;
  phone: string;
  followCount: string;
  follower: string;
  totalDuration: string;
  intendedProduct: string;
  landline: string;
  email: string;
  owner: string;
  address: string;
  remark: string;
  lastUpdated: string;
  nextFollowUp: string;
  ownerDept: string;
  createdAt: string;
}

const MOCK_LEADS: LeadItem[] = [
  {
    id: "1",
    name: "广东恒洁水龙头制造有限公司",
    contact: "楼经理",
    region: "中国",
    honorific: "先生",
    source: "行业展会",
    phone: "13462589965",
    followCount: "5",
    follower: "李销售、王技术",
    totalDuration: "80分钟",
    intendedProduct: "大便器",
    landline: "020-86543210",
    email: "loujingli@hengjiesp.com",
    owner: "李销售",
    address: "广东省佛山市顺德区厨卫产业园",
    remark: "需推荐水流传感器方案",
    lastUpdated: "2026-01-05 14:30",
    nextFollowUp: "2026-01-10 09:00",
    ownerDept: "华南销售部",
    createdAt: "2025-12-20 16:45",
  },
  {
    id: "2",
    name: "浙江箭牌马桶科技有限公司",
    contact: "胡塞尔",
    region: "中国",
    honorific: "女士",
    source: "电话销售",
    phone: "17756998798",
    followCount: "5",
    follower: "李销售、王技术",
    totalDuration: "80分钟",
    intendedProduct: "大便器",
    landline: "0571-78901234",
    email: "huser@arrowtoilet.com",
    owner: "王销售",
    address: "浙江省杭州市余杭区智能卫浴园",
    remark: "关注智能感应马桶的传感器需求",
    lastUpdated: "2026-01-04 10:15",
    nextFollowUp: "2026-01-08 15:00",
    ownerDept: "华东销售部",
    createdAt: "2025-12-22 09:20",
  },
  {
    id: "3",
    name: "深圳环球厨卫外贸有限公司",
    contact: "张经理",
    region: "中国",
    honorific: "先生",
    source: "网站咨询",
    phone: "15226555665",
    followCount: "5",
    follower: "李销售、王技术",
    totalDuration: "80分钟",
    intendedProduct: "大便器",
    landline: "0755-23456789",
    email: "zhangjingli@globalkitchen.com",
    owner: "赵销售",
    address: "广东省深圳市南山区外贸出口大厦",
    remark: "需提供传感器出口认证资料",
    lastUpdated: "2026-01-06 09:20",
    nextFollowUp: "2026-01-09 11:00",
    ownerDept: "外贸销售部",
    createdAt: "2025-12-25 11:30",
  },
  {
    id: "4",
    name: "江苏苏泊尔百货分销有限公司",
    contact: "杜经理",
    region: "中国",
    honorific: "先生",
    source: "电话销售",
    phone: "13636366989",
    followCount: "5",
    follower: "李销售、王技术",
    totalDuration: "80分钟",
    intendedProduct: "大便器",
    landline: "025-56789012",
    email: "dujingli@supor-dist.com",
    owner: "孙销售",
    address: "江苏省南京市鼓楼区商贸分销中心",
    remark: "初步沟通过智能家电传感器需求",
    lastUpdated: "2026-01-03 16:20",
    nextFollowUp: "2026-01-12 14:00",
    ownerDept: "华中销售部",
    createdAt: "2025-12-28 08:50",
  },
  {
    id: "5",
    name: "福建九牧水龙头产业园",
    contact: "范晓云",
    region: "中国",
    honorific: "女士",
    source: "网站咨询",
    phone: "18100622625",
    followCount: "5",
    follower: "李销售、王技术",
    totalDuration: "80分钟",
    intendedProduct: "大便器",
    landline: "0595-89012345",
    email: "fanxiaoyun@jomoo-water.com",
    owner: "李销售",
    address: "福建省泉州市南安市九牧工业园",
    remark: "需上门演示水流传感器样品",
    lastUpdated: "2026-01-05 16:40",
    nextFollowUp: "2026-01-09 14:30",
    ownerDept: "华南销售部",
    createdAt: "2025-12-30 15:20",
  },
  {
    id: "6",
    name: "上海科勒马桶设备有限公司",
    contact: "王先生",
    region: "中国",
    honorific: "先生",
    source: "电话销售",
    phone: "13633668968",
    followCount: "5",
    follower: "李销售、王技术",
    totalDuration: "80分钟",
    intendedProduct: "大便器",
    landline: "021-34567890",
    email: "wangxiansheng@kohler-toilet.com",
    owner: "王销售",
    address: "上海市青浦区智能卫浴设备园",
    remark: "需提供马桶感应传感器的报价单",
    lastUpdated: "2026-01-04 15:50",
    nextFollowUp: "2026-01-07 10:00",
    ownerDept: "华东销售部",
    createdAt: "2026-01-02 11:10",
  },
  {
    id: "7",
    name: "北京物美百货供应链有限公司",
    contact: "张生",
    region: "中国",
    honorific: "先生",
    source: "电话销售",
    phone: "17854665236",
    followCount: "5",
    follower: "李销售、王技术",
    totalDuration: "80分钟",
    intendedProduct: "大便器",
    landline: "010-67890123",
    email: "zhangsheng@wumart-supply.com",
    owner: "刘销售",
    address: "北京市朝阳区供应链产业园",
    remark: "需跟进其合作品牌的传感器采购计划",
    lastUpdated: "2026-01-03 09:40",
    nextFollowUp: "2026-01-11 16:00",
    ownerDept: "华北销售部",
    createdAt: "2026-01-03 09:40",
  }
];

export const CRMLeads: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [viewingLeadId, setViewingLeadId] = useState<string | null>(null);

  const tabs = ["全部", "我负责的", "下属负责的", "今日待跟进", "今日已联系", "从未跟进"];

  if (viewingLeadId) {
    return <CRMLeadDetail leadId={viewingLeadId} onClose={() => setViewingLeadId(null)} />;
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === MOCK_LEADS.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(MOCK_LEADS.map(l => l.id)));
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
      {/* Top Tab & Action Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex space-x-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto scrollbar-hide shrink-0">
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
        </div>
        
        <div className="flex items-center space-x-3 shrink-0">
          <button className="px-5 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-xl shadow-indigo-100 active:scale-95">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span>添加线索</span>
          </button>
          <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            <span>导出</span>
          </button>
        </div>
      </div>

      {/* Filter Area */}
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
              <span className="text-slate-400 text-[10px] font-black uppercase">至</span>
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                value={dateRange.end}
                onChange={e => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">负责人筛选</label>
            <select 
              value={ownerFilter}
              onChange={e => setOwnerFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">选择负责人</option>
              <option value="李销售">李销售</option>
              <option value="王销售">王销售</option>
              <option value="赵销售">赵销售</option>
            </select>
          </div>

          <div className="space-y-1.5 lg:col-span-1 xl:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">快速检索</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索线索名称或手机号"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <table className="min-w-[2800px] text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                <th className="px-6 py-5 w-12 text-center sticky left-0 bg-slate-50 z-20 border-r border-slate-100">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                    checked={MOCK_LEADS.length > 0 && selectedIds.size === MOCK_LEADS.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-5 sticky left-12 bg-slate-50 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-slate-100">线索名称</th>
                <th className="px-4 py-5">联系人</th>
                <th className="px-4 py-5">所在地区</th>
                <th className="px-4 py-5">尊称</th>
                <th className="px-4 py-5 text-center">线索来源</th>
                <th className="px-4 py-5 font-mono">联系电话</th>
                <th className="px-4 py-5 text-center">跟进次数</th>
                <th className="px-4 py-5">跟进人</th>
                <th className="px-4 py-5">累计沟通时长</th>
                <th className="px-4 py-5">意向产品</th>
                <th className="px-4 py-5 font-mono">座机</th>
                <th className="px-4 py-5">邮箱</th>
                <th className="px-4 py-5">负责人</th>
                <th className="px-4 py-5">负责人部门</th>
                <th className="px-4 py-5">最近更新时间</th>
                <th className="px-4 py-5">下次跟进时间</th>
                <th className="px-4 py-5">创建时间</th>
                <th className="px-4 py-5">地址</th>
                <th className="px-8 py-5">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_LEADS.map((lead) => (
                <tr key={lead.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-5 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">
                    <input 
                      type="checkbox" 
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                      checked={selectedIds.has(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                    />
                  </td>
                  <td className="px-6 py-5 sticky left-12 bg-white group-hover:bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-slate-100 whitespace-nowrap">
                    <span 
                      onClick={() => setViewingLeadId(lead.id)}
                      className="text-[13px] font-black text-slate-800 hover:text-indigo-600 cursor-pointer underline decoration-indigo-100 underline-offset-4 decoration-2"
                    >
                      {lead.name}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-[13px] font-bold text-slate-700">{lead.contact}</td>
                  <td className="px-4 py-5 text-[13px] text-slate-500">{lead.region}</td>
                  <td className="px-4 py-5 text-[13px] text-slate-400">{lead.honorific}</td>
                  <td className="px-4 py-5 text-center">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">{lead.source}</span>
                  </td>
                  <td className="px-4 py-5 text-[13px] font-mono text-slate-600">{lead.phone}</td>
                  <td className="px-4 py-5 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 font-black text-[11px] border border-indigo-100">{lead.followCount}</span>
                  </td>
                  <td className="px-4 py-5 text-[13px] text-slate-500">{lead.follower}</td>
                  <td className="px-4 py-5 text-[13px] font-bold text-indigo-600/80 uppercase">{lead.totalDuration}</td>
                  <td className="px-4 py-5">
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black border border-amber-100">{lead.intendedProduct}</span>
                  </td>
                  <td className="px-4 py-5 text-[13px] font-mono text-slate-400">{lead.landline}</td>
                  <td className="px-4 py-5 text-[13px] text-slate-500 underline decoration-slate-100">{lead.email}</td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-white font-black">{lead.owner.charAt(0)}</div>
                      <span className="text-[13px] font-black text-slate-800">{lead.owner}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-[11px] font-black text-slate-400 uppercase tracking-tighter">{lead.ownerDept}</td>
                  <td className="px-4 py-5 text-[12px] font-mono text-slate-400">{lead.lastUpdated}</td>
                  <td className="px-4 py-5 text-[12px] font-mono text-rose-500 font-bold">{lead.nextFollowUp}</td>
                  <td className="px-4 py-5 text-[12px] font-mono text-slate-400">{lead.createdAt}</td>
                  <td className="px-4 py-5 text-[13px] text-slate-500 max-w-xs truncate">{lead.address}</td>
                  <td className="px-8 py-5 text-[13px] text-slate-400 italic max-w-sm truncate" title={lead.remark}>{lead.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Bottom Actions */}
        <div className="px-10 py-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">选中项操作:</span>
              <div className="flex space-x-2">
                <button 
                  disabled={selectedIds.size === 0}
                  className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    selectedIds.size > 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  领取到客户
                </button>
                <button 
                  disabled={selectedIds.size === 0}
                  className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                    selectedIds.size > 0 ? 'bg-white border-rose-200 text-rose-500 hover:bg-rose-50' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  放回线索池
                </button>
              </div>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              共 <span className="text-slate-800 text-sm">8</span> 条数据 | 20条/页
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
