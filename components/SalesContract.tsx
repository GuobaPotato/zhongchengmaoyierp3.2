
import React, { useState } from 'react';
import { MOCK_SALES_CONTRACTS, SalesContractItem } from '../constants';
import { SalesContractDetail } from './SalesContractDetail';
import { SalesContractAdd } from './SalesContractAdd';

export const SalesContract: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<SalesContractItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderType, setOrderType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [archiveStatus, setArchiveStatus] = useState('');

  if (isAdding) {
    return <SalesContractAdd onClose={() => setIsAdding(false)} />;
  }

  if (selectedContract) {
    return <SalesContractDetail contract={selectedContract} onClose={() => setSelectedContract(null)} />;
  }

  const filteredContracts = MOCK_SALES_CONTRACTS.filter(contract => {
    const matchesSearch = contract.contractNo.includes(searchTerm) || 
                          contract.customerName.includes(searchTerm) || 
                          contract.creatorName.includes(searchTerm);
    const matchesType = orderType === '' || contract.orderType === orderType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search & Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">订单类型</label>
            <select 
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">请选择订单类型</option>
              <option value="大货">大货</option>
              <option value="样品">样品</option>
              <option value="备货">备货</option>
            </select>
          </div>

          <div className="space-y-1.5 lg:col-span-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">合同日期范围</label>
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <span className="text-slate-400 text-xs">至</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">归档状态</label>
            <select 
              value={archiveStatus}
              onChange={(e) => setArchiveStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
            >
              <option value="">请选择归档状态</option>
              <option value="已归档">已归档</option>
              <option value="未归档">未归档</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">全局检索</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索合同号/客户/建立人"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Area */}
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
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
          <span>批量提交</span>
        </button>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
          <span>批量打印</span>
        </button>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
          <span>批量下载</span>
        </button>
        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
          <span>更多</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
              <th className="px-6 py-4 w-12 text-center">行号</th>
              <th className="px-4 py-4">订单类型</th>
              <th className="px-4 py-4">外销合同号</th>
              <th className="px-4 py-4">合同日期</th>
              <th className="px-4 py-4">客户订单号</th>
              <th className="px-4 py-4">我方名称</th>
              <th className="px-4 py-4">客户名称</th>
              <th className="px-4 py-4">成交方</th>
              <th className="px-4 py-4">币种</th>
              <th className="px-4 py-4">交货日期</th>
              <th className="px-4 py-4">建立人</th>
              <th className="px-4 py-4 text-right">销售金额</th>
              <th className="px-4 py-4 text-center">总数量</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredContracts.map((contract, index) => (
              <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5 text-center text-xs text-slate-400 font-mono">{index + 1}</td>
                <td className="px-4 py-5">
                   <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                     contract.orderType === '大货' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'
                   }`}>{contract.orderType}</span>
                </td>
                <td className="px-4 py-5">
                   <button 
                     onClick={() => setSelectedContract(contract)}
                     className="text-sm font-bold text-indigo-600 hover:underline transition-all"
                   >
                     {contract.contractNo}
                   </button>
                </td>
                <td className="px-4 py-5 text-xs text-slate-500 font-mono">{contract.contractDate}</td>
                <td className="px-4 py-5 text-xs text-slate-500">{contract.customerOrderNo || '--'}</td>
                <td className="px-4 py-5 text-xs text-slate-600">{contract.ourName}</td>
                <td className="px-4 py-5 text-xs text-slate-600">{contract.customerName}</td>
                <td className="px-4 py-5 text-xs text-slate-600">{contract.dealParty}</td>
                <td className="px-4 py-5 text-xs font-bold text-slate-500">{contract.currency}</td>
                <td className="px-4 py-5 text-xs text-slate-500 font-mono">{contract.deliveryDate}</td>
                <td className="px-4 py-5">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{contract.creatorName}</span>
                    <span className="text-[10px] text-slate-400 font-mono tracking-tighter">{contract.creatorCode}</span>
                  </div>
                </td>
                <td className="px-4 py-5 text-right font-mono font-bold text-slate-900">
                   {contract.currency === 'USD' ? '$' : '¥'}{contract.salesAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-5 text-center text-xs font-bold text-indigo-600">{contract.totalQuantity}</td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
                   <div className="flex justify-end space-x-3">
                      <button className="text-[11px] font-bold text-indigo-600 hover:underline">编辑</button>
                      <button className="text-[11px] font-bold text-rose-500 hover:underline">删除</button>
                      <button className="text-[11px] font-bold text-slate-400 hover:text-slate-900">查看</button>
                   </div>
                </td>
              </tr>
            ))}
            {filteredContracts.length === 0 && (
              <tr>
                <td colSpan={14} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                  暂无匹配的合同记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="bg-white px-8 py-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-6">
           <div className="text-sm text-slate-500">
             总计: <span className="font-bold text-slate-800">20条</span>
           </div>
           <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">每页条数:</span>
              <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs outline-none focus:ring-1 focus:ring-indigo-500">
                <option>20条/页</option>
                <option>50条/页</option>
              </select>
           </div>
        </div>

        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-1">
             <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button className="w-8 h-8 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-100">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:bg-slate-50">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>
           </div>
           <div className="flex items-center space-x-2">
             <span className="text-xs text-slate-400">前往</span>
             <input type="number" defaultValue={1} className="w-12 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-center outline-none focus:ring-1 focus:ring-indigo-500" />
             <span className="text-xs text-slate-400">页</span>
           </div>
        </div>
      </div>
    </div>
  );
};
