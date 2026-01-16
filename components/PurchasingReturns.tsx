
import React, { useState } from 'react';
import { MOCK_PURCHASE_RETURNS, PurchaseReturnItem } from '../constants';
import { PurchaseReturnDetailView } from './PurchaseReturnDetailView';
import { PurchaseReturnEditModal } from './PurchaseReturnEditModal';

export const PurchasingReturns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [selectedReturn, setSelectedReturn] = useState<PurchaseReturnItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '通过': return 'bg-green-100 text-green-700';
      case '审批中': return 'bg-blue-100 text-blue-700';
      case '未发起': return 'bg-slate-100 text-slate-600';
      case '已回款': return 'bg-emerald-100 text-emerald-700';
      case '未回款': return 'bg-rose-100 text-rose-700';
      case '未出库': return 'bg-slate-100 text-slate-600';
      case '已出库': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const filteredReturns = MOCK_PURCHASE_RETURNS.filter(item => 
    (item.title.includes(searchTerm) || item.returnNo.includes(searchTerm)) &&
    (statusFilter === '全部' || item.auditStatus === statusFilter)
  );

  const totalRefundAmount = filteredReturns.reduce((sum, item) => sum + item.amount, 0);

  if (selectedReturn) {
    return <PurchaseReturnDetailView item={selectedReturn} onClose={() => setSelectedReturn(null)} />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Tab bar and Action button */}
      <div className="flex justify-between items-center border-b border-slate-200">
        <div className="flex">
          {['全部', '我负责的', '下属负责的'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-all relative ${
                activeTab === tab ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="mb-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span>添加退货</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="w-48">
          <select 
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">请选择负责人</option>
            <option value="王朔">王朔</option>
          </select>
        </div>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="搜索标题、编号"
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="w-36">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="全部">状态</option>
            <option value="未发起">未发起</option>
            <option value="审批中">审批中</option>
            <option value="通过">通过</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-4 py-4 w-12 text-center">
                <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
              </th>
              <th className="px-4 py-4 text-left">标题</th>
              <th className="px-4 py-4 text-left">编号</th>
              <th className="px-4 py-4 text-left">采购单</th>
              <th className="px-4 py-4 text-left">退货金额</th>
              <th className="px-4 py-4 text-center">审核状态</th>
              <th className="px-4 py-4 text-center">回款状态</th>
              <th className="px-4 py-4 text-center">出库状态</th>
              <th className="px-4 py-4 text-left">退换货</th>
              <th className="px-4 py-4 text-left">退货时间</th>
              <th className="px-4 py-4 text-left">负责人</th>
              <th className="px-4 py-4 text-left">创建时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredReturns.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-4 text-center">
                   <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                </td>
                <td className="px-4 py-4">
                  <button 
                    onClick={() => setSelectedReturn(item)}
                    className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors text-left truncate max-w-[150px]"
                  >
                    {item.title}
                  </button>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-xs font-mono text-slate-500">{item.returnNo}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-800">{item.purchaseNo}</span>
                    <span className="text-[10px] text-slate-400">{item.purchaseName}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm font-bold text-slate-900">¥{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(item.auditStatus)}`}>
                    {item.auditStatus}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(item.paymentStatus)}`}>
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(item.stockStatus)}`}>
                    {item.stockStatus}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-medium">{item.returnType}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-xs text-slate-500">{item.returnDate}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-xs text-slate-700 font-medium">{item.owner}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-[10px] text-slate-400">{item.createdAt}</span>
                </td>
              </tr>
            ))}
            {filteredReturns.length === 0 && (
              <tr>
                <td colSpan={12} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                  暂无退货数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-6">
          <div className="text-sm text-slate-500">
            共 <span className="font-bold text-slate-800">{filteredReturns.length}</span> 条
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider">每页显示</span>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-indigo-500">
              <option>20条</option>
              <option>50条</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-100">1</button>
        </div>

        <div className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-right">
          <div className="flex items-baseline space-x-2">
            <span className="text-xs text-slate-500">应退款金额(元):</span>
            <span className="text-sm font-bold text-slate-800 font-mono">¥{totalRefundAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-xs text-slate-500">已退款金额(元):</span>
            <span className="text-sm font-bold text-green-600 font-mono">¥0.00</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-xs text-slate-500">未退款(元):</span>
            <span className="text-sm font-bold text-rose-600 font-mono">¥{totalRefundAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isEditModalOpen && (
        <PurchaseReturnEditModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};
