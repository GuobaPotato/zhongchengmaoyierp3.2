
import React, { useState } from 'react';
import { MOCK_PURCHASE_ORDERS, PurchaseOrderItem } from '../constants';
import { OrderConversionView } from './OrderConversionView';
import { PurchaseOrderAddModal } from './PurchaseOrderAddModal';
import { PurchaseOrderDetailView } from './PurchaseOrderDetailView';

export const PurchasingOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');
  const [showConversion, setShowConversion] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrderItem | null>(null);
  const [viewingDetailOrder, setViewingDetailOrder] = useState<PurchaseOrderItem | null>(null);

  const handleGoToOrder = (order: PurchaseOrderItem) => {
    setSelectedOrder(order);
    setShowConversion(true);
  };

  const handleViewDetail = (order: PurchaseOrderItem) => {
    setViewingDetailOrder(order);
  };

  if (showConversion && selectedOrder) {
    return (
      <OrderConversionView 
        order={selectedOrder} 
        onClose={() => setShowConversion(false)} 
      />
    );
  }

  if (viewingDetailOrder) {
    return (
      <PurchaseOrderDetailView 
        order={viewingDetailOrder} 
        onClose={() => setViewingDetailOrder(null)} 
      />
    );
  }

  const filteredOrders = MOCK_PURCHASE_ORDERS.filter(order => 
    order.name.includes(searchTerm) || order.supplier.includes(searchTerm)
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '通过': return 'bg-green-100 text-green-700';
      case '审批中': return 'bg-blue-100 text-blue-700';
      case '未发起': return 'bg-slate-100 text-slate-600';
      case '已付款': return 'bg-emerald-100 text-emerald-700';
      case '待付款': return 'bg-amber-100 text-amber-700';
      case '未付款': return 'bg-rose-100 text-rose-700';
      case '已入库': return 'bg-green-100 text-green-700';
      case '部分入库': return 'bg-indigo-100 text-indigo-700';
      case '未入库': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">采购管理</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>添加采购</span>
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all">
            操作
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
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

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="w-48">
          <select className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none cursor-pointer">
            <option>选择部门或下属</option>
          </select>
        </div>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="搜索供应商名称、采购名称"
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          <span className="text-sm">高级筛选</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">采购名称</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">来源</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">状态/操作</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">供应商</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">采购时间</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">采购金额</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">采购单编号</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">付款状态</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase">入库状态</th>
              <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase text-right">审核状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-4">
                  <p 
                    className="text-sm font-bold text-slate-800 hover:text-indigo-600 cursor-pointer transition-colors"
                    onClick={() => handleViewDetail(order)}
                  >
                    {order.name}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs text-slate-500">{order.source}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    {order.status && <span className="text-xs text-slate-600 font-medium">{order.status}</span>}
                    {order.actionLabel && (
                      <button 
                        onClick={() => handleGoToOrder(order)}
                        className="text-xs text-indigo-600 font-bold hover:underline"
                      >
                        {order.actionLabel}
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-xs text-slate-800 font-medium">{order.supplier}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-xs text-slate-500">{order.date}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-xs font-bold text-slate-900">¥{order.totalAmount.toFixed(2)}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-xs font-mono text-slate-500">{order.orderNo}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(order.stockStatus)}`}>
                    {order.stockStatus}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusStyle(order.auditStatus)}`}>
                    {order.auditStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-sm text-slate-500">
          共 <span className="font-bold text-slate-800">{filteredOrders.length}</span> 条数据
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">每页显示</span>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
              <option>20条</option>
              <option>50条</option>
            </select>
          </div>
          <div className="flex space-x-1">
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold">1</button>
            <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add Order Modal */}
      {isAddModalOpen && (
        <PurchaseOrderAddModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
};
