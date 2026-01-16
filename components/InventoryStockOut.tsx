
import React, { useState } from 'react';
import { InventoryStockOutDetail } from './InventoryStockOutDetail';

interface StockOutItem {
  id: string;
  location: string;
  type: string;
  source: string;
  operator: string;
  time: string;
  remark: string;
}

const MOCK_DATA: StockOutItem[] = [
  {
    id: "CK20260107001",
    location: "A01",
    type: "销售出库",
    source: "SO20260105001",
    operator: "李四",
    time: "2026-01-07 14:30",
    remark: "订单出库"
  },
  {
    id: "CK20260108002",
    location: "B02",
    type: "领料出库",
    source: "MO20260108005",
    operator: "王五",
    time: "2026-01-08 09:15",
    remark: "生产组领料"
  }
];

export const InventoryStockOut: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: "2026-01-01", end: "2026-01-07" });
  const [viewingId, setViewingId] = useState<string | null>(null);

  if (viewingId) {
    return <InventoryStockOutDetail orderNo={viewingId} onClose={() => setViewingId(null)} />;
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === MOCK_DATA.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(MOCK_DATA.map(d => d.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search & Filter Area */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">搜索出库单编号</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索出库单编号"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" />
              </svg>
            </div>
          </div>

          <div className="space-y-1.5 lg:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">日期范围</label>
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                value={dateRange.start}
                onChange={e => setDateRange({...dateRange, start: e.target.value})}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <span className="text-slate-400 text-[10px] font-bold">至</span>
              <input 
                type="date" 
                value={dateRange.end}
                onChange={e => setDateRange({...dateRange, end: e.target.value})}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-200 transition-all uppercase tracking-widest flex items-center space-x-2">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              <span>高级筛选</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2 shadow-sm">
              <span>批量操作</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 p-2">
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">批量打印出库单</button>
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">批量导出Excel</button>
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl border-t border-slate-50 mt-1">批量作废单据</button>
            </div>
          </div>
          <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span>刷新列表</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-bold uppercase tracking-tighter">
          已选择 <span className="text-indigo-600 font-black px-1 text-sm">{selectedIds.size}</span> 项数据
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
              <th className="px-6 py-5 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                  checked={MOCK_DATA.length > 0 && selectedIds.size === MOCK_DATA.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-5">单号 ↑↓</th>
              <th className="px-4 py-5">库位</th>
              <th className="px-4 py-5 text-center">出库类型</th>
              <th className="px-4 py-5">来源</th>
              <th className="px-4 py-5">操作人</th>
              <th className="px-4 py-5">操作时间</th>
              <th className="px-4 py-5">备注</th>
              <th className="px-8 py-5 text-right sticky right-0 bg-slate-50 z-10 border-l border-slate-100">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {MOCK_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
                <td className="px-4 py-5">
                   <span 
                    onClick={() => setViewingId(item.id)}
                    className="text-sm font-black text-slate-800 font-mono tracking-tight cursor-pointer hover:text-indigo-600 transition-colors underline decoration-indigo-200 underline-offset-4"
                   >
                     {item.id}
                   </span>
                </td>
                <td className="px-4 py-5">
                   <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">{item.location}</span>
                </td>
                <td className="px-4 py-5 text-center">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                     item.type === '销售出库' ? 'bg-amber-100 text-amber-700' : 
                     item.type === '领料出库' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                   }`}>
                     {item.type}
                   </span>
                </td>
                <td className="px-4 py-5">
                   <span className="text-xs font-bold text-slate-500 font-mono tracking-tight hover:text-indigo-500 transition-colors cursor-pointer">{item.source}</span>
                </td>
                <td className="px-4 py-5 text-xs text-slate-700 font-bold">
                   {item.operator}
                </td>
                <td className="px-4 py-5 text-xs text-slate-500 font-mono">
                   {item.time}
                </td>
                <td className="px-4 py-5 max-w-[200px] truncate text-xs text-slate-400 italic">
                   {item.remark}
                </td>
                <td className="px-8 py-5 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-10 border-l border-slate-100 shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={() => setViewingId(item.id)}
                      className="text-[11px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest"
                    >
                      查看详情
                    </button>
                    <button className="text-[11px] font-black text-slate-400 hover:text-slate-800 uppercase tracking-widest">打印</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Container */}
      <div className="bg-white px-10 py-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-12">
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Total Results: <span className="font-black text-slate-800 text-lg">{MOCK_DATA.length}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100 transition-transform active:scale-90">1</button>
        </div>
      </div>
    </div>
  );
};
