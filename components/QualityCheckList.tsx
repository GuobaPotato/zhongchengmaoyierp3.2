
import React, { useState, useMemo } from 'react';
import { QualityCheckAdd } from './QualityCheckAdd';
import { QualityCheckDetail } from './QualityCheckDetail';

interface QualityCheckItem {
  id: string;
  check_order_no: string;
  check_type: 'incoming_material' | 'process' | 'finished_product' | 'delivery';
  product_model: string;
  product_name: string;
  batch_no: string;
  check_quantity: number;
  unqualified_quantity: number;
  check_status: 'pending' | 'checking' | 'approved' | 'rejected' | 'invalid';
  checker_name: string;
  check_time: string | null;
  related_order_no: string;
}

const MOCK_DATA: QualityCheckItem[] = [
  {
    id: "1",
    check_order_no: "QC20260113-001",
    check_type: "incoming_material",
    product_model: "IR-MOD-G2",
    product_name: "红外感应模块",
    batch_no: "LOT20260110",
    check_quantity: 1000,
    unqualified_quantity: 5,
    check_status: "approved",
    checker_name: "王质检",
    check_time: "2026-01-13 14:00",
    related_order_no: "PO20260105"
  },
  {
    id: "2",
    check_order_no: "QC20260113-002",
    check_type: "finished_product",
    product_model: "IR-SW-X1",
    product_name: "红外线感应开关",
    batch_no: "LOT20260112",
    check_quantity: 500,
    unqualified_quantity: 0,
    check_status: "checking",
    checker_name: "李质检",
    check_time: null,
    related_order_no: "WO20260110"
  },
  {
    id: "3",
    check_order_no: "QC20260113-003",
    check_type: "delivery",
    product_model: "IR-SEN-H5",
    product_name: "红外线感应传感器",
    batch_no: "LOT20251230",
    check_quantity: 200,
    unqualified_quantity: 12,
    check_status: "rejected",
    checker_name: "王质检",
    check_time: "2026-01-13 15:30",
    related_order_no: "SO20260110"
  },
  {
    id: "4",
    check_order_no: "QC20260113-004",
    check_type: "incoming_material",
    product_model: "COMP-LENS-01",
    product_name: "菲涅尔透镜",
    batch_no: "LOT20260111",
    check_quantity: 5000,
    unqualified_quantity: 0,
    check_status: "pending",
    checker_name: "--",
    check_time: null,
    related_order_no: "PO20260108"
  }
];

export const QualityCheckList: React.FC = () => {
  const [viewType, setViewType] = useState<'list' | 'card'>('list');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [quickSearch, setQuickSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [viewingOrderNo, setViewingOrderNo] = useState<string | null>(null);
  
  // Filter states
  const [checkTypeFilter, setCheckTypeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const typeMap = {
    incoming_material: { label: "来料质检", color: "bg-blue-50 text-blue-600 border-blue-100" },
    process: { label: "工序质检", color: "bg-purple-50 text-purple-600 border-purple-100" },
    finished_product: { label: "成品质检", color: "bg-green-50 text-green-600 border-green-100" },
    delivery: { label: "出货质检", color: "bg-orange-50 text-orange-600 border-orange-100" }
  };

  const statusMap = {
    pending: { label: "待质检", color: "bg-slate-100 text-slate-500" },
    checking: { label: "质检中", color: "bg-amber-100 text-amber-600" },
    approved: { label: "已通过", color: "bg-emerald-100 text-emerald-700" },
    rejected: { label: "已驳回", color: "bg-rose-100 text-rose-700" },
    invalid: { label: "已作废", color: "bg-slate-900 text-white" }
  };

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

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const matchSearch = item.check_order_no.toLowerCase().includes(quickSearch.toLowerCase()) ||
                          item.product_model.toLowerCase().includes(quickSearch.toLowerCase());
      const matchType = checkTypeFilter.length === 0 || checkTypeFilter.includes(item.check_type);
      const matchStatus = statusFilter.length === 0 || statusFilter.includes(item.check_status);
      return matchSearch && matchType && matchStatus;
    });
  }, [quickSearch, checkTypeFilter, statusFilter]);

  if (isAdding) {
    return <QualityCheckAdd onClose={() => setIsAdding(false)} />;
  }

  if (viewingOrderNo) {
    return <QualityCheckDetail orderNo={viewingOrderNo} onClose={() => setViewingOrderNo(null)} />;
  }

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-20">
      {/* 顶部面包屑与标题 */}
      <div className="flex flex-col space-y-2">
        <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <span>首页</span>
          <span className="mx-2">/</span>
          <span>质检管理</span>
          <span className="mx-2">/</span>
          <span className="text-indigo-600">质检列表</span>
        </nav>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">质检列表 <span className="ml-2 text-sm font-bold text-slate-400 font-mono tracking-normal">QUALITY_CHECK_LIST</span></h1>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
             <button 
              onClick={() => setViewType('list')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${viewType === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               列表
             </button>
             <button 
              onClick={() => setViewType('card')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${viewType === 'card' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               卡片
             </button>
          </div>
        </div>
      </div>

      {/* 筛选区域 */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all">
        <div className="p-0 border-b-0 flex items-center justify-between">
           <div className="relative flex-1 max-w-xl">
             <input 
               type="text" 
               placeholder="请输入质检单号/产品型号/客户名称/批次号"
               className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 pl-12 text-sm focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium"
               value={quickSearch}
               onChange={e => setQuickSearch(e.target.value)}
             />
             <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
           </div>
           <button 
             onClick={() => setIsFilterExpanded(!isFilterExpanded)}
             className={`ml-4 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 transition-all ${isFilterExpanded ? 'bg-indigo-50 text-indigo-600' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
           >
             <svg className={`w-4 h-4 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
             <span>高级筛选</span>
           </button>
        </div>
        
        {isFilterExpanded && (
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in slide-in-from-top-4 duration-300">
            <FilterItem label="质检类型">
              <div className="flex flex-wrap gap-2">
                {Object.entries(typeMap).map(([key, val]) => (
                  <button 
                    key={key}
                    onClick={() => {
                      setCheckTypeFilter(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      checkTypeFilter.includes(key) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-indigo-200'
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </FilterItem>

            <FilterItem label="质检状态">
              <select 
                multiple
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 h-24 focus:ring-4 focus:ring-indigo-50 outline-none"
                value={statusFilter}
                onChange={e => {
                  const options = Array.from(e.target.selectedOptions).map(o => o.value);
                  setStatusFilter(options);
                }}
              >
                {Object.entries(statusMap).map(([key, val]) => (
                  <option key={key} value={key} className="py-1 px-2">{val.label}</option>
                ))}
              </select>
            </FilterItem>

            <FilterItem label="时间范围">
               <div className="space-y-2">
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-800 outline-none appearance-none cursor-pointer">
                    <option value="create_time">创建时间</option>
                    <option value="check_time">质检时间</option>
                    <option value="plan_delivery_time">计划出货时间</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <input type="date" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[10px] font-mono font-bold text-slate-600 outline-none" />
                    <span className="text-slate-300 font-black">-</span>
                    <input type="date" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[10px] font-mono font-bold text-slate-600 outline-none" />
                  </div>
               </div>
            </FilterItem>

            <FilterItem label="质检员">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="搜索质检员..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                />
                <svg className="absolute right-3 top-2.5 w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
              </div>
            </FilterItem>
          </div>
        )}
      </div>

      {/* 操作工具栏 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-3">
           <button 
             disabled={selectedIds.size === 0}
             className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-lg ${
               selectedIds.size > 0 ? 'bg-emerald-600 text-white shadow-emerald-100 hover:bg-emerald-700' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
             }`}
           >
             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
             <span>批量通过</span>
           </button>
           <button 
             disabled={selectedIds.size === 0}
             className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-lg ${
               selectedIds.size > 0 ? 'bg-rose-600 text-white shadow-rose-100 hover:bg-rose-700' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
             }`}
           >
             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
             <span>批量驳回</span>
           </button>
           <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 hover:bg-slate-50 transition-all shadow-sm">
             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
             <span>导出 Excel</span>
           </button>
           <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2 hover:bg-slate-50 transition-all shadow-sm">
             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
             <span>打印报告</span>
           </button>
        </div>

        <button 
          onClick={() => setIsAdding(true)}
          className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center space-x-3 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          <span>创建质检单</span>
        </button>
      </div>

      {/* 数据表格 */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto relative scrollbar-hide">
          <table className="min-w-[1600px] text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-5 w-12 text-center sticky left-0 bg-slate-50 z-30 border-r border-slate-100">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                    checked={filteredData.length > 0 && selectedIds.size === filteredData.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-5 w-40 sticky left-12 bg-slate-50 z-30 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100 sortable group cursor-pointer">
                  质检单号
                  <svg className="w-3 h-3 inline-block ml-2 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                </th>
                <th className="px-6 py-5 w-32">质检类型</th>
                <th className="px-6 py-5 w-72">产品信息 (型号 - 名称 - 批次)</th>
                <th className="px-6 py-5 text-right w-28">检验数量</th>
                <th className="px-6 py-5 text-right w-28 text-rose-500">不合格数</th>
                <th className="px-6 py-5 text-center w-32">质检状态</th>
                <th className="px-6 py-5 w-32">质检员</th>
                <th className="px-6 py-5 w-48">质检时间</th>
                <th className="px-6 py-5 w-40">关联单据</th>
                <th className="px-8 py-5 text-right sticky right-0 bg-slate-50 z-30 border-l border-slate-100 shadow-[-4px_0_10px_-4px_rgba(0,0,0,0.1)]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-6 text-center sticky left-0 bg-white group-hover:bg-slate-50/50 z-10 border-r border-slate-100">
                    <input 
                      type="checkbox" 
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td className="px-6 py-6 sticky left-12 bg-white group-hover:bg-slate-50/50 z-10 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100 whitespace-nowrap">
                    <span 
                      onClick={() => setViewingOrderNo(item.check_order_no)}
                      className="text-sm font-black text-slate-800 font-mono tracking-tight cursor-pointer hover:text-indigo-600 transition-colors underline decoration-indigo-200 underline-offset-4 decoration-2"
                    >
                      {item.check_order_no}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${typeMap[item.check_type].color}`}>
                      {typeMap[item.check_type].label}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-800">{item.product_model}</span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
                        {item.product_name} <span className="mx-1 text-slate-300 font-normal">|</span> 批次: <span className="font-mono">{item.batch_no}</span>
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right text-sm font-mono font-bold text-slate-600">
                    {item.check_quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-6 text-right text-sm font-mono font-black text-rose-500">
                    {item.unqualified_quantity || '--'}
                  </td>
                  <td className="px-6 py-6 text-center">
                     <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${statusMap[item.check_status].color}`}>
                        {statusMap[item.check_status].label}
                     </span>
                  </td>
                  <td className="px-6 py-6 text-sm font-bold text-slate-700">
                    {item.checker_name}
                  </td>
                  <td className="px-6 py-6 text-xs font-mono text-slate-400 font-bold">
                    {item.check_time || '--'}
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-mono font-bold text-indigo-600 hover:underline cursor-pointer">{item.related_order_no}</span>
                  </td>
                  <td className="px-8 py-6 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50/50 z-10 border-l border-slate-100 shadow-[-4px_0_10px_-4px_rgba(0,0,0,0.1)]">
                    <div className="flex justify-end space-x-3">
                       <button onClick={() => setViewingOrderNo(item.check_order_no)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="详情"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                       {(item.check_status === 'pending' || item.check_status === 'checking') && (
                          <button className="p-2 text-slate-400 hover:text-amber-600 transition-colors" title="编辑"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                       )}
                       <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors" title="删除/作废"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-6 py-20 text-center text-slate-300 italic text-sm">
                     没有找到符合条件的质检记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 底部统计与分页 */}
        <div className="px-10 py-6 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div className="flex items-center space-x-12">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">单据总量统计</span>
               <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs font-bold text-slate-600">全部: <span className="font-mono text-indigo-600">{MOCK_DATA.length}</span></span>
                  <span className="text-xs font-bold text-slate-600">待检: <span className="font-mono text-amber-600">1</span></span>
                  <span className="text-xs font-bold text-slate-600">异常: <span className="font-mono text-rose-600">1</span></span>
               </div>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              当前页: <span className="text-slate-800 text-sm">{filteredData.length}</span> 项记录
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">分页导航:</span>
               <div className="flex items-center space-x-1">
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-300 hover:bg-white transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100">1</button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-300 hover:bg-white transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
               </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">跳至:</span>
              <input 
                type="number" 
                defaultValue={1} 
                className="w-16 bg-white border border-slate-200 rounded-xl py-2 text-xs text-center font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-50 shadow-sm" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2.5">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
    {children}
  </div>
);
