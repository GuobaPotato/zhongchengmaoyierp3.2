
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTION_TOTAL, ProductionTotalItem, ICONS } from '../constants';
import { ProductionPlanDetailModal } from './ProductionPlanDetailModal';

export const ProductionTotalList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleView, setRoleView] = useState("全部");
  const [typeFilter, setTypeFilter] = useState("全部");
  const [statusFilter, setStatusFilter] = useState("全部");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewingItem, setViewingItem] = useState<ProductionTotalItem | null>(null);

  const filteredData = useMemo(() => {
    return MOCK_PRODUCTION_TOTAL.filter(item => {
      const matchSearch = item.planNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.productName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = typeFilter === "全部" || item.type === typeFilter;
      const matchStatus = statusFilter === "全部" || item.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredData.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredData.map(d => d.id)));
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-10">
      {/* 1. Page Header Area */}
      <div className="flex flex-col space-y-2">
        <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <span>首页</span>
          <span className="mx-2">/</span>
          <span>生产管理</span>
          <span className="mx-2">/</span>
          <span className="text-indigo-600">生产总列表</span>
        </nav>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">生产总列表</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">覆盖订单生产/预生产全流程，实时同步计划、工单、入库、质检数据</p>
          </div>
          <div className="flex items-center space-x-3 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
             <button className="flex items-center space-x-2 px-4 py-2 text-xs font-black text-slate-500 hover:text-indigo-600 transition-colors">
               <ICONS.Setting className="w-4 h-4" />
               <span className="uppercase tracking-widest">自定义视图</span>
             </button>
             <div className="h-6 w-px bg-slate-100"></div>
             <div className="px-4 text-[10px] font-bold text-slate-400 flex items-center space-x-2">
               <ICONS.Refresh className="w-3 h-3" />
               <span>最近刷新: 14:25</span>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Advanced Filters */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
           <FilterGroup label="生产类型">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black outline-none" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option>全部</option>
                <option>订单生产</option>
                <option>预生产</option>
              </select>
              <p className="text-[9px] text-slate-400 mt-1 font-bold">订单72/预56</p>
           </FilterGroup>

           <FilterGroup label="生产状态">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black outline-none" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option>全部</option>
                <option>待开工</option>
                <option>生产中</option>
                <option>已完工</option>
                <option>质检中</option>
                <option>已入库</option>
              </select>
           </FilterGroup>

           <FilterGroup label="产品品类">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black outline-none">
                <option>全部</option>
                <option>红外感应模块</option>
                <option>感应龙头外壳</option>
                <option>智能感应探头</option>
              </select>
           </FilterGroup>

           <FilterGroup label="角色视角">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black outline-none" value={roleView} onChange={e => setRoleView(e.target.value)}>
                <option>全部</option>
                <option>班组长视角</option>
                <option>仓库管理员视角</option>
                <option>生产主管视角</option>
              </select>
           </FilterGroup>

           <FilterGroup label="时间范围">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black outline-none">
                <option>近30天</option>
                <option>今日</option>
                <option>近7天</option>
              </select>
           </FilterGroup>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
           <div className="flex items-center space-x-3">
              <button className="px-10 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">查询</button>
              <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">重置</button>
           </div>
           
           <div className="flex items-center space-x-3">
              <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 flex items-center space-x-2">
                 <ICONS.Plus className="w-4 h-4" />
                 <span>新增生产计划</span>
              </button>
              <div className="h-6 w-px bg-slate-100"></div>
              <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase hover:bg-slate-50">
                <ICONS.Export className="w-4 h-4" />
              </button>
              <div className="relative group">
                 <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center space-x-2">
                   <span>批量操作</span>
                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* 3. Core Table Area */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto relative">
          <table className="min-w-[2000px] text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                <th className="px-6 py-6 w-12 text-center sticky left-0 bg-slate-50 z-20 border-r border-slate-100">
                  <input type="checkbox" className="rounded text-indigo-600 w-4 h-4" checked={selectedIds.size === filteredData.length} onChange={toggleSelectAll} />
                </th>
                <th className="px-6 py-6 w-48 sticky left-12 bg-slate-50 z-20 border-r border-slate-100 shadow-[2px_0_5px_rgba(0,0,0,0.02)] font-mono">计划编号</th>
                <th className="px-6 py-6 w-48 font-mono">工单编号</th>
                <th className="px-4 py-6">生产类型</th>
                <th className="px-6 py-6">产品名称</th>
                <th className="px-6 py-6">规格/批次</th>
                {roleView !== '仓库管理员视角' && <th className="px-4 py-6">班组</th>}
                <th className="px-4 py-6 text-right">计划数</th>
                <th className="px-4 py-6 text-right">已产出</th>
                <th className="px-4 py-6 text-right">质检数</th>
                <th className="px-4 py-6 text-right">入库数</th>
                <th className="px-8 py-6 w-56">生产进度</th>
                <th className="px-8 py-6 w-56">入库进度</th>
                <th className="px-6 py-6 text-center">状态</th>
                <th className="px-6 py-6 font-mono">计划开工/完工</th>
                <th className="px-10 py-6 text-right sticky right-0 bg-slate-50 z-20 border-l border-slate-100 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/20 transition-colors group">
                  <td className="px-6 py-6 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">
                    <input type="checkbox" className="rounded text-indigo-600 w-4 h-4" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} />
                  </td>
                  <td className="px-6 py-6 sticky left-12 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100 shadow-[2px_0_5px_rgba(0,0,0,0.02)] whitespace-nowrap">
                    <button 
                      onClick={() => setViewingItem(item)}
                      className="text-sm font-mono font-black text-indigo-600 hover:underline underline-offset-4"
                    >
                      {item.planNo}
                    </button>
                  </td>
                  <td className="px-6 py-6 font-mono text-slate-400 text-xs font-bold">{item.workOrderNo}</td>
                  <td className="px-4 py-6">
                     <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${item.type === '订单生产' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                       {item.type}
                     </span>
                  </td>
                  <td className="px-6 py-6 text-sm font-black text-slate-800">{item.productName}</td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <div className="flex flex-col">
                       <span className="text-xs text-slate-500 font-bold">{item.specs}</span>
                       <span className="text-[10px] text-slate-300 font-mono italic">{item.batchNo}</span>
                    </div>
                  </td>
                  {roleView !== '仓库管理员视角' && <td className="px-4 py-6 text-xs font-bold text-slate-600">{item.team}</td>}
                  <td className="px-4 py-6 text-right font-mono font-black text-slate-700">{item.plannedQty}</td>
                  <td className="px-4 py-6 text-right font-mono font-black text-slate-800">{item.producedQty}</td>
                  <td className="px-4 py-6 text-right font-mono font-black text-indigo-600">{item.inspectedQty}</td>
                  <td className="px-4 py-6 text-right font-mono font-black text-emerald-600">{item.warehousedQty}</td>
                  <td className="px-8 py-6">
                    <ProgressBar value={(item.producedQty / item.plannedQty) * 100} color="bg-indigo-500" />
                  </td>
                  <td className="px-8 py-6">
                    <ProgressBar value={(item.warehousedQty / item.plannedQty) * 100} color="bg-emerald-500" />
                  </td>
                  <td className="px-6 py-6 text-center whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-6 font-mono text-[10px] text-slate-400">
                    {item.plannedStart} <span className="mx-1">/</span> {item.plannedEnd}
                  </td>
                  <td className="px-10 py-6 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 z-10 border-l border-slate-100 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">
                    <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => setViewingItem(item)} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">详情</button>
                       {item.status === '生产中' && (
                         <button className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">进度</button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Bottom Summary & Pagination */}
        <div className="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex flex-col xl:flex-row justify-between items-center gap-8">
           <div className="flex items-center space-x-12">
              <SummaryCard title="总生产计划数" value={128} remark="订单72/预56" />
              <div className="h-10 w-px bg-slate-200"></div>
              <SummaryCard title="进行中计划数" value={58} remark="生产中42/待开工16" />
              <div className="h-10 w-px bg-slate-200"></div>
              <SummaryCard title="已完成入库数" value={62} remark="含订单/预生产" />
           </div>

           <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">跳转至:</span>
                 <input type="number" defaultValue={1} className="w-16 bg-white border border-slate-200 rounded-xl py-2 text-xs text-center font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
                 <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">确定</button>
              </div>
              <div className="flex items-center space-x-1">
                 <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100">1</button>
                 <button className="w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-500 text-xs font-bold hover:bg-slate-50">2</button>
                 <button className="w-10 h-10 rounded-2xl bg-white border border-slate-100 text-slate-500 text-xs font-bold hover:bg-slate-50">3</button>
                 <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Detail Modal */}
      {viewingItem && (
        <ProductionPlanDetailModal 
          item={viewingItem} 
          onClose={() => setViewingItem(null)} 
        />
      )}
    </div>
  );
};

/* --- 辅助内部组件 --- */

const FilterGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    {children}
  </div>
);

const ProgressBar: React.FC<{ value: number; color: string }> = ({ value, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center px-1">
       <span className="text-[9px] font-black text-slate-400 font-mono">{Math.round(value)}%</span>
    </div>
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
       <div 
         className={`h-full ${color} transition-all duration-1000 shadow-[0_0_8px_rgba(0,0,0,0.1)]`} 
         style={{ width: `${value}%` }}
       ></div>
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { bg: string, text: string, dot: string }> = {
    '待开工': { bg: 'bg-slate-100', text: 'text-slate-500', dot: '⚪' },
    '生产中': { bg: 'bg-indigo-50', text: 'text-indigo-600', dot: '🔵' },
    '已完工': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: '🟢' },
    '质检中': { bg: 'bg-amber-50', text: 'text-amber-600', dot: '🟡' },
    '已入库': { bg: 'bg-blue-50', text: 'text-blue-700', dot: '✅' },
    '已作废': { bg: 'bg-slate-900', text: 'text-white', dot: '⚫' }
  };
  const style = map[status] || map['待开工'];
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-transparent ${style.bg} ${style.text} flex items-center justify-center space-x-1 mx-auto w-fit`}>
       <span className="text-[8px]">{style.dot}</span>
       <span>{status}</span>
    </span>
  );
};

const SummaryCard: React.FC<{ title: string; value: number; remark: string }> = ({ title, value, remark }) => (
  <div className="flex flex-col items-start space-y-1">
     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
     <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-black text-slate-800 font-mono tracking-tighter">{value}</span>
        <span className="text-[10px] font-bold text-slate-300 italic">{remark}</span>
     </div>
  </div>
);
