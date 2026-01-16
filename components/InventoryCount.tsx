
import React, { useState } from 'react';
import { InventoryCountDetail } from './InventoryCountDetail';
import { InventoryCountAdd } from './InventoryCountAdd';

interface InventoryCountItem {
  id: string;
  title: string;
  titleNo: string;
  auditStatus: string;
  countTime: string;
  responsiblePerson: string;
  createTime: string;
}

const MOCK_COUNT_DATA: InventoryCountItem[] = [
  {
    id: "PD202601001",
    title: "2026年1月定期盘点",
    titleNo: "No.CK-2026-100",
    auditStatus: "未发起",
    countTime: "2026-01-20",
    responsiblePerson: "李仓管",
    createTime: "2026-01-13 14:00",
  },
  {
    id: "PD202512005",
    title: "年度原材料大盘点",
    titleNo: "No.CK-2025-998",
    auditStatus: "审批中",
    countTime: "2025-12-31",
    responsiblePerson: "王经理",
    createTime: "2025-12-25 09:00",
  }
];

export const InventoryCount: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [responsibleFilter, setResponsibleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return <InventoryCountAdd onClose={() => setIsAdding(false)} />;
  }

  if (viewingId) {
    return <InventoryCountDetail countId={viewingId} onClose={() => setViewingId(null)} />;
  }

  const tabs = ["全部", "我发起的", "待我审核", "已审核"];

  const toggleSelectAll = () => {
    if (selectedIds.size === MOCK_COUNT_DATA.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(MOCK_COUNT_DATA.map(d => d.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '未发起': return 'bg-slate-100 text-slate-500 border-slate-200';
      case '审批中': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case '已通过': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Top Header & Main Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex space-x-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm shrink-0">
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
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-xl shadow-indigo-100 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span>添加盘点</span>
          </button>
          <div className="relative group">
            <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
              <span>操作</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 p-2">
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl uppercase tracking-wider">批量提交审核</button>
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl uppercase tracking-wider">批量打印盘点表</button>
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl uppercase tracking-wider mt-1 border-t border-slate-100 pt-3">批量删除</button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Area */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">盘点负责人</label>
            <select 
              value={responsibleFilter}
              onChange={e => setResponsibleFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
            >
              <option value="">请选择负责人</option>
              <option value="李仓管">李仓管</option>
              <option value="王经理">王经理</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">状态</label>
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
            >
              <option value="">全部状态</option>
              <option value="未发起">未发起</option>
              <option value="审批中">审批中</option>
              <option value="已通过">已通过</option>
            </select>
          </div>

          <div className="space-y-1.5 lg:col-span-1 xl:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">快捷搜索</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="输入标题搜索..."
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
        <div className="overflow-x-auto relative">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                <th className="px-8 py-5 w-16 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                    checked={MOCK_COUNT_DATA.length > 0 && selectedIds.size === MOCK_COUNT_DATA.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-5 min-w-[300px]">标题</th>
                <th className="px-4 py-5 text-center">审核状态</th>
                <th className="px-4 py-5">盘点时间</th>
                <th className="px-4 py-5">盘点负责人</th>
                <th className="px-4 py-5">创建时间</th>
                <th className="px-8 py-5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {MOCK_COUNT_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/20 transition-colors group">
                  <td className="px-8 py-5 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span 
                        onClick={() => setViewingId(item.id)}
                        className="text-[13px] font-black text-slate-800 group-hover:text-indigo-600 transition-colors cursor-pointer underline decoration-indigo-50 underline-offset-4 decoration-2"
                      >
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-tighter">{item.titleNo}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusBadge(item.auditStatus)}`}>
                      {item.auditStatus}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-xs text-slate-600 font-mono">
                    {item.countTime}
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] text-white font-black">{item.responsiblePerson.charAt(0)}</div>
                      <span className="text-xs font-bold text-slate-700">{item.responsiblePerson}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-xs text-slate-400 font-mono">
                    {item.createTime}
                  </td>
                  <td className="px-8 py-5 text-right whitespace-nowrap">
                    <div className="flex justify-end space-x-4">
                      <button 
                        onClick={() => setViewingId(item.id)}
                        className="text-[11px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest underline decoration-indigo-100 underline-offset-4"
                      >
                        详情
                      </button>
                      <button className="text-[11px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-widest">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Area with Stats & Pagination */}
        <div className="px-10 py-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div className="flex items-center space-x-12">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              总数据量 <span className="text-slate-800 text-sm mx-1">8</span> 条 | 20条/页
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-2">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">选中:</span>
               <span className="text-indigo-600 font-black text-sm">{selectedIds.size}</span>
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
