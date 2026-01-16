
import React, { useState } from 'react';
import { ShippingOrderAdd } from './ShippingOrderAdd';
import { ShippingOrderDetail } from './ShippingOrderDetail';

interface ShippingOrderItem {
  shippingOrderNo: string;
  shippingPlanNo: string;
  exportContractNo: string;
  shippingDate: string;
  customerName: string;
  shippingOrderStatus: string;
  freightForwarderName: string;
  productName: string;
  quantity: string;
}

const MOCK_SHIPPING_ORDERS: ShippingOrderItem[] = [
  {
    shippingOrderNo: "SP-20260106",
    shippingPlanNo: "JP20260106001",
    exportContractNo: "123456",
    shippingDate: "2026-01-06",
    customerName: "泰华贸易",
    shippingOrderStatus: "已完成",
    freightForwarderName: "汉王船舶",
    productName: "感应龙头外壳（ABS）",
    quantity: "500"
  },
  {
    shippingOrderNo: "SP-20260105",
    shippingPlanNo: "JP20260105001",
    exportContractNo: "1102025po",
    shippingDate: "2026-01-05",
    customerName: "BAZtube LLC",
    shippingOrderStatus: "已完成",
    freightForwarderName: "华翰",
    productName: "感应线圈（医用级）",
    quantity: "300"
  },
  {
    shippingOrderNo: "SP-20260104",
    shippingPlanNo: "JP20260104001",
    exportContractNo: "12345677",
    shippingDate: "2026-01-04",
    customerName: "TATA",
    shippingOrderStatus: "执行中",
    freightForwarderName: "青岛裕海",
    productName: "感应元件（防菌）",
    quantity: "200"
  },
  {
    shippingOrderNo: "SP-20260103",
    shippingPlanNo: "JP20260103001",
    exportContractNo: "gz001001",
    shippingDate: "2026-01-03",
    customerName: "汇信美地",
    shippingOrderStatus: "已完成",
    freightForwarderName: "青岛嘉里大通",
    productName: "密封硅胶组件",
    quantity: "400"
  },
  {
    shippingOrderNo: "SP-20260102",
    shippingPlanNo: "JP20260102001",
    exportContractNo: "0492025po",
    shippingDate: "2026-01-02",
    customerName: "Top Game",
    shippingOrderStatus: "执行中",
    freightForwarderName: "上海爽通国际",
    productName: "感应龙头底座",
    quantity: "350"
  }
];

export const ShippingOrder: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<ShippingOrderItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    orderNo: '',
    planNo: '',
    startDate: '',
    endDate: '',
    customer: '',
    contract: ''
  });

  if (isAdding) {
    return <ShippingOrderAdd onClose={() => setIsAdding(false)} />;
  }

  if (viewingOrder) {
    return <ShippingOrderDetail orderNo={viewingOrder.shippingOrderNo} onClose={() => setViewingOrder(null)} />;
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === MOCK_SHIPPING_ORDERS.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(MOCK_SHIPPING_ORDERS.map(o => o.shippingOrderNo)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleReset = () => {
    setFilters({
      orderNo: '',
      planNo: '',
      startDate: '',
      endDate: '',
      customer: '',
      contract: ''
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Description Section */}
      <div className="bg-white/50 border border-slate-200 px-6 py-4 rounded-2xl">
         <h2 className="text-lg font-extrabold text-slate-800">出运单管理中心</h2>
         <p className="text-sm text-slate-500 mt-1">已生成的实际出运单管理中心，聚焦已执行/执行中的出运任务结果，关联对应出运计划便于追溯</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">出运单号</label>
            <input 
              type="text" 
              placeholder="模糊查询出运单号"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={filters.orderNo}
              onChange={e => setFilters({...filters, orderNo: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">出运计划编号</label>
            <input 
              type="text" 
              placeholder="模糊查询出运计划"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={filters.planNo}
              onChange={e => setFilters({...filters, planNo: e.target.value})}
            />
          </div>
          <div className="space-y-1.5 lg:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">出运日期范围</label>
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                value={filters.startDate}
                onChange={e => setFilters({...filters, startDate: e.target.value})}
              />
              <span className="text-slate-400 text-[10px] uppercase font-bold">至</span>
              <input 
                type="date" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                value={filters.endDate}
                onChange={e => setFilters({...filters, endDate: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">客户名称</label>
            <input 
              type="text" 
              placeholder="模糊查询客户"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={filters.customer}
              onChange={e => setFilters({...filters, customer: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">外销合同</label>
            <input 
              type="text" 
              placeholder="合同名或编号"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={filters.contract}
              onChange={e => setFilters({...filters, contract: e.target.value})}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
          <button 
            onClick={handleReset}
            className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-50 transition-all uppercase tracking-widest"
          >
            重置条件
          </button>
          <button className="px-10 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest">
            执行查找
          </button>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <button 
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-xl shadow-indigo-100 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          <span>新增出运单</span>
        </button>
        <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2 active:scale-95">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span>刷新列表</span>
        </button>
        <div className="h-6 w-px bg-slate-200 mx-2"></div>
        <button 
          disabled={selectedIds.size === 0}
          className={`px-5 py-3 border rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${
            selectedIds.size > 0 ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          <span>批量打印</span>
        </button>
        <button 
          disabled={selectedIds.size === 0}
          className={`px-5 py-3 border rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${
            selectedIds.size > 0 ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          <span>批量下载</span>
        </button>
        <div className="relative group">
           <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
             <span>更多操作</span>
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
           </button>
           <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 p-2">
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">导出列表 (Excel)</button>
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">批量更新状态</button>
           </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
              <th className="px-6 py-5 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                  checked={MOCK_SHIPPING_ORDERS.length > 0 && selectedIds.size === MOCK_SHIPPING_ORDERS.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-5">出运单号 ↑↓</th>
              <th className="px-4 py-5">出运计划编号</th>
              <th className="px-4 py-5">外销合同号</th>
              <th className="px-4 py-5">出运日期</th>
              <th className="px-4 py-5">客户名称</th>
              <th className="px-4 py-5 text-center">出运单状态</th>
              <th className="px-4 py-5">货代名称</th>
              <th className="px-4 py-5">商品名称</th>
              <th className="px-4 py-5 text-right">数量</th>
              <th className="px-8 py-5 text-right sticky right-0 bg-slate-50 z-20 shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.05)] border-l border-slate-100">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_SHIPPING_ORDERS.map((order) => (
              <tr key={order.shippingOrderNo} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-5 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                    checked={selectedIds.has(order.shippingOrderNo)}
                    onChange={() => toggleSelect(order.shippingOrderNo)}
                  />
                </td>
                <td className="px-4 py-5">
                   <span 
                    onClick={() => setViewingOrder(order)}
                    className="text-sm font-black text-slate-800 font-mono tracking-tight cursor-pointer hover:text-indigo-600 transition-colors underline decoration-indigo-200 underline-offset-4"
                   >
                     {order.shippingOrderNo}
                   </span>
                </td>
                <td className="px-4 py-5">
                   <span className="text-xs font-bold text-slate-500 font-mono tracking-tight">{order.shippingPlanNo}</span>
                </td>
                <td className="px-4 py-5">
                   <span className="text-xs font-bold text-slate-500 font-mono tracking-tight">{order.exportContractNo}</span>
                </td>
                <td className="px-4 py-5 text-xs text-slate-500 font-mono tracking-tight">
                   {order.shippingDate}
                </td>
                <td className="px-4 py-5">
                   <span className="text-xs font-black text-slate-700 tracking-tight">{order.customerName}</span>
                </td>
                <td className="px-4 py-5 text-center">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                     order.shippingOrderStatus === '已完成' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                   }`}>
                     {order.shippingOrderStatus}
                   </span>
                </td>
                <td className="px-4 py-5 text-xs text-slate-600 font-bold">
                   {order.freightForwarderName}
                </td>
                <td className="px-4 py-5">
                   <p className="text-xs text-slate-500 font-medium truncate max-w-[150px]" title={order.productName}>
                     {order.productName}
                   </p>
                </td>
                <td className="px-4 py-5 text-right font-mono font-black text-slate-900 text-sm">
                   {order.quantity}
                </td>
                <td className="px-8 py-5 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-20 border-l border-slate-100 shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-end space-x-4">
                    <button 
                      onClick={() => setViewingOrder(order)}
                      className="text-[11px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest"
                    >
                      查看
                    </button>
                    <button className="text-[11px] font-black text-slate-400 hover:text-slate-800 uppercase tracking-widest">打印</button>
                    <button className="text-[11px] font-black text-slate-400 hover:text-slate-800 uppercase tracking-widest">下载</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="bg-white px-10 py-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-12">
          <div className="text-sm font-bold text-slate-400">
            TOTAL: <span className="font-black text-slate-800 text-lg">5</span> <span className="text-[10px] uppercase tracking-widest">Orders</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page Size:</span>
            <span className="text-xs font-black text-slate-800 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">20 / Page</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-100 text-slate-300 hover:bg-slate-50 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100 active:scale-90 transition-transform">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-100 text-slate-300 hover:bg-slate-50 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Go To:</span>
            <input 
              type="number" 
              defaultValue={1} 
              className="w-16 bg-slate-50 border border-slate-200 rounded-xl py-2 text-xs text-center font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
