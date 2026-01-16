
import React, { useState } from 'react';
import { MOCK_SHIPPING_PLANS, ShippingPlanItem } from '../constants';
import { ShippingPlanAdd } from './ShippingPlanAdd';
import { ShippingPlanDetail } from './ShippingPlanDetail';

export const ShippingPlan: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ShippingPlanItem | null>(null);
  const [contractSearch, setContractSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ourNameSearch, setOurNameSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['2']));

  if (isAdding) {
    return <ShippingPlanAdd onClose={() => setIsAdding(false)} />;
  }

  if (selectedPlan) {
    return <ShippingPlanDetail plan={selectedPlan} onClose={() => setSelectedPlan(null)} />;
  }

  const filteredPlans = MOCK_SHIPPING_PLANS.filter(plan => {
    return (
      plan.contractNo.includes(contractSearch) &&
      plan.ourName.includes(ourNameSearch) &&
      plan.customerName.includes(customerSearch)
    );
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleReset = () => {
    setContractSearch('');
    setStartDate('');
    setEndDate('');
    setOurNameSearch('');
    setCustomerSearch('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Filters Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">外销合同</label>
            <input 
              type="text" 
              placeholder="请输入外销合同号"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={contractSearch}
              onChange={(e) => setContractSearch(e.target.value)}
            />
          </div>
          <div className="space-y-1.5 lg:col-span-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">出运日期起止</label>
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="text-slate-400 text-xs shrink-0">至</span>
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">我方名称</label>
            <input 
              type="text" 
              placeholder="请输入我方单位名称"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={ourNameSearch}
              onChange={(e) => setOurNameSearch(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">客户名称</label>
            <input 
              type="text" 
              placeholder="请输入客户单位名称"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={handleReset}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            重置
          </button>
          <button className="px-8 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            查找
          </button>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => setIsAdding(true)}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span>新增</span>
        </button>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span>刷新</span>
        </button>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">批量提交</button>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">批量打印</button>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">批量下载</button>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">更多</button>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
              <th className="px-6 py-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" 
                  checked={selectedIds.size === filteredPlans.length}
                  readOnly
                />
              </th>
              <th className="px-4 py-4">计划编号</th>
              <th className="px-4 py-4">外销合同</th>
              <th className="px-4 py-4">出运日期</th>
              <th className="px-4 py-4">我方名称</th>
              <th className="px-4 py-4">客户名称</th>
              <th className="px-4 py-4">成交方式</th>
              <th className="px-4 py-4">币别</th>
              <th className="px-4 py-4">货代公司</th>
              <th className="px-4 py-4 text-center">交货日期</th>
              <th className="px-4 py-4 text-center">预计ETD</th>
              <th className="px-4 py-4 text-center">预计ETA</th>
              <th className="px-4 py-4">建立人</th>
              <th className="px-4 py-4 min-w-[200px]">货物描述</th>
              <th className="px-6 py-4 text-right sticky right-0 bg-slate-50 z-10">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPlans.map((plan) => (
              <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" 
                    checked={selectedIds.has(plan.id)}
                    onChange={() => toggleSelect(plan.id)}
                  />
                </td>
                <td className="px-4 py-5">
                   <button 
                     onClick={() => setSelectedPlan(plan)}
                     className="text-sm font-bold text-indigo-600 hover:underline transition-all font-mono"
                   >
                     {plan.planNos}
                   </button>
                </td>
                <td className="px-4 py-5">
                  <span className="text-xs font-bold text-slate-600 font-mono tracking-tight">{plan.contractNo}</span>
                </td>
                <td className="px-4 py-5 text-xs text-slate-500 font-mono">{plan.shippingDate}</td>
                <td className="px-4 py-5 text-xs text-slate-700 font-medium">{plan.ourName}</td>
                <td className="px-4 py-5 text-xs text-slate-700 font-medium">{plan.customerName}</td>
                <td className="px-4 py-5">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">{plan.incoterms || '--'}</span>
                </td>
                <td className="px-4 py-5 text-xs font-bold text-slate-500">{plan.currency}</td>
                <td className="px-4 py-5 text-xs text-slate-600">{plan.carrier || '--'}</td>
                <td className="px-4 py-5 text-center text-xs text-slate-500 font-mono">{plan.deliveryDate}</td>
                <td className="px-4 py-5 text-center text-xs text-slate-400 font-mono">{plan.etd || '--'}</td>
                <td className="px-4 py-5 text-center text-xs text-slate-400 font-mono">{plan.eta || '--'}</td>
                <td className="px-4 py-5">
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{plan.creatorName}</span>
                      <span className="text-[10px] text-slate-400 font-mono tracking-tighter">{plan.creatorCode}</span>
                   </div>
                </td>
                <td className="px-4 py-5 text-xs text-slate-500 italic max-w-[200px] truncate" title={plan.description}>
                  {plan.description}
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-10 border-l border-slate-50">
                  <div className="flex justify-end space-x-3">
                    <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800">编辑</button>
                    <button className="text-[11px] font-bold text-rose-500 hover:text-rose-700">删除</button>
                    <button className="text-[11px] font-bold text-slate-400 hover:text-slate-900">导出</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPlans.length === 0 && (
              <tr>
                <td colSpan={16} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                  尚未发现匹配的出运计划
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modern Pagination Section */}
      <div className="bg-white px-8 py-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-6">
          <div className="text-sm text-slate-500">
            共计 <span className="font-bold text-slate-800">601</span> 条
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">显示</span>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs font-bold text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500">
              <option>20条/页</option>
              <option>50条/页</option>
              <option>100条/页</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            {['1', '2', '3', '4', '5', '6', '...', '31'].map((page, i) => (
              <button 
                key={i}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                  page === '1' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-110' 
                    : page === '...' ? 'text-slate-300 cursor-default' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">前往第</span>
            <input 
              type="number" 
              defaultValue={1} 
              className="w-12 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-center font-bold text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500" 
            />
            <span className="text-xs text-slate-400">页</span>
          </div>
        </div>
      </div>
    </div>
  );
};
